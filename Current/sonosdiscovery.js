/* Sonos Viewer for CommandFusion
 ===============================================================================

 AUTHOR:	Jarrod Bell
 CONTACT:	Commandfusion
 VERSION:	v0.0.1

 =========================================================================
 HELP:

 This script discovers Sonos devices and then returns a JSON object which
 holds the player details as derived from the UPNP device description


 =========================================================================
 */

// ======================================================================
// Global Object
// ======================================================================


var SonosDiscovery = function (params) {

	var self = {
		ST                     :"urn:schemas-upnp-org:device:ZonePlayer:1", // ssdp:all if you want to discover any SSDP device.ZonePlayer:1 for just sonos players
		//devices                :[],
		systemName             :"SSDP Discovery",
		feedbackName           :"SSDP Discovery Feedback",
		SonosDiscoveredCallback:null,
		port                   :1400,
		soapRequestTemplate    :'<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body>{0}</s:Body></s:Envelope>',
        autoDiscoveryFlag: true
	};

	self.init = function () {
		CF.log("SonosDiscovery: init()");
        CF.getJoin(CF.GlobalTokensJoin, function (j, v, tokens) {
            //CF.logObject(tokens);
            self.autoDiscoveryFlag = tokens["[autoDiscoveryFlag]"];
            if (self.autoDiscoveryFlag === "1") {		// Listens for SSDP responses from sonos compoents and processes them
                CF.watch(CF.FeedbackMatchedEvent, self.systemName, self.feedbackName, self.parseFeedbackSSDP);

                // Send the discovery request
                setTimeout(function () {
                    //CF.send(self.systemName, "M-SEARCH * HTTP/1/1\r\nHOST: 239.255.255.250:1900\r\nMAN: \"ssdp:discover\"\r\nMX: 1\r\nST: urn:schemas-upnp-org:device:ZonePlayer:1\r\nX-RINCON-HOUSEHOLD: Sonos_0GMKtbphVMYiyQV5QEPMPMp3Gs\r\n\r\n");
                    CF.send(self.systemName, "M-SEARCH * HTTP/1/1\r\nHOST: 239.255.255.250:1900\r\nMAN: \"ssdp:discover\"\r\nMX: 1\r\nST: urn:schemas-upnp-org:device:ZonePlayer:1\r\nX-RINCON-HOUSEHOLD: HHID_5el6gdNv8jJHyTufy6zwtbngUrk\r\n\r\n");

                    //CF.send(self.systemName, "M-SEARCH * HTTP/1/1\r\nHOST: 239.255.255.250:1900\r\nMAN: \"ssdp:discover\"\r\nMX: 1\r\nST: " + self.ST + "\r\n\r\n");
                }, 500);
            }
            else {
                playerList = JSON.parse(tokens["[playerIPAddresses]"]);
                //CF.log("player list is:");
                //CF.logObject(playerList);

                for (var i = 0; i < playerList.length; i++) {
                    CF.log("Player IP is: " + playerList[i].s400.value);
                    self.getDeviceDetails("http://" + playerList[i].s400.value + ":1400/xml/device_description.xml");
                }
            }

        });

	};

	self.parseFeedbackSSDP = function (regex, data) {
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
		for (var i = 0; i < headers.length - 1; i++) {
			// Split the header name from the data - some responses won't have space after the colon, so we can't rely on that to split the data.
			// Instead, split it all up using colons then join the data back if there were colons in the actual data.
			var headerData = headers[i].split(":");
			// Make sure the line was header data, skip HTTP Response, etc, that only have data (no header name).
			if (headerData.length > 1) {
				// trim any spaces from the data, and join it all up if it contained colons (which we previously split)
				deviceResponse[headerData[0]] = Utils.trim(headerData.slice(1).join(":"));
			}
		}

		if (deviceResponse["ST"] == self.ST) {
			//CF.log("FOUND SONOS ZONE - " + deviceResponse["LOCATION"]);
			//self.devices.push(deviceResponse);
			// Now retrieve the device description from it's XML if one was given
			if (deviceResponse["LOCATION"]) {
                self.getDeviceDetails(deviceResponse["LOCATION"]);
            }
        }
	};

    self.getDeviceDetails = function (location) {
        deviceResponse = {};
        //CF.log("location is: " + location);
        CF.request(location, function (status, headers, body) {
            if (status == 200) {
                // Read the XML data
                //CF.log("discovery response is: " + body);
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(body, 'text/xml');
                deviceResponse.location = location;
                deviceResponse.roomName = xmlDoc.getElementsByTagName("roomName")[0].childNodes[0].nodeValue;
                deviceResponse.zoneType = xmlDoc.getElementsByTagName("zoneType")[0].childNodes[0].nodeValue;
                deviceResponse.RINCON = /uuid:(.*)/.exec(xmlDoc.getElementsByTagName("UDN")[0].childNodes[0].nodeValue)[1];
                deviceResponse.IP = /([0-9]+(?:\.[0-9]+){3})/.exec(location)[1];
                //CF.log("device IP is: " + deviceResponse.IP);
                deviceResponse.displayName = xmlDoc.getElementsByTagName("displayName")[0].childNodes[0].nodeValue;
                deviceResponse.sonosIconPath = xmlDoc.getElementsByTagName("url")[0].childNodes[0].nodeValue;
                deviceResponse.modelName = xmlDoc.getElementsByTagName("modelName")[0].childNodes[0].nodeValue;
                //CF.logObject(deviceResponse);
                if (self.SonosDiscoveredCallback !== null) {
                    self.SonosDiscoveredCallback(deviceResponse);
                }
                // Subscribe to events from this sonos device
            }
        });
    }


	return self;
};

CF.modules.push({
	                name   :"Sonos Discovery", // the name of the module (mostly for display purposes)
	                object :SonosDiscovery, // the object to which the setup function belongs ("this")
	                version:1.0                // An optional module version number that is displayed in the Remote Debugger
                });