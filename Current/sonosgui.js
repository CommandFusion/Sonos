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

        // Digital Button joins
        joinBtnPlay:'10',
        joinBtnPrevious:'11',
        joinBtnNext:'12',
        joinBtnMute:'13',
        joinBtnRepeat:'14',
        joinBtnShuffle:'15',
        joinBtnSettings:'16',
        joinBtnMusicBack:'17',
        joinBtnVolDown:'18',
        joinBtnVolUp:'19',
        joinBtnStop:'20',
        joinBtnPause:'21',
        joinBtnZoneGroup:'22',
        joinBtnZoneMusicPlay:'23',
        joinBtnCrossfade:'24',
        joinBtnGroupInclude:'25',
        joinBtnQueuePlayTrack:"26",
        joinBtnQueueRemoveTrack:"27",
        joinBtnZoneMute:"28",
        joinBtnAutoDiscovery:"29",
        joinBtnSearchAlbums:"30",
        joinBtnSearchArtists:"31",
        joinBtnSearchTracks:"32",

        // Text Button Joins
        joinBtnTxtZoneGrouping:'200',
        joinBtnTxtMusicSourcesItemLine1:"201",
        joinBtnTxtZoneList:'202',
        joinBtnTxtZoneMusicText:'203',
        joinBtnTxtQueueItemSong:'204',
        joinBtnTxtQueueItemArtist:'205',
        joinBtnTxtMusicSourcesItemLine2:"206",


        // Sub Page Joins
        subPagePopupPlayMode:"10000",
        subpagePopupZones:'10010',
        subpageQueueActions:"10011",
        subpagePopupZoneVol:'10003',
        subpageSonosConfig:"10004",
        subpageSelectMusicSource:"10005",
        subpageSearchType:"10006",

        // List Joins
        joinListZones:'10',
        joinListChangeZoneGrouping:'11',
        joinListQueue:"12",
        joinListMusicSources:"13",
        joinListPlayerIPs:"14",
        joinListZoneVol:"15",

        // Text Field Joins
        joinTxtNowPlayingAlbum:'300',
        joinTxtNowPlayingArtist:'301',
        joinTxtTimeToEnd:'302',
        joinTxtTimeFromBeginning:'303',
        joinTxtZoneCoordinatorHidden:'304',
        joinTxTQueueTrackNo:"305",
        joinTxtNowPlayingSong:"306",
        joinTxtNowPlayingNextSong:"307",
        joinTxtRoomNameVol:"308",
        joinTxtRINCONVol:"309",
        joinTxtNowPlayingRoom:"310",


        // Input Fields

        joinInpPlayerIP:"400",
        joinInpSpotifyID:"401",
        joinInpSearch:"402",

        // Slider Joins
        joinSliderAnalVol:'10',
        joinSliderAnalTime:'11',
        joinAnalZoneVolList:"12",

        // Image Joins
        joinImgZoneList:'700',
        joinImgQueueAlbumIcon:'701',
        joinImgNowPlayingArt:"702",
        joinImgMusicSourcesItem:"703",
        joinImgSearchProvider:"704",


        // joinSliderDigVol:'d20',
        // joinSliderDigTime:'d23',
        // joinDigZoneVolList:"d59",
        // joinBtnDigZoneList:'d29',
        // joinBtnDigZoneMusicText:'d34',
        // joinBtnDigQueueItemSong:'d36',
        // joinBtnDigQueueItemArtist:'d38',
        // joinBtnDigZoneGrouping:'d44',
        // joinBtnDigMusicSourcesItem:"d67",


        // Sub pages used to show the various items in the zone list box, i.e. a zone coordinator, a zone member and the playing info
        subpageZoneGroupCoordinatorList:'zone_group_coordinator_list',
        subpageZoneGroupMemberList:'zone_group_member_list',
        subpageZoneGroupMusicList:'zone_group_music_list',
        subPageSelectMusicSource:'selectMusicSource',
        subPageSelectSearchType:'selectSearchType',


        // Various other variables used throughout sonosgui
        // playerListGUI:{},
        currentSelectedRINCON:"", // holds the RINCON of the current selected player so that commands can be sent to it
        discoveredPlayerList:{}, // variable to hold the list of discovered players for use by the GUI
        currentPlayer:{}, //Used for performance reasons to hold the current selected player in the discoveredPlayerList
        zoneCoordinators:[], // Array of all the zoneCoordinators which we will sort alphabetically
        zoneMembers:[], // an array of all the sonos players in the environment
        zoneDisplay:[], // Array of zoneMembers which we will sort alphabetically
        selectedZoneCoordinatorForGrouping:"", // used during the grouping and sorting process for displaying the zones in the UI
        selectedZoneCoordinator:"Not Set", // which zoen is the currently selected coordinator (or could be single zone)
        queueSelectedItemTrackNumber:0, // tracks which item in the queue list was selected
        trackStartTime:0, // track times
        trackCurrentTime:0, /// track times
        firstZoneDisplayTrue:true, // used to make sure at least one zone has been selected
        sonosMusicSource:{}, // an object read from musicsources.js used for showing these in the UI
        autoDiscoveryFlag:true, // holds whether to use autoDiscovery or not before wirtten to a global token
        autoDiscoveryIPs:[], // used to hold the hardcoded IP address before written to a global token
        spotifyID:"", //used to hold Spotify ID prior to being written to a global token
        discoveryComplete:false,
        notificationObjQueue:[],
        notificationTypeQueue:[],
        notificationVar1Queue:[],
        firstSearch: true
    };

    self.init = function () {
        // this function gets the list of players by calling the sonosPlayers init function
        // it uses a call back mechanism so that as new players are discovered the GUI variable
        // holding the players is updated.  This will make it easier to handle the refresh of the
        // player list when we have to resubscribe and/or when new players are added to the Sonos
        // set up

        CF.log("Commencing initialisation of Sonos GUI");
        CF.log("Finding Players");
        CF.watch(CF.GUISuspendedEvent, self.onGUISuspended);
        CF.watch(CF.GUIResumedEvent, self.onGUIResumed);
        CF.setJoin("d" + self.subpageSelectMusicSource, 1) // Show the select music subpage which gets replaced by search when anything entered in the search bar
        sonosPlayers = new SonosPlayers();
        sonosPlayers.sonosPlayersCallback = self.setDiscoveredPlayerlist; // sets up the callback to tell the UI when new players are found
        sonosPlayers.init();
        self.retrieveSonosConfig();

        // Wait 6 seconds for all the players to be discovered and processed before handling GUUI notification messages
        setTimeout(function () {
            self.discoveryOver();
        }, 7000);


    };

    self.discoveryOver = function () {
        // Set falg so that we can now process GUI notifications
        self.discoveryComplete = true;
        // Call the GUI notificaiton with the last zone group message to set up the zones
        self.processNotificationEvent("ZoneGroupEvent", self.lastZoneGroupNotifcation);
        CF.watch(CF.InputFieldEditedEvent, "s" + self.joinInpSearch, self.searchFieldChanged);


    }

    self.setDiscoveredPlayerlist = function (playerList) {
        // A new player was discovered so the GUI playerlist is set to the list holding all the players
        //CF.log("A new player was discovered and added to the GUI player list");
        self.discoveredPlayerList = playerList;
        //CF.log("discoverPLayerList is:\n");
        //CF.logObject(self.discoveredPlayerList);
    };

    // This function is called by each of the individual players via a callback when they get an event that the GUI
    // will need to respond to.  The notification type is used to determine what the type of notification the GUI needs
    // to handle is and the notificationObj will vary depending upon the notification type

    // Returns the current player object to any function calling it
    // Used by other modules such as musicsources.js that need to find the current selected player
    // This returns a complete player object including all of its functions etc so it can be
    // used directly by the calling routine.

    self.getCurrentPlayer = function () {
        return self.currentPlayer
    }

    // This function handles the routing of any messages sent to the GUI by other modules which tell the GUI
    // it has to do something

    self.processNotificationEvent = function (notificationType, notificationObj, var1) {
        //CF.log("Processing a notifcation in the GUI");
        if (self.discoveryComplete) {
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
                case "ClearQueueUI":
                    CF.listRemove("l" + self.joinListQueue);
                    break;
                case "ScrollToMusicSource":
                    CF.listScroll("l" + self.joinListMusicSources, notificationObj, CF.MiddlePosition, true);
                    break;
                case "ChangeSearchLogo":
                    CF.setJoin("s" + self.joinImgSearchProvider, notificationObj);
                    break;
                case "ResetSelectMusicSources":
                    CF.setJoin("d" + self.subpageSelectMusicSource, 1) // Hide the selectMusicSource subpage
                    CF.setJoin("d" + self.subpageSearchType, 0)
                    break;
                case "ContentDirectoryChange":
                    CF.log("Got a content directory event at the GUI level");
                    if (self.selectedZoneCoordinator === notificationObj) {
                        CF.log("Processing a change in the queue");
                        CF.listRemove("l" + self.joinListQueue);
                        self.currentPlayer.resetQueueNumberReturned();
                        self.currentPlayer.getQueueForCurrentZone();
                    }
                    break;
                default:
                    CF.log("Invalid GUI notification type");
            }
        }
        else {
            // We can ignore all message that arise during discovery from a GUI point of view apart from we need one
            // zone group message in order to set up the zones.
            if (notificationType === "ZoneGroupEvent") {
                self.lastZoneGroupNotifcation = notificationObj;
            }
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
        //CF.log("Gui is sending a music source press");
        CF.getJoin(list + ":" + listIndex + ":s" + self.joinBtnTxtMusicSourcesItemLine1, function (join, value) {
            //CF.log("Source selected is: "+ value);
            self.sonosMusicSource.selectMusicSource(value, listIndex, false);  // false indicates not coming from a search
        });

        //self.sonosMusicSource.selectMusicSource(join, list, listIndex)

    }

    self.testMusicSource = function (join, list, listIndex) {
        self.sonosMusicSource.testMusicSource();
    }

    self.clearMusicSources = function () {
        CF.log("Clearing music sources");
        CF.listRemove("l" + self.joinListMusicSources);
    }

    self.replaceMusicSources = function (notificationObj) {
        CF.listRemove("l" + self.joinListMusicSources);
        self.appendMusicSources(notificationObj, 0);
    }

    self.appendMusicSources = function (notificationObj, var1) {  // notificationObj will contain the music sources in an array
        //CF.log("adding the music sources");
        var displayArray = [];
        for (var i = var1; i < notificationObj.length; i++) { // loop around for the number of grouped zones
            //CF.log("Source art is:" + notificationObj[i].sourceArt);
            displayArray.push({s703:notificationObj[i].sourceArt, s201:notificationObj[i].sourceName, s206:notificationObj[i].sourceCreator});
        }
        CF.listAdd("l" + self.joinListMusicSources, displayArray);
    }

    self.musicSourceBack = function () {
        self.sonosMusicSource.musicSourceBack();
    }

    self.musicSourceListEnd = function () {
        CF.log("Got a music source list end at the GUI layer");
        self.sonosMusicSource.musicSourceListEnd();
    }

    self.displayMusicSourceActions = function () {
        CF.setJoin("d" + self.subPagePopupPlayMode, 1);
    }

    self.playNowMusicSourceAction = function () {
        self.sonosMusicSource.musicSourcePlayNow();
        CF.setJoin("d" + self.subPagePopupPlayMode, 0);
    }

    self.playNextMusicSourceAction = function () {
        self.sonosMusicSource.musicSourcePlayNext();
        CF.setJoin("d" + self.subPagePopupPlayMode, 0);
    }

    self.addQueueMusicSourceAction = function () {
        self.sonosMusicSource.musicSourceAddToQueue();
        CF.setJoin("d" + self.subPagePopupPlayMode, 0);
    }

    self.replaceQueueMusicSourceAction = function () {
        self.sonosMusicSource.musicSourceReplaceQueue();
        CF.setJoin("d" + self.subPagePopupPlayMode, 0);
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
            //CF.log("The zone which got the transport event is: " + self.discoveredPlayerList[notificationObj].roomName);
            if (self.discoveredPlayerList[notificationObj].zoneGroupMusicNowPlaying != 0) {
                //CF.log("The transport event was for room: " + self.discoveredPlayerList[notificationObj].roomName + " which has index: " + self.discoveredPlayerList[notificationObj].zoneGroupMusicNowPlaying);
                CF.setJoin("l" + self.joinListZones + ":" + self.discoveredPlayerList[notificationObj].zoneGroupMusicNowPlaying + ":s" + self.joinBtnTxtZoneMusicText, self.discoveredPlayerList[notificationObj].currentTrackName);
                if (self.discoveredPlayerList[notificationObj].transportState === "PLAYING") {
                    CF.setJoin("l" + self.joinListZones + ":" + self.discoveredPlayerList[notificationObj].zoneGroupMusicNowPlaying + ":d" + self.joinBtnZoneMusicPlay, 1);
                }
                else {
                    CF.setJoin("l" + self.joinListZones + ":" + self.discoveredPlayerList[notificationObj].zoneGroupMusicNowPlaying + ":d" + self.joinBtnZoneMusicPlay, 0);
                }
            }
            if (self.selectedZoneCoordinator === notificationObj) {
                self.currentPlayer = self.discoveredPlayerList[self.selectedZoneCoordinator];
                self.currentPlayer.getPositionInfo();
                self.trackStartTime = new Date().getTime();
                CF.log("Updating the playing indicator in the queue and the length of the queue is:" + self.currentPlayer.queueData.length);
                if (self.currentPlayer.queueData.length > 0 && (self.currentPlayer.lastTrackNbr-1) <= self.currentPlayer.queueData.length) {
                    if (self.currentPlayer.lastTrackNbr != -1) {CF.setJoin("l" + self.joinListQueue + ":" + (self.currentPlayer.lastTrackNbr-1)+":s"+self.joinImgQueueAlbumIcon, self.currentPlayer.queueData[self.currentPlayer.lastTrackNbr-1].art );}
                    CF.setJoin("l" + self.joinListQueue + ":" + (self.currentPlayer.currentTrackNbr-1)+":s"+self.joinImgQueueAlbumIcon, "transports_grey_play_on_20.png");
                    CF.listScroll("l" + self.joinListQueue, self.currentPlayer.currentTrackNbr-1, CF.MiddlePosition, true);

                }
                self.updateTimerWithoutGetPosInfo();
                //self.updateTimerWithGetPosInfo();
                self.updateNowPlayingGUI();
                self.updatePlayControls();

            }
        }

    };

    self.updateNowPlayingGUI = function () {
        //self.currentPlayer = self.discoveredPlayerList[self.selectedZoneCoordinator];
        CF.log("Got a pos info update with current track of: " + self.currentPlayer.currentTrackName);
        CF.setJoin("s" + self.joinTxtNowPlayingArtist, self.currentPlayer.currentTrackArtist);
        CF.setJoin("s" + self.joinTxtNowPlayingAlbum, self.currentPlayer.currentTrackAlbum);
        CF.setJoin("s" + self.joinTxtNowPlayingSong, self.currentPlayer.currentTrackName);
        CF.setJoin("s" + self.joinImgNowPlayingArt, self.currentPlayer.currentTrackAlbumArtAddr);
        CF.setJoin("s" + self.joinTxtNowPlayingNextSong, self.currentPlayer.nextTrackName + " - " + self.currentPlayer.nextTrackAlbum);
        self.updateTimerWithoutGetPosInfo();

    };

    self.updatePlayControls = function () {
        //self.currentPlayer = self.discoveredPlayerList[self.selectedZoneCoordinator];
        CF.setJoin("d" + self.joinBtnCrossfade, self.currentPlayer.crossFadeMode);
        // STOPPED PLAYING PAUSED_PLAYBACK TRANSITIONING
        CF.setJoin("d" + self.joinBtnRepeat, self.currentPlayer.repeat);
        CF.setJoin("d" + self.joinBtnShuffle, self.currentPlayer.shuffle);
        switch (self.currentPlayer.transportState) {
            case "PLAYING":
                CF.setJoin("d" + self.joinBtnPlay, 1);
                CF.setJoin("d" + self.joinBtnPause, 0);
                CF.setJoin("d" + self.joinBtnStop, 0);
                break;
            case "STOPPED":
                CF.setJoin("d" + self.joinBtnPlay, 0);
                CF.setJoin("d" + self.joinBtnPause, 0);
                CF.setJoin("d" + self.joinBtnStop, 1);
                break;
            case "PAUSED_PLAYBACK":
                CF.setJoin("d" + self.joinBtnPlay, 0);
                CF.setJoin("d" + self.joinBtnPause, 1);
                CF.setJoin("d" + self.joinBtnStop, 0);
                break;
            case "TRANSITIONING":
                CF.setJoin("d" + self.joinBtnPlay, 0);
                CF.setJoin("d" + self.joinBtnPause, 0);
                CF.setJoin("d" + self.joinBtnStop, 0);
                break;
        }
    };


    self.updateTimerWithoutGetPosInfo = function () {
        if (self.currentPlayer.transportState === "PLAYING") {
            self.trackCurrentTime = new Date().getTime() + self.currentPlayer.trackCurrentPosSecs * 1000;
            var timeDifference = (self.trackCurrentTime - self.trackStartTime) / 1000;
            //CF.log("trackDuration is : " + self.currentPlayer.trackDurationSecs + "trackCurrentPosSecs is :" + self.currentPlayer.trackCurrentPosSecs);
            if (self.currentPlayer.radioPlaying) { // when playing radio we will get a track duration of zero so dont want to keep updating timing etc
                CF.setJoin("a" + self.joinSliderAnalTime, 0);
                CF.setJoin("s" + self.joinTxtTimeToEnd, "00:00:00");
                CF.setJoin("s" + self.joinTxtTimeFromBeginning, "00:00:00");
            }
            else {
                CF.setJoin("a" + self.joinSliderAnalTime, timeDifference / self.currentPlayer.trackDurationSecs * 65536);
                CF.setJoin("s" + self.joinTxtTimeToEnd, self.turnSecondstoSonosString(self.currentPlayer.trackDurationSecs - timeDifference));
                CF.setJoin("s" + self.joinTxtTimeFromBeginning, self.turnSecondstoSonosString(timeDifference));
                setTimeout(function () {
                    self.updateTimerWithoutGetPosInfo();
                }, 1000);
            }

        }

    }

    self.updateTimerWithGetPosInfo = function () {
        self.currentPlayer.getPositionInfo();
        setTimeout(function () {
            self.updateTimerWithGetPosInfo();
        }, 8000);
    }


    self.turnSecondstoSonosString = function (numSeconds) {
        var numMinutes = parseInt(numSeconds / 60);
        numMinutes = numMinutes || 0;
        numSeconds = parseInt(numSeconds - numMinutes * 60);
        return ("00" + numMinutes).slice(-2) + ":" + ("00" + numSeconds).slice(-2);
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
            // This is various stuff run when the first zone grouping message is received
            if (self.selectedZoneCoordinator === "Not Set") {
                // Check to see if the player referenced as the first one in the zone list has actually been discovered yet and if not ignore rest
                if (typeof self.discoveredPlayerList[self.zoneDisplay[0].coordinatorRINCON] !== "undefined") {
                    //CF.log("the coordinator for the first zone is: " + self.zoneDisplay[0].coordinatorRINCON);
                    self.currentPlayer = self.discoveredPlayerList[self.zoneDisplay[0].coordinatorRINCON];
                    CF.log("the default player selected is: " + self.currentPlayer.roomName);
                    CF.getJoin("l" + self.joinListZones + ":0:s" + self.joinBtnTxtZoneList, function (j, v, tokens) {
                        CF.setJoin("s" + self.joinTxtNowPlayingRoom, v);
                    });
                    self.processSelectedZone(self.zoneDisplay[0].coordinatorRINCON);
                    //self.sonosMusicSource = new SonosMusicSources();
                    //self.sonosMusicSource.init();
                    self.sonosMusicSource = new SonosMusicSources2();
                    self.sonosMusicSource.init();
                    self.firstZoneDisplayTrue = false;
                }
            }
            self.userZoneGroupingUnderway = false;  // allow processing again
        }
    }

    // Creates the zone list in the GUI

    self.populateZonesList = function () {
        var listCounter = 0;  // Used to count each time we insert into the list so that we can set the number in the list that represents the now playing music item for each player
        CF.listRemove("l" + self.joinListZones);
        for (var i = 0; i < self.zoneDisplay.length; i++) {
            if (typeof self.discoveredPlayerList[self.zoneDisplay[i].RINCON] === "undefined") {
                var zoneIcon = '';
            }
            else {
                var zoneIcon = 'http://' + self.discoveredPlayerList[self.zoneDisplay[i].RINCON].IP + self.discoveredPlayerList[self.zoneDisplay[i].RINCON].port + self.discoveredPlayerList[self.zoneDisplay[i].RINCON].sonosIconPath;
            }
            //CF.log("ZoneIcon is:" + zoneIcon);
            if (self.zoneDisplay[i].isFirstOfGroup) {
                listCounter++;
                CF.listAdd("l" + self.joinListZones, [
                    {subpage:self.subpageZoneGroupCoordinatorList, s202:self.zoneDisplay[i].roomName, s700:zoneIcon, s304:self.zoneDisplay[i].coordinatorRINCON }
                ])
            }
            else {
                listCounter++;
                CF.listAdd("l" + self.joinListZones, [
                    {subpage:self.subpageZoneGroupMemberList, s202:self.zoneDisplay[i].roomName, s700:zoneIcon}
                ])
            }

            var nextZoneNum = i + 1;
            if (nextZoneNum < self.zoneDisplay.length) {
                if (self.zoneDisplay[nextZoneNum].isFirstOfGroup) {
                    //CF.logObject(self.zoneDisplay);
                    self.discoveredPlayerList[self.zoneDisplay[i].coordinatorRINCON].zoneGroupMusicNowPlaying = listCounter;
                    listCounter++;
                    //CF.log("adding music zone sub page for room");
                    CF.listAdd("l" + self.joinListZones, [
                        {subpage:self.subpageZoneGroupMusicList}
                    ])

                }
            }
            if (i === self.zoneDisplay.length - 1) {
                //CF.log("Do final music list");
                self.discoveredPlayerList[self.zoneDisplay[i].coordinatorRINCON].zoneGroupMusicNowPlaying = listCounter;
                //CF.log("adding music zone sub page for room");
                CF.listAdd("l" + self.joinListZones, [
                    {subpage:self.subpageZoneGroupMusicList}
                ])
            }
        }
        self.populateZoneMusicField();
    }

    self.populateZoneMusicField = function () {
        for (var player in self.discoveredPlayerList) {
            //CF.log("The player is : " + self.discoveredPlayerList[player].roomName + " which has index: " + self.discoveredPlayerList[player].zoneGroupMusicNowPlaying);
            if (self.discoveredPlayerList[player].zoneGroupMusicNowPlaying != 0) {
                //CF.log("The transport event was for room: " + self.discoveredPlayerList[player].roomName + " which has index: " + self.discoveredPlayerList[player].zoneGroupMusicNowPlaying);
                CF.setJoin("l" + self.joinListZones + ":" + self.discoveredPlayerList[player].zoneGroupMusicNowPlaying + ":s" + self.joinBtnTxtZoneMusicText, self.discoveredPlayerList[player].currentTrackName);
                if (self.discoveredPlayerList[player].transportState === "PLAYING") {
                    CF.setJoin("l" + self.joinListZones + ":" + self.discoveredPlayerList[player].zoneGroupMusicNowPlaying + ":d" + self.joinBtnZoneMusicPlay, 1);
                }
                else {
                    CF.setJoin("l" + self.joinListZones + ":" + self.discoveredPlayerList[player].zoneGroupMusicNowPlaying + ":d" + self.joinBtnZoneMusicPlay, 0);
                }
            }
        }
    }


    // Called when a zone is added or removed from the zone grouping in the GUI

    self.changeZoneGrouping = function (join, list, listIndex) {
        CF.getJoin("l" + self.joinListChangeZoneGrouping + ":" + listIndex + ":d" + self.joinBtnGroupInclude, function (j, v, tokens) {
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
        CF.setJoin("d" + self.subpagePopupZones, true)
        CF.listRemove("l" + self.joinListChangeZoneGrouping);
        CF.getJoin("l" + self.joinListZones + ":" + listIndex + ":s" + self.joinTxtZoneCoordinatorHidden, function (j, v, tokens) {
            self.selectedZoneCoordinatorForGrouping = v;
            //CF.log("zoneCoordinator is:" + zoneCoordinator);
            for (var i = 0; i < self.zoneMembers.length; i++) {
                var groupFlag = false;
                if (self.zoneMembers[i].coordinatorRINCON === self.selectedZoneCoordinatorForGrouping) {
                    groupFlag = true;
                }
                CF.listAdd("l" + self.joinListChangeZoneGrouping, [
                    {s200:self.zoneMembers[i].roomName, d25:groupFlag}
                ]);
            }

        });
    };

    // Handles the functions required when a zone is selected in the GUI

    self.selectZone = function (join, list, listIndex) {
        CF.log("got a zone select message");
        //CF.log("listIndex is: " + listIndex)
        CF.getJoin("l" + self.joinListZones + ":" + listIndex + ":s" + self.joinTxtZoneCoordinatorHidden, function (j, v, tokens) {
            self.selectedZoneCoordinator = v;
            self.processSelectedZone(v);
        });

        CF.getJoin("l" + self.joinListZones + ":" + listIndex + ":s" + self.joinBtnTxtZoneList, function (j, v, tokens) {
            CF.setJoin("s" + self.joinTxtNowPlayingRoom, v);
        });
    };

    self.processSelectedZone = function (zone) {
        //self.selectedZoneCoordinator = v;
        self.selectedZoneCoordinator = zone;

        self.currentPlayer = self.discoveredPlayerList[self.selectedZoneCoordinator];
        //CF.log("The new zone selected is: " + self.currentPlayer.roomName);
        CF.listRemove("l" + self.joinListQueue);
        self.currentPlayer.resetQueueNumberReturned();
        self.currentPlayer.getQueueForCurrentZone();
        self.currentPlayer.getPositionInfo();
        self.trackStartTime = new Date().getTime();
        //self.firstZoneDisplayTrue = true;
        self.calcMuteAndZoneVolumeDetails();

    }

    // Because retrieving of queue information will be asynchroous have to use a call back from the player when the data
    // is ready
    self.zoneQueueReturnedCallback = function (joinData, reset) {
        var displayQueue = []; // temp object used to build the list object.  Quicker than individual list adds
        if (reset) {
            CF.listRemove("l" + self.joinListQueue);
        }
        for (var i = 0; i < joinData.length; i++) { // loop around for the number of grouped zones
            if (joinData[i].art === undefined) {
                joinData[i].art = "";
            }
            displayQueue.push({s701:joinData[i].art, s205:joinData[i].artist, s204:joinData[i].title, s305:joinData[i].trackNo});
        }
        CF.listAdd("l" + self.joinListQueue, displayQueue);
        CF.log("Updating the playing indicator in the queue and the length of the queue is:" + self.currentPlayer.queueData.length);
        if (self.currentPlayer.queueData.length > 0 && (self.currentPlayer.lastTrackNbr-1) <= self.currentPlayer.queueData.length) {
            if (self.currentPlayer.lastTrackNbr != -1) {CF.setJoin("l" + self.joinListQueue + ":" + (self.currentPlayer.lastTrackNbr-1)+":s"+self.joinImgQueueAlbumIcon, self.currentPlayer.queueData[self.currentPlayer.lastTrackNbr-1].art );}
            CF.setJoin("l" + self.joinListQueue + ":" + (self.currentPlayer.currentTrackNbr-1)+":s"+self.joinImgQueueAlbumIcon, "transports_grey_play_on_20.png");
            //CF.listScroll("l" + self.joinListQueue, self.currentPlayer.lastTrackNbr-1, CF.MiddlePosition, true);

        }
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

    self.processVolumeChange = function (notificationObj) {
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
                //CF.log("Adding zone to average: " + self.zoneMembers[i].roomName);
                var curZone = self.discoveredPlayerList[self.zoneMembers[i].RINCON];
                self.masterVolume += parseInt(curZone.volume);
                self.numZonesInGroup++;
                self.masterMute += parseInt(curZone.mute);
            }
        }
        self.masterVolume = self.masterVolume / self.numZonesInGroup;
        self.masterMute = self.masterMute / self.numZonesInGroup;  //  This will equal 1 if every zone is mute and < 1 if any zone is not mute
        if (self.masterMute < 1) {
            self.masterMute = 0;  // Make sure it is zero rather than some average between 0 and 1 so we can use it to set UI elements
        }
        //CF.log("The average volume for the zone is: " + self.masterVolume + " and the zone masterMute is: " + self.masterMute);
        self.displayMuteAndVolUI();
    }

    // Function to display the mute and vol info in the UI

    self.displayMuteAndVolUI = function () {
        // We will not display the zone volume dialog in this routine as this will be done in the master volume press function
        // This means we can call it anytime we get a content render notify message so that the UI (even if not displayed is always up to date)
        // In any scenario we need to set the master controls
        //CF.log("Displaying the volume UI");
        CF.setJoin("d" + self.joinBtnMute, self.masterMute); // Set the mute status
        CF.setJoin("a" + self.joinSliderAnalVol, self.masterVolume * 65535 / 100);  // Set the volume slider
        // Next we have to check to see if there is more than one zone and if so set their individualute button and volume slider
        // The list of zones in the listbox is built when the volume master slider is pressed so we can assume the list box is populated here
        if (self.numZonesInGroup > 1) { // There is only one zone so the volume and mute buttons control the selected zone only
            var k = 0; // Used to index into the UI
            for (var i = 0; i < self.zoneMembers.length; i++) {
                if (self.zoneMembers[i].coordinatorRINCON == self.selectedZoneCoordinator) {  // i.e. this zone is in the group
                    var curZone = self.discoveredPlayerList[self.zoneMembers[i].RINCON];  // Get the current details for the zone
                    //CF.log("Adding zone: " + curZone.roomName + "to volume listbox with list index: " + k + "and mute: " + curZone.mute);
                    CF.setJoin("l" + self.joinListZoneVol + ":" + k + ":d" + self.joinBtnZoneMute, curZone.mute);
                    CF.setJoin("l" + self.joinListZoneVol + ":" + k + ":a" + self.joinAnalZoneVolList, curZone.volume * 65535 / 100);
                    k++;
                }
            }
        }
    }

    self.mainVolumePress = function (volume) {
        //CF.log("Main Volume Pressed and self.numZonesInGroup is: " + self.numZonesInGroup);
        self.startMasterVolume = self.masterVolume;
        self.userZoneGroupingUnderway = true; // prevent the processing of zone notify messages which would screw up the volume groupings
        // If there is more than one zone in the group then we need to create the listbox and set the starting volume so we can use the master volume slider to increase and decrease the individual volumes
        if (self.numZonesInGroup > 1) {
            //CF.log("Showing the zone volume list box");
            CF.listRemove("l" + self.joinListZoneVol);
            CF.setJoin("d" + self.subpagePopupZoneVol, 1);  // Show the zone volume list
            for (var i = 0; i < self.zoneMembers.length; i++) {
                if (self.zoneMembers[i].coordinatorRINCON == self.selectedZoneCoordinator) {
                    // Get the zone details
                    var curZone = self.discoveredPlayerList[self.zoneMembers[i].RINCON];
                    // Populate the UI
                    CF.listAdd("l" + self.joinListZoneVol, [
                        {s308:curZone.roomName, d28:curZone.mute, a12:curZone.volume * 65535 / 100, s309:curZone.RINCON}
                    ]);
                    // Set the statring volume of the zone which is needed to do the handling of movement of the master volume slider
                    self.discoveredPlayerList[self.zoneMembers[i].RINCON].startVolume = self.discoveredPlayerList[self.zoneMembers[i].RINCON].volume
                }
            }
            ;
        }
    };

    self.mainVolumeDrag = function (volume) {
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
                        var newVol = curZone.startVolume + ((100 - curZone.startVolume) / (100 - self.startMasterVolume) * (volume - self.startMasterVolume));
                    }
                    else {
                        var newVol = curZone.startVolume - ((curZone.startVolume) / (self.startMasterVolume) * (self.startMasterVolume - volume));
                    }
                    if (newVol < 0) {
                        newVol = 0
                    }
                    if (newVol > 100) {
                        newVol = 100
                    }
                    //CF.log("new vol is: " + newVol)
                    curZone.RenderingControlSetVolume("", "0", "Master", newVol);
                }
            }

        }
    };

    /*self.mainVolumeRelease = function (volume) {
     //CF.log("Got a volume release with volume: " + volume);
     //CF.setJoin("d128", 0);
     //CF.listRemove("l14");
     //self.reEnableZoneNotify();


     }*/

    self.changeZoneVolume = function (data) {
        //CF.log("Zone Volume details are: " + data);
        var splitData = data.split(":");
        CF.getJoin(splitData[0] + ":" + splitData[1] + ":s" + self.joinTxtRINCONVol, function (join, value) {
            //CF.log("value is: " + value);
            var curDevice = self.discoveredPlayerList[value];
            //CF.log("New volume for the Zone " + splitData[1] + " which is room " + curDevice.roomName + " is :" + splitData[3]);
            curDevice.RenderingControlSetVolume("", "0", "Master", splitData[3]);

        });
    };
    self.changeZoneMute = function (join, list, listIndex) {
        //CF.log("Join is: " + list + ":" +listIndex + ":" + self.joinTxtRINCONVol);
        CF.getJoins([list + ":" + listIndex + ":s" + self.joinTxtRINCONVol, list + ":" + listIndex + ":d" + self.joinBtnZoneMute], function (joins) {
            //CF.log("Room RINCON is: " + joins[list +":"+listIndex+":" + self.joinTxtRINCONVol].value);
            //CF.logObject(joins);
            var curDevice = self.discoveredPlayerList[joins[list + ":" + listIndex + ":" + self.joinTxtRINCONVol].value];
            var newMuteValue = 1 - parseInt(curDevice.mute);
            //CF.log("New mute for the Zone " + curDevice.roomName + " is :" + newMuteValue);
            curDevice.RenderingControlSetMute("", "0", "Master", newMuteValue);
        });

    };

    self.mainMutePress = function () {
        CF.getJoin("d" + self.joinBtnMute, function (join, value) {
            //CF.log("value is: " + value);
            for (var i = 0; i < self.zoneMembers.length; i++) {
                if (self.zoneMembers[i].coordinatorRINCON == self.selectedZoneCoordinator) {  // i.e. this zone is in the group
                    var curZone = self.discoveredPlayerList[self.zoneMembers[i].RINCON];  // Get the current details for the zone
                    curZone.RenderingControlSetMute("", "0", "Master", value);
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
        //CF.log("Got a queue list end message from GUI");
        self.currentPlayer.getQueueForCurrentZone();
    };

    // This action shows the queue action screen and sets up the selected record for use by one of the buttons

    self.queueActionSelected = function (join, list, listIndex) {
        CF.getJoin("l" + self.joinListQueue + ":" + listIndex + ":s" + self.joinTxTQueueTrackNo, function (join, value, tokens) {
            self.queueSelectedItemTrackNumber = value;
            //CF.log("Selected track in queue is: " + self.queueSelectedItemTrackNumber);
        });
        CF.setJoin("d" + self.subpageQueueActions, true);
    };

    self.queuePlayTrack = function () {
        CF.setJoin("d" + self.subpageQueueActions, false);
        // Repoint the sonos box at its queue in case radio or lastfm have been playing
        self.currentPlayer.resetPlayerToOwnQueue(self.selectedZoneCoordinator);
        self.currentPlayer.transportEventSeekTrackNumber(self.queueSelectedItemTrackNumber);
    };


    self.queueRemoveTrack = function () {
        CF.setJoin("d" + self.subpageQueueActions, false);
        CF.listRemove("l" + self.joinListQueue);
        self.currentPlayer.transportEventRemoveTrackNumber(self.queueSelectedItemTrackNumber);
    };


    /*
     ===============================================================================


     =========================================================================
     NOTES:

     Handles the player start, stop etc

     =========================================================================
     */
    self.stopPress = function () {
        self.currentPlayer.AVTransportStop("", 0);
    }

    self.pausePress = function () {
        self.currentPlayer.AVTransportPause("", 0);
    }

    self.playPress = function () {
        self.currentPlayer.AVTransportPlay("", 0, 1);
    }

    self.nextPress = function () {
        self.currentPlayer.AVTransportNext("", 0);
    }

    self.prevPress = function () {
        self.currentPlayer.AVTransportPrevious("", 0);
    }

    self.repeatPress = function () {
        if (self.currentPlayer.repeat == 1) {
            self.currentPlayer.repeat = 0;
        }
        else {
            self.currentPlayer.repeat = 1;
        }
        self.sendShuffleRepeat();
    }


    self.shufflePress = function () {
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
        if (self.currentPlayer.shuffle == 1 && self.currentPlayer.repeat == 1) {
            sendCommand = "SHUFFLE"
        }
        ;
        if (self.currentPlayer.shuffle == 0 && self.currentPlayer.repeat == 1) {
            sendCommand = "REPEAT_ALL"
        }
        ;
        if (self.currentPlayer.shuffle == 1 && self.currentPlayer.repeat == 0) {
            sendCommand = "SHUFFLE_NOREPEAT"
        }
        ;
        self.currentPlayer.AVTransportSetPlayMode("", 0, sendCommand);
    }


    self.crossFadePress = function () {
        if (self.currentPlayer.crossFadeMode == 0) {
            self.currentPlayer.AVTransportSetCrossfadeMode("", 0, 1);
        }
        else {
            self.currentPlayer.AVTransportSetCrossfadeMode("", 0, 0);

        }
        //self.AVTransportPrevious ("", 0);
    }
    /*
     ===============================================================================


     =========================================================================
     NOTES:

     Handles sonos config screen and saving etc

     =========================================================================
     */


    self.setAutoDiscoveryFlag = function () {
        CF.getJoin("d" + self.joinBtnAutoDiscovery, function (join, value) {
            // regardless of the join type, the value is always a string
            // if we want a number, we need to use parseInt() or parseFloat()
            var num = parseInt(value);
            if (num === 0) {
                self.autoDiscoveryFlag = false;
                //CF.log("Auto Discovery is off");
            } else {
                self.autoDiscoveryFlag = true;
                //CF.log("Auto Discovery is on");
            }
        });
    }

    self.addPlayerIP = function () {
        CF.listAdd("l" + self.joinListPlayerIPs, [
            {s400:""}
        ]);
    }

    self.saveSonosConfig = function () {
        //Utils.savePersistentData(self.autoDiscoveryFlag, "[autoDiscoveryFlag]");
        CF.getJoin("s" + self.joinInpSpotifyID, function (join, value) {
            // regardless of the join type, the value is always a string
            // if we want a number, we need to use parseInt() or parseFloat()
            self.spotifyID = value;
            //CF.log("spotifyID is:" + value);
            CF.setToken(CF.GlobalTokensJoin, "[spotifyID]", value);
            //Utils.savePersistentData(self.spotifyID, "[spotifyID]");
            self.sonosMusicSource.getSpotifySessionID();

        });
        CF.setToken(CF.GlobalTokensJoin, "[autoDiscoveryFlag]", self.autoDiscoveryFlag);
        CF.listContents("l" + self.joinListPlayerIPs, 0, 0, function (items) {
            CF.log(items);
            CF.setToken(CF.GlobalTokensJoin, "[playerIPAddresses]", JSON.stringify(items));
        });
        CF.setJoin("d" + self.subpageSonosConfig, 0);


    }
    self.testToken = function () {
        CF.getJoin(CF.GlobalTokensJoin, function (j, v, tokens) {
            // read a token named [currentartist]
            //CF.log("GETTING THE TOKEN");
            //CF.logObject(tokens);
            //CF.log(tokens["[spotifyID]"]);
        });
    }


    self.retrieveSonosConfig = function () {
        CF.getJoin(CF.GlobalTokensJoin, function (j, v, tokens) {
            //CF.logObject(tokens);
            self.spotifyID = tokens["[spotifyID]"];
            CF.setJoin("s" + self.joinInpSpotifyID, self.spotifyID);
            self.autoDiscoveryFlag = tokens["[autoDiscoveryFlag]"];
            CF.setJoin("d" + self.joinBtnAutoDiscovery, self.autoDiscoveryFlag);
            CF.listRemove("l" + self.joinListPlayerIPs);
            CF.listAdd("l" + self.joinListPlayerIPs, JSON.parse(tokens["[playerIPAddresses]"]));
        });
    }

    self.searchFieldChanged = function (join, value, tokens) {
        if (self.firstSearch) {
            CF.setJoin("d" + self.joinBtnSearchAlbums, 1);
            self.firstSearch = false;
        }
        CF.log("Search " + join + " just changed to value " + value);
        CF.setJoin("d" + self.subpageSelectMusicSource, 0) // Hide the selectMusicSource subpage
        CF.setJoin("d" + self.subpageSearchType, 1)  // And show the selectMusicSearchType
        self.sonosMusicSource.searchMusicSource(value);

    }

    self.setSearchType = function (value) {
        CF.log("Search type just changed to value " + value);
        switch (value) {
            case "Album":
                CF.setJoin("d" + self.joinBtnSearchArtists, 0);
                CF.setJoin("d" + self.joinBtnSearchTracks, 0);
                break;
            case "Artist":
                CF.setJoin("d" + self.joinBtnSearchAlbums, 0);
                CF.setJoin("d" + self.joinBtnSearchTracks, 0);
                break;
            case "Track":
                CF.setJoin("d" + self.joinBtnSearchAlbums, 0);
                CF.setJoin("d" + self.joinBtnSearchArtists, 0);
                break;
        }
        self.sonosMusicSource.setSearchType(value);
    }

    self.unSubscribeToPlayers = function () {
        /*//CF.log("unsbscribing " + self.zoneMembers.length + " players");

         for (var i = 0; i < self.zoneMembers.length; i++) {
         curPlayer = self.discoveredPlayerList[self.zoneMembers[i].RINCON];
         //CF.log("Unsubscribing zone" + curPlayer.roomName);
         curPlayer.unSubscribeEvents();
         }*/

    }

    self.onGUISuspended = function () {
        // Even though the call is not executed immediately, it is enqueued for later processing:
        // the displayed date will be the one generated by the time the app was suspended
        //self.unSubscribeToPlayers();
        CF.log("GUI suspended at " + (new Date()));
    }

    self.onGUIResumed = function () {
        // Show the time at which the GUI was put back to front
        //var sonosPlayers = new SonosPlayers();
        //sonosPlayers.sonosPlayersCallback = self.setDiscoveredPlayerlist; // sets up the callback to tell the UI when new players are found
        //sonosPlayers.init();
        CF.log("GUI resumed at " + (new Date()));
    }


    return self;

}

CF.modules.push({
    name:"SONOS_GUI", // the name of the module (mostly for display purposes)
    object:SONOS_GUI, // the object to which the setup function belongs ("this")
    version:1.0    // An optional module version number that is displayed in the Remote Debugger
});