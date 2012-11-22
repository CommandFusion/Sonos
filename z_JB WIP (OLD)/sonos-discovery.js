var SonosDiscovery = function(params) {

	var self = {
		ST: "urn:schemas-upnp-org:device:ZonePlayer:1", // ssdp:all if you want to discover any SSDP device.
		devices: [],
		systemName: "SSDP Discovery",
		feedbackName: "SSDP Discovery Feedback",
		systemNameNotification: "SSDP Notification",
		feedbackNameNotification: "SSDP Notification Feedback",
		systemNameSubscription: "SSDP Subscription",
		feedbackNameSubscription: "SSDP Subscription Feedback",
		SonosDiscoveredCallback: null,
		SonosEventCallback: null,
		subscribingToDevice: false,
		subscribeCommands: [],
		port: 1400,
		// The service notifications we want to subscribe to
		services : [
			{ "Service": "/ZoneGroupTopology/Event", "Description": "Zone Group" },
			{ "Service": "/MediaRenderer/AVTransport/Event", "Description": "Transport Event" },
			{ "Service": "/MediaServer/ContentDirectory/Event", "Description": "Content Directory" },
			{ "Service": "/MediaRenderer/RenderingControl/Event", "Description": "Render Control" }
		],
		soapRequestTemplate: '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body>{0}</s:Body></s:Envelope>',
		eventCallbacks: {
			"DeviceDiscovered" : [],
			"GroupsChanged" : [],
		},
	};

	self.init = function() {
		CF.log("SonosDiscovery: init()");

		// Listens for SSDP responses from sonos compoents and processes them
		CF.watch(CF.FeedbackMatchedEvent, self.systemName, self.feedbackName, self.parseFeedbackSSDP);
		// Listens for sonos sent Notify message
		CF.watch(CF.FeedbackMatchedEvent, self.systemNameNotification, self.feedbackNameNotification, self.parseFeedbackNotification);
		// Listens for the response after we have subscribed to a notify service
		//CF.watch(CF.FeedbackMatchedEvent, self.systemNameSubscription, self.feedbackNameSubscription, self.parseFeedbackSubscription);
		// Event when the notification connection is changed, so we can send more notification requests, one at a time.
		//CF.watch(CF.ConnectionStatusChangeEvent, self.systemNameSubscription, self.onSubscribeConnectionChange, false);
		
	
		// Send the discovery request
		setTimeout(function() {
			//CF.send(self.systemName, "M-SEARCH * HTTP/1.1\r\nHOST: 239.255.255.250:1900\r\nMAN: \"ssdp:discover\"\r\nMX: 1\r\nST: urn:schemas-upnp-org:device:ZonePlayer:1\r\nX-RINCON-HOUSEHOLD: Sonos_0GMKtbphVMYiyQV5QEPMPMp3Gs\r\n\r\n");
			CF.send(self.systemName, "M-SEARCH * HTTP/1.1\r\nHOST: 239.255.255.250:1900\r\nMAN: \"ssdp:discover\"\r\nMX: 1\r\nST: " + self.ST + "\r\n\r\n");
		}, 500);
	};

	self.emit = function() {
		var type = arguments[0];
		if (!self.eventCallbacks[type]) {
			CF.log("Undefined event!");
			return false;
		}

		var handlers = self.eventCallbacks[type];
		if (!Array.isArray(handlers)) {
			CF.log("No event handlers found for '" + type + "' event.");
			return false;
		}

		// Get arguments used for the emit, remove the type, assign to new array
		var l = arguments.length;
		var args = new Array(l - 1);
		for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

		var listeners = handlers.slice();
		for (var i = 0, l = listeners.length; i < l; i++) {
			listeners[i].apply(this, args);
		}
	};

	self.on = function(type, listener) {
		// Add listener to specific event
		if (!self.eventCallbacks[type]) {
			CF.log("Undefined event!");
			return false;
		}

		if (!Array.isArray(handlers)) {
			// Handlers is not an array, so lets make it one first
			self.eventCallbacks[type] = [listener];
		} else {
			// Add to the array
			self.eventCallbacks[type].push(listener);
		}
	};

	self.parseFeedbackSSDP = function(regex, data) {
		var isSonos = false;
		//CF.log("SonosDiscovery SSDP Returned:\n" + data);

		/* SAMPLE SONOS RESPONSE:
		HTTP/1.1 200 OK
		CACHE-CONTROL: max-age = 1800
		EXT:
		LOCATION: http://192.168.0.104:1400/xml/device_description.xml
		SERVER: Linux UPnP/1.0 Sonos/19.3-53220b (ZPS3)
		ST: urn:schemas-upnp-org:device:ZonePlayer:1
		USN: uuid:RINCON_000E5872AA6801400::urn:schemas-upnp-org:device:ZonePlayer:1
		X-RINCON-BOOTSEQ: 2
		X-RINCON-HOUSEHOLD: Sonos_0GMKtbphVMYiyQV5QEPMPMp3Gs
		*/

		// Clean up the header data from the response
		var deviceResponse = {};
		// Split each line of data
		var headers = data.split("\r\n");
		for (var i=0; i<headers.length - 1; i++) {
			// Split the header name from the data - some responses won't have space after the colon, so we can't rely on that to split the data.
			// Instead, split it all up using colons then join the data back if there were colons in the actual data.
			var headerData = headers[i].split(":");
			// Make sure the line was header data, skip HTTP Response, etc, that only have data (no header name).
			if (headerData.length>1) {
				// trim any spaces from the data, and join it all up if it contained colons (which we previously split)
				deviceResponse[headerData[0]] = trim(headerData.slice(1).join(":"));
			}
		}

		if (deviceResponse["ST"] == self.ST) {
			CF.log("FOUND SONOS ZONE - " + deviceResponse["LOCATION"]);
			self.devices.push(deviceResponse);
			// Now retrieve the device description from it's XML if one was given
			if (deviceResponse["LOCATION"]) {
				CF.request(deviceResponse["LOCATION"], function(status, headers, body) {
					if (status == 200) {
						// Read the XML data
						var parser = new DOMParser();
						var xmlDoc = parser.parseFromString(body, 'text/xml');
						deviceResponse.roomName = xmlDoc.getElementsByTagName("roomName")[0].childNodes[0].nodeValue;
						deviceResponse.zoneType = xmlDoc.getElementsByTagName("zoneType")[0].childNodes[0].nodeValue;
						deviceResponse.RINCON = /uuid:(.*)/.exec(xmlDoc.getElementsByTagName("UDN")[0].childNodes[0].nodeValue)[1];
						deviceResponse.IP = /([0-9]+(?:\.[0-9]+){3})/.exec(deviceResponse["LOCATION"])[1];
						deviceResponse.displayName = xmlDoc.getElementsByTagName("displayName")[0].childNodes[0].nodeValue;
						deviceResponse.sonosIconPath = xmlDoc.getElementsByTagName("url")[0].childNodes[0].nodeValue;
						deviceResponse.modelName = xmlDoc.getElementsByTagName("modelName")[0].childNodes[0].nodeValue;
						// Emit local event callbacks
						self.emit('DeviceDiscovered', deviceResponse);
						// Subscribe to events from this sonos device
						self.subscribeEvents(deviceResponse);
					}
				});
			}
		}
	};

	self.subscribeEvents = function(sonosDevice) {

		for(var service in self.services) {
			self.subscribeEvent(sonosDevice.IP, self.services[service].Service, self.services[service].Description);
		}
		//CF.setSystemProperties(self.systemNameSubscription, {address: sonosDevice.IP});

		/*for(var service in self.services) {
			self.subscribeEvent(sonosDevice.IP, self.services[service].Service, self.services[service].Description);
		}*/
	};

	self.subscribeEvent = function(ipaddr, path, subURL) {
		
		/*
		var msg = "SUBSCRIBE " + path + " HTTP/1.1\x0D\x0A";
		msg += "Cache-Control: no-cache";
		msg += "Pragma: no-cache";
		msg += "HOST: " + ipaddr + ":1400\x0D\x0A";
		msg += "USER-AGENT: Linux UPnP/1.0 Sonos/16.7-48310 (PCDCR)\x0D\x0A";
		msg += "CALLBACK: <http://" + CF.ipv4address + ":" + CF.systems[self.systemNameNotification].port + "/" + subURL + ">\x0D\x0A";
		msg += "NT: upnp:event\x0D\x0A";
		msg += "TIMEOUT: Second-1800\x0D\x0A\x0D\x0A";

		self.subscribeCommands.push(msg);
		*/
		
		var headers = {
			"Cache-Control" : "no-cache",
			"Pragma" : "no-cache",
			"USER-AGENT" : "Linux UPnP/1.0 Sonos/16.7-48310 (PCDCR)",
			"CALLBACK" : "<http://" + CF.ipv4address + ":" + CF.systems[self.systemNameNotification].port + "/" + subURL + ">",
			"NT" : "upnp:event",
			"TIMEOUT" : "Second-1800"
		};
		CF.request("http://" + ipaddr + ":1400" + path , "SUBSCRIBE", headers, function (status, headers, body) {
			CF.log(status + ", " + headers + ", " + body);
		});
	
	};

	/*
	self.onSubscribeConnectionChange = function(system, connected, remote) {
		if (connected === false) {
			self.subscribingToDevice = false;
		} else {
			if (self.subscribeCommands.length) {
				CF.send(self.systemNameSubscription, self.subscribeCommands.shift());
			}
		}
	};
	*/

	self.parseFeedbackSubscription = function(regex, data) {
		CF.log("SonosDiscovery Subscription Returned:\n" + data);
	};

	self.parseFeedbackNotification = function(regex, data) {
		CF.log("SonosDiscovery Notification Returned:\n" + data);
	};

	self.sendSoapRequest = function(url, host, xml, soapAction, callback) {
		url = host + url;
		CF.request( url, "POST", {"SOAPAction": soapAction}, xml, function(status, headers, body) {
			if (status == 200) {
				CF.log("POST succeeded");
				body = XMLEscape.unescape(body);
				if (typeof callback === 'function') {
					callback (true);
				} else {
					return true;
				}
			} else {
				CF.log("POST failed with status " + status);
				return false;
			}
		});
	};

	self.transportEventPlay = function(cmd) {
		var url, xml, soapBody, soapAction;
		var host = "http://" + self.devices[0].IP + ":" + self.port;
		url = '/MediaRenderer/AVTransport/Control';
		soapAction = "urn:schemas-upnp-org:service:AVTransport:1#" + cmd;
		soapBody = '<u:' + cmd + ' xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>0</InstanceID><Speed>1</Speed></u:' + cmd + '>';
		xml = self.soapRequestTemplate.replace('{0}', soapBody);
		self.sendSoapRequest(url, host, xml, soapAction, false);
		//self.AVTransportPlay(self.currentHost, 0, 1)
	}

	/*
	self.AVTransportPlay = function (callback, host, InstanceID, Speed)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#Play'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Play xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><Speed>'+ Speed+'</Speed></u:Play></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	*/

	return self;
};

CF.modules.push({
	name: "Sonos Discovery",	// the name of the module (mostly for display purposes)
	object: SonosDiscovery,		// the object to which the setup function belongs ("this")
	version: 1.0				// An optional module version number that is displayed in the Remote Debugger
});