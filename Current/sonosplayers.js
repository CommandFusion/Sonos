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
		Utils.debugLog("Commencing discovery of Sonos players");
        self.notificationSystemNumber = 1;
        self.DiscoveredPlayers = {};
        var sonosDiscover = new SonosDiscovery();
		sonosDiscover.init();
		sonosDiscover.SonosDiscoveredCallback = function (sonosDiscovered) {
			//Utils.debugLog("Found Sonos Zone within SonosPlayers.js: " + sonosDiscovered.roomName);
			//Utils.debugLogObject(sonosDiscovered);
            if (sonosDiscovered.modelName != "Sonos DOCK WD100" && sonosDiscovered.modelName != "Sonos SUB") {
                var sonosObj = new SonosPlayer();
                sonosObj.init(sonosDiscovered, self.notificationSystemNumber);
                //Utils.debugLog("Initialised sonos player " + sonosObj.roomName);
                //Utils.debugLogObject(sonosObj);
                self.notificationSystemNumber++;
                self.discoveredPlayers[sonosDiscovered.RINCON] = sonosObj;
                if (self.sonosPlayersCallback !== null) {
                    self.sonosPlayersCallback(self.discoveredPlayers);
                }
            }
            else {
                Utils.debugLog("found and ignored a sub or dock");
            }
		};
	};

    self.returnIPAddrFromRINCON = function (RINCON) {
        Utils.debugLog("getting IP address from RINCON " + RINCON);
        for (var player in self.discoveredPlayers) {
            if (RINCON === self.discoveredPlayers[player].RINCON) {
                Utils.debugLog("Player with RINCON " + RINCON + " has IP: " + self.discoveredPlayers[player].IP);
                return self.discoveredPlayers[player].IP
            }
        }
    }


	return self;
};

CF.modules.push({
	                name   :"Sonos Players", // the name of the module (mostly for display purposes)
	                object :SonosPlayers, // the object to which the setup function belongs ("this")
	                version:1.0                // An optional module version number that is displayed in the Remote Debugger
                });