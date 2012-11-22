// ===============================================================================
// Title:	Sonos Module for CommandFusion
// Author:	Simon Tuffley, Tuff Systems, Simon Post
// Email:	simon@tuffsystems.co.uk
// Web:		www.tuffsystems.co.uk
// ===============================================================================

// *************************
// Functionlaity To Do:

// Wirless dock's in music sources
// Line in - requires hunting for line devices during discovery I think
// Feedback to a SonosFeedback system so we can feedback changes such as player start/stop/pause, volume up/down
// handling of replace queue, clear queue etc on music sources
// shuffle play etc
// repeat etc
// crossfade
// get queue to refresh when it fails on selection of a music source
// get the right track name etc when the source is LAstFm or Radio




var SonosTopology = function (){	
	
	var self = {
		SSDPDeviceResponses: [], // Array to hold the responses from the SSDP search
		SSDPDevicesDiscovered: [], // Array that holds the initial response info later used to get the detailed device info
		discoveredDevicesDetails: [], // Array used to hold all discovered sonos devices
		zoneTopology: [], // Array used to hold the zone grouping information
		discoveryDelay: 2000, // Delay after discovery
		discoverCurNum: 0,
		discoverPrevNum: 0,
		responseProcessing: false, // Variable to make sure we only process one Sonos device at a time
		services : [ 	{ "Service": "/ZoneGroupTopology/Event", "Description": "Zone Group" }, // The service notifications we want to subscribe to
						{ "Service": "/MediaRenderer/AVTransport/Event", "Description": "Transport Event" },
						//{ "Service": "/MediaServer/ContentDirectory/Event", "Description": "Content Directory" },
						//{ "Service": "/MediaRenderer/RenderingControl/Event", "Description": "Render Control" }
		/*services : [ 	{ "Service": "/AlarmClock/Event", "Description": "Alarm Clock" },
				{ "Service": "/MusicServices/Event", "Description": "Music Services" },
				{ "Service": "/AudioIn/Event", "Description": "Audio In" },
				{ "Service": "/DeviceProperties/Event", "Description": "Device Properties" },
				{ "Service": "/SystemProperties/Event", "Description": "System Properties" },
				{ "Service": "/ZoneGroupTopology/Event", "Description": "Zone Group" },
				{ "Service": "/GroupManagement/Event", "Description": "Group Management" },
				{ "Service": "/MediaServer/ContentDirectory/Event", "Description": "Content Directory" },
				{ "Service": "/MediaRenderer/RenderingControl/Event", "Description": "Render Control" },
				{ "Service": "/MediaRenderer/ConnectionManager/Event", "Description": "Connection Manager" },
				{ "Service": "/MediaRenderer/AVTransport/Event", "Description": "Transport Event" }*/
			],
		port: ":1400", // default port to talk to Sonos on
		soapRequestTemplate: '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body>{0}</s:Body></s:Envelope>',
		selectedZoneCoordinator: "", // Holds selected zone Coordinator for various grouping functions
		// Top level menu for the mnusic sources side of the screen
		musicServicesTopList: [{s514: "Music Library"}, {s514: "Docked iPods"}, {s514: "Radio"}, {s514: "Last.FM"}, {s514: "Spotify"}, {s514: "Sonos Playlists"}, {s514: "Line In"}],
		lastFMTopList: [{s514: "Tag Radio"}, {s514: "Recent Stations"}, {s514: "My Stations"}],
		lastFMMyStations: [{s514: "Library"}, {s514: "Neighbourhood"}, {s514: "Recomendations"}],
		firstZoneMessage: true,
		musicSourceType: "",
		musicSourceParentID: "",
		musicSourceGrandParentID: "",
		musicSourceDisplayID: "",
		musicSourceLevel: 0,
		musicSourceList: [],
		musicSourceTrackLevel: false,
		musicSourceLevelQuery: [],
		spotifySessionID: "", //put your spotify user id here
		musicSourceDeviceID: "00-0E-58-28-3B-D4:8",
		musicSourceProvider: "Sonos",
		musicSourceListIndex: 0,
		currentZone: -1,
		subscribeCommands: [],
		notifyMsgQueue: [],
		totalMsg: "",
		msgDone: true,
		zonenum: 0,
		zoneSubscribeFinished: true,
		SSDPResponses: [],
		notifyingZone: -1,
		notifyingRINCON:"",
		notifyingRoomName:"",
		tmpMasterZone: "Not Set",
		userZoneGroupingUnderway: false,
		lastZoneGroupMessage: "",
		selectedZoneToGroup: "",
		nowPlayingZoneCoordinator: "",
		nowPlayingZoneCoordinatorIndex: 0,
		nowPlayingZoneIndex: 0,
		forceUpdate: false,
		subZones: [],
		lastFMTopTags:[],
		lastFMRecentStations: [],
		queueSelectedItemTrackNumber: "",
		wirelessDockIP: "",
		doInitalise: true,
		queueRowsToReturn: 30,
		currentHost: "",
		queueNumberReturned: 0,
		musicSourceRowsToReturn: 30,
		musicSourceNumberReturned: 0,
		tmpFirstRecord:[],
		metaDataHeader: '<DIDL-Lite xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:upnp="urn:schemas-upnp-org:metadata-1-0/upnp/" xmlns:r="urn:schemas-rinconnetworks-com:metadata-1-0/" xmlns="urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/">',
		metaDataFooter: '</DIDL-Lite>',
		masterVolume: 0,
		startMasterVolume: 0,
		masterMute: 0,		
		numZonesInGroup: 0,
		startVol: 0,
		temp:0,
		//zoneVolumes:[],
		//zoneMutes: 0,
		parseUnderway: false,
		delay:5000,
		zones : [], // variable to hold zones discovered through SSDP
		allSubscribesDone: false,
		timeGetPositionInfo: 0



		}

	// Function that initialises the sonos client and uses SSDP to find sonos components

	self.initialise = function () {
		CF.log("Commencing Sonos device discovery");
		//CF.setJoin("d114",1);
		// var buildData = new buildUPNP();
		// buildData.buildUPNPCalls();
		//CF.setJoin("d131",1);
		sonosTopology.discoverDevices();
		// setTimeout(function() { self.subscribeAllZones(); }, 6000);
	};


	// ----------------------------------------------------------------------------
	// Routines that are used to discover sonos components and subscribe to them
	// ----------------------------------------------------------------------------


	// SSDP Discovery - this message get zone players to respond although both
	// Wireless docks and subs will also respond
	// the X-RINCON-HOUSEHOLD: HHID_5el6gdNv8jJHyTufy6zwtbngUrk is the unique Sonos
	// device type and so may change

	// ----------------------------------------------------------------------------
		// Routines that are used to discover sonos components and subscribe to them
		// ----------------------------------------------------------------------------


		// SSDP Discovery - this message get zone players to respond although both
		// Wireless docks and subs will also respond
		// the X-RINCON-HOUSEHOLD: HHID_5el6gdNv8jJHyTufy6zwtbngUrk is the unique Sonos
		// device type and so may change

	self.discoverDevices = function () {
		//var message = "M-SEARCH * HTTP/1.1\r\n" + "HOST:239.255.255.250:1900\r\n" + "MX:1\r\n" + "ST: urn:schemas-upnp-org:device:ZonePlayer:1\r\n" + self.sonosSSDPDeviceType  + "\r\n";		
		// var message = "M-SEARCH * HTTP/1.1\r\n" + "HOST:239.255.255.250:1900\r\n" + "MX:1\r\n" + "ST: urn:schemas-upnp-org:device:ZonePlayer:1\r\n" + self.sonosSSDPDeviceType  + "\r\n";
		var message = "M-SEARCH * HTTP/1.1\r\n" + "HOST:239.255.255.250:1900\r\n" + "MX:1\r\n" + "ST: urn:schemas-upnp-org:device:ZonePlayer:1\r\n" + self.SSDPDeviceType + "\r\n";
		CF.send("SSDP Discovery", message, CF.UTF8);
		setTimeout(function() { self.checkDiscoveryCompleted(); }, 1000);

	};
			
		// This function effectively waits until no more devices are responding and then fires of the next stage of the process
	
	self.checkDiscoveryCompleted = function () {
		if (self.discoverCurNum === self.discoverPrevNum) {  // the count of discovered devices has not increased
			// disconnect the listening system so we don't get any other random responses later
			CF.setSystemProperties("SSDP Discovery", {enabled: false});
			CF.log("No more zones to discover");
			self.getSonosXML();
		}
		else {
			self.discoverPrevNum = self.discoverCurNum;
			CF.log("Discovering Zones still");
			setTimeout(function() { self.checkDiscoveryCompleted(); }, 1000);

		}
	}

	self.onProcessSSDPDiscovery = function(theSystem, feedback) {
		//var findSonos = /Sonos/;  // think this is redundant as the SSDP will now only return Sonos components	
		//if(findSonos.exec(feedback)) {
			self.discoverCurNum++;
			var findWirelessDock = /WD100/;  // to emilinate Wireless docks
			var findSub = /ANVIL/;  // to elimninate sub woofers
			// Get wireless dock IP address which we will need for music source stuff but we dont want it in zones
			if (findWirelessDock.exec(feedback)) {
				var findIP = /http:\/\/[\w.\/]+/;  // get IP address
				self.wirelessDockIP = findIP.exec(feedback)
				//CF.log("Wireless dock found with IP: " + self.wirelessDockIP);
			}
			if (!findWirelessDock.exec(feedback) && !findSub.exec(feedback)) {
				//CF.log("SSDP packet was: " + feedback);
				self.SSDPResponses.push(feedback);  // push the feedback to process on mass
				self.getSonosDetails();
			}
		//} 
	};
	
	// Gets the device description which holds various details about the sonos component

	self.getSonosDetails = function () {
		if (self.SSDPResponses.length != 0) {
			var feedback = self.SSDPResponses.shift();
			var findIP = /http:\/\/[\w.\/]+/;  // get IP address
			var findRINCON = /RINCON_[A-Z0-9]{17}/;  //  get RINCON which is unique ID of componenet
			//CF.log("feedback is: " + feedback);
			//CF.log("IP Address is:" + findIP.exec(feedback));
			//CF.log("RINCON is:" + findRINCON.exec(feedback));
			self.zones.push({IP: findIP.exec(feedback), RINCON: findRINCON.exec(feedback)});
			self.getSonosDetails();  // cycle round to process each response
		}

	};
	
	self.getSonosXML = function () {
		var zones = self.zones;
		self.discoveredDevicesDetails = [];
		for(var zone in zones) {
			var xmldoc = self.fetchXML(zones[zone].IP + ":1400/xml/device_description.xml", function (xmlDoc) {
				//CF.log("xmlDOC is: " + xmlDoc);
				self.discoveredDevicesDetails.push(self.parseXML(xmlDoc));
			});
		}
		setTimeout(function() { self.checkSonosXMLCompleted(); }, 1000);
	};
	
	self.checkSonosXMLCompleted = function () {
		if (self.discoveredDevicesDetails.length === self.zones.length) {  // We must have got the XML for all zones
			CF.log("Got Sonos XML");
			self.subscribeAllZones();
		}
		else {
			CF.log("Still getting Sonos XML");
			setTimeout(function() { self.checkSonosXMLCompleted(); }, 1000);

		}
	}

	// Exract the relevant details from the device description XML
	
	self.fetchXML = function(url, callback) {
		try {
			CF.request(url, function (status, headers, body) {
				if (status == 200) {
					//CF.log("Body is: " + body);
					/*var xotree = new XML.ObjTree();
					var dumper = new JKL.Dumper(); 
					var tree = xotree.parseXML(body);
                    //tree = JSON.stringify(tree);
					CF.logObject("JSON version is: " + JSON.stringify(tree));
                    CF.log("Sonos Name is: " + tree.root.device.roomName);*/
					var parser = new DOMParser();
					callback(parser.parseFromString(body, 'text/xml'));
				} else {
					CF.log("Error with received data");
				}
			});
		} catch (e) {
			CF.log("Exception caught fetching XML: " + e);
		}
	};
	
	// Exract the relevant details from the device description XML
	
	self.parseXML = function(xmlDoc) {
		//CF.log("Getting a zones information");
		var roomName, zoneType, RINCON, IP, displayName, sonosIconPath, modelName;
		roomName = xmlDoc.getElementsByTagName("roomName")[0].childNodes[0].nodeValue;
		zoneType = xmlDoc.getElementsByTagName("zoneType")[0].childNodes[0].nodeValue;
		RINCON = xmlDoc.getElementsByTagName("UDN")[0].childNodes[0].nodeValue;
		RINCON = RINCON.substr(5,RINCON.length);
		IP = xmlDoc.getElementsByTagName("friendlyName")[0].childNodes[0].nodeValue;
		IP = "http://" + IP.substr(0,IP.search("-")-1);
		displayName = xmlDoc.getElementsByTagName("displayName")[0].childNodes[0].nodeValue;
		sonosIconPath = xmlDoc.getElementsByTagName("url")[0].childNodes[0].nodeValue;
		modelName = xmlDoc.getElementsByTagName("modelName")[0].childNodes[0].nodeValue;
		//CF.log("Got a RINCON of: " + RINCON + " and roomName: " + roomName);
		// var sonosJSON = self.xmlToJSON(xmlDoc);
		// CF.log("The JSON equivalent is: "+ JSON.stringify(sonosJSON));

		return({roomName: roomName, zoneType: zoneType, IP: IP, RINCON: RINCON, displayName: displayName, sonosIconPath: sonosIconPath, modelName: modelName, volume:0, mute: 0, currentTrackName: "None", currentTrackArtist: "None", currentTrackAlbum: "None", currentTrackAlbumArtAddr: "None"});
	};
	
	self.xmlToJSON = function (node) {
		
       var json = {};
    var cloneNS = function(ns) {
        var nns = {};
        for (var n in ns) {
            if (ns.hasOwnProperty(n)) {
                nns[n] = ns[n];
            }
        }
        return nns;
    };
    var process = function (node, obj, ns) {
        if (node.nodeType === 3) {
            if (!node.nodeValue.match(/[\S]+/)) return;
            if (obj["$"] instanceof Array) {
                obj["$"].push(node.nodeValue);
            } else if (obj["$"] instanceof Object) {
                obj["$"] = [obj["$"], node.nodeValue];
            } else {
                obj["$"] = node.nodeValue;
            }
        } else if (node.nodeType === 1) {
            var p = {};
            var nodeName = node.nodeName;
            for (var i = 0; node.attributes && i < node.attributes.length; i++) {
                var attr = node.attributes[i];
                var name = attr.nodeName;
                var value = attr.nodeValue;
                if (name === "xmlns") {
                    ns["$"] = value;
                } else if (name.indexOf("xmlns:") === 0) {
                    ns[name.substr(name.indexOf(":") + 1)] = value;
                } else {
                    p["@" + name] = value;
                }
            }
            for (var prefix in ns) {
                if (ns.hasOwnProperty(prefix)) {
                    p["@xmlns"] = p["@xmlns"] || {};
                    p["@xmlns"][prefix] = ns[prefix];
                }
            }
            if (obj[nodeName] instanceof Array) {
                obj[nodeName].push(p);
            } else if (obj[nodeName] instanceof Object) {
                obj[nodeName] = [obj[nodeName], p];
            } else {
                obj[nodeName] = p;
            }
            for (var j = 0; j < node.childNodes.length; j++) {
                process(node.childNodes[j], p, cloneNS(ns));
            }
        } else if (node.nodeType === 9) {
            for (var k = 0; k < node.childNodes.length; k++) {
                process(node.childNodes[k], obj, cloneNS(ns));
            }
        }
    };
    process(node, json, {});
    return json;
}
	
	// Once the zones have been found, this function subscribes to the notfiy event
	// of each zone player
	// Routine to do the subscribe

	self.subscribeAllZones = function() {
		//CF.log("Number of zones to subscribe to is: " + self.discoveredDevicesDetails.length + " and subscribing to Zone: " + self.zonenum);
		CF.setJoin("s3", "Processing Zone " + self.zonenum + " of " + (self.discoveredDevicesDetails.length - 1) + " zones");
				if (self.zonenum < self.discoveredDevicesDetails.length) {
			CF.setSystemProperties("Subscribe To Notify", {address: self.discoveredDevicesDetails[self.zonenum].IP.substr(7)});
			self.subscripeToAllEvents(self.discoveredDevicesDetails[self.zonenum].IP.substr(7),self.discoveredDevicesDetails[self.zonenum].roomName);
		}
		else {
			CF.log("**********************************************************");
			CF.log("All zone subscriptions have completed so can start everything now");
			CF.log("**********************************************************");
			CF.log("The discovered device details are:");			
			self.allSubscribesDone = true;
			self.parseNotifyEvent();
			//CF.setJoin("d131", 0);
			//CF.setJoin("d114",1);
			CF.listRemove("l13");
			CF.listAdd("l13", self.musicServicesTopList);
			self.getLastFMTopTags();
			self.getLASTMFRecentStations();
			self.zonenum = 0;

		}
	};
	
	// Routine to do the subscribe

	self.subscripeToAllEvents = function(ipaddr, roomName) {
		CF.log("Subscribing to events");
		self.zoneSubscribeFinished = false;
		for(var service in self.services) {
			self.subscribeSonosEvents(ipaddr, roomName, self.services[service].Service, self.services[service].Description);
		}
		self.zoneSubscribeFinished = true;
		setTimeout(function() { self.subscribeAllZones(); }, 3590000);  // Technically a subscribe only lasts for a specified period so must resubscribe
	};
	
	self.subscribeSonosEvents = function(ipaddr, roomName, path, subURL) {
		var msg = "SUBSCRIBE " + path + " HTTP/1.1\x0D\x0A";
		//CF.log("subscribe message is: " + msg + "for room: " + roomName + "on port: " + CF.systems[roomName].port) ;
		msg += "Cache-Control: no-cache";
		msg += "Pragma: no-cache";
		msg += "HOST: " + ipaddr + ":1400\x0D\x0A";
		msg += "USER-AGENT: Linux UPnP/1.0 Sonos/16.7-48310 (PCDCR)\x0D\x0A";
		msg += "CALLBACK: <http://" + CF.ipv4address + ":" + CF.systems[roomName].port + "/" + subURL + ">\x0D\x0A";
		//msg += "CALLBACK: <http://" + CF.ipv4address + ":" + CF.systems["Notify Listener"].port + ">\x0D\x0A";
		msg += "NT: upnp:event\x0D\x0A";
		msg += "TIMEOUT: Second-1800\x0D\x0A\x0D\x0A";
		self.subscribeCommands.push(msg);
		self.subscribeMsgSend();
	};
	
	self.subscribeMsgSend = function() {
		//CF.log("The nunber of subscribes left to send is: "+ self.subscribeCommands.length);
		if (self.zoneSubscribeFinished && self.msgDone && self.subscribeCommands.length < 1) {
			this.zonenum +=1;
			if (this.zonenum <= self.discoveredDevicesDetails.length) {
				self.subscribeAllZones(self.zones)
				};
		};	
		if (self.msgDone && self.subscribeCommands.length != 0) {
			self.msgDone = false;
			var cmdtosend = self.subscribeCommands.shift();
			CF.send("Subscribe To Notify", cmdtosend);
		}
	};
	
	self.onSubscribeConnectionChange = function(system, connected, remote) {
			if (connected === false) {
				self.msgDone = true;
				if (!self.allSubscribesDone) {
					self.subscribeMsgSend();
				};
			}
		};
		
	self.onProcessSubscribeResponse = function (theSystem, feedback) {
		var xml = Utils.unescape(feedback);
	};	



	// ----------------------------------------------------------------------------
	// The following routines are used to handle sonos zone groupings
	// ----------------------------------------------------------------------------

	// This routine handles the Zone Group notify message that each box sends when
	// any type of change is made to a zone group, e.g. members are added or deleted.
	// The Notify message can send the zones in any order although they will always
	// be grouped under a zone coordinator (a non-gouped box has the same zone
	// coordinator as its own RINCON and no other members).
	// Since we want to order the zones alphabetically in the UI (but with all zone
	// members sorted alphabetically next to each other) we need to do some cycling
	// through using the zoneMembers array below
	
	self.parseZoneGroup = function(response) {
		if (!self.userZoneGroupingUnderway) { // this is set if a user is doing a zone grouping so that we dont process any zone changes which would mess up the zonesGrouping array
			self.userZoneGroupingUnderway = true; // stop another message being processed half way through
			// CF.log("Group message is: " + response)
			var backupZoneTopology = self.cloneObject(self.zoneTopology);
			self.zoneTopology=[];  // Clear current grouping
			// We need a tmp copy because we have info like current track etc in the array which we will want to put
			// back into the new new zone group array once it has been built (this info does not come in
			// the zone notify message
			var zoneCoordinatorRINCON = ""; // will hold the coordinator of the urrent grouped zones
			var zoneCoordinatorName = ""  // Zone coordinator name which we use to make sorting easier
			var groupNodes = jQuery(response).find("ZoneGroup"); //find all the ZoneGroups
			for (var i = 0; i < groupNodes.length; i++) { // loop around for the number of grouped zones
				var numZoneMembers = groupNodes[i].childNodes.length;  // get how many zone members there are: 1 = zone is not grouped, >1 is in group but bear in mind some maybe Invisible like a sub woofer (Anvil)
				if (numZoneMembers == 1 && groupNodes[i].childNodes[0].hasAttribute("Invisible")) {  //all devices such as wireless docks, subs etc carry an invisible flag that we can use to exclude them from the zone group
					continue;
					}
				zoneCoordinatorRINCON = groupNodes[i].attributes["Coordinator"].value;  //  get the UUID of the coordinator of the zone
				//CF.log("zoneCorrdinatorRincon is:" + zoneCoordinatorRINCON);
				if (typeof zoneCoordinatorRINCON === "undefined") {
					self.zoneTopology = self.cloneObject(backupZoneTopology);
					return
				}
				zoneCoordinatorName = self.getDetailsFromRINCON(zoneCoordinatorRINCON).roomName  // Get the name of the coordinator
				if (zoneCoordinatorName == "Not Found") {
					self.zoneTopology = self.cloneObject(backupZoneTopology);
					return
				};
				//CF.log("zoneCoordinatorName is: " + zoneCoordinatorName);
				var zoneMemberCount = 0; // variable used to count how many actual zone members there are which are visible (i.e. a real zone not a sub or wireless dock etc)
				for (var j = 0; j < groupNodes[i].childNodes.length; j++) {
					if (groupNodes[i].childNodes[j].hasAttribute("Invisible")) {  //all devices such as wireless docks, subs etc carry an invisible flag that we can use to exclude them from the zone group
						continue;
						}
					// Get various variables that we will put into the zonesGrouping array for later use
					var deviceRINCON = groupNodes[i].childNodes[j].attributes["UUID"].value;
					var deviceRoomName = groupNodes[i].childNodes[j].attributes["ZoneName"].value;
					self.zoneTopology.push({coordinatorName: zoneCoordinatorName, coordinatorRINCON: zoneCoordinatorRINCON, RINCON: deviceRINCON, roomName: deviceRoomName});
				}
			}
			if (self.zoneTopology.length > 1) {
				
				// First sort into alphabetical order
				self.zoneTopology.sort(function(a, b){ var nameA=a.roomName, nameB=b.roomName
					if (nameA < nameB) return -1 ;
					if (nameA > nameB) return 1;
					return 0;
				});
				
				// Second iterate through so that we put all zones with same coordinator alphabetically into the list
				for (var i = 0; i < self.zoneTopology.length; i++) {
					var startZoneCoordinator = self.zoneTopology[i].coordinatorName;
					var numInserts = 1
					for (var j = i+1; j < self.zoneTopology.length; j++) {
						if (self.zoneTopology[j].coordinatorName  == startZoneCoordinator) {
				    		// self.zoneTopology.splice(i+1, 0, self.zoneTopology.splice(j, 1)[0]);
							var val = self.zoneTopology.splice(j, 1);
							self.zoneTopology.splice(i+numInserts, 0, val[0]);
							numInserts++;
						}
					}
				};
			}
			
			// Populate the UI
			CF.listRemove("l10");
			var joinData = [];
			if (typeof self.zoneTopology[0].roomName === "undefined") {return}
			joinData.push({title: true, s1: self.zoneTopology[0].roomName});
			for (var i = 1; i < self.zoneTopology.length; i++) {
				var tmpRoomName = self.zoneTopology[i].roomName;
				var prevCoordinator = self.zoneTopology[i-1].coordinatorRINCON;
				var curCoordinator = self.zoneTopology[i].coordinatorRINCON;
				var tmpRINCON = self.zoneTopology[i].RINCON;
				if (curCoordinator != prevCoordinator) {
					joinData.push({title: true, s1: tmpRoomName});
				}
				else {
					joinData.push({s1: tmpRoomName});
				}
			};
			CF.listAdd("l10", joinData);
			if (self.firstZoneMessage) { // it will now be safe to select the first zone
				//self.selectZone("","",0);
				self.firstZoneMessage = false;
	
			}
			self.userZoneGroupingUnderway = false;  // allow processing again			

		}
	}
	
	// This function builds the dialog that is used to allow the user to add or remove zones
	// from a group.  It puts all the zone names into the list box but it knows that if
	// the zone coordinator for any member is the same as the zone coordinator selected by the user
	// that it has to set the check box on (i.e that member is in the zone group)
	
	self.doZoneGrouping = function(join, list, listIndex) {
		self.userZoneGroupingUnderway = true; // prevent the processing of zone notify messages
		CF.listRemove("l11");
		CF.setJoin("d127",1); // show the zone member change screen
		var joinData = [];
		self.selectedZoneCoordinator = self.zoneTopology[listIndex].coordinatorRINCON;
		for (var i = 0; i < self.zoneTopology.length; i++) {
			var tmpRoomName = self.zoneTopology[i].roomName;
			var tmpRINCON = self.zoneTopology[i].RINCON;
			var tmpCoordinator = self.zoneTopology[i].coordinatorRINCON;
			if (self.selectedZoneCoordinator == tmpCoordinator) {
				joinData.push({d15000: 1, s1: tmpRoomName}); // d15000 is the check box
			}
			else {
				joinData.push({d15000:0, s1: tmpRoomName});
			}
		};
		CF.listAdd("l11", joinData);
	};
	// Called by the button in the zone grouping list to add or delete a zone fom the group	
	self.changeZoneToGroup = function(join, list, listIndex) {
		var selectedZoneToGroup = self.getDetailsFromRINCON(self.zoneTopology[listIndex].RINCON).IP  + self.port;  // Get the details of the coordinator
		//CF.log("selectedZonetoGroup is: " + selectedZoneToGroup + " and coordinator is: " + self.selectedZoneCoordinator);
		CF.getJoin("l11:" + listIndex + ":d15000", function(j, v, tokens) {
			//CF.log("V is: " + v);
			if (v == "1") {
				self.addZoneToGroup(selectedZoneToGroup);
			}
			else {
				self.removeZoneFromGroup(selectedZoneToGroup);
			};
		});
	};
	
	// Add the zone to a group
	
	self.addZoneToGroup = function(host) {
        // soapBody = '<u:SetAVTransportURI xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>0</InstanceID><CurrentURI>x-rincon:' + self.selectedZoneCoordinator  + '</CurrentURI><CurrentURIMetaData></CurrentURIMetaData></u:SetAVTransportURI>';
		self.AVTransportSetAVTransportURI("", host, 0, "x-rincon:" + self.selectedZoneCoordinator ,"" )
	};

	// Send the command to remove the zone from the group.  You tell it to become a
	
	self.removeZoneFromGroup = function(host) {
		self.AVTransportBecomeCoordinatorOfStandaloneGroup("", host, 0)
	};
	
	
	// This function is run when you hit done on the zone member page and then also
	// forces a process of any zone changes in case the zone was changed by some other
	// user.
	
	self.reEnableZoneNotify = function() {
		self.userZoneGroupingUnderway = false;
		if (self.lastZoneGroupMessage != "") {
			self.parseZoneGroup(self.lastZoneGroupMessage);
		}
	};

	// this function handles a re user selecting a zone in the UI
	// It sets up some variables used by other functions, sends 
	// a GEtPOsInfo request which gets all the current track information
	// and then gets the queue for the current zone.
	// At some point we will have to put in place better handling of very long lists of
	// tracks and other items

	self.selectZone = function(join, list, listIndex) {
		// join = list + ":" + listIndex + ":s2";
		self.currentZone = listIndex;  
		self.nowPlayingZoneCoordinator = self.zoneTopology[listIndex].coordinatorRINCON;
		self.nowPlayingZoneCoordinatorIndex = self.getZonesIndexFromRINCON(self.nowPlayingZoneCoordinator);
		self.currentHost = self.discoveredDevicesDetails[self.nowPlayingZoneCoordinatorIndex].IP + self.port;
		// self.setNumZonesInGroup(); // this function calculates how many zones there are in the selected zone grouping (may only be 1 of course).  This is needed throughout for various things like volume handling
		self.calcMuteAndZoneVolumeDetails();
		self.getPositionInfo();
		self.displayCurrentZone();
		sonosTopology.receiveSonosRoomChange(self.discoveredDevicesDetails[self.nowPlayingZoneCoordinatorIndex]);
		CF.listRemove("l12");
		self.queueNumberReturned = 0;
		self.getQueueForCurrentZone();
	};	

	
	self.setNumZonesInGroup = function () {
		self.numZonesInGroup = 0;
		self.masterVolume = 0;
		for (var i = 0; i < self.zoneTopology.length; i++) {
			if (self.zoneTopology[i].coordinatorRINCON == self.nowPlayingZoneCoordinator) {
				self.numZonesInGroup = self.numZonesInGroup + 1;
				self.masterVolume = self.masterVolume + parseInt(self.getDetailsFromRINCON(self.zoneTopology[i].RINCON).volume);
			}
		}
		CF.log("The master volume is: " + self.masterVolume);
		self.masterVolume = parseInt(self.masterVolume)/parseInt(self.numZonesInGroup);
		CF.log("The number of zones in this group is: " + self.numZonesInGroup);
		CF.log("The master volume is: " + self.masterVolume);
	}

	// ----------------------------------------------------------------------------
	// Functions that handle selection of the music sources.  Currently we can only
	// handle normal libraries, Spotify, Last.FM, Radio, Sonos Playlists and Line In
	// ----------------------------------------------------------------------------

	self.selectMusicSource = function (join, list, listIndex) {
		self.musicSourcePressed = true;  // Used to stop any long queues we might be processing
		if (self.musicSourceLevel == 0) { // We are at the top level menu
			switch (listIndex) {
				case 0:  // will be a music
					//self.musicSourceLevelQuery.push("");
					self.musicSourceDisplayID = "A:"; // as we are at the top level child and parent must be set the same
					self.musicSourceType = 0;
					break;
				case 1:  // will be a docked ipod
					//self.musicSourceLevelQuery.push("");
					self.musicSourceDisplayID = "0"; // as we are at the top level child and parent must be set the same
					self.musicSourceType = 1;
					break;
				case 2:  // will be Radio 
					//self.musicSourceLevelQuery.push("");
					self.musicSourceDisplayID = "root"; // as we are at the top level child and parent must be set the same
					self.musicSourceType = 2;
					break;
				case 3:  // will be LastFM
					//self.musicSourceLevelQuery.push("");
					self.musicSourceDisplayID = "root"; // as we are at the top level child and parent must be set the same
					self.musicSourceType = 3;
					break;
				case 4:  // will be Spotify
					//self.musicSourceLevelQuery.push("");
					self.musicSourceDisplayID = "root"; // as we are at the top level child and parent must be set the same
					self.musicSourceType = 4;
					break;
				case 5:  // will be Sonos Playlists
					//self.musicSourceLevelQuery.push("");
					self.musicSourceDisplayID = "SQ:"; // as we are at the top level child and parent must be set the same
					self.musicSourceType = 5;
					break;
			}

		}
		if (self.musicSourceTrackLevel) {
			self.musicSourceListIndex = listIndex;
			self.showMusicSourceActions();
			return
		}
		// this time we want to do different things depending upon the music source as handling sonos, radio etc is different form handling music library
		
		// if we are not at the top level of the source, set the source we are going to look for as the source of the selected item in the list
		if (self.musicSourceList.length > 0) {self.musicSourceDisplayID = self.musicSourceList[listIndex].sourceID};
		self.tmpFirstRecord = []  // clear the array used to handle 'All' functionality
		self.tmpFirstRecord[0]=self.musicSourceList[listIndex];  // set the top of the list as the list item pushed
		self.musicSourceList = [];  // clear the music source list in preparation for repolpulating
		CF.listRemove("l13");  // empty the UI list
		self.musicSourceNumberReturned = 0; // Clear the number of items in the current list
		self.musicSourceLevel++;	// add one to the level counter so we know how far down the tree we have gone
		self.musicSourceLevelQuery.push(self.musicSourceDisplayID);  // push the item we have selected so that when we reverse up the tree we can retrieve the items
		
		// the follwoing bits will populate the musicsourcelist the http calls for which will vary by the music source.
		// since these are all call backs, each music source has its own call back processing and when finished they arr return to the same routine to populate the
		// UI
		
		switch (self.musicSourceType) {
			case 0:  // will be a standard iTunes or Sonos music library
				self.getMusicSourceForLibrary();
				break;
			case 1:  // will be a docked ipod
				break;
			case 2:  // will be Radio 
				self.getMusicSourceRadio();
				break;
			case 3:  // will be LastFM
				// LastFM is very different as there are limited levels and the data is farily fixed and got at initialisation time
				CF.log("Got a LastFM Source select");
				CF.log("self.musicSourceLevel is: " + self.musicSourceLevel)
				switch (self.musicSourceLevel) {
					case 1: // We are at top level lastFM menu
						CF.listRemove("l13");
						CF.listAdd("l13", self.lastFMTopList);
					break;
					
					case 2: // We are at a lower level and what we do depends upon listIndex
						switch (listIndex) {
							case 0: // Tag Radio was selected
								self.musicSourceTrackLevel = true;  //  tell it that we are at track level as it will need different behaviour on clicking.
								self.musicSourceList = self.cloneObject(self.lastFMTopTags);
								CF.listRemove("l13");
								// now we have to populate the list
								for (i=0; i < self.musicSourceList.length; i++) {
									CF.listAdd("l13", [{s513: self.musicSourceList[i].sourceArt, s514: self.musicSourceList[i].sourceName}]);
									}
								//CF.listRemove("l13");
								//CF.listAdd("l13", self.lastFMTopTags);
							break;
							case 1: // Recent Stations was selected
								self.musicSourceTrackLevel = true;  //  tell it that we are at track level as it will need different behaviour on clicking.
								self.musicSourceList = self.cloneObject(self.lastFMRecentStations);
								CF.listRemove("l13");
								// now we have to populate the list
								for (i=0; i < self.musicSourceList.length; i++) {
									CF.listAdd("l13", [{s513: self.musicSourceList[i].sourceArt, s514: self.musicSourceList[i].sourceName}]);
									}
								//CF.listRemove("l13");
								//CF.listAdd("l13", self.lastFMRecentStations);
							break;
							case 2: // My Stations was selected
								self.musicSourceTrackLevel = true;  //  tell it that we are at track level as it will need different behaviour on clicking.
								CF.listRemove("l13");
								CF.listAdd("l13", self.lastFMMyStations);
								self.musicSourceList.push({sourceName: "LIBRARY", sourceRes: res, sourceArt:"", sourceID: title, sourceParentID: "RECENT", sourceClass: "LastFM"});
								sself.musicSourceList.push({sourceName: "NEIGHBOURHOOD", sourceRes: res, sourceArt:"", sourceID: title, sourceParentID: "RECENT", sourceClass: "LastFM"});
								self.musicSourceList.push({sourceName: "RECOMMENDATIONS", sourceRes: res, sourceArt:"", sourceID: title, sourceParentID: "RECENT", sourceClass: "LastFM"});

							break;
						}
					break;
					}
				break;
			case 4:  // will be Spotify
				self.getMusicSourceSpotify();
				break;
			case 5:  // will be Sonos Playlists
				self.getMusicSourceForLibrary();
				break;

		}
	};

	// Handles moving back up the music source tree
	
	self.musicSourceBack = function() {
		self.musicSourceTrackLevel = false;  //  tell it that we are no longer at track level as it will need different behaviour on clicking.
		self.musicSourceList = [];  // will be used to hold the old version of the music list
		self.musicSourceLevel--;	// we must be somewhere down the tree so add one to the source level
		if (self.musicSourceLevelQuery.length>0) {
			self.musicSourceDisplayID = self.musicSourceLevelQuery.pop();
		}
		if (self.musicSourceLevelQuery.length>0) {
			self.musicSourceDisplayID = self.musicSourceLevelQuery.pop();
		}
		if (self.musicSourceLevel < 0) {
			self.musicSourceLevel = 0;
		}
		CF.listRemove("l13");
		self.musicSourceNumberReturned = 0; // Clear the number of items in the current list
		if (self.musicSourceLevel == 0) {
			CF.listAdd("l13", self.musicServicesTopList);
		}
		else {
			self.musicSourceLevel--;	// we must be somewhere down the tree so add one to the source level
			self.selectMusicSource("","", self.musicSourceType);
		}
	}

	self.getMusicSourceForLibrary = function () {
		self.ContentDirectoryBrowse(self.processGetMusicSourceForLibrary, self.currentHost, self.musicSourceDisplayID, "BrowseDirectChildren", "dc:title,res,dc:creator,upnp:artist,upnp:album,upnp:albumArtURI", self.musicSourceNumberReturned, self.musicSourceRowsToReturn, "")

	};
	
	self.processGetMusicSourceForLibrary = function (response) {
		CF.log("Processing music source list");
		CF.log("self.nusicSourcePressed is: "  + self.musicSourcePressed)
		var body = response.Result;
		// if (response.NumberReturned = 0) {return};
		CF.log("Number of results returned is: " + response.NumberReturned);
		CF.log("Total matches is: " + response.TotalMatches)
		CF.log("Total result returned is: " + self.musicSourceNumberReturned)
		body = Utils.unescape(body);
		i = body.indexOf("<item", j);
		var i = 0, j = 0, k = 0, l = 0, artist = "", title = "", res = "", art = "", nextTag = "", endTag = ""
		// having got the response, we can check to see whether we have reached track level by checking to see what object types are in the response
		if (body.indexOf("<upnp:class>object.item.audioItem.musicTrack</upnp:class>") > 0) {
			// We have reached track level in this data
			// Put a first item into the list which is the select all item which will be used later for special behaviours
			//self.musicSourceList.push({sourceName: "All", sourceRes: "", sourceArt:"", sourceID: ""});
			self.musicSourceList.push(self.tmpFirstRecord[0]);
			self.musicSourceList[0].sourceName = "All";
			self.musicSourceTrackLevel = true;  //  tell it that we are at track level as it will need different behaviour on clicking.
			// now we must set the tags as these are different for track level
			startTag = "<item";
			endTag = "</item>";
		}
		else {
			self.musicSourceTrackLevel = false;  // set flag to say we are not at track level
			startTag = "<container";  // set the tags as these are different from at track level
			endTag = "</container>";
		
		}
		// now we can get and process the records
		i = body.indexOf(startTag, j);
		while (i >= 0) {
			// Loop over all items, where each item is a track on the queue.
			j = body.indexOf(endTag, i);
			var track = body.substring(i + startTag.length, j);
			// CF.log("track is: " + track);
			newDisplayID = self.extractTag(track, 'id="', '" ');
			// CF.log("sourceid is : " + newDisplayID);
			title = self.extractTag(track, "<dc:title>", "</dc:title>");
			res = self.extractTag(track, "<res ", "</res>");
			art = self.extractTag(track, "<upnp:albumArtURI>", "</upnp:albumArtURI>");
			parentID = self.extractTag(track, "parentID=", '" ');
			//CF.log("parentid is : " + parentID);
			upnpClass = self.extractTag(track, "<upnp:class>", "</upnp:class>");
			i = body.indexOf(startTag, j);
			self.musicSourceList.push({sourceName: title, sourceRes: res, sourceArt: self.currentHost + art + art, sourceID: newDisplayID, sourceParentID: parentID, sourceClass: upnpClass});
		}
		self.populateMusicSourceListBox(self.musicSourceNumberReturned);
		self.musicSourceNumberReturned = self.musicSourceNumberReturned + parseInt(response.NumberReturned);
	};
	
	self.getMusicSourceSpotify = function () {
		self.retrieveMusicFromSpotify(self.processGetMusicSourceSpotify, self.musicSourceDeviceID, self.musicSourceProvider, self.spotifySessionID, self.musicSourceDisplayID, self.musicSourceNumberReturned, self.musicSourceRowsToReturn)

	}
	
	self.processGetMusicSourceSpotify = function (body) {
		body = Utils.unescape(body);
		body = Utils.unescape(body);
		//CF.log("Spotify response is: " + body);
		var i = 0, j = 0, k = 0, l = 0, artist = "", title = "", res = "", art = "", nextTag = "", endTag = ""
		// having got the response, we can check to see whether we have reached track level by checking to see what object types are in the response
		if (body.indexOf("<itemType>track</itemType>") > 0) {
			// We have reached track level in this data
			// Put a first item into the list which is the select all item which will be used later for special behaviours
			self.musicSourceList.push(self.tmpFirstRecord[0]);
			self.musicSourceList[0].sourceName = "All";
			//self.musicSourceList.push(tmpFirstRecord[0]);
			self.musicSourceTrackLevel = true;  //  tell it that we are at track level as it will need different behaviour on clicking.
			// now we must set the tags as these are different for track level
			startTag = "<mediaMetadata>";
			endTag = "</mediaMetadata>";
		}
		else {
			self.musicSourceTrackLevel = false;  // set flag to say we are not at track level
			startTag = "<mediaCollection>";  // set the tags as these are different from at track level
			endTag = "</mediaCollection>";
		
		}
		// now we can get and process the records
		spotifyNumberReturned = self.extractTag(body, "<count>", "</count>");
		i = body.indexOf(startTag, j);
		parentID = self.musicSourceDisplayID;
		while (i >= 0) {
			// Loop over all items, where each item is a track on the queue.
			j = body.indexOf(endTag, i);
			var track = body.substring(i + 8, j);
			canPlay = self.extractTag(track, "<canPlay>", "</canPlay>");
			// check for canplay tag = false which means Spotify can not play the track but only at the track level
			if (canPlay == "false"  && startTag == "<mediaMetadata>") {							
				i = body.indexOf(startTag, j);
				continue;
			}
			newDisplayID = self.extractTag(track, "<id>", "</id>");
			if (self.musicSourceTrackLevel) {
				title = self.extractTag(track, "<title>", "</title>");
			}
			else {
				title = self.extractTag(track, "<title>", "</title>");
			}
			res = self.extractTag(track, "<res ", "</res>");
			art = self.extractTag(track, "<albumArtURI>", "</albumArtURI>");
			//CF.log("parentid is : " + parentID);
			upnpClass = 'object.container.playlistContainer';
			//CF.log("Source ID is: " + newDisplayID + " and parentID is: " + parentID + " and art is:" + art);
			i = body.indexOf(startTag, j);
			self.musicSourceList.push({sourceName: title, sourceRes: res, sourceArt: art, sourceID: newDisplayID, sourceParentID: parentID, sourceClass: upnpClass});
		}
		self.populateMusicSourceListBox(self.musicSourceNumberReturned);
		self.musicSourceNumberReturned = self.musicSourceNumberReturned + parseInt(spotifyNumberReturned);
	}
	
	self.getMusicSourceRadio = function () {
		self.retrieveMusicFromRadio(self.processGetMusicSourceRadio, self.musicSourceDeviceID, self.musicSourceProvider, self.musicSourceDisplayID, self.musicSourceNumberReturned, self.musicSourceRowsToReturn)

	}
	
	self.processGetMusicSourceRadio = function (body) {
		body = Utils.unescape(body);
		body = Utils.unescape(body);
		CF.log("Radio response is: " + body);
		var i = 0, j = 0, k = 0, l = 0, artist = "", title = "", res = "", art = "", nextTag = "", endTag = ""
		// having got the response, we can check to see whether we have reached track level by checking to see what object types are in the response
		if (body.indexOf("<itemType>stream</itemType>") > 0) {
			// We have reached track level in this data
			// Put a first item into the list which is the select all item which will be used later for special behaviours
			self.musicSourceList.push({sourceName: "All", sourceRes: "", sourceArt:"", sourceID: ""});
			self.musicSourceTrackLevel = true;  //  tell it that we are at track level as it will need different behaviour on clicking.
			// now we must set the tags as these are different for track level
			startTag = "<mediaMetadata>";
			endTag = "</mediaMetadata>";
		}
		else {
			self.musicSourceTrackLevel = false;  // set flag to say we are not at track level
			startTag = "<mediaCollection>";  // set the tags as these are different from at track level
			endTag = "</mediaCollection>";
		
		}
		// now we can get and process the records
		radioNumberReturned = self.extractTag(body, "<count>", "</count>");
		parentID =self.musicSourceLevelQuery[self.musicSourceLevel - 1];
		CF.log("ParentiD is: " + parentID);
		i = body.indexOf(startTag, j);
		while (i >= 0) {
			// Loop over all items, where each item is a track on the queue.
			j = body.indexOf(endTag, i);
			var track = body.substring(i + 8, j);
			newDisplayID = self.extractTag(track, "<id>", "</id>");
			if (self.musicSourceTrackLevel) {
				title = self.extractTag(track, "<title>", "</title>");
			}
			else {
				title = self.extractTag(track, "<title>", "</title>");
			}
			res = self.extractTag(track, "<res ", "</res>");
			art = self.extractTag(track, "<logo>", "</logo>");
			i = body.indexOf(startTag, j);
			self.musicSourceList.push({sourceName: title, sourceRes: res, sourceArt: art, sourceID: newDisplayID, sourceParentID: parentID, sourceClass: "object.item.audioItem.audioBroadcast"});
		}
		self.populateMusicSourceListBox(self.musicSourceNumberReturned);
		self.musicSourceNumberReturned = self.musicSourceNumberReturned + parseInt(radioNumberReturned);
	}
		


	self.populateMusicSourceListBox  = function (from) {
		for (i=from; i < self.musicSourceList.length; i++) {
			CF.listAdd("l13", [{s513: self.musicSourceList[i].sourceArt, s514: self.musicSourceList[i].sourceName}]);
		}
	}
	
	
	// Handles when a user presses the + sign on a music source list

	self.showMusicSourceActions = function() {
		CF.log("name of track selected is: " + self.musicSourceList[self.musicSourceListIndex].sourceName);
		CF.setJoin("d130",1)
	};
	
	self.musicSourceListEnd = function() {
		CF.log("Got a list end command");
		switch (self.musicSourceType) {
			case 0:  // will be a standard iTunes or Sonos music library
				self.getMusicSourceForLibrary();
				break;
			case 1:  // will be a docked ipod
				break;
			case 2:  // will be Radio 
				self.getMusicSourceRadio()
				break;
			case 3:  // will be LastFM
				break;
			case 4:  // will be Spotify
				self.getMusicSourceSpotify();
				break;
			case 5:  // will be Sonos Playlists
				self.getMusicSourceForLibrary();
				break;
		}
	};
	
	self.musicSourcePlayNow  = function () {
		self.AVTransportSetAVTransportURI(self.musicSourcePlayNow1(), self.currentHost, 0, "x-rincon-queue:" + self.nowPlayingZoneCoordinator + "#0", "");
		//self.AVTransportPlay("", self.currentHost, 0, 1);
	}
	
	self.musicSourcePlayNow1 = function () {
		// This routine handles play now of a music source item
		// Since the syntax varies depending upon the item type
		// e.g. library item, LastFM, Radio item etc, it has to
		// check the item type
		var sourceToAdd = Utils.escape(self.musicSourceList[self.musicSourceListIndex].sourceID);
		var enqueuedURI = "";
		var enqueuedURIMetaData = "";
		CF.log("SourceIndex is: " + self.musicSourceListIndex);
		CF.log("Source to add is: " + sourceToAdd);
		CF.log("Source Name is:" + self.musicSourceList[self.musicSourceListIndex].sourceName);
		CF.log("Source ParentID is:" + self.musicSourceList[self.musicSourceListIndex].sourceParentID);
		CF.log("Source Class is:" + self.musicSourceList[self.musicSourceListIndex].sourceClass);
		// Items coming from a Sonos Playlist (SQ:0) type can be any of the above although
		// Therefore, we look for SQ items first to proess them before other types
		if (self.musicSourceList[self.musicSourceListIndex].sourceParentID.indexOf("SQ:") > 0) {
			// Must be a Sonos playlist item (i.e. type SQ)
			CF.log("Got a Sonos PLaylist Item");
			if (self.musicSourceList[self.musicSourceListIndex].sourceName == "All") {
				// We are trying to get the whole of a playlist.  Command format is the same in any scenario
				CF.log("Got an All from a Sonos PLaylist Item or a Spotify playlist item");
				enqueuedURI = "file:///jffs/settings/savedqueues.rsq#" + sourceToAdd.substr(sourceToAdd.indexOf("SQ:") + 3);
				enqueuedURIMetaData = self.metaDataHeader + '<itemid="' + sourceToAdd + '" parentID="' + self.musicSourceList[self.musicSourceListIndex].sourceParentID + '" restricted="true"><dc:title>' + self.musicSourceList[self.musicSourceListIndex].sourceName + '<dc:title><upnp:class>object.container.playlistContainer</upnp:class><desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">RINCON_AssociatedZPUDN</desc></item></DIDL-Lite>';
			}
			if (sourceToAdd.indexOf("S://") >= 0) {
				// It is Sonos item not spotify
				CF.log("Got a Sonos PLaylist Item which is a library item");
				enqueuedURI = sourceToAdd.replace("S://","x-file-cifs://");
				enqueuedURIMetaData = self.metaDataHeader + '<itemid="' + sourceToAdd + '" parentID="' + self.musicSourceList[self.musicSourceListIndex].sourceParentID + '" restricted="true"><dc:title>' + self.musicSourceList[self.musicSourceListIndex].sourceName + '<dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">RINCON_AssociatedZPUDN</desc></item></DIDL-Lite>';
			}
			if (sourceToAdd.indexOf("x-sonos-spotify") >= 0) {
				// Must be a spotify track
				CF.log("Got a Sonos PLaylist Item which is a spotify track");
				enqueuedURI = sourceToAdd + sourceToAdd.substring(0,sourceToAdd.indexOf("flags=0") + 6);
				enqueuedURIMetaData = self.metaDataHeader + '<itemid="' + sourceToAdd + '" parentID="' + self.musicSourceList[self.musicSourceListIndex].sourceParentID + '" restricted="true"><dc:title>' + self.musicSourceList[self.musicSourceListIndex].sourceName + '<dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">RINCON_AssociatedZPUDN</desc></item></DIDL-Lite>';
				
			}
			self.AVTransportAddURIToQueue(self.sendPlayPostSetAVTransport, self.currentHost, 0, enqueuedURI, enqueuedURIMetaData, 0, 1);
			return;
		}

		if (self.musicSourceList[self.musicSourceListIndex].sourceClass == "object.container.playlistContainer.sameArtist") {
			// It is a librray item of type All
			// self.AVTransportAddURIToQueue(self.processTransportEventAddURItoQueue, self.currentHost, 0, "x-rincon-playlist:" + self.nowPlayingZoneCoordinator + '#' + sourceToAdd, EnqueuedURIMetaData, DesiredFirstTrackNumberEnqueued, EnqueueAsNext)
			CF.log("Got an All library Item");
			enqueuedURI = "x-rincon-playlist:" + self.nowPlayingZoneCoordinator + '#' + sourceToAdd
			enqueuedURIMetaData = self.metaDataHeader + '<itemid="' + self.musicSourceList[self.musicSourceListIndex].sourceID + '" parentID=' + self.musicSourceList[self.musicSourceListIndex].sourceParentID + '" restricted="true"><dc:title>' + self.musicSourceList[self.musicSourceListIndex].sourceName + '<dc:title><upnp:class>' +  self.musicSourceList[self.musicSourceListIndex].sourceClass + '</upnp:class><desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">RINCON_AssociatedZPUDN</desc></item></DIDL-Lite>';

		}
		if (sourceToAdd.indexOf("S://") >= 0) {
			// Must be a single library item
			CF.log("Got a single library Item");
			sourceToAdd = sourceToAdd.replace("S://","x-file-cifs://");
			enqueuedURI = sourceToAdd;
			enqueuedURIMetaData = self.metaDataHeader + '<itemid="' + self.musicSourceList[self.musicSourceListIndex].sourceID + '" parentID=' + self.musicSourceList[self.musicSourceListIndex].sourceParentID + '" restricted="true"><dc:title>' + self.musicSourceList[self.musicSourceListIndex].sourceName + '<dc:title><upnp:class>' + self.musicSourceList[self.musicSourceListIndex].sourceClass + '</upnp:class><desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">RINCON_AssociatedZPUDN</desc></item></DIDL-Lite>';
		}
		if (self.musicSourceList[self.musicSourceListIndex].sourceClass == "LastFM") {
			// Must be a LastFM.  Since you cant queue a LastFM, we call SetAVTransport not AddURIToQueue
			CF.log("Got a LastFM Item");
			sourceToAdd = sourceToAdd.split(":");
			if (sourceToAdd[1] == "TAG") {
				var currentURI = "lastfm://globaltags/" + sourceToAdd[2];  // is a tag
			}
			if (sourceToAdd[1] == "ARTIST") {
				var currentURI = "lastfm://artist/" + sourceToAdd[2] + "/similarartists";  // is a tag
			}
			if (sourceToAdd[1] == "PERSONAL") {
				var currentURI = "lastfm://user/"+ self.LastFMUserID + "/" + sourceToAdd[2].toLowerCase();  // is a tag
			}
			
			var currentURIMetaData = self.metaDataHeader + '<itemid="' + self.musicSourceList[self.musicSourceListIndex].sourceID + '" parentID="' + self.musicSourceList[self.musicSourceListIndex].sourceParentID + '" restricted="true"><dc:title>' + self.musicSourceList[self.musicSourceListIndex].sourceName + '<dc:title><upnp:class>object.item.audioItem.audioBroadcast</upnp:class><desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">SA_RINCON11_postsi</desc></item></DIDL-Lite>';
			self.AVTransportSetAVTransportURI(self.sendPlayPostSetAVTransport, self.currentHost, 0, currentURI, currentURIMetaData);
			return;
		}
		if (self.musicSourceList[self.musicSourceListIndex].sourceClass == "object.item.audioItem.audioBroadcast") {
			// Must be a radio item.  Since you can't queue radio we call SETAVTransport not AddURIToQueue
			CF.log("Got a Radio Item");
			var currentURI = "x-sonosapi-stream:" + sourceToAdd + "?sid=254&flags=32";
			var currentURIMetaData = self.metaDataHeader + '<item id="F00090020' + self.musicSourceList[self.musicSourceListIndex].sourceID + '" parentID="F00080064' + self.musicSourceList[self.musicSourceListIndex].sourceParentID.replace(/:/g, "%3a") + '" restricted="true"><dc:title>' + self.musicSourceList[self.musicSourceListIndex].sourceName + '</dc:title><upnp:class>object.item.audioItem.audioBroadcast</upnp:class><desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">SA_RINCON65031_</desc></item></DIDL-Lite>';
			self.AVTransportSetAVTransportURI(self.sendPlayPostSetAVTransport, self.currentHost, 0, currentURI, currentURIMetaData);
			return;
		}
		if (self.musicSourceList[self.musicSourceListIndex].sourceClass == "object.container.playlistContainer") {
			// Must be a Spotify item
			CF.log("Got a Spotify Item");
			sourceToAdd = sourceToAdd.replace(/:/g, "%3a");
			if (self.musicSourceList[self.musicSourceListIndex].sourceName == "All") {
					// Must be a spotify track
				CF.log("Got a Spotify All");
				enqueuedURI = 'x-rincon-cpcontainer:1006008c' + sourceToAdd;
				enqueuedURIMetaData = self.metaDataHeader + '<item id="1006008c' + self.musicSourceList[self.musicSourceListIndex].sourceID + '" parentID="100a0084' + self.musicSourceList[self.musicSourceListIndex].sourceParentID + '" restricted="true"><dc:title>' + self.musicSourceList[self.musicSourceListIndex].sourceName + '<dc:title><upnp:class>'+ self.musicSourceList[self.musicSourceListIndex].sourceClass + '</upnp:class><desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">SA_RINCON2311_postsi</desc></item></DIDL-Lite>';
			}
			else {
				CF.log("Got a Spotify Item");
				enqueuedURI = 'x-sonos-spotify:' + sourceToAdd + '?sid=9&amp;flags=0';
				enqueuedURIMetaData = self.metaDataHeader + '<item id="1006008c' + Utils.escape(self.musicSourceList[self.musicSourceListIndex].sourceID).replace(/:/g, "%3a") + '" parentID="100a0084' + Utils.escape(self.musicSourceList[self.musicSourceListIndex].sourceParentID).replace(/:/g, "%3a") + '" restricted="true"><dc:title>' + self.musicSourceList[self.musicSourceListIndex].sourceName + '<dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">SA_RINCON2311_postsi</desc></item></DIDL-Lite>';
			}
		}
		CF.log("Sending the AddURI Commmand");
		self.AVTransportAddURIToQueue(self.sendPlayPostSetAVTransport, self.currentHost, 0, enqueuedURI, enqueuedURIMetaData, 0, 1);
		return;
	}


	self.sendPlayPostSetAVTransport = function (){
		CF.log("Process play");
		CF.setJoin("d130",0)
		self.AVTransportPlay("", self.currentHost, 0, 1)

	}
	
	self.musicSourceAddToQueue = function() {
		self.AVTransportSetAVTransportURI(self.musicSourcePlayNow1(), self.currentHost, 0, "x-rincon-queue:" + self.nowPlayingZoneCoordinator + "#0", "");
		
	}
	
	self.musicSourceReplaceQueue = function () {
		self.transportEventRemoveAllTracks();
		self.musicSourceAddToQueue();
	}
	
	// ----------------------------------------------------------------------------
	// Functions that display the current zone information in the UI
	// ----------------------------------------------------------------------------

	// Displays current zone info
	
	self.displayCurrentZone = function() {
		CF.setJoin("s500", self.getComboZoneName());  // Creates the zone name by adding all the member zones together
		self.updateNowPlaying(self.nowPlayingZoneCoordinatorIndex);
	};
	
	// Set the various joins etc to show the current track info
	
	self.updateNowPlaying = function(zoneNumber) {
		CF.setJoin("s501", self.discoveredDevicesDetails[zoneNumber].currentTrackName);
		CF.setJoin("s502", self.discoveredDevicesDetails[zoneNumber].currentTrackArtist);
		CF.setJoin("s503", self.discoveredDevicesDetails[zoneNumber].currentTrackAlbum);
		CF.setJoin("a10", self.masterVolume*65536/100);
		CF.setJoin("d202", self.discoveredDevicesDetails[zoneNumber].crossFadeMode);
		// STOPPED PLAYING PAUSED_PLAYBACK TRANSITIONING
		CF.setJoin("d200", self.discoveredDevicesDetails[zoneNumber].repeat);
		CF.setJoin("d201", self.discoveredDevicesDetails[zoneNumber].shuffle);
		switch (self.discoveredDevicesDetails[zoneNumber].transportState) {
			case "PLAYING":  
				CF.setJoin("d204",1);
				CF.setJoin("d205",0);
				CF.setJoin("d206",0);
				break;
			case "STOPPED":  
				CF.setJoin("d204",0);
				CF.setJoin("d205",0);
				CF.setJoin("d206",1);
				break;
			case "PAUSED_PLAYBACK":  
				CF.setJoin("d204",0);
				CF.setJoin("d205",1);
				CF.setJoin("d206",0);
				break;
			case "TRANSITIONING":  
				CF.setJoin("d204",0);
				CF.setJoin("d205",0);
				CF.setJoin("d206",0);
				break;
		}
		//CF.setJoin("d208", self.discoveredDevicesDetails[zoneNumber].mute);
		if (self.discoveredDevicesDetails[zoneNumber].currentTrackAlbumArtAddr == "None") {
			CF.setJoin("s504", "");
		}
		else {
			CF.setJoin("s504", self.discoveredDevicesDetails[zoneNumber].currentTrackAlbumArtAddr);
		}

	
	};
	
	// Builds the combined zone name

	self.getComboZoneName = function() {
		var tmpRoomName = "";
		for (var i = 0; i < self.zoneTopology.length; i++) {
			if (self.nowPlayingZoneCoordinator == self.zoneTopology[i].coordinatorRINCON) {
				tmpRoomName = tmpRoomName + self.zoneTopology[i].roomName + " ";
			}	
		};
		return tmpRoomName;
	};
	


	
	// ----------------------------------------------------------------------------
	// Functions to handle all volume related stuff
	// ----------------------------------------------------------------------------

	// Function to calculate the average volume and mute status for the zone or zone group
	
	self.calcMuteAndZoneVolumeDetails = function () {
		self.masterVolume = 0;
		self.numZonesInGroup = 0;
		self.masterMute = 0;
		for (var i = 0; i < self.zoneTopology.length; i++) {
			if (self.zoneTopology[i].coordinatorRINCON == self.nowPlayingZoneCoordinator) {
				var curZone = self.getDetailsFromRINCON(self.zoneTopology[i].RINCON);
				self.masterVolume += parseInt(curZone.volume);
				self.numZonesInGroup++;
				self.masterMute += parseInt(curZone.mute);
			}
		}
		self.masterVolume = self.masterVolume/self.numZonesInGroup;
		self.masterMute = self.masterMute/self.numZonesInGroup;  //  This will equal 1 if every zone is mute and < 1 if any zone is not mute
		if (self.masterMute < 1) {
			self.masterMute = 0;  // Make sure it is zero rather than some average between 0 and 1 so we can use it to set UI elements
		}
		//CF.log("The average volume for the zone is: " + self.masterVolume + " and the zone masterMute is: " + self.masterMute);
	}
	
	// Function to display the mute and vol info in the UI
	
	self.displayMuteAndVolUI = function () {
		// We will not display the zone volume dialog in this routine as this will be done in the master volume press function
		// This means we can call it anytime we get a content render notify message so that the UI (even if not displayed is always up to date)
		// In any scenario we need to set the master controls
		//CF.log("Displaying the volume UI");
		CF.setJoin("d208", self.masterMute); // Set the mute status
		CF.setJoin("a10", self.masterVolume*65535/100);  // Set the volume slider
		// Next we have to check to see if there is more than one zone and if so set their individualute button and volume slider
		// The list of zones in the listbox is built when the volume master slider is pressed so we can assume the list box is populated here
		if (self.numZonesInGroup  > 1) { // There is only one zone so the volume and mute buttons control the selected zone only
			var k = 0; // Used to index into the UI
			for (var i = 0; i < self.zoneTopology.length; i++) {
				if (self.zoneTopology[i].coordinatorRINCON == self.nowPlayingZoneCoordinator) {  // i.e. this zone is in the group
					var curZone = self.getDetailsFromRINCON(self.zoneTopology[i].RINCON);  // Get the current details for the zone
					//CF.log("setting zone volume and mute in listbox");
					CF.setJoin("l14:" + k + ":d209", curZone.mute);
					CF.setJoin("l14:" + k + ":a11", curZone.volume*65535/100);
					k++;
				}
			}
		}
	}
		
	self.mainVolumePress = function(volume) {
		CF.log("Main Volume Pressed and self.numZonesInGroup is: " + self.numZonesInGroup);
		self.startMasterVolume = self.masterVolume;
		self.userZoneGroupingUnderway = true; // prevent the processing of zone notify messages which would screw up the volume groupings
		// If there is more than one zone in the group then we need to create the listbox and set the starting volume so we can use the master volume slider to increase and decrease the individual volumes
		if (self.numZonesInGroup > 1) {
			CF.listRemove("l14");
			CF.setJoin("d128",1);  // Show the zone volume list
			for (var i = 0; i < self.zoneTopology.length; i++) {
				if (self.zoneTopology[i].coordinatorRINCON == self.nowPlayingZoneCoordinator) {
					// Get the zone details
					var curZone = self.getDetailsFromRINCON(self.zoneTopology[i].RINCON);
					// Populate the UI
					CF.listAdd("l14", [{s2: curZone.roomName, d209: curZone.mute, a11: curZone.volume*65535/100}]);
					// Set the statring volume of the zone which is needed to do the handling of movement of the master volume slider
					self.discoveredDevicesDetails[self.getZonesIndexFromRINCON(self.zoneTopology[i].RINCON)].startVolume = self.discoveredDevicesDetails[self.getZonesIndexFromRINCON(self.zoneTopology[i].RINCON)].volume
				}
			};	
		}
	};
	
	self.mainVolumeDrag = function(volume) {
		// We do not update the UI in this routine at all as this will be done when the rendercontrol notification is sent after we do do the SetVolume Sonos command		
		CF.log("Main volume to change is: " + volume);
		CF.log("Start volumes was: " + self.startMasterVolume)
		if (self.numZonesInGroup == 1) {
			self.RenderingControlSetVolume("", self.currentHost, "0", "Master", volume);
			return;
		}
		else {
			
			if (volume >= self.startMasterVolume) {
				var volUp = true;
			}
			else {
				var volUp = false;
			}
			for (var i = 0; i < self.zoneTopology.length; i++) {
				if (self.zoneTopology[i].coordinatorRINCON == self.nowPlayingZoneCoordinator) {
					var curZone = self.getDetailsFromRINCON(self.zoneTopology[i].RINCON);
					// Do an accelerator - we use startVolume rather than volume as volume will change as rendercontrol notify events arrive
					if (volUp) {
						var newVol =  curZone.startVolume + ((100-curZone.startVolume)/(100-self.startMasterVolume) * (volume-self.startMasterVolume));						}
					else {
						var newVol =  curZone.startVolume - ((curZone.startVolume)/(self.startMasterVolume) * (self.startMasterVolume-volume));						}
					if (newVol < 0) {newVol = 0}
					if (newVol > 100) {newVol = 100}
					CF.log("new vol is: " + newVol)
					self.RenderingControlSetVolume("", curZone.IP + self.port, "0", "Master", newVol);
				}
			}
			
		}
	};
	
	self.mainVolumeRelease = function (volume) {
		CF.log("Got a volume release with volume: " + volume);
		CF.setJoin("d128",0);
		CF.listRemove("l14");
		self.reEnableZoneNotify();


	}
	
	self.changeZoneVolume = function(data) {
		CF.log("Room name of volume to change is: " + data);
		var splitData = data.split(":");
		CF.getJoin(splitData[0]+":" + splitData[1] + ":s2", function(join, value) {
			CF.log("value is: " + value);
			var curDevice = self.getDetailsFromRoomName(value);
			CF.log("New volume for the Zone " + splitData[1] + " which is room " + curDevice.roomName + " is :" + splitData[3]);
			self.RenderingControlSetVolume("", curDevice.IP + self.port, "0", "Master", splitData[3]);	
 
		});	
	};
	self.changeZoneMute = function(join, list, listIndex) {
		CF.log("Join is: " + "l14:"+listIndex+":s2");
		CF.getJoins(["l14:"+listIndex+":s2", "l14:"+listIndex+":d209"], function(joins) {
			CF.log("Room Name is: " + joins["l14:"+listIndex+":s2"].value);
			var curDevice = self.getDetailsFromRoomName(joins["l14:"+listIndex+":s2"].value);
			CF.log("New mute for the Zone " + curDevice.roomName + " is :" + joins["l14:"+listIndex+":d209"].value);
			self.RenderingControlSetMute ("", curDevice.IP + self.port, "0", "Master", joins["l14:"+listIndex+":d209"].value);
		});

	};
	
	self.mainMutePress = function () {
		CF.getJoin("d208", function(join, value) {
			CF.log("value is: " + value);
			for (var i = 0; i < self.zoneTopology.length; i++) {
				if (self.zoneTopology[i].coordinatorRINCON == self.nowPlayingZoneCoordinator) {  // i.e. this zone is in the group
					var curZone = self.getDetailsFromRINCON(self.zoneTopology[i].RINCON);  // Get the current details for the zone
					self.RenderingControlSetMute ("", curZone.IP + self.port, "0", "Master", value);
				}
			}
			
		});	

	}

	// ----------------------------------------------------------------------------
	// Functions to handle a render control event
	// ----------------------------------------------------------------------------
	
	self.parseRenderControl = function (response) {
		//CF.log("Render control event was: " + response);
		var i =0, j = 0;
		i = response.indexOf("<Volume", j);
		if (i >= 0 && !self.volumeChangeUnderway) {
			j = response.indexOf("/>", i);
			self.discoveredDevicesDetails[self.notifyingZone].priorVolume = self.discoveredDevicesDetails[self.notifyingZone].volume;
			self.discoveredDevicesDetails[self.notifyingZone].volume = parseInt(self.extractTag(response.substring(i,j), 'val="', '"'));
			//CF.log("Setting volume for: " + self.discoveredDevicesDetails[self.notifyingZone].roomName)
			//CF.log("Volume is: " + self.discoveredDevicesDetails[self.notifyingZone].volume);
		}
		i = response.indexOf("<Mute", j);
		if (i >= 0) {
			self.zoneMutes = 0;
			j = response.indexOf("/>", i);
			var mute = parseInt(self.extractTag(response.substring(i,j), 'val="', '"'));
			//CF.log("Setting mute for: " + self.discoveredDevicesDetails[self.notifyingZone].roomName)
			self.discoveredDevicesDetails[self.notifyingZone].mute = mute;
			//if (!self.allSubscribesDone) {return}
		}
		if (self.discoveredDevicesDetails[self.notifyingZone].priorVolume != self.discoveredDevicesDetails[self.notifyingZone].volume) {
			self.receiveSonosVolumeChange(self.discoveredDevicesDetails[self.notifyingZone]);
		}
		self.calcMuteAndZoneVolumeDetails();
		self.displayMuteAndVolUI();
	}



	// ----------------------------------------------------------------------------
	// Functions that interact with the Sonos Transport functions
	// ----------------------------------------------------------------------------

	// Gets the queue for the currently selected zone grouping.  It gets this info
	// from the zone coordinator

	self.getQueueForCurrentZone = function () {
		self.ContentDirectoryBrowse(self.processGetQueueForCurrentZone, self.currentHost, "Q:0", "BrowseDirectChildren", "dc:title,res,dc:creator,upnp:artist,upnp:album,upnp:albumArtURI", self.queueNumberReturned, self.queueRowsToReturn, "")

	};
	
	self.processGetQueueForCurrentZone = function (response) {
		var body = response.Result;
		var joinData = [];
		var i = 0, j = 0, k = 0, l = 0;
		var trackNo = "";
		var artist = "";
		var title = "";
		var unc = "";
		var res = "";
		var art="";
		CF.log("Number of results returned is: " + response.NumberReturned);
		CF.log("Total matches is: " + response.TotalMatches)
		CF.log("Total result returned is: " + self.queueNumberReturned)
		i = body.indexOf("<item", j);
		while (i >= 0) {
			 // Loop over all items, where each item is a track on the queue.
			 j = body.indexOf("</item>", i);
			 var track = body.substring(i + 8, j);
			 //CF.log("track variable is: " + track);

			 trackNo = self.extractTag(track, '="Q:0/', '"');
			 //trackNo = trackNo.substring(trackNo.indexOf('/') + 1);
			 //unc = self.extractTag(track, ">x-file-cifs:", "<").replace('/', '\\').replaceAll("%20", " ");
			 var res = self.extractTag(track, "<res", "</res>");
			 artist = self.extractTag(track, "<dc:creator>", "</dc:creator>");
			 title = self.extractTag(track, "<dc:title>", "</dc:title>");
			 art = Utils.unescape(self.extractTag(track, "<upnp:albumArtURI>", "</upnp:albumArtURI>"));
			// CF.log("art is: " + host + art);
			i = body.indexOf("<item", j);
			//CF.log("Artist is: " + artist + " and track no is: " + trackNo);
			joinData.push({s510: title, s511: artist, s512: self.currentHost + art, s519: trackNo});
			}
		CF.listAdd("l12", joinData);
		self.queueNumberReturned = self.queueNumberReturned + parseInt(response.NumberReturned);
		// CF.log("Total result returned is: " + self.queueNumberReturned)
	};
	
	self.queueListEnd = function() {
		self.getQueueForCurrentZone();
	};
	
	
	// ----------------------------------------------------------------------------
	// Functions that interact with the Sonos Transport functions
	// ----------------------------------------------------------------------------

	// Gets the all the relevent information about the current playing track for
	// the zone that has been selected and the displays it in the UI
	
	/* Example format
	 <?xml version="1.0" encoding="us-ascii"?>
	<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"
            s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
	    <s:Body>
		<u:GetPositionInfoResponse xmlns:u="urn:schemas-upnp-org:service:AVTransport:1">
	
		    <Track>1</Track>
		    <TrackDuration>0:04:48</TrackDuration>
		    <TrackMetaData>&lt;DIDL-Lite
		    xmlns:dc="http://purl.org/dc/elements/1.1/"
		    xmlns:upnp="urn:schemas-upnp-org:metadata-1-0/upnp/"
		    xmlns:r="urn:schemas-rinconnetworks-com:metadata-1-0/"
		    xmlns="urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/"&gt;&lt;item
		    id="-1" parentID="-1" restricted="true"&gt;&lt;res
		    protocolInfo="sonos.com-spotify:*:audio/x-spotify:*"
		    duration="0:04:48"&gt;x-sonos-spotify:spotify%3atrack%3a2D414crYApndJ7g5mkS5xV?sid=9&amp;amp;flags=0&lt;/res&gt;&lt;r:streamContent&gt;&lt;/r:streamContent&gt;&lt;upnp:albumArtURI&gt;/getaa?s=1&amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a2D414crYApndJ7g5mkS5xV%3fsid%3d9%26flags%3d0&lt;/upnp:albumArtURI&gt;&lt;dc:title&gt;Tibetan
		    Healing
		    Spirits&lt;/dc:title&gt;&lt;upnp:class&gt;object.item.audioItem.musicTrack&lt;/upnp:class&gt;&lt;dc:creator&gt;Best
		    Relaxing SPA Music&lt;/dc:creator&gt;&lt;upnp:album&gt;SPA Hotel -
		    Ultimate SPA and Wellness
		    Relaxation&lt;/upnp:album&gt;&lt;/item&gt;&amp;</TrackMetaData>
		</u:GetPositionInfoResponse>
	    </s:Body>
	</s:Envelope>

*/
	
	self.getPositionInfo = function() {
		self.AVTransportGetPositionInfo(self.processGetPositionInfo, self.currentHost, 0)
	};
	
	//callback(  {"Track": xmlDoc.getElementsByTagName("Track")[0].textContent, "TrackDuration": xmlDoc.getElementsByTagName("TrackDuration")[0].textContent, "TrackMetaData": xmlDoc.getElementsByTagName("TrackMetaData")[0].textContent, "TrackURI": xmlDoc.getElementsByTagName("TrackURI")[0].textContent, "RelTime": xmlDoc.getElementsByTagName("RelTime")[0].textContent, "AbsTime": xmlDoc.getElementsByTagName("AbsTime")[0].textContent, "RelCount": xmlDoc.getElementsByTagName("RelCount")[0].textContent, "AbsCount": xmlDoc.getElementsByTagName("AbsCount")[0].textContent} )
	
	self.processGetPositionInfo = function(response) {
		var body = response.TrackMetaData;
		//CF.log("get posinfo body is :" + body);
		var xotree = new XML.ObjTree();
		var dumper = new JKL.Dumper();
		//CF.log("parseString is: " + parseString);
		var tree = xotree.parseXML(response.TrackMetaData);
		CF.log("JSON version is: " + dumper.dump(tree));
		if (self.extractTag(body, "<r:streamContent>", "</r:streamContent>") == "" && (body.indexOf("application/octet-stream") == -1)) {
			/*CF.log("Get position info track metadata is: "+ response.TrackMetaData);
			CF.log("Get position info track  is: "+ response.Track);
			CF.log("Get position info track duration  is: "+ response.TrackDuration);
			CF.log("Get position info TrackURI is: "+ response.TrackURI);
			CF.log("Get position info track RelTime is: "+ response.RelTime);
			CF.log("Get position info track AbsTime is: "+ response.AbsTime);
			CF.log("Get position info track RelCount is: "+ response.RelCount);
			CF.log("Get position info track AbsCount is: "+ response.AbsCount);*/
			var durationSeconds = self.turnSonosTimeToSecs(response.TrackDuration);
			var currentSeconds = self.turnSonosTimeToSecs(response.RelTime);
			CF.setJoin("a12", currentSeconds/durationSeconds*65536)
			CF.setJoin("s550", response.RelTime.substr(2));
			CF.setJoin("s551", self.turnSecondstoSonosString(durationSeconds-currentSeconds));
			var artist = "", title = "", art ="", album = "";
			artist = self.extractTag(body, "<dc:creator>", "</dc:creator>");
			if (artist == "") { // artise will come back as "" if there is nothing playing
				artist = "None";
				title = "None";
				art = "";
				album = "None"
			}
			else {
				title = self.extractTag(body, "<dc:title>", "</dc:title>");
				art = self.currentHost + Utils.unescape(self.extractTag(body, "<upnp:albumArtURI>", "</upnp:albumArtURI>"));
				album = self.extractTag(body,"<upnp:album>", "</upnp:album>")
			}
			self.discoveredDevicesDetails[self.nowPlayingZoneCoordinatorIndex].currentTrackName = title;
			self.discoveredDevicesDetails[self.nowPlayingZoneCoordinatorIndex].currentTrackAlbum = album;
			self.discoveredDevicesDetails[self.nowPlayingZoneCoordinatorIndex].currentTrackArtist = artist;
			self.discoveredDevicesDetails[self.nowPlayingZoneCoordinatorIndex].currentTrackAlbumArtAddr = art;
			self.discoveredDevicesDetails[self.nowPlayingZoneCoordinatorIndex].trackDurationSecs = parseInt(durationSeconds);
		}
		else {
			CF.setJoin("a12", 0)
			CF.setJoin("s550", "0:00:00");
			CF.setJoin("s551", "0:00:00");
			album = self.extractTag(body, "<r:streamContent>", "</r:streamContent>");
			self.discoveredDevicesDetails[self.nowPlayingZoneCoordinatorIndex].currentTrackAlbum = album;
		}

;
		
		self.updateNowPlaying(self.nowPlayingZoneCoordinatorIndex);
		if (self.discoveredDevicesDetails[self.nowPlayingZoneCoordinatorIndex].transportState =="PLAYING") {
			self.timeGetPositionInfo = setTimeout(function() { self.getPositionInfo(); }, 5000);
		}
	}
	
// Function to seek to a particular track number in the zones queuePlayTrack
	
	self.seekTrack = function (sliderValue) {
		var relTimeInSecs = self.turnSecondstoSonosString(parseInt(self.discoveredDevicesDetails[self.nowPlayingZoneCoordinatorIndex].trackDurationSecs * sliderValue / 100));
		CF.log("sliderValue is: " + sliderValue);
		CF.log("trak duration is: " + self.discoveredDevicesDetails[self.nowPlayingZoneCoordinatorIndex].trackDurationSecs);
		CF.log("New time in seconds is: " +  relTimeInSecs);
		self.AVTransportSeek("", self.currentHost, 0, "REL_TIME", "0:" + relTimeInSecs) 
		
	}
		
	
	self.turnSonosTimeToSecs = function (strTime) {
		var seconds = 0;
		strTime = strTime.split(":");
		seconds = parseInt(strTime[0]) * 3600 + parseInt(strTime[1]*60) + parseInt(strTime[2]);
		return seconds
		
	}
	
	self.turnSecondstoSonosString = function (numSeconds) {
		var numMinutes = numSeconds/60;
		numMinutes =  numMinutes || 0;
		numSeconds = numSeconds - numMinutes*60;
		//CF.log("Seconds string is :" + ("00"+numMinutes).slice(-2) + ":" + ("00"+numSeconds).slice(-2));
		return ("00"+numMinutes).slice(-2) + ":" + ("00"+numSeconds).slice(-2);
	}
	
	self.transportEventSeekTrackNumber = function (trackNumber) {
		self.AVTransportSeek("" ,self.currentHost, 0, "TRACK_NR", trackNumber)
		self.AVTransportPlay("", self.currentHost, 0, 1)
	
	}	
	
	// Function to remove a particular track number in the zones queuePlayTrack
	
	self.transportEventRemoveTrackNumber = function (trackNumber) {
		CF.listRemove("l12");
		self.queueNumberReturned = 0;
		self.AVTransportRemoveTrackFromQueue("", self.currentHost, 0, "Q:0/" + trackNumber, 0) 
		self.getQueueForCurrentZone();
	
	}	
	
	// Function to remove all tracks from the queue
	
	self.transportEventRemoveAllTracks = function () {
		self.AVTransportRemoveAllTracksFromQueue(self.getQueueForCurrentZone, self.currentHost, 0);
		self.getQueueForCurrentZone();
	
	}

	self.stopPress = function() {
		self.AVTransportStop ("", self.currentHost, 0); 
	}

	self.pausePress = function() {
		self.AVTransportPause ("", self.currentHost, 0); 
	}

	self.playPress = function() {
		self.AVTransportPlay ("", self.currentHost, 0 , 1); 
	}
	
	self.nextPress = function() {
		self.AVTransportNext ("", self.currentHost, 0); 
	}

	self.prevPress = function() {
		self.AVTransportPrevious ("", self.currentHost, 0);
	}
	
	self.repeatPress = function() {
		if (self.discoveredDevicesDetails[self.notifyingZone].repeat == 1) {
			self.discoveredDevicesDetails[self.notifyingZone].repeat = 0;
		}
		else {
			self.discoveredDevicesDetails[self.notifyingZone].repeat = 1;
		}
		self.sendShuffleRepeat();
	}
	
	
	self.shufflePress = function() {
		if (self.discoveredDevicesDetails[self.notifyingZone].shuffle == 1) {
			self.discoveredDevicesDetails[self.notifyingZone].shuffle = 0;
		}
		else {
			self.discoveredDevicesDetails[self.notifyingZone].shuffle = 1;
		}
		self.sendShuffleRepeat();
	}
		
	self.sendShuffleRepeat = function () {
		var sendCommand = "NORMAL";
		if (self.discoveredDevicesDetails[self.notifyingZone].shuffle == 1 && self.discoveredDevicesDetails[self.notifyingZone].repeat == 1) { sendCommand = "SHUFFLE"};
		if (self.discoveredDevicesDetails[self.notifyingZone].shuffle == 0 && self.discoveredDevicesDetails[self.notifyingZone].repeat == 1) { sendCommand = "REPEAT_ALL"};
		if (self.discoveredDevicesDetails[self.notifyingZone].shuffle == 1 && self.discoveredDevicesDetails[self.notifyingZone].repeat == 0) { sendCommand = "SHUFFLE_NOREPEAT"};
		self.AVTransportSetPlayMode("", self.currentHost, 0, sendCommand);		
	}

	
	self.crossFadePress = function() {
		if (self.discoveredDevicesDetails[self.nowPlayingZoneCoordinatorIndex].crossFadeMode == 0)
		{
			self.AVTransportSetCrossfadeMode ("", self.currentHost, 0 , 1);
		}
		else {
			self.AVTransportSetCrossfadeMode ("", self.currentHost, 0 , 0);
			
		}
		self.AVTransportPrevious ("", self.currentHost, 0);
	}
	
	// NORMAL REPEAT_ALL SHUFFLE_NOREPEAT SHUFFLE NORMAL

	// Function to process Play, Stop, Pause, Previous and Next commands.
	
	self.transportEventPlay = function(cmd) {
		var url, xml, soapBody, soapAction;
		var host = self.discoveredDevicesDetails[self.nowPlayingZoneCoordinatorIndex].IP + self.port;
		url = '/MediaRenderer/AVTransport/Control';
		soapAction = "urn:schemas-upnp-org:service:AVTransport:1#" + cmd;
		soapBody = '<u:' + cmd + ' xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>0</InstanceID><Speed>1</Speed></u:' + cmd + '>';
		xml = self.soapRequestTemplate.replace('{0}', soapBody);
		self.sendSoapRequest(url, host, xml, soapAction, false);
		self.AVTransportPlay(self.currentHost, 0, 1)
	}
	
	
	// Function to handle processing transport events which sonos fires whenever a zone player
	// has a track change etc

	/*<?xml version="1.0" encoding="us-ascii"?>
	<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0">
	    <e:property>
		<LastChange>&lt;Event xmlns="urn:schemas-upnp-org:metadata-1-0/AVT/"
		xmlns:r="urn:schemas-rinconnetworks-com:metadata-1-0/"&gt;&lt;InstanceID
		val="0"&gt;&lt;TransportState val="STOPPED"/&gt;&lt;CurrentPlayMode
		val="NORMAL"/&gt;&lt;CurrentCrossfadeMode
		val="0"/&gt;&lt;NumberOfTracks val="60"/&gt;&lt;CurrentTrack
		val="1"/&gt;&lt;CurrentSection val="0"/&gt;&lt;CurrentTrackURI
		val="x-sonos-spotify:spotify%3atrack%3a2D414crYApndJ7g5mkS5xV?sid=9&amp;amp;flags=0"/&gt;&lt;CurrentTrackDuration
		val="0:04:48"/&gt;&lt;CurrentTrackMetaData val="&amp;lt;DIDL-Lite
		xmlns:dc=&amp;quot;http://purl.org/dc/elements/1.1/&amp;quot;
		xmlns:upnp=&amp;quot;urn:schemas-upnp-org:metadata-1-0/upnp/&amp;quot;
		xmlns:r=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot;
		xmlns=&amp;quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&amp;quot;&amp;gt;&amp;lt;item
		id=&amp;quot;-1&amp;quot; parentID=&amp;quot;-1&amp;quot;
		restricted=&amp;quot;true&amp;quot;&amp;gt;&amp;lt;res
		protocolInfo=&amp;quot;sonos.com-spotify:*:audio/x-spotify:*&amp;quot;
		duration=&amp;quot;0:04:48&amp;quo</LastChange>
	    </e:property>
	</e:propertyset>*/
	
	// STOPPED PLAYING PAUSED_PLAYBACK TRANSITIONING

	self.parseTransportEvent = function(response) {
		//CF.log("Received a transport event from Sonos of:" + response);
		response = Utils.unescape(response);
		response = Utils.unescape(response);
		
		var i = 0, j = 0, k = 0, l = 0;
		var trackNo = "";
		var artist = "";
		var title = "";
		var transportState = "";
		var currentPlayMode = "";
		var currentCrossFadeMode = 0;

		// Get current track info
		currentTrackURI = self.extractTag(response, '<CurrentTrackURI', '/>');
		enqueuedMetaData = self.extractTag(response, "EnqueuedTransportURIMetaData", "</DIDL-Lite>");
		currentClass = self.extractTag(enqueuedMetaData, '<upnp:class>', '</upnp:class>');
		currentTrack = self.extractTag(response, "<CurrentTrackMetaData", "<r:NextTrackURI");	
		transportState = self.extractTag(response,'TransportState val="', '"/>');
		currentPlayMode = self.extractTag(response,'CurrentPlayMode val="', '"/>');
		currentCrossFadeMode = parseInt(self.extractTag(response,'CurrentCrossfadeMode val="', '"/>'));
		//CF.log("transport state is: " + transportState);
		if (currentClass  != "object.item.audioItem.audioBroadcast") {  //  indicates radio type
			
			artist = self.extractTag(currentTrack, "<dc:creator>", "</dc:creator>");
			if (artist == "") {
				artist = "None";
				title = "None";
				art = "";
				album = "None"
			}
			else {
				title = self.extractTag(currentTrack, "<dc:title>", "</dc:title>");
				art = self.discoveredDevicesDetails[self.nowPlayingZoneCoordinatorIndex].IP + self.port + self.extractTag(currentTrack, "<upnp:albumArtURI>", "</upnp:albumArtURI>");
				album = self.extractTag(currentTrack,"<upnp:album>", "</upnp:album>");
			}
			nextTrack = self.extractTag(response, "<r:NextTrackMetaData", "<r:EnqueuedTransportURI");
			artist = self.extractTag(nextTrack, "<dc:creator>", "</dc:creator>");
			if (artist == "") {
				artist = "None";
				title = "None";
				art = "";
				album = "None"
			}
			else {
				title = self.extractTag(nextTrack, "<dc:title>", "</dc:title>");
				art = self.discoveredDevicesDetails[self.nowPlayingZoneCoordinatorIndex].IP + self.port + self.extractTag(nextTrack, "<upnp:albumArtURI>", "</upnp:albumArtURI>");
				album = self.extractTag(nextTrack,"<upnp:album>", "</upnp:album>")
			}
			self.discoveredDevicesDetails[self.notifyingZone].nextTrackName = title;
			self.discoveredDevicesDetails[self.notifyingZone].nextTrackAlbum = album;
			self.discoveredDevicesDetails[self.notifyingZone].nextTrackArtist = artist;
		}
		else {
			title = self.extractTag(response, 'restricted="true"><dc:title>', "</dc:title>");
			//CF.log("Title is :" + title);
			artist = self.extractTag(currentTrack, "<r:radioShowMd>", ",");
			album = self.extractTag(currentTrack, "<r:streamContent>", "</r:streamContent>");
			art = self.discoveredDevicesDetails[self.nowPlayingZoneCoordinatorIndex].IP + self.port + self.extractTag(currentTrack, "<upnp:albumArtURI>", "</upnp:albumArtURI>");
			
		}
		self.discoveredDevicesDetails[self.notifyingZone].currentTrackAlbumArtAddr = art;
		self.discoveredDevicesDetails[self.notifyingZone].currentTrackName = title;
		self.discoveredDevicesDetails[self.notifyingZone].currentTrackAlbum = album;
		self.discoveredDevicesDetails[self.notifyingZone].currentTrackArtist = artist;
		self.discoveredDevicesDetails[self.notifyingZone].priorTransportState = self.discoveredDevicesDetails[self.notifyingZone].transportState;
		self.discoveredDevicesDetails[self.notifyingZone].transportState = transportState;
		self.discoveredDevicesDetails[self.notifyingZone].crossFadeMode = currentCrossFadeMode;
	// NORMAL REPEAT_ALL SHUFFLE_NOREPEAT SHUFFLE NORMAL
		switch (currentPlayMode) {
			case "REPEAT_ALL":  
				self.discoveredDevicesDetails[self.notifyingZone].repeat = 1;
				self.discoveredDevicesDetails[self.notifyingZone].shuffle = 0;
				break;
			case "SHUFFLE_NOREPEAT":  
				self.discoveredDevicesDetails[self.notifyingZone].repeat = 0;
				self.discoveredDevicesDetails[self.notifyingZone].shuffle = 1;
				break;
			case "SHUFFLE":  
				self.discoveredDevicesDetails[self.notifyingZone].repeat = 1;
				self.discoveredDevicesDetails[self.notifyingZone].shuffle = 1;
				break;
			case "NORMAL":  
				self.discoveredDevicesDetails[self.notifyingZone].repeat = 0;
				self.discoveredDevicesDetails[self.notifyingZone].shuffle = 0;
				break;
		}
	
		// Get next track info
		CF.log("Prior transport state is: " + self.discoveredDevicesDetails[self.notifyingZone].priorTransportState);
		if (self.discoveredDevicesDetails[self.notifyingZone].priorTransportState != self.discoveredDevicesDetails[self.notifyingZone].transportState) {
			self.receiveSonosTransportChange(self.discoveredDevicesDetails[self.notifyingZone]);
		}
		if (self.notifyingZone == self.nowPlayingZoneCoordinatorIndex) {
			if (transportState == "PLAYING") {
				self.getPositionInfo();
			}
			else {
				self.getPositionInfo();
				clearTimeout(self.timeGetPositionInfo);
			}
	;
			self.getQueueForCurrentZone();
		};

	};
	



	// ----------------------------------------------------------------------------
	// Functions to handle queue actions
	// ----------------------------------------------------------------------------

	// This action shows the queue action screen and sets up the selected record for use by one of the buttons
	
	self.queueActionSelected = function (join, list, listIndex) {
		CF.getJoin("l12:"+listIndex+":s519", function(join, value, tokens) {
			self.queueSelectedItemTrackNumber = value;
			CF.log("Selected track in queue is: " + self.queueSelectedItemTrackNumber);
		});		
		CF.setJoin("d531",1);
	};

	self.queuePlayTrack = function () {
		CF.setJoin("d531",0);
		// Repoint the sonos box at its queue in case radio or lastfm have been playing
		self.AVTransportSetAVTransportURI(self.seekQueue, self.currentHost, 0, "x-rincon-queue:" + self.nowPlayingZoneCoordinator + "#0", "");	};	
	
	self.seekQueue = function () {
		self.transportEventSeekTrackNumber(self.queueSelectedItemTrackNumber);
	}
	
	
	self.queueRemoveTrack = function () {
		CF.setJoin("d531",0);
		self.transportEventRemoveTrackNumber(self.queueSelectedItemTrackNumber);
	};




	// ----------------------------------------------------------------------------
	// Functions to redirect the handling of notify events
	// ----------------------------------------------------------------------------

	// This function gets the messages from CF and queues them for processing
	
	/*self.onProcessNotifyEvent = function (theSystem, feedback) {
		self.totalMsg += Utils.unescape(feedback);
		CF.log("totalMSG is:" + self.totalMsg);
		if (self.totalMsg.indexOf("</e:propertyset>") >= 0 ) {
			CF.send("Notify Listener", "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 0\r\n\r\n");
			self.notifyMsgQueue.push(self.totalMsg);
			CF.log("Pushed a notify");
			self.totalMsg = "";
			if (self.allSubscribesDone) {self.parseNotifyEvent()};
		}
	};*/
	
	self.onProcessNotifyEvent = function (theSystem, feedback) {
		//self.totalMsg += Utils.unescape(feedback);
		//CF.log("totalMSG is:" + self.totalMsg);
		//if (self.totalMsg.indexOf("</e:propertyset>") >= 0 ) {
			//CF.send("Notify Listener", "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 0\r\n\r\n");
		//CF.send("Notify Listener", "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 0\r\n\r\n");
		//CF.send("Notify Listener", "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 0\r\n\r\n");
/*			var xotree = new XML.ObjTree();
			var dumper = new JKL.Dumper();
			var parseString = feedback.substr(feedback.indexOf("<e:propertyset"));
			//CF.log("Parsestring is: " + parseString);
            //parseString = parseString.replace(/&amp;/g, "&");
	    parseString = parseString.replace(/&lt;/g, "<");
           parseString = parseString.replace(/&gt;/g, ">");
	              parseString = parseString.replace(/&quot;/g, "\"")
  			var tree = xotree.parseXML(parseString);
			CF.log("The raw event is: " + feedback);
			CF.log("JSON version of event is is: " + dumper.dump(tree));*/
		self.notifyMsgQueue.push(Utils.unescape(feedback));
/*CF.log ("***************************************************************************************************");
			CF.log("Pushed a notify of " + Utils.unescape(feedback));
			CF.log ("***************************************************************************************************");
			CF.log(" ");
			CF.log(" ");*/
			self.totalMsg = "";
			if (self.allSubscribesDone) {self.parseNotifyEvent()};
		//};
	};
		
	self.onNotifyListenerConnectionChange = function(system, connected, remote) {
		if (connected === false) {
			CF.log("notify connection event");
		//CF.send("Notify Listener", "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 0\r\n\r\n");

		}
	};	
	
	// This function gets a notify event and then calls the relevant handler
	
	self.parseNotifyEvent = function() {
		if (self.notifyMsgQueue.length != 0  && !self.parseUnderway) {
			self.parseUnderway = true;
			var response = self.notifyMsgQueue.shift();
//CF.log("number of notify's queued is " + self.notifyMsgQueue.length)
			// CF.log("Got a notify reponse of: " + response);
			var findRINCON = /SID: uuid:RINCON_[A-Z0-9]{17}/;
			self.notifyingRINCON = "";
			var description = response.substring(response.indexOf("NOTIFY /") + 8, response.indexOf("HTTP") - 1);
			self.notifyingRINCON = findRINCON.exec(response);
			self.notifyingRINCON = self.notifyingRINCON[0].substring(10);
			self.notifyingZone = self.getZonesIndexFromRINCON(self.notifyingRINCON);
			self.notifyingRoomName = self.discoveredDevicesDetails[self.notifyingZone].roomName;
			//CF.log("self.notifyingZone is: " + self.notifyingZone + "and room is: " + self.notifyingRoomName);
		
			switch(description) {
				case "Alarm Clock":			//self.parseAlarmClock(response);
								CF.log("Got a alarm clock event");
											break;
				case "Music Services":		//self.parseMusicServices(response);
								CF.log("Got a music service event");
											break;
				case "Audio In":			//self.parseAudioIn(response);
								CF.log("Got a audio in event");
											break;
				case "Device Properties":	//self.parseDeviceProperties(response);
								CF.log("Got a device properties event");
											break;
				case "System Properties":	//self.parseSystemProperties(response);
								CF.log("Got a system properties event");
											break;
															
				case "Zone Group":
								CF.log("Got a zone group event");
								self.parseZoneGroup(response);  // see Zones area
								break;
				case "Group Management":	//self.parseGroupManagement(response);
								CF.log("Got a alarm clock event");
								break;
				case "Content Directory":	CF.log("Got a content directory notify event");
								if (self.notifyingZone == self.nowPlayingZoneCoordinatorIndex) {
									self.getQueueForCurrentZone();
								}
								break;
				case "Render Control":		CF.log("got a render control event");
								self.parseRenderControl(response);
								break;
				case "Connection Manager":	//self.parseConnectionManager(response);
								break;
				case "Transport Event":		CF.log("got a transport control event");
								self.parseTransportEvent(response);  // see transport event area
								//CF.log("Got a transport event: " + response);
								break;
				default: 			CF.log("Invalid Response Type");
			}
			self.parseUnderway = false;
			self.parseNotifyEvent();

			}

	};

	// ----------------------------------------------------------------------------
	// LastFm functions
	// ----------------------------------------------------------------------------

	// Function to get LastFM toptags
	
	self.getLastFMTopTags = function () {
		var url, xml, soapBody, soapAction;
		var host = "http://ws.audioscrobbler.com";
		url = '/2.0';
		//soapAction = "http://ws.audioscrobbler.com/2.0";
		xml = 'method=tag.getTopTags&api_key=49f9477923cc3ab8ed90029f6e7e1d9f'
		url = host + url;
		CF.request( url, "POST", {"CONTENT-TYPE": 'application/x-www-form-urlencoded'}, xml, function(status, headers, body) {	
			if (status == 200) {
				body = Utils.unescape(body);
				body = Utils.unescape(body);
				// CF.log("LastFM toptags is: " + body);
				var i = 0, j = 0, title = "", res = "", startTag = "<tag>", endTag = "</tag>"
				i = body.indexOf(startTag, j);
				while (i >= 0) {
					// Loop over all items, where each item is a track on the queue.
					j = body.indexOf(endTag, i);
					var track = body.substring(i + 8, j);
					title = self.extractTag(track, "<name>", "</name>");
					//CF.log("last FM top tag title is: " +  title);
					res = self.extractTag(track, "<url ", "</url>");
					i = body.indexOf(startTag, j);
					self.lastFMTopTags.push({sourceName: title, sourceRes: res, sourceArt:"", sourceID: "LFM:TAG:" + title, sourceParentID: "TOPTAGSPOP", sourceClass: "LastFM"});
				}
				self.lastFMTopTags.sort(function(a, b){ var nameA=a.sourceName, nameB=b.sourceName
					if (nameA < nameB) return -1 ;
					if (nameA > nameB) return 1;
					return 0;
				});

			}
			else {
				CF.log("Last FM top tags POST failed with status " + status);
			}
		});
	}
	
	self.getLASTMFRecentStations = function (){
		var url, xml, soapBody, soapAction;
		var host = self.discoveredDevicesDetails[0].IP + self.port;
		url = '/MediaServer/ContentDirectory/Control';
		soapAction = "urn:schemas-upnp-org:service:ContentDirectory:1#Browse";
		soapBody = '<u:Browse xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><ObjectID>RP:</ObjectID><BrowseFlag>BrowseDirectChildren</BrowseFlag>'+
		'<Filter>dc:title,res,dc:creator,upnp:artist,upnp:album,upnp:albumArtURI</Filter><StartingIndex>0</StartingIndex><RequestedCount></RequestedCount>'+
		'<SortCriteria></SortCriteria></u:Browse>';
		xml = self.soapRequestTemplate.replace('{0}', soapBody);
		url = host + url;
		CF.request( url, "POST", {"SOAPAction": soapAction}, xml, function(status, headers, body) {	
		if (status == 200) {
			//CF.log("POST succeeded")
			body = Utils.unescape(body);
			body = Utils.unescape(body);
			//CF.log("LastFM recent stations is: " + body);
			var i = 0, j = 0;
			var title = "", res = "", sourceID;
			i = body.indexOf("<item", j);
			while (i >= 0) {
				// Loop over all items, where each item is a track on the queue.
				j = body.indexOf("</item>", i);
				var track = body.substring(i + 8, j);
				var res = self.extractTag(track, "<res", "</res>");
				title = self.extractTag(track, "<dc:title>", "</dc:title>").split(":");
				if (title[1] == "ARTIST") {
					sourceID = "LFM:ARTIST:" + title[2];
					title = title[2] + " Similar Artists";
				}
				if (title[1] == "TAG") {
					sourceID = "LFM:TAG:" + title[2];
					title = title[2] + " Tag Radio";
				}
				if (title.length == 1){
					title = title[0];
					sourceID = "LFM:PERSONAL:" + title;
				}
				CF.log("LastFM recent stations title is: " + title);
				i = body.indexOf("<item", j);
						self.lastFMRecentStations.push({sourceName: title, sourceRes: res, sourceArt:"", sourceID: sourceID, sourceParentID: "RECENT", sourceClass: "LastFM"});
			}
			self.lastFMRecentStations.sort(function(a, b){ var nameA=a.sourceName, nameB=b.sourceName
				if (nameA < nameB) return -1 ;
				if (nameA > nameB) return 1;
				return 0;
			});

		}
		else {
			CF.log("POST failed with status " + status);
		}
		});}

	// ----------------------------------------------------------------------------
	// General Utilities used throughout the module
	// ----------------------------------------------------------------------------
	
	// This function is my way to get round the fact that javascript can't equate arrays easily
	// you send it an array, it sends it back which allows use to make another array be a 
	// copy of the source array
	
	self.cloneObject = function (source) {
		return source
	}
	
	// sort the zones alphabetically
	
	self.sortZones = function (a, b) {
		CF.log("Sorting Zones");
		return b.roomName - a.roomName;
	};
	
	// Routine used to extract tag info from sonos responses.  Ideally would use JQuery or
	// the XML Dom object but this seems to be hit and miss with Sonos messages due to the
	// complex nature of DIDL.  This may be less efficient but it works consistently!

	self.extractTag = function(s, start, stop) {
		var i = s.indexOf(start)
		if (i == -1) {
			return "";
		}
		else {
			i = i +	start.length;
			return s.substring(i, s.indexOf(stop, i));
		}
	}

	// Function to send soap requests

	self.sendSoapRequest = function(url, host, xml, soapAction, callback) {
		url = host + url;
		var response = CF.request( url, "POST", {"SOAPAction": soapAction}, xml, function(status, headers, body) {
		if (status == 200) {
			CF.log("POST succeeded");
			body = Utils.unescape(body);
			if (typeof callback === 'function') {
				callback (true);
				
			}
			else {
				return true;
			}
		}
		else {
			CF.log("POST failed with status " + status);
			return false;
			}
		});
	}

	self.getDetailsFromRoomName = function(deviceRoomName) {
		//CF.log("number of devices is " + self.discoveredDevicesDetails.length);
		for (var i = 0; i < self.discoveredDevicesDetails.length; i++) { // loop around for the number of grouped zones
			//CF.log("RINCON to find is " + deviceRINCON + " and current RINCON is " + self.discoveredDevicesDetails[i].RINCON)
			if (self.discoveredDevicesDetails[i].roomName == deviceRoomName) {
					return self.discoveredDevicesDetails[i]
			}
		}	
	}	
	
	self.getDetailsFromRINCON = function(deviceRINCON) {
		//CF.log("number of devices is " + self.discoveredDevicesDetails.length);
		for (var i = 0; i < self.discoveredDevicesDetails.length; i++) { // loop around for the number of grouped zones
			//CF.log("RINCON to find is " + deviceRINCON + " and current RINCON is " + self.discoveredDevicesDetails[i].RINCON)
			if (self.discoveredDevicesDetails[i].RINCON == deviceRINCON) {
					return self.discoveredDevicesDetails[i]
			}
		}
		return "Not Found";
	}
	
	self.getZonesIndexFromRINCON = function (deviceRINCON) {
		for (var i = 0; i < self.discoveredDevicesDetails.length; i++) { // loop around for the number of grouped zones
			//CF.log("RINCON to find is " + deviceRINCON + " and current RINCON is " + self.discoveredDevicesDetails[i].RINCON)
			if (self.discoveredDevicesDetails[i].RINCON == deviceRINCON) {
					return i
			}
		}	
		return -1;
	};
	
		
	self.retrieveMusicFromSpotify = function (callback, DeviceID, DeviceProvider, SessionID, ItemID, StartingIndex, RequestedCount)  {
		var host = "http://spotify.sonos-ws-eu.com";
		var url = '/SpotifyMOAPI/Service1.asmx';
		var SOAPAction = "http://www.sonos.com/Services/1.1#getMetadata";
		var SOAPBody = '<?xml version="1.0" encoding="us-ascii"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><credentials xmlns="http://www.sonos.com/Services/1.1">'+
				'<deviceId>' + DeviceID + '</deviceId><deviceProvider>' + DeviceProvider + '</deviceProvider><sessionId>' + SessionID +
				'</sessionId></credentials></s:Header><s:Body><getMetadata xmlns="http://www.sonos.com/Services/1.1"><id>' + ItemID +
				'</id><index>' + StartingIndex + '</index><count>' + RequestedCount + '</count></getMetadata></s:Body></s:Envelope>';
		var url = host + url;
		CF.log("url is: " + url);
		CF.log("SOAPAction is : " + SOAPAction);
		CF.log("SOAP Body is: " + SOAPBody);
		CF.request( url, 'POST', {"CONTENT-TYPE": 'text/xml; charset="utf-8"', 'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				//CF.log("Spotify response is: " + body)
				callback(  body )
	 		}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}

	self.retrieveMusicFromRadio = function (callback, DeviceID, DeviceProvider, ItemID, StartingIndex, RequestedCount)  {
		var host = "http://legato.radiotime.com";
		var url = '/Radio.asmx';
		var SOAPAction = "http://www.sonos.com/Services/1.1#getMetadata";
		var SOAPBody = '<?xml version="1.0" encoding="us-ascii"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header>'+
			'<credentials xmlns="http://www.sonos.com/Services/1.1"><deviceId>' + DeviceID + '</deviceId><deviceProvider>'
			+ DeviceProvider + '</deviceProvider></credentials></s:Header><s:Body><getMetadata xmlns="http://www.sonos.com/Services/1.1"><id>'
			+ ItemID + '</id><index>'+ StartingIndex +'</index><count>'+ RequestedCount + '</count></getMetadata></s:Body></s:Envelope>';
		var url = host + url;
		CF.log("url is: " + url);
		CF.log("SOAPAction is : " + SOAPAction);
		CF.log("SOAP Body is: " + SOAPBody);
		CF.request( url, 'POST', {"CONTENT-TYPE": 'text/xml; charset="utf-8"', 'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				//CF.log("Radio response is: " + body)
				callback(  body )
	 		}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}		


	self.AlarmClockSetFormat = function (callback, host, DesiredTimeFormat, DesiredDateFormat)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#SetFormat'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetFormat xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><DesiredTimeFormat>'+ DesiredTimeFormat+'</DesiredTimeFormat><DesiredDateFormat>'+ DesiredDateFormat+'</DesiredDateFormat></u:SetFormat></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AlarmClockGetFormat = function (callback, host)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#GetFormat'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetFormat xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"></u:GetFormat></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentTimeFormat": xmlDoc.getElementsByTagName("CurrentTimeFormat")[0].textContent, "CurrentDateFormat": xmlDoc.getElementsByTagName("CurrentDateFormat")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AlarmClockSetTimeZone = function (callback, host, Index, AutoAdjustDst)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#SetTimeZone'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetTimeZone xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><Index>'+ Index+'</Index><AutoAdjustDst>'+ AutoAdjustDst+'</AutoAdjustDst></u:SetTimeZone></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AlarmClockGetTimeZone = function (callback, host)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#GetTimeZone'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetTimeZone xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"></u:GetTimeZone></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"Index": xmlDoc.getElementsByTagName("Index")[0].textContent, "AutoAdjustDst": xmlDoc.getElementsByTagName("AutoAdjustDst")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AlarmClockGetTimeZoneAndRule = function (callback, host)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#GetTimeZoneAndRule'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetTimeZoneAndRule xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"></u:GetTimeZoneAndRule></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"Index": xmlDoc.getElementsByTagName("Index")[0].textContent, "AutoAdjustDst": xmlDoc.getElementsByTagName("AutoAdjustDst")[0].textContent, "CurrentTimeZone": xmlDoc.getElementsByTagName("CurrentTimeZone")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AlarmClockGetTimeZoneRule = function (callback, host, Index)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#GetTimeZoneRule'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetTimeZoneRule xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><Index>'+ Index+'</Index></u:GetTimeZoneRule></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"TimeZone": xmlDoc.getElementsByTagName("TimeZone")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AlarmClockSetTimeServer = function (callback, host, DesiredTimeServer)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#SetTimeServer'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetTimeServer xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><DesiredTimeServer>'+ DesiredTimeServer+'</DesiredTimeServer></u:SetTimeServer></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AlarmClockGetTimeServer = function (callback, host)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#GetTimeServer'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetTimeServer xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"></u:GetTimeServer></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentTimeServer": xmlDoc.getElementsByTagName("CurrentTimeServer")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AlarmClockSetTimeNow = function (callback, host, DesiredTime, TimeZoneForDesiredTime)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#SetTimeNow'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetTimeNow xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><DesiredTime>'+ DesiredTime+'</DesiredTime><TimeZoneForDesiredTime>'+ TimeZoneForDesiredTime+'</TimeZoneForDesiredTime></u:SetTimeNow></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AlarmClockGetHouseholdTimeAtStamp = function (callback, host, TimeStamp)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#GetHouseholdTimeAtStamp'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetHouseholdTimeAtStamp xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><TimeStamp>'+ TimeStamp+'</TimeStamp></u:GetHouseholdTimeAtStamp></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"HouseholdUTCTime": xmlDoc.getElementsByTagName("HouseholdUTCTime")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AlarmClockGetTimeNow = function (callback, host)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#GetTimeNow'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetTimeNow xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"></u:GetTimeNow></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentUTCTime": xmlDoc.getElementsByTagName("CurrentUTCTime")[0].textContent, "CurrentLocalTime": xmlDoc.getElementsByTagName("CurrentLocalTime")[0].textContent, "CurrentTimeZone": xmlDoc.getElementsByTagName("CurrentTimeZone")[0].textContent, "CurrentTimeGeneration": xmlDoc.getElementsByTagName("CurrentTimeGeneration")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AlarmClockCreateAlarm = function (callback, host, StartLocalTime, Duration, Recurrence, Enabled, RoomUUID, ProgramURI, ProgramMetaData, PlayMode, Volume, IncludeLinkedZones)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#CreateAlarm'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:CreateAlarm xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><StartLocalTime>'+ StartLocalTime+'</StartLocalTime><Duration>'+ Duration+'</Duration><Recurrence>'+ Recurrence+'</Recurrence><Enabled>'+ Enabled+'</Enabled><RoomUUID>'+ RoomUUID+'</RoomUUID><ProgramURI>'+ ProgramURI+'</ProgramURI><ProgramMetaData>'+ ProgramMetaData+'</ProgramMetaData><PlayMode>'+ PlayMode+'</PlayMode><Volume>'+ Volume+'</Volume><IncludeLinkedZones>'+ IncludeLinkedZones+'</IncludeLinkedZones></u:CreateAlarm></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"AssignedID": xmlDoc.getElementsByTagName("AssignedID")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AlarmClockUpdateAlarm = function (callback, host, ID, StartLocalTime, Duration, Recurrence, Enabled, RoomUUID, ProgramURI, ProgramMetaData, PlayMode, Volume, IncludeLinkedZones)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#UpdateAlarm'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:UpdateAlarm xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><ID>'+ ID+'</ID><StartLocalTime>'+ StartLocalTime+'</StartLocalTime><Duration>'+ Duration+'</Duration><Recurrence>'+ Recurrence+'</Recurrence><Enabled>'+ Enabled+'</Enabled><RoomUUID>'+ RoomUUID+'</RoomUUID><ProgramURI>'+ ProgramURI+'</ProgramURI><ProgramMetaData>'+ ProgramMetaData+'</ProgramMetaData><PlayMode>'+ PlayMode+'</PlayMode><Volume>'+ Volume+'</Volume><IncludeLinkedZones>'+ IncludeLinkedZones+'</IncludeLinkedZones></u:UpdateAlarm></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AlarmClockDestroyAlarm = function (callback, host, ID)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#DestroyAlarm'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:DestroyAlarm xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><ID>'+ ID+'</ID></u:DestroyAlarm></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AlarmClockListAlarms = function (callback, host)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#ListAlarms'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ListAlarms xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"></u:ListAlarms></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentAlarmList": xmlDoc.getElementsByTagName("CurrentAlarmList")[0].textContent, "CurrentAlarmListVersion": xmlDoc.getElementsByTagName("CurrentAlarmListVersion")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AlarmClockSetDailyIndexRefreshTime = function (callback, host, DesiredDailyIndexRefreshTime)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#SetDailyIndexRefreshTime'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetDailyIndexRefreshTime xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><DesiredDailyIndexRefreshTime>'+ DesiredDailyIndexRefreshTime+'</DesiredDailyIndexRefreshTime></u:SetDailyIndexRefreshTime></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AlarmClockGetDailyIndexRefreshTime = function (callback, host)  {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#GetDailyIndexRefreshTime'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetDailyIndexRefreshTime xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"></u:GetDailyIndexRefreshTime></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentDailyIndexRefreshTime": xmlDoc.getElementsByTagName("CurrentDailyIndexRefreshTime")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.MusicServicesGetSessionId = function (callback, host, ServiceId, Username)  {
		var url = '/MusicServices/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:MusicServices:1#GetSessionId'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetSessionId xmlns:u="urn:schemas-upnp-org:service:MusicServices:1"><ServiceId>'+ ServiceId+'</ServiceId><Username>'+ Username+'</Username></u:GetSessionId></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"SessionId": xmlDoc.getElementsByTagName("SessionId")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.MusicServicesListAvailableServices = function (callback, host)  {
		var url = '/MusicServices/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:MusicServices:1#ListAvailableServices'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ListAvailableServices xmlns:u="urn:schemas-upnp-org:service:MusicServices:1"></u:ListAvailableServices></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"AvailableServiceDescriptorList": xmlDoc.getElementsByTagName("AvailableServiceDescriptorList")[0].textContent, "AvailableServiceTypeList": xmlDoc.getElementsByTagName("AvailableServiceTypeList")[0].textContent, "AvailableServiceListVersion": xmlDoc.getElementsByTagName("AvailableServiceListVersion")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AudioInStartTransmissionToGroup = function (callback, host, CoordinatorID)  {
		var url = '/AudioIn/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AudioIn:1#StartTransmissionToGroup'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:StartTransmissionToGroup xmlns:u="urn:schemas-upnp-org:service:AudioIn:1"><CoordinatorID>'+ CoordinatorID+'</CoordinatorID></u:StartTransmissionToGroup></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentTransportSettings": xmlDoc.getElementsByTagName("CurrentTransportSettings")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AudioInStopTransmissionToGroup = function (callback, host, CoordinatorID)  {
		var url = '/AudioIn/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AudioIn:1#StopTransmissionToGroup'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:StopTransmissionToGroup xmlns:u="urn:schemas-upnp-org:service:AudioIn:1"><CoordinatorID>'+ CoordinatorID+'</CoordinatorID></u:StopTransmissionToGroup></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AudioInSetAudioInputAttributes = function (callback, host, DesiredName, DesiredIcon)  {
		var url = '/AudioIn/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AudioIn:1#SetAudioInputAttributes'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetAudioInputAttributes xmlns:u="urn:schemas-upnp-org:service:AudioIn:1"><DesiredName>'+ DesiredName+'</DesiredName><DesiredIcon>'+ DesiredIcon+'</DesiredIcon></u:SetAudioInputAttributes></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AudioInGetAudioInputAttributes = function (callback, host)  {
		var url = '/AudioIn/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AudioIn:1#GetAudioInputAttributes'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetAudioInputAttributes xmlns:u="urn:schemas-upnp-org:service:AudioIn:1"></u:GetAudioInputAttributes></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentName": xmlDoc.getElementsByTagName("CurrentName")[0].textContent, "CurrentIcon": xmlDoc.getElementsByTagName("CurrentIcon")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AudioInSetLineInLevel = function (callback, host, DesiredLeftLineInLevel, DesiredRightLineInLevel)  {
		var url = '/AudioIn/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AudioIn:1#SetLineInLevel'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetLineInLevel xmlns:u="urn:schemas-upnp-org:service:AudioIn:1"><DesiredLeftLineInLevel>'+ DesiredLeftLineInLevel+'</DesiredLeftLineInLevel><DesiredRightLineInLevel>'+ DesiredRightLineInLevel+'</DesiredRightLineInLevel></u:SetLineInLevel></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AudioInGetLineInLevel = function (callback, host)  {
		var url = '/AudioIn/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AudioIn:1#GetLineInLevel'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetLineInLevel xmlns:u="urn:schemas-upnp-org:service:AudioIn:1"></u:GetLineInLevel></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentLeftLineInLevel": xmlDoc.getElementsByTagName("CurrentLeftLineInLevel")[0].textContent, "CurrentRightLineInLevel": xmlDoc.getElementsByTagName("CurrentRightLineInLevel")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AudioInSelectAudio = function (callback, host, ObjectID)  {
		var url = '/AudioIn/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AudioIn:1#SelectAudio'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SelectAudio xmlns:u="urn:schemas-upnp-org:service:AudioIn:1"><ObjectID>'+ ObjectID+'</ObjectID></u:SelectAudio></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.DevicePropertiesSetLEDState = function (callback, host, DesiredLEDState)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#SetLEDState'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetLEDState xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><DesiredLEDState>'+ DesiredLEDState+'</DesiredLEDState></u:SetLEDState></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.DevicePropertiesGetLEDState = function (callback, host)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetLEDState'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetLEDState xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetLEDState></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentLEDState": xmlDoc.getElementsByTagName("CurrentLEDState")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.DevicePropertiesSetInvisible = function (callback, host, DesiredInvisible)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#SetInvisible'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetInvisible xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><DesiredInvisible>'+ DesiredInvisible+'</DesiredInvisible></u:SetInvisible></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.DevicePropertiesGetInvisible = function (callback, host)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetInvisible'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetInvisible xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetInvisible></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentInvisible": xmlDoc.getElementsByTagName("CurrentInvisible")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.DevicePropertiesAddBondedZones = function (callback, host, ChannelMapSet)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#AddBondedZones'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:AddBondedZones xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><ChannelMapSet>'+ ChannelMapSet+'</ChannelMapSet></u:AddBondedZones></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.DevicePropertiesRemoveBondedZones = function (callback, host, ChannelMapSet)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#RemoveBondedZones'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RemoveBondedZones xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><ChannelMapSet>'+ ChannelMapSet+'</ChannelMapSet></u:RemoveBondedZones></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.DevicePropertiesCreateStereoPair = function (callback, host, ChannelMapSet)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#CreateStereoPair'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:CreateStereoPair xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><ChannelMapSet>'+ ChannelMapSet+'</ChannelMapSet></u:CreateStereoPair></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.DevicePropertiesSeparateStereoPair = function (callback, host, ChannelMapSet)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#SeparateStereoPair'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SeparateStereoPair xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><ChannelMapSet>'+ ChannelMapSet+'</ChannelMapSet></u:SeparateStereoPair></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.DevicePropertiesSetZoneAttributes = function (callback, host, DesiredZoneName, DesiredIcon)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#SetZoneAttributes'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetZoneAttributes xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><DesiredZoneName>'+ DesiredZoneName+'</DesiredZoneName><DesiredIcon>'+ DesiredIcon+'</DesiredIcon></u:SetZoneAttributes></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.DevicePropertiesGetZoneAttributes = function (callback, host)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetZoneAttributes'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetZoneAttributes xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetZoneAttributes></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentZoneName": xmlDoc.getElementsByTagName("CurrentZoneName")[0].textContent, "CurrentIcon": xmlDoc.getElementsByTagName("CurrentIcon")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.DevicePropertiesGetHouseholdID = function (callback, host)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetHouseholdID'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetHouseholdID xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetHouseholdID></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentHouseholdID": xmlDoc.getElementsByTagName("CurrentHouseholdID")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.DevicePropertiesGetZoneInfo = function (callback, host)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetZoneInfo'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetZoneInfo xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetZoneInfo></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"SerialNumber": xmlDoc.getElementsByTagName("SerialNumber")[0].textContent, "SoftwareVersion": xmlDoc.getElementsByTagName("SoftwareVersion")[0].textContent, "DisplaySoftwareVersion": xmlDoc.getElementsByTagName("DisplaySoftwareVersion")[0].textContent, "HardwareVersion": xmlDoc.getElementsByTagName("HardwareVersion")[0].textContent, "IPAddress": xmlDoc.getElementsByTagName("IPAddress")[0].textContent, "MACAddress": xmlDoc.getElementsByTagName("MACAddress")[0].textContent, "CopyrightInfo": xmlDoc.getElementsByTagName("CopyrightInfo")[0].textContent, "ExtraInfo": xmlDoc.getElementsByTagName("ExtraInfo")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.DevicePropertiesSetAutoplayLinkedZones = function (callback, host, IncludeLinkedZones)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#SetAutoplayLinkedZones'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetAutoplayLinkedZones xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><IncludeLinkedZones>'+ IncludeLinkedZones+'</IncludeLinkedZones></u:SetAutoplayLinkedZones></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.DevicePropertiesGetAutoplayLinkedZones = function (callback, host)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetAutoplayLinkedZones'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetAutoplayLinkedZones xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetAutoplayLinkedZones></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"IncludeLinkedZones": xmlDoc.getElementsByTagName("IncludeLinkedZones")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.DevicePropertiesSetAutoplayRoomUUID = function (callback, host, RoomUUID)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#SetAutoplayRoomUUID'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetAutoplayRoomUUID xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><RoomUUID>'+ RoomUUID+'</RoomUUID></u:SetAutoplayRoomUUID></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.DevicePropertiesGetAutoplayRoomUUID = function (callback, host)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetAutoplayRoomUUID'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetAutoplayRoomUUID xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetAutoplayRoomUUID></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"RoomUUID": xmlDoc.getElementsByTagName("RoomUUID")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.DevicePropertiesSetAutoplayVolume = function (callback, host, Volume)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#SetAutoplayVolume'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetAutoplayVolume xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><Volume>'+ Volume+'</Volume></u:SetAutoplayVolume></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.DevicePropertiesGetAutoplayVolume = function (callback, host)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetAutoplayVolume'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetAutoplayVolume xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetAutoplayVolume></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentVolume": xmlDoc.getElementsByTagName("CurrentVolume")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.DevicePropertiesImportSetting = function (callback, host, SettingID, SettingURI)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#ImportSetting'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ImportSetting xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><SettingID>'+ SettingID+'</SettingID><SettingURI>'+ SettingURI+'</SettingURI></u:ImportSetting></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.DevicePropertiesSetUseAutoplayVolume = function (callback, host, UseVolume)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#SetUseAutoplayVolume'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetUseAutoplayVolume xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><UseVolume>'+ UseVolume+'</UseVolume></u:SetUseAutoplayVolume></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.DevicePropertiesGetUseAutoplayVolume = function (callback, host)  {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetUseAutoplayVolume'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetUseAutoplayVolume xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetUseAutoplayVolume></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"UseVolume": xmlDoc.getElementsByTagName("UseVolume")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.SystemPropertiesSetString = function (callback, host, VariableName, StringValue)  {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#SetString'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetString xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><VariableName>'+ VariableName+'</VariableName><StringValue>'+ StringValue+'</StringValue></u:SetString></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.SystemPropertiesSetStringX = function (callback, host, VariableName, StringValue)  {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#SetStringX'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetStringX xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><VariableName>'+ VariableName+'</VariableName><StringValue>'+ StringValue+'</StringValue></u:SetStringX></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.SystemPropertiesGetString = function (callback, host, VariableName)  {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#GetString'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetString xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><VariableName>'+ VariableName+'</VariableName></u:GetString></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"StringValue": xmlDoc.getElementsByTagName("StringValue")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.SystemPropertiesGetStringX = function (callback, host, VariableName)  {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#GetStringX'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetStringX xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><VariableName>'+ VariableName+'</VariableName></u:GetStringX></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"StringValue": xmlDoc.getElementsByTagName("StringValue")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.SystemPropertiesRemove = function (callback, host, VariableName)  {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#Remove'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Remove xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><VariableName>'+ VariableName+'</VariableName></u:Remove></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.SystemPropertiesGetWebCode = function (callback, host, AccountType)  {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#GetWebCode'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetWebCode xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><AccountType>'+ AccountType+'</AccountType></u:GetWebCode></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"WebCode": xmlDoc.getElementsByTagName("WebCode")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.SystemPropertiesProvisionTrialAccount = function (callback, host, AccountType)  {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#ProvisionTrialAccount'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ProvisionTrialAccount xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><AccountType>'+ AccountType+'</AccountType></u:ProvisionTrialAccount></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.SystemPropertiesProvisionCredentialedTrialAccountX = function (callback, host, AccountType, AccountID, AccountPassword)  {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#ProvisionCredentialedTrialAccountX'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ProvisionCredentialedTrialAccountX xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><AccountType>'+ AccountType+'</AccountType><AccountID>'+ AccountID+'</AccountID><AccountPassword>'+ AccountPassword+'</AccountPassword></u:ProvisionCredentialedTrialAccountX></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"IsExpired": xmlDoc.getElementsByTagName("IsExpired")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.SystemPropertiesMigrateTrialAccountX = function (callback, host, TargetAccountType, TargetAccountID, TargetAccountPassword)  {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#MigrateTrialAccountX'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:MigrateTrialAccountX xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><TargetAccountType>'+ TargetAccountType+'</TargetAccountType><TargetAccountID>'+ TargetAccountID+'</TargetAccountID><TargetAccountPassword>'+ TargetAccountPassword+'</TargetAccountPassword></u:MigrateTrialAccountX></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.SystemPropertiesAddAccountX = function (callback, host, AccountType, AccountID, AccountPassword)  {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#AddAccountX'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:AddAccountX xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><AccountType>'+ AccountType+'</AccountType><AccountID>'+ AccountID+'</AccountID><AccountPassword>'+ AccountPassword+'</AccountPassword></u:AddAccountX></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.SystemPropertiesAddAccountWithCredentialsX = function (callback, host, AccountType, AccountToken, AccountKey)  {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#AddAccountWithCredentialsX'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:AddAccountWithCredentialsX xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><AccountType>'+ AccountType+'</AccountType><AccountToken>'+ AccountToken+'</AccountToken><AccountKey>'+ AccountKey+'</AccountKey></u:AddAccountWithCredentialsX></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.SystemPropertiesRemoveAccount = function (callback, host, AccountType, AccountID)  {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#RemoveAccount'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RemoveAccount xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><AccountType>'+ AccountType+'</AccountType><AccountID>'+ AccountID+'</AccountID></u:RemoveAccount></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.SystemPropertiesEditAccountPasswordX = function (callback, host, AccountType, AccountID, NewAccountPassword)  {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#EditAccountPasswordX'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:EditAccountPasswordX xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><AccountType>'+ AccountType+'</AccountType><AccountID>'+ AccountID+'</AccountID><NewAccountPassword>'+ NewAccountPassword+'</NewAccountPassword></u:EditAccountPasswordX></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.SystemPropertiesEditAccountMd = function (callback, host, AccountType, AccountID, NewAccountMd)  {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#EditAccountMd'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:EditAccountMd xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><AccountType>'+ AccountType+'</AccountType><AccountID>'+ AccountID+'</AccountID><NewAccountMd>'+ NewAccountMd+'</NewAccountMd></u:EditAccountMd></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.ZoneGroupTopologyCheckForUpdate = function (callback, host, UpdateType, CachedOnly, Version)  {
		var url = '/ZoneGroupTopology/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ZoneGroupTopology:1#CheckForUpdate'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:CheckForUpdate xmlns:u="urn:schemas-upnp-org:service:ZoneGroupTopology:1"><UpdateType>'+ UpdateType+'</UpdateType><CachedOnly>'+ CachedOnly+'</CachedOnly><Version>'+ Version+'</Version></u:CheckForUpdate></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"UpdateItem": xmlDoc.getElementsByTagName("UpdateItem")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.ZoneGroupTopologyBeginSoftwareUpdate = function (callback, host, UpdateURL, Flags)  {
		var url = '/ZoneGroupTopology/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ZoneGroupTopology:1#BeginSoftwareUpdate'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:BeginSoftwareUpdate xmlns:u="urn:schemas-upnp-org:service:ZoneGroupTopology:1"><UpdateURL>'+ UpdateURL+'</UpdateURL><Flags>'+ Flags+'</Flags></u:BeginSoftwareUpdate></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.ZoneGroupTopologyReportUnresponsiveDevice = function (callback, host, DeviceUUID, DesiredAction)  {
		var url = '/ZoneGroupTopology/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ZoneGroupTopology:1#ReportUnresponsiveDevice'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ReportUnresponsiveDevice xmlns:u="urn:schemas-upnp-org:service:ZoneGroupTopology:1"><DeviceUUID>'+ DeviceUUID+'</DeviceUUID><DesiredAction>'+ DesiredAction+'</DesiredAction></u:ReportUnresponsiveDevice></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.ZoneGroupTopologySubmitDiagnostics = function (callback, host)  {
		var url = '/ZoneGroupTopology/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ZoneGroupTopology:1#SubmitDiagnostics'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SubmitDiagnostics xmlns:u="urn:schemas-upnp-org:service:ZoneGroupTopology:1"></u:SubmitDiagnostics></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"DiagnosticID": xmlDoc.getElementsByTagName("DiagnosticID")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.GroupManagementAddMember = function (callback, host, MemberID)  {
		var url = '/GroupManagement/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:GroupManagement:1#AddMember'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:AddMember xmlns:u="urn:schemas-upnp-org:service:GroupManagement:1"><MemberID>'+ MemberID+'</MemberID></u:AddMember></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentTransportSettings": xmlDoc.getElementsByTagName("CurrentTransportSettings")[0].textContent, "GroupUUIDJoined": xmlDoc.getElementsByTagName("GroupUUIDJoined")[0].textContent, "ResetVolumeAfter": xmlDoc.getElementsByTagName("ResetVolumeAfter")[0].textContent, "VolumeAVTransportURI": xmlDoc.getElementsByTagName("VolumeAVTransportURI")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.GroupManagementRemoveMember = function (callback, host, MemberID)  {
		var url = '/GroupManagement/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:GroupManagement:1#RemoveMember'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RemoveMember xmlns:u="urn:schemas-upnp-org:service:GroupManagement:1"><MemberID>'+ MemberID+'</MemberID></u:RemoveMember></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.GroupManagementReportTrackBufferingResult = function (callback, host, MemberID, ResultCode)  {
		var url = '/GroupManagement/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:GroupManagement:1#ReportTrackBufferingResult'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ReportTrackBufferingResult xmlns:u="urn:schemas-upnp-org:service:GroupManagement:1"><MemberID>'+ MemberID+'</MemberID><ResultCode>'+ ResultCode+'</ResultCode></u:ReportTrackBufferingResult></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.ContentDirectoryGetSearchCapabilities = function (callback, host)  {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#GetSearchCapabilities'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetSearchCapabilities xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"></u:GetSearchCapabilities></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"SearchCaps": xmlDoc.getElementsByTagName("SearchCaps")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.ContentDirectoryGetSortCapabilities = function (callback, host)  {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#GetSortCapabilities'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetSortCapabilities xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"></u:GetSortCapabilities></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"SortCaps": xmlDoc.getElementsByTagName("SortCaps")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.ContentDirectoryGetSystemUpdateID = function (callback, host)  {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#GetSystemUpdateID'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetSystemUpdateID xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"></u:GetSystemUpdateID></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"Id": xmlDoc.getElementsByTagName("Id")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.ContentDirectoryGetAlbumArtistDisplayOption = function (callback, host)  {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#GetAlbumArtistDisplayOption'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetAlbumArtistDisplayOption xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"></u:GetAlbumArtistDisplayOption></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"AlbumArtistDisplayOption": xmlDoc.getElementsByTagName("AlbumArtistDisplayOption")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.ContentDirectoryGetLastIndexChange = function (callback, host)  {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#GetLastIndexChange'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetLastIndexChange xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"></u:GetLastIndexChange></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"LastIndexChange": xmlDoc.getElementsByTagName("LastIndexChange")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.ContentDirectoryBrowse = function (callback, host, ObjectID, BrowseFlag, Filter, StartingIndex, RequestedCount, SortCriteria)  {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#Browse'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Browse xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><ObjectID>'+ ObjectID+'</ObjectID><BrowseFlag>'+ BrowseFlag+'</BrowseFlag><Filter>'+ Filter+'</Filter><StartingIndex>'+ StartingIndex+'</StartingIndex><RequestedCount>'+ RequestedCount+'</RequestedCount><SortCriteria>'+ SortCriteria+'</SortCriteria></u:Browse></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"Result": xmlDoc.getElementsByTagName("Result")[0].textContent, "NumberReturned": xmlDoc.getElementsByTagName("NumberReturned")[0].textContent, "TotalMatches": xmlDoc.getElementsByTagName("TotalMatches")[0].textContent, "UpdateID": xmlDoc.getElementsByTagName("UpdateID")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.ContentDirectoryFindPrefix = function (callback, host, ObjectID, Prefix)  {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#FindPrefix'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:FindPrefix xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><ObjectID>'+ ObjectID+'</ObjectID><Prefix>'+ Prefix+'</Prefix></u:FindPrefix></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"StartingIndex": xmlDoc.getElementsByTagName("StartingIndex")[0].textContent, "UpdateID": xmlDoc.getElementsByTagName("UpdateID")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.ContentDirectoryGetAllPrefixLocations = function (callback, host, ObjectID)  {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#GetAllPrefixLocations'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetAllPrefixLocations xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><ObjectID>'+ ObjectID+'</ObjectID></u:GetAllPrefixLocations></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"TotalPrefixes": xmlDoc.getElementsByTagName("TotalPrefixes")[0].textContent, "PrefixAndIndexCSV": xmlDoc.getElementsByTagName("PrefixAndIndexCSV")[0].textContent, "UpdateID": xmlDoc.getElementsByTagName("UpdateID")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.ContentDirectoryCreateObject = function (callback, host, ContainerID, Elements)  {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#CreateObject'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:CreateObject xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><ContainerID>'+ ContainerID+'</ContainerID><Elements>'+ Elements+'</Elements></u:CreateObject></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"ObjectID": xmlDoc.getElementsByTagName("ObjectID")[0].textContent, "Result": xmlDoc.getElementsByTagName("Result")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.ContentDirectoryUpdateObject = function (callback, host, ObjectID, CurrentTagValue, NewTagValue)  {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#UpdateObject'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:UpdateObject xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><ObjectID>'+ ObjectID+'</ObjectID><CurrentTagValue>'+ CurrentTagValue+'</CurrentTagValue><NewTagValue>'+ NewTagValue+'</NewTagValue></u:UpdateObject></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.ContentDirectoryDestroyObject = function (callback, host, ObjectID)  {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#DestroyObject'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:DestroyObject xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><ObjectID>'+ ObjectID+'</ObjectID></u:DestroyObject></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.ContentDirectoryRefreshShareIndex = function (callback, host, AlbumArtistDisplayOption)  {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#RefreshShareIndex'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RefreshShareIndex xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><AlbumArtistDisplayOption>'+ AlbumArtistDisplayOption+'</AlbumArtistDisplayOption></u:RefreshShareIndex></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.ContentDirectoryRequestResort = function (callback, host, SortOrder)  {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#RequestResort'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RequestResort xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><SortOrder>'+ SortOrder+'</SortOrder></u:RequestResort></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.ContentDirectoryGetShareIndexInProgress = function (callback, host)  {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#GetShareIndexInProgress'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetShareIndexInProgress xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"></u:GetShareIndexInProgress></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"IsIndexing": xmlDoc.getElementsByTagName("IsIndexing")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.ContentDirectoryGetBrowseable = function (callback, host)  {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#GetBrowseable'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetBrowseable xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"></u:GetBrowseable></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"IsBrowseable": xmlDoc.getElementsByTagName("IsBrowseable")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.ContentDirectorySetBrowseable = function (callback, host, Browseable)  {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#SetBrowseable'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetBrowseable xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><Browseable>'+ Browseable+'</Browseable></u:SetBrowseable></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.ConnectionManagerGetProtocolInfo = function (callback, host)  {
		var url = '/MediaServer/ConnectionManager/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ConnectionManager:1#GetProtocolInfo'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetProtocolInfo xmlns:u="urn:schemas-upnp-org:service:ConnectionManager:1"></u:GetProtocolInfo></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"Source": xmlDoc.getElementsByTagName("Source")[0].textContent, "Sink": xmlDoc.getElementsByTagName("Sink")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.ConnectionManagerGetCurrentConnectionIDs = function (callback, host)  {
		var url = '/MediaServer/ConnectionManager/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ConnectionManager:1#GetCurrentConnectionIDs'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetCurrentConnectionIDs xmlns:u="urn:schemas-upnp-org:service:ConnectionManager:1"></u:GetCurrentConnectionIDs></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"ConnectionIDs": xmlDoc.getElementsByTagName("ConnectionIDs")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.ConnectionManagerGetCurrentConnectionInfo = function (callback, host, ConnectionID)  {
		var url = '/MediaServer/ConnectionManager/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ConnectionManager:1#GetCurrentConnectionInfo'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetCurrentConnectionInfo xmlns:u="urn:schemas-upnp-org:service:ConnectionManager:1"><ConnectionID>'+ ConnectionID+'</ConnectionID></u:GetCurrentConnectionInfo></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"RcsID": xmlDoc.getElementsByTagName("RcsID")[0].textContent, "AVTransportID": xmlDoc.getElementsByTagName("AVTransportID")[0].textContent, "ProtocolInfo": xmlDoc.getElementsByTagName("ProtocolInfo")[0].textContent, "PeerConnectionManager": xmlDoc.getElementsByTagName("PeerConnectionManager")[0].textContent, "PeerConnectionID": xmlDoc.getElementsByTagName("PeerConnectionID")[0].textContent, "Direction": xmlDoc.getElementsByTagName("Direction")[0].textContent, "Status": xmlDoc.getElementsByTagName("Status")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.RenderingControlGetMute = function (callback, host, InstanceID, Channel)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetMute'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetMute xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><Channel>'+ Channel+'</Channel></u:GetMute></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentMute": xmlDoc.getElementsByTagName("CurrentMute")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.RenderingControlSetMute = function (callback, host, InstanceID, Channel, DesiredMute)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetMute'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetMute xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><Channel>'+ Channel+'</Channel><DesiredMute>'+ DesiredMute+'</DesiredMute></u:SetMute></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.RenderingControlResetBasicEQ = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#ResetBasicEQ'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ResetBasicEQ xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID></u:ResetBasicEQ></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"Bass": xmlDoc.getElementsByTagName("Bass")[0].textContent, "Treble": xmlDoc.getElementsByTagName("Treble")[0].textContent, "Loudness": xmlDoc.getElementsByTagName("Loudness")[0].textContent, "LeftVolume": xmlDoc.getElementsByTagName("LeftVolume")[0].textContent, "RightVolume": xmlDoc.getElementsByTagName("RightVolume")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.RenderingControlResetExtEQ = function (callback, host, InstanceID, EQType)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#ResetExtEQ'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ResetExtEQ xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><EQType>'+ EQType+'</EQType></u:ResetExtEQ></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.RenderingControlGetVolume = function (callback, host, InstanceID, Channel)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetVolume'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetVolume xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><Channel>'+ Channel+'</Channel></u:GetVolume></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentVolume": xmlDoc.getElementsByTagName("CurrentVolume")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.RenderingControlSetVolume = function (callback, host, InstanceID, Channel, DesiredVolume)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetVolume'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetVolume xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><Channel>'+ Channel+'</Channel><DesiredVolume>'+ DesiredVolume+'</DesiredVolume></u:SetVolume></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.RenderingControlSetRelativeVolume = function (callback, host, InstanceID, Channel, Adjustment)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetRelativeVolume'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetRelativeVolume xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><Channel>'+ Channel+'</Channel><Adjustment>'+ Adjustment+'</Adjustment></u:SetRelativeVolume></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"NewVolume": xmlDoc.getElementsByTagName("NewVolume")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.RenderingControlGetVolumeDB = function (callback, host, InstanceID, Channel)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetVolumeDB'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetVolumeDB xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><Channel>'+ Channel+'</Channel></u:GetVolumeDB></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentVolume": xmlDoc.getElementsByTagName("CurrentVolume")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.RenderingControlSetVolumeDB = function (callback, host, InstanceID, Channel, DesiredVolume)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetVolumeDB'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetVolumeDB xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><Channel>'+ Channel+'</Channel><DesiredVolume>'+ DesiredVolume+'</DesiredVolume></u:SetVolumeDB></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.RenderingControlGetVolumeDBRange = function (callback, host, InstanceID, Channel)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetVolumeDBRange'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetVolumeDBRange xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><Channel>'+ Channel+'</Channel></u:GetVolumeDBRange></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"MinValue": xmlDoc.getElementsByTagName("MinValue")[0].textContent, "MaxValue": xmlDoc.getElementsByTagName("MaxValue")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.RenderingControlGetBass = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetBass'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetBass xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID></u:GetBass></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentBass": xmlDoc.getElementsByTagName("CurrentBass")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.RenderingControlSetBass = function (callback, host, InstanceID, DesiredBass)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetBass'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetBass xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><DesiredBass>'+ DesiredBass+'</DesiredBass></u:SetBass></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.RenderingControlGetTreble = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetTreble'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetTreble xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID></u:GetTreble></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentTreble": xmlDoc.getElementsByTagName("CurrentTreble")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.RenderingControlSetTreble = function (callback, host, InstanceID, DesiredTreble)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetTreble'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetTreble xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><DesiredTreble>'+ DesiredTreble+'</DesiredTreble></u:SetTreble></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.RenderingControlGetEQ = function (callback, host, InstanceID, EQType)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetEQ'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetEQ xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><EQType>'+ EQType+'</EQType></u:GetEQ></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentValue": xmlDoc.getElementsByTagName("CurrentValue")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.RenderingControlSetEQ = function (callback, host, InstanceID, EQType, DesiredValue)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetEQ'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetEQ xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><EQType>'+ EQType+'</EQType><DesiredValue>'+ DesiredValue+'</DesiredValue></u:SetEQ></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.RenderingControlGetLoudness = function (callback, host, InstanceID, Channel)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetLoudness'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetLoudness xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><Channel>'+ Channel+'</Channel></u:GetLoudness></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentLoudness": xmlDoc.getElementsByTagName("CurrentLoudness")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.RenderingControlSetLoudness = function (callback, host, InstanceID, Channel, DesiredLoudness)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetLoudness'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetLoudness xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><Channel>'+ Channel+'</Channel><DesiredLoudness>'+ DesiredLoudness+'</DesiredLoudness></u:SetLoudness></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.RenderingControlGetSupportsOutputFixed = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetSupportsOutputFixed'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetSupportsOutputFixed xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID></u:GetSupportsOutputFixed></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentSupportsFixed": xmlDoc.getElementsByTagName("CurrentSupportsFixed")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.RenderingControlGetOutputFixed = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetOutputFixed'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetOutputFixed xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID></u:GetOutputFixed></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentFixed": xmlDoc.getElementsByTagName("CurrentFixed")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.RenderingControlSetOutputFixed = function (callback, host, InstanceID, DesiredFixed)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetOutputFixed'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetOutputFixed xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><DesiredFixed>'+ DesiredFixed+'</DesiredFixed></u:SetOutputFixed></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.RenderingControlGetHeadphoneConnected = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetHeadphoneConnected'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetHeadphoneConnected xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID></u:GetHeadphoneConnected></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentHeadphoneConnected": xmlDoc.getElementsByTagName("CurrentHeadphoneConnected")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.RenderingControlRampToVolume = function (callback, host, InstanceID, Channel, RampType, DesiredVolume, ResetVolumeAfter, ProgramURI)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#RampToVolume'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RampToVolume xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><Channel>'+ Channel+'</Channel><RampType>'+ RampType+'</RampType><DesiredVolume>'+ DesiredVolume+'</DesiredVolume><ResetVolumeAfter>'+ ResetVolumeAfter+'</ResetVolumeAfter><ProgramURI>'+ ProgramURI+'</ProgramURI></u:RampToVolume></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"RampTime": xmlDoc.getElementsByTagName("RampTime")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.RenderingControlRestoreVolumePriorToRamp = function (callback, host, InstanceID, Channel)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#RestoreVolumePriorToRamp'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RestoreVolumePriorToRamp xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><Channel>'+ Channel+'</Channel></u:RestoreVolumePriorToRamp></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.RenderingControlSetChannelMap = function (callback, host, InstanceID, ChannelMap)  {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetChannelMap'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetChannelMap xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>'+ InstanceID+'</InstanceID><ChannelMap>'+ ChannelMap+'</ChannelMap></u:SetChannelMap></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.ConnectionManagerGetProtocolInfo = function (callback, host)  {
		var url = '/MediaRenderer/ConnectionManager/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ConnectionManager:1#GetProtocolInfo'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetProtocolInfo xmlns:u="urn:schemas-upnp-org:service:ConnectionManager:1"></u:GetProtocolInfo></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"Source": xmlDoc.getElementsByTagName("Source")[0].textContent, "Sink": xmlDoc.getElementsByTagName("Sink")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.ConnectionManagerGetCurrentConnectionIDs = function (callback, host)  {
		var url = '/MediaRenderer/ConnectionManager/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ConnectionManager:1#GetCurrentConnectionIDs'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetCurrentConnectionIDs xmlns:u="urn:schemas-upnp-org:service:ConnectionManager:1"></u:GetCurrentConnectionIDs></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"ConnectionIDs": xmlDoc.getElementsByTagName("ConnectionIDs")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.ConnectionManagerGetCurrentConnectionInfo = function (callback, host, ConnectionID)  {
		var url = '/MediaRenderer/ConnectionManager/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ConnectionManager:1#GetCurrentConnectionInfo'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetCurrentConnectionInfo xmlns:u="urn:schemas-upnp-org:service:ConnectionManager:1"><ConnectionID>'+ ConnectionID+'</ConnectionID></u:GetCurrentConnectionInfo></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"RcsID": xmlDoc.getElementsByTagName("RcsID")[0].textContent, "AVTransportID": xmlDoc.getElementsByTagName("AVTransportID")[0].textContent, "ProtocolInfo": xmlDoc.getElementsByTagName("ProtocolInfo")[0].textContent, "PeerConnectionManager": xmlDoc.getElementsByTagName("PeerConnectionManager")[0].textContent, "PeerConnectionID": xmlDoc.getElementsByTagName("PeerConnectionID")[0].textContent, "Direction": xmlDoc.getElementsByTagName("Direction")[0].textContent, "Status": xmlDoc.getElementsByTagName("Status")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AVTransportSetAVTransportURI = function (callback, host, InstanceID, CurrentURI, CurrentURIMetaData)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#SetAVTransportURI'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetAVTransportURI xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><CurrentURI>'+ Utils.escape(CurrentURI) + '</CurrentURI><CurrentURIMetaData>'+ Utils.escape(CurrentURIMetaData) + '</CurrentURIMetaData></u:SetAVTransportURI></s:Body></s:Envelope>';
		CF.log("SOAPBody for SetURI is:" + SOAPBody);
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportAddURIToQueue = function (callback, host, InstanceID, EnqueuedURI, EnqueuedURIMetaData, DesiredFirstTrackNumberEnqueued, EnqueueAsNext)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#AddURIToQueue'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:AddURIToQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><EnqueuedURI>'+ Utils.escape(EnqueuedURI) +'</EnqueuedURI><EnqueuedURIMetaData>'+ Utils.escape(EnqueuedURIMetaData) +'</EnqueuedURIMetaData><DesiredFirstTrackNumberEnqueued>'+ DesiredFirstTrackNumberEnqueued+'</DesiredFirstTrackNumberEnqueued><EnqueueAsNext>'+ EnqueueAsNext+'</EnqueueAsNext></u:AddURIToQueue></s:Body></s:Envelope>';
		var url = host + url;
		CF.log("SOAPBody for AddURI is:" + SOAPBody);
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"FirstTrackNumberEnqueued": xmlDoc.getElementsByTagName("FirstTrackNumberEnqueued")[0].textContent, "NumTracksAdded": xmlDoc.getElementsByTagName("NumTracksAdded")[0].textContent, "NewQueueLength": xmlDoc.getElementsByTagName("NewQueueLength")[0].textContent} )
	 		}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AVTransportAddMultipleURIsToQueue = function (callback, host, InstanceID, UpdateID, NumberOfURIs, EnqueuedURIs, EnqueuedURIsMetaData, ContainerURI, ContainerMetaData, DesiredFirstTrackNumberEnqueued, EnqueueAsNext)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#AddMultipleURIsToQueue'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:AddMultipleURIsToQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><UpdateID>'+ UpdateID+'</UpdateID><NumberOfURIs>'+ NumberOfURIs+'</NumberOfURIs><EnqueuedURIs>'+ EnqueuedURIs+'</EnqueuedURIs><EnqueuedURIsMetaData>'+ EnqueuedURIsMetaData+'</EnqueuedURIsMetaData><ContainerURI>'+ ContainerURI+'</ContainerURI><ContainerMetaData>'+ ContainerMetaData+'</ContainerMetaData><DesiredFirstTrackNumberEnqueued>'+ DesiredFirstTrackNumberEnqueued+'</DesiredFirstTrackNumberEnqueued><EnqueueAsNext>'+ EnqueueAsNext+'</EnqueueAsNext></u:AddMultipleURIsToQueue></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"FirstTrackNumberEnqueued": xmlDoc.getElementsByTagName("FirstTrackNumberEnqueued")[0].textContent, "NumTracksAdded": xmlDoc.getElementsByTagName("NumTracksAdded")[0].textContent, "NewQueueLength": xmlDoc.getElementsByTagName("NewQueueLength")[0].textContent, "NewUpdateID": xmlDoc.getElementsByTagName("NewUpdateID")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AVTransportReorderTracksInQueue = function (callback, host, InstanceID, StartingIndex, NumberOfTracks, InsertBefore, UpdateID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#ReorderTracksInQueue'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ReorderTracksInQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><StartingIndex>'+ StartingIndex+'</StartingIndex><NumberOfTracks>'+ NumberOfTracks+'</NumberOfTracks><InsertBefore>'+ InsertBefore+'</InsertBefore><UpdateID>'+ UpdateID+'</UpdateID></u:ReorderTracksInQueue></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportRemoveTrackFromQueue = function (callback, host, InstanceID, ObjectID, UpdateID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#RemoveTrackFromQueue'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RemoveTrackFromQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><ObjectID>'+ ObjectID+'</ObjectID><UpdateID>'+ UpdateID+'</UpdateID></u:RemoveTrackFromQueue></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportRemoveTrackRangeFromQueue = function (callback, host, InstanceID, UpdateID, StartingIndex, NumberOfTracks)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#RemoveTrackRangeFromQueue'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RemoveTrackRangeFromQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><UpdateID>'+ UpdateID+'</UpdateID><StartingIndex>'+ StartingIndex+'</StartingIndex><NumberOfTracks>'+ NumberOfTracks+'</NumberOfTracks></u:RemoveTrackRangeFromQueue></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"NewUpdateID": xmlDoc.getElementsByTagName("NewUpdateID")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AVTransportRemoveAllTracksFromQueue = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#RemoveAllTracksFromQueue'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RemoveAllTracksFromQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:RemoveAllTracksFromQueue></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportSaveQueue = function (callback, host, InstanceID, Title, ObjectID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#SaveQueue'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SaveQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><Title>'+ Title+'</Title><ObjectID>'+ ObjectID+'</ObjectID></u:SaveQueue></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"AssignedObjectID": xmlDoc.getElementsByTagName("AssignedObjectID")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AVTransportBackupQueue = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#BackupQueue'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:BackupQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:BackupQueue></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportGetMediaInfo = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetMediaInfo'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetMediaInfo xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:GetMediaInfo></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"NrTracks": xmlDoc.getElementsByTagName("NrTracks")[0].textContent, "MediaDuration": xmlDoc.getElementsByTagName("MediaDuration")[0].textContent, "CurrentURI": xmlDoc.getElementsByTagName("CurrentURI")[0].textContent, "CurrentURIMetaData": xmlDoc.getElementsByTagName("CurrentURIMetaData")[0].textContent, "NextURI": xmlDoc.getElementsByTagName("NextURI")[0].textContent, "NextURIMetaData": xmlDoc.getElementsByTagName("NextURIMetaData")[0].textContent, "PlayMedium": xmlDoc.getElementsByTagName("PlayMedium")[0].textContent, "RecordMedium": xmlDoc.getElementsByTagName("RecordMedium")[0].textContent, "WriteStatus": xmlDoc.getElementsByTagName("WriteStatus")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AVTransportGetTransportInfo = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetTransportInfo'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetTransportInfo xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:GetTransportInfo></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CurrentTransportState": xmlDoc.getElementsByTagName("CurrentTransportState")[0].textContent, "CurrentTransportStatus": xmlDoc.getElementsByTagName("CurrentTransportStatus")[0].textContent, "CurrentSpeed": xmlDoc.getElementsByTagName("CurrentSpeed")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AVTransportGetPositionInfo = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetPositionInfo'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetPositionInfo xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:GetPositionInfo></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"Track": xmlDoc.getElementsByTagName("Track")[0].textContent, "TrackDuration": xmlDoc.getElementsByTagName("TrackDuration")[0].textContent, "TrackMetaData": xmlDoc.getElementsByTagName("TrackMetaData")[0].textContent, "TrackURI": xmlDoc.getElementsByTagName("TrackURI")[0].textContent, "RelTime": xmlDoc.getElementsByTagName("RelTime")[0].textContent, "AbsTime": xmlDoc.getElementsByTagName("AbsTime")[0].textContent, "RelCount": xmlDoc.getElementsByTagName("RelCount")[0].textContent, "AbsCount": xmlDoc.getElementsByTagName("AbsCount")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AVTransportGetDeviceCapabilities = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetDeviceCapabilities'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetDeviceCapabilities xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:GetDeviceCapabilities></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"PlayMedia": xmlDoc.getElementsByTagName("PlayMedia")[0].textContent, "RecMedia": xmlDoc.getElementsByTagName("RecMedia")[0].textContent, "RecQualityModes": xmlDoc.getElementsByTagName("RecQualityModes")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AVTransportGetTransportSettings = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetTransportSettings'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetTransportSettings xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:GetTransportSettings></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"PlayMode": xmlDoc.getElementsByTagName("PlayMode")[0].textContent, "RecQualityMode": xmlDoc.getElementsByTagName("RecQualityMode")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AVTransportGetCrossfadeMode = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetCrossfadeMode'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetCrossfadeMode xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:GetCrossfadeMode></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"CrossfadeMode": xmlDoc.getElementsByTagName("CrossfadeMode")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AVTransportStop = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#Stop'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Stop xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:Stop></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportPlay = function (callback, host, InstanceID, Speed)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#Play'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Play xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><Speed>'+ Speed+'</Speed></u:Play></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportPause = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#Pause'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Pause xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:Pause></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportSeek = function (callback, host, InstanceID, Unit, Target)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#Seek'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Seek xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><Unit>'+ Unit+'</Unit><Target>'+ Target+'</Target></u:Seek></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportNext = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#Next'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Next xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:Next></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportNextProgrammedRadioTracks = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#NextProgrammedRadioTracks'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:NextProgrammedRadioTracks xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:NextProgrammedRadioTracks></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportPrevious = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#Previous'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Previous xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:Previous></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportNextSection = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#NextSection'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:NextSection xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:NextSection></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportPreviousSection = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#PreviousSection'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:PreviousSection xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:PreviousSection></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportSetPlayMode = function (callback, host, InstanceID, NewPlayMode)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#SetPlayMode'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetPlayMode xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><NewPlayMode>'+ NewPlayMode+'</NewPlayMode></u:SetPlayMode></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportSetCrossfadeMode = function (callback, host, InstanceID, CrossfadeMode)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#SetCrossfadeMode'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetCrossfadeMode xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><CrossfadeMode>'+ CrossfadeMode+'</CrossfadeMode></u:SetCrossfadeMode></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportNotifyDeletedURI = function (callback, host, InstanceID, DeletedURI)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#NotifyDeletedURI'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:NotifyDeletedURI xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><DeletedURI>'+ DeletedURI+'</DeletedURI></u:NotifyDeletedURI></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportGetCurrentTransportActions = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetCurrentTransportActions'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetCurrentTransportActions xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:GetCurrentTransportActions></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"Actions": xmlDoc.getElementsByTagName("Actions")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AVTransportBecomeCoordinatorOfStandaloneGroup = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#BecomeCoordinatorOfStandaloneGroup'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:BecomeCoordinatorOfStandaloneGroup xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:BecomeCoordinatorOfStandaloneGroup></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportBecomeGroupCoordinator = function (callback, host, InstanceID, CurrentCoordinator, CurrentGroupID, OtherMembers, TransportSettings, CurrentURI, CurrentURIMetaData, SleepTimerState, AlarmState, StreamRestartState, CurrentQueueTrackList)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#BecomeGroupCoordinator'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:BecomeGroupCoordinator xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><CurrentCoordinator>'+ CurrentCoordinator+'</CurrentCoordinator><CurrentGroupID>'+ CurrentGroupID+'</CurrentGroupID><OtherMembers>'+ OtherMembers+'</OtherMembers><TransportSettings>'+ TransportSettings+'</TransportSettings><CurrentURI>'+ CurrentURI+'</CurrentURI><CurrentURIMetaData>'+ CurrentURIMetaData+'</CurrentURIMetaData><SleepTimerState>'+ SleepTimerState+'</SleepTimerState><AlarmState>'+ AlarmState+'</AlarmState><StreamRestartState>'+ StreamRestartState+'</StreamRestartState><CurrentQueueTrackList>'+ CurrentQueueTrackList+'</CurrentQueueTrackList></u:BecomeGroupCoordinator></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportBecomeGroupCoordinatorAndSource = function (callback, host, InstanceID, CurrentCoordinator, CurrentGroupID, OtherMembers, CurrentURI, CurrentURIMetaData, SleepTimerState, AlarmState, StreamRestartState, CurrentAVTTrackList, CurrentQueueTrackList, CurrentSourceState, ResumePlayback)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#BecomeGroupCoordinatorAndSource'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:BecomeGroupCoordinatorAndSource xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><CurrentCoordinator>'+ CurrentCoordinator+'</CurrentCoordinator><CurrentGroupID>'+ CurrentGroupID+'</CurrentGroupID><OtherMembers>'+ OtherMembers+'</OtherMembers><CurrentURI>'+ CurrentURI+'</CurrentURI><CurrentURIMetaData>'+ CurrentURIMetaData+'</CurrentURIMetaData><SleepTimerState>'+ SleepTimerState+'</SleepTimerState><AlarmState>'+ AlarmState+'</AlarmState><StreamRestartState>'+ StreamRestartState+'</StreamRestartState><CurrentAVTTrackList>'+ CurrentAVTTrackList+'</CurrentAVTTrackList><CurrentQueueTrackList>'+ CurrentQueueTrackList+'</CurrentQueueTrackList><CurrentSourceState>'+ CurrentSourceState+'</CurrentSourceState><ResumePlayback>'+ ResumePlayback+'</ResumePlayback></u:BecomeGroupCoordinatorAndSource></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportChangeCoordinator = function (callback, host, InstanceID, CurrentCoordinator, NewCoordinator, NewTransportSettings)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#ChangeCoordinator'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ChangeCoordinator xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><CurrentCoordinator>'+ CurrentCoordinator+'</CurrentCoordinator><NewCoordinator>'+ NewCoordinator+'</NewCoordinator><NewTransportSettings>'+ NewTransportSettings+'</NewTransportSettings></u:ChangeCoordinator></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportChangeTransportSettings = function (callback, host, InstanceID, NewTransportSettings, CurrentAVTransportURI)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#ChangeTransportSettings'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ChangeTransportSettings xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><NewTransportSettings>'+ NewTransportSettings+'</NewTransportSettings><CurrentAVTransportURI>'+ CurrentAVTransportURI+'</CurrentAVTransportURI></u:ChangeTransportSettings></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportConfigureSleepTimer = function (callback, host, InstanceID, NewSleepTimerDuration)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#ConfigureSleepTimer'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ConfigureSleepTimer xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><NewSleepTimerDuration>'+ NewSleepTimerDuration+'</NewSleepTimerDuration></u:ConfigureSleepTimer></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportGetRemainingSleepTimerDuration = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetRemainingSleepTimerDuration'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetRemainingSleepTimerDuration xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:GetRemainingSleepTimerDuration></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"RemainingSleepTimerDuration": xmlDoc.getElementsByTagName("RemainingSleepTimerDuration")[0].textContent, "CurrentSleepTimerGeneration": xmlDoc.getElementsByTagName("CurrentSleepTimerGeneration")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AVTransportRunAlarm = function (callback, host, InstanceID, AlarmID, LoggedStartTime, Duration, ProgramURI, ProgramMetaData, PlayMode, Volume, IncludeLinkedZones)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#RunAlarm'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RunAlarm xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><AlarmID>'+ AlarmID+'</AlarmID><LoggedStartTime>'+ LoggedStartTime+'</LoggedStartTime><Duration>'+ Duration+'</Duration><ProgramURI>'+ ProgramURI+'</ProgramURI><ProgramMetaData>'+ ProgramMetaData+'</ProgramMetaData><PlayMode>'+ PlayMode+'</PlayMode><Volume>'+ Volume+'</Volume><IncludeLinkedZones>'+ IncludeLinkedZones+'</IncludeLinkedZones></u:RunAlarm></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportStartAutoplay = function (callback, host, InstanceID, ProgramURI, ProgramMetaData, Volume, IncludeLinkedZones, ResetVolumeAfter)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#StartAutoplay'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:StartAutoplay xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><ProgramURI>'+ ProgramURI+'</ProgramURI><ProgramMetaData>'+ ProgramMetaData+'</ProgramMetaData><Volume>'+ Volume+'</Volume><IncludeLinkedZones>'+ IncludeLinkedZones+'</IncludeLinkedZones><ResetVolumeAfter>'+ ResetVolumeAfter+'</ResetVolumeAfter></u:StartAutoplay></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 
	self.AVTransportGetRunningAlarmProperties = function (callback, host, InstanceID)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetRunningAlarmProperties'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetRunningAlarmProperties xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID></u:GetRunningAlarmProperties></s:Body></s:Envelope>';
		var url = host + url;
		CF.request( url, 'POST', {'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback(  {"AlarmID": xmlDoc.getElementsByTagName("AlarmID")[0].textContent, "GroupID": xmlDoc.getElementsByTagName("GroupID")[0].textContent, "LoggedStartTime": xmlDoc.getElementsByTagName("LoggedStartTime")[0].textContent} )
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}
	 
	 
	self.AVTransportSnoozeAlarm = function (callback, host, InstanceID, Duration)  {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#SnoozeAlarm'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SnoozeAlarm xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>'+ InstanceID+'</InstanceID><Duration>'+ Duration+'</Duration></u:SnoozeAlarm></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}
	 
	 



	
	
	// ----------------------------------------------------------------------------
	// CF watches - used to monitor for events such as CF.send responses etc
	// ----------------------------------------------------------------------------

	// initialises the sonos object when the form has built
	CF.watch(CF.PreloadingCompleteEvent, self.initialise);
  	// listens for sonos sent Notify message
	CF.watch(CF.FeedbackMatchedEvent, "Bathroom", "Notify Event Feedback Bathroom", self.onProcessNotifyEvent);
	CF.watch(CF.FeedbackMatchedEvent, "Lauren Room", "Notify Event Feedback Lauren Room", self.onProcessNotifyEvent);
	CF.watch(CF.FeedbackMatchedEvent, "Dining Room", "Notify Event Feedback Dining Room", self.onProcessNotifyEvent);
	CF.watch(CF.FeedbackMatchedEvent, "TV Room", "Notify Event Feedback TV Room", self.onProcessNotifyEvent);
	CF.watch(CF.FeedbackMatchedEvent, "Master Bed", "Notify Event Feedback Master Bed", self.onProcessNotifyEvent);
	CF.watch(CF.FeedbackMatchedEvent, "Kitchen", "Notify Event Feedback Kitchen", self.onProcessNotifyEvent);
	CF.watch(CF.FeedbackMatchedEvent, "Office", "Notify Event Feedback Office", self.onProcessNotifyEvent);
	CF.watch(CF.FeedbackMatchedEvent, "Record Player", "Notify Event Feedback Record Player", self.onProcessNotifyEvent);

	// listens for the response after we have subscribed to a notfy service
	CF.watch(CF.FeedbackMatchedEvent, "Subscribe To Notify", "Subscription Feedback", self.onProcessSubscribeResponse);
	// TODO
	CF.watch(CF.ConnectionStatusChangeEvent, "Subscribe To Notify", self.onSubscribeConnectionChange, false);
	CF.watch(CF.ConnectionStatusChangeEvent, "Notify Listener", self.onNotifyListenerConnectionChange, false);
	// listens for SSDP responses from sonos compoents and processes them
	CF.watch(CF.FeedbackMatchedEvent, "SSDP Discovery", "SSDP Discovery Feedback", self.onProcessSSDPDiscovery);

	// ----------------------------------------------------------------------------
	// All Sonos Commands
	// ----------------------------------------------------------------------------


	
	return self;
};


CF.userMain = function() {
	CF.log("Started sonos routines");
	pioneerAmps = new PioneerAmp();
	
	grimmers = new Grimwood();
	grimmers.init();
	// grimmers.setRoom("Kitchen");
	sonosTopology = new SonosTopology();
	sonosTopology.receiveSonosTransportChange = function (sonosDevice) {
		if (sonosDevice.modelName == "Sonos CONNECT") {
			CF.log("Transport\n*******************\n" + sonosDevice.roomName + " - " + sonosDevice.modelName + "\n*********");
			if (sonosDevice.transportState == "PLAYING") {
				//pioneerAmps.sendAmpCommand(sonosDevice.roomName, "PowerOn","");
			}
			if (sonosDevice.transportState == "PAUSED_PLAYBACK" || sonosDevice.transportState == "STOPPED") {
				// pioneerAmps.sendAmpCommand(sonosDevice.roomName, "PowerOff","");
			}
		}
	}
	sonosTopology.receiveSonosRoomChange = function (sonosDevice) {
		CF.log("Changing Sonos Zone to " + sonosDevice.roomName);
		// grimmers.setRoom(sonosDevice.roomName);
	}
	sonosTopology.receiveSonosVolumeChange = function (sonosDevice) {
		CF.log("Volume\n*******************\n" + sonosDevice.roomName + " - " + sonosDevice.modelName +  "\n*********");
	}
	
	
};