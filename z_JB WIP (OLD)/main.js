var sonosd = new SonosDiscovery();
CF.userMain = function() {
	sonosd.on('DeviceDiscovered', function(sonosDevice) {
		CF.log("Found Sonos Zone: " + sonosDevice.roomName);

	});

	sonosd.init();
};

function trim (str) {
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}