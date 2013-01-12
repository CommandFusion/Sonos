/* Sonos Viewer for CommandFusion
 ===============================================================================

 AUTHOR:	Simon Post
 CONTACT:	simon.post@mac.com
 VERSION:	v0.0.1

 =========================================================================
 HELP:

 This script handles music sources

 =========================================================================
 */

// ======================================================================
// Global Object
// ======================================================================

var SonosMusicSources = function () {
    var self = {
        musicServicesTopList: [{sourceName: "Music Library", sourceRes: "", sourceArt:"", sourceID: "", sourceParentID: "", sourceClass: ""},
            {sourceName: "Docked iPods", sourceRes: "", sourceArt:"", sourceID: "", sourceParentID: "", sourceClass: ""},
            {sourceName: "Radio", sourceRes: "", sourceArt:"", sourceID: "", sourceParentID: "", sourceClass: ""},
            {sourceName: "Last.FM", sourceRes: "", sourceArt:"", sourceID: "", sourceParentID: "", sourceClass: ""},
            {sourceName: "Spotify", sourceRes: "", sourceArt:"", sourceID: "", sourceParentID: "", sourceClass: ""},
            {sourceName: "Sonos Playlists", sourceRes: "", sourceArt:"", sourceID: "", sourceParentID: "", sourceClass: ""},
            {sourceName: "Line In", sourceRes: "", sourceArt:"", sourceID: "", sourceParentID: "", sourceClass: ""}
        ],
                // musicServicesTopList: [{s514: "Music Library"}, {s514: "Docked iPods"}, {s514: "Radio"}, {s514: "Last.FM"}, {s514: "Spotify"}, {s514: "Sonos Playlists"}, {s514: "Line In"}],
        lastFMTopList: [{s514: "Tag Radio"}, {s514: "Recent Stations"}, {s514: "My Stations"}],
        lastFMMyStations: [{s514: "Library"}, {s514: "Neighbourhood"}, {s514: "Recomendations"}],
        lastFMTopTags:[],
        lastFMRecentStations: [],
	    musicSourceType: "",
	    musicSourceParentID: "",
	    musicSourceGrandParentID: "",
	    musicSourceDisplayID: "",
	    musicSourceLevel: 0,
	    musicSourceList: [],
	    musicSourceTrackLevel: false,
	    musicSourceLevelQuery: [],
	    spotifySessionID: "",
        spotifyUserID: "",  // put your Spotify ID here
	    musicSourceDeviceID: "00-0E-58-28-3B-D4:8",
	    musicSourceProvider: "Sonos",
	    musicSourceListIndex: 0,
        musicSourceRowsToReturn: 30,
        musicSourceNumberReturned: 0,
        currentPlayer: {},
        metaDataHeader: '<DIDL-Lite xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:upnp="urn:schemas-upnp-org:metadata-1-0/upnp/" xmlns:r="urn:schemas-rinconnetworks-com:metadata-1-0/" xmlns="urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/">',
        metaDataFooter: '</DIDL-Lite>',
        zoneGroupNotificationCallback:sonosGUI.processNotificationEvent // used to point to the CF system that is handling notification messages for this player

    }
	// ----------------------------------------------------------------------------
	// Functions that handle selection of the music sources.  Currently we can only
	// handle normal libraries, Spotify, Last.FM, Radio, Sonos Playlists and Line In
	// ----------------------------------------------------------------------------

	self.init = function () {
        //self.getLastFMTopTags();
        //self.getLASTMFRecentStations();
        self.setUpAndDisplayTopMenu();

    }
    // Gets the SPotify session ID which is need to communicate with the server

    self.getSpotifySessionID = function (){
        self.currentPlayer.MusicServicesGetSessionId(self.processSpotifySessionID, 9, self.spotifyUserID)
    }

    self.processSpotifySessionID = function(response) {
        self.spotifySessionID = response.SessionId;
    }

    self.setUpAndDisplayTopMenu = function (){
        self.musicSourceList = self.musicServicesTopList;
        if (self.zoneGroupNotificationCallback !== null) {
            self.zoneGroupNotificationCallback("ReplaceMusicSources", self.musicSourceList);  // process this message in the GUI layer
        }

    }

    self.selectMusicSource = function (join, list, listIndex) {
		self.currentPlayer = sonosGUI.getCurrentPlayer();
        self.getSpotifySessionID();
        //CF.logObject(self.currentPlayer);
        self.musicSourcePressed = true;  // Used to stop any long queues we might be processing
		CF.log("The list index is :" + listIndex);
        if (self.musicSourceLevel == 0) { // We are at the top level menu
            self.musicSourceList = [];
            if (self.zoneGroupNotificationCallback !== null) {
                self.zoneGroupNotificationCallback("ClearMusicSources", "");  // process this message in the GUI layer
            }
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
            if (self.zoneGroupNotificationCallback !== null) {
                self.zoneGroupNotificationCallback("ShowMusicSourceActions", self.RINCON);  // process this message in the GUI layer
            }
			//self.showMusicSourceActions();
			return
		}
		// this time we want to do different things depending upon the music source as handling sonos, radio etc is different form handling music library

		// if we are not at the top level of the source, set the source we are going to look for as the source of the selected item in the list
		if (self.musicSourceList.length > 0) {self.musicSourceDisplayID = self.musicSourceList[listIndex].sourceID};
		self.tmpFirstRecord = []  // clear the array used to handle 'All' functionality
		self.tmpFirstRecord[0]=self.musicSourceList[listIndex];  // set the top of the list as the list item pushed
		self.musicSourceList = [];  // clear the music source list in preparation for repopulating
        if (self.zoneGroupNotificationCallback !== null) {
            self.zoneGroupNotificationCallback("ClearMusicSources", "");  // process this message in the GUI layer
        }
        //CF.listRemove("l13");  // empty the UI list
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
						//CF.listRemove("l13");
						//CF.listAdd("l13", self.lastFMTopList);
						self.musicSourceList = self.lastFMTopList;
                        break;

					case 2: // We are at a lower level and what we do depends upon listIndex
						switch (listIndex) {
							case 0: // Tag Radio was selected
								self.musicSourceTrackLevel = true;  //  tell it that we are at track level as it will need different behaviour on clicking.
								self.musicSourceList = self.cloneObject(self.lastFMTopTags);
								//CF.listRemove("l13");
								// now we have to populate the list
								for (i=0; i < self.musicSourceList.length; i++) {
                                    self.musicSourceDisplayArray.push({s513: self.musicSourceList[i].sourceArt, s514: self.musicSourceList[i].sourceName});
									// CF.listAdd("l13", [{s513: self.musicSourceList[i].sourceArt, s514: self.musicSourceList[i].sourceName}]);
								}
								//CF.listRemove("l13");
								//CF.listAdd("l13", self.lastFMTopTags);
								break;
							case 1: // Recent Stations was selected
								self.musicSourceTrackLevel = true;  //  tell it that we are at track level as it will need different behaviour on clicking.
								self.musicSourceList = self.cloneObject(self.lastFMRecentStations);
								//CF.listRemove("l13");
								// now we have to populate the list
								for (i=0; i < self.musicSourceList.length; i++) {
                                    //self.musicSourceList.push({s513: self.musicSourceList[i].sourceArt, s514: self.musicSourceList[i].sourceName});
									//CF.listAdd("l13", [{s513: self.musicSourceList[i].sourceArt, s514: self.musicSourceList[i].sourceName}]);
								}
								//CF.listRemove("l13");
								//CF.listAdd("l13", self.lastFMRecentStations);
								break;
							case 2: // My Stations was selected
								self.musicSourceTrackLevel = true;  //  tell it that we are at track level as it will need different behaviour on clicking.
								//CF.listRemove("l13");
								//CF.listAdd("l13", self.lastFMMyStations);
                                self.musicSourceList = self.lastFMMyStations;
                                self.musicSourceList.push({sourceName: "LIBRARY", sourceRes: res, sourceArt:"", sourceID: title, sourceParentID: "RECENT", sourceClass: "LastFM"});
								self.musicSourceList.push({sourceName: "NEIGHBOURHOOD", sourceRes: res, sourceArt:"", sourceID: title, sourceParentID: "RECENT", sourceClass: "LastFM"});
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
		//CF.listRemove("l13");
		self.musicSourceNumberReturned = 0; // Clear the number of items in the current list
		if (self.musicSourceLevel == 0) {
            self.setUpAndDisplayTopMenu();
			//CF.listAdd("l13", self.musicServicesTopList);
		}
		else {
			self.musicSourceLevel--;	// we must be somewhere down the tree so add one to the source level
			self.selectMusicSource("","", self.musicSourceType);
		}
	}

	self.getMusicSourceForLibrary = function () {
        CF.log("the music source diaply id is: " + self.musicSourceDisplayID);
        self.currentPlayer.ContentDirectoryBrowse(self.processGetMusicSourceForLibrary, self.musicSourceDisplayID, "BrowseDirectChildren", "dc:title,res,dc:creator,upnp:artist,upnp:album,upnp:albumArtURI", self.musicSourceNumberReturned, self.musicSourceRowsToReturn, "")

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
			self.musicSourceList.push({sourceName: title, sourceRes: res, sourceArt: self.currentPlayer.host + art, sourceID: newDisplayID, sourceParentID: parentID, sourceClass: upnpClass});
		}
		//self.populateMusicSourceListBox(self.musicSourceNumberReturned);
        CF.log("Got here");
        //CF.logObject(self.musicSourceList);
        if (self.zoneGroupNotificationCallback !== null) {
            self.zoneGroupNotificationCallback("AppendMusicSources", self.musicSourceList, self.musicSourceNumberReturned);  // process this message in the GUI layer
        }
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
			if (self.musicSourceNumberReturned <100){
                self.musicSourceList[0].sourceName = "All";

            }
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
		//self.populateMusicSourceListBox(self.musicSourceNumberReturned);
        if (self.zoneGroupNotificationCallback !== null) {
            self.zoneGroupNotificationCallback("AppendMusicSources", self.musicSourceList, self.musicSourceNumberReturned);  // process this message in the GUI layer
        }
		self.musicSourceNumberReturned = self.musicSourceNumberReturned + parseInt(spotifyNumberReturned);
	}

	self.getMusicSourceRadio = function () {
		self.retrieveMusicFromRadio(self.processGetMusicSourceRadio, self.musicSourceDeviceID, self.musicSourceProvider, self.musicSourceDisplayID, self.musicSourceNumberReturned, self.musicSourceRowsToReturn)

	}

	self.processGetMusicSourceRadio = function (body) {
		body = Utils.unescape(body);
		body = Utils.unescape(body);
		//CF.log("Radio response is: " + body);
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
		//self.populateMusicSourceListBox(self.musicSourceNumberReturned);
        if (self.zoneGroupNotificationCallback !== null) {
            self.zoneGroupNotificationCallback("AppendMusicSources", self.musicSourceList, self.musicSourceNumberReturned);  // process this message in the GUI layer
        }
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
		self.currentPlayer.AVTransportSetAVTransportURI(self.musicSourcePlayNow1(), 0, "x-rincon-queue:" + self.currentPlayer.RINCON + "#0", "");
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
			self.currentPlayer.AVTransportAddURIToQueue(self.sendPlayPostSetAVTransport, 0, enqueuedURI, enqueuedURIMetaData, 0, 1);
			return;
		}

		if (self.musicSourceList[self.musicSourceListIndex].sourceClass == "object.container.playlistContainer.sameArtist") {
			// It is a librray item of type All
			// self.AVTransportAddURIToQueue(self.processTransportEventAddURItoQueue, self.currentHost, 0, "x-rincon-playlist:" + self.currentPlayer.RINCON + '#' + sourceToAdd, EnqueuedURIMetaData, DesiredFirstTrackNumberEnqueued, EnqueueAsNext)
			CF.log("Got an All library Item");
			enqueuedURI = "x-rincon-playlist:" + self.currentPlayer.RINCON + '#' + sourceToAdd
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
			self.currentPlayerAVTransportSetAVTransportURI(self.sendPlayPostSetAVTransport, 0, currentURI, currentURIMetaData);
			return;
		}
		if (self.musicSourceList[self.musicSourceListIndex].sourceClass == "object.item.audioItem.audioBroadcast") {
			// Must be a radio item.  Since you can't queue radio we call SETAVTransport not AddURIToQueue
			CF.log("Got a Radio Item");
			var currentURI = "x-sonosapi-stream:" + sourceToAdd + "?sid=254&flags=32";
			var currentURIMetaData = self.metaDataHeader + '<item id="F00090020' + self.musicSourceList[self.musicSourceListIndex].sourceID + '" parentID="F00080064' + self.musicSourceList[self.musicSourceListIndex].sourceParentID.replace(/:/g, "%3a") + '" restricted="true"><dc:title>' + self.musicSourceList[self.musicSourceListIndex].sourceName + '</dc:title><upnp:class>object.item.audioItem.audioBroadcast</upnp:class><desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">SA_RINCON65031_</desc></item></DIDL-Lite>';
			self.currentPlayer.AVTransportSetAVTransportURI(self.sendPlayPostSetAVTransport, 0, currentURI, currentURIMetaData);
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
		self.currentPlayer.AVTransportAddURIToQueue(self.sendPlayPostSetAVTransport, 0, enqueuedURI, enqueuedURIMetaData, 0, 1);
		return;
	}

    self.musicSourcePlayNext  = function () {

    }

	self.sendPlayPostSetAVTransport = function (){
		CF.log("Process play");
		//CF.setJoin("d130",0)
		self.currentPlayer.AVTransportPlay("", 0, 1)

	}

	self.musicSourceAddToQueue = function() {
		self.currentPlayer.AVTransportSetAVTransportURI(self.musicSourcePlayNow1(), 0, "x-rincon-queue:" + self.currentPlayer.RINCON + "#0", "");

	}

	self.musicSourceReplaceQueue = function () {
		self.transportEventRemoveAllTracks();
		self.musicSourceAddToQueue();
	}

    self.transportEventRemoveAllTracks = function () {
        self.currentPlayer.AVTransportRemoveAllTracksFromQueue(self.getQueueForCurrentZone, 0);
        self.currentPlayer.getQueueForCurrentZone();

    }



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
 /*   self.subscribeSonosEvents = function(ipaddr, path, subURL) {
        var msg = "POST http://spotify.west.sonos-ws-eu.com/smapi HTTP/1.1\x0D\x0A";
        msg += "HOST: spotify.west.sonos-ws-eu.com\x0D\x0A";
        msg += "USER-AGENT: Linux UPnP/1.0 Sonos/16.7-48310 (PCDCR)\x0D\x0A";
        msg += "SOAPACTION: "http://www.sonos.com/Services/1.1#getMetadata\x0D\x0A";
        msg += "Content-Length: 445\x0D\x0A\x0D\x0A";
        msg += '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><credentials xmlns="http://www.sonos.com/Services/1.1"><deviceId>00-0E-58-28-3B-D4:8</deviceId><deviceProvider>Sonos</deviceProvider><sessionId>OKf4W1Y+Lmp/dRaFevzptAZFDRbkz8GAkyPVZQCRDnk=</sessionId></credentials></s:Header><s:Body><getMetadata xmlns="http://www.sonos.com/Services/1.1"><id>root</id><index>0</index><count>100</count></getMetadata></s:Body></s:Envelope>'


        self.subscribeCommands.push(msg);
        self.subscribeMsgSend();
    };*/
    self.retrieveMusicFromSpotify = function (callback, DeviceID, DeviceProvider, SessionID, ItemID, StartingIndex, RequestedCount)  {
        var host = "http://spotify.west.sonos-ws-eu.com";
        var url = '/smapi';
        var SOAPAction = '"http://www.sonos.com/Services/1.1#getMetadata"';
        //var SOAPBody = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><credentials xmlns="http://www.sonos.com/Services/1.1"><deviceId>00-0E-58-28-3B-D4:8</deviceId><deviceProvider>Sonos</deviceProvider><sessionId>OKf4W1Y+Lmp/dRaFevzptAZFDRbkz8GAkyPVZQCRDnk=</sessionId></credentials></s:Header><s:Body><getMetadata xmlns="http://www.sonos.com/Services/1.1"><id>root</id><index>0</index><count>100</count></getMetadata></s:Body></s:Envelope>';
        var SOAPBody = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><credentials xmlns="http://www.sonos.com/Services/1.1">'+
            '<deviceId>' + DeviceID + '</deviceId><deviceProvider>' + DeviceProvider + '</deviceProvider><sessionId>' + SessionID +
            '</sessionId></credentials></s:Header><s:Body><getMetadata xmlns="http://www.sonos.com/Services/1.1"><id>' + ItemID +
            '</id><index>' + StartingIndex + '</index><count>' + RequestedCount + '</count></getMetadata></s:Body></s:Envelope>';

        var url = host + url;
        //CF.log("url is: " + url);
        //CF.log("SOAPAction is : " + SOAPAction);
        //CF.log("SOAP Body is: " + SOAPBody + "\r\n");
        CF.request( url, 'POST', {'ACCEPT-ENCODING': 'gzip', 'ACCEPT-LANGUAGE': 'en-US', 'USER-AGENT': 'Linux UPnP/1.0 Sonos/19.4-59140 (MDCR_iMac12,2)', 'CONTENT-TYPE': 'text/xml; charset="utf-8"', 'SOAPAction': SOAPAction}, SOAPBody, function(status, headers, body) {
            if (status == 200) {
                //CF.log("Spotify response is: " + body)
                callback(  body )
            }
            else {
                CF.log('POST failed with status ' + status);
            }
        });
/*        var msg = "POST /smapi HTTP/1.1\x0D\x0A";
        msg += "CONNECTION: close\x0D\x0A";
        msg += "ACCEPT-ENCODING: gzip\x0D\x0A";
        msg += "HOST: spotify.west.sonos-ws-eu.com\x0D\x0A";
        msg += "USER-AGENT: Linux UPnP/1.0 Sonos/19.4-59140 (MDCR_iMac12,2)\x0D\x0A";
        msg += "Content-Length: 445\x0D\x0A";
        msg += 'CONTENT-TYPE: text/xml; charset="utf-8"\x0D\x0A';
        msg += 'ACCEPT-LANGUAGE: en-US\x0D\x0A';
        msg += 'SOAPACTION: "http://www.sonos.com/Services/1.1#getMetadata"\x0D\x0A';
        msg += "\x0D\x0A";
        msg += '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><credentials xmlns="http://www.sonos.com/Services/1.1"><deviceId>00-0E-58-28-3B-D4:8</deviceId><deviceProvider>Sonos</deviceProvider><sessionId>OKf4W1Y+Lmp/dRaFevzptAZFDRbkz8GAkyPVZQCRDnk=</sessionId></credentials></s:Header><s:Body><getMetadata xmlns="http://www.sonos.com/Services/1.1"><id>root</id><index>0</index><count>100</count></getMetadata></s:Body></s:Envelope>';
        CF.send("SendToSpotify", msg);*/


    }
    //<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><credentials xmlns="http://www.sonos.com/Services/1.1"><deviceId>00-0E-58-28-3B-D4:8</deviceId><deviceProvider>Sonos</deviceProvider><sessionId>OKf4W1Y+Lmp/dRaFevzptAZFDRbkz8GAkyPVZQCRDnk=</sessionId></credentials></s:Header><s:Body><getMetadata xmlns="http://www.sonos.com/Services/1.1"><id>root</id><index>0</index><count>100</count></getMetadata></s:Body></s:Envelope>
    //<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><credentials xmlns="http://www.sonos.com/Services/1.1"><deviceId>00-0E-58-28-3B-D4:8</deviceId><deviceProvider>Sonos</deviceProvider><sessionId>OKf4W1Y+Lmp/dRaFevzptAZFDRbkz8GAkyPVZQCRDnk=</sessionId></credentials></s:Header><s:Body><getMetadata xmlns="http://www.sonos.com/Services/1.1"><id>root</id><index>0</index><count>30</count></getMetadata></s:Body></s:Envelope
    self.retrieveMusicFromRadio = function (callback, DeviceID, DeviceProvider, ItemID, StartingIndex, RequestedCount)  {
        var host = "http://legato.radiotime.com";
        var url = '/Radio.asmx';
        var SOAPAction = '"http://www.sonos.com/Services/1.1#getMetadata"';
        var SOAPBody = '<?xml version="1.0" encoding="us-ascii"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header>'+
            '<credentials xmlns="http://www.sonos.com/Services/1.1"><deviceId>' + DeviceID + '</deviceId><deviceProvider>'
            + DeviceProvider + '</deviceProvider></credentials></s:Header><s:Body><getMetadata xmlns="http://www.sonos.com/Services/1.1"><id>'
            + ItemID + '</id><index>'+ StartingIndex +'</index><count>'+ RequestedCount + '</count></getMetadata></s:Body></s:Envelope>';
        var url = host + url;
        //CF.log("url is: " + url);
        //CF.log("SOAPAction is : " + SOAPAction);
        //CF.log("SOAP Body is: " + SOAPBody);
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
	/*
	 ===============================================================================


	 =========================================================================
	 END

	 =========================================================================
	 */

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

    return self;
}


CF.modules.push({
    name:"SonosMusicSources", // the name of the module (mostly for display purposes)
    object:SonosMusicSources, // the object to which the setup function belongs ("this")
    version:1.0    // An optional module version number that is displayed in the Remote Debugger
});