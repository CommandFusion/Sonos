var PioneerAmp = function() {

    var self = {
        rooms: {"Master Bed": {"name": "Master Bed", "AmpIP":"192.168.1.12", "Zone": 0, "hasAmp" : true},
		"Bathroom": {"name": "Bathroom", "AmpIP":"192.168.1.12", "Zone": 1, "hasAmp" : true},
		"TV Room": {"name": "TV Room", "AmpIP":"192.168.1.5", "Zone": 0, "hasAmp" : true},
		"Dining Room": {"name": "Dining Room", "AmpIP":"192.168.1.5", "Zone": 1, "hasAmp" : true},
		"Kitchen": {"name": "Kitchen", "AmpIP":"192.168.1.11", "Zone": 0, "hasAmp" : true},
		"Lauren Room": {"name": "Kitchen", "AmpIP":"192.168.1.11", "Zone": 0, "hasAmp" : false},
		"Office": {"name": "Kitchen", "AmpIP":"192.168.1.11", "Zone": 0, "hasAmp" : false},
		"Record Player": {"name": "Kitchen", "AmpIP":"192.168.1.11", "Zone": 0, "hasAmp" : false}
		
    	},
	commands: { "Zone0": {"PowerOn":"PO", "PowerOff":"PF", "VolumeUp":"VU", "VolumeDown":"VD", "MuteOn":"MO", "MuteOff":"MF", "Input":"00:FN", "ListeningMode":"0000:SR", "SetVolume":"000VL"},
		    "Zone1": {"PowerOn":"APO", "PowerOff":"APF", "VolumeUp":"ZU", "VolumeDown":"ZD", "MuteOn":"Z2MO", "MuteOff":"Z2MF", "Input":"00:ZS", "ListeningMode":"", "SetVolume":"00ZV"}
	},
	leadingZeros: "000000",
	ampStatus: [],
    }
    
    self.getAmpStatus = function(amp) {
        //CF.log("PioneerAmp: getAmpStatus");
  	//CF.log("Room is:" + amp + " and Amp IP is : " + self.rooms[amp]["AmpIP"]);
	CF.request("http://" + self.rooms[amp]["AmpIP"] + "/StatusHandler.asp", function(status, headers, body) {
               if (status == 200) {
    		var ampResponse = JSON.parse(body);
		self.ampStatus[amp] = ampResponse;		
		var zone = self.rooms[amp]["Zone"];
		//CF.log("Power status for  is " + parseInt(self.ampStatus[amp]["Z"][zone]["P"]));
		CF.setJoin("d4001", parseInt(self.ampStatus[amp]["Z"][zone]["P"]));
		CF.setJoin("d4000", parseInt(self.ampStatus[amp]["Z"][zone]["M"]));
 		CF.setJoin("s9000", parseInt(self.ampStatus[amp]["Z"][zone]["V"]));
           } else {
                   CF.log("Error: returned status code " + status);
               }
            });
	
    }
    
    self.processAmpResponse = function (status, headers, body) {
	if (status == 200) {
		// extract information from body here
		CF.log("Request succeeded (HTTP 200 OK). Body received: " + body);
		var ampStatus = JSON.parse(body);
		
	
	} else {
	    // an error occurred, display the returned status code
	    CF.log("Error: returned status code " + status);
	}
    }
    
    ///EventHandler.asp?WebToHostItem=PO
    
    self.sendAmpCommand = function (amp, command, value) {
	if (!self.rooms[amp]["hasAmp"]) {return};  // if zone is not found it means the room does not have an amp
	var zone = self.rooms[amp]["Zone"];
	var ampString =  self.commands["Zone"+zone][command];
	if (ampString.indexOf(":") >= 0) {  // adds the value to commands like VL that have to send aoframted number
	    ampString = ampString.split(":");
	    ampString = (ampString[0] + value).slice(-ampString[0].length) + ampString[1];			    		    
	}
	CF.log("CommandSent is : " + ampString);
	CF.request("http://" + self.rooms[amp]["AmpIP"] + "/EventHandler.asp?WebToHostItem=" + ampString, function(status, headers, body) {
               if (status == 200) {
	   	 	CF.log("Command response was: " + body);
	        } else {
                   CF.log("Error: returned status code " + status);
               }
		});
    }
  
    
    return self;
};


// Send a GET request to obtain the contents from Apple main page
CF.request("http://www.apple.com", testWebCallback);


CF.modules.push({
	name: "PioneerAmp",	// the name of the module (mostly for display purposes)
	object: PioneerAmp,		// the object to which the setup function belongs ("this")
	version: 1.0				// An optional module version number that is displayed in the Remote Debugger
});