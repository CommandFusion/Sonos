var Grimwood = function() {

	var self = {
            rooms: [
			{"room": "TV Room", "matrixOutput": 3, "join": "d3000", "sonos": "15", "TV": "19"},
			{"room": "Master Bed", "matrixOutput": 0, "join": "d3002", "sonos": "03", "TV": "25" },
			{"room": "Kitchen", "matrixOutput": 2, "join": "d3003", "sonos": "03", "TV": "19" },
			{"room": "Dining Room", "matrixOutput": -1, "join": "d3001", "sonos": "03", "TV": "03"},
			{"room": "Bathroom", "matrixOutput": -1, "join": "d3004", "sonos": "05", "TV": "05"},
			{"room": "Lauren Room", "matrixOutput": -1, "join": "d3005", "sonos": "01", "TV": "01" },
			{"room": "Office", "matrixOutput": -1, "join": "d3006", "sonos": "01", "TV": "01" },
			{"room": "Record Player", "matrixOutput": -1, "join": "d3010", "sonos": "01", "TV": "01" }
		],
		devices: [
			{"device": "Virgin", "matrixInput": 1, "join": "d123"},
			{"device": "Sky", "matrixInput": 7, "join": "d117"},
			{"device": "Sonos", "matrixInput": -1, "join": "d114"},
			{"device": "Old Apple TV", "matrixInput": 2, "join": "d124"},
			{"device": "New Apple TV", "matrixInput": 4, "join": "d125"},
			{"device": "Mac Mini", "matrixInput": 0, "join": "d127"},
		],
                commandMsgQueue: [],
                currentRoom: "",
                currentMatrixOutput: 0,
                currentMatrixInput: 0,
                currentAmpIP: "",
                currentAmpZone: 0,
                feedbackTimer: "",
		ampIsConnected: false,
		lastAmpIPUsed: "192.168.1.12",
		commandInProcess: false,
		receiveCommandTimer: "",
		haveReceivedFeedback: false,
		statusIntervalTimer: "",

	
	};
        
        // Set up the various amp 
        self.init = function() {
            
        }

        self.setRoom = function (roomName) {
            CF.log("Grimwood: setRoom()");
 	    for(var roomIDX in self.rooms) {
                    if (self.rooms[roomIDX].room == roomName){
                            CF.setJoin(self.rooms[roomIDX].join, 1)
                            self.currentRoom = roomName;
                            self.currentMatrixOutput = self.rooms[roomIDX].matrixOutput;
			    self.currentTVInput = self.rooms[roomIDX].TV;
			    self.currentSonosInput = self.rooms[roomIDX].sonos;
                    }
                    else {
                            CF.setJoin(self.rooms[roomIDX].join, 0)
                    }
            }
            CF.log("Current Room is:" + self.currentRoom);
	    var zone = pioneerAmps.rooms[roomName]["Zone"];
	    CF.log("Zone is : " + zone);
	    if (!pioneerAmps.rooms[self.currentRoom]["hasAmp"]) {
		clearInterval(self.statusIntervalTimer);
	    }
	    else {
		//self.queueCommandToAmp("PowerOn","","","");
		pioneerAmps.getAmpStatus(roomName);
		self.statusIntervalTimer = setInterval(function() {self.updateAmpStatus(self.currentRoom); }, 2000);
    	    }
	}
        
        self.updateAmpStatus = function (roomName) {
	    pioneerAmps.getAmpStatus(roomName);
	}
	
	self.queueCommandToAmp = function(ampCommand, value, ampToSend, zoneToSend) {
            CF.log("Grimwood: queueCommandToAmp()");
	    pioneerAmps.sendAmpCommand(self.currentRoom, ampCommand, value);
	 }
	
        self.setDevice = function (deviceName) {
            CF.log("Grimwood: setDevice()");
            for(var deviceIDX in self.devices) {
                    if (self.devices[deviceIDX].device == deviceName){
                            CF.setJoin(self.devices[deviceIDX].join, 1)
                            self.currentDevice = deviceName;
                            self.currentMatrixInput = self.devices[deviceIDX].matrixInput;
                    }
                    else {
                            CF.log("Device to hide is: " + self.devices[deviceIDX].device + " on join: " + self.devices[deviceIDX].join)
                            CF.setJoin(self.devices[deviceIDX].join, 0)
                            
                    }
            }
            CF.log("Current device is: " + self.currentDevice);
	    self.changeMatrix(self.currentMatrixInput, self.currentMatrixOutput);
	    if (self.currentDevice != "Sonos"){
		grimmers.queueCommandToAmp("Input",self.currentTVInput,"","");
	    }
	    else {
		grimmers.queueCommandToAmp("Input",self.currentSonosInput,"","");
	    }
	}
	
	self.changeMatrix = function (input, output) {
            if (input == -1  || output == -1) {return};
            CF.log("Setting matrix to input: " + input + " and output: " +  output);
	    CF.send("HDMIMatrix", "GET /get_data?type=port&cmd=a"+output+input+" HTTP/1.1\x0D\x0A\x0D\x0A");
	}
	
    

    return self;
};

CF.modules.push({
	name: "Grimwood",	// the name of the module (mostly for display purposes)
	object: Grimwood,		// the object to which the setup function belongs ("this")
	version: 1.0				// An optional module version number that is displayed in the Remote Debugger
});