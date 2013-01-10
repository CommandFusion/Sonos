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
        subPagePopupPlayMode: "d5",
        joinBtnPlay:'d10',
        joinBtnPrevious:'d11',
        joinBtnStop:'d57',
        joinBtnPause:'d56',
        joinBtnNext:'d12',
        joinBtnMute:'d13',
        joinBtnRepeat:'d14',
        joinBtnShuffle:'d15',
        joinBtnSettings:'d16',
        joinBtnMusicBack:'d17',
        joinBtnVolDown:'d18',
        joinBtnVolUp:'d19',
        joinSliderAnalVol:'a21',
        joinSliderDigVol:'d20',
        joinSliderAnalTime:'a22',
        joinSliderDigTime:'d23',
        joinTxtNowPlayingAlbum:'s24',
        joinTxtNowPlayingArtist:'s25',
        joinTxtTimeToEnd:'s26',
        joinTxtTimeFromBeginning:'s27',
        joinBtnTxtZoneList:'s28',
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
        joinBtnZoneMute:"d58",
        joinDigZoneVolList:"d59",
        joinAnalZoneVolList:"a60",
        joinListZoneVol:"l61",
        subpagePopupZoneVol:'d62',
        joinTxtRoomNameVol: "s63",
        joinTxtRINCONVol: "s64",
        joinListMusicSources: "l65",
        joinBtnDigMusicSourcesItem: "d67",
        joinBtnTxtMusicSourcesItem: "s68",
        jointImgMusicSourcesItem: "s66",
        subpageZoneGroupCoordinatorList:'zone_group_coordinator_list',
        subpageZoneGroupMemberList:'zone_group_member_list',
        subpageZoneGroupMusicist:'zone_group_music_list',
        playerListGUI:{},
        currentSelectedRINCON:"", // holds the RINCON of the current selected player so that commands can be sent to it
        discoveredPlayerList:{}, // variable to hold the list of discovered players for use by the GUI
        currentPlayer:{},  //Used for performance reasons to hold the current selected player in the discoveredPlayerList
        zoneCoordinators:[], // Array of all the zoneCoordinators which we will sort alphabetically
        zoneMembers:[],
        zoneDisplay:[], // Array of zoneMembers which we will sort alphabetically
        selectedZoneCoordinatorForGrouping:"",
        selectedZoneCoordinator:"Not Set",
        queueSelectedItemTrackNumber:0,
        trackStartTime: 0,
        trackCurrentTime: 0,
        firstZoneDisplayTrue: false,
        sonosMusicSource:{}

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
        self.sonosMusicSource = new SonosMusicSources();
        self.sonosMusicSource.init();

    };

    self.setDiscoveredPlayerlist = function (playerList) {
        //CF.log("A new player was discovered and added to the GUI player list");
        self.discoveredPlayerList = playerList;
        //CF.log("discoverPLayerList is:\n");
        //CF.logObject(self.discoveredPlayerList);
    };

    // This function is called by each of the individual players via a callback when they get an event that the GUI
    // will need to respond to.  The notification type is used to determine what the type of notification the GUI needs
    // to handle is and the notificationObj will vary depending upon the notification type

    // Returns the current player object to any function calling it

    self.getCurrentPlayer = function () {
        return self.currentPlayer
    }

    self.processNotificationEvent = function (notificationType, notificationObj, var1) {
        //CF.log("Processing a notifcation in the GUI");
        switch (notificationType) {
            // ZoneGroup will be sent by a player when it has received a zone grouping notification change, i.e
            // there has been a change in the zone grouping that the GUI needs to respond to
            case "ZoneGroupEvent":
                //CF.log("Got a zone group event at the GUI level");
                self.processZoneGroupChange(notificationObj);
                break;
            case "VolumeChangeEvent":
                //CF.log("Got a volume event at the GUI level");
                self.processVolumeChange(notificationObj);
                break;
	        case "TransportEvent":
		        //CF.log("Got a transport event at the GUI level");
		        self.processTransportChange(notificationObj);
		        break;
            case "PlayerTransportStateChange":
                //CF.log("Got a player state change at the GUI level");
                self.processTransportChange(notificationObj);
                break;
            case "ClearMusicSources":
                //CF.log("Got a player state change at the GUI level");
                self.clearMusicSources();
                break;
            case "ReplaceMusicSources":
            //CF.log("Got a player state change at the GUI level");
            self.replaceMusicSources(notificationObj);
            break;
            case "AppendMusicSources":
                //CF.log("Got a player state change at the GUI level");
                self.appendMusicSources(notificationObj, var1);
                break;
            case "ShowMusicSourceActions":
                //CF.log("Got a player state change at the GUI level");
                self.displayMusicSourceActions(notificationObj);
            break;

	        default:
                CF.log("Invalid GUI notification type");
        }
    };

    /*
     ===============================================================================


     =========================================================================
     NOTES:

     Handles Music Source display

     =========================================================================
     */

    self.selectMusicSource = function (join, list, listIndex) {
        self.sonosMusicSource.selectMusicSource(join, list, listIndex)

    }

    self.clearMusicSources = function (){
        CF.log("Clearing music sources");
        CF.listRemove(self.joinListMusicSources);
    }

    self.replaceMusicSources = function (notificationObj){
        CF.listRemove(self.joinListMusicSources);
        self.appendMusicSources(notificationObj, 0);
    }

    self.appendMusicSources = function (notificationObj, var1) {  // notificationObj will contain the music sources in an array
        //CF.log("adding the music sources");
        var displayArray = [];
        for (var i = var1; i < notificationObj.length; i++) { // loop around for the number of grouped zones
            if (notificationObj[i].sourceArt[i] === undefined) {
                notificationObj[i].sourceArt[i] = "";
            }
            displayArray.push({s66: notificationObj[i].sourceArt, s68: notificationObj[i].sourceName});
        }
        CF.listAdd(self.joinListMusicSources, displayArray);
     }

    self.musicSourceBack = function () {
        self.sonosMusicSource.musicSourceBack();
    }

    self.musicSourceListEnd = function () {
        CF.log("got a music source list end");
        self.sonosMusicSource.musicSourceListEnd();
    }

    self.displayMusicSourceActions = function (){
        CF.setJoin(self.subPagePopupPlayMode,1);
    }

    self.playNowMusicSourceAction = function () {
        self.sonosMusicSource.musicSourcePlayNow();
    }

    self.playNextMusicSourceAction = function () {
        self.sonosMusicSource.musicSourcePlayNext();
    }

    self.addQueueMusicSourceAction = function () {
        self.sonosMusicSource.musicSourceAddToQueue();
    }

    self.replaceQueueMusicSourceAction = function () {
        self.sonosMusicSource.musicSourceReplaceQueue();
    }



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
                self.currentPlayer = self.discoveredPlayerList[self.selectedZoneCoordinator];
                self.currentPlayer.getPositionInfo();
                self.trackStartTime = new Date().getTime();
                self.updateTimerWithoutGetPosInfo();
                self.updateNowPlayingGUI();
                self.updatePlayControls();
			}
		}

	};

	self.updateNowPlayingGUI = function () {
        //self.currentPlayer = self.discoveredPlayerList[self.selectedZoneCoordinator];
        CF.setJoin(self.joinTxtNowPlayingArtist, self.currentPlayer.currentTrackArtist);
		CF.setJoin(self.joinTxtNowPlayingAlbum, self.currentPlayer.currentTrackAlbum);
		CF.setJoin(self.joinTxtNowPlayingSong, self.currentPlayer.currentTrackName);
		CF.setJoin(self.joinImgNowPlayingArt, self.currentPlayer.currentTrackAlbumArtAddr);
		CF.setJoin(self.joinTxtNowPlayingNextSong, self.currentPlayer.nextTrackName + " - " + self.currentPlayer.nextTrackAlbum);

    };

    self.updatePlayControls = function () {
        //self.currentPlayer = self.discoveredPlayerList[self.selectedZoneCoordinator];
        CF.setJoin(self.joinBtnCrossfade, self.currentPlayer.crossFadeMode);
        // STOPPED PLAYING PAUSED_PLAYBACK TRANSITIONING
        CF.setJoin(self.joinBtnRepeat, self.currentPlayer.repeat);
        CF.setJoin(self.joinBtnShuffle, self.currentPlayer.shuffle);
        switch (self.currentPlayer.transportState) {
            case "PLAYING":
                CF.setJoin(self.joinBtnPlay,1);
                CF.setJoin(self.joinBtnPause,0);
                CF.setJoin(self.joinBtnStop,0);
                break;
            case "STOPPED":
                CF.setJoin(self.joinBtnPlay,0);
                CF.setJoin(self.joinBtnPause,0);
                CF.setJoin(self.joinBtnStop,1);
                break;
            case "PAUSED_PLAYBACK":
                CF.setJoin(self.joinBtnPlay,0);
                CF.setJoin(self.joinBtnPause,1);
                CF.setJoin(self.joinBtnStop,0);
                break;
            case "TRANSITIONING":
                CF.setJoin(self.joinBtnPlay,0);
                CF.setJoin(self.joinBtnPause,0);
                CF.setJoin(self.joinBtnStop,0);
                break;
        }
    };


    self.updateTimerWithoutGetPosInfo = function () {
        if (self.currentPlayer.transportState === "PLAYING") {
            self.trackCurrentTime = new Date().getTime() + self.currentPlayer.trackCurrentPosSecs*1000;
            var timeDifference = (self.trackCurrentTime-self.trackStartTime)/1000;
            CF.setJoin(self.joinSliderAnalTime, timeDifference/self.currentPlayer.trackDurationSecs*65536);
            CF.setJoin(self.joinTxtTimeToEnd,self.turnSecondstoSonosString(self.currentPlayer.trackDurationSecs - timeDifference));
            CF.setJoin(self.joinTxtTimeFromBeginning, self.turnSecondstoSonosString(timeDifference));
            setTimeout(function() { self.updateTimerWithoutGetPosInfo(); }, 1000);
        }

    }

    /*self.updateTimerWithGetPosInfo = function () {
        self.currentPlayer.getPositionInfo();
        setTimeout(function() { self.updateTimerWithGetPosInfo(); }, 8000);
    }*/


    self.turnSecondstoSonosString = function (numSeconds) {
        var numMinutes = parseInt(numSeconds/60);
        numMinutes =  numMinutes || 0;
        numSeconds = parseInt(numSeconds - numMinutes*60);
        return ("00"+numMinutes).slice(-2) + ":" + ("00"+numSeconds).slice(-2);
    }

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
            self.currentPlayer = self.discoveredPlayerList[self.selectedZoneCoordinator];
            CF.log("The new zone selected is: " + self.currentPlayer.roomName);
            CF.listRemove(self.joinListQueue);
            self.currentPlayer.resetQueueNumberReturned();
            self.currentPlayer.getQueueForCurrentZone();
            self.currentPlayer.getPositionInfo();
            self.trackStartTime = new Date().getTime();
            //CF.log("The track start time in secs is:" + self.trackStartTime);
            //self.updateTimerWithGetPosInfo();
            self.updateTimerWithoutGetPosInfo();
            self.updateNowPlayingGUI();
            self.calcMuteAndZoneVolumeDetails();
            //self.currentPlayer.getPositionInfo();
/*            self.currentPlayer.resetQueueNumberReturned();
            self.currentPlayer.getQueueForCurrentZone();
            self.currentPlayer.getPositionInfo();*/
        });

        /*		self.calcMuteAndZoneVolumeDetails();
         self.getPositionInfo();
         self.displayCurrentZone();
         self.getQueueForCurrentZone();*/
        self.firstZoneDisplayTrue = true;
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

     Functions to handle all volume related stuff

     =========================================================================
     */

    // Function to process GUI impacts of any volume or mute messages received
    // notificationobj holds the RINCON of the player that received the volume or mute

    self.processVolumeChange = function(notificationObj) {
        if (self.firstZoneDisplayTrue) {
            //CF.log("Got a volume change event in the GUI");
            // First need to check whether the RINCON is in the current zone, if not then don't
            // need to do anything.  We will check this by seeing if the RINCON is in the zoneDisplay array
            //CF.log("number of zones in the group is: " + self.zoneMembers.length);
            for (var j = 0; j < self.zoneMembers.length; j++) {
                if (self.zoneMembers[j].RINCON === notificationObj) {
                    // Execute the GUI stuff has we found in the zoneMembers array
                    self.calcMuteAndZoneVolumeDetails();
                }
            }
        }
    }


    // Function to calculate the average volume and mute status for the zone or zone group

    self.calcMuteAndZoneVolumeDetails = function () {
        self.masterVolume = 0;
        self.numZonesInGroup = 0;
        self.masterMute = 0;
        for (var i = 0; i < self.zoneMembers.length; i++) {
            if (self.zoneMembers[i].coordinatorRINCON == self.selectedZoneCoordinator) {
                CF.log("Adding zone to average: " + self.zoneMembers[i].roomName);
                var curZone = self.discoveredPlayerList[self.zoneMembers[i].RINCON];
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
        CF.log("The average volume for the zone is: " + self.masterVolume + " and the zone masterMute is: " + self.masterMute);
        self.displayMuteAndVolUI();
    }

    // Function to display the mute and vol info in the UI

    self.displayMuteAndVolUI = function () {
        // We will not display the zone volume dialog in this routine as this will be done in the master volume press function
        // This means we can call it anytime we get a content render notify message so that the UI (even if not displayed is always up to date)
        // In any scenario we need to set the master controls
        CF.log("Displaying the volume UI");
        CF.setJoin(self.joinBtnMute, self.masterMute); // Set the mute status
        CF.setJoin(self.joinSliderAnalVol, self.masterVolume*65535/100);  // Set the volume slider
        // Next we have to check to see if there is more than one zone and if so set their individualute button and volume slider
        // The list of zones in the listbox is built when the volume master slider is pressed so we can assume the list box is populated here
        if (self.numZonesInGroup  > 1) { // There is only one zone so the volume and mute buttons control the selected zone only
            var k = 0; // Used to index into the UI
            for (var i = 0; i < self.zoneMembers.length; i++) {
                if (self.zoneMembers[i].coordinatorRINCON == self.selectedZoneCoordinator) {  // i.e. this zone is in the group
                    var curZone = self.discoveredPlayerList[self.zoneMembers[i].RINCON];  // Get the current details for the zone
                    CF.log("Adding zone: " + curZone.roomName + "to volume listbox with list index: " + k + "and mute: " + curZone.mute);
                    CF.setJoin(self.joinListZoneVol+":" + k + ":" + self.joinBtnZoneMute, curZone.mute);
                    CF.setJoin(self.joinListZoneVol+":" + k + ":" + self.joinAnalZoneVolList, curZone.volume*65535/100);
                    k++;
                }
            }
        }
    }

    self.mainVolumePress = function(volume) {
        //CF.log("Main Volume Pressed and self.numZonesInGroup is: " + self.numZonesInGroup);
        self.startMasterVolume = self.masterVolume;
        self.userZoneGroupingUnderway = true; // prevent the processing of zone notify messages which would screw up the volume groupings
        // If there is more than one zone in the group then we need to create the listbox and set the starting volume so we can use the master volume slider to increase and decrease the individual volumes
        if (self.numZonesInGroup > 1) {
            //CF.log("Showing the zone volume list box");
            CF.listRemove(self.joinListZoneVol);
            CF.setJoin(self.subpagePopupZoneVol,1);  // Show the zone volume list
            for (var i = 0; i < self.zoneMembers.length; i++) {
                if (self.zoneMembers[i].coordinatorRINCON == self.selectedZoneCoordinator) {
                    // Get the zone details
                    var curZone = self.discoveredPlayerList[self.zoneMembers[i].RINCON];
                    // Populate the UI
                    CF.listAdd(self.joinListZoneVol, [{s63: curZone.roomName, d58: curZone.mute, a60: curZone.volume*65535/100, s64: curZone.RINCON}]);
                    // Set the statring volume of the zone which is needed to do the handling of movement of the master volume slider
                    self.discoveredPlayerList[self.zoneMembers[i].RINCON].startVolume = self.discoveredPlayerList[self.zoneMembers[i].RINCON].volume
                }
            };
        }
    };

    self.mainVolumeDrag = function(volume) {
        // We do not update the UI in this routine at all as this will be done when the rendercontrol notification is sent after we do do the SetVolume Sonos command
        //CF.log("Main volume to change is: " + volume);
        //CF.log("Start volumes was: " + self.startMasterVolume)
        if (self.numZonesInGroup == 1) {
            self.currentPlayer.RenderingControlSetVolume("", "0", "Master", volume);
            return;
        }
        else {

            if (volume >= self.startMasterVolume) {
                var volUp = true;
            }
            else {
                var volUp = false;
            }
            for (var i = 0; i < self.zoneMembers.length; i++) {
                if (self.zoneMembers[i].coordinatorRINCON == self.selectedZoneCoordinator) {
                    var curZone = self.discoveredPlayerList[self.zoneMembers[i].RINCON];
                    // Do an accelerator - we use startVolume rather than volume as volume will change as rendercontrol notify events arrive
                    if (volUp) {
                        var newVol =  curZone.startVolume + ((100-curZone.startVolume)/(100-self.startMasterVolume) * (volume-self.startMasterVolume));						}
                    else {
                        var newVol =  curZone.startVolume - ((curZone.startVolume)/(self.startMasterVolume) * (self.startMasterVolume-volume));						}
                    if (newVol < 0) {newVol = 0}
                    if (newVol > 100) {newVol = 100}
                    CF.log("new vol is: " + newVol)
                    curZone.RenderingControlSetVolume("", "0", "Master", newVol);
                }
            }

        }
    };

    self.mainVolumeRelease = function (volume) {
        //CF.log("Got a volume release with volume: " + volume);
        CF.setJoin("d128",0);
        CF.listRemove("l14");
        self.reEnableZoneNotify();


    }

    self.changeZoneVolume = function(data) {
        //CF.log("Zone Volume details are: " + data);
        var splitData = data.split(":");
        CF.getJoin(splitData[0]+":" + splitData[1] + ":" + self.joinTxtRINCONVol, function(join, value) {
        //CF.log("value is: " + value);
        var curDevice = self.discoveredPlayerList[value];
        //CF.log("New volume for the Zone " + splitData[1] + " which is room " + curDevice.roomName + " is :" + splitData[3]);
        curDevice.RenderingControlSetVolume("", "0", "Master", splitData[3]);

        });
    };
    self.changeZoneMute = function(join, list, listIndex) {
        //CF.log("Join is: " + list + ":" +listIndex + ":" + self.joinTxtRINCONVol);
        CF.getJoins([list +":"+listIndex+":" + self.joinTxtRINCONVol, list +":"+listIndex+":" + self.joinBtnZoneMute], function(joins) {
            //CF.log("Room RINCON is: " + joins[list +":"+listIndex+":" + self.joinTxtRINCONVol].value);
            //CF.logObject(joins);
            var curDevice = self.discoveredPlayerList[joins[list +":"+listIndex+":" + self.joinTxtRINCONVol].value];
            var newMuteValue = 1-parseInt(curDevice.mute);
            //CF.log("New mute for the Zone " + curDevice.roomName + " is :" + newMuteValue);
            curDevice.RenderingControlSetMute ("", "0", "Master", newMuteValue);
        });

    };

    self.mainMutePress = function () {
        CF.getJoin(self.joinBtnMute, function(join, value) {
            //CF.log("value is: " + value);
            for (var i = 0; i < self.zoneMembers.length; i++) {
                if (self.zoneMembers[i].coordinatorRINCON == self.selectedZoneCoordinator) {  // i.e. this zone is in the group
                    var curZone = self.discoveredPlayerList[self.zoneMembers[i].RINCON];  // Get the current details for the zone
                    curZone.RenderingControlSetMute ("", "0", "Master", value);
                }
            }

        });

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
        self.currentPlayer.getQueueForCurrentZone();
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
        self.currentPlayer.resetPlayerToOwnQueue(self.selectedZoneCoordinator);
        self.currentPlayer.transportEventSeekTrackNumber(self.queueSelectedItemTrackNumber);
    };


    self.queueRemoveTrack = function () {
        CF.setJoin(self.subpageQueueActions, false);
        CF.listRemove(self.joinListQueue);
        self.currentPlayer.transportEventRemoveTrackNumber(self.queueSelectedItemTrackNumber);
    };


    /*
     ===============================================================================


     =========================================================================
     NOTES:

     Handles the player start, stop etc

     =========================================================================
     */
    self.stopPress = function() {
        self.currentPlayer.AVTransportStop ("", 0);
    }

    self.pausePress = function() {
        self.currentPlayer.AVTransportPause ("", 0);
    }

    self.playPress = function() {
        self.currentPlayer.AVTransportPlay ("", 0 , 1);
    }

    self.nextPress = function() {
        self.currentPlayer.AVTransportNext ("", 0);
    }

    self.prevPress = function() {
        self.currentPlayer.AVTransportPrevious ("",  0);
    }

    self.repeatPress = function() {
        if (self.currentPlayer.repeat == 1) {
            self.currentPlayer.repeat = 0;
        }
        else {
            self.currentPlayer.repeat = 1;
        }
        self.sendShuffleRepeat();
    }


    self.shufflePress = function() {
        if (self.currentPlayer.shuffle == 1) {
            self.currentPlayer.shuffle = 0;
        }
        else {
            self.currentPlayer.shuffle = 1;
        }
        self.sendShuffleRepeat();
    }

    self.sendShuffleRepeat = function () {
        var sendCommand = "NORMAL";
        if (self.currentPlayer.shuffle == 1 && self.currentPlayer.repeat == 1) { sendCommand = "SHUFFLE"};
        if (self.currentPlayer.shuffle == 0 && self.currentPlayer.repeat == 1) { sendCommand = "REPEAT_ALL"};
        if (self.currentPlayer.shuffle == 1 && self.currentPlayer.repeat == 0) { sendCommand = "SHUFFLE_NOREPEAT"};
        self.currentPlayer.AVTransportSetPlayMode("", 0, sendCommand);
    }


    self.crossFadePress = function() {
        if (self.currentPlayer.crossFadeMode == 0)
        {
            self.currentPlayer.AVTransportSetCrossfadeMode ("", 0 , 1);
        }
        else {
            self.currentPlayer.AVTransportSetCrossfadeMode ("", 0 , 0);

        }
        //self.AVTransportPrevious ("", 0);
    }


    return self;

}

CF.modules.push({
    name:"SONOS_GUI", // the name of the module (mostly for display purposes)
    object:SONOS_GUI, // the object to which the setup function belongs ("this")
    version:1.0    // An optional module version number that is displayed in the Remote Debugger
});