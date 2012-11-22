/**
 * Created with JetBrains WebStorm.
 * User: posts
 * Date: 02/11/2012
 * Time: 10:24
 * To change this template use File | Settings | File Templates.
 */

test = { coordinatorRINCON:{
{
	RINCON: deviceRINCON, roomName
:
	deviceRoomName, volume
:
	deviceVolume, mute
:
	deviceMute
}
,
{
	coordinatorName: zoneCoordinatorName, coordinatorRINCON
:
	zoneCoordinatorRINCON, RINCON
:
	deviceRINCON, roomName
:
	deviceRoomName
}
]
}

fred = {zones:{coordinatorRINCON:[
	{zoneRINCON:deviceRINCON, zoneName:deviceRoomName},
	{zoneRINCON:deviceRINCON, zoneName:deviceRoomName}
]
}
}

create
two
arrays, one
of
coordinators
and
one
of
coordinators
plus
the
coordinate
zones
sort
the
coordinators
array
by
name
sort
the
coordinated
zones
by
name
cycle
through
the
coordinators
once
sorted
and
get
any
zones
from
the
coordinatee
array
which
have
that
coordinator in sequence

zoneTopology[coordinatorRINCON].coordinatorName = coordinatorRINCON;
zoneTopology[coordinatorRINCON].push({zoneRINCON:deviceRINCON, zoneName:deviceRoomName});

john = { rooms:{"Master Bed":{"name":"Master Bed", "AmpIP":"192.168.1.12", "Zone":0, "hasAmp":true},
	"Bathroom"              :{"name":"Bathroom", "AmpIP":"192.168.1.12", "Zone":1, "hasAmp":true},
	"TV Room"               :{"name":"TV Room", "AmpIP":"192.168.1.5", "Zone":0, "hasAmp":true},
	"Dining Room"           :{"name":"Dining Room", "AmpIP":"192.168.1.5", "Zone":1, "hasAmp":true},
	"Kitchen"               :{"name":"Kitchen", "AmpIP":"192.168.1.11", "Zone":0, "hasAmp":true},
	"Lauren Room"           :{"name":"Kitchen", "AmpIP":"192.168.1.11", "Zone":0, "hasAmp":false},
	"Office"                :{"name":"Kitchen", "AmpIP":"192.168.1.11", "Zone":0, "hasAmp":false},
	"Record Player"         :{"name":"Kitchen", "AmpIP":"192.168.1.11", "Zone":0, "hasAmp":false}
};

if (!self.userZoneGroupingUnderway) { // this is set if a user is doing a zone grouping so that we dont process any zone changes which would mess up the zonesGrouping array
	self.userZoneGroupingUnderway = true; // stop another message being processed half way through
	self.currentZoneGroupStructure = {};  // Clear current grouping
	// We need a tmp copy because we have info like current track etc in the array which we will want to put
	// back into the new new zone group array once it has been built (this info does not come in
	// the zone notify message
	var zoneCoordinatorRINCON = ""; // will hold the coordinator of the current grouped zones
	var zoneCoordinatorName = ""  // Zone coordinator name which we use to make sorting easier
	var groupNodes = jQuery(response).find("ZoneGroup"); //find all the ZoneGroups
	for (var i = 0; i < groupNodes.length; i++) { // loop around for the number of grouped zones
		var numZoneMembers = groupNodes[i].childNodes.length;  // get how many zone members there are: 1 = zone is not grouped, >1 is in group but bear in mind some maybe Invisible like a sub woofer (Anvil)
		if (numZoneMembers == 1 && groupNodes[i].childNodes[0].hasAttribute("Invisible")) {  //all devices such as wireless docks, subs etc carry an invisible flag that we can use to exclude them from the zone group
			continue;
		}
		zoneCoordinatorRINCON = groupNodes[i].attributes["Coordinator"].value;  //  get the UUID of the coordinator of the zone
		self.zoneCoordinators.push({RINCON:zoneCoordinatorRINCON, roomName:zoneCoordinatorName})
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

	for (var i = 0; i < self.zoneMembers.length, i++) {
		if (currentZoneIncludedZoneDisplay) {
			continue
		}
		var currentZoneCoordinatorRINCON = self.zoneMembers[i].coordinatorRINCON;
		var currentZoneRINCON = self.zoneMembers[i].RINCON;
		var currentZoneRoomName = self.zoneMembers[i].roomName;
		var currentZoneIncludedZoneDisplay = self.zoneMembers[i].includedZoneDisplay;
		for (var j = i; i < self.zoneMembers.length, i++) {
			if (currentZoneIncludedZoneDisplay) {
				continue
			}
			if (currentZoneCoordinatorRINCON === currentZoneRINCON) {
				self.zoneDisplay[currentZoneCoordinatorRINCON].push({RINCON:currentZoneRINCON, roomName:currentZoneRoomName});
				self.zoneMembers[j].includedZoneDisplay = true;
			}
		}
	}
}


self.userZoneGroupingUnderway = false;  // allow processing again
}




NOTIFY /notify HTTP/1.1
HOST: 192.168.1.78:3400
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 4141
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283BD401400_sub0000015590
SEQ: 1

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneGroupState>&lt;ZoneGroups&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A1C401400&quot; ID=&quot;RINCON_000E5828A1C401400:79&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A1C401400&quot; Location=&quot;http://192.168.1.90:1400/xml/device_description.xml&quot; ZoneName=&quot;Record Player&quot; Icon=&quot;x-rincon-roomicon:den&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;55&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5855842601400&quot; ID=&quot;RINCON_000E5855842601400:23&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5855842601400&quot; Location=&quot;http://192.168.1.75:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;13&quot;/&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58980FE001400&quot; Location=&quot;http://192.168.1.62:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; Invisible=&quot;1&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;15&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E585445BA01400&quot; ID=&quot;RINCON_000E585445BA01400:10&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E585445BA01400&quot; Location=&quot;http://192.168.1.65:1400/xml/device_description.xml&quot; ZoneName=&quot;Lauren Room&quot; Icon=&quot;x-rincon-roomicon:living&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;17&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828228801400&quot; ID=&quot;RINCON_000E5828228801400:216&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828228801400&quot; Location=&quot;http://192.168.1.67:1400/xml/device_description.xml&quot; ZoneName=&quot;Kitchen&quot; Icon=&quot;x-rincon-roomicon:kitchen&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;101&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A20201400&quot; ID=&quot;RINCON_000E58283BD401400:187&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A20201400&quot; Location=&quot;http://192.168.1.74:1400/xml/device_description.xml&quot; ZoneName=&quot;Master Bed&quot; Icon=&quot;x-rincon-roomicon:masterbedroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;101&quot;/&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283BD401400&quot; Location=&quot;http://192.168.1.77:1400/xml/device_description.xml&quot; ZoneName=&quot;Bathroom&quot; Icon=&quot;x-rincon-roomicon:bathroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;114&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58289F2E01400&quot; ID=&quot;RINCON_000E58289F2E01400:111&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58289F2E01400&quot; Location=&quot;http://192.168.1.76:1400/xml/device_description.xml&quot; ZoneName=&quot;Dining Room&quot; Icon=&quot;x-rincon-roomicon:dining&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;103&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283AC801400&quot; ID=&quot;RINCON_000E58283AC801400:112&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283AC801400&quot; Location=&quot;http://192.168.1.73:1400/xml/device_description.xml&quot; ZoneName=&quot;TV Room&quot; Icon=&quot;x-rincon-roomicon:tvroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;105&quot;/&gt;&lt;/ZoneGroup&gt;&lt;/ZoneGroups&gt;</ZoneGroupState></e:property></e:propertyset>