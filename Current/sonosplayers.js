/* Sonos Viewer for CommandFusion
 ===============================================================================

 AUTHOR:	Simon Post
 CONTACT:	simon.post@mac.com
 VERSION:	v0.0.1

 =========================================================================
 HELP:

 This script discovers the players and creates an array of the players
 and calls their initialisation

 =========================================================================
 */

// ======================================================================
// Global Object
// ======================================================================

var SonosPlayers = function (params) {

	var self = {
		discoveredPlayers       :{},
		notificationSystemNumber:1, // Used to give each player its own notification system in CommandFusion to get better notification message handling
		sonosPlayersCallback    :null
	};

	self.init = function () {
		CF.log("Commencing discovery of Sonos players");
		var sonosDiscover = new SonosDiscovery();
		sonosDiscover.init();
		sonosDiscover.SonosDiscoveredCallback = function (sonosDiscovered) {
			CF.log("Found Sonos Zone within SonosPlayers.js: " + sonosDiscovered.roomName);
			//CF.logObject(sonosDiscovered);
			var sonosObj = new SonosPlayer();
			sonosObj.init(sonosDiscovered, self.notificationSystemNumber);
			//CF.logObject(sonosObj);
			self.notificationSystemNumber++;
			self.discoveredPlayers[sonosDiscovered.RINCON] = sonosObj;
			if (self.sonosPlayersCallback !== null) {
				self.sonosPlayersCallback(self.discoveredPlayers);
			}
		};
	};


	return self;
};

CF.modules.push({
	                name   :"Sonos Players", // the name of the module (mostly for display purposes)
	                object :SonosPlayers, // the object to which the setup function belongs ("this")
	                version:1.0                // An optional module version number that is displayed in the Remote Debugger
                });