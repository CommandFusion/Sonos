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
        //musicServicesTopList: [{s514: "Music Library"}, {s514: "Docked iPods"}, {s514: "Radio"}, {s514: "Last.FM"}, {s514: "Spotify"}, {s514: "Sonos Playlists"}, {s514: "Line In"}]
        musicSourceDisplayArray: []
    }

    /*
     ===============================================================================


     =========================================================================
     END

     =========================================================================
     */


    return self;
}


CF.modules.push({
    name:"SonosMusicSources", // the name of the module (mostly for display purposes)
    object:SonosMusicSources, // the object to which the setup function belongs ("this")
    version:1.0    // An optional module version number that is displayed in the Remote Debugger
});