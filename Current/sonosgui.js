/* Sonos Viewer for CommandFusion
 ===============================================================================

 AUTHOR:	Simon Post
 CONTACT:	simon.post@mac.com
 VERSION:	v0.0.1

 =========================================================================
 HELP:

 This script controls the sonos GUI.  The GUI itself is abstracted out through
 the various join variables which represent an object in the GUI

 =========================================================================
 */

// ======================================================================
// Global Object
// ======================================================================

var SONOS_GUI = function () {
    var self = {
        // XBMC Instance
        joinBtnPlay:'d10',
        joinBtnPrevious:'d11',
        joinBtnNext:'d12',
        joinBtnMute:'d13',
        joinBtnRepeat:'d14',
        joinBtnShuffle:'d15',
        joinBtnSettings:'d16',
        joinBtnMusicBack:'d17',
        joinBtnVolDown:'d18',
        joinBtnVolUp:'d19',
        joinSliderAnalVol:'a20',
        joinSliderDigVol:'d21',
        joinSliderAnalTime:'a22',
        joinSliderDigTime:'d23',
        joinTxtNowPlayingAlbum:'s24',
        joinTxtNowPlayingArtist:'s25',
        joinTxtTimeToEnd:'s26',
        joinTxtTimeLeft:'s27',
        joinBtnTxtZoneList:'28',
        joinBtnDigZoneList:'d29',
        joinImgZoneList:'s30',
        joinBtnZoneGroup:'d31',
        joinBtnZoneMusicPlay:'d32',
        joinBtnTxtZoneMusicText:'d33',
        joinBtnDigZoneMusicText:'d34',
        joinBtnTxtQueueItemSong:'d35',
        joinBtnDigQueueItemSong:'d36',
        joinBtnTxtQueueItemArtist:'d37',
        joinBtnDigQueueItemArtist:'d38',
        joinImgQueueAlbumIcon:'s39',
        joinBtnCrossfade:'d40',
        joinListZones:'l41',
        subpagePopupZones:'d42',
        joinBtnTxtZoneGrouping:'s43',
        joinBtnDigZoneGrouping:'d44',
        joinBtnGroupInclude:'d45',
        joinListChangeZoneGrouping:'l46',
        joinTxtZoneCoordinatorHidden:'s47',
        joinListQueue:"l48",
        joinTxTQueueTrackNo:"s49",
        subpageQueueActions:"d50",
        joinBtnQueuePlayTrack:"d51",
        joinBtnQueueRemoveTrack:"d52",
	    joinTxtNowPlayingSong: "s53",
	    joinImgNowPlayingArt: "s54",
	    joinTxtNowPlayingNextSong: "s55",
        subpageZoneGroupCoordinatorList:'zone_group_coordinator_list',
        subpageZoneGroupMemberList:'zone_group_member_list',
        subpageZoneGroupMusicist:'zone_group_music_list',
        playerListGUI:{},
        currentSelectedRINCON:"", // holds the RINCON of the current selected player so that commands can be sent to it
        discoveredPlayerList:{}, // variable to hold the list of discovered players for use by the GUI
        zoneCoordinators:[], // Array of all the zoneCoordinators which we will sort alphabetically
        zoneMembers:[],
        zoneDisplay:[], // Array of zoneMembers which we will sort alphabetically
        selectedZoneCoordinatorForGrouping:"",
        selectedZoneCoordinator:"Not Set",
        queueSelectedItemTrackNumber:0

    };

    self.init = function () {
        // this function gets the list of players by calling the sonosPlayers init function
        // it uses a call back mechanism so that as new players are discovered the GUI variable
        // holding the players is updated.  This will make it easier to handle the refresh of the
        // player list when we have to resubscribe and/or when new players are added to the Sonos
        // set up

        CF.log("Commencing initialisation of Sonos GUI");
        CF.log("Finding Players");
        var sonosPlayers = new SonosPlayers();
        sonosPlayers.sonosPlayersCallback = self.setDiscoveredPlayerlist;
        sonosPlayers.init();
        //CF.log("Creating sonos group handling functions");

    };

    self.setDiscoveredPlayerlist = function (playerList) {
        CF.log("A new player was discovered and added to the GUI player list");
        self.discoveredPlayerList = playerList;
        //CF.log("discoverPLayerList is:\n");
        //CF.logObject(self.discoveredPlayerList);
    };

    // This function is called by each of the individual players via a callback when they get an event that the GUI
    // will need to respond to.  The notification type is used to determine what the type of notification the GUI needs
    // to handle is and the notificationObj will vary depending upon the notification type

    self.processNotificationEvent = function (notificationType, notificationObj) {
        //CF.log("Processing a notifcation in the GUI");
        switch (notificationType) {
            // ZoneGroup will be sent by a player when it has received a zone grouping notification change, i.e
            // there has been a change in the zone grouping that the GUI needs to respond to
            case "ZoneGroupEvent":
                CF.log("Got a zone group event at the GUI level");
                self.processZoneGroupChange(notificationObj);
                break;
            case "VolumeEvent":
                CF.log("Got a volume event at the GUI level");
                self.processVolumeChange(notificationObj);
                break;
	        case "TransportEvent":
		        CF.log("Got a transport event at the GUI level");
		        self.processTransportChange(notificationObj);
		        break;
	        case "PlayerTransportStateChange":
		        CF.log("Got a player state change at the GUI level");
		        self.processTransportChange(notificationObj);
		        break;

	        default:
                CF.log("Invalid GUI notification type");
        }
    };

	/*
	 ===============================================================================


	 =========================================================================
	 NOTES:

	 Processes transport event messages.  The Player object that received the transport event sends it RINCON
	 and this routine will then update the now playing info if the current selected RINCON is the same

	 =========================================================================
	 */

	self.processTransportChange = function (notificationObj) {
		if (self.selectedZoneCoordinator != "Not Set") {
			CF.log("The zone which got the transport event is: " + self.discoveredPlayerList[notificationObj].roomName);
			if (self.selectedZoneCoordinator === notificationObj) {
				CF.log("The selected zone had a transport event");
				self.updateNowPlayingGUI();
			}
		}

	};

	self.updateNowPlayingGUI = function () {
		CF.log("Current song is: " + self.discoveredPlayerList[self.selectedZoneCoordinator].currentTrackName);
		CF.setJoin(self.joinTxtNowPlayingArtist, self.discoveredPlayerList[self.selectedZoneCoordinator].currentTrackArtist);
		CF.setJoin(self.joinTxtNowPlayingAlbum, self.discoveredPlayerList[self.selectedZoneCoordinator].currentTrackAlbum);
		CF.setJoin(self.joinTxtNowPlayingSong, self.discoveredPlayerList[self.selectedZoneCoordinator].currentTrackName);
		CF.setJoin(self.joinImgNowPlayingArt, self.discoveredPlayerList[self.selectedZoneCoordinator].currentTrackAlbumArtAddr);
		CF.setJoin(self.joinTxtNowPlayingNextSong, self.discoveredPlayerList[self.selectedZoneCoordinator].nextTrackName + " - " + self.discoveredPlayerList[self.selectedZoneCoordinator].nextTrackAlbum);



	};

	/*
	 ===============================================================================


	 =========================================================================
	 NOTES:

	 Processes zone group messages and creates the zoneDisplay array which is used to show both the groups in the UI
	 but also for other things like the Volume UI, etc

	 =========================================================================
	 */

    // Process notify messages from Sonos. Gets sent the message by the individual players when they receive it

    self.processZoneGroupChange = function (notificationObj) {
        if (!self.userZoneGroupingUnderway) { // this is set if a user is doing a zone grouping so that we dont process any zone changes which would mess up the zonesGrouping array
            self.userZoneGroupingUnderway = true; // stop another message being processed half way through
            self.currentZoneGroupStructure = {};  // Clear current grouping
            // We need a tmp copy because we have info like current track etc in the array which we will want to put
            // back into the new new zone group array once it has been built (this info does not come in
            // the zone notify message
            var zoneCoordinatorRINCON = ""; // will hold the coordinator of the current grouped zones
            //var zoneCoordinatorName = "";  // Zone coordinator name which we use to make sorting easier
            self.zoneMembers = [];
            self.zoneDisplay = [];
            //CF.log("Zone msg is: " + notificationObj)
            var groupNodes = jQuery(notificationObj).find("ZoneGroup"); //find all the ZoneGroups
            for (var i = 0; i < groupNodes.length; i++) { // loop around for the number of grouped zones
                var numZoneMembers = groupNodes[i].childNodes.length;  // get how many zone members there are: 1 = zone is not grouped, >1 is in group but bear in mind some maybe Invisible like a sub woofer (Anvil)
                if (numZoneMembers == 1 && groupNodes[i].childNodes[0].hasAttribute("Invisible")) {  //all devices such as wireless docks, subs etc carry an invisible flag that we can use to exclude them from the zone group
                    continue;
                }
                zoneCoordinatorRINCON = groupNodes[i].attributes["Coordinator"].value;  //  get the UUID of the coordinator of the zone
                //self.zoneCoordinators.push({RINCON:zoneCoordinatorRINCON, roomName:zoneCoordinatorName})
                //CF.log("zoneCoordinatorName is: " + zoneCoordinatorName);
                for (var j = 0; j < groupNodes[i].childNodes.length; j++) {
                    if (groupNodes[i].childNodes[j].hasAttribute("Invisible")) {  //all devices such as wireless docks, subs etc carry an invisible flag that we can use to exclude them from the zone group
                        continue;
                    }
                    // Get various variables that we will put into the zoneMembers array for later use
                    var deviceRINCON = groupNodes[i].childNodes[j].attributes["UUID"].value;
                    var deviceRoomName = groupNodes[i].childNodes[j].attributes["ZoneName"].value;
                    self.zoneMembers.push({coordinatorRINCON:zoneCoordinatorRINCON, RINCON:deviceRINCON, roomName:deviceRoomName, includedZoneDisplay:false});
                }
            }
            // Sort zoneMembers by Name
            if (self.zoneMembers.length > 1) {
                self.zoneMembers.sort(function (a, b) {
                    var nameA = a.roomName, nameB = b.roomName
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                });
            }

            // Build the display array which has the zones in the right alphabetical order and also sets a flag so that when
            // we are displaying the zones in the GUI, we know whether they need to be a different subpage for presentation
            // purposes

            for (var i = 0; i < self.zoneMembers.length; i++) {
                //CF.log("building zoneDisplay");
                var currentZoneIncludedZoneDisplay = self.zoneMembers[i].includedZoneDisplay;
                if (currentZoneIncludedZoneDisplay) {
                    continue
                }
                var currentZoneCoordinatorRINCON = self.zoneMembers[i].coordinatorRINCON;
                self.zoneDisplay.push({coordinatorRINCON:currentZoneCoordinatorRINCON, RINCON:self.zoneMembers[i].RINCON, roomName:self.zoneMembers[i].roomName, isFirstOfGroup:true});
                self.zoneMembers[i].includedZoneDisplay = true;
                for (var j = i; j < self.zoneMembers.length; j++) {
                    var thisZoneCoordinatorRINCON = self.zoneMembers[j].coordinatorRINCON;
                    var thisZoneRoomName = self.zoneMembers[j].roomName;
                    currentZoneIncludedZoneDisplay = self.zoneMembers[j].includedZoneDisplay;
                    if (currentZoneIncludedZoneDisplay) {
                        continue
                    }
                    if (currentZoneCoordinatorRINCON === thisZoneCoordinatorRINCON) {
                        self.zoneDisplay.push({coordinatorRINCON:currentZoneCoordinatorRINCON, RINCON:thisZoneCoordinatorRINCON, roomName:thisZoneRoomName, isFirstOfGroup:false});
                        self.zoneMembers[j].includedZoneDisplay = true;
                    }
                }
            }
            //CF.log("zoneDisplay is:\n");
            //CF.logObject(self.zoneDisplay);
            self.populateZonesList();
            self.userZoneGroupingUnderway = false;  // allow processing again

        }
    }

    // Creates the zone list in the GUI

    self.populateZonesList = function () {
	    var listCounter = 0;  // Used to count each time we insert into the list so that we can set the number in the list that represents the now playing music item for each player
        CF.listRemove(self.joinListZones);
        for (var i = 0; i < self.zoneMembers.length; i++) {
            if (typeof self.discoveredPlayerList[self.zoneDisplay[i].RINCON] === "undefined") {
                var zoneIcon = '';
            }
            else {
                var zoneIcon = 'http://' + self.discoveredPlayerList[self.zoneDisplay[i].RINCON].IP + self.discoveredPlayerList[self.zoneDisplay[i].RINCON].port + self.discoveredPlayerList[self.zoneDisplay[i].RINCON].sonosIconPath;
            }
            //CF.log("ZoneIcon is:" + zoneIcon);
            if (self.zoneDisplay[i].isFirstOfGroup) {
	            listCounter++;
	            CF.listAdd(self.joinListZones, [
	                {subpage:self.subpageZoneGroupCoordinatorList, s28:self.zoneDisplay[i].roomName, s30:zoneIcon, s47:self.zoneDisplay[i].coordinatorRINCON }
                ])
            }
            else {
	            listCounter++;
	            CF.listAdd(self.joinListZones, [
                    {subpage:self.subpageZoneGroupMemberList, s28:self.zoneDisplay[i].roomName, s30:zoneIcon}
                ])
            }

            var nextZoneNum = i + 1;
            if (nextZoneNum < self.zoneMembers.length) {
                if (self.zoneDisplay[nextZoneNum].isFirstOfGroup) {
	                listCounter++;
	                //self.discoveredPlayerList[self.zoneDisplay[i].coordinatorRINCON].zoneGroupMusicNowPLaying = listCounter;
	                CF.listAdd(self.joinListZones, [
                        {subpage:self.subpageZoneGroupMusicist}
                    ])

                }
            }
        }
    }

    // Called when a zone is added or removed from the zone grouping in the GUI

    self.changeZoneGrouping = function (join, list, listIndex) {
        CF.getJoin(self.joinListChangeZoneGrouping + ":" + listIndex + ":" + self.joinBtnGroupInclude, function (j, v, tokens) {
            //CF.log("V is: " + v);
            if (v == "1") {
                self.discoveredPlayerList[self.zoneMembers[listIndex].RINCON].addZoneToGroup(self.selectedZoneCoordinatorForGrouping);
            }
            else {
                self.discoveredPlayerList[self.zoneMembers[listIndex].RINCON].removeZoneFromGroup();
            }
            ;
        });

    }

    // Sets up the screen that allows zone grouping

    self.groupZones = function (join, list, listIndex) {
        CF.setJoin(self.subpagePopupZones, true)
        CF.listRemove(self.joinListChangeZoneGrouping);
        CF.getJoin(self.joinListZones + ":" + listIndex + ":" + self.joinTxtZoneCoordinatorHidden, function (j, v, tokens) {
            self.selectedZoneCoordinatorForGrouping = v;
            //CF.log("zoneCoordinator is:" + zoneCoordinator);
            for (var i = 0; i < self.zoneMembers.length; i++) {
                var groupFlag = false;
                if (self.zoneMembers[i].coordinatorRINCON === self.selectedZoneCoordinatorForGrouping) {
                    groupFlag = true;
                }
                CF.listAdd(self.joinListChangeZoneGrouping, [
                    {s43:self.zoneMembers[i].roomName, d45:groupFlag}
                ]);
            }

        });
    };

    // Handles the functions required when a zone is selected in the GUI

    self.selectZone = function (join, list, listIndex) {
        CF.log("listIndex is: " + listIndex)
        CF.getJoin(self.joinListZones + ":" + listIndex + ":" + self.joinTxtZoneCoordinatorHidden, function (j, v, tokens) {
            self.selectedZoneCoordinator = v;
            CF.log("The new zone selected is: " + self.discoveredPlayerList[self.selectedZoneCoordinator].roomName);
            CF.listRemove(self.joinListQueue);
            self.discoveredPlayerList[self.selectedZoneCoordinator].resetQueueNumberReturned();
            self.discoveredPlayerList[self.selectedZoneCoordinator].getQueueForCurrentZone();
        });
        /*		self.calcMuteAndZoneVolumeDetails();
         self.getPositionInfo();
         self.displayCurrentZone();
         self.getQueueForCurrentZone();*/
    };

    // Because retrieving of queue information will be asynchroous have to use a call back from the player when the data
    // is ready
    self.zoneQueueReturnedCallback = function (joinData) {
        CF.listAdd(self.joinListQueue, joinData);
    }

    /*
     ===============================================================================


     =========================================================================
     NOTES:

     Handles the queue actions

     =========================================================================
     */

    self.queueListEnd = function () {
        CF.log("Got a queue list end message from GUI");
        self.discoveredPlayerList[self.selectedZoneCoordinator].getQueueForCurrentZone();
    };

    // This action shows the queue action screen and sets up the selected record for use by one of the buttons

    self.queueActionSelected = function (join, list, listIndex) {
        CF.getJoin(self.joinListQueue + ":" + listIndex + ":" + self.joinTxTQueueTrackNo, function (join, value, tokens) {
            self.queueSelectedItemTrackNumber = value;
            CF.log("Selected track in queue is: " + self.queueSelectedItemTrackNumber);
        });
        CF.setJoin(self.subpageQueueActions, true);
    };

    self.queuePlayTrack = function () {
        CF.setJoin(self.subpageQueueActions, false);
        // Repoint the sonos box at its queue in case radio or lastfm have been playing
        self.discoveredPlayerList[self.selectedZoneCoordinator].resetPlayerToOwnQueue(self.selectedZoneCoordinator);
        self.discoveredPlayerList[self.selectedZoneCoordinator].transportEventSeekTrackNumber(self.queueSelectedItemTrackNumber);
    };


    self.queueRemoveTrack = function () {
        CF.setJoin(self.subpageQueueActions, false);
        CF.listRemove(self.joinListQueue);
        self.discoveredPlayerList[self.selectedZoneCoordinator].transportEventRemoveTrackNumber(self.queueSelectedItemTrackNumber);
    };


    // Processes a player volume change.  The action required will change depending upon whether the player is in a group
    // or a singleton and whether the dialog box to change individual volumes is displayed or not

    self.processVolumeChange = function (notificationObj) {
        // there needs to be some

    }

    return self;

}

CF.modules.push({
    name:"SONOS_GUI", // the name of the module (mostly for display purposes)
    object:SONOS_GUI, // the object to which the setup function belongs ("this")
    version:1.0    // An optional module version number that is displayed in the Remote Debugger
});