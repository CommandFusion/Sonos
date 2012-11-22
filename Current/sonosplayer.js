/* Sonos Viewer for CommandFusion
 ===============================================================================

 AUTHOR:	Simon Post
 CONTACT:	simon.post@mac.com
 VERSION:	v0.0.1

 =========================================================================
 HELP:

 This script instantiates a Sonos player, all its variables and any commands
 it needs to run.

 =========================================================================
 */

// ======================================================================
// Global Object
// ======================================================================

var SonosPlayer = function () {

	// static variables used by the player

	var self = {
		services                     :[
			/*{ "Service": "/ZoneGroupTopology/Event", "Description": "Zone Group" }, // The service notifications we want to subscribe to
			 { "Service": "/MediaRenderer/AVTransport/Event", "Description": "Transport Event" },
			 //{ "Service": "/MediaServer/ContentDirectory/Event", "Description": "Content Directory" },
			 { "Service": "/MediaRenderer/RenderingControl/Event", "Description": "Render Control" }*/
			{ "Service":"/AlarmClock/Event", "Description":"Alarm Clock" },
			{ "Service":"/MusicServices/Event", "Description":"Music Services" },
			{ "Service":"/AudioIn/Event", "Description":"Audio In" },
			{ "Service":"/DeviceProperties/Event", "Description":"Device Properties" },
			{ "Service":"/SystemProperties/Event", "Description":"System Properties" },
			{ "Service":"/ZoneGroupTopology/Event", "Description":"Zone Group" },
			{ "Service":"/GroupManagement/Event", "Description":"Group Management" },
			{ "Service":"/MediaServer/ContentDirectory/Event", "Description":"Content Directory" },
			{ "Service":"/MediaRenderer/RenderingControl/Event", "Description":"Render Control" },
			{ "Service":"/MediaRenderer/ConnectionManager/Event", "Description":"Connection Manager" },
			{ "Service":"/MediaRenderer/AVTransport/Event", "Description":"Transport Event" }
		],
		port                         :":1400", // default port to talk to Sonos on
		systemNameSubscription       :"SSDP Subscription",
		feedbackNameSubscription     :"SSDP Subscription Feedback",
		systemNameNotification       :"SSDP Notification",
		feedbackNameNotification     :"SSDP Notification Feedback",
		notifyMsgQueue               :[], // Used to hold any notification messages received prior to processing them
		parseUnderway                :false, // Set to true when we are processing a notify message so that we cant process another one until complete
		currentNotifyMessage         :"", // holds the current notification message being processed
		GUINotificationEventCallback :null,
		zoneQueueReturnedCallback    :null,
		roomName                     :"",
		zoneType                     :"",
		RINCON                       :"",
		IP                           :"",
		host                         :"",
		displayName                  :"",
		sonosIconPath                :"",
		modelName                    :"",
		notificationSystemNumber     :0,
		zoneGroupNotificationCallback:sonosGUI.processNotificationEvent, // used to point to the CF system that is handling notification messages for this player
		queueNumberReturned          :0,
		queueRowsToReturn            :50,
		currentTrackAlbumArtAddr     :"",
		currentTrackName             :"",
		currentTrackAlbum            :"",
		currentTrackArtist           :"",
		priorTransportState          :"",
		transportState               :"",
		crossFadeMode                :"",
		nextTrackName                :"",
		nextTrackAlbum               :"",
		nextTrackArtist              :"",
		repeat                       :0,
		shuffle                      :0,
		zoneGroupMusicNowPLaying     :0
	}

	self.init = function (sonosPlayer, systemNumber) {
		CF.log("SonosPlayer: Init called with systemNumber of: " + self.notificationSystemNumber);
		// setup the player information
		self.roomName = sonosPlayer.roomName;
		self.zoneType = sonosPlayer.zoneType;
		self.RINCON = sonosPlayer.RINCON;
		self.IP = sonosPlayer.IP;
		self.host = 'http://' + self.IP + self.port;
		self.displayName = sonosPlayer.displayName;
		self.sonosIconPath = sonosPlayer.sonosIconPath;
		self.modelName = sonosPlayer.modelName;
		self.notificationSystemNumber = systemNumber;
		// Listens for the response after we have subscribed to a notify service
		CF.watch(CF.FeedbackMatchedEvent, self.systemNameSubscription, self.feedbackNameSubscription, self.parseFeedbackSubscription);
		// Listens for any notification messages
		CF.watch(CF.FeedbackMatchedEvent, self.systemNameNotification + self.notificationSystemNumber, self.feedbackNameNotification + self.notificationSystemNumber, self.onProcessNotifyEvent);
		// Set the call back for when a zone group notification is received.  This message is unusual because we want to process
		// it at the GUI level rather than at the individual player level
		self.GUINotificationEventCallback = sonosGUI.processNotificationEvent;
		self.zoneQueueReturnedCallback = sonosGUI.zoneQueueReturnedCallback;
		self.subscribeEvents();
	};


	// This function cycles through the services listed above and subscribes to them so that Sonos will send an
	// event notification to the player object when something in the service changes, e.g. track change for a
	// transport event

	self.subscribeEvents = function () {

		for (var service in self.services) {
			//CF.log("Subscribing to services for room: " + self.roomName);
			self.subscribeEvent(self.IP, self.services[service].Service, self.services[service].Description);
		}
		//CF.setSystemProperties(self.systemNameSubscription, {address: sonosDevice.IP});

		/*for(var service in self.services) {
		 self.subscribeEvent(sonosDevice.IP, self.services[service].Service, self.services[service].Description);
		 }*/
	};

	self.subscribeEvent = function (ipaddr, path, subURL) {

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
			"Cache-Control":"no-cache",
			"Pragma"       :"no-cache",
			"USER-AGENT"   :"Linux UPnP/1.0 Sonos/16.7-48310 (PCDCR)",
			"CALLBACK"     :"<http://" + CF.ipv4address + ":" + CF.systems[self.systemNameNotification + self.notificationSystemNumber].port + "/" + subURL + ">",
			"NT"           :"upnp:event",
			"TIMEOUT"      :"Second-1800"
		};
		//CF.log("Subscribing to service " + path + " for room: " + self.roomName);
		CF.request("http://" + ipaddr + ":1400" + path, "SUBSCRIBE", headers, function (status, headers, body) {
			//CF.log(status + ", " + headers + ", " + body);
		});

	};


	self.parseFeedbackSubscription = function (regex, data) {
		CF.log("SonosDiscovery Subscription Returned:\n" + data);
	};

	self.onProcessNotifyEvent = function (theSystem, feedback) {
		//CF.log("got notify feedback of:\n" + feedback);
		self.notifyMsgQueue.push(feedback);
		self.parseNotifyEvent();
	};

	self.parseNotifyEvent = function () {
		if (self.notifyMsgQueue.length != 0 && !self.parseUnderway) {
			self.parseUnderway = true;
			self.currentNotifyMessage = self.notifyMsgQueue.shift();
			var description = self.currentNotifyMessage.substring(self.currentNotifyMessage.indexOf("NOTIFY /") + 8, self.currentNotifyMessage.indexOf("HTTP") - 1);
			CF.log("parsing notify event for player - " + self.roomName + " of type:" + description);
			switch (description) {
				case "Alarm Clock":            //self.parseAlarmClock(response);
					CF.log("Got a alarm clock event");
					break;
				case "Music Services":        //self.parseMusicServices(response);
					CF.log("Got a music service event");
					break;
				case "Audio In":            //self.parseAudioIn(response);
					CF.log("Got a audio in event");
					break;
				case "Device Properties":    //self.parseDeviceProperties(response);
					CF.log("Got a device properties event");
					break;
				case "System Properties":    //self.parseSystemProperties(response);
					CF.log("Got a system properties event");
					break;
				case "Zone Group":
					CF.log("Got a zone group event");
					//self.currentNotifyMessage = '<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneGroupState>&lt;ZoneGroups&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A1C401400&quot; ID=&quot;RINCON_000E5828A1C401400:79&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A1C401400&quot; Location=&quot;http://192.168.1.90:1400/xml/device_description.xml&quot; ZoneName=&quot;Record Player&quot; Icon=&quot;x-rincon-roomicon:den&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;55&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5855842601400&quot; ID=&quot;RINCON_000E5855842601400:23&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5855842601400&quot; Location=&quot;http://192.168.1.75:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;13&quot;/&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58980FE001400&quot; Location=&quot;http://192.168.1.62:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; Invisible=&quot;1&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;15&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E585445BA01400&quot; ID=&quot;RINCON_000E585445BA01400:10&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E585445BA01400&quot; Location=&quot;http://192.168.1.65:1400/xml/device_description.xml&quot; ZoneName=&quot;Lauren Room&quot; Icon=&quot;x-rincon-roomicon:living&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;17&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828228801400&quot; ID=&quot;RINCON_000E5828228801400:216&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828228801400&quot; Location=&quot;http://192.168.1.67:1400/xml/device_description.xml&quot; ZoneName=&quot;Kitchen&quot; Icon=&quot;x-rincon-roomicon:kitchen&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;101&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A20201400&quot; ID=&quot;RINCON_000E58283BD401400:187&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A20201400&quot; Location=&quot;http://192.168.1.74:1400/xml/device_description.xml&quot; ZoneName=&quot;Master Bed&quot; Icon=&quot;x-rincon-roomicon:masterbedroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;101&quot;/&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283BD401400&quot; Location=&quot;http://192.168.1.77:1400/xml/device_description.xml&quot; ZoneName=&quot;Bathroom&quot; Icon=&quot;x-rincon-roomicon:bathroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;114&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58289F2E01400&quot; ID=&quot;RINCON_000E58289F2E01400:111&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58289F2E01400&quot; Location=&quot;http://192.168.1.76:1400/xml/device_description.xml&quot; ZoneName=&quot;Dining Room&quot; Icon=&quot;x-rincon-roomicon:dining&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;103&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283AC801400&quot; ID=&quot;RINCON_000E58283AC801400:112&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283AC801400&quot; Location=&quot;http://192.168.1.73:1400/xml/device_description.xml&quot; ZoneName=&quot;TV Room&quot; Icon=&quot;x-rincon-roomicon:tvroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;105&quot;/&gt;&lt;/ZoneGroup&gt;&lt;/ZoneGroups&gt;</ZoneGroupState></e:property></e:propertyset>';
					//self.currentNotifyMessage = Utils.unescape(self.currentNotifyMessage);
					self.currentNotifyMessage = Utils.unescape(self.currentNotifyMessage);
					if (self.zoneGroupNotificationCallback !== null) {
						self.zoneGroupNotificationCallback("ZoneGroupEvent", self.currentNotifyMessage);  // process this message in the GUI layer
					}
					break;
				case "Group Management":    //self.parseGroupManagement(response);
					CF.log("Got a group management event");
					break;
				case "Content Directory":
					CF.log("Got a content directory notify event");
					break;
				case "Render Control":
					CF.log("got a render control event");
					//self.parseRenderControl();
					break;
				case "Connection Manager":    //self.parseConnectionManager(response);
					break;
				case "Transport Event":
					CF.log("got a transport control event");
					self.parseTransportEvent();  // see transport event area
					break;
				default:
					CF.log("Invalid Response Type");
			}
			// Clear the flag saying we have finished processing the notification message
			self.parseUnderway = false;
			// Recall the notification routine to see if there are any more messages to deal with
			self.parseNotifyEvent();
		}

	};

	/*
	 ===============================================================================


	 =========================================================================
	 NOTES:

	 Parses a transport event and then calls the GUI update.  A transport event occurs when the song changes etc

	 =========================================================================
	 */

	self.parseTransportEvent = function () {
		var response = Utils.unescapeLight(self.currentNotifyMessage.substr(self.currentNotifyMessage.indexOf("<e:propertyset")));
		//CF.log("Received a transport event from Sonos of:" + response);
		response = Utils.unescape(response);
		response = Utils.unescape(response);

		var i = 0, j = 0, k = 0, l = 0;
		var trackNo = "";
		var artist = "";
		var nextArtist = "";
		var title = "";
		var nextTitle = "";
		var album = "";
		var nextAlbum = "";
		var art = "";
		var nextArt = "";
		var transportState = "";
		var currentPlayMode = "";
		var currentCrossFadeMode = 0;

		// Get current track info
		var currentTrackURI = self.extractTag(response, '<CurrentTrackURI', '/>');
		var enqueuedMetaData = self.extractTag(response, "EnqueuedTransportURIMetaData", "</DIDL-Lite>");
		var currentClass = self.extractTag(enqueuedMetaData, '<upnp:class>', '</upnp:class>');
		var currentTrack = self.extractTag(response, "<CurrentTrackMetaData", "<r:NextTrackURI");
		transportState = self.extractTag(response, 'TransportState val="', '"/>');
		currentPlayMode = self.extractTag(response, 'CurrentPlayMode val="', '"/>');
		currentCrossFadeMode = parseInt(self.extractTag(response, 'CurrentCrossfadeMode val="', '"/>'));
		//CF.log("transport state is: " + transportState);
		if (currentClass != "object.item.audioItem.audioBroadcast") {  //  indicates radio type

			artist = self.extractTag(currentTrack, "<dc:creator>", "</dc:creator>");
			if (artist == "") {
				artist = "None";
				title = "None";
				art = "";
				album = "None"
			}
			else {
				title = self.extractTag(currentTrack, "<dc:title>", "</dc:title>");
				art = self.host + self.extractTag(currentTrack, "<upnp:albumArtURI>", "</upnp:albumArtURI>");
				album = self.extractTag(currentTrack, "<upnp:album>", "</upnp:album>");
			}
			var nextTrack = self.extractTag(response, "<r:NextTrackMetaData", "<r:EnqueuedTransportURI");
			nextArtist = self.extractTag(nextTrack, "<dc:creator>", "</dc:creator>");
			if (nextArtist == "") {
				nextTitle = "None";
				nextAlbum = "None"
			}
			else {
				nextTitle = self.extractTag(nextTrack, "<dc:title>", "</dc:title>");
				nextAlbum = self.extractTag(nextTrack, "<upnp:album>", "</upnp:album>")
			}
		}
		else {
			title = self.extractTag(response, 'restricted="true"><dc:title>', "</dc:title>");
			//CF.log("Title is :" + title);
			artist = self.extractTag(currentTrack, "<r:radioShowMd>", ",");
			album = self.extractTag(currentTrack, "<r:streamContent>", "</r:streamContent>");
			art = self.host + self.extractTag(currentTrack, "<upnp:albumArtURI>", "</upnp:albumArtURI>");

		}
		self.currentTrackAlbumArtAddr = art;
		self.currentTrackName = title;
		self.currentTrackAlbum = album;
		self.currentTrackArtist = artist;
		self.priorTransportState = transportState;
		self.transportState = transportState;
		self.crossFadeMode = currentCrossFadeMode;
		self.nextTrackName = nextTitle;
		self.nextTrackAlbum = nextAlbum;
		// NORMAL REPEAT_ALL SHUFFLE_NOREPEAT SHUFFLE NORMAL
		switch (currentPlayMode) {
			case "REPEAT_ALL":
				self.repeat = 1;
				self.shuffle = 0;
				break;
			case "SHUFFLE_NOREPEAT":
				self.repeat = 0;
				self.shuffle = 1;
				break;
			case "SHUFFLE":
				self.repeat = 1;
				self.shuffle = 1;
				break;
			case "NORMAL":
				self.repeat = 0;
				self.shuffle = 0;
				break;
		}
		// Do the call back to the GUI so we can update the UI.  The reasons we call
		if (self.zoneGroupNotificationCallback !== null) {
			if (self.transportState === self.priorTransportState) {
				self.zoneGroupNotificationCallback("TransportEvent", self.RINCON);  // process this message in the GUI layer
			}
			else {
				self.zoneGroupNotificationCallback("PlayerTransportStateChange", self.RINCON);  // process this message in the GUI layer
			}
		}
		// Get next track info
		//CF.log("Prior transport state is: " + self.discoveredDevicesDetails[self.notifyingZone].priorTransportState);
		/*if (self.discoveredDevicesDetails[self.notifyingZone].priorTransportState != self.discoveredDevicesDetails[self.notifyingZone].transportState) {
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
		 };*/


	};


	/*
	 ===============================================================================


	 =========================================================================
	 NOTES:

	 The following calls handle changing the players zoen membership

	 =========================================================================
	 */

	self.addZoneToGroup = function (zoneCoordinator) {
		CF.log("zoneCoordinator is: " + zoneCoordinator);
		self.AVTransportSetAVTransportURI("", self.host, 0, "x-rincon:" + zoneCoordinator, "")
	}

	self.removeZoneFromGroup = function () {
		self.AVTransportBecomeCoordinatorOfStandaloneGroup("", self.host, 0)
	};

	/*
	 ===============================================================================


	 =========================================================================
	 NOTES:

	 The following calls handle getting and handling of the players queue

	 =========================================================================
	 */

	self.getQueueForCurrentZone = function () {
		CF.log("Host is: " + self.host)
		self.ContentDirectoryBrowse(self.processGetQueueForCurrentZone, self.host, "Q:0", "BrowseDirectChildren", "dc:title,res,dc:creator,upnp:artist,upnp:album,upnp:albumArtURI", self.queueNumberReturned, self.queueRowsToReturn, "")

	};
	self.resetQueueNumberReturned = function () {
		self.queueNumberReturned = 0;
	}

	//<DIDL-Lite xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:upnp="urn:schemas-upnp-org:metadata-1-0/upnp/" xmlns:r="urn:schemas-rinconnetworks-com:metadata-1-0/" xmlns="urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/"><item id="Q:0/1" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:08">x-sonos-spotify:spotify%3atrack%3a4OXzeSAf0HMA2eWZkm5lIu?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a4OXzeSAf0HMA2eWZkm5lIu%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Who Needs Love (Like That)</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/2" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:21">x-sonos-spotify:spotify%3atrack%3a1L5e14EUQwWLJxpvCq2qiP?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a1L5e14EUQwWLJxpvCq2qiP%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Heavenly Action</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/3" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:08">x-sonos-spotify:spotify%3atrack%3a5NEWfI5edqaEqwG8uiyMdU?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a5NEWfI5edqaEqwG8uiyMdU%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Oh L&apos;Amour</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/4" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:40">x-sonos-spotify:spotify%3atrack%3a5deeOokTNRlC6jpca4lJOU?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a5deeOokTNRlC6jpca4lJOU%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Sometimes</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/5" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:47">x-sonos-spotify:spotify%3atrack%3a335D4JgaPjSprSsrcnhuMV?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a335D4JgaPjSprSsrcnhuMV%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>It Doesn&apos;t Have to Be</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/6" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:39">x-sonos-spotify:spotify%3atrack%3a6fKkXpS7reflhBTg7lWIJJ?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a6fKkXpS7reflhBTg7lWIJJ%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Victim Of Love</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/7" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:04:07">x-sonos-spotify:spotify%3atrack%3a1KP0TnK3JbijjQ0HCVXcFa?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a1KP0TnK3JbijjQ0HCVXcFa%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>The Circus</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/8" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:04:04">x-sonos-spotify:spotify%3atrack%3a51oSXA7VrMa3Y99g8ndACE?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a51oSXA7VrMa3Y99g8ndACE%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Ship Of Fools</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/9" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:44">x-sonos-spotify:spotify%3atrack%3a034rX32E6hTm4aJUAIZWZ0?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a034rX32E6hTm4aJUAIZWZ0%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Chains Of Love</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/10" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:32">x-sonos-spotify:spotify%3atrack%3a2Nd4yd1Rd6OnAe5Jun23dX?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a2Nd4yd1Rd6OnAe5Jun23dX%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>A Little Respect</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/11" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:02:55">x-sonos-spotify:spotify%3atrack%3a2Mcfm7O3n8HebvW5PsD14j?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a2Mcfm7O3n8HebvW5PsD14j%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Stop!</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/12" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:04:06">x-sonos-spotify:spotify%3atrack%3a3ZSx82s8h4sDdJ0bdeOzJf?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a3ZSx82s8h4sDdJ0bdeOzJf%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Drama!</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/13" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:59">x-sonos-spotify:spotify%3atrack%3a3a1UwFICooVrv1pc21Hzcd?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a3a1UwFICooVrv1pc21Hzcd%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>You Surround Me</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/14" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:04:20">x-sonos-spotify:spotify%3atrack%3a56wmmJoYu05sS26pI6KMFv?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a56wmmJoYu05sS26pI6KMFv%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Blue Savannah</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/15" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:39">x-sonos-spotify:spotify%3atrack%3a0HaHFdtGKubnXE8cwZI3aQ?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a0HaHFdtGKubnXE8cwZI3aQ%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Star</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/16" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:04:30">x-sonos-spotify:spotify%3atrack%3a1uWe3xPFGnUBIUzM3JBqFO?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a1uWe3xPFGnUBIUzM3JBqFO%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Chorus</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/17" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:57">x-sonos-spotify:spotify%3atrack%3a1cFCKtC942n5wys91JjNNs?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a1cFCKtC942n5wys91JjNNs%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Love To Hate You</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/18" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:04:18">x-sonos-spotify:spotify%3atrack%3a1Cxsirn2ktwKukwe9dALOT?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a1Cxsirn2ktwKukwe9dALOT%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Am I Right?</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/19" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:56">x-sonos-spotify:spotify%3atrack%3a1wlUeXx7UXMYxMLEkFiRgw?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a1wlUeXx7UXMYxMLEkFiRgw%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Breath Of Life</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/20" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:46">x-sonos-spotify:spotify%3atrack%3a6jUwtzWwl0yYDxJ62Oa4U7?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a6jUwtzWwl0yYDxJ62Oa4U7%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Take A Chance On Me</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/21" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:02">x-sonos-spotify:spotify%3atrack%3a1o84mlZz4sO3mj2ou7cJYG?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a1o84mlZz4sO3mj2ou7cJYG%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Who Needs Love (Like That) (Hamburg Mix)</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/22" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:04:03">x-sonos-spotify:spotify%3atrack%3a7eKmqH5QNAYS6CWFhec1tz?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a7eKmqH5QNAYS6CWFhec1tz%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Always</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/23" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:04:12">x-sonos-spotify:spotify%3atrack%3a5FMv5knXPc2uV8pTVTc8n1?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a5FMv5knXPc2uV8pTVTc8n1%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Run To The Sun</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/24" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:04:01">x-sonos-spotify:spotify%3atrack%3a6E9qZ2n1PegvgWlIGfhc7t?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a6E9qZ2n1PegvgWlIGfhc7t%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>I Love Saturday</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/25" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:04:43">x-sonos-spotify:spotify%3atrack%3a4K40MaTk3l0GCp6EFXpYEg?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a4K40MaTk3l0GCp6EFXpYEg%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Stay With Me</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/26" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:04:24">x-sonos-spotify:spotify%3atrack%3a26mZMd3GbV9VRMCKLxkzDA?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a26mZMd3GbV9VRMCKLxkzDA%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Fingers And Thumbs (Cold Summer&apos;s Day)</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/27" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:04:08">x-sonos-spotify:spotify%3atrack%3a5Hj3rbWkDuZoaopJnDdZaR?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a5Hj3rbWkDuZoaopJnDdZaR%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Rock Me Gently</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/28" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:28">x-sonos-spotify:spotify%3atrack%3a36i1KyGQCEuuXM4OH7rvot?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a36i1KyGQCEuuXM4OH7rvot%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>In My Arms</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/29" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:48">x-sonos-spotify:spotify%3atrack%3a6vdvPwIvmp6aYLz8FKwBne?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a6vdvPwIvmp6aYLz8FKwBne%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Don&apos;t Say Your Love Is Killing Me</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/30" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:04:09">x-sonos-spotify:spotify%3atrack%3a0LHEt7VMbc9lcjDvryg2fg?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a0LHEt7VMbc9lcjDvryg2fg%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Rain (Al Stone Mix)</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/31" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:02:55">x-sonos-spotify:spotify%3atrack%3a2xVdIYS5dUOD9eIYY1yR4v?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a2xVdIYS5dUOD9eIYY1yR4v%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Freedom</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/32" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:04:16">x-sonos-spotify:spotify%3atrack%3a4oSI6RG55KsY6axf9XrH2w?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a4oSI6RG55KsY6axf9XrH2w%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Moon And The Sky (JC&apos;s Heaven Scent Radio Re-Work)</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/33" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:04:19">x-sonos-spotify:spotify%3atrack%3a4uKCzLFNVTv5lTpWAFMPGE?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a4uKCzLFNVTv5lTpWAFMPGE%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Solsbury Hill</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/34" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:29">x-sonos-spotify:spotify%3atrack%3a4yAyPgRYdEi6v3EJakPKby?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a4yAyPgRYdEi6v3EJakPKby%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Make Me Smile (Come Up And See Me)</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/35" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:49">x-sonos-spotify:spotify%3atrack%3a5LVAio7ffVFGUNI4nARJlN?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a5LVAio7ffVFGUNI4nARJlN%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Breathe</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/36" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:45">x-sonos-spotify:spotify%3atrack%3a4yZYpqmIFunkvGdl1m60dp?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a4yZYpqmIFunkvGdl1m60dp%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Don&apos;t Say You Love Me</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/37" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:30">x-sonos-spotify:spotify%3atrack%3a5jEzze2Fz6j5stL9biRcVv?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a5jEzze2Fz6j5stL9biRcVv%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Here I Go Impossible Again</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/38" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:04:03">x-sonos-spotify:spotify%3atrack%3a50hPBeoT2CwGoXifpUJW71?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a50hPBeoT2CwGoXifpUJW71%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>I Could Fall In Love With You</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/39" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:15">x-sonos-spotify:spotify%3atrack%3a5uKMPEXirAqJr5156MkPCm?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a5uKMPEXirAqJr5156MkPCm%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Sunday Girl</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/40" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:28">x-sonos-spotify:spotify%3atrack%3a2kblGuSqxOGnFEO7M3u4TB?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a2kblGuSqxOGnFEO7M3u4TB%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Storm In A Teacup</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/41" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:59">x-sonos-spotify:spotify%3atrack%3a4C2bzVg1ynViFwNwKgsWwQ?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a4C2bzVg1ynViFwNwKgsWwQ%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Always (2009 Mix)</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/42" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:09">x-sonos-spotify:spotify%3atrack%3a51ffVlymm6lqbMFYa0cXAe?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a51ffVlymm6lqbMFYa0cXAe%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Oh L&apos;Amour (August Mix)</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/43" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:50">x-sonos-spotify:spotify%3atrack%3a3vF1894QaxBe1Vh30Lv8ky?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a3vF1894QaxBe1Vh30Lv8ky%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>Boy (Acoustic Union Street)</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item><item id="Q:0/44" parentID="Q:0" restricted="true"><res protocolInfo="sonos.com-spotify:*:audio/x-spotify:*" duration="0:03:31">x-sonos-spotify:spotify%3atrack%3a0sfLvLEFnQj9CszRpsDtO8?sid=9&amp;flags=0</res><upnp:albumArtURI>/getaa?s=1&amp;u=x-sonos-spotify%3aspotify%253atrack%253a0sfLvLEFnQj9CszRpsDtO8%3fsid%3d9%26flags%3d0</upnp:albumArtURI><dc:title>All This Time Still Falling Out Of Love (Original Mix)</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Erasure</dc:creator><upnp:album>Total Pop! - The First 40 Hits</upnp:album></item></DIDL-Lite>

	self.processGetQueueForCurrentZone = function (response) {
		//CF.listRemove("l48")
		var body = response.Result;
		var joinData = [];
		var i = 0, j = 0, k = 0, l = 0;
		var trackNo = "";
		var artist = "";
		var title = "";
		var unc = "";
		var res = "";
		var art = "";
		//CF.log("body is: " + body);
		//CF.log("Number of results returned is: " + response.NumberReturned);
		//CF.log("Total matches is: " + response.TotalMatches)
		//CF.log("Total result returned is: " + self.queueNumberReturned)
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(body, 'text/xml');
		var queueItems = xmlDoc.getElementsByTagName("item");
		for (var i = 0; i < queueItems.length; i++) { // loop around for the number of grouped zones
			trackNo = queueItems[i].attributes["id"].value
			trackNo = trackNo.substr(trackNo.indexOf("/") + 1);
			art = self.host + Utils.unescape(queueItems[i].childNodes[1].childNodes[0].nodeValue);
			title = queueItems[i].childNodes[2].childNodes[0].nodeValue;
			artist = queueItems[i].childNodes[4].childNodes[0].nodeValue;
			//CF.log("Artist is: " + artist + " title is: " + title + " art is:" + art + " track no is: " + trackNo);
			joinData.push({s35:title, s37:artist, s39:art, s49:trackNo});
		}
		//CF.listAdd("l48", joinData);
		self.queueNumberReturned = self.queueNumberReturned + parseInt(response.NumberReturned);
		if (self.zoneQueueReturnedCallback !== null) {
			self.zoneQueueReturnedCallback(joinData);  // process the queue
		}

	};

	self.transportEventSeekTrackNumber = function (trackNumber) {
		self.AVTransportSeek("", self.host, 0, "TRACK_NR", trackNumber)
		self.AVTransportPlay("", self.host, 0, 1)

	}

	// Function to remove a particular track number in the zones queuePlayTrack

	self.transportEventRemoveTrackNumber = function (trackNumber) {
		self.queueNumberReturned = 0;
		self.AVTransportRemoveTrackFromQueue(self.getQueueForCurrentZone, self.host, 0, "Q:0/" + trackNumber, 0)

	}

	self.resetPlayerToOwnQueue = function (zoneCoordinator) {
		self.AVTransportSetAVTransportURI("", self.Host, 0, "x-rincon-queue:" + zoneCoordinator + "#0", "");
	}


	/*
	 ===============================================================================


	 =========================================================================
	 NOTES:

	 Sends SOAP calls

	 =========================================================================
	 */
	self.sendSoapRequest = function (url, host, xml, soapAction, callback) {
		url = host + url;
		CF.log("url is: " + url + " and SOAP Action is: " + soapAction);
		var response = CF.request(url, "POST", {"SOAPAction":soapAction}, xml, function (status, headers, body) {
			if (status == 200) {
				CF.log("POST succeeded");
				body = Utils.unescape(body);
				if (typeof callback === 'function') {
					callback(true);

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
	};

	self.extractTag = function (s, start, stop) {
		var i = s.indexOf(start)
		if (i == -1) {
			return "";
		}
		else {
			i = i + start.length;
			return s.substring(i, s.indexOf(stop, i));
		}
	}


	/*
	 ===============================================================================


	 =========================================================================
	 NOTES:

	 The following calls are the entire Sonos UPNP architecture exposed to be called
	 by the Player object

	 =========================================================================
	 */

	self.AlarmClockSetFormat = function (callback, host, DesiredTimeFormat, DesiredDateFormat) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#SetFormat';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetFormat xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><DesiredTimeFormat>' + DesiredTimeFormat + '</DesiredTimeFormat><DesiredDateFormat>' + DesiredDateFormat + '</DesiredDateFormat></u:SetFormat></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AlarmClockGetFormat = function (callback, host) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#GetFormat';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetFormat xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"></u:GetFormat></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentTimeFormat":xmlDoc.getElementsByTagName("CurrentTimeFormat")[0].textContent, "CurrentDateFormat":xmlDoc.getElementsByTagName("CurrentDateFormat")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AlarmClockSetTimeZone = function (callback, host, Index, AutoAdjustDst) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#SetTimeZone';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetTimeZone xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><Index>' + Index + '</Index><AutoAdjustDst>' + AutoAdjustDst + '</AutoAdjustDst></u:SetTimeZone></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AlarmClockGetTimeZone = function (callback, host) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#GetTimeZone';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetTimeZone xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"></u:GetTimeZone></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"Index":xmlDoc.getElementsByTagName("Index")[0].textContent, "AutoAdjustDst":xmlDoc.getElementsByTagName("AutoAdjustDst")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AlarmClockGetTimeZoneAndRule = function (callback, host) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#GetTimeZoneAndRule';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetTimeZoneAndRule xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"></u:GetTimeZoneAndRule></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"Index":xmlDoc.getElementsByTagName("Index")[0].textContent, "AutoAdjustDst":xmlDoc.getElementsByTagName("AutoAdjustDst")[0].textContent, "CurrentTimeZone":xmlDoc.getElementsByTagName("CurrentTimeZone")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AlarmClockGetTimeZoneRule = function (callback, host, Index) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#GetTimeZoneRule';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetTimeZoneRule xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><Index>' + Index + '</Index></u:GetTimeZoneRule></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"TimeZone":xmlDoc.getElementsByTagName("TimeZone")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AlarmClockSetTimeServer = function (callback, host, DesiredTimeServer) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#SetTimeServer';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetTimeServer xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><DesiredTimeServer>' + DesiredTimeServer + '</DesiredTimeServer></u:SetTimeServer></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AlarmClockGetTimeServer = function (callback, host) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#GetTimeServer';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetTimeServer xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"></u:GetTimeServer></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentTimeServer":xmlDoc.getElementsByTagName("CurrentTimeServer")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AlarmClockSetTimeNow = function (callback, host, DesiredTime, TimeZoneForDesiredTime) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#SetTimeNow';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetTimeNow xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><DesiredTime>' + DesiredTime + '</DesiredTime><TimeZoneForDesiredTime>' + TimeZoneForDesiredTime + '</TimeZoneForDesiredTime></u:SetTimeNow></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AlarmClockGetHouseholdTimeAtStamp = function (callback, host, TimeStamp) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#GetHouseholdTimeAtStamp';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetHouseholdTimeAtStamp xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><TimeStamp>' + TimeStamp + '</TimeStamp></u:GetHouseholdTimeAtStamp></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"HouseholdUTCTime":xmlDoc.getElementsByTagName("HouseholdUTCTime")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AlarmClockGetTimeNow = function (callback, host) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#GetTimeNow';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetTimeNow xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"></u:GetTimeNow></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentUTCTime":xmlDoc.getElementsByTagName("CurrentUTCTime")[0].textContent, "CurrentLocalTime":xmlDoc.getElementsByTagName("CurrentLocalTime")[0].textContent, "CurrentTimeZone":xmlDoc.getElementsByTagName("CurrentTimeZone")[0].textContent, "CurrentTimeGeneration":xmlDoc.getElementsByTagName("CurrentTimeGeneration")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AlarmClockCreateAlarm = function (callback, host, StartLocalTime, Duration, Recurrence, Enabled, RoomUUID, ProgramURI, ProgramMetaData, PlayMode, Volume, IncludeLinkedZones) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#CreateAlarm';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:CreateAlarm xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><StartLocalTime>' + StartLocalTime + '</StartLocalTime><Duration>' + Duration + '</Duration><Recurrence>' + Recurrence + '</Recurrence><Enabled>' + Enabled + '</Enabled><RoomUUID>' + RoomUUID + '</RoomUUID><ProgramURI>' + ProgramURI + '</ProgramURI><ProgramMetaData>' + ProgramMetaData + '</ProgramMetaData><PlayMode>' + PlayMode + '</PlayMode><Volume>' + Volume + '</Volume><IncludeLinkedZones>' + IncludeLinkedZones + '</IncludeLinkedZones></u:CreateAlarm></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"AssignedID":xmlDoc.getElementsByTagName("AssignedID")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AlarmClockUpdateAlarm = function (callback, host, ID, StartLocalTime, Duration, Recurrence, Enabled, RoomUUID, ProgramURI, ProgramMetaData, PlayMode, Volume, IncludeLinkedZones) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#UpdateAlarm';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:UpdateAlarm xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><ID>' + ID + '</ID><StartLocalTime>' + StartLocalTime + '</StartLocalTime><Duration>' + Duration + '</Duration><Recurrence>' + Recurrence + '</Recurrence><Enabled>' + Enabled + '</Enabled><RoomUUID>' + RoomUUID + '</RoomUUID><ProgramURI>' + ProgramURI + '</ProgramURI><ProgramMetaData>' + ProgramMetaData + '</ProgramMetaData><PlayMode>' + PlayMode + '</PlayMode><Volume>' + Volume + '</Volume><IncludeLinkedZones>' + IncludeLinkedZones + '</IncludeLinkedZones></u:UpdateAlarm></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AlarmClockDestroyAlarm = function (callback, host, ID) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#DestroyAlarm';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:DestroyAlarm xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><ID>' + ID + '</ID></u:DestroyAlarm></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AlarmClockListAlarms = function (callback, host) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#ListAlarms';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ListAlarms xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"></u:ListAlarms></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentAlarmList":xmlDoc.getElementsByTagName("CurrentAlarmList")[0].textContent, "CurrentAlarmListVersion":xmlDoc.getElementsByTagName("CurrentAlarmListVersion")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AlarmClockSetDailyIndexRefreshTime = function (callback, host, DesiredDailyIndexRefreshTime) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#SetDailyIndexRefreshTime';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetDailyIndexRefreshTime xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"><DesiredDailyIndexRefreshTime>' + DesiredDailyIndexRefreshTime + '</DesiredDailyIndexRefreshTime></u:SetDailyIndexRefreshTime></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AlarmClockGetDailyIndexRefreshTime = function (callback, host) {
		var url = '/AlarmClock/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AlarmClock:1#GetDailyIndexRefreshTime';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetDailyIndexRefreshTime xmlns:u="urn:schemas-upnp-org:service:AlarmClock:1"></u:GetDailyIndexRefreshTime></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentDailyIndexRefreshTime":xmlDoc.getElementsByTagName("CurrentDailyIndexRefreshTime")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.MusicServicesGetSessionId = function (callback, host, ServiceId, Username) {
		var url = '/MusicServices/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:MusicServices:1#GetSessionId';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetSessionId xmlns:u="urn:schemas-upnp-org:service:MusicServices:1"><ServiceId>' + ServiceId + '</ServiceId><Username>' + Username + '</Username></u:GetSessionId></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"SessionId":xmlDoc.getElementsByTagName("SessionId")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.MusicServicesListAvailableServices = function (callback, host) {
		var url = '/MusicServices/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:MusicServices:1#ListAvailableServices';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ListAvailableServices xmlns:u="urn:schemas-upnp-org:service:MusicServices:1"></u:ListAvailableServices></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"AvailableServiceDescriptorList":xmlDoc.getElementsByTagName("AvailableServiceDescriptorList")[0].textContent, "AvailableServiceTypeList":xmlDoc.getElementsByTagName("AvailableServiceTypeList")[0].textContent, "AvailableServiceListVersion":xmlDoc.getElementsByTagName("AvailableServiceListVersion")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AudioInStartTransmissionToGroup = function (callback, host, CoordinatorID) {
		var url = '/AudioIn/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AudioIn:1#StartTransmissionToGroup';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:StartTransmissionToGroup xmlns:u="urn:schemas-upnp-org:service:AudioIn:1"><CoordinatorID>' + CoordinatorID + '</CoordinatorID></u:StartTransmissionToGroup></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentTransportSettings":xmlDoc.getElementsByTagName("CurrentTransportSettings")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AudioInStopTransmissionToGroup = function (callback, host, CoordinatorID) {
		var url = '/AudioIn/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AudioIn:1#StopTransmissionToGroup';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:StopTransmissionToGroup xmlns:u="urn:schemas-upnp-org:service:AudioIn:1"><CoordinatorID>' + CoordinatorID + '</CoordinatorID></u:StopTransmissionToGroup></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AudioInSetAudioInputAttributes = function (callback, host, DesiredName, DesiredIcon) {
		var url = '/AudioIn/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AudioIn:1#SetAudioInputAttributes';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetAudioInputAttributes xmlns:u="urn:schemas-upnp-org:service:AudioIn:1"><DesiredName>' + DesiredName + '</DesiredName><DesiredIcon>' + DesiredIcon + '</DesiredIcon></u:SetAudioInputAttributes></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AudioInGetAudioInputAttributes = function (callback, host) {
		var url = '/AudioIn/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AudioIn:1#GetAudioInputAttributes';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetAudioInputAttributes xmlns:u="urn:schemas-upnp-org:service:AudioIn:1"></u:GetAudioInputAttributes></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentName":xmlDoc.getElementsByTagName("CurrentName")[0].textContent, "CurrentIcon":xmlDoc.getElementsByTagName("CurrentIcon")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AudioInSetLineInLevel = function (callback, host, DesiredLeftLineInLevel, DesiredRightLineInLevel) {
		var url = '/AudioIn/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AudioIn:1#SetLineInLevel';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetLineInLevel xmlns:u="urn:schemas-upnp-org:service:AudioIn:1"><DesiredLeftLineInLevel>' + DesiredLeftLineInLevel + '</DesiredLeftLineInLevel><DesiredRightLineInLevel>' + DesiredRightLineInLevel + '</DesiredRightLineInLevel></u:SetLineInLevel></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AudioInGetLineInLevel = function (callback, host) {
		var url = '/AudioIn/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AudioIn:1#GetLineInLevel';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetLineInLevel xmlns:u="urn:schemas-upnp-org:service:AudioIn:1"></u:GetLineInLevel></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentLeftLineInLevel":xmlDoc.getElementsByTagName("CurrentLeftLineInLevel")[0].textContent, "CurrentRightLineInLevel":xmlDoc.getElementsByTagName("CurrentRightLineInLevel")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AudioInSelectAudio = function (callback, host, ObjectID) {
		var url = '/AudioIn/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AudioIn:1#SelectAudio';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SelectAudio xmlns:u="urn:schemas-upnp-org:service:AudioIn:1"><ObjectID>' + ObjectID + '</ObjectID></u:SelectAudio></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.DevicePropertiesSetLEDState = function (callback, host, DesiredLEDState) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#SetLEDState';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetLEDState xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><DesiredLEDState>' + DesiredLEDState + '</DesiredLEDState></u:SetLEDState></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.DevicePropertiesGetLEDState = function (callback, host) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetLEDState';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetLEDState xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetLEDState></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentLEDState":xmlDoc.getElementsByTagName("CurrentLEDState")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.DevicePropertiesSetInvisible = function (callback, host, DesiredInvisible) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#SetInvisible';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetInvisible xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><DesiredInvisible>' + DesiredInvisible + '</DesiredInvisible></u:SetInvisible></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.DevicePropertiesGetInvisible = function (callback, host) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetInvisible';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetInvisible xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetInvisible></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentInvisible":xmlDoc.getElementsByTagName("CurrentInvisible")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.DevicePropertiesAddBondedZones = function (callback, host, ChannelMapSet) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#AddBondedZones';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:AddBondedZones xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><ChannelMapSet>' + ChannelMapSet + '</ChannelMapSet></u:AddBondedZones></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.DevicePropertiesRemoveBondedZones = function (callback, host, ChannelMapSet) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#RemoveBondedZones';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RemoveBondedZones xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><ChannelMapSet>' + ChannelMapSet + '</ChannelMapSet></u:RemoveBondedZones></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.DevicePropertiesCreateStereoPair = function (callback, host, ChannelMapSet) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#CreateStereoPair';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:CreateStereoPair xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><ChannelMapSet>' + ChannelMapSet + '</ChannelMapSet></u:CreateStereoPair></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.DevicePropertiesSeparateStereoPair = function (callback, host, ChannelMapSet) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#SeparateStereoPair';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SeparateStereoPair xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><ChannelMapSet>' + ChannelMapSet + '</ChannelMapSet></u:SeparateStereoPair></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.DevicePropertiesSetZoneAttributes = function (callback, host, DesiredZoneName, DesiredIcon) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#SetZoneAttributes';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetZoneAttributes xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><DesiredZoneName>' + DesiredZoneName + '</DesiredZoneName><DesiredIcon>' + DesiredIcon + '</DesiredIcon></u:SetZoneAttributes></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.DevicePropertiesGetZoneAttributes = function (callback, host) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetZoneAttributes';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetZoneAttributes xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetZoneAttributes></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentZoneName":xmlDoc.getElementsByTagName("CurrentZoneName")[0].textContent, "CurrentIcon":xmlDoc.getElementsByTagName("CurrentIcon")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.DevicePropertiesGetHouseholdID = function (callback, host) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetHouseholdID';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetHouseholdID xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetHouseholdID></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentHouseholdID":xmlDoc.getElementsByTagName("CurrentHouseholdID")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.DevicePropertiesGetZoneInfo = function (callback, host) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetZoneInfo';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetZoneInfo xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetZoneInfo></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"SerialNumber":xmlDoc.getElementsByTagName("SerialNumber")[0].textContent, "SoftwareVersion":xmlDoc.getElementsByTagName("SoftwareVersion")[0].textContent, "DisplaySoftwareVersion":xmlDoc.getElementsByTagName("DisplaySoftwareVersion")[0].textContent, "HardwareVersion":xmlDoc.getElementsByTagName("HardwareVersion")[0].textContent, "IPAddress":xmlDoc.getElementsByTagName("IPAddress")[0].textContent, "MACAddress":xmlDoc.getElementsByTagName("MACAddress")[0].textContent, "CopyrightInfo":xmlDoc.getElementsByTagName("CopyrightInfo")[0].textContent, "ExtraInfo":xmlDoc.getElementsByTagName("ExtraInfo")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.DevicePropertiesSetAutoplayLinkedZones = function (callback, host, IncludeLinkedZones) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#SetAutoplayLinkedZones';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetAutoplayLinkedZones xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><IncludeLinkedZones>' + IncludeLinkedZones + '</IncludeLinkedZones></u:SetAutoplayLinkedZones></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.DevicePropertiesGetAutoplayLinkedZones = function (callback, host) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetAutoplayLinkedZones';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetAutoplayLinkedZones xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetAutoplayLinkedZones></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"IncludeLinkedZones":xmlDoc.getElementsByTagName("IncludeLinkedZones")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.DevicePropertiesSetAutoplayRoomUUID = function (callback, host, RoomUUID) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#SetAutoplayRoomUUID';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetAutoplayRoomUUID xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><RoomUUID>' + RoomUUID + '</RoomUUID></u:SetAutoplayRoomUUID></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.DevicePropertiesGetAutoplayRoomUUID = function (callback, host) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetAutoplayRoomUUID';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetAutoplayRoomUUID xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetAutoplayRoomUUID></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"RoomUUID":xmlDoc.getElementsByTagName("RoomUUID")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.DevicePropertiesSetAutoplayVolume = function (callback, host, Volume) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#SetAutoplayVolume';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetAutoplayVolume xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><Volume>' + Volume + '</Volume></u:SetAutoplayVolume></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.DevicePropertiesGetAutoplayVolume = function (callback, host) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetAutoplayVolume';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetAutoplayVolume xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetAutoplayVolume></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentVolume":xmlDoc.getElementsByTagName("CurrentVolume")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.DevicePropertiesImportSetting = function (callback, host, SettingID, SettingURI) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#ImportSetting';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ImportSetting xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><SettingID>' + SettingID + '</SettingID><SettingURI>' + SettingURI + '</SettingURI></u:ImportSetting></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.DevicePropertiesSetUseAutoplayVolume = function (callback, host, UseVolume) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#SetUseAutoplayVolume';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetUseAutoplayVolume xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"><UseVolume>' + UseVolume + '</UseVolume></u:SetUseAutoplayVolume></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.DevicePropertiesGetUseAutoplayVolume = function (callback, host) {
		var url = '/DeviceProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:DeviceProperties:1#GetUseAutoplayVolume'
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetUseAutoplayVolume xmlns:u="urn:schemas-upnp-org:service:DeviceProperties:1"></u:GetUseAutoplayVolume></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"UseVolume":xmlDoc.getElementsByTagName("UseVolume")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.SystemPropertiesSetString = function (callback, host, VariableName, StringValue) {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#SetString';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetString xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><VariableName>' + VariableName + '</VariableName><StringValue>' + StringValue + '</StringValue></u:SetString></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.SystemPropertiesSetStringX = function (callback, host, VariableName, StringValue) {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#SetStringX';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetStringX xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><VariableName>' + VariableName + '</VariableName><StringValue>' + StringValue + '</StringValue></u:SetStringX></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.SystemPropertiesGetString = function (callback, host, VariableName) {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#GetString';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetString xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><VariableName>' + VariableName + '</VariableName></u:GetString></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"StringValue":xmlDoc.getElementsByTagName("StringValue")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.SystemPropertiesGetStringX = function (callback, host, VariableName) {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#GetStringX';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetStringX xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><VariableName>' + VariableName + '</VariableName></u:GetStringX></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"StringValue":xmlDoc.getElementsByTagName("StringValue")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.SystemPropertiesRemove = function (callback, host, VariableName) {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#Remove';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Remove xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><VariableName>' + VariableName + '</VariableName></u:Remove></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.SystemPropertiesGetWebCode = function (callback, host, AccountType) {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#GetWebCode';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetWebCode xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><AccountType>' + AccountType + '</AccountType></u:GetWebCode></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"WebCode":xmlDoc.getElementsByTagName("WebCode")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.SystemPropertiesProvisionTrialAccount = function (callback, host, AccountType) {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#ProvisionTrialAccount';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ProvisionTrialAccount xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><AccountType>' + AccountType + '</AccountType></u:ProvisionTrialAccount></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.SystemPropertiesProvisionCredentialedTrialAccountX = function (callback, host, AccountType, AccountID, AccountPassword) {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#ProvisionCredentialedTrialAccountX';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ProvisionCredentialedTrialAccountX xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><AccountType>' + AccountType + '</AccountType><AccountID>' + AccountID + '</AccountID><AccountPassword>' + AccountPassword + '</AccountPassword></u:ProvisionCredentialedTrialAccountX></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"IsExpired":xmlDoc.getElementsByTagName("IsExpired")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.SystemPropertiesMigrateTrialAccountX = function (callback, host, TargetAccountType, TargetAccountID, TargetAccountPassword) {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#MigrateTrialAccountX';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:MigrateTrialAccountX xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><TargetAccountType>' + TargetAccountType + '</TargetAccountType><TargetAccountID>' + TargetAccountID + '</TargetAccountID><TargetAccountPassword>' + TargetAccountPassword + '</TargetAccountPassword></u:MigrateTrialAccountX></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.SystemPropertiesAddAccountX = function (callback, host, AccountType, AccountID, AccountPassword) {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#AddAccountX';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:AddAccountX xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><AccountType>' + AccountType + '</AccountType><AccountID>' + AccountID + '</AccountID><AccountPassword>' + AccountPassword + '</AccountPassword></u:AddAccountX></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.SystemPropertiesAddAccountWithCredentialsX = function (callback, host, AccountType, AccountToken, AccountKey) {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#AddAccountWithCredentialsX';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:AddAccountWithCredentialsX xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><AccountType>' + AccountType + '</AccountType><AccountToken>' + AccountToken + '</AccountToken><AccountKey>' + AccountKey + '</AccountKey></u:AddAccountWithCredentialsX></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.SystemPropertiesRemoveAccount = function (callback, host, AccountType, AccountID) {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#RemoveAccount';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RemoveAccount xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><AccountType>' + AccountType + '</AccountType><AccountID>' + AccountID + '</AccountID></u:RemoveAccount></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.SystemPropertiesEditAccountPasswordX = function (callback, host, AccountType, AccountID, NewAccountPassword) {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#EditAccountPasswordX';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:EditAccountPasswordX xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><AccountType>' + AccountType + '</AccountType><AccountID>' + AccountID + '</AccountID><NewAccountPassword>' + NewAccountPassword + '</NewAccountPassword></u:EditAccountPasswordX></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.SystemPropertiesEditAccountMd = function (callback, host, AccountType, AccountID, NewAccountMd) {
		var url = '/SystemProperties/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:SystemProperties:1#EditAccountMd';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:EditAccountMd xmlns:u="urn:schemas-upnp-org:service:SystemProperties:1"><AccountType>' + AccountType + '</AccountType><AccountID>' + AccountID + '</AccountID><NewAccountMd>' + NewAccountMd + '</NewAccountMd></u:EditAccountMd></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.ZoneGroupTopologyCheckForUpdate = function (callback, host, UpdateType, CachedOnly, Version) {
		var url = '/ZoneGroupTopology/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ZoneGroupTopology:1#CheckForUpdate';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:CheckForUpdate xmlns:u="urn:schemas-upnp-org:service:ZoneGroupTopology:1"><UpdateType>' + UpdateType + '</UpdateType><CachedOnly>' + CachedOnly + '</CachedOnly><Version>' + Version + '</Version></u:CheckForUpdate></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"UpdateItem":xmlDoc.getElementsByTagName("UpdateItem")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.ZoneGroupTopologyBeginSoftwareUpdate = function (callback, host, UpdateURL, Flags) {
		var url = '/ZoneGroupTopology/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ZoneGroupTopology:1#BeginSoftwareUpdate';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:BeginSoftwareUpdate xmlns:u="urn:schemas-upnp-org:service:ZoneGroupTopology:1"><UpdateURL>' + UpdateURL + '</UpdateURL><Flags>' + Flags + '</Flags></u:BeginSoftwareUpdate></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.ZoneGroupTopologyReportUnresponsiveDevice = function (callback, host, DeviceUUID, DesiredAction) {
		var url = '/ZoneGroupTopology/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ZoneGroupTopology:1#ReportUnresponsiveDevice';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ReportUnresponsiveDevice xmlns:u="urn:schemas-upnp-org:service:ZoneGroupTopology:1"><DeviceUUID>' + DeviceUUID + '</DeviceUUID><DesiredAction>' + DesiredAction + '</DesiredAction></u:ReportUnresponsiveDevice></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.ZoneGroupTopologySubmitDiagnostics = function (callback, host) {
		var url = '/ZoneGroupTopology/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ZoneGroupTopology:1#SubmitDiagnostics';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SubmitDiagnostics xmlns:u="urn:schemas-upnp-org:service:ZoneGroupTopology:1"></u:SubmitDiagnostics></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"DiagnosticID":xmlDoc.getElementsByTagName("DiagnosticID")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.GroupManagementAddMember = function (callback, host, MemberID) {
		var url = '/GroupManagement/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:GroupManagement:1#AddMember';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:AddMember xmlns:u="urn:schemas-upnp-org:service:GroupManagement:1"><MemberID>' + MemberID + '</MemberID></u:AddMember></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentTransportSettings":xmlDoc.getElementsByTagName("CurrentTransportSettings")[0].textContent, "GroupUUIDJoined":xmlDoc.getElementsByTagName("GroupUUIDJoined")[0].textContent, "ResetVolumeAfter":xmlDoc.getElementsByTagName("ResetVolumeAfter")[0].textContent, "VolumeAVTransportURI":xmlDoc.getElementsByTagName("VolumeAVTransportURI")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.GroupManagementRemoveMember = function (callback, host, MemberID) {
		var url = '/GroupManagement/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:GroupManagement:1#RemoveMember';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RemoveMember xmlns:u="urn:schemas-upnp-org:service:GroupManagement:1"><MemberID>' + MemberID + '</MemberID></u:RemoveMember></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.GroupManagementReportTrackBufferingResult = function (callback, host, MemberID, ResultCode) {
		var url = '/GroupManagement/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:GroupManagement:1#ReportTrackBufferingResult';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ReportTrackBufferingResult xmlns:u="urn:schemas-upnp-org:service:GroupManagement:1"><MemberID>' + MemberID + '</MemberID><ResultCode>' + ResultCode + '</ResultCode></u:ReportTrackBufferingResult></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.ContentDirectoryGetSearchCapabilities = function (callback, host) {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#GetSearchCapabilities';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetSearchCapabilities xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"></u:GetSearchCapabilities></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"SearchCaps":xmlDoc.getElementsByTagName("SearchCaps")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.ContentDirectoryGetSortCapabilities = function (callback, host) {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#GetSortCapabilities';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetSortCapabilities xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"></u:GetSortCapabilities></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"SortCaps":xmlDoc.getElementsByTagName("SortCaps")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.ContentDirectoryGetSystemUpdateID = function (callback, host) {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#GetSystemUpdateID';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetSystemUpdateID xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"></u:GetSystemUpdateID></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"Id":xmlDoc.getElementsByTagName("Id")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.ContentDirectoryGetAlbumArtistDisplayOption = function (callback, host) {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#GetAlbumArtistDisplayOption';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetAlbumArtistDisplayOption xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"></u:GetAlbumArtistDisplayOption></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"AlbumArtistDisplayOption":xmlDoc.getElementsByTagName("AlbumArtistDisplayOption")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.ContentDirectoryGetLastIndexChange = function (callback, host) {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#GetLastIndexChange';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetLastIndexChange xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"></u:GetLastIndexChange></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"LastIndexChange":xmlDoc.getElementsByTagName("LastIndexChange")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.ContentDirectoryBrowse = function (callback, host, ObjectID, BrowseFlag, Filter, StartingIndex, RequestedCount, SortCriteria) {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#Browse';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Browse xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><ObjectID>' + ObjectID + '</ObjectID><BrowseFlag>' + BrowseFlag + '</BrowseFlag><Filter>' + Filter + '</Filter><StartingIndex>' + StartingIndex + '</StartingIndex><RequestedCount>' + RequestedCount + '</RequestedCount><SortCriteria>' + SortCriteria + '</SortCriteria></u:Browse></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"Result":xmlDoc.getElementsByTagName("Result")[0].textContent, "NumberReturned":xmlDoc.getElementsByTagName("NumberReturned")[0].textContent, "TotalMatches":xmlDoc.getElementsByTagName("TotalMatches")[0].textContent, "UpdateID":xmlDoc.getElementsByTagName("UpdateID")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.ContentDirectoryFindPrefix = function (callback, host, ObjectID, Prefix) {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#FindPrefix';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:FindPrefix xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><ObjectID>' + ObjectID + '</ObjectID><Prefix>' + Prefix + '</Prefix></u:FindPrefix></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"StartingIndex":xmlDoc.getElementsByTagName("StartingIndex")[0].textContent, "UpdateID":xmlDoc.getElementsByTagName("UpdateID")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.ContentDirectoryGetAllPrefixLocations = function (callback, host, ObjectID) {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#GetAllPrefixLocations';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetAllPrefixLocations xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><ObjectID>' + ObjectID + '</ObjectID></u:GetAllPrefixLocations></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"TotalPrefixes":xmlDoc.getElementsByTagName("TotalPrefixes")[0].textContent, "PrefixAndIndexCSV":xmlDoc.getElementsByTagName("PrefixAndIndexCSV")[0].textContent, "UpdateID":xmlDoc.getElementsByTagName("UpdateID")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.ContentDirectoryCreateObject = function (callback, host, ContainerID, Elements) {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#CreateObject';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:CreateObject xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><ContainerID>' + ContainerID + '</ContainerID><Elements>' + Elements + '</Elements></u:CreateObject></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"ObjectID":xmlDoc.getElementsByTagName("ObjectID")[0].textContent, "Result":xmlDoc.getElementsByTagName("Result")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.ContentDirectoryUpdateObject = function (callback, host, ObjectID, CurrentTagValue, NewTagValue) {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#UpdateObject';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:UpdateObject xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><ObjectID>' + ObjectID + '</ObjectID><CurrentTagValue>' + CurrentTagValue + '</CurrentTagValue><NewTagValue>' + NewTagValue + '</NewTagValue></u:UpdateObject></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.ContentDirectoryDestroyObject = function (callback, host, ObjectID) {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#DestroyObject';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:DestroyObject xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><ObjectID>' + ObjectID + '</ObjectID></u:DestroyObject></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.ContentDirectoryRefreshShareIndex = function (callback, host, AlbumArtistDisplayOption) {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#RefreshShareIndex';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RefreshShareIndex xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><AlbumArtistDisplayOption>' + AlbumArtistDisplayOption + '</AlbumArtistDisplayOption></u:RefreshShareIndex></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.ContentDirectoryRequestResort = function (callback, host, SortOrder) {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#RequestResort';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RequestResort xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><SortOrder>' + SortOrder + '</SortOrder></u:RequestResort></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.ContentDirectoryGetShareIndexInProgress = function (callback, host) {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#GetShareIndexInProgress';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetShareIndexInProgress xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"></u:GetShareIndexInProgress></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"IsIndexing":xmlDoc.getElementsByTagName("IsIndexing")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.ContentDirectoryGetBrowseable = function (callback, host) {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#GetBrowseable';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetBrowseable xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"></u:GetBrowseable></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"IsBrowseable":xmlDoc.getElementsByTagName("IsBrowseable")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.ContentDirectorySetBrowseable = function (callback, host, Browseable) {
		var url = '/MediaServer/ContentDirectory/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ContentDirectory:1#SetBrowseable';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetBrowseable xmlns:u="urn:schemas-upnp-org:service:ContentDirectory:1"><Browseable>' + Browseable + '</Browseable></u:SetBrowseable></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.ConnectionManagerGetProtocolInfo = function (callback, host) {
		var url = '/MediaServer/ConnectionManager/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ConnectionManager:1#GetProtocolInfo';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetProtocolInfo xmlns:u="urn:schemas-upnp-org:service:ConnectionManager:1"></u:GetProtocolInfo></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"Source":xmlDoc.getElementsByTagName("Source")[0].textContent, "Sink":xmlDoc.getElementsByTagName("Sink")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.ConnectionManagerGetCurrentConnectionIDs = function (callback, host) {
		var url = '/MediaServer/ConnectionManager/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ConnectionManager:1#GetCurrentConnectionIDs';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetCurrentConnectionIDs xmlns:u="urn:schemas-upnp-org:service:ConnectionManager:1"></u:GetCurrentConnectionIDs></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"ConnectionIDs":xmlDoc.getElementsByTagName("ConnectionIDs")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.ConnectionManagerGetCurrentConnectionInfo = function (callback, host, ConnectionID) {
		var url = '/MediaServer/ConnectionManager/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ConnectionManager:1#GetCurrentConnectionInfo';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetCurrentConnectionInfo xmlns:u="urn:schemas-upnp-org:service:ConnectionManager:1"><ConnectionID>' + ConnectionID + '</ConnectionID></u:GetCurrentConnectionInfo></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"RcsID":xmlDoc.getElementsByTagName("RcsID")[0].textContent, "AVTransportID":xmlDoc.getElementsByTagName("AVTransportID")[0].textContent, "ProtocolInfo":xmlDoc.getElementsByTagName("ProtocolInfo")[0].textContent, "PeerConnectionManager":xmlDoc.getElementsByTagName("PeerConnectionManager")[0].textContent, "PeerConnectionID":xmlDoc.getElementsByTagName("PeerConnectionID")[0].textContent, "Direction":xmlDoc.getElementsByTagName("Direction")[0].textContent, "Status":xmlDoc.getElementsByTagName("Status")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.RenderingControlGetMute = function (callback, host, InstanceID, Channel) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetMute';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetMute xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><Channel>' + Channel + '</Channel></u:GetMute></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentMute":xmlDoc.getElementsByTagName("CurrentMute")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.RenderingControlSetMute = function (callback, host, InstanceID, Channel, DesiredMute) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetMute';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetMute xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><Channel>' + Channel + '</Channel><DesiredMute>' + DesiredMute + '</DesiredMute></u:SetMute></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.RenderingControlResetBasicEQ = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#ResetBasicEQ';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ResetBasicEQ xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID></u:ResetBasicEQ></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"Bass":xmlDoc.getElementsByTagName("Bass")[0].textContent, "Treble":xmlDoc.getElementsByTagName("Treble")[0].textContent, "Loudness":xmlDoc.getElementsByTagName("Loudness")[0].textContent, "LeftVolume":xmlDoc.getElementsByTagName("LeftVolume")[0].textContent, "RightVolume":xmlDoc.getElementsByTagName("RightVolume")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.RenderingControlResetExtEQ = function (callback, host, InstanceID, EQType) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#ResetExtEQ';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ResetExtEQ xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><EQType>' + EQType + '</EQType></u:ResetExtEQ></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.RenderingControlGetVolume = function (callback, host, InstanceID, Channel) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetVolume';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetVolume xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><Channel>' + Channel + '</Channel></u:GetVolume></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentVolume":xmlDoc.getElementsByTagName("CurrentVolume")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.RenderingControlSetVolume = function (callback, host, InstanceID, Channel, DesiredVolume) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetVolume';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetVolume xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><Channel>' + Channel + '</Channel><DesiredVolume>' + DesiredVolume + '</DesiredVolume></u:SetVolume></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.RenderingControlSetRelativeVolume = function (callback, host, InstanceID, Channel, Adjustment) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetRelativeVolume';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetRelativeVolume xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><Channel>' + Channel + '</Channel><Adjustment>' + Adjustment + '</Adjustment></u:SetRelativeVolume></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"NewVolume":xmlDoc.getElementsByTagName("NewVolume")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.RenderingControlGetVolumeDB = function (callback, host, InstanceID, Channel) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetVolumeDB';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetVolumeDB xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><Channel>' + Channel + '</Channel></u:GetVolumeDB></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentVolume":xmlDoc.getElementsByTagName("CurrentVolume")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.RenderingControlSetVolumeDB = function (callback, host, InstanceID, Channel, DesiredVolume) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetVolumeDB';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetVolumeDB xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><Channel>' + Channel + '</Channel><DesiredVolume>' + DesiredVolume + '</DesiredVolume></u:SetVolumeDB></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.RenderingControlGetVolumeDBRange = function (callback, host, InstanceID, Channel) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetVolumeDBRange';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetVolumeDBRange xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><Channel>' + Channel + '</Channel></u:GetVolumeDBRange></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"MinValue":xmlDoc.getElementsByTagName("MinValue")[0].textContent, "MaxValue":xmlDoc.getElementsByTagName("MaxValue")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.RenderingControlGetBass = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetBass';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetBass xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID></u:GetBass></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentBass":xmlDoc.getElementsByTagName("CurrentBass")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.RenderingControlSetBass = function (callback, host, InstanceID, DesiredBass) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetBass';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetBass xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><DesiredBass>' + DesiredBass + '</DesiredBass></u:SetBass></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.RenderingControlGetTreble = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetTreble';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetTreble xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID></u:GetTreble></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentTreble":xmlDoc.getElementsByTagName("CurrentTreble")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.RenderingControlSetTreble = function (callback, host, InstanceID, DesiredTreble) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetTreble';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetTreble xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><DesiredTreble>' + DesiredTreble + '</DesiredTreble></u:SetTreble></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.RenderingControlGetEQ = function (callback, host, InstanceID, EQType) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetEQ';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetEQ xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><EQType>' + EQType + '</EQType></u:GetEQ></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentValue":xmlDoc.getElementsByTagName("CurrentValue")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.RenderingControlSetEQ = function (callback, host, InstanceID, EQType, DesiredValue) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetEQ';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetEQ xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><EQType>' + EQType + '</EQType><DesiredValue>' + DesiredValue + '</DesiredValue></u:SetEQ></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.RenderingControlGetLoudness = function (callback, host, InstanceID, Channel) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetLoudness';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetLoudness xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><Channel>' + Channel + '</Channel></u:GetLoudness></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentLoudness":xmlDoc.getElementsByTagName("CurrentLoudness")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.RenderingControlSetLoudness = function (callback, host, InstanceID, Channel, DesiredLoudness) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetLoudness';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetLoudness xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><Channel>' + Channel + '</Channel><DesiredLoudness>' + DesiredLoudness + '</DesiredLoudness></u:SetLoudness></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.RenderingControlGetSupportsOutputFixed = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetSupportsOutputFixed';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetSupportsOutputFixed xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID></u:GetSupportsOutputFixed></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentSupportsFixed":xmlDoc.getElementsByTagName("CurrentSupportsFixed")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.RenderingControlGetOutputFixed = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetOutputFixed';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetOutputFixed xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID></u:GetOutputFixed></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentFixed":xmlDoc.getElementsByTagName("CurrentFixed")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.RenderingControlSetOutputFixed = function (callback, host, InstanceID, DesiredFixed) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetOutputFixed';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetOutputFixed xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><DesiredFixed>' + DesiredFixed + '</DesiredFixed></u:SetOutputFixed></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.RenderingControlGetHeadphoneConnected = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#GetHeadphoneConnected';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetHeadphoneConnected xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID></u:GetHeadphoneConnected></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentHeadphoneConnected":xmlDoc.getElementsByTagName("CurrentHeadphoneConnected")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.RenderingControlRampToVolume = function (callback, host, InstanceID, Channel, RampType, DesiredVolume, ResetVolumeAfter, ProgramURI) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#RampToVolume';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RampToVolume xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><Channel>' + Channel + '</Channel><RampType>' + RampType + '</RampType><DesiredVolume>' + DesiredVolume + '</DesiredVolume><ResetVolumeAfter>' + ResetVolumeAfter + '</ResetVolumeAfter><ProgramURI>' + ProgramURI + '</ProgramURI></u:RampToVolume></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"RampTime":xmlDoc.getElementsByTagName("RampTime")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.RenderingControlRestoreVolumePriorToRamp = function (callback, host, InstanceID, Channel) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#RestoreVolumePriorToRamp';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RestoreVolumePriorToRamp xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><Channel>' + Channel + '</Channel></u:RestoreVolumePriorToRamp></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.RenderingControlSetChannelMap = function (callback, host, InstanceID, ChannelMap) {
		var url = '/MediaRenderer/RenderingControl/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:RenderingControl:1#SetChannelMap';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetChannelMap xmlns:u="urn:schemas-upnp-org:service:RenderingControl:1"><InstanceID>' + InstanceID + '</InstanceID><ChannelMap>' + ChannelMap + '</ChannelMap></u:SetChannelMap></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.ConnectionManagerGetProtocolInfo = function (callback, host) {
		var url = '/MediaRenderer/ConnectionManager/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ConnectionManager:1#GetProtocolInfo';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetProtocolInfo xmlns:u="urn:schemas-upnp-org:service:ConnectionManager:1"></u:GetProtocolInfo></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"Source":xmlDoc.getElementsByTagName("Source")[0].textContent, "Sink":xmlDoc.getElementsByTagName("Sink")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.ConnectionManagerGetCurrentConnectionIDs = function (callback, host) {
		var url = '/MediaRenderer/ConnectionManager/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ConnectionManager:1#GetCurrentConnectionIDs';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetCurrentConnectionIDs xmlns:u="urn:schemas-upnp-org:service:ConnectionManager:1"></u:GetCurrentConnectionIDs></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"ConnectionIDs":xmlDoc.getElementsByTagName("ConnectionIDs")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.ConnectionManagerGetCurrentConnectionInfo = function (callback, host, ConnectionID) {
		var url = '/MediaRenderer/ConnectionManager/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:ConnectionManager:1#GetCurrentConnectionInfo';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetCurrentConnectionInfo xmlns:u="urn:schemas-upnp-org:service:ConnectionManager:1"><ConnectionID>' + ConnectionID + '</ConnectionID></u:GetCurrentConnectionInfo></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"RcsID":xmlDoc.getElementsByTagName("RcsID")[0].textContent, "AVTransportID":xmlDoc.getElementsByTagName("AVTransportID")[0].textContent, "ProtocolInfo":xmlDoc.getElementsByTagName("ProtocolInfo")[0].textContent, "PeerConnectionManager":xmlDoc.getElementsByTagName("PeerConnectionManager")[0].textContent, "PeerConnectionID":xmlDoc.getElementsByTagName("PeerConnectionID")[0].textContent, "Direction":xmlDoc.getElementsByTagName("Direction")[0].textContent, "Status":xmlDoc.getElementsByTagName("Status")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AVTransportSetAVTransportURI = function (callback, host, InstanceID, CurrentURI, CurrentURIMetaData) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#SetAVTransportURI';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetAVTransportURI xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><CurrentURI>' + Utils.escape(CurrentURI) + '</CurrentURI><CurrentURIMetaData>' + Utils.escape(CurrentURIMetaData) + '</CurrentURIMetaData></u:SetAVTransportURI></s:Body></s:Envelope>';
		CF.log("SOAPBody for SetURI is:" + SOAPBody);
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportAddURIToQueue = function (callback, host, InstanceID, EnqueuedURI, EnqueuedURIMetaData, DesiredFirstTrackNumberEnqueued, EnqueueAsNext) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#AddURIToQueue';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:AddURIToQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><EnqueuedURI>' + Utils.escape(EnqueuedURI) + '</EnqueuedURI><EnqueuedURIMetaData>' + Utils.escape(EnqueuedURIMetaData) + '</EnqueuedURIMetaData><DesiredFirstTrackNumberEnqueued>' + DesiredFirstTrackNumberEnqueued + '</DesiredFirstTrackNumberEnqueued><EnqueueAsNext>' + EnqueueAsNext + '</EnqueueAsNext></u:AddURIToQueue></s:Body></s:Envelope>';
		var url = host + url;
		CF.log("SOAPBody for AddURI is:" + SOAPBody);
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"FirstTrackNumberEnqueued":xmlDoc.getElementsByTagName("FirstTrackNumberEnqueued")[0].textContent, "NumTracksAdded":xmlDoc.getElementsByTagName("NumTracksAdded")[0].textContent, "NewQueueLength":xmlDoc.getElementsByTagName("NewQueueLength")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AVTransportAddMultipleURIsToQueue = function (callback, host, InstanceID, UpdateID, NumberOfURIs, EnqueuedURIs, EnqueuedURIsMetaData, ContainerURI, ContainerMetaData, DesiredFirstTrackNumberEnqueued, EnqueueAsNext) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#AddMultipleURIsToQueue';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:AddMultipleURIsToQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><UpdateID>' + UpdateID + '</UpdateID><NumberOfURIs>' + NumberOfURIs + '</NumberOfURIs><EnqueuedURIs>' + EnqueuedURIs + '</EnqueuedURIs><EnqueuedURIsMetaData>' + EnqueuedURIsMetaData + '</EnqueuedURIsMetaData><ContainerURI>' + ContainerURI + '</ContainerURI><ContainerMetaData>' + ContainerMetaData + '</ContainerMetaData><DesiredFirstTrackNumberEnqueued>' + DesiredFirstTrackNumberEnqueued + '</DesiredFirstTrackNumberEnqueued><EnqueueAsNext>' + EnqueueAsNext + '</EnqueueAsNext></u:AddMultipleURIsToQueue></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"FirstTrackNumberEnqueued":xmlDoc.getElementsByTagName("FirstTrackNumberEnqueued")[0].textContent, "NumTracksAdded":xmlDoc.getElementsByTagName("NumTracksAdded")[0].textContent, "NewQueueLength":xmlDoc.getElementsByTagName("NewQueueLength")[0].textContent, "NewUpdateID":xmlDoc.getElementsByTagName("NewUpdateID")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AVTransportReorderTracksInQueue = function (callback, host, InstanceID, StartingIndex, NumberOfTracks, InsertBefore, UpdateID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#ReorderTracksInQueue';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ReorderTracksInQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><StartingIndex>' + StartingIndex + '</StartingIndex><NumberOfTracks>' + NumberOfTracks + '</NumberOfTracks><InsertBefore>' + InsertBefore + '</InsertBefore><UpdateID>' + UpdateID + '</UpdateID></u:ReorderTracksInQueue></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportRemoveTrackFromQueue = function (callback, host, InstanceID, ObjectID, UpdateID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#RemoveTrackFromQueue';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RemoveTrackFromQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><ObjectID>' + ObjectID + '</ObjectID><UpdateID>' + UpdateID + '</UpdateID></u:RemoveTrackFromQueue></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportRemoveTrackRangeFromQueue = function (callback, host, InstanceID, UpdateID, StartingIndex, NumberOfTracks) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#RemoveTrackRangeFromQueue';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RemoveTrackRangeFromQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><UpdateID>' + UpdateID + '</UpdateID><StartingIndex>' + StartingIndex + '</StartingIndex><NumberOfTracks>' + NumberOfTracks + '</NumberOfTracks></u:RemoveTrackRangeFromQueue></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"NewUpdateID":xmlDoc.getElementsByTagName("NewUpdateID")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AVTransportRemoveAllTracksFromQueue = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#RemoveAllTracksFromQueue';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RemoveAllTracksFromQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:RemoveAllTracksFromQueue></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportSaveQueue = function (callback, host, InstanceID, Title, ObjectID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#SaveQueue';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SaveQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><Title>' + Title + '</Title><ObjectID>' + ObjectID + '</ObjectID></u:SaveQueue></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"AssignedObjectID":xmlDoc.getElementsByTagName("AssignedObjectID")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AVTransportBackupQueue = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#BackupQueue';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:BackupQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:BackupQueue></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportGetMediaInfo = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetMediaInfo';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetMediaInfo xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:GetMediaInfo></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"NrTracks":xmlDoc.getElementsByTagName("NrTracks")[0].textContent, "MediaDuration":xmlDoc.getElementsByTagName("MediaDuration")[0].textContent, "CurrentURI":xmlDoc.getElementsByTagName("CurrentURI")[0].textContent, "CurrentURIMetaData":xmlDoc.getElementsByTagName("CurrentURIMetaData")[0].textContent, "NextURI":xmlDoc.getElementsByTagName("NextURI")[0].textContent, "NextURIMetaData":xmlDoc.getElementsByTagName("NextURIMetaData")[0].textContent, "PlayMedium":xmlDoc.getElementsByTagName("PlayMedium")[0].textContent, "RecordMedium":xmlDoc.getElementsByTagName("RecordMedium")[0].textContent, "WriteStatus":xmlDoc.getElementsByTagName("WriteStatus")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AVTransportGetTransportInfo = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetTransportInfo';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetTransportInfo xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:GetTransportInfo></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CurrentTransportState":xmlDoc.getElementsByTagName("CurrentTransportState")[0].textContent, "CurrentTransportStatus":xmlDoc.getElementsByTagName("CurrentTransportStatus")[0].textContent, "CurrentSpeed":xmlDoc.getElementsByTagName("CurrentSpeed")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AVTransportGetPositionInfo = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetPositionInfo';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetPositionInfo xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:GetPositionInfo></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"Track":xmlDoc.getElementsByTagName("Track")[0].textContent, "TrackDuration":xmlDoc.getElementsByTagName("TrackDuration")[0].textContent, "TrackMetaData":xmlDoc.getElementsByTagName("TrackMetaData")[0].textContent, "TrackURI":xmlDoc.getElementsByTagName("TrackURI")[0].textContent, "RelTime":xmlDoc.getElementsByTagName("RelTime")[0].textContent, "AbsTime":xmlDoc.getElementsByTagName("AbsTime")[0].textContent, "RelCount":xmlDoc.getElementsByTagName("RelCount")[0].textContent, "AbsCount":xmlDoc.getElementsByTagName("AbsCount")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AVTransportGetDeviceCapabilities = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetDeviceCapabilities';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetDeviceCapabilities xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:GetDeviceCapabilities></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"PlayMedia":xmlDoc.getElementsByTagName("PlayMedia")[0].textContent, "RecMedia":xmlDoc.getElementsByTagName("RecMedia")[0].textContent, "RecQualityModes":xmlDoc.getElementsByTagName("RecQualityModes")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AVTransportGetTransportSettings = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetTransportSettings';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetTransportSettings xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:GetTransportSettings></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"PlayMode":xmlDoc.getElementsByTagName("PlayMode")[0].textContent, "RecQualityMode":xmlDoc.getElementsByTagName("RecQualityMode")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AVTransportGetCrossfadeMode = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetCrossfadeMode';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetCrossfadeMode xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:GetCrossfadeMode></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"CrossfadeMode":xmlDoc.getElementsByTagName("CrossfadeMode")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AVTransportStop = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#Stop';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Stop xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:Stop></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportPlay = function (callback, host, InstanceID, Speed) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#Play';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Play xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><Speed>' + Speed + '</Speed></u:Play></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportPause = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#Pause';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Pause xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:Pause></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportSeek = function (callback, host, InstanceID, Unit, Target) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#Seek';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Seek xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><Unit>' + Unit + '</Unit><Target>' + Target + '</Target></u:Seek></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportNext = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#Next';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Next xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:Next></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportNextProgrammedRadioTracks = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#NextProgrammedRadioTracks';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:NextProgrammedRadioTracks xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:NextProgrammedRadioTracks></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportPrevious = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#Previous';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:Previous xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:Previous></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportNextSection = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#NextSection';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:NextSection xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:NextSection></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportPreviousSection = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#PreviousSection';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:PreviousSection xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:PreviousSection></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportSetPlayMode = function (callback, host, InstanceID, NewPlayMode) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#SetPlayMode';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetPlayMode xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><NewPlayMode>' + NewPlayMode + '</NewPlayMode></u:SetPlayMode></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportSetCrossfadeMode = function (callback, host, InstanceID, CrossfadeMode) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#SetCrossfadeMode';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetCrossfadeMode xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><CrossfadeMode>' + CrossfadeMode + '</CrossfadeMode></u:SetCrossfadeMode></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportNotifyDeletedURI = function (callback, host, InstanceID, DeletedURI) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#NotifyDeletedURI';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:NotifyDeletedURI xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><DeletedURI>' + DeletedURI + '</DeletedURI></u:NotifyDeletedURI></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportGetCurrentTransportActions = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetCurrentTransportActions';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetCurrentTransportActions xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:GetCurrentTransportActions></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"Actions":xmlDoc.getElementsByTagName("Actions")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AVTransportBecomeCoordinatorOfStandaloneGroup = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#BecomeCoordinatorOfStandaloneGroup';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:BecomeCoordinatorOfStandaloneGroup xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:BecomeCoordinatorOfStandaloneGroup></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportBecomeGroupCoordinator = function (callback, host, InstanceID, CurrentCoordinator, CurrentGroupID, OtherMembers, TransportSettings, CurrentURI, CurrentURIMetaData, SleepTimerState, AlarmState, StreamRestartState, CurrentQueueTrackList) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#BecomeGroupCoordinator';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:BecomeGroupCoordinator xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><CurrentCoordinator>' + CurrentCoordinator + '</CurrentCoordinator><CurrentGroupID>' + CurrentGroupID + '</CurrentGroupID><OtherMembers>' + OtherMembers + '</OtherMembers><TransportSettings>' + TransportSettings + '</TransportSettings><CurrentURI>' + CurrentURI + '</CurrentURI><CurrentURIMetaData>' + CurrentURIMetaData + '</CurrentURIMetaData><SleepTimerState>' + SleepTimerState + '</SleepTimerState><AlarmState>' + AlarmState + '</AlarmState><StreamRestartState>' + StreamRestartState + '</StreamRestartState><CurrentQueueTrackList>' + CurrentQueueTrackList + '</CurrentQueueTrackList></u:BecomeGroupCoordinator></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportBecomeGroupCoordinatorAndSource = function (callback, host, InstanceID, CurrentCoordinator, CurrentGroupID, OtherMembers, CurrentURI, CurrentURIMetaData, SleepTimerState, AlarmState, StreamRestartState, CurrentAVTTrackList, CurrentQueueTrackList, CurrentSourceState, ResumePlayback) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#BecomeGroupCoordinatorAndSource';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:BecomeGroupCoordinatorAndSource xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><CurrentCoordinator>' + CurrentCoordinator + '</CurrentCoordinator><CurrentGroupID>' + CurrentGroupID + '</CurrentGroupID><OtherMembers>' + OtherMembers + '</OtherMembers><CurrentURI>' + CurrentURI + '</CurrentURI><CurrentURIMetaData>' + CurrentURIMetaData + '</CurrentURIMetaData><SleepTimerState>' + SleepTimerState + '</SleepTimerState><AlarmState>' + AlarmState + '</AlarmState><StreamRestartState>' + StreamRestartState + '</StreamRestartState><CurrentAVTTrackList>' + CurrentAVTTrackList + '</CurrentAVTTrackList><CurrentQueueTrackList>' + CurrentQueueTrackList + '</CurrentQueueTrackList><CurrentSourceState>' + CurrentSourceState + '</CurrentSourceState><ResumePlayback>' + ResumePlayback + '</ResumePlayback></u:BecomeGroupCoordinatorAndSource></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportChangeCoordinator = function (callback, host, InstanceID, CurrentCoordinator, NewCoordinator, NewTransportSettings) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#ChangeCoordinator';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ChangeCoordinator xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><CurrentCoordinator>' + CurrentCoordinator + '</CurrentCoordinator><NewCoordinator>' + NewCoordinator + '</NewCoordinator><NewTransportSettings>' + NewTransportSettings + '</NewTransportSettings></u:ChangeCoordinator></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportChangeTransportSettings = function (callback, host, InstanceID, NewTransportSettings, CurrentAVTransportURI) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#ChangeTransportSettings';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ChangeTransportSettings xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><NewTransportSettings>' + NewTransportSettings + '</NewTransportSettings><CurrentAVTransportURI>' + CurrentAVTransportURI + '</CurrentAVTransportURI></u:ChangeTransportSettings></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportConfigureSleepTimer = function (callback, host, InstanceID, NewSleepTimerDuration) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#ConfigureSleepTimer';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:ConfigureSleepTimer xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><NewSleepTimerDuration>' + NewSleepTimerDuration + '</NewSleepTimerDuration></u:ConfigureSleepTimer></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportGetRemainingSleepTimerDuration = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetRemainingSleepTimerDuration';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetRemainingSleepTimerDuration xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:GetRemainingSleepTimerDuration></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"RemainingSleepTimerDuration":xmlDoc.getElementsByTagName("RemainingSleepTimerDuration")[0].textContent, "CurrentSleepTimerGeneration":xmlDoc.getElementsByTagName("CurrentSleepTimerGeneration")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AVTransportRunAlarm = function (callback, host, InstanceID, AlarmID, LoggedStartTime, Duration, ProgramURI, ProgramMetaData, PlayMode, Volume, IncludeLinkedZones) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#RunAlarm';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:RunAlarm xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><AlarmID>' + AlarmID + '</AlarmID><LoggedStartTime>' + LoggedStartTime + '</LoggedStartTime><Duration>' + Duration + '</Duration><ProgramURI>' + ProgramURI + '</ProgramURI><ProgramMetaData>' + ProgramMetaData + '</ProgramMetaData><PlayMode>' + PlayMode + '</PlayMode><Volume>' + Volume + '</Volume><IncludeLinkedZones>' + IncludeLinkedZones + '</IncludeLinkedZones></u:RunAlarm></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportStartAutoplay = function (callback, host, InstanceID, ProgramURI, ProgramMetaData, Volume, IncludeLinkedZones, ResetVolumeAfter) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#StartAutoplay';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:StartAutoplay xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><ProgramURI>' + ProgramURI + '</ProgramURI><ProgramMetaData>' + ProgramMetaData + '</ProgramMetaData><Volume>' + Volume + '</Volume><IncludeLinkedZones>' + IncludeLinkedZones + '</IncludeLinkedZones><ResetVolumeAfter>' + ResetVolumeAfter + '</ResetVolumeAfter></u:StartAutoplay></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}


	self.AVTransportGetRunningAlarmProperties = function (callback, host, InstanceID) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#GetRunningAlarmProperties';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:GetRunningAlarmProperties xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID></u:GetRunningAlarmProperties></s:Body></s:Envelope>';
		var url = host + url;
		CF.request(url, 'POST', {'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
			if (status == 200) {
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(body, 'text/xml');
				callback({"AlarmID":xmlDoc.getElementsByTagName("AlarmID")[0].textContent, "GroupID":xmlDoc.getElementsByTagName("GroupID")[0].textContent, "LoggedStartTime":xmlDoc.getElementsByTagName("LoggedStartTime")[0].textContent})
			}
			else {
				CF.log('POST failed with status ' + status);
			}
		});
	}


	self.AVTransportSnoozeAlarm = function (callback, host, InstanceID, Duration) {
		var url = '/MediaRenderer/AVTransport/Control';
		var SOAPAction = 'urn:schemas-upnp-org:service:AVTransport:1#SnoozeAlarm';
		var SOAPBody = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SnoozeAlarm xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>' + InstanceID + '</InstanceID><Duration>' + Duration + '</Duration></u:SnoozeAlarm></s:Body></s:Envelope>';
		self.sendSoapRequest(url, host, SOAPBody, SOAPAction, callback);
	}

	/*
	 ===============================================================================


	 =========================================================================
	 END

	 =========================================================================
	 */


	return self;
};

CF.modules.push({
	                name   :"Sonos Player", // the name of the module (mostly for display purposes)
	                object :SonosPlayer, // the object to which the setup function belongs ("this")
	                version:1.0                // An optional module version number that is displayed in the Remote Debugger
                });