/* Sonos Viewer for CommandFusion
 ===============================================================================

 AUTHOR:	Simon Post
 CONTACT:	simon.post@mac.com
 VERSION:	v0.0.1

 =========================================================================
 HELP:

 This script is the CF.userMain called when CF starts and handles initialising
 everything that is need by the player.

 =========================================================================
 */

// ======================================================================
// Global Object
// ======================================================================

// Sonos GUI object that is used to run the GUI
// A call to this objects self.processZoneGroupNotification message is hard coded into the sonos player object
// so if you change this variable name here then you should change it there also


sonosGUI = new SONOS_GUI();
CF.userMain = function () {
	CF.log("Starting the Sonos iViewer Application");
	sonosGUI.init();
};
