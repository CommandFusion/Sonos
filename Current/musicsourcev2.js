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

var SonosMusicSources2 = function () {
    var self = {
        // musicSources will be an object which holds all the musicSource info
        // the '0' represents the level you are in the music sources tree, i.e. 0 is the main menu
        musicSources:{0:[
            {Name:"Music Library", type:"ML", id:"A:", parentID:"", restricted:"", title:"", uPNPClass:"", res:"", protocolInfo:"", albumArtURI:"http://maisonbisson.com/files/2011/08/apple-itunes-9-icon.png", creator:"", album:"", originalTrackNumber:"", userID:""},
            {Name:"Docked iPods", type:"DiPod", id:"A:", parentID:"", restricted:"", title:"", uPNPClass:"", res:"", protocolInfo:"", albumArtURI:"http://icdn.pro/images/en/i/p/ipod-dock-icone-9168-96.png", creator:"", album:"", originalTrackNumber:"", userID:""},
            {Name:"Radio", type:"Radio", id:"root", parentID:"", restricted:"", title:"", uPNPClass:"", res:"", protocolInfo:"", albumArtURI:"http://d3bwsr3zpy54hy.cloudfront.net/201301171700/img/products/appicon-free.png", creator:"", album:"", originalTrackNumber:"", userID:""},
            {Name:"Sonos Playlists", type:"ML", id:"SQ:", parentID:"", restricted:"", title:"", uPNPClass:"", res:"", protocolInfo:"", albumArtURI:"http://cdn1.iconfinder.com/data/icons/DarkGlass_Reworked/128x128/mimetypes/playlist.png", creator:"", album:"", originalTrackNumber:"", userID:""},
            {Name:"Line In", type:"LI", id:"A:", parentID:"", restricted:"", title:"", uPNPClass:"", res:"", protocolInfo:"", albumArtURI:"http://www.absolutemusic.co.uk/wp/wp-content/uploads/2011/05/RCA-Cable.png", creator:"", album:"", originalTrackNumber:"", userID:""}
        ]
        }, /*,
         1:[{containerID:"container3", parentID: "P3"},
         {containerID:"container4", parentID: "P4"},
         {containerID:"container5", parentID: "P45"}
         ]*/
        R_RadioLocation:"", // Holds the local radio station location provided by Sonos in form: F00080000r100780,London
        radioLocationForTuneIn:"", // Holds the location identifier for tunein (legato radio) which is the r100780 above
        radioURILocation:"", // Used when setting the URI in when a radio station is selected
        R_TrialZPSerial:"", // Holds the device ID used in various parts of music sources
        allMusicServicesDetails:[], // Used to hold details of all the Sonos music services available
        subscribedMusicServicesDetails:[], // Used to hold the services that have actually been subscribed to
        musicSourceLevel:0, // Used to hold what level we are in in the music source hierachy
        zoneGroupNotificationCallback:sonosGUI.processNotificationEvent, // used to point to the CF system that is handling notification messages for this player
        currentMusicSource:"", // Used to track the current music source to make it easier when it comes to processing the different formats of the music sources
        musicSourceNumberReturned:0, // Tracks the value of the last row returned from a music source browse
        musicSourceRowsToReturn:100, // Sets how many rows to return in each call to a music source browse
        lastClassReturned:"", // used to track the last type of music class returned which is used to decide certain UI features
        musicSourceTrackLevel:false, // Used ot track whether we have reached the track level or equivalent for a music source
        musicSourceDisplayID:"", // Used to track the value of the last displayed ID to avoid alot indexing into the musicSOurces array
        musicSourceListIndex:0, // Used to track the number in the list of the music source selected
        musicSourceAppend:false, // track whether when we get a music source we are appending it or replacing it
        metaDataHeader:'<DIDL-Lite xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:upnp="urn:schemas-upnp-org:metadata-1-0/upnp/" xmlns:r="urn:schemas-rinconnetworks-com:metadata-1-0/" xmlns="urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/">',
        metaDataFooter:'</DIDL-Lite>',
        spotifySessionID:"",
        newLevelSelected:false, // Used to track when a new level is selected
        musicSourceTotalMatches:0, // tracks the total number of matches in a music query
        musicSourceDeviceID: "00-0E-58-28-3B-D4:8",
        musicSourceProvider: "Sonos",
        lastPlayedSource: "" // used to track the last played source.  This is used to see if it was radio and if so issue a command to point the player back at is own queue
    };


    self.init = function () {
        // This initialises the musicSource functionality
        CF.log("Initialising musicSources2");
        // Get a player as we need to talk to a player, any player, to get various bits of info
        self.currentPlayer = sonosGUI.getCurrentPlayer();
        // Get various variables that will be used throughout music Sources
        // Get the R_RadioLocationVariable which will be used to get local radio stations
        self.currentPlayer.SystemPropertiesGetString(function (result) {
            self.R_RadioLocation = result.StringValue;
            self.radioURILocation = self.R_RadioLocation.substr(0, 9);
            self.radioLocationForTuneIn = self.R_RadioLocation.substr(9, 7);
            CF.log("Music Source Radio Locations is: " + self.R_RadioLocation + " tunein location is: " + self.radioLocationForTuneIn + " and the URI location is: " + self.radioURILocation);
        }, "R_RadioLocation");
        // Get the R_TrialZPSerial variable which will be used as the deviceID throughout
        self.currentPlayer.SystemPropertiesGetString(function (result) {
            self.R_TrialZPSerial = result.StringValue;
            CF.log("Music Source Device ID is: " + self.R_TrialZPSerial);
        }, "R_TrialZPSerial");
        // Get all music sources from sonos, work out which ones we are subscribed to and and them to musicSources
        self.getMusicServicesInfo();

    }

    // This gets all the music services which are available on Sonos plus some info, e.g. their image ICON
    // These are put into a JSON object which is then used to compare to services which the user is subscribed to produce
    // the list of services to show in music sources

    self.getMusicServicesInfo = function () {
        var host = "http://update-services.sonos.com";
        var url = '/services/mslogo.xml';
        var url = host + url;
        CF.request(url, function (status, headers, body) {
            if (status == 200) {
                // Read the xml and extract the data
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(body, 'text/xml');
                var results = xmlDoc.evaluate("/images/cr200//service", xmlDoc, null, XPathResult.ANY_TYPE, null);
                var infoItem = results.iterateNext();
                while (infoItem) {
                    var serviceID = infoItem.getAttribute("id");
                    var serviceName = infoItem.childNodes[1].nodeValue;
                    var serviceImage = infoItem.getElementsByTagName("image")[0].childNodes[0].nodeValue;
                    //CF.log("id is: " + serviceID + " name is: " + serviceName + " image is: " + serviceImage);
                    // Create a new music service using the serviceID as the key
                    self.allMusicServicesDetails[serviceID] = {"serviceName":serviceName, "serviceImage":serviceImage};
                    infoItem = results.iterateNext();
                }
                // Work out which ones we are subscribed to
                self.getSubscribedMusicServices();
            }
            else {
                CF.log('Sonos Music Service call failed with status ' + status);
            }
        });
    };

    // Gets the music services to which we are subscribed.  These can be found at the player http://192.168.1.61:1400/status/securesettings
    /*running /bin/sed -n -e /SvcAccounts/!d;s/\\\\/_DOUBLEBACKSLASH_/g;s/\\,/_BACKSLASHCOMMA_/g;/SvcAccounts.*Value="\([0-9]*,[^,]*,1[^,]*,[^,]*[,"]\)*\/.$/!d;s/\([0-9]*,[^,]*,1[^,]*,\)[^,]*\([,"]\)/\1XXXX\2/g;s/_BACKSLASHCOMMA_/\\,/g;s/_DOUBLEBACKSLASH_/\\\\/g;p /jffs/settings/securesettings.xml
     <Setting Name="R_SvcAccounts" Value="2311,postsi,1,XXXX,11,postsi,11,XXXX"/>*/
    //
    self.getSubscribedMusicServices = function () {
        var host = "http://" + self.currentPlayer.IP;
        var url = ':1400/status/securesettings';
        var url = host + url;
        //CF.log("the url is: " + url);
        CF.request(url, function (status, headers, body) {
            if (status == 200) {
                // Get the xml and extract the data
                body = Encoder.htmlDecode(body);
                body = self.extractTag(body, 'Setting Name="R_SvcAccounts" Value="', '"');
                body = body.split(",");
                // Cycle through each of the services and extract the relevant details from the Sonos music services returned above
                for (i = 0; i < body.length; i += 4) {
                    // Get the details of the service we are subscribed to
                    self.subscribedMusicServicesDetails[body[i]] = self.allMusicServicesDetails[body[i]];
                    // Add the userID to these details.  Will need this later
                    self.subscribedMusicServicesDetails[body[i]].userID = body[i + 1];
                    self.subscribedMusicServicesDetails[body[i]].serviceID = body[i];
                    //CF.log(body[i] +":"+ body[i+1]);
                }
                // Add their details to the musicSources object
                self.addSubscribedMusicSource();

                //CF.logObject(self.subscribedMusicServicesDetails);
            }
            else {
                CF.log('Sonos Music Subscribed Music Services call failed with status ' + status);
            }
        });
    }

    // Takes the music sources we are susbcribed to and adds them to the muscicSources object

    self.addSubscribedMusicSource = function () {
        // First get the number of sources already in the object
        var numMusicSourcesAlready = self.musicSources[0].length;
        //CF.logObject(self.subscribedMusicServicesDetails);
        //CF.log("number of music sources already is: " + numMusicSourcesAlready);
        for (var i in self.subscribedMusicServicesDetails) {
            //for (i=0; i < self.subscribedMusicServicesDetails.length; i++) {
            //CF.log("The service name is: " + self.subscribedMusicServicesDetails[i].serviceName);
            self.musicSources[0][numMusicSourcesAlready] = {Name:self.subscribedMusicServicesDetails[i].serviceName, type:self.subscribedMusicServicesDetails[i].serviceName, id:"root", parentID:"", restricted:"", title:"", uPNPClass:"", res:"", protocolInfo:"", albumArtURI:self.subscribedMusicServicesDetails[i].serviceImage, creator:"", album:"", originalTrackNumber:"", userID:self.subscribedMusicServicesDetails[i].userID, serviceID:self.subscribedMusicServicesDetails[i].serviceID};
            numMusicSourcesAlready++;
        }
        //CF.logObject(self.musicSources);
        self.musicSourceAppend = false;
        self.buildDisplayArray();
        self.getSpotifySessionID();
    }


    self.getSpotifySessionID = function () {
        for (var i in self.subscribedMusicServicesDetails) {
            if (self.subscribedMusicServicesDetails[i].serviceName === " Spotify ") {
                CF.log("Found a Spotify suscribed service");
                // Have hard coded the spotify ID number for the time being
                self.spotifyUserID = self.subscribedMusicServicesDetails[i].userID;
                self.currentPlayer.MusicServicesGetSessionId(self.processSpotifySessionID, 9, self.subscribedMusicServicesDetails[i].userID);
                return
            }
        }
        CF.log("No Spotify service is subscribed to");
    }

    self.processSpotifySessionID = function (response) {
        self.spotifySessionID = response.SessionId;
        CF.log("SpotifySessionID is: " + self.spotifySessionID)
    }

    // This routine builds the display array which is passed by the GUI by parsing musicSources at the current selected level

    self.buildDisplayArray = function () { // append set as true will mean the existing music sources are not cleared
        //  The current selected level is in musicSourceLevel
        var musicDisplayArray = []; // array used to pass to the GUI
        /*CF.log("the number of records we are about to display is: " + self.musicSources[self.musicSourceLevel].length);
         CF.log("And the music source object is:");
         CF.logObject(self.musicSources[self.musicSourceLevel]);
         */
        for (i = 0; i < self.musicSources[self.musicSourceLevel].length; i++) {
            musicDisplayArray.push({sourceName:self.musicSources[self.musicSourceLevel][i].Name, sourceArt:self.musicSources[self.musicSourceLevel][i].albumArtURI, sourceCreator:self.musicSources[self.musicSourceLevel][i].creator});
        }
        /*CF.log("We are about to display:");
         CF.logObject(musicDisplayArray);
         */
        if (self.musicSourceAppend) {
            CF.log("Appending music source");
            self.zoneGroupNotificationCallback("AppendMusicSources", musicDisplayArray, self.musicSourceNumberReturned);  // process this message in the GUI layer
        }
        else {
            CF.log("Replacing music source");
            self.zoneGroupNotificationCallback("ReplaceMusicSources", musicDisplayArray);  // process this message in the GUI layer
        }

    }

    // Handles what happens when you press a music source in the GUI

    self.selectMusicSource = function (name, listIndex) {
        CF.log("A music source was selected of name: " + name + " was selected");
        self.musicSourcesIndex = listIndex;
        self.musicSources[self.musicSourceLevel].listRowToReturnTo = listIndex;
        self.currentPlayer = sonosGUI.getCurrentPlayer();
        if (self.musicSourceTrackLevel) {
            // We have reached the track level therefore need to process request
            CF.log("We are at the track level");
            if (self.zoneGroupNotificationCallback !== null) {
                self.zoneGroupNotificationCallback("ShowMusicSourceActions", self.RINCON);  // process this message in the GUI layer
            }
            //self.showMusicSourceActions();
            return
        }
        if (self.musicSourceLevel === 0) {// We are currently at the top menu and moving way therefore want to set the currentMusicSource
            self.currentMusicSource = self.musicSources[0][listIndex].type;
            CF.log("The music source is: " + self.currentMusicSource);
        }
        self.musicSourceDisplayID = self.musicSources[self.musicSourceLevel][listIndex].id;
        CF.log("The musicSourceDisplayID is: " + self.musicSourceDisplayID);
        // Add one to the music source level to effectively move down the tree
        self.musicSourceLevel++;
        self.musicSourceAppend = false;
        self.newLevelSelected = true;
        //CF.log("The music source type is:" + self.musicSources[self.musicSourceLevel-1][listIndex].type);
        // switch (self.musicSources[self.musicSourceLevel-1][listIndex].type) {
        switch (self.currentMusicSource) {
            case "ML":  // will be a standard iTunes or Sonos music library
                self.getMusicSourceForLibrary();
                break;
            case "DiPod":  // will be a docked ipod
                break;
            case "Radio":  // will be Radio
                self.getMusicSourceRadio();
                break;
            case "LastFM":  // will be LastFM
                // LastFM is very different as there are limited levels and the data is farily fixed and got at initialisation time
                break;
            case " Spotify ":  // will be Spotify
                CF.log("Processing a Spotify selection");
                self.getMusicSourceSpotify();
                break;
            case "SP":  // will be Sonos Playlists
                self.getMusicSourceForLibrary();
                break
            case "LI":  // will be LI
                //
                break
            default:
                CF.log("Received an unknown music type");
        }
    }

    self.musicSourceListEnd = function () {
        CF.log("Total matches is: " + self.musicSources[self.musicSourceLevel].TotalMatches + " and the current record count is: " + self.musicSourceNumberReturned);
        if (self.musicSourceNumberReturned == self.musicSources[self.musicSourceLevel].TotalMatches) {
            CF.log("Got a list end but there is no more to get");
            return
        }
        CF.log("Got a list end command");
        self.musicSourceAppend = true;
        self.newLevelSelected = false;
        switch (self.currentMusicSource) {
            case "ML":  // will be a standard iTunes or Sonos music library
                self.getMusicSourceForLibrary();
                break;
            case "DiPod":  // will be a docked ipod
                break;
            case "Radio":  // will be Radio
                self.getMusicSourceRadio();
                break;
            case "LastFM":  // will be LastFM
                // LastFM is very different as there are limited levels and the data is farily fixed and got at initialisation time
                break;
            case " Spotify ":  // will be Spotify
                CF.log("Processing a fetch further records for Spotify");
                self.getMusicSourceSpotify();
                break;
            case "SP":  // will be Sonos Playlists
                self.getMusicSourceForLibrary();
                break
            case "LI":  // will be LI
                //
                break
        }
    };

    self.musicSourceBack = function () {
        self.musicSourceTrackLevel = false;  //  tell it that we are no longer at track level as it will need different behaviour on clicking.
        self.musicSources[self.musicSourceLevel] = [];  // celar the level we are currently at as we will go back a level
        self.musicSourceLevel--;	// we must be somewhere down the tree so add one to the source level
        if (self.musicSourceLevel < 0) {
            self.musicSourceLevel = 0;
        }
        self.musicSourceNumberReturned = 0; // reset the number of rows returned as we are at a new level
        self.musicSourceAppend = false;
        self.musicSourceNumberReturned = self.musicSources[self.musicSourceLevel].length;
        CF.log("The number of sources at this level is: " + self.musicSourceNumberReturned);
        self.newLevelSelected = true;
        self.musicSourceDisplayID = self.musicSources[self.musicSourceLevel][0].parentID;
        CF.log("The display ID after going back is: " + self.musicSourceDisplayID);
        self.buildDisplayArray();  // display the level
        // tell the GUI to go back to the last point the user was in the GUI
        if (self.zoneGroupNotificationCallback !== null) {
            self.zoneGroupNotificationCallback("ScrollToMusicSource", self.musicSources[self.musicSourceLevel].listRowToReturnTo);  // process this message in the GUI layer
        }
    }

    self.musicSourcePlayNow = function () {
        // Set the current player to be looking at its queue in case it was looking at something like radio before
        // Send 2 as the playNextTrackNumber
        self.playNow = true;
        if (self.currentPlayer.radioPlaying && self.currentMusicSource != "Radio") {  // if the player is playing a radio station need to repoint it at its queue away from the radio stream
            self.currentPlayer.AVTransportSetAVTransportURI(self.musicSourcePlayNow1(0, 1), 0, "x-rincon-queue:" + self.currentPlayer.RINCON + "#0", "");
        }
        else {
            self.musicSourcePlayNow1(0, 1);
        }

        self.musicSourcePlayNow1(0, 1);
        //self.AVTransportPlay("", self.currentHost, 0, 1);
    }

    self.musicSourcePlayNext = function () {
        // Set the current player to be looking at its queue in case it was looking at something like radio before
        // Send as the playNextTrackNumber
        CF.log("Processing a play next command");
        self.playNow = false; //Used later in the process
        CF.log("Track number playing is: " + parseInt(self.currentPlayer.currentTrackNbr) + 1);
        //self.currentPlayer.AVTransportSetAVTransportURI(self.musicSourcePlayNow1(self.currentPlayer.currentTrackNbr,1), 0, "x-rincon-queue:" + self.currentPlayer.RINCON + "#0", "");
        self.musicSourcePlayNow1(parseInt(self.currentPlayer.currentTrackNbr) + 1, 1);
    }

    self.sendPlayPostSetAVTransport = function (response) {
        CF.log("Process play");
        //CF.logObject(response);
        if (self.zoneGroupNotificationCallback !== null) {
            self.zoneGroupNotificationCallback("ClearQueueUI", self.musicSourceList, self.musicSourceNumberReturned);  // process this message in the GUI layer
        }
        self.currentPlayer.resetQueueNumberReturned();
        if (self.playNow) { // need to do a seek to the track number first
            CF.log("Playing now");
            self.currentPlayer.AVTransportSeek(self.currentPlayer.AVTransportPlay(self.currentPlayer.getQueueForCurrentZone(), 0, 1), 0, "TRACK_NR", response.FirstTrackNumberEnqueued);
        }
        else {
            self.currentPlayer.AVTransportPlay(self.currentPlayer.getQueueForCurrentZone(), 0, 1);
        }

    }

    self.musicSourceAddToQueue = function () {
        //self.currentPlayer.AVTransportSetAVTransportURI(self.musicSourcePlayNow1(0,0), 0, "x-rincon-queue:" + self.currentPlayer.RINCON + "#0", "");
        self.musicSourcePlayNow1(0, 0)
    }

    self.musicSourceReplaceQueue = function () {
        CF.log("Clearing the queue");
        self.currentPlayer.AVTransportRemoveAllTracksFromQueue(self.transportEventRemoveAllTracks, 0);
        //self.currentPlayer.AVTransportSetAVTransportURI(self.transportEventRemoveAllTracks(), 0, "x-rincon-queue:" + self.currentPlayer.RINCON + "#0", "");
        //self.currentPlayer.AVTransportRemoveAllTracksFromQueue(self.musicSourceAddToQueue(), 0);
        //self.transportEventRemoveAllTracks();
        //self.currentPlayer.getQueueForCurrentZone();
    }

    self.transportEventRemoveAllTracks = function () {
        CF.log("Returned from Remove All Tracks Call");
        self.musicSourcePlayNow1(0, 0);
        //self.currentPlayer.getQueueForCurrentZone();

    }

    self.musicSourcePlayNow1 = function (desiredFirstTrackNumberEnqueued, enqueueAsNext) {
        // This routine handles play now of a music source item
        // Since the syntax varies depending upon the item type
        // e.g. library item, LastFM, Radio item etc, it has to
        // check the item type
        var enqueuedURI = "";
        var enqueuedURIMetaData = "";
        CF.log("Processing a play command");
        if (self.currentMusicSource === "ML") {
            // Must be a single library item
            CF.log("Got a music library item");
            //sourceToAdd = sourceToAdd.replace("S://","x-file-cifs://");
            sourceToAdd = self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].res;
            enqueuedURI = sourceToAdd;
            enqueuedURIMetaData = self.metaDataHeader + '<item id="' + "1006006c" + self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].id + '" parentID="' + "1006006c" + self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].parentID + '" restricted="' + self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].restricted + '"><dc:title>' + self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].sourceName + '<dc:title><upnp:class>' + self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].sourceClass + '</upnp:class><desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">RINCON_AssociatedZPUDN</desc></item></DIDL-Lite>';
            CF.log("Sending the AddURI Commmand");
            self.currentPlayer.AVTransportAddURIToQueue(self.sendPlayPostSetAVTransport, 0, enqueuedURI, enqueuedURIMetaData, desiredFirstTrackNumberEnqueued, enqueueAsNext);
            //self.currentPlayer.getQueueForCurrentZone();
            self.lastPlayedSource = "ML";
            return;
        }
        if (self.currentMusicSource === " Spotify ") {
            CF.log("Got a Spotify item");
            CF.log("Got a Spotify Item");
            sourceToAdd = self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].res;
            sourceToAdd = sourceToAdd.replace(/:/g, "%3a");
            if (self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].Name.indexOf("All tracks (") != -1) {
                // Must be a spotify track
                CF.log("Got a Spotify All");
                enqueuedURI = 'x-rincon-cpcontainer:1006008c' + sourceToAdd;
                enqueuedURIMetaData = self.metaDataHeader + '<item id="1006008c' + self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].id + '" parentID="100a0084' + self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].parentID + '" restricted="true"><dc:title>' + self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].title + '<dc:title><upnp:class>' + self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].uPNPClass + '</upnp:class><desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">SA_RINCON2311_' + self.spotifyUserID + '</desc></item></DIDL-Lite>';
            }
            else {
                CF.log("Got a Spotify Item");
                enqueuedURI = 'x-sonos-spotify:' + sourceToAdd + '?sid=9&amp;flags=0';
                enqueuedURIMetaData = self.metaDataHeader + '<item id="1006008c' + Utils.escape(self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].id).replace(/:/g, "%3a") + '" parentID="100a0084' + Utils.escape(self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].parentID).replace(/:/g, "%3a") + '" restricted="true"><dc:title>' + self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].title + '<dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">SA_RINCON2311_' + self.spotifyUserID + '</desc></item></DIDL-Lite>';
            }
            CF.log("Sending the AddURI Commmand");
            self.currentPlayer.AVTransportAddURIToQueue(self.sendPlayPostSetAVTransport, 0, enqueuedURI, enqueuedURIMetaData, desiredFirstTrackNumberEnqueued, enqueueAsNext);
            //self.currentPlayer.getQueueForCurrentZone();
            self.lastPlayedSource = " Spotify ";
            return;
        }

        /*
         POST /MediaRenderer/AVTransport/Control HTTP/1.1
         CONNECTION: close
         ACCEPT-ENCODING: gzip
         HOST: 192.168.1.59:1400
         USER-AGENT: Linux UPnP/1.0 Sonos/19.4-59140 (MDCR_iMac12,2)
         CONTENT-LENGTH: 1045
         CONTENT-TYPE: text/xml; charset="utf-8"
         SOAPACTION: "urn:schemas-upnp-org:service:AVTransport:1#SetAVTransportURI"

         <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"><s:Body><u:SetAVTransportURI xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>0</InstanceID><CurrentURI>x-sonosapi-stream:s117787?sid=254&amp;flags=32</CurrentURI><CurrentURIMetaData>&lt;DIDL-Lite xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot; xmlns:upnp=&quot;urn:schemas-upnp-org:metadata-1-0/upnp/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot; xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&quot;&gt;&lt;item id=&quot;F00090020s117787&quot; parentID=&quot;F00080064c481372%3alocal&quot; restricted=&quot;true&quot;&gt;&lt;dc:title&gt;Absolute 80s&lt;/dc:title&gt;&lt;upnp:class&gt;object.item.audioItem.audioBroadcast&lt;/upnp:class&gt;&lt;desc id=&quot;cdudn&quot; nameSpace=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot;&gt;SA_RINCON65031_&lt;/desc&gt;&lt;/item&gt;&lt;/DIDL-Lite&gt;</CurrentURIMetaData></u:SetAVTransportURI></s:Body></s:Envelope>
         <s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><u:SetAVTransportURI xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>0</InstanceID><CurrentURI>x-sonosapi-stream:s117787?sid=254&amp;flags=32</CurrentURI><CurrentURIMetaData>&lt;DIDL-Lite xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot; xmlns:upnp=&quot;urn:schemas-upnp-org:metadata-1-0/upnp/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot; xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&quot;&gt;&lt;item id=&quot;F00090020s117787&quot; parentID=&quot;F00080064c481372%3alocal&quot; restricted=&quot;true&quot;&gt;&lt;dc:title&gt;Absolute 80s&lt;/dc:title&gt;&lt;upnp:class&gt;object.item.audioItem.audioBroadcast&lt;/upnp:class&gt;&lt;desc id=&quot;cdudn&quot; nameSpace=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot;&gt;SA_RINCON65031_&lt;/desc&gt;&lt;/item&gt;&lt;/DIDL-Lite&gt;</CurrentURIMetaData></u:SetAVTransportURI></s:Body></s:Envelope>

         */
        if (self.currentMusicSource === "Radio") {
            // Must be a radio item.  Since you can't queue radio we call SETAVTransport not AddURIToQueue
            CF.log("Got a Radio Item");
            sourceToAdd = self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].id
            var currentURI = "x-sonosapi-stream:" + sourceToAdd + "?sid=254&flags=32";
            var currentURIMetaData = self.metaDataHeader + '<item id="F00090020' + self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].id + '" parentID="F00080064' + self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].parentID.replace(/:/g, "%3a") + '" restricted="true"><dc:title>' + self.musicSources[self.musicSourceLevel][self.musicSourcesIndex].title + '</dc:title><upnp:class>object.item.audioItem.audioBroadcast</upnp:class><desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">SA_RINCON65031_</desc></item></DIDL-Lite>';
            //self.currentPlayer.AVTransportSetAVTransportURI(self.sendPlayPostSetAVTransport, 0, currentURI, currentURIMetaData);
            self.currentPlayer.AVTransportSetAVTransportURI(self.sendPostRadio, 0, currentURI, currentURIMetaData);
            //self.currentPlayer.getQueueForCurrentZone();
            self.lastPlayedSource = "Radio";
            return;
        }

    }

    self.sendPostRadio = function () {
        self.currentPlayer.AVTransportPlay(self.currentPlayer.getQueueForCurrentZone(), 0, 1);
    }

    // Get the music details when the source is a Sonos player

    self.getMusicSourceForLibrary = function () {
        //CF.log("the music source display id is: " + self.musicSourceDisplayID);
        if (self.newLevelSelected) {
            // Reset the number of records we have returned so far
            self.newLevelSelected = false;
            self.musicSourceNumberReturned = 0;
        }
        self.currentPlayer.ContentDirectoryBrowse(self.processGetMusicSourceForLibrary, self.musicSourceDisplayID, "BrowseDirectChildren", "dc:title,res,dc:creator,upnp:artist,upnp:album,upnp:albumArtURI", self.musicSourceNumberReturned, self.musicSourceRowsToReturn, "")

    };


    // When not at a track level will get a response of:
    /*
     <DIDL-Lite xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:upnp="urn:schemas-upnp-org:metadata-1-0/upnp/" xmlns:r="urn:schemas-rinconnetworks-com:metadata-1-0/" xmlns="urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/">
     <container id="A:ARTIST" parentID="A:" restricted="true"><dc:title>Contributing Artists</dc:title><upnp:class>object.container</upnp:class><res protocolInfo="x-rincon-playlist:*:*:*">x-rincon-playlist:RINCON_000E5828A20201400#A:ARTIST</res></container>
     <container id="A:ALBUMARTIST" parentID="A:" restricted="true"><dc:title>Artists</dc:title><upnp:class>object.container</upnp:class><res protocolInfo="x-rincon-playlist:*:*:*">x-rincon-playlist:RINCON_000E5828A20201400#A:ALBUMARTIST</res></container>
     <container id="A:ALBUM" parentID="A:" restricted="true"><dc:title>Albums</dc:title><upnp:class>object.container.albumlist</upnp:class><res protocolInfo="x-rincon-playlist:*:*:*">x-rincon-playlist:RINCON_000E5828A20201400#A:ALBUM</res></container>
     <container id="A:GENRE" parentID="A:" restricted="true"><dc:title>Genres</dc:title><upnp:class>object.container</upnp:class><res protocolInfo="x-rincon-playlist:*:*:*">x-rincon-playlist:RINCON_000E5828A20201400#A:GENRE</res></container>
     <container id="A:COMPOSER" parentID="A:" restricted="true"><dc:title>Composers</dc:title><upnp:class>object.container</upnp:class><res protocolInfo="x-rincon-playlist:*:*:*">x-rincon-playlist:RINCON_000E5828A20201400#A:COMPOSER</res></container>
     <container id="A:TRACKS" parentID="A:" restricted="true"><dc:title>Tracks</dc:title><upnp:class>object.container.playlistContainer</upnp:class><res protocolInfo="x-rincon-playlist:*:*:*">x-rincon-playlist:RINCON_000E5828A20201400#A:TRACKS</res></container>
     <container id="A:PLAYLISTS" parentID="A:" restricted="true"><dc:title>Playlists</dc:title><upnp:class>object.container</upnp:class></container></DIDL-Lite>


     <DIDL-Lite xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:upnp="urn:schemas-upnp-org:metadata-1-0/upnp/" xmlns:r="urn:schemas-rinconnetworks-com:metadata-1-0/" xmlns="urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/">
     <container id="A:ALBUM/!" parentID="A:ALBUM" restricted="true"><dc:title>!</dc:title><upnp:class>object.container.album.musicAlbum</upnp:class><res protocolInfo="x-rincon-playlist:*:*:*">x-rincon-playlist:RINCON_000E5828A20201400#A:ALBUM/!</res><dc:creator>Alex Habachi</dc:creator><upnp:albumArtURI>/getaa?u=x-file-cifs%3a%2f%2fiMac%2fMusic%2fSarahsiPod%2fF07%2fYPZC.mp3&amp;v=285</upnp:albumArtURI></container>
     <container id="A:ALBUM/...%20Bo%20Marze%20I%20Snie" parentID="A:ALBUM" restricted="true"><dc:title>... Bo Marze I Snie</dc:title><upnp:class>object.container.album.musicAlbum</upnp:class><res protocolInfo="x-rincon-playlist:*:*:*">x-rincon-playlist:RINCON_000E5828A20201400#A:ALBUM/...%20Bo%20Marze%20I%20Snie</res><dc:creator>Krzysztof Krawczyk</dc:creator><upnp:albumArtURI>/getaa?u=x-file-cifs%3a%2f%2fiMac%2fMusic%2fiTunes%2fiTunes%2520Music%2fKrzysztof%2520Krawczyk%2f_..%2520Bo%2520Marze%2520I%2520Snie%2f13%2520Moj%2520Przyjacielu.mp3&amp;v=285</upnp:albumArtURI></container>
     <container id="A:ALBUM/...And%20Then%20There%20Were%20Three..." parentID="A:ALBUM" restricted="true"><dc:title>...And Then There Were Three...</dc:title><upnp:class>object.container.album.musicAlbum</upnp:class><res protocolInfo="x-rincon-playlist:*:*:*">x-rincon-playlist:RINCON_000E5828A20201400#A:ALBUM/...And%20Then%20There%20Were%20Three...</res><dc:creator>Genesis</dc:creator><upnp:albumArtURI>/getaa?u=x-file-cifs%3a%2f%2fiMac%2fMusic%2fiTunes%2fiTunes%2520Music%2fGenesis%2f_..And%2520Then%2520There%2520Were%2520Three.._%2f01%2520Down%2520And%2520Out.m4a&amp;v=285</upnp:albumArtURI></container>
     <container id="A:ALBUM/...But%20Seriously" parentID="A:ALBUM" restricted="true"><dc:title>...But Seriously</dc:title><upnp:class>object.container.album.musicAlbum</upnp:class><res protocolInfo="x-rincon-playlist:*:*:*">x-rincon-playlist:RINCON_000E5828A20201400#A:ALBUM/...But%20Seriously</res><dc:creator>Phil Collins</dc:creator><upnp:albumArtURI>/getaa?u=x-file-cifs%3a%2f%2fiMac%2fMusic%2fiTunes%2fiTunes%2520Music%2fPhil%2520Collins%2f_..But%2520Seriously%2f01%2520Hang%2520In%2520Long%2520Enough.mp3&amp;v=285</upnp:albumArtURI></container>
     <container id="A:ALBUM/...The%20Best%20Is%20Yet%20To%20Come%20(s)" parentID="A:ALBUM" restricted="true"><dc:title>...The Best Is Yet To Come (s)</dc:title><upnp:class>object.container.album.musicAlbum</upnp:class><res protocolInfo="x-rincon-playlist:*:*:*">x-rincon-playlist:RINCON_000E5828A20201400#A:ALBUM/...The%20Best%20Is%20Yet%20To%20Come%20(s)</res><dc:creator>Scooch</dc:creator><upnp:albumArtURI>/getaa?u=x-file-cifs%3a%2f%2fiMac%2fMusic%2fiTunes%2fiTunes%2520Music%2fScooch%2f_..The%2520Best%2520Is%2520Yet%2520To%2520Come%2520(s)%2f02%2520Maybe%2520Tomorrow.mp3&amp;v=285</upnp:albumArtURI></container></DIDL-Lite>

     */
    // At a track level we get:

    /*
     <DIDL-Lite xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:upnp="urn:schemas-upnp-org:metadata-1-0/upnp/" xmlns:r="urn:schemas-rinconnetworks-com:metadata-1-0/" xmlns="urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/">
     <item id="S://iMac/Music/iTunes/iTunes%20Music/Ronan%20Keating/10%20Years%20of%20Hits/03%20The%20Way%20You%20Make%20Me%20Feel.mp3" parentID="A:ALBUM/10%20Years%20of%20Hits" restricted="true"><res protocolInfo="x-file-cifs:*:audio/mpeg:*">x-file-cifs://iMac/Music/iTunes/iTunes%20Music/Ronan%20Keating/10%20Years%20of%20Hits/03%20The%20Way%20You%20Make%20Me%20Feel.mp3</res><upnp:albumArtURI>/getaa?u=x-file-cifs%3a%2f%2fiMac%2fMusic%2fiTunes%2fiTunes%2520Music%2fRonan%2520Keating%2f10%2520Years%2520of%2520Hits%2f03%2520The%2520Way%2520You%2520Make%2520Me%2520Feel.mp3&amp;v=285</upnp:albumArtURI><dc:title>The Way You Make Me Feel</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Bryan Adams/Ronan Keating</dc:creator><upnp:album>10 Years of Hits</upnp:album><upnp:originalTrackNumber>3</upnp:originalTrackNumber><r:albumArtist>Ronan Keating</r:albumArtist></item><item id="S://iMac/Music/iTunes/iTunes%20Music/Ronan%20Keating/10%20Years%20of%20Hits/03%20The%20Way%20You%20Make%20Me%20Feel%20(Single%20Mix).m4a" parentID="A:ALBUM/10%20Years%20of%20Hits" restricted="true"><res protocolInfo="x-file-cifs:*:audio/mp4:*">x-file-cifs://iMac/Music/iTunes/iTunes%20Music/Ronan%20Keating/10%20Years%20of%20Hits/03%20The%20Way%20You%20Make%20Me%20Feel%20(Single%20Mix).m4a</res><upnp:albumArtURI>/getaa?u=x-file-cifs%3a%2f%2fiMac%2fMusic%2fiTunes%2fiTunes%2520Music%2fRonan%2520Keating%2f10%2520Years%2520of%2520Hits%2f03%2520The%2520Way%2520You%2520Make%2520Me%2520Feel%2520(Single%2520Mix).m4a&amp;v=285</upnp:albumArtURI><dc:title>The Way You Make Me Feel (Single Mix)</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Ronan Keating</dc:creator><upnp:album>10 Years of Hits</upnp:album><upnp:originalTrackNumber>3</upnp:originalTrackNumber></item><item id="S://iMac/Music/iTunes/iTunes%20Music/Ronan%20Keating/10%20Years%20of%20Hits/05%20If%20Tomorrow%20Never%20Comes.m4a" parentID="A:ALBUM/10%20Years%20of%20Hits" restricted="true"><res protocolInfo="x-file-cifs:*:audio/mp4:*">x-file-cifs://iMac/Music/iTunes/iTunes%20Music/Ronan%20Keating/10%20Years%20of%20Hits/05%20If%20Tomorrow%20Never%20Comes.m4a</res><upnp:albumArtURI>/getaa?u=x-file-cifs%3a%2f%2fiMac%2fMusic%2fiTunes%2fiTunes%2520Music%2fRonan%2520Keating%2f10%2520Years%2520of%2520Hits%2f05%2520If%2520Tomorrow%2520Never%2520Comes.m4a&amp;v=285</upnp:albumArtURI><dc:title>If Tomorrow Never Comes</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Ronan Keating</dc:creator><upnp:album>10 Years of Hits</upnp:album><upnp:originalTrackNumber>5</upnp:originalTrackNumber></item><item id="S://iMac/Music/iTunes/iTunes%20Music/Ronan%20Keating/10%20Years%20of%20Hits/07%20We&apos;ve%20Got%20Tonight.mp3" parentID="A:ALBUM/10%20Years%20of%20Hits" restricted="true"><res protocolInfo="x-file-cifs:*:audio/mpeg:*">x-file-cifs://iMac/Music/iTunes/iTunes%20Music/Ronan%20Keating/10%20Years%20of%20Hits/07%20We&apos;ve%20Got%20Tonight.mp3</res><upnp:albumArtURI>/getaa?u=x-file-cifs%3a%2f%2fiMac%2fMusic%2fiTunes%2fiTunes%2520Music%2fRonan%2520Keating%2f10%2520Years%2520of%2520Hits%2f07%2520We&apos;ve%2520Got%2520Tonight.mp3&amp;v=285</upnp:albumArtURI><dc:title>We&apos;ve Got Tonight</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Lulu/Ronan Keating</dc:creator><upnp:album>10 Years of Hits</upnp:album><upnp:originalTrackNumber>7</upnp:originalTrackNumber><r:albumArtist>Ronan Keating</r:albumArtist></item><item id="S://iMac/Music/iTunes/iTunes%20Music/Ronan%20Keating/10%20Years%20of%20Hits/07%20We&apos;ve%20Got%20Tonight.m4a" parentID="A:ALBUM/10%20Years%20of%20Hits" restricted="true"><res protocolInfo="x-file-cifs:*:audio/mp4:*">x-file-cifs://iMac/Music/iTunes/iTunes%20Music/Ronan%20Keating/10%20Years%20of%20Hits/07%20We&apos;ve%20Got%20Tonight.m4a</res><upnp:albumArtURI>/getaa?u=x-file-cifs%3a%2f%2fiMac%2fMusic%2fiTunes%2fiTunes%2520Music%2fRonan%2520Keating%2f10%2520Years%2520of%2520Hits%2f07%2520We&apos;ve%2520Got%2520Tonight.m4a&amp;v=285</upnp:albumArtURI><dc:title>We&apos;ve Got Tonight</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Ronan Keating</dc:creator><upnp:album>10 Years of Hits</upnp:album><upnp:originalTrackNumber>7</upnp:originalTrackNumber></item><item id="S://iMac/Music/iTunes/iTunes%20Music/Ronan%20Keating/10%20Years%20of%20Hits/10%20She%20Believes%20(In%20Me).mp3" parentID="A:ALBUM/10%20Years%20of%20Hits" restricted="true"><res protocolInfo="x-file-cifs:*:audio/mpeg:*">x-file-cifs://iMac/Music/iTunes/iTunes%20Music/Ronan%20Keating/10%20Years%20of%20Hits/10%20She%20Believes%20(In%20Me).mp3</res><upnp:albumArtURI>/getaa?u=x-file-cifs%3a%2f%2fiMac%2fMusic%2fiTunes%2fiTunes%2520Music%2fRonan%2520Keating%2f10%2520Years%2520of%2520Hits%2f10%2520She%2520Believes%2520(In%2520Me).mp3&amp;v=285</upnp:albumArtURI><dc:title>She Believes (In Me)</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Ronan Keating</dc:creator><upnp:album>10 Years of Hits</upnp:album><upnp:originalTrackNumber>10</upnp:originalTrackNumber></item><item id="S://iMac/Music/iTunes/iTunes%20Music/Ronan%20Keating/10%20Years%20of%20Hits/10%20She%20Believes%20(In%20Me)%20(Single%20Version).m4a" parentID="A:ALBUM/10%20Years%20of%20Hits" restricted="true"><res protocolInfo="x-file-cifs:*:audio/mp4:*">x-file-cifs://iMac/Music/iTunes/iTunes%20Music/Ronan%20Keating/10%20Years%20of%20Hits/10%20She%20Believes%20(In%20Me)%20(Single%20Version).m4a</res><upnp:albumArtURI>/getaa?u=x-file-cifs%3a%2f%2fiMac%2fMusic%2fiTunes%2fiTunes%2520Music%2fRonan%2520Keating%2f10%2520Years%2520of%2520Hits%2f10%2520She%2520Believes%2520(In%2520Me)%2520(Single%2520Version).m4a&amp;v=285</upnp:albumArtURI><dc:title>She Believes (In Me) (Single Version)</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Ronan Keating</dc:creator><upnp:album>10 Years of Hits</upnp:album><upnp:originalTrackNumber>10</upnp:originalTrackNumber></item><item id="S://iMac/Music/iTunes/iTunes%20Music/Ronan%20Keating/10%20Years%20of%20Hits/17%20This%20Is%20Your%20Song%20(New).m4a" parentID="A:ALBUM/10%20Years%20of%20Hits" restricted="true"><res protocolInfo="x-file-cifs:*:audio/mp4:*">x-file-cifs://iMac/Music/iTunes/iTunes%20Music/Ronan%20Keating/10%20Years%20of%20Hits/17%20This%20Is%20Your%20Song%20(New).m4a</res><upnp:albumArtURI>/getaa?u=x-file-cifs%3a%2f%2fiMac%2fMusic%2fiTunes%2fiTunes%2520Music%2fRonan%2520Keating%2f10%2520Years%2520of%2520Hits%2f17%2520This%2520Is%2520Your%2520Song%2520(New).m4a&amp;v=285</upnp:albumArtURI><dc:title>This Is Your Song (New)</dc:title><upnp:class>object.item.audioItem.musicTrack</upnp:class><dc:creator>Ronan Keating</dc:creator><upnp:album>10 Years of Hits</upnp:album><upnp:originalTrackNumber>17</upnp:originalTrackNumber></item></DIDL-Lite>
     */

    self.processGetMusicSourceForLibrary = function (response) {
        //CF.log("Processing music source list");
        //CF.log("self.nusicSourcePressed is: "  + self.musicSourcePressed)
        var body = response.Result//.replace('xmlns="urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/"',"");;
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(body, 'text/xml');
        //CF.log("The music library response is:" + body);
        // Check to see whether we have reached the track level.  tracks have an item tag and others have a container tag
        if (body.indexOf('</container>') > 0) {
            var results = xmlDoc.getElementsByTagNameNS("urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/", 'container');
            self.musicSourceTrackLevel = false;
        }
        else {
            var results = xmlDoc.getElementsByTagNameNS("urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/", 'item');
            self.musicSourceTrackLevel = true;
        }
        // Cycle through and get the various components
        // Bear in mind that when we get to the track level this 'container' element will not be here as the track level is tagged with 'item'
        // Set the starting number at the current length so that we add to the musicSources not replace.  If this is undefined then we are adding stuff to this level for the first time
        if (self.musicSources[self.musicSourceLevel] === undefined) {
            //CF.log("This is the beginning of a new level");
            var numMusicSourcesAlready = 0;
            self.musicSources[self.musicSourceLevel] = [];
        }
        else {
            //CF.log("We are adding items to an existing level starting at: " + self.musicSources[self.musicSourceLevel].length);
            var numMusicSourcesAlready = self.musicSources[self.musicSourceLevel].length
        }
        var id = "", parentID = "", restricted = "", title = "", uPNPClass = "", res = "", creator = "", albumArt = "", protocolInfo, origTrackNbr = 0;
        for (var i = 0; i < results.length; i++) {
            if (results[i].getAttribute("id") !== undefined) {
                id = results[i].getAttribute("id")
            }
            ;
            if (results[i].getAttribute("parentID") !== undefined) {
                parentID = results[i].getAttribute("parentID")
            }
            ;
            if (results[i].getAttribute("restricted") !== undefined) {
                restricted = results[i].getAttribute("restricted")
            }
            ;
            if (results[i].getElementsByTagNameNS("http://purl.org/dc/elements/1.1/", "title")[0] !== undefined) {
                title = results[i].getElementsByTagNameNS("http://purl.org/dc/elements/1.1/", "title")[0].textContent
            }
            ;
            if (results[i].getElementsByTagNameNS("urn:schemas-upnp-org:metadata-1-0/upnp/", "class")[0] !== undefined) {
                uPNPClass = results[i].getElementsByTagNameNS("urn:schemas-upnp-org:metadata-1-0/upnp/", "class")[0].textContent
            }
            ;
            if (uPNPClass === "object.item.audioItem.musicTrack") {
                self.musicSourceTrackLevel = true
            }
            ;
            if (results[i].getElementsByTagNameNS("urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/", "res")[0] !== undefined) {
                res = results[i].getElementsByTagNameNS("urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/", "res")[0].textContent
            }
            ;
            if (results[i].getElementsByTagNameNS("urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/", "res")[0] !== undefined) {
                protocolInfo = results[i].getElementsByTagNameNS("urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/", "res")[0].getAttribute("protocolInfo")
            }
            ;
            if (results[i].getElementsByTagNameNS("http://purl.org/dc/elements/1.1/", "creator")[0] !== undefined) {
                creator = results[i].getElementsByTagNameNS("http://purl.org/dc/elements/1.1/", "creator")[0].textContent
            }
            ;
            if (results[i].getElementsByTagNameNS("urn:schemas-upnp-org:metadata-1-0/upnp/", "albumArtURI")[0] !== undefined) {
                albumArt = Utils.xmlUnescape(self.currentPlayer.host + results[i].getElementsByTagNameNS("urn:schemas-upnp-org:metadata-1-0/upnp/", "albumArtURI")[0].textContent)
            }
            ;
            if (results[i].getElementsByTagNameNS("urn:schemas-upnp-org:metadata-1-0/upnp/", "upnp:originalTrackNumber")[0] !== undefined) {
                origTrackNbr = parseInt(results[i].getElementsByTagNameNS("urn:schemas-upnp-org:metadata-1-0/upnp/", "upnp:originalTrackNumber")[0].textContent)
            }
            ;
            // before we put in the records we need to work out what to do with the first record
            // if we have come down the artist, composer, genre route then we get 'All' back from the ContentDirectory
            // if we come down the album route then the uPNPClass the previous level will be object.container.album.musicAlbum
            if (numMusicSourcesAlready === 0) { // Check to see whether we are at the first row
                if ((self.musicSourceLevel > 1) && (self.musicSources[self.musicSourceLevel - 1][0].uPNPClass = "object.container.album.musicAlbum") && self.musicSourceTrackLevel) { // We can use any of the rows in the above level as they will all be of the same uPNPClass
                    CF.log("Previous parent id is: " + self.musicSources[self.musicSourceLevel - 1][self.musicSourcesIndex].id + " And previous res is: " + self.musicSources[self.musicSourceLevel - 1][self.musicSourcesIndex].res);
                    self.musicSources[self.musicSourceLevel][0] = {Name:"Complete Album (" + results.length + ") tracks", type:"ML", id:self.musicSources[self.musicSourceLevel - 1][self.musicSourcesIndex].id, parentID:parentID, restricted:restricted, title:title, uPNPClass:uPNPClass, res:self.musicSources[self.musicSourceLevel - 1][self.musicSourcesIndex].res, protocolInfo:protocolInfo, albumArtURI:albumArt, creator:creator, album:"", originalTrackNumber:origTrackNbr, userID:""};
                    numMusicSourcesAlready = 1; // Set up for the next row
                }
            }
            self.musicSources[self.musicSourceLevel][numMusicSourcesAlready] = {Name:title, type:"ML", id:id, parentID:parentID, restricted:restricted, title:title, uPNPClass:uPNPClass, res:res, resProtocol:"", albumArtURI:albumArt, creator:creator, album:"", originalTrackNumber:"", userID:""};
            numMusicSourcesAlready++;
        }
        ;
        self.buildDisplayArray();
        self.musicSourceNumberReturned = self.musicSourceNumberReturned + parseInt(response.NumberReturned);
        self.musicSources[self.musicSourceLevel].TotalMatches = parseInt(response.TotalMatches);
        //CF.log("Next starting index is: " + self.musicSourceNumberReturned);

    };

    self.getMusicSourceSpotify = function () {
        CF.log("Retrieving Spotify data");
        if (self.newLevelSelected) {
            // Reset the number of records we have returned so far
            self.newLevelSelected = false;
            self.musicSourceNumberReturned = 0;
        }
        self.retrieveMusicFromSpotify(self.processGetMusicSourceSpotify, self.musicSourceDeviceID, self.musicSourceProvider, self.spotifySessionID, self.musicSourceDisplayID, self.musicSourceNumberReturned, self.musicSourceRowsToReturn)

    }

    /*
     <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
     <soap:Body>
     <getMetadataResponse xmlns="http://www.sonos.com/Services/1.1">
     <getMetadataResult>
     <index>0</index>
     <count>5</count>
     <total>5</total>
     <mediaCollection>
     <id>playlists</id>
     <itemType>favorites</itemType>
     <title>Playlists</title>
     <canScroll>false</canScroll>
     <canPlay>false</canPlay>
     <canEnumerate>true</canEnumerate>
     <albumArtURI>http://spotify-static-resources.s3.amazonaws.com/img/playlists.png</albumArtURI>
     </mediaCollection>
     <mediaCollection>
     <id>starred</id>
     <itemType>playlist</itemType>
     <title>Starred</title>
     <canScroll>false</canScroll>
     <canPlay>true</canPlay>
     <canEnumerate>true</canEnumerate>
     <albumArtURI>http://spotify-static-resources.s3.amazonaws.com/img/starred.png</albumArtURI>
     </mediaCollection>
     <mediaCollection>
     <id>whatsnew</id>
     <itemType>albumList</itemType>
     <title>New Releases</title>
     <canScroll>false</canScroll>
     <canPlay>false</canPlay>
     <canEnumerate>true</canEnumerate>
     <albumArtURI>http://spotify-static-resources.s3.amazonaws.com/img/new_releases.png</albumArtURI>
     </mediaCollection>
     <mediaCollection>
     <id>toplist/tracks/region/GB</id>
     <itemType>playlist</itemType>
     <title>Top Tracks</title>
     <canScroll>false</canScroll>
     <canPlay>true</canPlay>
     <canEnumerate>true</canEnumerate>
     <albumArtURI>http://spotify-static-resources.s3.amazonaws.com/img/top_tracks.png</albumArtURI>
     </mediaCollection>
     <mediaCollection>
     <id>inbox</id>
     <itemType>favorites</itemType>
     <title>Inbox</title>
     <canScroll>false</canScroll>
     <canPlay>true</canPlay>
     <canEnumerate>true</canEnumerate>
     <albumArtURI>http://spotify-static-resources.s3.amazonaws.com/img/inbox.png</albumArtURI>
     </mediaCollection>
     </getMetadataResult>
     </getMetadataResponse>
     </soap:Body></soap:Envelope>






     <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
     <soap:Body>
     <getMetadataResponse xmlns="http://www.sonos.com/Services/1.1">
     <getMetadataResult>
     <index>0</index>
     <count>67</count>
     <total>67</total>
     <mediaMetadata>
     <id>spotify:track:5B8QDkxbSR7ML2GdN2ZRTY</id>
     <itemType>track</itemType>
     <title>Opening Titles</title>
     <mimeType>audio/x-spotify</mimeType>
     <trackMetadata>
     <artistId>spotify:artist:32ogthv0BdaSMPml02X9YB</artistId>
     <artist>The Cinematic Orchestra</artist>
     <albumId>spotify:album:48zPKXSCFOdMlgTaeVQn5u</albumId>
     <album>The Crimson Wing: Mystery Of The Flamingos</album>
     <duration>173</duration>
     <albumArtURI>http://o.scdn.co/image/3d6f4910c4ef371a0a31e602a23eb46575cf067f</albumArtURI>
     <canPlay>true</canPlay>
     <canSkip>true</canSkip>
     <canAddToFavorites>false</canAddToFavorites>
     </trackMetadata>
     </mediaMetadata>
     </getMetadataResult>
     </getMetadataResponse>
     </soap:Body></soap:Envelope>
     */


    self.processGetMusicSourceSpotify = function (body) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(body, 'text/xml');
        //CF.log("The Spotify response is:" + body);
        // Check to see whether we have reached the track level.  tracks have an item tag and others have a container tag
        if (body.indexOf('</mediaCollection>') > 0) {
            var results = xmlDoc.getElementsByTagNameNS("http://www.sonos.com/Services/1.1", 'mediaCollection');
            self.musicSourceTrackLevel = false;
        }
        else {
            var results = xmlDoc.getElementsByTagNameNS("http://www.sonos.com/Services/1.1", 'mediaMetadata');
            self.musicSourceTrackLevel = true;
        }
        // Cycle through and get the various components
        // Bear in mind that when we get to the track level this 'container' element will not be here as the track level is tagged with 'item'
        // Set the starting number at the current length so that we add to the musicSources not replace.  If this is undefined then we are adding stuff to this level for the first time
        if (self.musicSources[self.musicSourceLevel] === undefined) {
            //CF.log("This is the beginning of a new level");
            var numMusicSourcesAlready = 0;
            self.musicSources[self.musicSourceLevel] = [];
        }
        else {
            CF.log("We are adding items to an existing level starting at: " + self.musicSources[self.musicSourceLevel].length);
            var numMusicSourcesAlready = self.musicSources[self.musicSourceLevel].length;
        }
        var id = "", parentID = "", restricted = "", title = "", uPNPClass = "", res = "", creator = "", albumArt = "", protocolInfo, origTrackNbr = 0;
        var numberReturned = parseInt(xmlDoc.getElementsByTagNameNS("http://www.sonos.com/Services/1.1", 'count')[0].textContent);
        var totalTracks = parseInt(xmlDoc.getElementsByTagNameNS("http://www.sonos.com/Services/1.1", 'total')[0].textContent);
        CF.log("the number fo tracks in the XML is:" + results.length);
        for (var i = 0; i < results.length; i++) {
            var id = "", parentID = "", restricted = "", title = "", uPNPClass = "", res = "", creator = "", albumArt = "", protocolInfo, origTrackNbr = 0;
            if (results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "id")[0] !== undefined) {
                id = results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "id")[0].textContent
            }
            ;
            if (results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "title")[0] !== undefined) {
                title = results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "title")[0].textContent
            }
            ;
            if (results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "albumArtURI")[0] !== undefined) {
                albumArt = Utils.xmlUnescape(results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "albumArtURI")[0].textContent)
            }
            ;
            if (results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "artist")[0] !== undefined) {
                creator = Utils.xmlUnescape(results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "artist")[0].textContent)
            }
            ;
            if (results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "itemType")[0] !== undefined) {
                uPNPClass = Utils.xmlUnescape(results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "itemType")[0].textContent)
            }
            ;
            if (numMusicSourcesAlready === 0) { // Check to see whether we are at the first row
                if ((self.musicSourceLevel > 1) && self.musicSourceTrackLevel) { // We can use any of the rows in the above level as they will all be of the same uPNPClass
                    //CF.log("Previous parent id is: " + self.musicSources[self.musicSourceLevel-1][self.musicSourcesIndex].id + " And previous res is: " +self.musicSources[self.musicSourceLevel-1][self.musicSourcesIndex].res );
                    self.musicSources[self.musicSourceLevel][0] = {Name:"All tracks (" + totalTracks + ")", type:" Spotify ", id:self.musicSources[self.musicSourceLevel - 1][self.musicSourcesIndex].id, parentID:self.musicSourceDisplayID, restricted:restricted, title:title, uPNPClass:uPNPClass, res:self.musicSources[self.musicSourceLevel - 1][self.musicSourcesIndex].res, protocolInfo:"", albumArtURI:albumArt, creator:creator, album:"", originalTrackNumber:"", userID:""};
                    numMusicSourcesAlready = 1; // Set up for the next row
                }
            }
            self.musicSources[self.musicSourceLevel][numMusicSourcesAlready] = {Name:title, type:" Spotify ", id:id, parentID:self.musicSourceDisplayID, restricted:"", title:title, uPNPClass:uPNPClass, res:id, resProtocol:"", albumArtURI:albumArt, creator:creator, album:"", originalTrackNumber:"", userID:""};
            numMusicSourcesAlready++;
        }
        ;
        self.buildDisplayArray();
        self.musicSourceNumberReturned = self.musicSourceNumberReturned + numberReturned;
        self.musicSources[self.musicSourceLevel].TotalMatches = totalTracks;
        //CF.log("Next starting index is: " + self.musicSourceNumberReturned);

    }

    self.getMusicSourceRadio = function () {
        CF.log("Retrieving Radio data");
        if (self.newLevelSelected) {
            // Reset the number of records we have returned so far
            self.newLevelSelected = false;
            self.musicSourceNumberReturned = 0;
        }
        self.retrieveMusicFromRadio(self.processGetMusicSourceRadio, self.musicSourceDeviceID, self.musicSourceProvider, self.musicSourceDisplayID, self.musicSourceNumberReturned, self.musicSourceRowsToReturn)

    }

    /*
     <?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
     <soap:Body><getMetadataResponse xmlns="http://www.sonos.com/Services/1.1"><getMetadataResult><index>0</index><count>5</count><total>5</total><mediaCollection><id>y1</id><title>Music</title><itemType>container</itemType><authRequired>false</authRequired><canPlay>false</canPlay><canEnumerate>true</canEnumerate><canCache>true</canCache><homogeneous>false</homogeneous><canAddToFavorite>false</canAddToFavorite><canScroll>false</canScroll></mediaCollection><mediaCollection><id>c57922</id><title>News</title><itemType>container</itemType><authRequired>false</authRequired><canPlay>false</canPlay><canEnumerate>true</canEnumerate><canCache>true</canCache><homogeneous>false</homogeneous><canAddToFavorite>false</canAddToFavorite><canScroll>false</canScroll></mediaCollection><mediaCollection><id>g2723</id><title>Sports</title><itemType>container</itemType><authRequired>false</authRequired><canPlay>false</canPlay><canEnumerate>true</canEnumerate><canCache>true</canCache><homogeneous>false</homogeneous><canAddToFavorite>false</canAddToFavorite><canScroll>false</canScroll></mediaCollection><mediaCollection><id>y2</id><title>Talk</title><itemType>container</itemType><authRequired>false</authRequired><canPlay>false</canPlay><canEnumerate>true</canEnumerate><canCache>true</canCache><homogeneous>false</homogeneous><canAddToFavorite>false</canAddToFavorite><canScroll>false</canScroll></mediaCollection><mediaCollection><id>r0</id><title>Location</title><itemType>container</itemType><authRequired>false</authRequired><canPlay>false</canPlay><canEnumerate>true</canEnumerate><canCache>true</canCache><homogeneous>false</homogeneous><canAddToFavorite>false</canAddToFavorite><canScroll>false</canScroll></mediaCollection></getMetadataResult></getMetadataResponse></soap:Body></soap:Envelope>

     */

    self.processGetMusicSourceRadio = function (body) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(body, 'text/xml');
        //CF.log("The Radio response is:" + body);
        // Check to see whether we have reached the track level.  tracks have an item tag and others have a container tag
        if (body.indexOf('</mediaCollection>') > 0) {
            var results = xmlDoc.getElementsByTagNameNS("http://www.sonos.com/Services/1.1", 'mediaCollection');
            self.musicSourceTrackLevel = false;
        }
        else {
            var results = xmlDoc.getElementsByTagNameNS("http://www.sonos.com/Services/1.1", 'mediaMetadata');
            self.musicSourceTrackLevel = true;
        }
        // Cycle through and get the various components
        // Bear in mind that when we get to the track level this 'container' element will not be here as the track level is tagged with 'item'
        // Set the starting number at the current length so that we add to the musicSources not replace.  If this is undefined then we are adding stuff to this level for the first time
        if (self.musicSources[self.musicSourceLevel] === undefined) {
            //CF.log("This is the beginning of a new level");
            var numMusicSourcesAlready = 0;
            self.musicSources[self.musicSourceLevel] = [];
        }
        else {
            CF.log("We are adding items to an existing level starting at: " + self.musicSources[self.musicSourceLevel].length);
            var numMusicSourcesAlready = self.musicSources[self.musicSourceLevel].length;
        }
        var id = "", parentID = "", restricted = "", title = "", uPNPClass = "", res = "", creator = "", albumArt = "", protocolInfo, origTrackNbr = 0;
        var numberReturned = parseInt(xmlDoc.getElementsByTagNameNS("http://www.sonos.com/Services/1.1", 'count')[0].textContent);
        var totalTracks = parseInt(xmlDoc.getElementsByTagNameNS("http://www.sonos.com/Services/1.1", 'total')[0].textContent);
        CF.log("the number fo tracks in the XML is:" + results.length);
        for (var i = 0; i < results.length; i++) {
            var id = "", parentID = "", restricted = "", title = "", uPNPClass = "", res = "", creator = "", albumArt = "", protocolInfo, origTrackNbr = 0;
            if (results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "id")[0] !== undefined) {
                id = results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "id")[0].textContent
            }
            ;
            if (results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "title")[0] !== undefined) {
                title = results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "title")[0].textContent
            }
            ;
            if (results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "albumArtURI")[0] !== undefined) {
                albumArt = Utils.xmlUnescape(results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "albumArtURI")[0].textContent)
            }
            ;
            if (results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "artist")[0] !== undefined) {
                creator = Utils.xmlUnescape(results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "artist")[0].textContent)
            }
            ;
            if (results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "itemType")[0] !== undefined) {
                uPNPClass = Utils.xmlUnescape(results[i].getElementsByTagNameNS("http://www.sonos.com/Services/1.1", "itemType")[0].textContent)
            }
            ;
            /*if (numMusicSourcesAlready === 0) { // Check to see whether we are at the first row
                if ((self.musicSourceLevel > 1) && self.musicSourceTrackLevel) { // We can use any of the rows in the above level as they will all be of the same uPNPClass
                    //CF.log("Previous parent id is: " + self.musicSources[self.musicSourceLevel-1][self.musicSourcesIndex].id + " And previous res is: " +self.musicSources[self.musicSourceLevel-1][self.musicSourcesIndex].res );
                    self.musicSources[self.musicSourceLevel][0] = {Name:"All tracks (" + totalTracks + ")", type:" Spotify ", id:self.musicSources[self.musicSourceLevel - 1][self.musicSourcesIndex].id, parentID:self.musicSourceDisplayID, restricted:restricted, title:title, uPNPClass:uPNPClass, res:self.musicSources[self.musicSourceLevel - 1][self.musicSourcesIndex].res, protocolInfo:"", albumArtURI:albumArt, creator:creator, album:"", originalTrackNumber:"", userID:""};
                    numMusicSourcesAlready = 1; // Set up for the next row
                }
            }*/
            self.musicSources[self.musicSourceLevel][numMusicSourcesAlready] = {Name:title, type:"Radio", id:id, parentID:self.musicSourceDisplayID, restricted:"", title:title, uPNPClass:uPNPClass, res:id, resProtocol:"", albumArtURI:albumArt, creator:creator, album:"", originalTrackNumber:"", userID:""};
            numMusicSourcesAlready++;
        }
        self.buildDisplayArray();
        self.musicSourceNumberReturned = self.musicSourceNumberReturned + numberReturned;
        self.musicSources[self.musicSourceLevel].TotalMatches = totalTracks;
        //CF.log("Next starting index is: " + self.musicSourceNumberReturned);

        /*        body = Utils.unescape(body);
                body = Utils.unescape(body);
                //CF.log("Radio response is: " + body);
                var i = 0, j = 0, k = 0, l = 0, artist = "", title = "", res = "", art = "", nextTag = "", endTag = ""
                // having got the response, we can check to see whether we have reached track level by checking to see what object types are in the response
                if (body.indexOf("<itemType>stream</itemType>") > 0) {
                    // We have reached track level in this data
                    // Put a first item into the list which is the select all item which will be used later for special behaviours
                    self.musicSourceList.push({sourceName:"All", sourceRes:"", sourceArt:"", sourceID:""});
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
                parentID = self.musicSourceLevelQuery[self.musicSourceLevel - 1];
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
                    self.musicSourceList.push({sourceName:title, sourceRes:res, sourceArt:art, sourceID:newDisplayID, sourceParentID:parentID, sourceClass:"object.item.audioItem.audioBroadcast"});
                }
                //self.populateMusicSourceListBox(self.musicSourceNumberReturned);
                if (self.zoneGroupNotificationCallback !== null) {
                    self.zoneGroupNotificationCallback("AppendMusicSources", self.musicSourceList, self.musicSourceNumberReturned);  // process this message in the GUI layer
                }
                self.musicSourceNumberReturned = self.musicSourceNumberReturned + parseInt(radioNumberReturned);*/
    }


    // Gets information from Spotify

    self.retrieveMusicFromSpotify = function (callback, DeviceID, DeviceProvider, SessionID, ItemID, StartingIndex, RequestedCount) {
        var host = "http://spotify.west.sonos-ws-eu.com";
        var url = '/smapi';
        var SOAPAction = '"http://www.sonos.com/Services/1.1#getMetadata"';
        //var SOAPBody = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><credentials xmlns="http://www.sonos.com/Services/1.1"><deviceId>00-0E-58-28-3B-D4:8</deviceId><deviceProvider>Sonos</deviceProvider><sessionId>OKf4W1Y+Lmp/dRaFevzptAZFDRbkz8GAkyPVZQCRDnk=</sessionId></credentials></s:Header><s:Body><getMetadata xmlns="http://www.sonos.com/Services/1.1"><id>root</id><index>0</index><count>100</count></getMetadata></s:Body></s:Envelope>';
        var SOAPBody = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><credentials xmlns="http://www.sonos.com/Services/1.1">' +
            '<deviceId>' + DeviceID + '</deviceId><deviceProvider>' + DeviceProvider + '</deviceProvider><sessionId>' + SessionID +
            '</sessionId></credentials></s:Header><s:Body><getMetadata xmlns="http://www.sonos.com/Services/1.1"><id>' + ItemID +
            '</id><index>' + StartingIndex + '</index><count>' + RequestedCount + '</count></getMetadata></s:Body></s:Envelope>';

        var url = host + url;
        //CF.log("url is: " + url);
        //CF.log("SOAPAction is : " + SOAPAction);
        CF.log("SOAP Body is: " + SOAPBody + "\r\n");
        CF.request(url, 'POST', {'ACCEPT-ENCODING':'gzip', 'ACCEPT-LANGUAGE':'en-US', 'USER-AGENT':'Linux UPnP/1.0 Sonos/19.4-59140 (MDCR_iMac12,2)', 'CONTENT-TYPE':'text/xml; charset="utf-8"', 'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
            if (status == 200) {
                //CF.log("Spotify response is: " + body)
                callback(body)
            }
            else {
                CF.log('Spotify music retrieval failed with status ' + status);
            }
        });
    }

    //<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><credentials xmlns="http://www.sonos.com/Services/1.1"><deviceId>00-0E-58-28-3B-D4:8</deviceId><deviceProvider>Sonos</deviceProvider><sessionId>OKf4W1Y+Lmp/dRaFevzptAZFDRbkz8GAkyPVZQCRDnk=</sessionId></credentials></s:Header><s:Body><getMetadata xmlns="http://www.sonos.com/Services/1.1"><id>root</id><index>0</index><count>100</count></getMetadata></s:Body></s:Envelope>
    //<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><credentials xmlns="http://www.sonos.com/Services/1.1"><deviceId>00-0E-58-28-3B-D4:8</deviceId><deviceProvider>Sonos</deviceProvider><sessionId>OKf4W1Y+Lmp/dRaFevzptAZFDRbkz8GAkyPVZQCRDnk=</sessionId></credentials></s:Header><s:Body><getMetadata xmlns="http://www.sonos.com/Services/1.1"><id>root</id><index>0</index><count>30</count></getMetadata></s:Body></s:Envelope
    self.retrieveMusicFromRadio = function (callback, DeviceID, DeviceProvider, ItemID, StartingIndex, RequestedCount) {
        var host = "http://legato.radiotime.com";
        var url = '/Radio.asmx';
        var SOAPAction = '"http://www.sonos.com/Services/1.1#getMetadata"';
        var SOAPBody = '<?xml version="1.0" encoding="us-ascii"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header>' +
            '<credentials xmlns="http://www.sonos.com/Services/1.1"><deviceId>' + DeviceID + '</deviceId><deviceProvider>'
            + DeviceProvider + '</deviceProvider></credentials></s:Header><s:Body><getMetadata xmlns="http://www.sonos.com/Services/1.1"><id>'
            + ItemID + '</id><index>' + StartingIndex + '</index><count>' + RequestedCount + '</count></getMetadata></s:Body></s:Envelope>';
        var url = host + url;
        //CF.log("url is: " + url);
        //CF.log("SOAPAction is : " + SOAPAction);
        //CF.log("SOAP Body is: " + SOAPBody);
        CF.request(url, 'POST', {"CONTENT-TYPE":'text/xml; charset="utf-8"', 'SOAPAction':SOAPAction}, SOAPBody, function (status, headers, body) {
            if (status == 200) {
                //CF.log("Radio response is: " + body)
                callback(body)
            }
            else {
                CF.log('POST failed with status ' + status);
            }
        });
    }

    // Used for extracting string information

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
    name:"SonosMusicSources2", // the name of the module (mostly for display purposes)
    object:SonosMusicSources2, // the object to which the setup function belongs ("this")
    version:1.0    // An optional module version number that is displayed in the Remote Debugger
});