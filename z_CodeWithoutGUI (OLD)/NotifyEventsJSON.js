
> Javascript interface up and running, opening connection with iViewer
> Established connection with iViewer
> Javascript starting up. iViewer version: v4.0.214 build 215
> Initializing modules
> Module found: Grimwood version: 1
> Module found: XML.ObjTree version: 1
> Started sonos routines
> Commencing Sonos device discovery
> Discovering Zones still
> No more zones to discover
> Got Sonos XML
> Subscribing to events
> The raw event is: NOTIFY /Alarm Clock HTTP/1.1
HOST: 192.168.1.41:3404
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 629
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A20201400_sub0000003038
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><TimeZone>00000a000502000003000501ffc4</TimeZone></e:property><e:property><TimeServer>0.sonostime.pool.ntp.org,1.sonostime.pool.ntp.org,2.sonostime.pool.ntp.org,3.sonostime.pool.ntp.org</TimeServer></e:property><e:property><TimeGeneration>4</TimeGeneration></e:property><e:property><AlarmListVersion>RINCON_000E5828228801400:22</AlarmListVersion></e:property><e:property><TimeFormat>INV</TimeFormat></e:property><e:property><DateFormat>INV</DateFormat></e:property><e:property><DailyIndexRefreshTime>02:00:00</DailyIndexRefreshTime></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "TimeZone": "00000a000502000003000501ffc4" },
      { "TimeServer": "0.sonostime.pool.ntp.org,1.sonostime.pool.ntp.org,2.sonostime.pool.ntp.org,3.sonostime.pool.ntp.org" },
      { "TimeGeneration": "4" },
      { "AlarmListVersion": "RINCON_000E5828228801400:22" },
      { "TimeFormat": "INV" },
      { "DateFormat": "INV" },
      { "DailyIndexRefreshTime": "02:00:00" }
    ]
  }
}
> The raw event is: NOTIFY /Music Services HTTP/1.1
HOST: 192.168.1.41:3404
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 166
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A20201400_sub0000003039
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ServiceListVersion>RINCON_000E5828228801400:943</ServiceListVersion></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": { "ServiceListVersion": "RINCON_000E5828228801400:943" }
  }
}
> The raw event is: NOTIFY /Audio In HTTP/1.1
HOST: 192.168.1.41:3404
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 360
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A20201400_sub0000003040
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><AudioInputName>Line-In</AudioInputName></e:property><e:property><Icon></Icon></e:property><e:property><LineInConnected>0</LineInConnected></e:property><e:property><LeftLineInLevel>1</LeftLineInLevel></e:property><e:property><RightLineInLevel>1</RightLineInLevel></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "AudioInputName": "Line-In" },
      {
        
      },
      { "LineInConnected": "0" },
      { "LeftLineInLevel": "1" },
      { "RightLineInLevel": "1" }
    ]
  }
}
> The raw event is: NOTIFY /Device Properties HTTP/1.1
HOST: 192.168.1.41:3404
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 714
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A20201400_sub0000003041
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneName>Master Bed</ZoneName></e:property><e:property><Icon>x-rincon-roomicon:masterbedroom</Icon></e:property><e:property><Invisible>0</Invisible></e:property><e:property><IsZoneBridge>0</IsZoneBridge></e:property><e:property><SettingsReplicationState>RINCON_000E5828228801400,17,RINCON_FFFFFFFFFFFF99999,0,RINCON_000E58283BD401400,48,RINCON_000E5828228801400,216,RINCON_000E5828228801400,87,RINCON_000E5828A1C401400,58,RINCON_000E5828228801400,943,RINCON_000E5855842601400,76,RINCON_000E5828228801400,4,RINCON_000E5828A1C401400,27</SettingsReplicationState></e:property><e:property><ChannelMapSet></ChannelMapSet></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "ZoneName": "Master Bed" },
      { "Icon": "x-rincon-roomicon:masterbedroom" },
      { "Invisible": "0" },
      { "IsZoneBridge": "0" },
      { "SettingsReplicationState": "RINCON_000E5828228801400,17,RINCON_FFFFFFFFFFFF99999,0,RINCON_000E58283BD401400,48,RINCON_000E5828228801400,216,RINCON_000E5828228801400,87,RINCON_000E5828A1C401400,58,RINCON_000E5828228801400,943,RINCON_000E5855842601400,76,RINCON_000E5828228801400,4,RINCON_000E5828A1C401400,27" },
      {
        
      }
    ]
  }
}
> The raw event is: NOTIFY /Zone Group HTTP/1.1
HOST: 192.168.1.41:3404
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 5809
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A20201400_sub0000003042
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneGroupState>&lt;ZoneGroups&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58289F2E01400&quot; ID=&quot;RINCON_000E58289F2E01400:106&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58289F2E01400&quot; Location=&quot;http://192.168.1.39:1400/xml/device_description.xml&quot; ZoneName=&quot;Dining Room&quot; Icon=&quot;x-rincon-roomicon:dining&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;99&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E585445BA01400&quot; ID=&quot;RINCON_000E585445BA01400:6&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E585445BA01400&quot; Location=&quot;http://192.168.1.28:1400/xml/device_description.xml&quot; ZoneName=&quot;Lauren Room&quot; Icon=&quot;x-rincon-roomicon:living&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;15&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5855842601400&quot; ID=&quot;RINCON_000E5855842601400:17&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58980FE001400&quot; Location=&quot;http://192.168.1.32:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; Invisible=&quot;1&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;14&quot;/&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5855842601400&quot; Location=&quot;http://192.168.1.26:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;9&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283BD401400&quot; ID=&quot;RINCON_000E58283BD401400:177&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283BD401400&quot; Location=&quot;http://192.168.1.38:1400/xml/device_description.xml&quot; ZoneName=&quot;Bathroom&quot; Icon=&quot;x-rincon-roomicon:bathroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;110&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828228801400&quot; ID=&quot;RINCON_000E58283BD401400:176&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828228801400&quot; Location=&quot;http://192.168.1.37:1400/xml/device_description.xml&quot; ZoneName=&quot;Kitchen&quot; Icon=&quot;x-rincon-roomicon:kitchen&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;95&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A1C401400&quot; ID=&quot;RINCON_000E5828A1C401400:76&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A1C401400&quot; Location=&quot;http://192.168.1.34:1400/xml/device_description.xml&quot; ZoneName=&quot;Record Player&quot; Icon=&quot;x-rincon-roomicon:den&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;47&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283AC801400&quot; ID=&quot;RINCON_000E58283AC801400:103&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283AC801400&quot; Location=&quot;http://192.168.1.27:1400/xml/device_description.xml&quot; ZoneName=&quot;TV Room&quot; Icon=&quot;x-rincon-roomicon:tvroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;102&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A20201400&quot; ID=&quot;RINCON_000E5828A20201400:185&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A20201400&quot; Location=&quot;http://192.168.1.36:1400/xml/device_description.xml&quot; ZoneName=&quot;Master Bed&quot; Icon=&quot;x-rincon-roomicon:masterbedroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;97&quot;/&gt;&lt;/ZoneGroup&gt;&lt;/ZoneGroups&gt;</ZoneGroupState></e:property><e:property><ThirdPartyMediaServersX>2:w55vVgh3W2KS60JbYGBZzO4e+zP8R77tSW0ne1+MauZFiojxuPF/ySTP/8luJsQahsDftawgpvN4DWFaJu5vE8LYNlNdH6eGpXF88ABW5vYBnO4kxfj7k7eb9RHD14l45jBR9ln0uhFIlOtAg/xu2Y8beLuSGxvr6sp5durXW30V5wEOZthqB78x6LbV7SjRgGRDb2RaeIlX1ZVqbc32sUkovMC3qQw6GX/oyW6LOO804ru16IfqD3nhJPXRv+Z7UjsW++W15WgbFwK8KuA8hgkoTMEGz56XMs+mCuMGZc85zbx07pE75to5Tg3MBoEyLVzC34LkTavYfndu6B4VZjinfElikLhaN+t+GkGgM8THky+8HQtHj7f6kM3QRm6+A2LT3/4NPotQqsad9dYVHrVpxeWS7uIqhg/e2LFddCfKD3NiJTDNfT2BGNRXb5O2BUqholzzhb5ykHgPTw/o4lNukBH430568hrzP3yUIJNCXT1p/svp8MfNxaAMpfSTNLvV0K7dm8UYxovuP55D4ZZ1sXAAr9TcbEu8BW9R2VEej5B84hLklUphAXNs3EdyFJhaU/KUZmS9eYWgSnPeJJd/7cEMbn4mSyRCXmRy1HC/2t0vZzB9EybdosrArKwOoorFfxt3K0M7fXheV6mQz3Lt/zvjke6WP75rcEWYX+k/ClsthwdKgD1274iJ1+Pvc7lG6/2R6NqODD9G4NrT3KqotLjpieFJA0KLLlJSoc2mq+wo+T2kD8tdO2VnNcJ6oO48Z7MuUxDfV37+FRkPtfaRxR6LLlcsTSZ3tlVCPIBAUftzAgA0RAUTv/mWMcm4f0W/nncS5/HmaYFD+2yKMuqSY8BgTtEv5HcYKkTEwkjVWQDTCpgev1c3BOqQfeV3xWPmEMz8GANsP/jKnbCBU5mgvaN/86EICwP9vKOWaXU=</ThirdPartyMediaServersX></e:property><e:property><AvailableSoftwareUpdate>&lt;UpdateItem xmlns=&quot;urn:schemas-rinconnetworks-com:update-1-0&quot; Type=&quot;Software&quot; Version=&quot;19.3-53220&quot; UpdateURL=&quot;http://update.sonos.com/firmware/Gold/v3.8-Hammer-RC2/^19.3-53220&quot; DownloadSize=&quot;0&quot; ManifestURL=&quot;http://update.sonos.com/firmware/Gold/v3.8.2-Hammer-Patch-MDCR/update_1344386463.upm&quot;/&gt;</AvailableSoftwareUpdate></e:property><e:property><AlarmRunSequence>RINCON_000E5828A20201400:97:0</AlarmRunSequence></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      {
        "ZoneGroupState": {
          "ZoneGroups": {
            "ZoneGroup": [
              {
                "-Coordinator": "RINCON_000E58289F2E01400",
                "-ID": "RINCON_000E58289F2E01400:106",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58289F2E01400",
                  "-Location": "http://192.168.1.39:1400/xml/device_description.xml",
                  "-ZoneName": "Dining Room",
                  "-Icon": "x-rincon-roomicon:dining",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "99"
                }
              },
              {
                "-Coordinator": "RINCON_000E585445BA01400",
                "-ID": "RINCON_000E585445BA01400:6",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E585445BA01400",
                  "-Location": "http://192.168.1.28:1400/xml/device_description.xml",
                  "-ZoneName": "Lauren Room",
                  "-Icon": "x-rincon-roomicon:living",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "15"
                }
              },
              {
                "-Coordinator": "RINCON_000E5855842601400",
                "-ID": "RINCON_000E5855842601400:17",
                "ZoneGroupMember": [
                  {
                    "-UUID": "RINCON_000E58980FE001400",
                    "-Location": "http://192.168.1.32:1400/xml/device_description.xml",
                    "-ZoneName": "Office",
                    "-Icon": "x-rincon-roomicon:office",
                    "-Invisible": "1",
                    "-SoftwareVersion": "19.3-53220b",
                    "-MinCompatibleVersion": "19.1-00000",
                    "-ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW",
                    "-BootSeq": "14"
                  },
                  {
                    "-UUID": "RINCON_000E5855842601400",
                    "-Location": "http://192.168.1.26:1400/xml/device_description.xml",
                    "-ZoneName": "Office",
                    "-Icon": "x-rincon-roomicon:office",
                    "-SoftwareVersion": "19.3-53220b",
                    "-MinCompatibleVersion": "19.1-00000",
                    "-ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW",
                    "-BootSeq": "9"
                  }
                ]
              },
              {
                "-Coordinator": "RINCON_000E58283BD401400",
                "-ID": "RINCON_000E58283BD401400:177",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58283BD401400",
                  "-Location": "http://192.168.1.38:1400/xml/device_description.xml",
                  "-ZoneName": "Bathroom",
                  "-Icon": "x-rincon-roomicon:bathroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "110"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828228801400",
                "-ID": "RINCON_000E58283BD401400:176",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828228801400",
                  "-Location": "http://192.168.1.37:1400/xml/device_description.xml",
                  "-ZoneName": "Kitchen",
                  "-Icon": "x-rincon-roomicon:kitchen",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "95"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828A1C401400",
                "-ID": "RINCON_000E5828A1C401400:76",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828A1C401400",
                  "-Location": "http://192.168.1.34:1400/xml/device_description.xml",
                  "-ZoneName": "Record Player",
                  "-Icon": "x-rincon-roomicon:den",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "47"
                }
              },
              {
                "-Coordinator": "RINCON_000E58283AC801400",
                "-ID": "RINCON_000E58283AC801400:103",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58283AC801400",
                  "-Location": "http://192.168.1.27:1400/xml/device_description.xml",
                  "-ZoneName": "TV Room",
                  "-Icon": "x-rincon-roomicon:tvroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "102"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828A20201400",
                "-ID": "RINCON_000E5828A20201400:185",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828A20201400",
                  "-Location": "http://192.168.1.36:1400/xml/device_description.xml",
                  "-ZoneName": "Master Bed",
                  "-Icon": "x-rincon-roomicon:masterbedroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "97"
                }
              }
            ]
          }
        }
      },
      { "ThirdPartyMediaServersX": "2:w55vVgh3W2KS60JbYGBZzO4e+zP8R77tSW0ne1+MauZFiojxuPF/ySTP/8luJsQahsDftawgpvN4DWFaJu5vE8LYNlNdH6eGpXF88ABW5vYBnO4kxfj7k7eb9RHD14l45jBR9ln0uhFIlOtAg/xu2Y8beLuSGxvr6sp5durXW30V5wEOZthqB78x6LbV7SjRgGRDb2RaeIlX1ZVqbc32sUkovMC3qQw6GX/oyW6LOO804ru16IfqD3nhJPXRv+Z7UjsW++W15WgbFwK8KuA8hgkoTMEGz56XMs+mCuMGZc85zbx07pE75to5Tg3MBoEyLVzC34LkTavYfndu6B4VZjinfElikLhaN+t+GkGgM8THky+8HQtHj7f6kM3QRm6+A2LT3/4NPotQqsad9dYVHrVpxeWS7uIqhg/e2LFddCfKD3NiJTDNfT2BGNRXb5O2BUqholzzhb5ykHgPTw/o4lNukBH430568hrzP3yUIJNCXT1p/svp8MfNxaAMpfSTNLvV0K7dm8UYxovuP55D4ZZ1sXAAr9TcbEu8BW9R2VEej5B84hLklUphAXNs3EdyFJhaU/KUZmS9eYWgSnPeJJd/7cEMbn4mSyRCXmRy1HC/2t0vZzB9EybdosrArKwOoorFfxt3K0M7fXheV6mQz3Lt/zvjke6WP75rcEWYX+k/ClsthwdKgD1274iJ1+Pvc7lG6/2R6NqODD9G4NrT3KqotLjpieFJA0KLLlJSoc2mq+wo+T2kD8tdO2VnNcJ6oO48Z7MuUxDfV37+FRkPtfaRxR6LLlcsTSZ3tlVCPIBAUftzAgA0RAUTv/mWMcm4f0W/nncS5/HmaYFD+2yKMuqSY8BgTtEv5HcYKkTEwkjVWQDTCpgev1c3BOqQfeV3xWPmEMz8GANsP/jKnbCBU5mgvaN/86EICwP9vKOWaXU=" },
      {
        "AvailableSoftwareUpdate": {
          "UpdateItem": {
            "-xmlns": "urn:schemas-rinconnetworks-com:update-1-0",
            "-Type": "Software",
            "-Version": "19.3-53220",
            "-UpdateURL": "http://update.sonos.com/firmware/Gold/v3.8-Hammer-RC2/^19.3-53220",
            "-DownloadSize": "0",
            "-ManifestURL": "http://update.sonos.com/firmware/Gold/v3.8.2-Hammer-Patch-MDCR/update_1344386463.upm"
          }
        }
      },
      { "AlarmRunSequence": "RINCON_000E5828A20201400:97:0" }
    ]
  }
}
> The raw event is: NOTIFY /Group Management HTTP/1.1
HOST: 192.168.1.41:3404
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 235
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A20201400_sub0000003043
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><GroupCoordinatorIsLocal>1</GroupCoordinatorIsLocal></e:property><e:property><LocalGroupUUID>RINCON_000E5828A20201400:185</LocalGroupUUID></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "GroupCoordinatorIsLocal": "1" },
      { "LocalGroupUUID": "RINCON_000E5828A20201400:185" }
    ]
  }
}
> The raw event is: NOTIFY /Content Directory HTTP/1.1
HOST: 192.168.1.41:3404
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 906
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A20201400_sub0000003044
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><SystemUpdateID>7</SystemUpdateID></e:property><e:property><ContainerUpdateIDs>S:,2</ContainerUpdateIDs></e:property><e:property><ShareListRefreshState>NOTRUN</ShareListRefreshState></e:property><e:property><ShareIndexInProgress>0</ShareIndexInProgress></e:property><e:property><ShareIndexLastError></ShareIndexLastError></e:property><e:property><RadioFavoritesUpdateID>RINCON_000E5828228801400,17</RadioFavoritesUpdateID></e:property><e:property><RadioLocationUpdateID>RINCON_000E5828228801400,87</RadioLocationUpdateID></e:property><e:property><SavedQueuesUpdateID>RINCON_000E58283BD401400,48</SavedQueuesUpdateID></e:property><e:property><ShareListUpdateID>RINCON_000E5828228801400,216</ShareListUpdateID></e:property><e:property><RecentlyPlayedUpdateID>RINCON_000E5855842601400,76</RecentlyPlayedUpdateID></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "SystemUpdateID": "7" },
      { "ContainerUpdateIDs": "S:,2" },
      { "ShareListRefreshState": "NOTRUN" },
      { "ShareIndexInProgress": "0" },
      {
        
      },
      { "RadioFavoritesUpdateID": "RINCON_000E5828228801400,17" },
      { "RadioLocationUpdateID": "RINCON_000E5828228801400,87" },
      { "SavedQueuesUpdateID": "RINCON_000E58283BD401400,48" },
      { "ShareListUpdateID": "RINCON_000E5828228801400,216" },
      { "RecentlyPlayedUpdateID": "RINCON_000E5855842601400,76" }
    ]
  }
}
> The raw event is: NOTIFY /Render Control HTTP/1.1
HOST: 192.168.1.41:3404
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 1060
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A20201400_sub0000003045
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><LastChange>&lt;Event xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/RCS/&quot;&gt;&lt;InstanceID val=&quot;0&quot;&gt;&lt;Volume channel=&quot;Master&quot; val=&quot;22&quot;/&gt;&lt;Volume channel=&quot;LF&quot; val=&quot;100&quot;/&gt;&lt;Volume channel=&quot;RF&quot; val=&quot;100&quot;/&gt;&lt;Mute channel=&quot;Master&quot; val=&quot;0&quot;/&gt;&lt;Mute channel=&quot;LF&quot; val=&quot;0&quot;/&gt;&lt;Mute channel=&quot;RF&quot; val=&quot;0&quot;/&gt;&lt;Bass val=&quot;0&quot;/&gt;&lt;Treble val=&quot;0&quot;/&gt;&lt;Loudness channel=&quot;Master&quot; val=&quot;0&quot;/&gt;&lt;OutputFixed val=&quot;0&quot;/&gt;&lt;HeadphoneConnected val=&quot;0&quot;/&gt;&lt;SpeakerSize val=&quot;-1&quot;/&gt;&lt;SubGain val=&quot;0&quot;/&gt;&lt;SubCrossover val=&quot;0&quot;/&gt;&lt;SubPolarity val=&quot;0&quot;/&gt;&lt;SubEnabled val=&quot;1&quot;/&gt;&lt;PresetNameList&gt;FactoryDefaults&lt;/PresetNameList&gt;&lt;/InstanceID&gt;&lt;/Event&gt;</LastChange></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": {
      "LastChange": {
        "Event": {
          "-xmlns": "urn:schemas-upnp-org:metadata-1-0/RCS/",
          "InstanceID": {
            "-val": "0",
            "Volume": [
              {
                "-channel": "Master",
                "-val": "22"
              },
              {
                "-channel": "LF",
                "-val": "100"
              },
              {
                "-channel": "RF",
                "-val": "100"
              }
            ],
            "Mute": [
              {
                "-channel": "Master",
                "-val": "0"
              },
              {
                "-channel": "LF",
                "-val": "0"
              },
              {
                "-channel": "RF",
                "-val": "0"
              }
            ],
            "Bass": { "-val": "0" },
            "Treble": { "-val": "0" },
            "Loudness": {
              "-channel": "Master",
              "-val": "0"
            },
            "OutputFixed": { "-val": "0" },
            "HeadphoneConnected": { "-val": "0" },
            "SpeakerSize": { "-val": "-1" },
            "SubGain": { "-val": "0" },
            "SubCrossover": { "-val": "0" },
            "SubPolarity": { "-val": "0" },
            "SubEnabled": { "-val": "1" },
            "PresetNameList": "FactoryDefaults"
          }
        }
      }
    }
  }
}
> The raw event is: NOTIFY /Connection Manager HTTP/1.1
HOST: 192.168.1.41:3404
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 1925
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A20201400_sub0000003046
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><SourceProtocolInfo></SourceProtocolInfo></e:property><e:property><SinkProtocolInfo>http-get:*:audio/mp3:*,x-file-cifs:*:audio/mp3:*,http-get:*:audio/mp4:*,x-file-cifs:*:audio/mp4:*,http-get:*:audio/mpeg:*,x-file-cifs:*:audio/mpeg:*,http-get:*:audio/mpegurl:*,x-file-cifs:*:audio/mpegurl:*,real.com-rhapsody-http-1-0:*:audio/mpegurl:*,file:*:audio/mpegurl:*,http-get:*:audio/mpeg3:*,x-file-cifs:*:audio/mpeg3:*,http-get:*:audio/wav:*,x-file-cifs:*:audio/wav:*,http-get:*:audio/wma:*,x-file-cifs:*:audio/wma:*,http-get:*:audio/x-ms-wma:*,x-file-cifs:*:audio/x-ms-wma:*,http-get:*:audio/aiff:*,x-file-cifs:*:audio/aiff:*,http-get:*:audio/flac:*,x-file-cifs:*:audio/flac:*,http-get:*:application/ogg:*,x-file-cifs:*:application/ogg:*,http-get:*:audio/audible:*,x-file-cifs:*:audio/audible:*,real.com-rhapsody-http-1-0:*:audio/x-ms-wma:*,real.com-rhapsody-direct:*:audio/mp3:*,sonos.com-mms:*:audio/x-ms-wma:*,sonos.com-http:*:audio/mpeg3:*,sonos.com-http:*:audio/mpeg:*,sonos.com-http:*:audio/wma:*,sonos.com-http:*:audio/mp4:*,sonos.com-http:*:audio/wav:*,sonos.com-http:*:audio/aiff:*,sonos.com-http:*:audio/flac:*,sonos.com-http:*:application/ogg:*,sonos.com-spotify:*:audio/x-spotify:*,sonos.com-rtrecent:*:audio/x-sonos-recent:*,real.com-rhapsody-http-1-0:*:audio/x-rhap-radio:*,real.com-rhapsody-direct:*:audio/x-rhap-radio:*,pandora.com-pndrradio:*:audio/x-pandora-radio:*,pandora.com-pndrradio-http:*:audio/mpeg3:*,sirius.com-sirradio:*:audio/x-sirius-radio:*,x-rincon:*:*:*,x-rincon-mp3radio:*:*:*,x-rincon-playlist:*:*:*,x-rincon-queue:*:*:*,x-rincon-stream:*:*:*,x-sonosapi-stream:*:*:*,x-sonosapi-radio:*:audio/x-sonosapi-radio:*,x-rincon-cpcontainer:*:*:*,last.fm-radio:*:audio/x-lastfm-radio:*,last.fm-radio-http:*:audio/mpeg3:*</SinkProtocolInfo></e:property><e:property><CurrentConnectionIDs></CurrentConnectionIDs></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      {
        
      },
      { "SinkProtocolInfo": "http-get:*:audio/mp3:*,x-file-cifs:*:audio/mp3:*,http-get:*:audio/mp4:*,x-file-cifs:*:audio/mp4:*,http-get:*:audio/mpeg:*,x-file-cifs:*:audio/mpeg:*,http-get:*:audio/mpegurl:*,x-file-cifs:*:audio/mpegurl:*,real.com-rhapsody-http-1-0:*:audio/mpegurl:*,file:*:audio/mpegurl:*,http-get:*:audio/mpeg3:*,x-file-cifs:*:audio/mpeg3:*,http-get:*:audio/wav:*,x-file-cifs:*:audio/wav:*,http-get:*:audio/wma:*,x-file-cifs:*:audio/wma:*,http-get:*:audio/x-ms-wma:*,x-file-cifs:*:audio/x-ms-wma:*,http-get:*:audio/aiff:*,x-file-cifs:*:audio/aiff:*,http-get:*:audio/flac:*,x-file-cifs:*:audio/flac:*,http-get:*:application/ogg:*,x-file-cifs:*:application/ogg:*,http-get:*:audio/audible:*,x-file-cifs:*:audio/audible:*,real.com-rhapsody-http-1-0:*:audio/x-ms-wma:*,real.com-rhapsody-direct:*:audio/mp3:*,sonos.com-mms:*:audio/x-ms-wma:*,sonos.com-http:*:audio/mpeg3:*,sonos.com-http:*:audio/mpeg:*,sonos.com-http:*:audio/wma:*,sonos.com-http:*:audio/mp4:*,sonos.com-http:*:audio/wav:*,sonos.com-http:*:audio/aiff:*,sonos.com-http:*:audio/flac:*,sonos.com-http:*:application/ogg:*,sonos.com-spotify:*:audio/x-spotify:*,sonos.com-rtrecent:*:audio/x-sonos-recent:*,real.com-rhapsody-http-1-0:*:audio/x-rhap-radio:*,real.com-rhapsody-direct:*:audio/x-rhap-radio:*,pandora.com-pndrradio:*:audio/x-pandora-radio:*,pandora.com-pndrradio-http:*:audio/mpeg3:*,sirius.com-sirradio:*:audio/x-sirius-radio:*,x-rincon:*:*:*,x-rincon-mp3radio:*:*:*,x-rincon-playlist:*:*:*,x-rincon-queue:*:*:*,x-rincon-stream:*:*:*,x-sonosapi-stream:*:*:*,x-sonosapi-radio:*:audio/x-sonosapi-radio:*,x-rincon-cpcontainer:*:*:*,last.fm-radio:*:audio/x-lastfm-radio:*,last.fm-radio-http:*:audio/mpeg3:*" },
      {
        
      }
    ]
  }
}
> Subscribing to events
> The raw event is: NOTIFY /Transport Event HTTP/1.1
HOST: 192.168.1.41:3404
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 2047
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A20201400_sub0000003047
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><LastChange>&lt;Event xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/AVT/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot;&gt;&lt;InstanceID val=&quot;0&quot;&gt;&lt;TransportState val=&quot;STOPPED&quot;/&gt;&lt;CurrentPlayMode val=&quot;NORMAL&quot;/&gt;&lt;CurrentCrossfadeMode val=&quot;0&quot;/&gt;&lt;NumberOfTracks val=&quot;0&quot;/&gt;&lt;CurrentTrack val=&quot;0&quot;/&gt;&lt;CurrentSection val=&quot;0&quot;/&gt;&lt;CurrentTrackURI val=&quot;&quot;/&gt;&lt;CurrentTrackDuration val=&quot;0:00:00&quot;/&gt;&lt;CurrentTrackMetaData val=&quot;&quot;/&gt;&lt;r:NextTrackURI val=&quot;&quot;/&gt;&lt;r:NextTrackMetaData val=&quot;&quot;/&gt;&lt;r:EnqueuedTransportURI val=&quot;&quot;/&gt;&lt;r:EnqueuedTransportURIMetaData val=&quot;&quot;/&gt;&lt;PlaybackStorageMedium val=&quot;NETWORK&quot;/&gt;&lt;AVTransportURI val=&quot;x-rincon-queue:RINCON_000E5828A20201400#0&quot;/&gt;&lt;AVTransportURIMetaData val=&quot;&quot;/&gt;&lt;CurrentTransportActions val=&quot;Set, Play, Stop, Pause, Seek, Next, Previous&quot;/&gt;&lt;TransportStatus val=&quot;OK&quot;/&gt;&lt;r:SleepTimerGeneration val=&quot;0&quot;/&gt;&lt;r:AlarmRunning val=&quot;0&quot;/&gt;&lt;r:SnoozeRunning val=&quot;0&quot;/&gt;&lt;r:RestartPending val=&quot;0&quot;/&gt;&lt;TransportPlaySpeed val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;CurrentMediaDuration val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;RecordStorageMedium val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;PossiblePlaybackStorageMedia val=&quot;NONE, NETWORK&quot;/&gt;&lt;PossibleRecordStorageMedia val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;RecordMediumWriteStatus val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;CurrentRecordQualityMode val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;PossibleRecordQualityModes val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;NextAVTransportURI val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;NextAVTransportURIMetaData val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;/InstanceID&gt;&lt;/Event&gt;</LastChange></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": {
      "LastChange": {
        "Event": {
          "-xmlns": "urn:schemas-upnp-org:metadata-1-0/AVT/",
          "-xmlns:r": "urn:schemas-rinconnetworks-com:metadata-1-0/",
          "InstanceID": {
            "-val": "0",
            "TransportState": { "-val": "STOPPED" },
            "CurrentPlayMode": { "-val": "NORMAL" },
            "CurrentCrossfadeMode": { "-val": "0" },
            "NumberOfTracks": { "-val": "0" },
            "CurrentTrack": { "-val": "0" },
            "CurrentSection": { "-val": "0" },
            "CurrentTrackURI": {
              
            },
            "CurrentTrackDuration": { "-val": "0:00:00" },
            "CurrentTrackMetaData": {
              
            },
            "r:NextTrackURI": {
              
            },
            "r:NextTrackMetaData": {
              
            },
            "r:EnqueuedTransportURI": {
              
            },
            "r:EnqueuedTransportURIMetaData": {
              
            },
            "PlaybackStorageMedium": { "-val": "NETWORK" },
            "AVTransportURI": { "-val": "x-rincon-queue:RINCON_000E5828A20201400#0" },
            "AVTransportURIMetaData": {
              
            },
            "CurrentTransportActions": { "-val": "Set, Play, Stop, Pause, Seek, Next, Previous" },
            "TransportStatus": { "-val": "OK" },
            "r:SleepTimerGeneration": { "-val": "0" },
            "r:AlarmRunning": { "-val": "0" },
            "r:SnoozeRunning": { "-val": "0" },
            "r:RestartPending": { "-val": "0" },
            "TransportPlaySpeed": { "-val": "NOT_IMPLEMENTED" },
            "CurrentMediaDuration": { "-val": "NOT_IMPLEMENTED" },
            "RecordStorageMedium": { "-val": "NOT_IMPLEMENTED" },
            "PossiblePlaybackStorageMedia": { "-val": "NONE, NETWORK" },
            "PossibleRecordStorageMedia": { "-val": "NOT_IMPLEMENTED" },
            "RecordMediumWriteStatus": { "-val": "NOT_IMPLEMENTED" },
            "CurrentRecordQualityMode": { "-val": "NOT_IMPLEMENTED" },
            "PossibleRecordQualityModes": { "-val": "NOT_IMPLEMENTED" },
            "NextAVTransportURI": { "-val": "NOT_IMPLEMENTED" },
            "NextAVTransportURIMetaData": { "-val": "NOT_IMPLEMENTED" }
          }
        }
      }
    }
  }
}
> The raw event is: NOTIFY /Alarm Clock HTTP/1.1
HOST: 192.168.1.41:3407
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 629
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283BD401400_sub0000002949
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><TimeZone>00000a000502000003000501ffc4</TimeZone></e:property><e:property><TimeServer>0.sonostime.pool.ntp.org,1.sonostime.pool.ntp.org,2.sonostime.pool.ntp.org,3.sonostime.pool.ntp.org</TimeServer></e:property><e:property><TimeGeneration>4</TimeGeneration></e:property><e:property><AlarmListVersion>RINCON_000E5828228801400:22</AlarmListVersion></e:property><e:property><TimeFormat>INV</TimeFormat></e:property><e:property><DateFormat>INV</DateFormat></e:property><e:property><DailyIndexRefreshTime>02:00:00</DailyIndexRefreshTime></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "TimeZone": "00000a000502000003000501ffc4" },
      { "TimeServer": "0.sonostime.pool.ntp.org,1.sonostime.pool.ntp.org,2.sonostime.pool.ntp.org,3.sonostime.pool.ntp.org" },
      { "TimeGeneration": "4" },
      { "AlarmListVersion": "RINCON_000E5828228801400:22" },
      { "TimeFormat": "INV" },
      { "DateFormat": "INV" },
      { "DailyIndexRefreshTime": "02:00:00" }
    ]
  }
}
> The raw event is: NOTIFY /Music Services HTTP/1.1
HOST: 192.168.1.41:3407
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 166
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283BD401400_sub0000002950
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ServiceListVersion>RINCON_000E5828228801400:943</ServiceListVersion></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": { "ServiceListVersion": "RINCON_000E5828228801400:943" }
  }
}
> The raw event is: NOTIFY /Audio In HTTP/1.1
HOST: 192.168.1.41:3407
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 360
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283BD401400_sub0000002951
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><AudioInputName>Line-In</AudioInputName></e:property><e:property><Icon></Icon></e:property><e:property><LineInConnected>0</LineInConnected></e:property><e:property><LeftLineInLevel>1</LeftLineInLevel></e:property><e:property><RightLineInLevel>1</RightLineInLevel></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "AudioInputName": "Line-In" },
      {
        
      },
      { "LineInConnected": "0" },
      { "LeftLineInLevel": "1" },
      { "RightLineInLevel": "1" }
    ]
  }
}
> The raw event is: NOTIFY /Device Properties HTTP/1.1
HOST: 192.168.1.41:3407
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 707
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283BD401400_sub0000002952
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneName>Bathroom</ZoneName></e:property><e:property><Icon>x-rincon-roomicon:bathroom</Icon></e:property><e:property><Invisible>0</Invisible></e:property><e:property><IsZoneBridge>0</IsZoneBridge></e:property><e:property><SettingsReplicationState>RINCON_000E5828228801400,17,RINCON_FFFFFFFFFFFF99999,0,RINCON_000E58283BD401400,48,RINCON_000E5828228801400,216,RINCON_000E5828228801400,87,RINCON_000E5828A1C401400,58,RINCON_000E5828228801400,943,RINCON_000E5855842601400,76,RINCON_000E5828228801400,4,RINCON_000E5828A1C401400,27</SettingsReplicationState></e:property><e:property><ChannelMapSet></ChannelMapSet></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "ZoneName": "Bathroom" },
      { "Icon": "x-rincon-roomicon:bathroom" },
      { "Invisible": "0" },
      { "IsZoneBridge": "0" },
      { "SettingsReplicationState": "RINCON_000E5828228801400,17,RINCON_FFFFFFFFFFFF99999,0,RINCON_000E58283BD401400,48,RINCON_000E5828228801400,216,RINCON_000E5828228801400,87,RINCON_000E5828A1C401400,58,RINCON_000E5828228801400,943,RINCON_000E5855842601400,76,RINCON_000E5828228801400,4,RINCON_000E5828A1C401400,27" },
      {
        
      }
    ]
  }
}
> The raw event is: NOTIFY /Zone Group HTTP/1.1
HOST: 192.168.1.41:3407
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 5810
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283BD401400_sub0000002953
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneGroupState>&lt;ZoneGroups&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58289F2E01400&quot; ID=&quot;RINCON_000E58289F2E01400:106&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58289F2E01400&quot; Location=&quot;http://192.168.1.39:1400/xml/device_description.xml&quot; ZoneName=&quot;Dining Room&quot; Icon=&quot;x-rincon-roomicon:dining&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;99&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E585445BA01400&quot; ID=&quot;RINCON_000E585445BA01400:6&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E585445BA01400&quot; Location=&quot;http://192.168.1.28:1400/xml/device_description.xml&quot; ZoneName=&quot;Lauren Room&quot; Icon=&quot;x-rincon-roomicon:living&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;15&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5855842601400&quot; ID=&quot;RINCON_000E5855842601400:17&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58980FE001400&quot; Location=&quot;http://192.168.1.32:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; Invisible=&quot;1&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;14&quot;/&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5855842601400&quot; Location=&quot;http://192.168.1.26:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;9&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A1C401400&quot; ID=&quot;RINCON_000E5828A1C401400:76&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A1C401400&quot; Location=&quot;http://192.168.1.34:1400/xml/device_description.xml&quot; ZoneName=&quot;Record Player&quot; Icon=&quot;x-rincon-roomicon:den&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;47&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A20201400&quot; ID=&quot;RINCON_000E5828A20201400:185&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A20201400&quot; Location=&quot;http://192.168.1.36:1400/xml/device_description.xml&quot; ZoneName=&quot;Master Bed&quot; Icon=&quot;x-rincon-roomicon:masterbedroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;97&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283AC801400&quot; ID=&quot;RINCON_000E58283AC801400:103&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283AC801400&quot; Location=&quot;http://192.168.1.27:1400/xml/device_description.xml&quot; ZoneName=&quot;TV Room&quot; Icon=&quot;x-rincon-roomicon:tvroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;102&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828228801400&quot; ID=&quot;RINCON_000E58283BD401400:176&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828228801400&quot; Location=&quot;http://192.168.1.37:1400/xml/device_description.xml&quot; ZoneName=&quot;Kitchen&quot; Icon=&quot;x-rincon-roomicon:kitchen&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;95&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283BD401400&quot; ID=&quot;RINCON_000E58283BD401400:177&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283BD401400&quot; Location=&quot;http://192.168.1.38:1400/xml/device_description.xml&quot; ZoneName=&quot;Bathroom&quot; Icon=&quot;x-rincon-roomicon:bathroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;110&quot;/&gt;&lt;/ZoneGroup&gt;&lt;/ZoneGroups&gt;</ZoneGroupState></e:property><e:property><ThirdPartyMediaServersX>2:XerskSbOkuhSTTW/VlRp0xT7bprCCcoePi21DnlOKHiDuRYrs0b11KQEsspAolipqUUbTzTG9YYThoEmOVIsaKtbaXrEWMN7kW/UAnXArRmwk3t/u6rZAdG3nDYhkh3qj41NgFlWDX5NdZCxynwxIp4FXX5DIlugVHI0jOUFOOGJZzugK0CatWFfSizx3dbm2ytMD3BaO6ealCUy5/jnZZ42xuMhsUAFYJvTr1smEU3eHGbGhGNtH3GF8cwE+Nda51c/+uf8mTLn7uiIh63VKLp/DLyJU6D9tmF7qaLojrYxZ2Qj0H4ivJ7q3XDD84X+SQyQ2YvlQfQfvh8gajAT3QvxhmcvszlFTzfG6qrwXXe3ipE4ndu5iWTjxyanA3Ly/sta3/ak9+z/o5ggWH1NYrCrXRPsn+naB97eYIWDpEH3FYThqeO9jAXl/beR6vzm0IGBEU4r0Ooqn2tOxqGZysaxwV3fNxHWHpQ3MYbIbOh3R4IS/iXZRxNEyqoCpFzEttWVkOtbZXFBw6hMtqgivS9RsuMaEftfCoX6e46coi9R2G4EAIOJOHwkj56aIMCkBSnNOxlaSo82BVt5im7YZIHQa466PIxmvc4zDdt0iY/KZqVkxZv/R8BQ+5RIIH7bNJj5hFye2QqrDytNLbQpzwUOK1VpyLFHjrcNA9KisYSqgnSNjXoyEjVmDMXWJTjF+iGJkolkSZuLNUNRn6UhpFS3Evaa6U+73JSG4KnRPWmMztrAzG15+ZVUVDp+pvseE/rJWEHs3l0pFNJoDIRkZUuAASP7PbuXo/+OzkjU9XbdC5WAtIYoM4vkW+qeWBZzEotvGVYTRshzEA6hb+D+V3DN1TDZIZR5E2Pb6pUC0q7nD1tIxXMQPiPNSUeBttArQ1/JFEA2sVN5Q9hFkc0QzoFE3BhvnF1BQi+dw84V1rw=</ThirdPartyMediaServersX></e:property><e:property><AvailableSoftwareUpdate>&lt;UpdateItem xmlns=&quot;urn:schemas-rinconnetworks-com:update-1-0&quot; Type=&quot;Software&quot; Version=&quot;19.3-53220&quot; UpdateURL=&quot;http://update.sonos.com/firmware/Gold/v3.8-Hammer-RC2/^19.3-53220&quot; DownloadSize=&quot;0&quot; ManifestURL=&quot;http://update.sonos.com/firmware/Gold/v3.8.2-Hammer-Patch-MDCR/update_1344386463.upm&quot;/&gt;</AvailableSoftwareUpdate></e:property><e:property><AlarmRunSequence>RINCON_000E58283BD401400:110:0</AlarmRunSequence></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      {
        "ZoneGroupState": {
          "ZoneGroups": {
            "ZoneGroup": [
              {
                "-Coordinator": "RINCON_000E58289F2E01400",
                "-ID": "RINCON_000E58289F2E01400:106",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58289F2E01400",
                  "-Location": "http://192.168.1.39:1400/xml/device_description.xml",
                  "-ZoneName": "Dining Room",
                  "-Icon": "x-rincon-roomicon:dining",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "99"
                }
              },
              {
                "-Coordinator": "RINCON_000E585445BA01400",
                "-ID": "RINCON_000E585445BA01400:6",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E585445BA01400",
                  "-Location": "http://192.168.1.28:1400/xml/device_description.xml",
                  "-ZoneName": "Lauren Room",
                  "-Icon": "x-rincon-roomicon:living",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "15"
                }
              },
              {
                "-Coordinator": "RINCON_000E5855842601400",
                "-ID": "RINCON_000E5855842601400:17",
                "ZoneGroupMember": [
                  {
                    "-UUID": "RINCON_000E58980FE001400",
                    "-Location": "http://192.168.1.32:1400/xml/device_description.xml",
                    "-ZoneName": "Office",
                    "-Icon": "x-rincon-roomicon:office",
                    "-Invisible": "1",
                    "-SoftwareVersion": "19.3-53220b",
                    "-MinCompatibleVersion": "19.1-00000",
                    "-ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW",
                    "-BootSeq": "14"
                  },
                  {
                    "-UUID": "RINCON_000E5855842601400",
                    "-Location": "http://192.168.1.26:1400/xml/device_description.xml",
                    "-ZoneName": "Office",
                    "-Icon": "x-rincon-roomicon:office",
                    "-SoftwareVersion": "19.3-53220b",
                    "-MinCompatibleVersion": "19.1-00000",
                    "-ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW",
                    "-BootSeq": "9"
                  }
                ]
              },
              {
                "-Coordinator": "RINCON_000E5828A1C401400",
                "-ID": "RINCON_000E5828A1C401400:76",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828A1C401400",
                  "-Location": "http://192.168.1.34:1400/xml/device_description.xml",
                  "-ZoneName": "Record Player",
                  "-Icon": "x-rincon-roomicon:den",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "47"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828A20201400",
                "-ID": "RINCON_000E5828A20201400:185",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828A20201400",
                  "-Location": "http://192.168.1.36:1400/xml/device_description.xml",
                  "-ZoneName": "Master Bed",
                  "-Icon": "x-rincon-roomicon:masterbedroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "97"
                }
              },
              {
                "-Coordinator": "RINCON_000E58283AC801400",
                "-ID": "RINCON_000E58283AC801400:103",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58283AC801400",
                  "-Location": "http://192.168.1.27:1400/xml/device_description.xml",
                  "-ZoneName": "TV Room",
                  "-Icon": "x-rincon-roomicon:tvroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "102"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828228801400",
                "-ID": "RINCON_000E58283BD401400:176",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828228801400",
                  "-Location": "http://192.168.1.37:1400/xml/device_description.xml",
                  "-ZoneName": "Kitchen",
                  "-Icon": "x-rincon-roomicon:kitchen",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "95"
                }
              },
              {
                "-Coordinator": "RINCON_000E58283BD401400",
                "-ID": "RINCON_000E58283BD401400:177",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58283BD401400",
                  "-Location": "http://192.168.1.38:1400/xml/device_description.xml",
                  "-ZoneName": "Bathroom",
                  "-Icon": "x-rincon-roomicon:bathroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "110"
                }
              }
            ]
          }
        }
      },
      { "ThirdPartyMediaServersX": "2:XerskSbOkuhSTTW/VlRp0xT7bprCCcoePi21DnlOKHiDuRYrs0b11KQEsspAolipqUUbTzTG9YYThoEmOVIsaKtbaXrEWMN7kW/UAnXArRmwk3t/u6rZAdG3nDYhkh3qj41NgFlWDX5NdZCxynwxIp4FXX5DIlugVHI0jOUFOOGJZzugK0CatWFfSizx3dbm2ytMD3BaO6ealCUy5/jnZZ42xuMhsUAFYJvTr1smEU3eHGbGhGNtH3GF8cwE+Nda51c/+uf8mTLn7uiIh63VKLp/DLyJU6D9tmF7qaLojrYxZ2Qj0H4ivJ7q3XDD84X+SQyQ2YvlQfQfvh8gajAT3QvxhmcvszlFTzfG6qrwXXe3ipE4ndu5iWTjxyanA3Ly/sta3/ak9+z/o5ggWH1NYrCrXRPsn+naB97eYIWDpEH3FYThqeO9jAXl/beR6vzm0IGBEU4r0Ooqn2tOxqGZysaxwV3fNxHWHpQ3MYbIbOh3R4IS/iXZRxNEyqoCpFzEttWVkOtbZXFBw6hMtqgivS9RsuMaEftfCoX6e46coi9R2G4EAIOJOHwkj56aIMCkBSnNOxlaSo82BVt5im7YZIHQa466PIxmvc4zDdt0iY/KZqVkxZv/R8BQ+5RIIH7bNJj5hFye2QqrDytNLbQpzwUOK1VpyLFHjrcNA9KisYSqgnSNjXoyEjVmDMXWJTjF+iGJkolkSZuLNUNRn6UhpFS3Evaa6U+73JSG4KnRPWmMztrAzG15+ZVUVDp+pvseE/rJWEHs3l0pFNJoDIRkZUuAASP7PbuXo/+OzkjU9XbdC5WAtIYoM4vkW+qeWBZzEotvGVYTRshzEA6hb+D+V3DN1TDZIZR5E2Pb6pUC0q7nD1tIxXMQPiPNSUeBttArQ1/JFEA2sVN5Q9hFkc0QzoFE3BhvnF1BQi+dw84V1rw=" },
      {
        "AvailableSoftwareUpdate": {
          "UpdateItem": {
            "-xmlns": "urn:schemas-rinconnetworks-com:update-1-0",
            "-Type": "Software",
            "-Version": "19.3-53220",
            "-UpdateURL": "http://update.sonos.com/firmware/Gold/v3.8-Hammer-RC2/^19.3-53220",
            "-DownloadSize": "0",
            "-ManifestURL": "http://update.sonos.com/firmware/Gold/v3.8.2-Hammer-Patch-MDCR/update_1344386463.upm"
          }
        }
      },
      { "AlarmRunSequence": "RINCON_000E58283BD401400:110:0" }
    ]
  }
}
> The raw event is: NOTIFY /Group Management HTTP/1.1
HOST: 192.168.1.41:3407
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 235
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283BD401400_sub0000002954
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><GroupCoordinatorIsLocal>1</GroupCoordinatorIsLocal></e:property><e:property><LocalGroupUUID>RINCON_000E58283BD401400:177</LocalGroupUUID></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "GroupCoordinatorIsLocal": "1" },
      { "LocalGroupUUID": "RINCON_000E58283BD401400:177" }
    ]
  }
}
> The raw event is: NOTIFY /Content Directory HTTP/1.1
HOST: 192.168.1.41:3407
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 907
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283BD401400_sub0000002955
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><SystemUpdateID>19</SystemUpdateID></e:property><e:property><ContainerUpdateIDs>S:,2</ContainerUpdateIDs></e:property><e:property><ShareListRefreshState>NOTRUN</ShareListRefreshState></e:property><e:property><ShareIndexInProgress>0</ShareIndexInProgress></e:property><e:property><ShareIndexLastError></ShareIndexLastError></e:property><e:property><RadioFavoritesUpdateID>RINCON_000E5828228801400,17</RadioFavoritesUpdateID></e:property><e:property><RadioLocationUpdateID>RINCON_000E5828228801400,87</RadioLocationUpdateID></e:property><e:property><SavedQueuesUpdateID>RINCON_000E58283BD401400,48</SavedQueuesUpdateID></e:property><e:property><ShareListUpdateID>RINCON_000E5828228801400,216</ShareListUpdateID></e:property><e:property><RecentlyPlayedUpdateID>RINCON_000E5855842601400,76</RecentlyPlayedUpdateID></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "SystemUpdateID": "19" },
      { "ContainerUpdateIDs": "S:,2" },
      { "ShareListRefreshState": "NOTRUN" },
      { "ShareIndexInProgress": "0" },
      {
        
      },
      { "RadioFavoritesUpdateID": "RINCON_000E5828228801400,17" },
      { "RadioLocationUpdateID": "RINCON_000E5828228801400,87" },
      { "SavedQueuesUpdateID": "RINCON_000E58283BD401400,48" },
      { "ShareListUpdateID": "RINCON_000E5828228801400,216" },
      { "RecentlyPlayedUpdateID": "RINCON_000E5855842601400,76" }
    ]
  }
}
> The raw event is: NOTIFY /Render Control HTTP/1.1
HOST: 192.168.1.41:3407
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 1061
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283BD401400_sub0000002956
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><LastChange>&lt;Event xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/RCS/&quot;&gt;&lt;InstanceID val=&quot;0&quot;&gt;&lt;Volume channel=&quot;Master&quot; val=&quot;37&quot;/&gt;&lt;Volume channel=&quot;LF&quot; val=&quot;100&quot;/&gt;&lt;Volume channel=&quot;RF&quot; val=&quot;100&quot;/&gt;&lt;Mute channel=&quot;Master&quot; val=&quot;0&quot;/&gt;&lt;Mute channel=&quot;LF&quot; val=&quot;0&quot;/&gt;&lt;Mute channel=&quot;RF&quot; val=&quot;0&quot;/&gt;&lt;Bass val=&quot;7&quot;/&gt;&lt;Treble val=&quot;10&quot;/&gt;&lt;Loudness channel=&quot;Master&quot; val=&quot;1&quot;/&gt;&lt;OutputFixed val=&quot;0&quot;/&gt;&lt;HeadphoneConnected val=&quot;0&quot;/&gt;&lt;SpeakerSize val=&quot;-1&quot;/&gt;&lt;SubGain val=&quot;0&quot;/&gt;&lt;SubCrossover val=&quot;0&quot;/&gt;&lt;SubPolarity val=&quot;0&quot;/&gt;&lt;SubEnabled val=&quot;1&quot;/&gt;&lt;PresetNameList&gt;FactoryDefaults&lt;/PresetNameList&gt;&lt;/InstanceID&gt;&lt;/Event&gt;</LastChange></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": {
      "LastChange": {
        "Event": {
          "-xmlns": "urn:schemas-upnp-org:metadata-1-0/RCS/",
          "InstanceID": {
            "-val": "0",
            "Volume": [
              {
                "-channel": "Master",
                "-val": "37"
              },
              {
                "-channel": "LF",
                "-val": "100"
              },
              {
                "-channel": "RF",
                "-val": "100"
              }
            ],
            "Mute": [
              {
                "-channel": "Master",
                "-val": "0"
              },
              {
                "-channel": "LF",
                "-val": "0"
              },
              {
                "-channel": "RF",
                "-val": "0"
              }
            ],
            "Bass": { "-val": "7" },
            "Treble": { "-val": "10" },
            "Loudness": {
              "-channel": "Master",
              "-val": "1"
            },
            "OutputFixed": { "-val": "0" },
            "HeadphoneConnected": { "-val": "0" },
            "SpeakerSize": { "-val": "-1" },
            "SubGain": { "-val": "0" },
            "SubCrossover": { "-val": "0" },
            "SubPolarity": { "-val": "0" },
            "SubEnabled": { "-val": "1" },
            "PresetNameList": "FactoryDefaults"
          }
        }
      }
    }
  }
}
> The raw event is: NOTIFY /Connection Manager HTTP/1.1
HOST: 192.168.1.41:3407
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 1925
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283BD401400_sub0000002958
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><SourceProtocolInfo></SourceProtocolInfo></e:property><e:property><SinkProtocolInfo>http-get:*:audio/mp3:*,x-file-cifs:*:audio/mp3:*,http-get:*:audio/mp4:*,x-file-cifs:*:audio/mp4:*,http-get:*:audio/mpeg:*,x-file-cifs:*:audio/mpeg:*,http-get:*:audio/mpegurl:*,x-file-cifs:*:audio/mpegurl:*,real.com-rhapsody-http-1-0:*:audio/mpegurl:*,file:*:audio/mpegurl:*,http-get:*:audio/mpeg3:*,x-file-cifs:*:audio/mpeg3:*,http-get:*:audio/wav:*,x-file-cifs:*:audio/wav:*,http-get:*:audio/wma:*,x-file-cifs:*:audio/wma:*,http-get:*:audio/x-ms-wma:*,x-file-cifs:*:audio/x-ms-wma:*,http-get:*:audio/aiff:*,x-file-cifs:*:audio/aiff:*,http-get:*:audio/flac:*,x-file-cifs:*:audio/flac:*,http-get:*:application/ogg:*,x-file-cifs:*:application/ogg:*,http-get:*:audio/audible:*,x-file-cifs:*:audio/audible:*,real.com-rhapsody-http-1-0:*:audio/x-ms-wma:*,real.com-rhapsody-direct:*:audio/mp3:*,sonos.com-mms:*:audio/x-ms-wma:*,sonos.com-http:*:audio/mpeg3:*,sonos.com-http:*:audio/mpeg:*,sonos.com-http:*:audio/wma:*,sonos.com-http:*:audio/mp4:*,sonos.com-http:*:audio/wav:*,sonos.com-http:*:audio/aiff:*,sonos.com-http:*:audio/flac:*,sonos.com-http:*:application/ogg:*,sonos.com-spotify:*:audio/x-spotify:*,sonos.com-rtrecent:*:audio/x-sonos-recent:*,real.com-rhapsody-http-1-0:*:audio/x-rhap-radio:*,real.com-rhapsody-direct:*:audio/x-rhap-radio:*,pandora.com-pndrradio:*:audio/x-pandora-radio:*,pandora.com-pndrradio-http:*:audio/mpeg3:*,sirius.com-sirradio:*:audio/x-sirius-radio:*,x-rincon:*:*:*,x-rincon-mp3radio:*:*:*,x-rincon-playlist:*:*:*,x-rincon-queue:*:*:*,x-rincon-stream:*:*:*,x-sonosapi-stream:*:*:*,x-sonosapi-radio:*:audio/x-sonosapi-radio:*,x-rincon-cpcontainer:*:*:*,last.fm-radio:*:audio/x-lastfm-radio:*,last.fm-radio-http:*:audio/mpeg3:*</SinkProtocolInfo></e:property><e:property><CurrentConnectionIDs></CurrentConnectionIDs></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      {
        
      },
      { "SinkProtocolInfo": "http-get:*:audio/mp3:*,x-file-cifs:*:audio/mp3:*,http-get:*:audio/mp4:*,x-file-cifs:*:audio/mp4:*,http-get:*:audio/mpeg:*,x-file-cifs:*:audio/mpeg:*,http-get:*:audio/mpegurl:*,x-file-cifs:*:audio/mpegurl:*,real.com-rhapsody-http-1-0:*:audio/mpegurl:*,file:*:audio/mpegurl:*,http-get:*:audio/mpeg3:*,x-file-cifs:*:audio/mpeg3:*,http-get:*:audio/wav:*,x-file-cifs:*:audio/wav:*,http-get:*:audio/wma:*,x-file-cifs:*:audio/wma:*,http-get:*:audio/x-ms-wma:*,x-file-cifs:*:audio/x-ms-wma:*,http-get:*:audio/aiff:*,x-file-cifs:*:audio/aiff:*,http-get:*:audio/flac:*,x-file-cifs:*:audio/flac:*,http-get:*:application/ogg:*,x-file-cifs:*:application/ogg:*,http-get:*:audio/audible:*,x-file-cifs:*:audio/audible:*,real.com-rhapsody-http-1-0:*:audio/x-ms-wma:*,real.com-rhapsody-direct:*:audio/mp3:*,sonos.com-mms:*:audio/x-ms-wma:*,sonos.com-http:*:audio/mpeg3:*,sonos.com-http:*:audio/mpeg:*,sonos.com-http:*:audio/wma:*,sonos.com-http:*:audio/mp4:*,sonos.com-http:*:audio/wav:*,sonos.com-http:*:audio/aiff:*,sonos.com-http:*:audio/flac:*,sonos.com-http:*:application/ogg:*,sonos.com-spotify:*:audio/x-spotify:*,sonos.com-rtrecent:*:audio/x-sonos-recent:*,real.com-rhapsody-http-1-0:*:audio/x-rhap-radio:*,real.com-rhapsody-direct:*:audio/x-rhap-radio:*,pandora.com-pndrradio:*:audio/x-pandora-radio:*,pandora.com-pndrradio-http:*:audio/mpeg3:*,sirius.com-sirradio:*:audio/x-sirius-radio:*,x-rincon:*:*:*,x-rincon-mp3radio:*:*:*,x-rincon-playlist:*:*:*,x-rincon-queue:*:*:*,x-rincon-stream:*:*:*,x-sonosapi-stream:*:*:*,x-sonosapi-radio:*:audio/x-sonosapi-radio:*,x-rincon-cpcontainer:*:*:*,last.fm-radio:*:audio/x-lastfm-radio:*,last.fm-radio-http:*:audio/mpeg3:*" },
      {
        
      }
    ]
  }
}
> Subscribing to events
> The raw event is: NOTIFY /Transport Event HTTP/1.1
HOST: 192.168.1.41:3407
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 5600
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283BD401400_sub0000002959
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><LastChange>&lt;Event xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/AVT/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot;&gt;&lt;InstanceID val=&quot;0&quot;&gt;&lt;TransportState val=&quot;STOPPED&quot;/&gt;&lt;CurrentPlayMode val=&quot;NORMAL&quot;/&gt;&lt;CurrentCrossfadeMode val=&quot;0&quot;/&gt;&lt;NumberOfTracks val=&quot;17&quot;/&gt;&lt;CurrentTrack val=&quot;1&quot;/&gt;&lt;CurrentSection val=&quot;0&quot;/&gt;&lt;CurrentTrackURI val=&quot;x-sonos-spotify:spotify%3atrack%3a38GeY0mEl0McOYS6FSbKoP?sid=9&amp;amp;flags=0&quot;/&gt;&lt;CurrentTrackDuration val=&quot;0:04:25&quot;/&gt;&lt;CurrentTrackMetaData val=&quot;&amp;lt;DIDL-Lite xmlns:dc=&amp;quot;http://purl.org/dc/elements/1.1/&amp;quot; xmlns:upnp=&amp;quot;urn:schemas-upnp-org:metadata-1-0/upnp/&amp;quot; xmlns:r=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot; xmlns=&amp;quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&amp;quot;&amp;gt;&amp;lt;item id=&amp;quot;-1&amp;quot; parentID=&amp;quot;-1&amp;quot; restricted=&amp;quot;true&amp;quot;&amp;gt;&amp;lt;res protocolInfo=&amp;quot;sonos.com-spotify:*:audio/x-spotify:*&amp;quot; duration=&amp;quot;0:04:25&amp;quot;&amp;gt;x-sonos-spotify:spotify%3atrack%3a38GeY0mEl0McOYS6FSbKoP?sid=9&amp;amp;amp;flags=0&amp;lt;/res&amp;gt;&amp;lt;r:streamContent&amp;gt;&amp;lt;/r:streamContent&amp;gt;&amp;lt;r:radioShowMd&amp;gt;&amp;lt;/r:radioShowMd&amp;gt;&amp;lt;upnp:albumArtURI&amp;gt;/getaa?s=1&amp;amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a38GeY0mEl0McOYS6FSbKoP%3fsid%3d9%26flags%3d0&amp;lt;/upnp:albumArtURI&amp;gt;&amp;lt;dc:title&amp;gt;Die Zauberfl̦te&amp;lt;/dc:title&amp;gt;&amp;lt;upnp:class&amp;gt;object.item.audioItem.musicTrack&amp;lt;/upnp:class&amp;gt;&amp;lt;dc:creator&amp;gt;Wolfgang Amadeus Mozart&amp;lt;/dc:creator&amp;gt;&amp;lt;upnp:album&amp;gt;The Best Of Opera&amp;lt;/upnp:album&amp;gt;&amp;lt;/item&amp;gt;&amp;lt;/DIDL-Lite&amp;gt;&quot;/&gt;&lt;r:NextTrackURI val=&quot;x-sonos-spotify:spotify%3atrack%3a5azjXbzjJGtcz4OsYHF3Qr?sid=9&amp;amp;flags=0&quot;/&gt;&lt;r:NextTrackMetaData val=&quot;&amp;lt;DIDL-Lite xmlns:dc=&amp;quot;http://purl.org/dc/elements/1.1/&amp;quot; xmlns:upnp=&amp;quot;urn:schemas-upnp-org:metadata-1-0/upnp/&amp;quot; xmlns:r=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot; xmlns=&amp;quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&amp;quot;&amp;gt;&amp;lt;item id=&amp;quot;-1&amp;quot; parentID=&amp;quot;-1&amp;quot; restricted=&amp;quot;true&amp;quot;&amp;gt;&amp;lt;res protocolInfo=&amp;quot;sonos.com-spotify:*:audio/x-spotify:*&amp;quot; duration=&amp;quot;0:04:19&amp;quot;&amp;gt;x-sonos-spotify:spotify%3atrack%3a5azjXbzjJGtcz4OsYHF3Qr?sid=9&amp;amp;amp;flags=0&amp;lt;/res&amp;gt;&amp;lt;upnp:albumArtURI&amp;gt;/getaa?s=1&amp;amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a5azjXbzjJGtcz4OsYHF3Qr%3fsid%3d9%26flags%3d0&amp;lt;/upnp:albumArtURI&amp;gt;&amp;lt;dc:title&amp;gt;Die Zauberfl̦te&amp;lt;/dc:title&amp;gt;&amp;lt;upnp:class&amp;gt;object.item.audioItem.musicTrack&amp;lt;/upnp:class&amp;gt;&amp;lt;dc:creator&amp;gt;Wolfgang Amadeus Mozart&amp;lt;/dc:creator&amp;gt;&amp;lt;upnp:album&amp;gt;The Best Of Opera&amp;lt;/upnp:album&amp;gt;&amp;lt;/item&amp;gt;&amp;lt;/DIDL-Lite&amp;gt;&quot;/&gt;&lt;r:EnqueuedTransportURI val=&quot;x-rincon-cpcontainer:0004008cspotify%3aalbum%3a6FZhNfk4FdW6jbi8MThqMa&quot;/&gt;&lt;r:EnqueuedTransportURIMetaData val=&quot;&amp;lt;DIDL-Lite xmlns:dc=&amp;quot;http://purl.org/dc/elements/1.1/&amp;quot; xmlns:upnp=&amp;quot;urn:schemas-upnp-org:metadata-1-0/upnp/&amp;quot; xmlns:r=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot; xmlns=&amp;quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&amp;quot;&amp;gt;&amp;lt;item id=&amp;quot;0004008cspotify%3aalbum%3a6FZhNfk4FdW6jbi8MThqMa&amp;quot; parentID=&amp;quot;0004008cspotify%3aalbum%3a6FZhNfk4FdW6jbi8MThqMa&amp;quot; restricted=&amp;quot;true&amp;quot;&amp;gt;&amp;lt;dc:title&amp;gt;Complete Album (17 tracks)&amp;lt;/dc:title&amp;gt;&amp;lt;upnp:class&amp;gt;object.container.album.musicAlbum&amp;lt;/upnp:class&amp;gt;&amp;lt;desc id=&amp;quot;cdudn&amp;quot; nameSpace=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot;&amp;gt;SA_RINCON2311_postsi&amp;lt;/desc&amp;gt;&amp;lt;/item&amp;gt;&amp;lt;/DIDL-Lite&amp;gt;&quot;/&gt;&lt;PlaybackStorageMedium val=&quot;NETWORK&quot;/&gt;&lt;AVTransportURI val=&quot;x-rincon-queue:RINCON_000E58283BD401400#0&quot;/&gt;&lt;AVTransportURIMetaData val=&quot;&quot;/&gt;&lt;CurrentTransportActions val=&quot;Set, Play, Stop, Pause, Seek, Next, Previous&quot;/&gt;&lt;TransportStatus val=&quot;OK&quot;/&gt;&lt;r:SleepTimerGeneration val=&quot;0&quot;/&gt;&lt;r:AlarmRunning val=&quot;0&quot;/&gt;&lt;r:SnoozeRunning val=&quot;0&quot;/&gt;&lt;r:RestartPending val=&quot;0&quot;/&gt;&lt;TransportPlaySpeed val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;CurrentMediaDuration val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;RecordStorageMedium val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;PossiblePlaybackStorageMedia val=&quot;NONE, NETWORK&quot;/&gt;&lt;PossibleRecordStorageMedia val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;RecordMediumWriteStatus val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;CurrentRecordQualityMode val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;PossibleRecordQualityModes val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;NextAVTransportURI val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;NextAVTransportURIMetaData val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;/InstanceID&gt;&lt;/Event&gt;</LastChange></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": {
      "LastChange": {
        "Event": {
          "-xmlns": "urn:schemas-upnp-org:metadata-1-0/AVT/",
          "-xmlns:r": "urn:schemas-rinconnetworks-com:metadata-1-0/",
          "InstanceID": {
            "-val": "0",
            "TransportState": { "-val": "STOPPED" },
            "CurrentPlayMode": { "-val": "NORMAL" },
            "CurrentCrossfadeMode": { "-val": "0" },
            "NumberOfTracks": { "-val": "17" },
            "CurrentTrack": { "-val": "1" },
            "CurrentSection": { "-val": "0" },
            "CurrentTrackURI": { "-val": "x-sonos-spotify:spotify%3atrack%3a38GeY0mEl0McOYS6FSbKoP?sid=9&amp;flags=0" },
            "CurrentTrackDuration": { "-val": "0:04:25" },
            "CurrentTrackMetaData": { "-val": "&lt;DIDL-Lite xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot; xmlns:upnp=&quot;urn:schemas-upnp-org:metadata-1-0/upnp/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot; xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&quot;&gt;&lt;item id=&quot;-1&quot; parentID=&quot;-1&quot; restricted=&quot;true&quot;&gt;&lt;res protocolInfo=&quot;sonos.com-spotify:*:audio/x-spotify:*&quot; duration=&quot;0:04:25&quot;&gt;x-sonos-spotify:spotify%3atrack%3a38GeY0mEl0McOYS6FSbKoP?sid=9&amp;amp;flags=0&lt;/res&gt;&lt;r:streamContent&gt;&lt;/r:streamContent&gt;&lt;r:radioShowMd&gt;&lt;/r:radioShowMd&gt;&lt;upnp:albumArtURI&gt;/getaa?s=1&amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a38GeY0mEl0McOYS6FSbKoP%3fsid%3d9%26flags%3d0&lt;/upnp:albumArtURI&gt;&lt;dc:title&gt;Die Zauberfl̦te&lt;/dc:title&gt;&lt;upnp:class&gt;object.item.audioItem.musicTrack&lt;/upnp:class&gt;&lt;dc:creator&gt;Wolfgang Amadeus Mozart&lt;/dc:creator&gt;&lt;upnp:album&gt;The Best Of Opera&lt;/upnp:album&gt;&lt;/item&gt;&lt;/DIDL-Lite&gt;" },
            "r:NextTrackURI": { "-val": "x-sonos-spotify:spotify%3atrack%3a5azjXbzjJGtcz4OsYHF3Qr?sid=9&amp;flags=0" },
            "r:NextTrackMetaData": { "-val": "&lt;DIDL-Lite xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot; xmlns:upnp=&quot;urn:schemas-upnp-org:metadata-1-0/upnp/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot; xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&quot;&gt;&lt;item id=&quot;-1&quot; parentID=&quot;-1&quot; restricted=&quot;true&quot;&gt;&lt;res protocolInfo=&quot;sonos.com-spotify:*:audio/x-spotify:*&quot; duration=&quot;0:04:19&quot;&gt;x-sonos-spotify:spotify%3atrack%3a5azjXbzjJGtcz4OsYHF3Qr?sid=9&amp;amp;flags=0&lt;/res&gt;&lt;upnp:albumArtURI&gt;/getaa?s=1&amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a5azjXbzjJGtcz4OsYHF3Qr%3fsid%3d9%26flags%3d0&lt;/upnp:albumArtURI&gt;&lt;dc:title&gt;Die Zauberfl̦te&lt;/dc:title&gt;&lt;upnp:class&gt;object.item.audioItem.musicTrack&lt;/upnp:class&gt;&lt;dc:creator&gt;Wolfgang Amadeus Mozart&lt;/dc:creator&gt;&lt;upnp:album&gt;The Best Of Opera&lt;/upnp:album&gt;&lt;/item&gt;&lt;/DIDL-Lite&gt;" },
            "r:EnqueuedTransportURI": { "-val": "x-rincon-cpcontainer:0004008cspotify%3aalbum%3a6FZhNfk4FdW6jbi8MThqMa" },
            "r:EnqueuedTransportURIMetaData": { "-val": "&lt;DIDL-Lite xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot; xmlns:upnp=&quot;urn:schemas-upnp-org:metadata-1-0/upnp/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot; xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&quot;&gt;&lt;item id=&quot;0004008cspotify%3aalbum%3a6FZhNfk4FdW6jbi8MThqMa&quot; parentID=&quot;0004008cspotify%3aalbum%3a6FZhNfk4FdW6jbi8MThqMa&quot; restricted=&quot;true&quot;&gt;&lt;dc:title&gt;Complete Album (17 tracks)&lt;/dc:title&gt;&lt;upnp:class&gt;object.container.album.musicAlbum&lt;/upnp:class&gt;&lt;desc id=&quot;cdudn&quot; nameSpace=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot;&gt;SA_RINCON2311_postsi&lt;/desc&gt;&lt;/item&gt;&lt;/DIDL-Lite&gt;" },
            "PlaybackStorageMedium": { "-val": "NETWORK" },
            "AVTransportURI": { "-val": "x-rincon-queue:RINCON_000E58283BD401400#0" },
            "AVTransportURIMetaData": {
              
            },
            "CurrentTransportActions": { "-val": "Set, Play, Stop, Pause, Seek, Next, Previous" },
            "TransportStatus": { "-val": "OK" },
            "r:SleepTimerGeneration": { "-val": "0" },
            "r:AlarmRunning": { "-val": "0" },
            "r:SnoozeRunning": { "-val": "0" },
            "r:RestartPending": { "-val": "0" },
            "TransportPlaySpeed": { "-val": "NOT_IMPLEMENTED" },
            "CurrentMediaDuration": { "-val": "NOT_IMPLEMENTED" },
            "RecordStorageMedium": { "-val": "NOT_IMPLEMENTED" },
            "PossiblePlaybackStorageMedia": { "-val": "NONE, NETWORK" },
            "PossibleRecordStorageMedia": { "-val": "NOT_IMPLEMENTED" },
            "RecordMediumWriteStatus": { "-val": "NOT_IMPLEMENTED" },
            "CurrentRecordQualityMode": { "-val": "NOT_IMPLEMENTED" },
            "PossibleRecordQualityModes": { "-val": "NOT_IMPLEMENTED" },
            "NextAVTransportURI": { "-val": "NOT_IMPLEMENTED" },
            "NextAVTransportURIMetaData": { "-val": "NOT_IMPLEMENTED" }
          }
        }
      }
    }
  }
}
> The raw event is: NOTIFY /Alarm Clock HTTP/1.1
HOST: 192.168.1.41:3406
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 629
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828228801400_sub0000003608
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><TimeZone>00000a000502000003000501ffc4</TimeZone></e:property><e:property><TimeServer>0.sonostime.pool.ntp.org,1.sonostime.pool.ntp.org,2.sonostime.pool.ntp.org,3.sonostime.pool.ntp.org</TimeServer></e:property><e:property><TimeGeneration>5</TimeGeneration></e:property><e:property><AlarmListVersion>RINCON_000E5828228801400:22</AlarmListVersion></e:property><e:property><TimeFormat>INV</TimeFormat></e:property><e:property><DateFormat>INV</DateFormat></e:property><e:property><DailyIndexRefreshTime>02:00:00</DailyIndexRefreshTime></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "TimeZone": "00000a000502000003000501ffc4" },
      { "TimeServer": "0.sonostime.pool.ntp.org,1.sonostime.pool.ntp.org,2.sonostime.pool.ntp.org,3.sonostime.pool.ntp.org" },
      { "TimeGeneration": "5" },
      { "AlarmListVersion": "RINCON_000E5828228801400:22" },
      { "TimeFormat": "INV" },
      { "DateFormat": "INV" },
      { "DailyIndexRefreshTime": "02:00:00" }
    ]
  }
}
> The raw event is: NOTIFY /Music Services HTTP/1.1
HOST: 192.168.1.41:3406
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 166
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828228801400_sub0000003609
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ServiceListVersion>RINCON_000E5828228801400:943</ServiceListVersion></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": { "ServiceListVersion": "RINCON_000E5828228801400:943" }
  }
}
> The raw event is: NOTIFY /Audio In HTTP/1.1
HOST: 192.168.1.41:3406
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 360
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828228801400_sub0000003610
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><AudioInputName>Line-In</AudioInputName></e:property><e:property><Icon></Icon></e:property><e:property><LineInConnected>0</LineInConnected></e:property><e:property><LeftLineInLevel>1</LeftLineInLevel></e:property><e:property><RightLineInLevel>1</RightLineInLevel></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "AudioInputName": "Line-In" },
      {
        
      },
      { "LineInConnected": "0" },
      { "LeftLineInLevel": "1" },
      { "RightLineInLevel": "1" }
    ]
  }
}
> The raw event is: NOTIFY /Device Properties HTTP/1.1
HOST: 192.168.1.41:3406
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 705
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828228801400_sub0000003611
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneName>Kitchen</ZoneName></e:property><e:property><Icon>x-rincon-roomicon:kitchen</Icon></e:property><e:property><Invisible>0</Invisible></e:property><e:property><IsZoneBridge>0</IsZoneBridge></e:property><e:property><SettingsReplicationState>RINCON_000E5828228801400,17,RINCON_FFFFFFFFFFFF99999,0,RINCON_000E58283BD401400,48,RINCON_000E5828228801400,216,RINCON_000E5828228801400,87,RINCON_000E5828A1C401400,58,RINCON_000E5828228801400,943,RINCON_000E5855842601400,76,RINCON_000E5828228801400,4,RINCON_000E5828A1C401400,27</SettingsReplicationState></e:property><e:property><ChannelMapSet></ChannelMapSet></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "ZoneName": "Kitchen" },
      { "Icon": "x-rincon-roomicon:kitchen" },
      { "Invisible": "0" },
      { "IsZoneBridge": "0" },
      { "SettingsReplicationState": "RINCON_000E5828228801400,17,RINCON_FFFFFFFFFFFF99999,0,RINCON_000E58283BD401400,48,RINCON_000E5828228801400,216,RINCON_000E5828228801400,87,RINCON_000E5828A1C401400,58,RINCON_000E5828228801400,943,RINCON_000E5855842601400,76,RINCON_000E5828228801400,4,RINCON_000E5828A1C401400,27" },
      {
        
      }
    ]
  }
}
> The raw event is: NOTIFY /Zone Group HTTP/1.1
HOST: 192.168.1.41:3406
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 5809
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828228801400_sub0000003612
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneGroupState>&lt;ZoneGroups&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58289F2E01400&quot; ID=&quot;RINCON_000E58289F2E01400:106&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58289F2E01400&quot; Location=&quot;http://192.168.1.39:1400/xml/device_description.xml&quot; ZoneName=&quot;Dining Room&quot; Icon=&quot;x-rincon-roomicon:dining&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;99&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E585445BA01400&quot; ID=&quot;RINCON_000E585445BA01400:6&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E585445BA01400&quot; Location=&quot;http://192.168.1.28:1400/xml/device_description.xml&quot; ZoneName=&quot;Lauren Room&quot; Icon=&quot;x-rincon-roomicon:living&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;15&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5855842601400&quot; ID=&quot;RINCON_000E5855842601400:17&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58980FE001400&quot; Location=&quot;http://192.168.1.32:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; Invisible=&quot;1&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;14&quot;/&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5855842601400&quot; Location=&quot;http://192.168.1.26:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;9&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283BD401400&quot; ID=&quot;RINCON_000E58283BD401400:177&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283BD401400&quot; Location=&quot;http://192.168.1.38:1400/xml/device_description.xml&quot; ZoneName=&quot;Bathroom&quot; Icon=&quot;x-rincon-roomicon:bathroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;110&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A20201400&quot; ID=&quot;RINCON_000E5828A20201400:185&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A20201400&quot; Location=&quot;http://192.168.1.36:1400/xml/device_description.xml&quot; ZoneName=&quot;Master Bed&quot; Icon=&quot;x-rincon-roomicon:masterbedroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;97&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283AC801400&quot; ID=&quot;RINCON_000E58283AC801400:103&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283AC801400&quot; Location=&quot;http://192.168.1.27:1400/xml/device_description.xml&quot; ZoneName=&quot;TV Room&quot; Icon=&quot;x-rincon-roomicon:tvroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;102&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A1C401400&quot; ID=&quot;RINCON_000E5828A1C401400:76&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A1C401400&quot; Location=&quot;http://192.168.1.34:1400/xml/device_description.xml&quot; ZoneName=&quot;Record Player&quot; Icon=&quot;x-rincon-roomicon:den&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;47&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828228801400&quot; ID=&quot;RINCON_000E58283BD401400:176&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828228801400&quot; Location=&quot;http://192.168.1.37:1400/xml/device_description.xml&quot; ZoneName=&quot;Kitchen&quot; Icon=&quot;x-rincon-roomicon:kitchen&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;95&quot;/&gt;&lt;/ZoneGroup&gt;&lt;/ZoneGroups&gt;</ZoneGroupState></e:property><e:property><ThirdPartyMediaServersX>2:+mNPWHQ4WqS7fmE63orRly+RE6986tQnsB/dAzd6gfmEAPBP6ipJxoj2yG+AASMSuUwu8RdQCqCVH4jjsckMbvgA56zuW2rE6CD5IU29zrVj9dQ/YGEsHrqOak5c9B/tbIjZebqHzaiAHWl8tevQFUUt9Dr3B6f2TlvbmT2Usric+3lLEj3ze7g+dfPU4Vr0FcvR+I+0YD9t9gOMrZ2VfzPl8nTm+c42k1sxw6jlVmBGPGF2QAEM6Aq8/Ltq8ZlDj0OcTktuSzOP+seDIf/1IvtUdGxGxsa+RF+h8/ant+EuRansMGPKPqec1qfwjjeqc1hrv14W09CW0qMuukk9RI4ngjJB/Q/dUr2WWkdTnStASwkeI2x1iW5wzuKd2wdPfceaqggEwfa4JhROLO4uO5DWdwyTA/nua/OBOx5M6lw5fn1WBlWYSN1jO0xJPG37Hg8URht+wnKS1pE0/SWPSpA6zxkCwbcj6wNxjYHxSK7Mf5hii6DBatYal0qwie0n5SKqysuln+b/A7va/Hbp+SPwxNMbZ8R6azsUOHrJrH15m/m19rGXiHmpF5syKVhiF7aIfcF1XEZ8xBI0dIb8dOFoS+15lnY359AYYlYl7IO94QNeh5qlfkM8VqLK9rV5Pm0ieg6Nd0OKquIsUQ6kOsgeLtPXF3lmfIEITr4oanrz1Rl4ExsTXtip7nLEUBTCCsE0Dlcz7PWFJKPIlK2N6kSOhhaOfEZdQSaHWWoxjXjKgiKuFZNEXRpvOxFRz0GVRaZoXxFG7s4+DwYA6KJGBHlK8+8lOV4gtSgojZQriSm+lZkiX5gFWFmvY4HMWHg6rR2G0SDRN/TKROlpUbAhWxYiTWZu2+BGj3SSp4al90S/CO/3BcIBxCefjjRqgZpnLUQCYcfxqQJBIrGiBgWZwJ05dtSlWW7UZ75JuTrJQCE=</ThirdPartyMediaServersX></e:property><e:property><AvailableSoftwareUpdate>&lt;UpdateItem xmlns=&quot;urn:schemas-rinconnetworks-com:update-1-0&quot; Type=&quot;Software&quot; Version=&quot;19.3-53220&quot; UpdateURL=&quot;http://update.sonos.com/firmware/Gold/v3.8-Hammer-RC2/^19.3-53220&quot; DownloadSize=&quot;0&quot; ManifestURL=&quot;http://update.sonos.com/firmware/Gold/v3.8.2-Hammer-Patch-MDCR/update_1344386463.upm&quot;/&gt;</AvailableSoftwareUpdate></e:property><e:property><AlarmRunSequence>RINCON_000E5828228801400:95:0</AlarmRunSequence></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      {
        "ZoneGroupState": {
          "ZoneGroups": {
            "ZoneGroup": [
              {
                "-Coordinator": "RINCON_000E58289F2E01400",
                "-ID": "RINCON_000E58289F2E01400:106",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58289F2E01400",
                  "-Location": "http://192.168.1.39:1400/xml/device_description.xml",
                  "-ZoneName": "Dining Room",
                  "-Icon": "x-rincon-roomicon:dining",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "99"
                }
              },
              {
                "-Coordinator": "RINCON_000E585445BA01400",
                "-ID": "RINCON_000E585445BA01400:6",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E585445BA01400",
                  "-Location": "http://192.168.1.28:1400/xml/device_description.xml",
                  "-ZoneName": "Lauren Room",
                  "-Icon": "x-rincon-roomicon:living",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "15"
                }
              },
              {
                "-Coordinator": "RINCON_000E5855842601400",
                "-ID": "RINCON_000E5855842601400:17",
                "ZoneGroupMember": [
                  {
                    "-UUID": "RINCON_000E58980FE001400",
                    "-Location": "http://192.168.1.32:1400/xml/device_description.xml",
                    "-ZoneName": "Office",
                    "-Icon": "x-rincon-roomicon:office",
                    "-Invisible": "1",
                    "-SoftwareVersion": "19.3-53220b",
                    "-MinCompatibleVersion": "19.1-00000",
                    "-ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW",
                    "-BootSeq": "14"
                  },
                  {
                    "-UUID": "RINCON_000E5855842601400",
                    "-Location": "http://192.168.1.26:1400/xml/device_description.xml",
                    "-ZoneName": "Office",
                    "-Icon": "x-rincon-roomicon:office",
                    "-SoftwareVersion": "19.3-53220b",
                    "-MinCompatibleVersion": "19.1-00000",
                    "-ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW",
                    "-BootSeq": "9"
                  }
                ]
              },
              {
                "-Coordinator": "RINCON_000E58283BD401400",
                "-ID": "RINCON_000E58283BD401400:177",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58283BD401400",
                  "-Location": "http://192.168.1.38:1400/xml/device_description.xml",
                  "-ZoneName": "Bathroom",
                  "-Icon": "x-rincon-roomicon:bathroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "110"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828A20201400",
                "-ID": "RINCON_000E5828A20201400:185",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828A20201400",
                  "-Location": "http://192.168.1.36:1400/xml/device_description.xml",
                  "-ZoneName": "Master Bed",
                  "-Icon": "x-rincon-roomicon:masterbedroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "97"
                }
              },
              {
                "-Coordinator": "RINCON_000E58283AC801400",
                "-ID": "RINCON_000E58283AC801400:103",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58283AC801400",
                  "-Location": "http://192.168.1.27:1400/xml/device_description.xml",
                  "-ZoneName": "TV Room",
                  "-Icon": "x-rincon-roomicon:tvroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "102"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828A1C401400",
                "-ID": "RINCON_000E5828A1C401400:76",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828A1C401400",
                  "-Location": "http://192.168.1.34:1400/xml/device_description.xml",
                  "-ZoneName": "Record Player",
                  "-Icon": "x-rincon-roomicon:den",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "47"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828228801400",
                "-ID": "RINCON_000E58283BD401400:176",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828228801400",
                  "-Location": "http://192.168.1.37:1400/xml/device_description.xml",
                  "-ZoneName": "Kitchen",
                  "-Icon": "x-rincon-roomicon:kitchen",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "95"
                }
              }
            ]
          }
        }
      },
      { "ThirdPartyMediaServersX": "2:+mNPWHQ4WqS7fmE63orRly+RE6986tQnsB/dAzd6gfmEAPBP6ipJxoj2yG+AASMSuUwu8RdQCqCVH4jjsckMbvgA56zuW2rE6CD5IU29zrVj9dQ/YGEsHrqOak5c9B/tbIjZebqHzaiAHWl8tevQFUUt9Dr3B6f2TlvbmT2Usric+3lLEj3ze7g+dfPU4Vr0FcvR+I+0YD9t9gOMrZ2VfzPl8nTm+c42k1sxw6jlVmBGPGF2QAEM6Aq8/Ltq8ZlDj0OcTktuSzOP+seDIf/1IvtUdGxGxsa+RF+h8/ant+EuRansMGPKPqec1qfwjjeqc1hrv14W09CW0qMuukk9RI4ngjJB/Q/dUr2WWkdTnStASwkeI2x1iW5wzuKd2wdPfceaqggEwfa4JhROLO4uO5DWdwyTA/nua/OBOx5M6lw5fn1WBlWYSN1jO0xJPG37Hg8URht+wnKS1pE0/SWPSpA6zxkCwbcj6wNxjYHxSK7Mf5hii6DBatYal0qwie0n5SKqysuln+b/A7va/Hbp+SPwxNMbZ8R6azsUOHrJrH15m/m19rGXiHmpF5syKVhiF7aIfcF1XEZ8xBI0dIb8dOFoS+15lnY359AYYlYl7IO94QNeh5qlfkM8VqLK9rV5Pm0ieg6Nd0OKquIsUQ6kOsgeLtPXF3lmfIEITr4oanrz1Rl4ExsTXtip7nLEUBTCCsE0Dlcz7PWFJKPIlK2N6kSOhhaOfEZdQSaHWWoxjXjKgiKuFZNEXRpvOxFRz0GVRaZoXxFG7s4+DwYA6KJGBHlK8+8lOV4gtSgojZQriSm+lZkiX5gFWFmvY4HMWHg6rR2G0SDRN/TKROlpUbAhWxYiTWZu2+BGj3SSp4al90S/CO/3BcIBxCefjjRqgZpnLUQCYcfxqQJBIrGiBgWZwJ05dtSlWW7UZ75JuTrJQCE=" },
      {
        "AvailableSoftwareUpdate": {
          "UpdateItem": {
            "-xmlns": "urn:schemas-rinconnetworks-com:update-1-0",
            "-Type": "Software",
            "-Version": "19.3-53220",
            "-UpdateURL": "http://update.sonos.com/firmware/Gold/v3.8-Hammer-RC2/^19.3-53220",
            "-DownloadSize": "0",
            "-ManifestURL": "http://update.sonos.com/firmware/Gold/v3.8.2-Hammer-Patch-MDCR/update_1344386463.upm"
          }
        }
      },
      { "AlarmRunSequence": "RINCON_000E5828228801400:95:0" }
    ]
  }
}
> The raw event is: NOTIFY /Group Management HTTP/1.1
HOST: 192.168.1.41:3406
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 235
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828228801400_sub0000003613
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><GroupCoordinatorIsLocal>1</GroupCoordinatorIsLocal></e:property><e:property><LocalGroupUUID>RINCON_000E58283BD401400:176</LocalGroupUUID></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "GroupCoordinatorIsLocal": "1" },
      { "LocalGroupUUID": "RINCON_000E58283BD401400:176" }
    ]
  }
}
> The raw event is: NOTIFY /Content Directory HTTP/1.1
HOST: 192.168.1.41:3406
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 907
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828228801400_sub0000003614
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><SystemUpdateID>19</SystemUpdateID></e:property><e:property><ContainerUpdateIDs>S:,2</ContainerUpdateIDs></e:property><e:property><ShareListRefreshState>NOTRUN</ShareListRefreshState></e:property><e:property><ShareIndexInProgress>0</ShareIndexInProgress></e:property><e:property><ShareIndexLastError></ShareIndexLastError></e:property><e:property><RadioFavoritesUpdateID>RINCON_000E5828228801400,17</RadioFavoritesUpdateID></e:property><e:property><RadioLocationUpdateID>RINCON_000E5828228801400,87</RadioLocationUpdateID></e:property><e:property><SavedQueuesUpdateID>RINCON_000E58283BD401400,48</SavedQueuesUpdateID></e:property><e:property><ShareListUpdateID>RINCON_000E5828228801400,216</ShareListUpdateID></e:property><e:property><RecentlyPlayedUpdateID>RINCON_000E5855842601400,76</RecentlyPlayedUpdateID></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "SystemUpdateID": "19" },
      { "ContainerUpdateIDs": "S:,2" },
      { "ShareListRefreshState": "NOTRUN" },
      { "ShareIndexInProgress": "0" },
      {
        
      },
      { "RadioFavoritesUpdateID": "RINCON_000E5828228801400,17" },
      { "RadioLocationUpdateID": "RINCON_000E5828228801400,87" },
      { "SavedQueuesUpdateID": "RINCON_000E58283BD401400,48" },
      { "ShareListUpdateID": "RINCON_000E5828228801400,216" },
      { "RecentlyPlayedUpdateID": "RINCON_000E5855842601400,76" }
    ]
  }
}
> The raw event is: NOTIFY /Render Control HTTP/1.1
HOST: 192.168.1.41:3406
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 1061
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828228801400_sub0000003615
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><LastChange>&lt;Event xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/RCS/&quot;&gt;&lt;InstanceID val=&quot;0&quot;&gt;&lt;Volume channel=&quot;Master&quot; val=&quot;35&quot;/&gt;&lt;Volume channel=&quot;LF&quot; val=&quot;100&quot;/&gt;&lt;Volume channel=&quot;RF&quot; val=&quot;100&quot;/&gt;&lt;Mute channel=&quot;Master&quot; val=&quot;0&quot;/&gt;&lt;Mute channel=&quot;LF&quot; val=&quot;0&quot;/&gt;&lt;Mute channel=&quot;RF&quot; val=&quot;0&quot;/&gt;&lt;Bass val=&quot;10&quot;/&gt;&lt;Treble val=&quot;8&quot;/&gt;&lt;Loudness channel=&quot;Master&quot; val=&quot;1&quot;/&gt;&lt;OutputFixed val=&quot;0&quot;/&gt;&lt;HeadphoneConnected val=&quot;0&quot;/&gt;&lt;SpeakerSize val=&quot;-1&quot;/&gt;&lt;SubGain val=&quot;0&quot;/&gt;&lt;SubCrossover val=&quot;0&quot;/&gt;&lt;SubPolarity val=&quot;0&quot;/&gt;&lt;SubEnabled val=&quot;1&quot;/&gt;&lt;PresetNameList&gt;FactoryDefaults&lt;/PresetNameList&gt;&lt;/InstanceID&gt;&lt;/Event&gt;</LastChange></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": {
      "LastChange": {
        "Event": {
          "-xmlns": "urn:schemas-upnp-org:metadata-1-0/RCS/",
          "InstanceID": {
            "-val": "0",
            "Volume": [
              {
                "-channel": "Master",
                "-val": "35"
              },
              {
                "-channel": "LF",
                "-val": "100"
              },
              {
                "-channel": "RF",
                "-val": "100"
              }
            ],
            "Mute": [
              {
                "-channel": "Master",
                "-val": "0"
              },
              {
                "-channel": "LF",
                "-val": "0"
              },
              {
                "-channel": "RF",
                "-val": "0"
              }
            ],
            "Bass": { "-val": "10" },
            "Treble": { "-val": "8" },
            "Loudness": {
              "-channel": "Master",
              "-val": "1"
            },
            "OutputFixed": { "-val": "0" },
            "HeadphoneConnected": { "-val": "0" },
            "SpeakerSize": { "-val": "-1" },
            "SubGain": { "-val": "0" },
            "SubCrossover": { "-val": "0" },
            "SubPolarity": { "-val": "0" },
            "SubEnabled": { "-val": "1" },
            "PresetNameList": "FactoryDefaults"
          }
        }
      }
    }
  }
}
> The raw event is: NOTIFY /Connection Manager HTTP/1.1
HOST: 192.168.1.41:3406
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 1925
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828228801400_sub0000003616
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><SourceProtocolInfo></SourceProtocolInfo></e:property><e:property><SinkProtocolInfo>http-get:*:audio/mp3:*,x-file-cifs:*:audio/mp3:*,http-get:*:audio/mp4:*,x-file-cifs:*:audio/mp4:*,http-get:*:audio/mpeg:*,x-file-cifs:*:audio/mpeg:*,http-get:*:audio/mpegurl:*,x-file-cifs:*:audio/mpegurl:*,real.com-rhapsody-http-1-0:*:audio/mpegurl:*,file:*:audio/mpegurl:*,http-get:*:audio/mpeg3:*,x-file-cifs:*:audio/mpeg3:*,http-get:*:audio/wav:*,x-file-cifs:*:audio/wav:*,http-get:*:audio/wma:*,x-file-cifs:*:audio/wma:*,http-get:*:audio/x-ms-wma:*,x-file-cifs:*:audio/x-ms-wma:*,http-get:*:audio/aiff:*,x-file-cifs:*:audio/aiff:*,http-get:*:audio/flac:*,x-file-cifs:*:audio/flac:*,http-get:*:application/ogg:*,x-file-cifs:*:application/ogg:*,http-get:*:audio/audible:*,x-file-cifs:*:audio/audible:*,real.com-rhapsody-http-1-0:*:audio/x-ms-wma:*,real.com-rhapsody-direct:*:audio/mp3:*,sonos.com-mms:*:audio/x-ms-wma:*,sonos.com-http:*:audio/mpeg3:*,sonos.com-http:*:audio/mpeg:*,sonos.com-http:*:audio/wma:*,sonos.com-http:*:audio/mp4:*,sonos.com-http:*:audio/wav:*,sonos.com-http:*:audio/aiff:*,sonos.com-http:*:audio/flac:*,sonos.com-http:*:application/ogg:*,sonos.com-spotify:*:audio/x-spotify:*,sonos.com-rtrecent:*:audio/x-sonos-recent:*,real.com-rhapsody-http-1-0:*:audio/x-rhap-radio:*,real.com-rhapsody-direct:*:audio/x-rhap-radio:*,pandora.com-pndrradio:*:audio/x-pandora-radio:*,pandora.com-pndrradio-http:*:audio/mpeg3:*,sirius.com-sirradio:*:audio/x-sirius-radio:*,x-rincon:*:*:*,x-rincon-mp3radio:*:*:*,x-rincon-playlist:*:*:*,x-rincon-queue:*:*:*,x-rincon-stream:*:*:*,x-sonosapi-stream:*:*:*,x-sonosapi-radio:*:audio/x-sonosapi-radio:*,x-rincon-cpcontainer:*:*:*,last.fm-radio:*:audio/x-lastfm-radio:*,last.fm-radio-http:*:audio/mpeg3:*</SinkProtocolInfo></e:property><e:property><CurrentConnectionIDs></CurrentConnectionIDs></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      {
        
      },
      { "SinkProtocolInfo": "http-get:*:audio/mp3:*,x-file-cifs:*:audio/mp3:*,http-get:*:audio/mp4:*,x-file-cifs:*:audio/mp4:*,http-get:*:audio/mpeg:*,x-file-cifs:*:audio/mpeg:*,http-get:*:audio/mpegurl:*,x-file-cifs:*:audio/mpegurl:*,real.com-rhapsody-http-1-0:*:audio/mpegurl:*,file:*:audio/mpegurl:*,http-get:*:audio/mpeg3:*,x-file-cifs:*:audio/mpeg3:*,http-get:*:audio/wav:*,x-file-cifs:*:audio/wav:*,http-get:*:audio/wma:*,x-file-cifs:*:audio/wma:*,http-get:*:audio/x-ms-wma:*,x-file-cifs:*:audio/x-ms-wma:*,http-get:*:audio/aiff:*,x-file-cifs:*:audio/aiff:*,http-get:*:audio/flac:*,x-file-cifs:*:audio/flac:*,http-get:*:application/ogg:*,x-file-cifs:*:application/ogg:*,http-get:*:audio/audible:*,x-file-cifs:*:audio/audible:*,real.com-rhapsody-http-1-0:*:audio/x-ms-wma:*,real.com-rhapsody-direct:*:audio/mp3:*,sonos.com-mms:*:audio/x-ms-wma:*,sonos.com-http:*:audio/mpeg3:*,sonos.com-http:*:audio/mpeg:*,sonos.com-http:*:audio/wma:*,sonos.com-http:*:audio/mp4:*,sonos.com-http:*:audio/wav:*,sonos.com-http:*:audio/aiff:*,sonos.com-http:*:audio/flac:*,sonos.com-http:*:application/ogg:*,sonos.com-spotify:*:audio/x-spotify:*,sonos.com-rtrecent:*:audio/x-sonos-recent:*,real.com-rhapsody-http-1-0:*:audio/x-rhap-radio:*,real.com-rhapsody-direct:*:audio/x-rhap-radio:*,pandora.com-pndrradio:*:audio/x-pandora-radio:*,pandora.com-pndrradio-http:*:audio/mpeg3:*,sirius.com-sirradio:*:audio/x-sirius-radio:*,x-rincon:*:*:*,x-rincon-mp3radio:*:*:*,x-rincon-playlist:*:*:*,x-rincon-queue:*:*:*,x-rincon-stream:*:*:*,x-sonosapi-stream:*:*:*,x-sonosapi-radio:*:audio/x-sonosapi-radio:*,x-rincon-cpcontainer:*:*:*,last.fm-radio:*:audio/x-lastfm-radio:*,last.fm-radio-http:*:audio/mpeg3:*" },
      {
        
      }
    ]
  }
}
> Subscribing to events
> The raw event is: NOTIFY /Transport Event HTTP/1.1
HOST: 192.168.1.41:3406
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 5552
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828228801400_sub0000003617
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><LastChange>&lt;Event xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/AVT/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot;&gt;&lt;InstanceID val=&quot;0&quot;&gt;&lt;TransportState val=&quot;STOPPED&quot;/&gt;&lt;CurrentPlayMode val=&quot;NORMAL&quot;/&gt;&lt;CurrentCrossfadeMode val=&quot;0&quot;/&gt;&lt;NumberOfTracks val=&quot;12&quot;/&gt;&lt;CurrentTrack val=&quot;1&quot;/&gt;&lt;CurrentSection val=&quot;0&quot;/&gt;&lt;CurrentTrackURI val=&quot;x-sonos-spotify:spotify%3atrack%3a74zLuMblZGPBZm3CHgjrC5?sid=9&amp;amp;flags=0&quot;/&gt;&lt;CurrentTrackDuration val=&quot;0:01:01&quot;/&gt;&lt;CurrentTrackMetaData val=&quot;&amp;lt;DIDL-Lite xmlns:dc=&amp;quot;http://purl.org/dc/elements/1.1/&amp;quot; xmlns:upnp=&amp;quot;urn:schemas-upnp-org:metadata-1-0/upnp/&amp;quot; xmlns:r=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot; xmlns=&amp;quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&amp;quot;&amp;gt;&amp;lt;item id=&amp;quot;-1&amp;quot; parentID=&amp;quot;-1&amp;quot; restricted=&amp;quot;true&amp;quot;&amp;gt;&amp;lt;res protocolInfo=&amp;quot;sonos.com-spotify:*:audio/x-spotify:*&amp;quot; duration=&amp;quot;0:01:01&amp;quot;&amp;gt;x-sonos-spotify:spotify%3atrack%3a74zLuMblZGPBZm3CHgjrC5?sid=9&amp;amp;amp;flags=0&amp;lt;/res&amp;gt;&amp;lt;r:streamContent&amp;gt;&amp;lt;/r:streamContent&amp;gt;&amp;lt;r:radioShowMd&amp;gt;&amp;lt;/r:radioShowMd&amp;gt;&amp;lt;upnp:albumArtURI&amp;gt;/getaa?s=1&amp;amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a74zLuMblZGPBZm3CHgjrC5%3fsid%3d9%26flags%3d0&amp;lt;/upnp:albumArtURI&amp;gt;&amp;lt;dc:title&amp;gt;Making Mirrors&amp;lt;/dc:title&amp;gt;&amp;lt;upnp:class&amp;gt;object.item.audioItem.musicTrack&amp;lt;/upnp:class&amp;gt;&amp;lt;dc:creator&amp;gt;Gotye&amp;lt;/dc:creator&amp;gt;&amp;lt;upnp:album&amp;gt;Making Mirrors&amp;lt;/upnp:album&amp;gt;&amp;lt;/item&amp;gt;&amp;lt;/DIDL-Lite&amp;gt;&quot;/&gt;&lt;r:NextTrackURI val=&quot;x-sonos-spotify:spotify%3atrack%3a52JMuYbqES4401sbcCUiuC?sid=9&amp;amp;flags=0&quot;/&gt;&lt;r:NextTrackMetaData val=&quot;&amp;lt;DIDL-Lite xmlns:dc=&amp;quot;http://purl.org/dc/elements/1.1/&amp;quot; xmlns:upnp=&amp;quot;urn:schemas-upnp-org:metadata-1-0/upnp/&amp;quot; xmlns:r=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot; xmlns=&amp;quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&amp;quot;&amp;gt;&amp;lt;item id=&amp;quot;-1&amp;quot; parentID=&amp;quot;-1&amp;quot; restricted=&amp;quot;true&amp;quot;&amp;gt;&amp;lt;res protocolInfo=&amp;quot;sonos.com-spotify:*:audio/x-spotify:*&amp;quot; duration=&amp;quot;0:01:57&amp;quot;&amp;gt;x-sonos-spotify:spotify%3atrack%3a52JMuYbqES4401sbcCUiuC?sid=9&amp;amp;amp;flags=0&amp;lt;/res&amp;gt;&amp;lt;upnp:albumArtURI&amp;gt;/getaa?s=1&amp;amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a52JMuYbqES4401sbcCUiuC%3fsid%3d9%26flags%3d0&amp;lt;/upnp:albumArtURI&amp;gt;&amp;lt;dc:title&amp;gt;Easy Way Out&amp;lt;/dc:title&amp;gt;&amp;lt;upnp:class&amp;gt;object.item.audioItem.musicTrack&amp;lt;/upnp:class&amp;gt;&amp;lt;dc:creator&amp;gt;Gotye&amp;lt;/dc:creator&amp;gt;&amp;lt;upnp:album&amp;gt;Making Mirrors&amp;lt;/upnp:album&amp;gt;&amp;lt;/item&amp;gt;&amp;lt;/DIDL-Lite&amp;gt;&quot;/&gt;&lt;r:EnqueuedTransportURI val=&quot;x-rincon-cpcontainer:0004008cspotify%3aalbum%3a4G2rJNhsKOE6iHgtUqZ0Ye&quot;/&gt;&lt;r:EnqueuedTransportURIMetaData val=&quot;&amp;lt;DIDL-Lite xmlns:dc=&amp;quot;http://purl.org/dc/elements/1.1/&amp;quot; xmlns:upnp=&amp;quot;urn:schemas-upnp-org:metadata-1-0/upnp/&amp;quot; xmlns:r=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot; xmlns=&amp;quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&amp;quot;&amp;gt;&amp;lt;item id=&amp;quot;0004008cspotify%3aalbum%3a4G2rJNhsKOE6iHgtUqZ0Ye&amp;quot; parentID=&amp;quot;0004008cspotify%3aalbum%3a4G2rJNhsKOE6iHgtUqZ0Ye&amp;quot; restricted=&amp;quot;true&amp;quot;&amp;gt;&amp;lt;dc:title&amp;gt;Complete Album (12 tracks)&amp;lt;/dc:title&amp;gt;&amp;lt;upnp:class&amp;gt;object.container.album.musicAlbum&amp;lt;/upnp:class&amp;gt;&amp;lt;desc id=&amp;quot;cdudn&amp;quot; nameSpace=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot;&amp;gt;SA_RINCON2311_postsi&amp;lt;/desc&amp;gt;&amp;lt;/item&amp;gt;&amp;lt;/DIDL-Lite&amp;gt;&quot;/&gt;&lt;PlaybackStorageMedium val=&quot;NETWORK&quot;/&gt;&lt;AVTransportURI val=&quot;x-rincon-queue:RINCON_000E5828228801400#0&quot;/&gt;&lt;AVTransportURIMetaData val=&quot;&quot;/&gt;&lt;CurrentTransportActions val=&quot;Set, Play, Stop, Pause, Seek, Next, Previous&quot;/&gt;&lt;TransportStatus val=&quot;OK&quot;/&gt;&lt;r:SleepTimerGeneration val=&quot;0&quot;/&gt;&lt;r:AlarmRunning val=&quot;0&quot;/&gt;&lt;r:SnoozeRunning val=&quot;0&quot;/&gt;&lt;r:RestartPending val=&quot;0&quot;/&gt;&lt;TransportPlaySpeed val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;CurrentMediaDuration val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;RecordStorageMedium val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;PossiblePlaybackStorageMedia val=&quot;NONE, NETWORK&quot;/&gt;&lt;PossibleRecordStorageMedia val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;RecordMediumWriteStatus val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;CurrentRecordQualityMode val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;PossibleRecordQualityModes val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;NextAVTransportURI val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;NextAVTransportURIMetaData val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;/InstanceID&gt;&lt;/Event&gt;</LastChange></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": {
      "LastChange": {
        "Event": {
          "-xmlns": "urn:schemas-upnp-org:metadata-1-0/AVT/",
          "-xmlns:r": "urn:schemas-rinconnetworks-com:metadata-1-0/",
          "InstanceID": {
            "-val": "0",
            "TransportState": { "-val": "STOPPED" },
            "CurrentPlayMode": { "-val": "NORMAL" },
            "CurrentCrossfadeMode": { "-val": "0" },
            "NumberOfTracks": { "-val": "12" },
            "CurrentTrack": { "-val": "1" },
            "CurrentSection": { "-val": "0" },
            "CurrentTrackURI": { "-val": "x-sonos-spotify:spotify%3atrack%3a74zLuMblZGPBZm3CHgjrC5?sid=9&amp;flags=0" },
            "CurrentTrackDuration": { "-val": "0:01:01" },
            "CurrentTrackMetaData": { "-val": "&lt;DIDL-Lite xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot; xmlns:upnp=&quot;urn:schemas-upnp-org:metadata-1-0/upnp/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot; xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&quot;&gt;&lt;item id=&quot;-1&quot; parentID=&quot;-1&quot; restricted=&quot;true&quot;&gt;&lt;res protocolInfo=&quot;sonos.com-spotify:*:audio/x-spotify:*&quot; duration=&quot;0:01:01&quot;&gt;x-sonos-spotify:spotify%3atrack%3a74zLuMblZGPBZm3CHgjrC5?sid=9&amp;amp;flags=0&lt;/res&gt;&lt;r:streamContent&gt;&lt;/r:streamContent&gt;&lt;r:radioShowMd&gt;&lt;/r:radioShowMd&gt;&lt;upnp:albumArtURI&gt;/getaa?s=1&amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a74zLuMblZGPBZm3CHgjrC5%3fsid%3d9%26flags%3d0&lt;/upnp:albumArtURI&gt;&lt;dc:title&gt;Making Mirrors&lt;/dc:title&gt;&lt;upnp:class&gt;object.item.audioItem.musicTrack&lt;/upnp:class&gt;&lt;dc:creator&gt;Gotye&lt;/dc:creator&gt;&lt;upnp:album&gt;Making Mirrors&lt;/upnp:album&gt;&lt;/item&gt;&lt;/DIDL-Lite&gt;" },
            "r:NextTrackURI": { "-val": "x-sonos-spotify:spotify%3atrack%3a52JMuYbqES4401sbcCUiuC?sid=9&amp;flags=0" },
            "r:NextTrackMetaData": { "-val": "&lt;DIDL-Lite xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot; xmlns:upnp=&quot;urn:schemas-upnp-org:metadata-1-0/upnp/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot; xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&quot;&gt;&lt;item id=&quot;-1&quot; parentID=&quot;-1&quot; restricted=&quot;true&quot;&gt;&lt;res protocolInfo=&quot;sonos.com-spotify:*:audio/x-spotify:*&quot; duration=&quot;0:01:57&quot;&gt;x-sonos-spotify:spotify%3atrack%3a52JMuYbqES4401sbcCUiuC?sid=9&amp;amp;flags=0&lt;/res&gt;&lt;upnp:albumArtURI&gt;/getaa?s=1&amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a52JMuYbqES4401sbcCUiuC%3fsid%3d9%26flags%3d0&lt;/upnp:albumArtURI&gt;&lt;dc:title&gt;Easy Way Out&lt;/dc:title&gt;&lt;upnp:class&gt;object.item.audioItem.musicTrack&lt;/upnp:class&gt;&lt;dc:creator&gt;Gotye&lt;/dc:creator&gt;&lt;upnp:album&gt;Making Mirrors&lt;/upnp:album&gt;&lt;/item&gt;&lt;/DIDL-Lite&gt;" },
            "r:EnqueuedTransportURI": { "-val": "x-rincon-cpcontainer:0004008cspotify%3aalbum%3a4G2rJNhsKOE6iHgtUqZ0Ye" },
            "r:EnqueuedTransportURIMetaData": { "-val": "&lt;DIDL-Lite xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot; xmlns:upnp=&quot;urn:schemas-upnp-org:metadata-1-0/upnp/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot; xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&quot;&gt;&lt;item id=&quot;0004008cspotify%3aalbum%3a4G2rJNhsKOE6iHgtUqZ0Ye&quot; parentID=&quot;0004008cspotify%3aalbum%3a4G2rJNhsKOE6iHgtUqZ0Ye&quot; restricted=&quot;true&quot;&gt;&lt;dc:title&gt;Complete Album (12 tracks)&lt;/dc:title&gt;&lt;upnp:class&gt;object.container.album.musicAlbum&lt;/upnp:class&gt;&lt;desc id=&quot;cdudn&quot; nameSpace=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot;&gt;SA_RINCON2311_postsi&lt;/desc&gt;&lt;/item&gt;&lt;/DIDL-Lite&gt;" },
            "PlaybackStorageMedium": { "-val": "NETWORK" },
            "AVTransportURI": { "-val": "x-rincon-queue:RINCON_000E5828228801400#0" },
            "AVTransportURIMetaData": {
              
            },
            "CurrentTransportActions": { "-val": "Set, Play, Stop, Pause, Seek, Next, Previous" },
            "TransportStatus": { "-val": "OK" },
            "r:SleepTimerGeneration": { "-val": "0" },
            "r:AlarmRunning": { "-val": "0" },
            "r:SnoozeRunning": { "-val": "0" },
            "r:RestartPending": { "-val": "0" },
            "TransportPlaySpeed": { "-val": "NOT_IMPLEMENTED" },
            "CurrentMediaDuration": { "-val": "NOT_IMPLEMENTED" },
            "RecordStorageMedium": { "-val": "NOT_IMPLEMENTED" },
            "PossiblePlaybackStorageMedia": { "-val": "NONE, NETWORK" },
            "PossibleRecordStorageMedia": { "-val": "NOT_IMPLEMENTED" },
            "RecordMediumWriteStatus": { "-val": "NOT_IMPLEMENTED" },
            "CurrentRecordQualityMode": { "-val": "NOT_IMPLEMENTED" },
            "PossibleRecordQualityModes": { "-val": "NOT_IMPLEMENTED" },
            "NextAVTransportURI": { "-val": "NOT_IMPLEMENTED" },
            "NextAVTransportURIMetaData": { "-val": "NOT_IMPLEMENTED" }
          }
        }
      }
    }
  }
}
> The raw event is: NOTIFY /Alarm Clock HTTP/1.1
HOST: 192.168.1.41:3402
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 629
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A1C401400_sub0000003016
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><TimeZone>00000a000502000003000501ffc4</TimeZone></e:property><e:property><TimeServer>0.sonostime.pool.ntp.org,1.sonostime.pool.ntp.org,2.sonostime.pool.ntp.org,3.sonostime.pool.ntp.org</TimeServer></e:property><e:property><TimeGeneration>4</TimeGeneration></e:property><e:property><AlarmListVersion>RINCON_000E5828228801400:22</AlarmListVersion></e:property><e:property><TimeFormat>INV</TimeFormat></e:property><e:property><DateFormat>INV</DateFormat></e:property><e:property><DailyIndexRefreshTime>02:00:00</DailyIndexRefreshTime></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "TimeZone": "00000a000502000003000501ffc4" },
      { "TimeServer": "0.sonostime.pool.ntp.org,1.sonostime.pool.ntp.org,2.sonostime.pool.ntp.org,3.sonostime.pool.ntp.org" },
      { "TimeGeneration": "4" },
      { "AlarmListVersion": "RINCON_000E5828228801400:22" },
      { "TimeFormat": "INV" },
      { "DateFormat": "INV" },
      { "DailyIndexRefreshTime": "02:00:00" }
    ]
  }
}
> The raw event is: NOTIFY /Music Services HTTP/1.1
HOST: 192.168.1.41:3402
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 166
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A1C401400_sub0000003017
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ServiceListVersion>RINCON_000E5828228801400:943</ServiceListVersion></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": { "ServiceListVersion": "RINCON_000E5828228801400:943" }
  }
}
> The raw event is: NOTIFY /Audio In HTTP/1.1
HOST: 192.168.1.41:3402
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 374
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A1C401400_sub0000003018
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><AudioInputName>Line-In</AudioInputName></e:property><e:property><Icon>AudioComponent</Icon></e:property><e:property><LineInConnected>1</LineInConnected></e:property><e:property><LeftLineInLevel>1</LeftLineInLevel></e:property><e:property><RightLineInLevel>1</RightLineInLevel></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "AudioInputName": "Line-In" },
      { "Icon": "AudioComponent" },
      { "LineInConnected": "1" },
      { "LeftLineInLevel": "1" },
      { "RightLineInLevel": "1" }
    ]
  }
}
> The raw event is: NOTIFY /Device Properties HTTP/1.1
HOST: 192.168.1.41:3402
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 707
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A1C401400_sub0000003019
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneName>Record Player</ZoneName></e:property><e:property><Icon>x-rincon-roomicon:den</Icon></e:property><e:property><Invisible>0</Invisible></e:property><e:property><IsZoneBridge>0</IsZoneBridge></e:property><e:property><SettingsReplicationState>RINCON_000E5828228801400,17,RINCON_FFFFFFFFFFFF99999,0,RINCON_000E58283BD401400,48,RINCON_000E5828228801400,216,RINCON_000E5828228801400,87,RINCON_000E5828A1C401400,58,RINCON_000E5828228801400,943,RINCON_000E5855842601400,76,RINCON_000E5828228801400,4,RINCON_000E5828A1C401400,27</SettingsReplicationState></e:property><e:property><ChannelMapSet></ChannelMapSet></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "ZoneName": "Record Player" },
      { "Icon": "x-rincon-roomicon:den" },
      { "Invisible": "0" },
      { "IsZoneBridge": "0" },
      { "SettingsReplicationState": "RINCON_000E5828228801400,17,RINCON_FFFFFFFFFFFF99999,0,RINCON_000E58283BD401400,48,RINCON_000E5828228801400,216,RINCON_000E5828228801400,87,RINCON_000E5828A1C401400,58,RINCON_000E5828228801400,943,RINCON_000E5855842601400,76,RINCON_000E5828228801400,4,RINCON_000E5828A1C401400,27" },
      {
        
      }
    ]
  }
}
> The raw event is: NOTIFY /Zone Group HTTP/1.1
HOST: 192.168.1.41:3402
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 5809
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A1C401400_sub0000003020
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneGroupState>&lt;ZoneGroups&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58289F2E01400&quot; ID=&quot;RINCON_000E58289F2E01400:106&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58289F2E01400&quot; Location=&quot;http://192.168.1.39:1400/xml/device_description.xml&quot; ZoneName=&quot;Dining Room&quot; Icon=&quot;x-rincon-roomicon:dining&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;99&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E585445BA01400&quot; ID=&quot;RINCON_000E585445BA01400:6&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E585445BA01400&quot; Location=&quot;http://192.168.1.28:1400/xml/device_description.xml&quot; ZoneName=&quot;Lauren Room&quot; Icon=&quot;x-rincon-roomicon:living&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;15&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5855842601400&quot; ID=&quot;RINCON_000E5855842601400:17&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58980FE001400&quot; Location=&quot;http://192.168.1.32:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; Invisible=&quot;1&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;14&quot;/&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5855842601400&quot; Location=&quot;http://192.168.1.26:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;9&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283BD401400&quot; ID=&quot;RINCON_000E58283BD401400:177&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283BD401400&quot; Location=&quot;http://192.168.1.38:1400/xml/device_description.xml&quot; ZoneName=&quot;Bathroom&quot; Icon=&quot;x-rincon-roomicon:bathroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;110&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A20201400&quot; ID=&quot;RINCON_000E5828A20201400:185&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A20201400&quot; Location=&quot;http://192.168.1.36:1400/xml/device_description.xml&quot; ZoneName=&quot;Master Bed&quot; Icon=&quot;x-rincon-roomicon:masterbedroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;97&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283AC801400&quot; ID=&quot;RINCON_000E58283AC801400:103&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283AC801400&quot; Location=&quot;http://192.168.1.27:1400/xml/device_description.xml&quot; ZoneName=&quot;TV Room&quot; Icon=&quot;x-rincon-roomicon:tvroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;102&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828228801400&quot; ID=&quot;RINCON_000E58283BD401400:176&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828228801400&quot; Location=&quot;http://192.168.1.37:1400/xml/device_description.xml&quot; ZoneName=&quot;Kitchen&quot; Icon=&quot;x-rincon-roomicon:kitchen&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;95&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A1C401400&quot; ID=&quot;RINCON_000E5828A1C401400:76&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A1C401400&quot; Location=&quot;http://192.168.1.34:1400/xml/device_description.xml&quot; ZoneName=&quot;Record Player&quot; Icon=&quot;x-rincon-roomicon:den&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;47&quot;/&gt;&lt;/ZoneGroup&gt;&lt;/ZoneGroups&gt;</ZoneGroupState></e:property><e:property><ThirdPartyMediaServersX>2:oDnrgPcYFcFz2kc4/E2IsICKSP8DmgN5c7CDFjAI3dhkuDwochz3qhrA00n64oG9PjwlN7C9AIDTJWsL4armKFlAA31OL9rwUB2tswz4hD/xTVfNDXCKBVqde5Z16zJHfcatedkN7qQ1YXpfJ2fCVp+dbW0t5lXXgmJO//Shuxz53E/+qbhbdjgZ9fSFRFm+ZZHuIc2/f9JlDYUEJJLMWH6B7+OzxgmGowbMMJbCzswXvClzSSvVjyzXObFV9cl5FkneKHi5h/afjH2MfRLY1C0ghkKBp9p64WTLLSDxJfkfBNePPA6mBTbn+swLRrcSumqvGzNThs6cYAOvRHlVe2cr7v9RA3BckAxwLzmxsS7nxDLjV1/hz+8PF0/oiS60BvAqBcO1Q29aDrp+vIvWySzhxE1i0Q723Tm23VR7oDr347pO4H3KcTNLlIsYWxjUTjQfQZAT0+JKDhEgQ1EEub4IZcwNAS/sXzVauqaU0IZ9Hs9UGTrRdiMzaYu+AA1hiCzkAIX568/twlfky/i2r7s2Z0vPXQlHN+mth8XeGvqiSEBTJVDsPAMAssYsFCJzoCN1CzHVMKy7bXLycFqmvkZx5MsHgSJh2q40OjPkpOOTy4ET+vC9+DGifIfw/ks93HUebru2gA0mMnZqUbNkOyLwFM1F/0YOIZj0qxwJwe/nlLMR5sWwx/JaXsin2T8mHkb1Vgf+zYPBq8USHvBCVNNyKE5Lh1bRUqmEQse+lfE3Msf9B0pY8sOrh5rLV8ba0DaEv6hg68cM8fLKyGY1WKqeeNy90DBCLsdY+i/GDgwegf+nO2MIdhkFhqfmvQ2MK6r1OmHJdbgjbYoRDxizYZDjrrllKiZ8iBDP0NKI90zNBkscgkRo8tIX6yXhiAjc5lZSKypjJYOXEnPzryi9lpNWZ+wtsJCQiRPPmR82I9Y=</ThirdPartyMediaServersX></e:property><e:property><AvailableSoftwareUpdate>&lt;UpdateItem xmlns=&quot;urn:schemas-rinconnetworks-com:update-1-0&quot; Type=&quot;Software&quot; Version=&quot;19.3-53220&quot; UpdateURL=&quot;http://update.sonos.com/firmware/Gold/v3.8-Hammer-RC2/^19.3-53220&quot; DownloadSize=&quot;0&quot; ManifestURL=&quot;http://update.sonos.com/firmware/Gold/v3.8.2-Hammer-Patch-MDCR/update_1344386463.upm&quot;/&gt;</AvailableSoftwareUpdate></e:property><e:property><AlarmRunSequence>RINCON_000E5828A1C401400:47:0</AlarmRunSequence></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      {
        "ZoneGroupState": {
          "ZoneGroups": {
            "ZoneGroup": [
              {
                "-Coordinator": "RINCON_000E58289F2E01400",
                "-ID": "RINCON_000E58289F2E01400:106",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58289F2E01400",
                  "-Location": "http://192.168.1.39:1400/xml/device_description.xml",
                  "-ZoneName": "Dining Room",
                  "-Icon": "x-rincon-roomicon:dining",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "99"
                }
              },
              {
                "-Coordinator": "RINCON_000E585445BA01400",
                "-ID": "RINCON_000E585445BA01400:6",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E585445BA01400",
                  "-Location": "http://192.168.1.28:1400/xml/device_description.xml",
                  "-ZoneName": "Lauren Room",
                  "-Icon": "x-rincon-roomicon:living",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "15"
                }
              },
              {
                "-Coordinator": "RINCON_000E5855842601400",
                "-ID": "RINCON_000E5855842601400:17",
                "ZoneGroupMember": [
                  {
                    "-UUID": "RINCON_000E58980FE001400",
                    "-Location": "http://192.168.1.32:1400/xml/device_description.xml",
                    "-ZoneName": "Office",
                    "-Icon": "x-rincon-roomicon:office",
                    "-Invisible": "1",
                    "-SoftwareVersion": "19.3-53220b",
                    "-MinCompatibleVersion": "19.1-00000",
                    "-ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW",
                    "-BootSeq": "14"
                  },
                  {
                    "-UUID": "RINCON_000E5855842601400",
                    "-Location": "http://192.168.1.26:1400/xml/device_description.xml",
                    "-ZoneName": "Office",
                    "-Icon": "x-rincon-roomicon:office",
                    "-SoftwareVersion": "19.3-53220b",
                    "-MinCompatibleVersion": "19.1-00000",
                    "-ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW",
                    "-BootSeq": "9"
                  }
                ]
              },
              {
                "-Coordinator": "RINCON_000E58283BD401400",
                "-ID": "RINCON_000E58283BD401400:177",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58283BD401400",
                  "-Location": "http://192.168.1.38:1400/xml/device_description.xml",
                  "-ZoneName": "Bathroom",
                  "-Icon": "x-rincon-roomicon:bathroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "110"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828A20201400",
                "-ID": "RINCON_000E5828A20201400:185",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828A20201400",
                  "-Location": "http://192.168.1.36:1400/xml/device_description.xml",
                  "-ZoneName": "Master Bed",
                  "-Icon": "x-rincon-roomicon:masterbedroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "97"
                }
              },
              {
                "-Coordinator": "RINCON_000E58283AC801400",
                "-ID": "RINCON_000E58283AC801400:103",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58283AC801400",
                  "-Location": "http://192.168.1.27:1400/xml/device_description.xml",
                  "-ZoneName": "TV Room",
                  "-Icon": "x-rincon-roomicon:tvroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "102"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828228801400",
                "-ID": "RINCON_000E58283BD401400:176",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828228801400",
                  "-Location": "http://192.168.1.37:1400/xml/device_description.xml",
                  "-ZoneName": "Kitchen",
                  "-Icon": "x-rincon-roomicon:kitchen",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "95"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828A1C401400",
                "-ID": "RINCON_000E5828A1C401400:76",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828A1C401400",
                  "-Location": "http://192.168.1.34:1400/xml/device_description.xml",
                  "-ZoneName": "Record Player",
                  "-Icon": "x-rincon-roomicon:den",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "47"
                }
              }
            ]
          }
        }
      },
      { "ThirdPartyMediaServersX": "2:oDnrgPcYFcFz2kc4/E2IsICKSP8DmgN5c7CDFjAI3dhkuDwochz3qhrA00n64oG9PjwlN7C9AIDTJWsL4armKFlAA31OL9rwUB2tswz4hD/xTVfNDXCKBVqde5Z16zJHfcatedkN7qQ1YXpfJ2fCVp+dbW0t5lXXgmJO//Shuxz53E/+qbhbdjgZ9fSFRFm+ZZHuIc2/f9JlDYUEJJLMWH6B7+OzxgmGowbMMJbCzswXvClzSSvVjyzXObFV9cl5FkneKHi5h/afjH2MfRLY1C0ghkKBp9p64WTLLSDxJfkfBNePPA6mBTbn+swLRrcSumqvGzNThs6cYAOvRHlVe2cr7v9RA3BckAxwLzmxsS7nxDLjV1/hz+8PF0/oiS60BvAqBcO1Q29aDrp+vIvWySzhxE1i0Q723Tm23VR7oDr347pO4H3KcTNLlIsYWxjUTjQfQZAT0+JKDhEgQ1EEub4IZcwNAS/sXzVauqaU0IZ9Hs9UGTrRdiMzaYu+AA1hiCzkAIX568/twlfky/i2r7s2Z0vPXQlHN+mth8XeGvqiSEBTJVDsPAMAssYsFCJzoCN1CzHVMKy7bXLycFqmvkZx5MsHgSJh2q40OjPkpOOTy4ET+vC9+DGifIfw/ks93HUebru2gA0mMnZqUbNkOyLwFM1F/0YOIZj0qxwJwe/nlLMR5sWwx/JaXsin2T8mHkb1Vgf+zYPBq8USHvBCVNNyKE5Lh1bRUqmEQse+lfE3Msf9B0pY8sOrh5rLV8ba0DaEv6hg68cM8fLKyGY1WKqeeNy90DBCLsdY+i/GDgwegf+nO2MIdhkFhqfmvQ2MK6r1OmHJdbgjbYoRDxizYZDjrrllKiZ8iBDP0NKI90zNBkscgkRo8tIX6yXhiAjc5lZSKypjJYOXEnPzryi9lpNWZ+wtsJCQiRPPmR82I9Y=" },
      {
        "AvailableSoftwareUpdate": {
          "UpdateItem": {
            "-xmlns": "urn:schemas-rinconnetworks-com:update-1-0",
            "-Type": "Software",
            "-Version": "19.3-53220",
            "-UpdateURL": "http://update.sonos.com/firmware/Gold/v3.8-Hammer-RC2/^19.3-53220",
            "-DownloadSize": "0",
            "-ManifestURL": "http://update.sonos.com/firmware/Gold/v3.8.2-Hammer-Patch-MDCR/update_1344386463.upm"
          }
        }
      },
      { "AlarmRunSequence": "RINCON_000E5828A1C401400:47:0" }
    ]
  }
}
> The raw event is: NOTIFY /Group Management HTTP/1.1
HOST: 192.168.1.41:3402
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 234
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A1C401400_sub0000003021
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><GroupCoordinatorIsLocal>1</GroupCoordinatorIsLocal></e:property><e:property><LocalGroupUUID>RINCON_000E5828A1C401400:76</LocalGroupUUID></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "GroupCoordinatorIsLocal": "1" },
      { "LocalGroupUUID": "RINCON_000E5828A1C401400:76" }
    ]
  }
}
> The raw event is: NOTIFY /Content Directory HTTP/1.1
HOST: 192.168.1.41:3402
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 906
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A1C401400_sub0000003022
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><SystemUpdateID>4</SystemUpdateID></e:property><e:property><ContainerUpdateIDs>S:,2</ContainerUpdateIDs></e:property><e:property><ShareListRefreshState>NOTRUN</ShareListRefreshState></e:property><e:property><ShareIndexInProgress>0</ShareIndexInProgress></e:property><e:property><ShareIndexLastError></ShareIndexLastError></e:property><e:property><RadioFavoritesUpdateID>RINCON_000E5828228801400,17</RadioFavoritesUpdateID></e:property><e:property><RadioLocationUpdateID>RINCON_000E5828228801400,87</RadioLocationUpdateID></e:property><e:property><SavedQueuesUpdateID>RINCON_000E58283BD401400,48</SavedQueuesUpdateID></e:property><e:property><ShareListUpdateID>RINCON_000E5828228801400,216</ShareListUpdateID></e:property><e:property><RecentlyPlayedUpdateID>RINCON_000E5855842601400,76</RecentlyPlayedUpdateID></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "SystemUpdateID": "4" },
      { "ContainerUpdateIDs": "S:,2" },
      { "ShareListRefreshState": "NOTRUN" },
      { "ShareIndexInProgress": "0" },
      {
        
      },
      { "RadioFavoritesUpdateID": "RINCON_000E5828228801400,17" },
      { "RadioLocationUpdateID": "RINCON_000E5828228801400,87" },
      { "SavedQueuesUpdateID": "RINCON_000E58283BD401400,48" },
      { "ShareListUpdateID": "RINCON_000E5828228801400,216" },
      { "RecentlyPlayedUpdateID": "RINCON_000E5855842601400,76" }
    ]
  }
}
> The raw event is: NOTIFY /Render Control HTTP/1.1
HOST: 192.168.1.41:3402
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 1060
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A1C401400_sub0000003023
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><LastChange>&lt;Event xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/RCS/&quot;&gt;&lt;InstanceID val=&quot;0&quot;&gt;&lt;Volume channel=&quot;Master&quot; val=&quot;19&quot;/&gt;&lt;Volume channel=&quot;LF&quot; val=&quot;100&quot;/&gt;&lt;Volume channel=&quot;RF&quot; val=&quot;100&quot;/&gt;&lt;Mute channel=&quot;Master&quot; val=&quot;0&quot;/&gt;&lt;Mute channel=&quot;LF&quot; val=&quot;0&quot;/&gt;&lt;Mute channel=&quot;RF&quot; val=&quot;0&quot;/&gt;&lt;Bass val=&quot;0&quot;/&gt;&lt;Treble val=&quot;0&quot;/&gt;&lt;Loudness channel=&quot;Master&quot; val=&quot;0&quot;/&gt;&lt;OutputFixed val=&quot;0&quot;/&gt;&lt;HeadphoneConnected val=&quot;0&quot;/&gt;&lt;SpeakerSize val=&quot;-1&quot;/&gt;&lt;SubGain val=&quot;0&quot;/&gt;&lt;SubCrossover val=&quot;0&quot;/&gt;&lt;SubPolarity val=&quot;0&quot;/&gt;&lt;SubEnabled val=&quot;1&quot;/&gt;&lt;PresetNameList&gt;FactoryDefaults&lt;/PresetNameList&gt;&lt;/InstanceID&gt;&lt;/Event&gt;</LastChange></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": {
      "LastChange": {
        "Event": {
          "-xmlns": "urn:schemas-upnp-org:metadata-1-0/RCS/",
          "InstanceID": {
            "-val": "0",
            "Volume": [
              {
                "-channel": "Master",
                "-val": "19"
              },
              {
                "-channel": "LF",
                "-val": "100"
              },
              {
                "-channel": "RF",
                "-val": "100"
              }
            ],
            "Mute": [
              {
                "-channel": "Master",
                "-val": "0"
              },
              {
                "-channel": "LF",
                "-val": "0"
              },
              {
                "-channel": "RF",
                "-val": "0"
              }
            ],
            "Bass": { "-val": "0" },
            "Treble": { "-val": "0" },
            "Loudness": {
              "-channel": "Master",
              "-val": "0"
            },
            "OutputFixed": { "-val": "0" },
            "HeadphoneConnected": { "-val": "0" },
            "SpeakerSize": { "-val": "-1" },
            "SubGain": { "-val": "0" },
            "SubCrossover": { "-val": "0" },
            "SubPolarity": { "-val": "0" },
            "SubEnabled": { "-val": "1" },
            "PresetNameList": "FactoryDefaults"
          }
        }
      }
    }
  }
}
> The raw event is: NOTIFY /Connection Manager HTTP/1.1
HOST: 192.168.1.41:3402
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 1925
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A1C401400_sub0000003024
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><SourceProtocolInfo></SourceProtocolInfo></e:property><e:property><SinkProtocolInfo>http-get:*:audio/mp3:*,x-file-cifs:*:audio/mp3:*,http-get:*:audio/mp4:*,x-file-cifs:*:audio/mp4:*,http-get:*:audio/mpeg:*,x-file-cifs:*:audio/mpeg:*,http-get:*:audio/mpegurl:*,x-file-cifs:*:audio/mpegurl:*,real.com-rhapsody-http-1-0:*:audio/mpegurl:*,file:*:audio/mpegurl:*,http-get:*:audio/mpeg3:*,x-file-cifs:*:audio/mpeg3:*,http-get:*:audio/wav:*,x-file-cifs:*:audio/wav:*,http-get:*:audio/wma:*,x-file-cifs:*:audio/wma:*,http-get:*:audio/x-ms-wma:*,x-file-cifs:*:audio/x-ms-wma:*,http-get:*:audio/aiff:*,x-file-cifs:*:audio/aiff:*,http-get:*:audio/flac:*,x-file-cifs:*:audio/flac:*,http-get:*:application/ogg:*,x-file-cifs:*:application/ogg:*,http-get:*:audio/audible:*,x-file-cifs:*:audio/audible:*,real.com-rhapsody-http-1-0:*:audio/x-ms-wma:*,real.com-rhapsody-direct:*:audio/mp3:*,sonos.com-mms:*:audio/x-ms-wma:*,sonos.com-http:*:audio/mpeg3:*,sonos.com-http:*:audio/mpeg:*,sonos.com-http:*:audio/wma:*,sonos.com-http:*:audio/mp4:*,sonos.com-http:*:audio/wav:*,sonos.com-http:*:audio/aiff:*,sonos.com-http:*:audio/flac:*,sonos.com-http:*:application/ogg:*,sonos.com-spotify:*:audio/x-spotify:*,sonos.com-rtrecent:*:audio/x-sonos-recent:*,real.com-rhapsody-http-1-0:*:audio/x-rhap-radio:*,real.com-rhapsody-direct:*:audio/x-rhap-radio:*,pandora.com-pndrradio:*:audio/x-pandora-radio:*,pandora.com-pndrradio-http:*:audio/mpeg3:*,sirius.com-sirradio:*:audio/x-sirius-radio:*,x-rincon:*:*:*,x-rincon-mp3radio:*:*:*,x-rincon-playlist:*:*:*,x-rincon-queue:*:*:*,x-rincon-stream:*:*:*,x-sonosapi-stream:*:*:*,x-sonosapi-radio:*:audio/x-sonosapi-radio:*,x-rincon-cpcontainer:*:*:*,last.fm-radio:*:audio/x-lastfm-radio:*,last.fm-radio-http:*:audio/mpeg3:*</SinkProtocolInfo></e:property><e:property><CurrentConnectionIDs></CurrentConnectionIDs></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      {
        
      },
      { "SinkProtocolInfo": "http-get:*:audio/mp3:*,x-file-cifs:*:audio/mp3:*,http-get:*:audio/mp4:*,x-file-cifs:*:audio/mp4:*,http-get:*:audio/mpeg:*,x-file-cifs:*:audio/mpeg:*,http-get:*:audio/mpegurl:*,x-file-cifs:*:audio/mpegurl:*,real.com-rhapsody-http-1-0:*:audio/mpegurl:*,file:*:audio/mpegurl:*,http-get:*:audio/mpeg3:*,x-file-cifs:*:audio/mpeg3:*,http-get:*:audio/wav:*,x-file-cifs:*:audio/wav:*,http-get:*:audio/wma:*,x-file-cifs:*:audio/wma:*,http-get:*:audio/x-ms-wma:*,x-file-cifs:*:audio/x-ms-wma:*,http-get:*:audio/aiff:*,x-file-cifs:*:audio/aiff:*,http-get:*:audio/flac:*,x-file-cifs:*:audio/flac:*,http-get:*:application/ogg:*,x-file-cifs:*:application/ogg:*,http-get:*:audio/audible:*,x-file-cifs:*:audio/audible:*,real.com-rhapsody-http-1-0:*:audio/x-ms-wma:*,real.com-rhapsody-direct:*:audio/mp3:*,sonos.com-mms:*:audio/x-ms-wma:*,sonos.com-http:*:audio/mpeg3:*,sonos.com-http:*:audio/mpeg:*,sonos.com-http:*:audio/wma:*,sonos.com-http:*:audio/mp4:*,sonos.com-http:*:audio/wav:*,sonos.com-http:*:audio/aiff:*,sonos.com-http:*:audio/flac:*,sonos.com-http:*:application/ogg:*,sonos.com-spotify:*:audio/x-spotify:*,sonos.com-rtrecent:*:audio/x-sonos-recent:*,real.com-rhapsody-http-1-0:*:audio/x-rhap-radio:*,real.com-rhapsody-direct:*:audio/x-rhap-radio:*,pandora.com-pndrradio:*:audio/x-pandora-radio:*,pandora.com-pndrradio-http:*:audio/mpeg3:*,sirius.com-sirradio:*:audio/x-sirius-radio:*,x-rincon:*:*:*,x-rincon-mp3radio:*:*:*,x-rincon-playlist:*:*:*,x-rincon-queue:*:*:*,x-rincon-stream:*:*:*,x-sonosapi-stream:*:*:*,x-sonosapi-radio:*:audio/x-sonosapi-radio:*,x-rincon-cpcontainer:*:*:*,last.fm-radio:*:audio/x-lastfm-radio:*,last.fm-radio-http:*:audio/mpeg3:*" },
      {
        
      }
    ]
  }
}
> Subscribing to events
> The raw event is: NOTIFY /Transport Event HTTP/1.1
HOST: 192.168.1.41:3402
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 2003
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5828A1C401400_sub0000003025
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><LastChange>&lt;Event xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/AVT/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot;&gt;&lt;InstanceID val=&quot;0&quot;&gt;&lt;TransportState val=&quot;STOPPED&quot;/&gt;&lt;CurrentPlayMode val=&quot;NORMAL&quot;/&gt;&lt;CurrentCrossfadeMode val=&quot;0&quot;/&gt;&lt;NumberOfTracks val=&quot;0&quot;/&gt;&lt;CurrentTrack val=&quot;0&quot;/&gt;&lt;CurrentSection val=&quot;0&quot;/&gt;&lt;CurrentTrackURI val=&quot;&quot;/&gt;&lt;CurrentTrackDuration val=&quot;0:00:00&quot;/&gt;&lt;CurrentTrackMetaData val=&quot;&quot;/&gt;&lt;r:NextTrackURI val=&quot;&quot;/&gt;&lt;r:NextTrackMetaData val=&quot;&quot;/&gt;&lt;r:EnqueuedTransportURI val=&quot;&quot;/&gt;&lt;r:EnqueuedTransportURIMetaData val=&quot;&quot;/&gt;&lt;PlaybackStorageMedium val=&quot;NONE&quot;/&gt;&lt;AVTransportURI val=&quot;&quot;/&gt;&lt;AVTransportURIMetaData val=&quot;&quot;/&gt;&lt;CurrentTransportActions val=&quot;Set, Play, Stop, Pause, Seek, Next, Previous&quot;/&gt;&lt;TransportStatus val=&quot;OK&quot;/&gt;&lt;r:SleepTimerGeneration val=&quot;0&quot;/&gt;&lt;r:AlarmRunning val=&quot;0&quot;/&gt;&lt;r:SnoozeRunning val=&quot;0&quot;/&gt;&lt;r:RestartPending val=&quot;0&quot;/&gt;&lt;TransportPlaySpeed val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;CurrentMediaDuration val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;RecordStorageMedium val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;PossiblePlaybackStorageMedia val=&quot;NONE, NETWORK&quot;/&gt;&lt;PossibleRecordStorageMedia val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;RecordMediumWriteStatus val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;CurrentRecordQualityMode val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;PossibleRecordQualityModes val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;NextAVTransportURI val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;NextAVTransportURIMetaData val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;/InstanceID&gt;&lt;/Event&gt;</LastChange></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": {
      "LastChange": {
        "Event": {
          "-xmlns": "urn:schemas-upnp-org:metadata-1-0/AVT/",
          "-xmlns:r": "urn:schemas-rinconnetworks-com:metadata-1-0/",
          "InstanceID": {
            "-val": "0",
            "TransportState": { "-val": "STOPPED" },
            "CurrentPlayMode": { "-val": "NORMAL" },
            "CurrentCrossfadeMode": { "-val": "0" },
            "NumberOfTracks": { "-val": "0" },
            "CurrentTrack": { "-val": "0" },
            "CurrentSection": { "-val": "0" },
            "CurrentTrackURI": {
              
            },
            "CurrentTrackDuration": { "-val": "0:00:00" },
            "CurrentTrackMetaData": {
              
            },
            "r:NextTrackURI": {
              
            },
            "r:NextTrackMetaData": {
              
            },
            "r:EnqueuedTransportURI": {
              
            },
            "r:EnqueuedTransportURIMetaData": {
              
            },
            "PlaybackStorageMedium": { "-val": "NONE" },
            "AVTransportURI": {
              
            },
            "AVTransportURIMetaData": {
              
            },
            "CurrentTransportActions": { "-val": "Set, Play, Stop, Pause, Seek, Next, Previous" },
            "TransportStatus": { "-val": "OK" },
            "r:SleepTimerGeneration": { "-val": "0" },
            "r:AlarmRunning": { "-val": "0" },
            "r:SnoozeRunning": { "-val": "0" },
            "r:RestartPending": { "-val": "0" },
            "TransportPlaySpeed": { "-val": "NOT_IMPLEMENTED" },
            "CurrentMediaDuration": { "-val": "NOT_IMPLEMENTED" },
            "RecordStorageMedium": { "-val": "NOT_IMPLEMENTED" },
            "PossiblePlaybackStorageMedia": { "-val": "NONE, NETWORK" },
            "PossibleRecordStorageMedia": { "-val": "NOT_IMPLEMENTED" },
            "RecordMediumWriteStatus": { "-val": "NOT_IMPLEMENTED" },
            "CurrentRecordQualityMode": { "-val": "NOT_IMPLEMENTED" },
            "PossibleRecordQualityModes": { "-val": "NOT_IMPLEMENTED" },
            "NextAVTransportURI": { "-val": "NOT_IMPLEMENTED" },
            "NextAVTransportURIMetaData": { "-val": "NOT_IMPLEMENTED" }
          }
        }
      }
    }
  }
}
> The raw event is: NOTIFY /Alarm Clock HTTP/1.1
HOST: 192.168.1.41:3400
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 629
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5855842601400_sub0000002752
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><TimeZone>00000a000502000003000501ffc4</TimeZone></e:property><e:property><TimeServer>0.sonostime.pool.ntp.org,1.sonostime.pool.ntp.org,2.sonostime.pool.ntp.org,3.sonostime.pool.ntp.org</TimeServer></e:property><e:property><TimeGeneration>4</TimeGeneration></e:property><e:property><AlarmListVersion>RINCON_000E5828228801400:22</AlarmListVersion></e:property><e:property><TimeFormat>INV</TimeFormat></e:property><e:property><DateFormat>INV</DateFormat></e:property><e:property><DailyIndexRefreshTime>02:00:00</DailyIndexRefreshTime></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "TimeZone": "00000a000502000003000501ffc4" },
      { "TimeServer": "0.sonostime.pool.ntp.org,1.sonostime.pool.ntp.org,2.sonostime.pool.ntp.org,3.sonostime.pool.ntp.org" },
      { "TimeGeneration": "4" },
      { "AlarmListVersion": "RINCON_000E5828228801400:22" },
      { "TimeFormat": "INV" },
      { "DateFormat": "INV" },
      { "DailyIndexRefreshTime": "02:00:00" }
    ]
  }
}
> The raw event is: NOTIFY /Music Services HTTP/1.1
HOST: 192.168.1.41:3400
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 166
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5855842601400_sub0000002753
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ServiceListVersion>RINCON_000E5828228801400:943</ServiceListVersion></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": { "ServiceListVersion": "RINCON_000E5828228801400:943" }
  }
}
> The raw event is: NOTIFY /Audio In HTTP/1.1
HOST: 192.168.1.41:3400
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 360
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5855842601400_sub0000002754
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><AudioInputName>Line-In</AudioInputName></e:property><e:property><Icon></Icon></e:property><e:property><LineInConnected>0</LineInConnected></e:property><e:property><LeftLineInLevel>1</LeftLineInLevel></e:property><e:property><RightLineInLevel>1</RightLineInLevel></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "AudioInputName": "Line-In" },
      {
        
      },
      { "LineInConnected": "0" },
      { "LeftLineInLevel": "1" },
      { "RightLineInLevel": "1" }
    ]
  }
}
> The raw event is: NOTIFY /Device Properties HTTP/1.1
HOST: 192.168.1.41:3400
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 764
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5855842601400_sub0000002755
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneName>Office</ZoneName></e:property><e:property><Icon>x-rincon-roomicon:office</Icon></e:property><e:property><Invisible>0</Invisible></e:property><e:property><IsZoneBridge>0</IsZoneBridge></e:property><e:property><SettingsReplicationState>RINCON_000E5828228801400,17,RINCON_FFFFFFFFFFFF99999,0,RINCON_000E58283BD401400,48,RINCON_000E5828228801400,216,RINCON_000E5828228801400,87,RINCON_000E5828A1C401400,58,RINCON_000E5828228801400,943,RINCON_000E5855842601400,76,RINCON_000E5828228801400,4,RINCON_000E5828A1C401400,27</SettingsReplicationState></e:property><e:property><ChannelMapSet>RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW</ChannelMapSet></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "ZoneName": "Office" },
      { "Icon": "x-rincon-roomicon:office" },
      { "Invisible": "0" },
      { "IsZoneBridge": "0" },
      { "SettingsReplicationState": "RINCON_000E5828228801400,17,RINCON_FFFFFFFFFFFF99999,0,RINCON_000E58283BD401400,48,RINCON_000E5828228801400,216,RINCON_000E5828228801400,87,RINCON_000E5828A1C401400,58,RINCON_000E5828228801400,943,RINCON_000E5855842601400,76,RINCON_000E5828228801400,4,RINCON_000E5828A1C401400,27" },
      { "ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW" }
    ]
  }
}
> The raw event is: NOTIFY /Zone Group HTTP/1.1
HOST: 192.168.1.41:3400
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 5808
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5855842601400_sub0000002756
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneGroupState>&lt;ZoneGroups&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58289F2E01400&quot; ID=&quot;RINCON_000E58289F2E01400:106&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58289F2E01400&quot; Location=&quot;http://192.168.1.39:1400/xml/device_description.xml&quot; ZoneName=&quot;Dining Room&quot; Icon=&quot;x-rincon-roomicon:dining&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;99&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E585445BA01400&quot; ID=&quot;RINCON_000E585445BA01400:6&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E585445BA01400&quot; Location=&quot;http://192.168.1.28:1400/xml/device_description.xml&quot; ZoneName=&quot;Lauren Room&quot; Icon=&quot;x-rincon-roomicon:living&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;15&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283BD401400&quot; ID=&quot;RINCON_000E58283BD401400:177&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283BD401400&quot; Location=&quot;http://192.168.1.38:1400/xml/device_description.xml&quot; ZoneName=&quot;Bathroom&quot; Icon=&quot;x-rincon-roomicon:bathroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;110&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A1C401400&quot; ID=&quot;RINCON_000E5828A1C401400:76&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A1C401400&quot; Location=&quot;http://192.168.1.34:1400/xml/device_description.xml&quot; ZoneName=&quot;Record Player&quot; Icon=&quot;x-rincon-roomicon:den&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;47&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283AC801400&quot; ID=&quot;RINCON_000E58283AC801400:103&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283AC801400&quot; Location=&quot;http://192.168.1.27:1400/xml/device_description.xml&quot; ZoneName=&quot;TV Room&quot; Icon=&quot;x-rincon-roomicon:tvroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;102&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828228801400&quot; ID=&quot;RINCON_000E58283BD401400:176&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828228801400&quot; Location=&quot;http://192.168.1.37:1400/xml/device_description.xml&quot; ZoneName=&quot;Kitchen&quot; Icon=&quot;x-rincon-roomicon:kitchen&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;95&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A20201400&quot; ID=&quot;RINCON_000E5828A20201400:185&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A20201400&quot; Location=&quot;http://192.168.1.36:1400/xml/device_description.xml&quot; ZoneName=&quot;Master Bed&quot; Icon=&quot;x-rincon-roomicon:masterbedroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;97&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5855842601400&quot; ID=&quot;RINCON_000E5855842601400:17&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58980FE001400&quot; Location=&quot;http://192.168.1.32:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; Invisible=&quot;1&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;14&quot;/&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5855842601400&quot; Location=&quot;http://192.168.1.26:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;9&quot;/&gt;&lt;/ZoneGroup&gt;&lt;/ZoneGroups&gt;</ZoneGroupState></e:property><e:property><ThirdPartyMediaServersX>2:wS3ux7WTttGhgg6XPtGTmB+w/8Dk/NaJmQSmlXC9HyWC9otuzFEO3a7PrX/pSo9Pv520HR9v1FsjVJaMFuHFtdhxml8A79seTON2yjczOjjWIZBEnhzwOzU0OaYjA70J+jT90GUFtA7ARjrOlX4DYFDEtUwiAG3mcw/Qerj4H10icoLESTQl+tCFq+thwGrViDxANx4OKWzd+EGL2XblyuQHTlgG7aUmt3neD5MrVaXqNXlxIghkkoV/A0O4yq4zCVzPiJVVF4d/Rrirvxm/4LPZGh7jrIQ+EdXjBkwxb1hRuQyWQskFayGmOUcl9bzTnr/0iFM5fXDqdE9EgfrBBcidCvR21tj/ykmx0dI+JzmDtcvCaRvsbnnLRlft6tNfns6XMeS98rJVeqgSxwfsqJRn6Ms6424GUtyawsu1qRfWDKrbHTwFmzjlA6mYZD4cmej612d0GCFYQ5WKXflcD6T9z4WyT9nc8It8ZLOB/VfYmirfS+85SgVOwX2/TwdCik2TkO6/Xyy+DdTb4VAATbLZTvOYGBRF2oChJF16+JM9waRrgBXDZ+i/ZBtFr9YG7l70Jm6GNI5PF0k7y52X5GHyjM2+w9nvs2DpCRQCUXZ/QmMLQi7a9Phs58ir93i0lydQ4N1Wu0lkRuwv5j1tU8g2KLqNakq2UKhNStYT6QX/wM3hjR6mwG7GHfhP3RifXsOFfhZDcVVYPD0PhYlCC/yOyvALkifNZ0DKGZxfigUR7U2KTMWKQ1JHrnoXQ/rOa42NS58UQzcV2d48lRKAZ8PMdnPPnY6FHjHZxs+sVxj1bjNioB8FlF1FqyGzugQr92upGGqM3u1ijVXkhLvBudvbF4TgAe2KY3QuDqSuqf0HWueZ2GfAMIw5WUDENPSwGqniq1xye6ahUWMqKPK11ldexifjz7vUIQJ0FULHYO8=</ThirdPartyMediaServersX></e:property><e:property><AvailableSoftwareUpdate>&lt;UpdateItem xmlns=&quot;urn:schemas-rinconnetworks-com:update-1-0&quot; Type=&quot;Software&quot; Version=&quot;19.3-53220&quot; UpdateURL=&quot;http://update.sonos.com/firmware/Gold/v3.8-Hammer-RC2/^19.3-53220&quot; DownloadSize=&quot;0&quot; ManifestURL=&quot;http://update.sonos.com/firmware/Gold/v3.8.2-Hammer-Patch-MDCR/update_1344386463.upm&quot;/&gt;</AvailableSoftwareUpdate></e:property><e:property><AlarmRunSequence>RINCON_000E5855842601400:9:0</AlarmRunSequence></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      {
        "ZoneGroupState": {
          "ZoneGroups": {
            "ZoneGroup": [
              {
                "-Coordinator": "RINCON_000E58289F2E01400",
                "-ID": "RINCON_000E58289F2E01400:106",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58289F2E01400",
                  "-Location": "http://192.168.1.39:1400/xml/device_description.xml",
                  "-ZoneName": "Dining Room",
                  "-Icon": "x-rincon-roomicon:dining",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "99"
                }
              },
              {
                "-Coordinator": "RINCON_000E585445BA01400",
                "-ID": "RINCON_000E585445BA01400:6",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E585445BA01400",
                  "-Location": "http://192.168.1.28:1400/xml/device_description.xml",
                  "-ZoneName": "Lauren Room",
                  "-Icon": "x-rincon-roomicon:living",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "15"
                }
              },
              {
                "-Coordinator": "RINCON_000E58283BD401400",
                "-ID": "RINCON_000E58283BD401400:177",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58283BD401400",
                  "-Location": "http://192.168.1.38:1400/xml/device_description.xml",
                  "-ZoneName": "Bathroom",
                  "-Icon": "x-rincon-roomicon:bathroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "110"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828A1C401400",
                "-ID": "RINCON_000E5828A1C401400:76",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828A1C401400",
                  "-Location": "http://192.168.1.34:1400/xml/device_description.xml",
                  "-ZoneName": "Record Player",
                  "-Icon": "x-rincon-roomicon:den",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "47"
                }
              },
              {
                "-Coordinator": "RINCON_000E58283AC801400",
                "-ID": "RINCON_000E58283AC801400:103",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58283AC801400",
                  "-Location": "http://192.168.1.27:1400/xml/device_description.xml",
                  "-ZoneName": "TV Room",
                  "-Icon": "x-rincon-roomicon:tvroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "102"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828228801400",
                "-ID": "RINCON_000E58283BD401400:176",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828228801400",
                  "-Location": "http://192.168.1.37:1400/xml/device_description.xml",
                  "-ZoneName": "Kitchen",
                  "-Icon": "x-rincon-roomicon:kitchen",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "95"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828A20201400",
                "-ID": "RINCON_000E5828A20201400:185",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828A20201400",
                  "-Location": "http://192.168.1.36:1400/xml/device_description.xml",
                  "-ZoneName": "Master Bed",
                  "-Icon": "x-rincon-roomicon:masterbedroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "97"
                }
              },
              {
                "-Coordinator": "RINCON_000E5855842601400",
                "-ID": "RINCON_000E5855842601400:17",
                "ZoneGroupMember": [
                  {
                    "-UUID": "RINCON_000E58980FE001400",
                    "-Location": "http://192.168.1.32:1400/xml/device_description.xml",
                    "-ZoneName": "Office",
                    "-Icon": "x-rincon-roomicon:office",
                    "-Invisible": "1",
                    "-SoftwareVersion": "19.3-53220b",
                    "-MinCompatibleVersion": "19.1-00000",
                    "-ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW",
                    "-BootSeq": "14"
                  },
                  {
                    "-UUID": "RINCON_000E5855842601400",
                    "-Location": "http://192.168.1.26:1400/xml/device_description.xml",
                    "-ZoneName": "Office",
                    "-Icon": "x-rincon-roomicon:office",
                    "-SoftwareVersion": "19.3-53220b",
                    "-MinCompatibleVersion": "19.1-00000",
                    "-ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW",
                    "-BootSeq": "9"
                  }
                ]
              }
            ]
          }
        }
      },
      { "ThirdPartyMediaServersX": "2:wS3ux7WTttGhgg6XPtGTmB+w/8Dk/NaJmQSmlXC9HyWC9otuzFEO3a7PrX/pSo9Pv520HR9v1FsjVJaMFuHFtdhxml8A79seTON2yjczOjjWIZBEnhzwOzU0OaYjA70J+jT90GUFtA7ARjrOlX4DYFDEtUwiAG3mcw/Qerj4H10icoLESTQl+tCFq+thwGrViDxANx4OKWzd+EGL2XblyuQHTlgG7aUmt3neD5MrVaXqNXlxIghkkoV/A0O4yq4zCVzPiJVVF4d/Rrirvxm/4LPZGh7jrIQ+EdXjBkwxb1hRuQyWQskFayGmOUcl9bzTnr/0iFM5fXDqdE9EgfrBBcidCvR21tj/ykmx0dI+JzmDtcvCaRvsbnnLRlft6tNfns6XMeS98rJVeqgSxwfsqJRn6Ms6424GUtyawsu1qRfWDKrbHTwFmzjlA6mYZD4cmej612d0GCFYQ5WKXflcD6T9z4WyT9nc8It8ZLOB/VfYmirfS+85SgVOwX2/TwdCik2TkO6/Xyy+DdTb4VAATbLZTvOYGBRF2oChJF16+JM9waRrgBXDZ+i/ZBtFr9YG7l70Jm6GNI5PF0k7y52X5GHyjM2+w9nvs2DpCRQCUXZ/QmMLQi7a9Phs58ir93i0lydQ4N1Wu0lkRuwv5j1tU8g2KLqNakq2UKhNStYT6QX/wM3hjR6mwG7GHfhP3RifXsOFfhZDcVVYPD0PhYlCC/yOyvALkifNZ0DKGZxfigUR7U2KTMWKQ1JHrnoXQ/rOa42NS58UQzcV2d48lRKAZ8PMdnPPnY6FHjHZxs+sVxj1bjNioB8FlF1FqyGzugQr92upGGqM3u1ijVXkhLvBudvbF4TgAe2KY3QuDqSuqf0HWueZ2GfAMIw5WUDENPSwGqniq1xye6ahUWMqKPK11ldexifjz7vUIQJ0FULHYO8=" },
      {
        "AvailableSoftwareUpdate": {
          "UpdateItem": {
            "-xmlns": "urn:schemas-rinconnetworks-com:update-1-0",
            "-Type": "Software",
            "-Version": "19.3-53220",
            "-UpdateURL": "http://update.sonos.com/firmware/Gold/v3.8-Hammer-RC2/^19.3-53220",
            "-DownloadSize": "0",
            "-ManifestURL": "http://update.sonos.com/firmware/Gold/v3.8.2-Hammer-Patch-MDCR/update_1344386463.upm"
          }
        }
      },
      { "AlarmRunSequence": "RINCON_000E5855842601400:9:0" }
    ]
  }
}
> The raw event is: NOTIFY /Group Management HTTP/1.1
HOST: 192.168.1.41:3400
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 234
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5855842601400_sub0000002757
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><GroupCoordinatorIsLocal>1</GroupCoordinatorIsLocal></e:property><e:property><LocalGroupUUID>RINCON_000E5855842601400:17</LocalGroupUUID></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "GroupCoordinatorIsLocal": "1" },
      { "LocalGroupUUID": "RINCON_000E5855842601400:17" }
    ]
  }
}
> The raw event is: NOTIFY /Content Directory HTTP/1.1
HOST: 192.168.1.41:3400
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 906
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5855842601400_sub0000002758
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><SystemUpdateID>4</SystemUpdateID></e:property><e:property><ContainerUpdateIDs>S:,2</ContainerUpdateIDs></e:property><e:property><ShareListRefreshState>NOTRUN</ShareListRefreshState></e:property><e:property><ShareIndexInProgress>0</ShareIndexInProgress></e:property><e:property><ShareIndexLastError></ShareIndexLastError></e:property><e:property><RadioFavoritesUpdateID>RINCON_000E5828228801400,17</RadioFavoritesUpdateID></e:property><e:property><RadioLocationUpdateID>RINCON_000E5828228801400,87</RadioLocationUpdateID></e:property><e:property><SavedQueuesUpdateID>RINCON_000E58283BD401400,48</SavedQueuesUpdateID></e:property><e:property><ShareListUpdateID>RINCON_000E5828228801400,216</ShareListUpdateID></e:property><e:property><RecentlyPlayedUpdateID>RINCON_000E5855842601400,76</RecentlyPlayedUpdateID></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "SystemUpdateID": "4" },
      { "ContainerUpdateIDs": "S:,2" },
      { "ShareListRefreshState": "NOTRUN" },
      { "ShareIndexInProgress": "0" },
      {
        
      },
      { "RadioFavoritesUpdateID": "RINCON_000E5828228801400,17" },
      { "RadioLocationUpdateID": "RINCON_000E5828228801400,87" },
      { "SavedQueuesUpdateID": "RINCON_000E58283BD401400,48" },
      { "ShareListUpdateID": "RINCON_000E5828228801400,216" },
      { "RecentlyPlayedUpdateID": "RINCON_000E5855842601400,76" }
    ]
  }
}
> The raw event is: NOTIFY /Render Control HTTP/1.1
HOST: 192.168.1.41:3400
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 1058
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5855842601400_sub0000002759
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><LastChange>&lt;Event xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/RCS/&quot;&gt;&lt;InstanceID val=&quot;0&quot;&gt;&lt;Volume channel=&quot;Master&quot; val=&quot;0&quot;/&gt;&lt;Volume channel=&quot;LF&quot; val=&quot;100&quot;/&gt;&lt;Volume channel=&quot;RF&quot; val=&quot;100&quot;/&gt;&lt;Mute channel=&quot;Master&quot; val=&quot;0&quot;/&gt;&lt;Mute channel=&quot;LF&quot; val=&quot;0&quot;/&gt;&lt;Mute channel=&quot;RF&quot; val=&quot;0&quot;/&gt;&lt;Bass val=&quot;0&quot;/&gt;&lt;Treble val=&quot;0&quot;/&gt;&lt;Loudness channel=&quot;Master&quot; val=&quot;1&quot;/&gt;&lt;OutputFixed val=&quot;0&quot;/&gt;&lt;HeadphoneConnected val=&quot;0&quot;/&gt;&lt;SpeakerSize val=&quot;3&quot;/&gt;&lt;SubGain val=&quot;0&quot;/&gt;&lt;SubCrossover val=&quot;0&quot;/&gt;&lt;SubPolarity val=&quot;0&quot;/&gt;&lt;SubEnabled val=&quot;1&quot;/&gt;&lt;PresetNameList&gt;FactoryDefaults&lt;/PresetNameList&gt;&lt;/InstanceID&gt;&lt;/Event&gt;</LastChange></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": {
      "LastChange": {
        "Event": {
          "-xmlns": "urn:schemas-upnp-org:metadata-1-0/RCS/",
          "InstanceID": {
            "-val": "0",
            "Volume": [
              {
                "-channel": "Master",
                "-val": "0"
              },
              {
                "-channel": "LF",
                "-val": "100"
              },
              {
                "-channel": "RF",
                "-val": "100"
              }
            ],
            "Mute": [
              {
                "-channel": "Master",
                "-val": "0"
              },
              {
                "-channel": "LF",
                "-val": "0"
              },
              {
                "-channel": "RF",
                "-val": "0"
              }
            ],
            "Bass": { "-val": "0" },
            "Treble": { "-val": "0" },
            "Loudness": {
              "-channel": "Master",
              "-val": "1"
            },
            "OutputFixed": { "-val": "0" },
            "HeadphoneConnected": { "-val": "0" },
            "SpeakerSize": { "-val": "3" },
            "SubGain": { "-val": "0" },
            "SubCrossover": { "-val": "0" },
            "SubPolarity": { "-val": "0" },
            "SubEnabled": { "-val": "1" },
            "PresetNameList": "FactoryDefaults"
          }
        }
      }
    }
  }
}
> The raw event is: NOTIFY /Connection Manager HTTP/1.1
HOST: 192.168.1.41:3400
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 1925
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5855842601400_sub0000002760
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><SourceProtocolInfo></SourceProtocolInfo></e:property><e:property><SinkProtocolInfo>http-get:*:audio/mp3:*,x-file-cifs:*:audio/mp3:*,http-get:*:audio/mp4:*,x-file-cifs:*:audio/mp4:*,http-get:*:audio/mpeg:*,x-file-cifs:*:audio/mpeg:*,http-get:*:audio/mpegurl:*,x-file-cifs:*:audio/mpegurl:*,real.com-rhapsody-http-1-0:*:audio/mpegurl:*,file:*:audio/mpegurl:*,http-get:*:audio/mpeg3:*,x-file-cifs:*:audio/mpeg3:*,http-get:*:audio/wav:*,x-file-cifs:*:audio/wav:*,http-get:*:audio/wma:*,x-file-cifs:*:audio/wma:*,http-get:*:audio/x-ms-wma:*,x-file-cifs:*:audio/x-ms-wma:*,http-get:*:audio/aiff:*,x-file-cifs:*:audio/aiff:*,http-get:*:audio/flac:*,x-file-cifs:*:audio/flac:*,http-get:*:application/ogg:*,x-file-cifs:*:application/ogg:*,http-get:*:audio/audible:*,x-file-cifs:*:audio/audible:*,real.com-rhapsody-http-1-0:*:audio/x-ms-wma:*,real.com-rhapsody-direct:*:audio/mp3:*,sonos.com-mms:*:audio/x-ms-wma:*,sonos.com-http:*:audio/mpeg3:*,sonos.com-http:*:audio/mpeg:*,sonos.com-http:*:audio/wma:*,sonos.com-http:*:audio/mp4:*,sonos.com-http:*:audio/wav:*,sonos.com-http:*:audio/aiff:*,sonos.com-http:*:audio/flac:*,sonos.com-http:*:application/ogg:*,sonos.com-spotify:*:audio/x-spotify:*,sonos.com-rtrecent:*:audio/x-sonos-recent:*,real.com-rhapsody-http-1-0:*:audio/x-rhap-radio:*,real.com-rhapsody-direct:*:audio/x-rhap-radio:*,pandora.com-pndrradio:*:audio/x-pandora-radio:*,pandora.com-pndrradio-http:*:audio/mpeg3:*,sirius.com-sirradio:*:audio/x-sirius-radio:*,x-rincon:*:*:*,x-rincon-mp3radio:*:*:*,x-rincon-playlist:*:*:*,x-rincon-queue:*:*:*,x-rincon-stream:*:*:*,x-sonosapi-stream:*:*:*,x-sonosapi-radio:*:audio/x-sonosapi-radio:*,x-rincon-cpcontainer:*:*:*,last.fm-radio:*:audio/x-lastfm-radio:*,last.fm-radio-http:*:audio/mpeg3:*</SinkProtocolInfo></e:property><e:property><CurrentConnectionIDs></CurrentConnectionIDs></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      {
        
      },
      { "SinkProtocolInfo": "http-get:*:audio/mp3:*,x-file-cifs:*:audio/mp3:*,http-get:*:audio/mp4:*,x-file-cifs:*:audio/mp4:*,http-get:*:audio/mpeg:*,x-file-cifs:*:audio/mpeg:*,http-get:*:audio/mpegurl:*,x-file-cifs:*:audio/mpegurl:*,real.com-rhapsody-http-1-0:*:audio/mpegurl:*,file:*:audio/mpegurl:*,http-get:*:audio/mpeg3:*,x-file-cifs:*:audio/mpeg3:*,http-get:*:audio/wav:*,x-file-cifs:*:audio/wav:*,http-get:*:audio/wma:*,x-file-cifs:*:audio/wma:*,http-get:*:audio/x-ms-wma:*,x-file-cifs:*:audio/x-ms-wma:*,http-get:*:audio/aiff:*,x-file-cifs:*:audio/aiff:*,http-get:*:audio/flac:*,x-file-cifs:*:audio/flac:*,http-get:*:application/ogg:*,x-file-cifs:*:application/ogg:*,http-get:*:audio/audible:*,x-file-cifs:*:audio/audible:*,real.com-rhapsody-http-1-0:*:audio/x-ms-wma:*,real.com-rhapsody-direct:*:audio/mp3:*,sonos.com-mms:*:audio/x-ms-wma:*,sonos.com-http:*:audio/mpeg3:*,sonos.com-http:*:audio/mpeg:*,sonos.com-http:*:audio/wma:*,sonos.com-http:*:audio/mp4:*,sonos.com-http:*:audio/wav:*,sonos.com-http:*:audio/aiff:*,sonos.com-http:*:audio/flac:*,sonos.com-http:*:application/ogg:*,sonos.com-spotify:*:audio/x-spotify:*,sonos.com-rtrecent:*:audio/x-sonos-recent:*,real.com-rhapsody-http-1-0:*:audio/x-rhap-radio:*,real.com-rhapsody-direct:*:audio/x-rhap-radio:*,pandora.com-pndrradio:*:audio/x-pandora-radio:*,pandora.com-pndrradio-http:*:audio/mpeg3:*,sirius.com-sirradio:*:audio/x-sirius-radio:*,x-rincon:*:*:*,x-rincon-mp3radio:*:*:*,x-rincon-playlist:*:*:*,x-rincon-queue:*:*:*,x-rincon-stream:*:*:*,x-sonosapi-stream:*:*:*,x-sonosapi-radio:*:audio/x-sonosapi-radio:*,x-rincon-cpcontainer:*:*:*,last.fm-radio:*:audio/x-lastfm-radio:*,last.fm-radio-http:*:audio/mpeg3:*" },
      {
        
      }
    ]
  }
}
> Subscribing to events
> The raw event is: NOTIFY /Transport Event HTTP/1.1
HOST: 192.168.1.41:3400
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 4699
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E5855842601400_sub0000002761
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><LastChange>&lt;Event xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/AVT/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot;&gt;&lt;InstanceID val=&quot;0&quot;&gt;&lt;TransportState val=&quot;PAUSED_PLAYBACK&quot;/&gt;&lt;CurrentPlayMode val=&quot;NORMAL&quot;/&gt;&lt;CurrentCrossfadeMode val=&quot;0&quot;/&gt;&lt;NumberOfTracks val=&quot;88&quot;/&gt;&lt;CurrentTrack val=&quot;1&quot;/&gt;&lt;CurrentSection val=&quot;0&quot;/&gt;&lt;CurrentTrackURI val=&quot;x-sonos-spotify:spotify%3atrack%3a4OXzeSAf0HMA2eWZkm5lIu?sid=9&amp;amp;flags=0&quot;/&gt;&lt;CurrentTrackDuration val=&quot;0:03:07&quot;/&gt;&lt;CurrentTrackMetaData val=&quot;&amp;lt;DIDL-Lite xmlns:dc=&amp;quot;http://purl.org/dc/elements/1.1/&amp;quot; xmlns:upnp=&amp;quot;urn:schemas-upnp-org:metadata-1-0/upnp/&amp;quot; xmlns:r=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot; xmlns=&amp;quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&amp;quot;&amp;gt;&amp;lt;item id=&amp;quot;-1&amp;quot; parentID=&amp;quot;-1&amp;quot; restricted=&amp;quot;true&amp;quot;&amp;gt;&amp;lt;res protocolInfo=&amp;quot;sonos.com-spotify:*:audio/x-spotify:*&amp;quot; duration=&amp;quot;0:03:07&amp;quot;&amp;gt;x-sonos-spotify:spotify%3atrack%3a4OXzeSAf0HMA2eWZkm5lIu?sid=9&amp;amp;amp;flags=0&amp;lt;/res&amp;gt;&amp;lt;r:streamContent&amp;gt;&amp;lt;/r:streamContent&amp;gt;&amp;lt;r:radioShowMd&amp;gt;&amp;lt;/r:radioShowMd&amp;gt;&amp;lt;upnp:albumArtURI&amp;gt;/getaa?s=1&amp;amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a4OXzeSAf0HMA2eWZkm5lIu%3fsid%3d9%26flags%3d0&amp;lt;/upnp:albumArtURI&amp;gt;&amp;lt;dc:title&amp;gt;Who Needs Love (Like That)&amp;lt;/dc:title&amp;gt;&amp;lt;upnp:class&amp;gt;object.item.audioItem.musicTrack&amp;lt;/upnp:class&amp;gt;&amp;lt;dc:creator&amp;gt;Erasure&amp;lt;/dc:creator&amp;gt;&amp;lt;upnp:album&amp;gt;Total Pop! - The First 40 Hits&amp;lt;/upnp:album&amp;gt;&amp;lt;/item&amp;gt;&amp;lt;/DIDL-Lite&amp;gt;&quot;/&gt;&lt;r:NextTrackURI val=&quot;x-sonos-spotify:spotify%3atrack%3a1L5e14EUQwWLJxpvCq2qiP?sid=9&amp;amp;flags=0&quot;/&gt;&lt;r:NextTrackMetaData val=&quot;&amp;lt;DIDL-Lite xmlns:dc=&amp;quot;http://purl.org/dc/elements/1.1/&amp;quot; xmlns:upnp=&amp;quot;urn:schemas-upnp-org:metadata-1-0/upnp/&amp;quot; xmlns:r=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot; xmlns=&amp;quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&amp;quot;&amp;gt;&amp;lt;item id=&amp;quot;-1&amp;quot; parentID=&amp;quot;-1&amp;quot; restricted=&amp;quot;true&amp;quot;&amp;gt;&amp;lt;res protocolInfo=&amp;quot;sonos.com-spotify:*:audio/x-spotify:*&amp;quot; duration=&amp;quot;0:03:21&amp;quot;&amp;gt;x-sonos-spotify:spotify%3atrack%3a1L5e14EUQwWLJxpvCq2qiP?sid=9&amp;amp;amp;flags=0&amp;lt;/res&amp;gt;&amp;lt;upnp:albumArtURI&amp;gt;/getaa?s=1&amp;amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a1L5e14EUQwWLJxpvCq2qiP%3fsid%3d9%26flags%3d0&amp;lt;/upnp:albumArtURI&amp;gt;&amp;lt;dc:title&amp;gt;Heavenly Action&amp;lt;/dc:title&amp;gt;&amp;lt;upnp:class&amp;gt;object.item.audioItem.musicTrack&amp;lt;/upnp:class&amp;gt;&amp;lt;dc:creator&amp;gt;Erasure&amp;lt;/dc:creator&amp;gt;&amp;lt;upnp:album&amp;gt;Total Pop! - The First 40 Hits&amp;lt;/upnp:album&amp;gt;&amp;lt;/item&amp;gt;&amp;lt;/DIDL-Lite&amp;gt;&quot;/&gt;&lt;r:EnqueuedTransportURI val=&quot;file:///jffs/settings/trackqueue.rsq#0&quot;/&gt;&lt;r:EnqueuedTransportURIMetaData val=&quot;&quot;/&gt;&lt;PlaybackStorageMedium val=&quot;NETWORK&quot;/&gt;&lt;AVTransportURI val=&quot;x-rincon-queue:RINCON_000E5855842601400#0&quot;/&gt;&lt;AVTransportURIMetaData val=&quot;&quot;/&gt;&lt;CurrentTransportActions val=&quot;Set, Play, Stop, Pause, Seek, Next, Previous&quot;/&gt;&lt;TransportStatus val=&quot;OK&quot;/&gt;&lt;r:SleepTimerGeneration val=&quot;0&quot;/&gt;&lt;r:AlarmRunning val=&quot;0&quot;/&gt;&lt;r:SnoozeRunning val=&quot;0&quot;/&gt;&lt;r:RestartPending val=&quot;0&quot;/&gt;&lt;TransportPlaySpeed val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;CurrentMediaDuration val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;RecordStorageMedium val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;PossiblePlaybackStorageMedia val=&quot;NONE, NETWORK&quot;/&gt;&lt;PossibleRecordStorageMedia val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;RecordMediumWriteStatus val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;CurrentRecordQualityMode val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;PossibleRecordQualityModes val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;NextAVTransportURI val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;NextAVTransportURIMetaData val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;/InstanceID&gt;&lt;/Event&gt;</LastChange></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": {
      "LastChange": {
        "Event": {
          "-xmlns": "urn:schemas-upnp-org:metadata-1-0/AVT/",
          "-xmlns:r": "urn:schemas-rinconnetworks-com:metadata-1-0/",
          "InstanceID": {
            "-val": "0",
            "TransportState": { "-val": "PAUSED_PLAYBACK" },
            "CurrentPlayMode": { "-val": "NORMAL" },
            "CurrentCrossfadeMode": { "-val": "0" },
            "NumberOfTracks": { "-val": "88" },
            "CurrentTrack": { "-val": "1" },
            "CurrentSection": { "-val": "0" },
            "CurrentTrackURI": { "-val": "x-sonos-spotify:spotify%3atrack%3a4OXzeSAf0HMA2eWZkm5lIu?sid=9&amp;flags=0" },
            "CurrentTrackDuration": { "-val": "0:03:07" },
            "CurrentTrackMetaData": { "-val": "&lt;DIDL-Lite xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot; xmlns:upnp=&quot;urn:schemas-upnp-org:metadata-1-0/upnp/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot; xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&quot;&gt;&lt;item id=&quot;-1&quot; parentID=&quot;-1&quot; restricted=&quot;true&quot;&gt;&lt;res protocolInfo=&quot;sonos.com-spotify:*:audio/x-spotify:*&quot; duration=&quot;0:03:07&quot;&gt;x-sonos-spotify:spotify%3atrack%3a4OXzeSAf0HMA2eWZkm5lIu?sid=9&amp;amp;flags=0&lt;/res&gt;&lt;r:streamContent&gt;&lt;/r:streamContent&gt;&lt;r:radioShowMd&gt;&lt;/r:radioShowMd&gt;&lt;upnp:albumArtURI&gt;/getaa?s=1&amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a4OXzeSAf0HMA2eWZkm5lIu%3fsid%3d9%26flags%3d0&lt;/upnp:albumArtURI&gt;&lt;dc:title&gt;Who Needs Love (Like That)&lt;/dc:title&gt;&lt;upnp:class&gt;object.item.audioItem.musicTrack&lt;/upnp:class&gt;&lt;dc:creator&gt;Erasure&lt;/dc:creator&gt;&lt;upnp:album&gt;Total Pop! - The First 40 Hits&lt;/upnp:album&gt;&lt;/item&gt;&lt;/DIDL-Lite&gt;" },
            "r:NextTrackURI": { "-val": "x-sonos-spotify:spotify%3atrack%3a1L5e14EUQwWLJxpvCq2qiP?sid=9&amp;flags=0" },
            "r:NextTrackMetaData": { "-val": "&lt;DIDL-Lite xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot; xmlns:upnp=&quot;urn:schemas-upnp-org:metadata-1-0/upnp/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot; xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&quot;&gt;&lt;item id=&quot;-1&quot; parentID=&quot;-1&quot; restricted=&quot;true&quot;&gt;&lt;res protocolInfo=&quot;sonos.com-spotify:*:audio/x-spotify:*&quot; duration=&quot;0:03:21&quot;&gt;x-sonos-spotify:spotify%3atrack%3a1L5e14EUQwWLJxpvCq2qiP?sid=9&amp;amp;flags=0&lt;/res&gt;&lt;upnp:albumArtURI&gt;/getaa?s=1&amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a1L5e14EUQwWLJxpvCq2qiP%3fsid%3d9%26flags%3d0&lt;/upnp:albumArtURI&gt;&lt;dc:title&gt;Heavenly Action&lt;/dc:title&gt;&lt;upnp:class&gt;object.item.audioItem.musicTrack&lt;/upnp:class&gt;&lt;dc:creator&gt;Erasure&lt;/dc:creator&gt;&lt;upnp:album&gt;Total Pop! - The First 40 Hits&lt;/upnp:album&gt;&lt;/item&gt;&lt;/DIDL-Lite&gt;" },
            "r:EnqueuedTransportURI": { "-val": "file:///jffs/settings/trackqueue.rsq#0" },
            "r:EnqueuedTransportURIMetaData": {
              
            },
            "PlaybackStorageMedium": { "-val": "NETWORK" },
            "AVTransportURI": { "-val": "x-rincon-queue:RINCON_000E5855842601400#0" },
            "AVTransportURIMetaData": {
              
            },
            "CurrentTransportActions": { "-val": "Set, Play, Stop, Pause, Seek, Next, Previous" },
            "TransportStatus": { "-val": "OK" },
            "r:SleepTimerGeneration": { "-val": "0" },
            "r:AlarmRunning": { "-val": "0" },
            "r:SnoozeRunning": { "-val": "0" },
            "r:RestartPending": { "-val": "0" },
            "TransportPlaySpeed": { "-val": "NOT_IMPLEMENTED" },
            "CurrentMediaDuration": { "-val": "NOT_IMPLEMENTED" },
            "RecordStorageMedium": { "-val": "NOT_IMPLEMENTED" },
            "PossiblePlaybackStorageMedia": { "-val": "NONE, NETWORK" },
            "PossibleRecordStorageMedia": { "-val": "NOT_IMPLEMENTED" },
            "RecordMediumWriteStatus": { "-val": "NOT_IMPLEMENTED" },
            "CurrentRecordQualityMode": { "-val": "NOT_IMPLEMENTED" },
            "PossibleRecordQualityModes": { "-val": "NOT_IMPLEMENTED" },
            "NextAVTransportURI": { "-val": "NOT_IMPLEMENTED" },
            "NextAVTransportURIMetaData": { "-val": "NOT_IMPLEMENTED" }
          }
        }
      }
    }
  }
}
> The raw event is: NOTIFY /Alarm Clock HTTP/1.1
HOST: 192.168.1.41:3403
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 629
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283AC801400_sub0000003080
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><TimeZone>00000a000502000003000501ffc4</TimeZone></e:property><e:property><TimeServer>0.sonostime.pool.ntp.org,1.sonostime.pool.ntp.org,2.sonostime.pool.ntp.org,3.sonostime.pool.ntp.org</TimeServer></e:property><e:property><TimeGeneration>4</TimeGeneration></e:property><e:property><AlarmListVersion>RINCON_000E5828228801400:22</AlarmListVersion></e:property><e:property><TimeFormat>INV</TimeFormat></e:property><e:property><DateFormat>INV</DateFormat></e:property><e:property><DailyIndexRefreshTime>02:00:00</DailyIndexRefreshTime></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "TimeZone": "00000a000502000003000501ffc4" },
      { "TimeServer": "0.sonostime.pool.ntp.org,1.sonostime.pool.ntp.org,2.sonostime.pool.ntp.org,3.sonostime.pool.ntp.org" },
      { "TimeGeneration": "4" },
      { "AlarmListVersion": "RINCON_000E5828228801400:22" },
      { "TimeFormat": "INV" },
      { "DateFormat": "INV" },
      { "DailyIndexRefreshTime": "02:00:00" }
    ]
  }
}
> The raw event is: NOTIFY /Music Services HTTP/1.1
HOST: 192.168.1.41:3403
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 166
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283AC801400_sub0000003081
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ServiceListVersion>RINCON_000E5828228801400:943</ServiceListVersion></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": { "ServiceListVersion": "RINCON_000E5828228801400:943" }
  }
}
> The raw event is: NOTIFY /Audio In HTTP/1.1
HOST: 192.168.1.41:3403
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 360
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283AC801400_sub0000003082
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><AudioInputName>Line-In</AudioInputName></e:property><e:property><Icon></Icon></e:property><e:property><LineInConnected>0</LineInConnected></e:property><e:property><LeftLineInLevel>1</LeftLineInLevel></e:property><e:property><RightLineInLevel>1</RightLineInLevel></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "AudioInputName": "Line-In" },
      {
        
      },
      { "LineInConnected": "0" },
      { "LeftLineInLevel": "1" },
      { "RightLineInLevel": "1" }
    ]
  }
}
> The raw event is: NOTIFY /Device Properties HTTP/1.1
HOST: 192.168.1.41:3403
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 704
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283AC801400_sub0000003083
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneName>TV Room</ZoneName></e:property><e:property><Icon>x-rincon-roomicon:tvroom</Icon></e:property><e:property><Invisible>0</Invisible></e:property><e:property><IsZoneBridge>0</IsZoneBridge></e:property><e:property><SettingsReplicationState>RINCON_000E5828228801400,17,RINCON_FFFFFFFFFFFF99999,0,RINCON_000E58283BD401400,48,RINCON_000E5828228801400,216,RINCON_000E5828228801400,87,RINCON_000E5828A1C401400,58,RINCON_000E5828228801400,943,RINCON_000E5855842601400,76,RINCON_000E5828228801400,4,RINCON_000E5828A1C401400,27</SettingsReplicationState></e:property><e:property><ChannelMapSet></ChannelMapSet></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "ZoneName": "TV Room" },
      { "Icon": "x-rincon-roomicon:tvroom" },
      { "Invisible": "0" },
      { "IsZoneBridge": "0" },
      { "SettingsReplicationState": "RINCON_000E5828228801400,17,RINCON_FFFFFFFFFFFF99999,0,RINCON_000E58283BD401400,48,RINCON_000E5828228801400,216,RINCON_000E5828228801400,87,RINCON_000E5828A1C401400,58,RINCON_000E5828228801400,943,RINCON_000E5855842601400,76,RINCON_000E5828228801400,4,RINCON_000E5828A1C401400,27" },
      {
        
      }
    ]
  }
}
> The raw event is: NOTIFY /Zone Group HTTP/1.1
HOST: 192.168.1.41:3403
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 5810
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283AC801400_sub0000003084
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneGroupState>&lt;ZoneGroups&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58289F2E01400&quot; ID=&quot;RINCON_000E58289F2E01400:106&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58289F2E01400&quot; Location=&quot;http://192.168.1.39:1400/xml/device_description.xml&quot; ZoneName=&quot;Dining Room&quot; Icon=&quot;x-rincon-roomicon:dining&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;99&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E585445BA01400&quot; ID=&quot;RINCON_000E585445BA01400:6&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E585445BA01400&quot; Location=&quot;http://192.168.1.28:1400/xml/device_description.xml&quot; ZoneName=&quot;Lauren Room&quot; Icon=&quot;x-rincon-roomicon:living&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;15&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5855842601400&quot; ID=&quot;RINCON_000E5855842601400:17&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58980FE001400&quot; Location=&quot;http://192.168.1.32:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; Invisible=&quot;1&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;14&quot;/&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5855842601400&quot; Location=&quot;http://192.168.1.26:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;9&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283BD401400&quot; ID=&quot;RINCON_000E58283BD401400:177&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283BD401400&quot; Location=&quot;http://192.168.1.38:1400/xml/device_description.xml&quot; ZoneName=&quot;Bathroom&quot; Icon=&quot;x-rincon-roomicon:bathroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;110&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A20201400&quot; ID=&quot;RINCON_000E5828A20201400:185&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A20201400&quot; Location=&quot;http://192.168.1.36:1400/xml/device_description.xml&quot; ZoneName=&quot;Master Bed&quot; Icon=&quot;x-rincon-roomicon:masterbedroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;97&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A1C401400&quot; ID=&quot;RINCON_000E5828A1C401400:76&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A1C401400&quot; Location=&quot;http://192.168.1.34:1400/xml/device_description.xml&quot; ZoneName=&quot;Record Player&quot; Icon=&quot;x-rincon-roomicon:den&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;47&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828228801400&quot; ID=&quot;RINCON_000E58283BD401400:176&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828228801400&quot; Location=&quot;http://192.168.1.37:1400/xml/device_description.xml&quot; ZoneName=&quot;Kitchen&quot; Icon=&quot;x-rincon-roomicon:kitchen&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;95&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283AC801400&quot; ID=&quot;RINCON_000E58283AC801400:103&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283AC801400&quot; Location=&quot;http://192.168.1.27:1400/xml/device_description.xml&quot; ZoneName=&quot;TV Room&quot; Icon=&quot;x-rincon-roomicon:tvroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;102&quot;/&gt;&lt;/ZoneGroup&gt;&lt;/ZoneGroups&gt;</ZoneGroupState></e:property><e:property><ThirdPartyMediaServersX>2:FKGsVbZEmQ8ayVr3/S/gb73j7mpZkCJSxSiMfjU7LwKshXz6L23K2xMcJRl/emmcsSgPdPqQdVsw+8e3YWIGyO+HjS6vh+lI9RjtspDmEzdh6grUT8nkJqIybrfDg0yuD1sKruhoXbbenJURLpJwURM0VqqLE7PjLg1rK+mh1KqlXe8p4mlH700QAtA2tpFoqQP+QUuKOkg6PjLXhttmrQ1sb1uo8wqFqiCO/yRmrB5CD7hoR9nqNSGgbl7qPhuKYGichHZdRs3TYfzRvrckxZ/jbrJ02H6N/nBrV3MbLYxPeY1qQWmgbtZaxJbNP9aSfHtbM+1U7e2srgBw584EE3a9hcziqnKGFne49O4ZP1Fsd5Y2PBBdNn8p234HPXu87ohtAYnjji971xu1nTExbIkXyswLv0SLftlYm46+wXmvF3Rz8DPkY2J2Ue1pOn8c2O3ARl8f6MwVzcTI4lpboNjT+MDywuhpon1b5tLx/+F6oyBXTSupK9cd22MgyRtnzyk/JgH+Bvb8S3NqQ+JcRKihSLmicbfyfvZl07Gts6xh0sw8wsfwlmVKSbvDHp0/yWHRBjaLj1iFJ3xBU5vsUx25CLWGimD1W8iW7vBmnEr4hlW9i9nkKLpcicP6RnR7BRXUImS6BRNlIw+c0Mv2MzM88X8I1Z/V4VKGP99wtUXFjVPmF5DD8+vLjhjT9gMlU24LAJz96L0bAmivMKSxcovID+ouBvZeZBvIFTX/hYUpyFcDAXalSAPkQF0t0KBGL8+uLwxIRYzNp0JZ/eTkFRZntFpRHFM+Qvw3pcqE4jTvyPv+TDnny0/omaBc9BZUu3BDVnKWQusFfe9nttXUtf3y6Omp8RA5U0kYntXkkB80QKATNsAvrrajnWXIX7JxjNb7kwJEnSjcyZsWJAXE/lsfbJ2k6AD0Rf/HqTF2QDQ=</ThirdPartyMediaServersX></e:property><e:property><AvailableSoftwareUpdate>&lt;UpdateItem xmlns=&quot;urn:schemas-rinconnetworks-com:update-1-0&quot; Type=&quot;Software&quot; Version=&quot;19.3-53220&quot; UpdateURL=&quot;http://update.sonos.com/firmware/Gold/v3.8-Hammer-RC2/^19.3-53220&quot; DownloadSize=&quot;0&quot; ManifestURL=&quot;http://update.sonos.com/firmware/Gold/v3.8.2-Hammer-Patch-MDCR/update_1344386463.upm&quot;/&gt;</AvailableSoftwareUpdate></e:property><e:property><AlarmRunSequence>RINCON_000E58283AC801400:102:0</AlarmRunSequence></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      {
        "ZoneGroupState": {
          "ZoneGroups": {
            "ZoneGroup": [
              {
                "-Coordinator": "RINCON_000E58289F2E01400",
                "-ID": "RINCON_000E58289F2E01400:106",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58289F2E01400",
                  "-Location": "http://192.168.1.39:1400/xml/device_description.xml",
                  "-ZoneName": "Dining Room",
                  "-Icon": "x-rincon-roomicon:dining",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "99"
                }
              },
              {
                "-Coordinator": "RINCON_000E585445BA01400",
                "-ID": "RINCON_000E585445BA01400:6",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E585445BA01400",
                  "-Location": "http://192.168.1.28:1400/xml/device_description.xml",
                  "-ZoneName": "Lauren Room",
                  "-Icon": "x-rincon-roomicon:living",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "15"
                }
              },
              {
                "-Coordinator": "RINCON_000E5855842601400",
                "-ID": "RINCON_000E5855842601400:17",
                "ZoneGroupMember": [
                  {
                    "-UUID": "RINCON_000E58980FE001400",
                    "-Location": "http://192.168.1.32:1400/xml/device_description.xml",
                    "-ZoneName": "Office",
                    "-Icon": "x-rincon-roomicon:office",
                    "-Invisible": "1",
                    "-SoftwareVersion": "19.3-53220b",
                    "-MinCompatibleVersion": "19.1-00000",
                    "-ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW",
                    "-BootSeq": "14"
                  },
                  {
                    "-UUID": "RINCON_000E5855842601400",
                    "-Location": "http://192.168.1.26:1400/xml/device_description.xml",
                    "-ZoneName": "Office",
                    "-Icon": "x-rincon-roomicon:office",
                    "-SoftwareVersion": "19.3-53220b",
                    "-MinCompatibleVersion": "19.1-00000",
                    "-ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW",
                    "-BootSeq": "9"
                  }
                ]
              },
              {
                "-Coordinator": "RINCON_000E58283BD401400",
                "-ID": "RINCON_000E58283BD401400:177",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58283BD401400",
                  "-Location": "http://192.168.1.38:1400/xml/device_description.xml",
                  "-ZoneName": "Bathroom",
                  "-Icon": "x-rincon-roomicon:bathroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "110"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828A20201400",
                "-ID": "RINCON_000E5828A20201400:185",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828A20201400",
                  "-Location": "http://192.168.1.36:1400/xml/device_description.xml",
                  "-ZoneName": "Master Bed",
                  "-Icon": "x-rincon-roomicon:masterbedroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "97"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828A1C401400",
                "-ID": "RINCON_000E5828A1C401400:76",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828A1C401400",
                  "-Location": "http://192.168.1.34:1400/xml/device_description.xml",
                  "-ZoneName": "Record Player",
                  "-Icon": "x-rincon-roomicon:den",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "47"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828228801400",
                "-ID": "RINCON_000E58283BD401400:176",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828228801400",
                  "-Location": "http://192.168.1.37:1400/xml/device_description.xml",
                  "-ZoneName": "Kitchen",
                  "-Icon": "x-rincon-roomicon:kitchen",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "95"
                }
              },
              {
                "-Coordinator": "RINCON_000E58283AC801400",
                "-ID": "RINCON_000E58283AC801400:103",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58283AC801400",
                  "-Location": "http://192.168.1.27:1400/xml/device_description.xml",
                  "-ZoneName": "TV Room",
                  "-Icon": "x-rincon-roomicon:tvroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "102"
                }
              }
            ]
          }
        }
      },
      { "ThirdPartyMediaServersX": "2:FKGsVbZEmQ8ayVr3/S/gb73j7mpZkCJSxSiMfjU7LwKshXz6L23K2xMcJRl/emmcsSgPdPqQdVsw+8e3YWIGyO+HjS6vh+lI9RjtspDmEzdh6grUT8nkJqIybrfDg0yuD1sKruhoXbbenJURLpJwURM0VqqLE7PjLg1rK+mh1KqlXe8p4mlH700QAtA2tpFoqQP+QUuKOkg6PjLXhttmrQ1sb1uo8wqFqiCO/yRmrB5CD7hoR9nqNSGgbl7qPhuKYGichHZdRs3TYfzRvrckxZ/jbrJ02H6N/nBrV3MbLYxPeY1qQWmgbtZaxJbNP9aSfHtbM+1U7e2srgBw584EE3a9hcziqnKGFne49O4ZP1Fsd5Y2PBBdNn8p234HPXu87ohtAYnjji971xu1nTExbIkXyswLv0SLftlYm46+wXmvF3Rz8DPkY2J2Ue1pOn8c2O3ARl8f6MwVzcTI4lpboNjT+MDywuhpon1b5tLx/+F6oyBXTSupK9cd22MgyRtnzyk/JgH+Bvb8S3NqQ+JcRKihSLmicbfyfvZl07Gts6xh0sw8wsfwlmVKSbvDHp0/yWHRBjaLj1iFJ3xBU5vsUx25CLWGimD1W8iW7vBmnEr4hlW9i9nkKLpcicP6RnR7BRXUImS6BRNlIw+c0Mv2MzM88X8I1Z/V4VKGP99wtUXFjVPmF5DD8+vLjhjT9gMlU24LAJz96L0bAmivMKSxcovID+ouBvZeZBvIFTX/hYUpyFcDAXalSAPkQF0t0KBGL8+uLwxIRYzNp0JZ/eTkFRZntFpRHFM+Qvw3pcqE4jTvyPv+TDnny0/omaBc9BZUu3BDVnKWQusFfe9nttXUtf3y6Omp8RA5U0kYntXkkB80QKATNsAvrrajnWXIX7JxjNb7kwJEnSjcyZsWJAXE/lsfbJ2k6AD0Rf/HqTF2QDQ=" },
      {
        "AvailableSoftwareUpdate": {
          "UpdateItem": {
            "-xmlns": "urn:schemas-rinconnetworks-com:update-1-0",
            "-Type": "Software",
            "-Version": "19.3-53220",
            "-UpdateURL": "http://update.sonos.com/firmware/Gold/v3.8-Hammer-RC2/^19.3-53220",
            "-DownloadSize": "0",
            "-ManifestURL": "http://update.sonos.com/firmware/Gold/v3.8.2-Hammer-Patch-MDCR/update_1344386463.upm"
          }
        }
      },
      { "AlarmRunSequence": "RINCON_000E58283AC801400:102:0" }
    ]
  }
}
> The raw event is: NOTIFY /Group Management HTTP/1.1
HOST: 192.168.1.41:3403
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 235
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283AC801400_sub0000003085
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><GroupCoordinatorIsLocal>1</GroupCoordinatorIsLocal></e:property><e:property><LocalGroupUUID>RINCON_000E58283AC801400:103</LocalGroupUUID></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "GroupCoordinatorIsLocal": "1" },
      { "LocalGroupUUID": "RINCON_000E58283AC801400:103" }
    ]
  }
}
> The raw event is: NOTIFY /Content Directory HTTP/1.1
HOST: 192.168.1.41:3403
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 906
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283AC801400_sub0000003086
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><SystemUpdateID>4</SystemUpdateID></e:property><e:property><ContainerUpdateIDs>S:,2</ContainerUpdateIDs></e:property><e:property><ShareListRefreshState>NOTRUN</ShareListRefreshState></e:property><e:property><ShareIndexInProgress>0</ShareIndexInProgress></e:property><e:property><ShareIndexLastError></ShareIndexLastError></e:property><e:property><RadioFavoritesUpdateID>RINCON_000E5828228801400,17</RadioFavoritesUpdateID></e:property><e:property><RadioLocationUpdateID>RINCON_000E5828228801400,87</RadioLocationUpdateID></e:property><e:property><SavedQueuesUpdateID>RINCON_000E58283BD401400,48</SavedQueuesUpdateID></e:property><e:property><ShareListUpdateID>RINCON_000E5828228801400,216</ShareListUpdateID></e:property><e:property><RecentlyPlayedUpdateID>RINCON_000E5855842601400,76</RecentlyPlayedUpdateID></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "SystemUpdateID": "4" },
      { "ContainerUpdateIDs": "S:,2" },
      { "ShareListRefreshState": "NOTRUN" },
      { "ShareIndexInProgress": "0" },
      {
        
      },
      { "RadioFavoritesUpdateID": "RINCON_000E5828228801400,17" },
      { "RadioLocationUpdateID": "RINCON_000E5828228801400,87" },
      { "SavedQueuesUpdateID": "RINCON_000E58283BD401400,48" },
      { "ShareListUpdateID": "RINCON_000E5828228801400,216" },
      { "RecentlyPlayedUpdateID": "RINCON_000E5855842601400,76" }
    ]
  }
}
> The raw event is: NOTIFY /Render Control HTTP/1.1
HOST: 192.168.1.41:3403
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 1060
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283AC801400_sub0000003087
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><LastChange>&lt;Event xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/RCS/&quot;&gt;&lt;InstanceID val=&quot;0&quot;&gt;&lt;Volume channel=&quot;Master&quot; val=&quot;41&quot;/&gt;&lt;Volume channel=&quot;LF&quot; val=&quot;100&quot;/&gt;&lt;Volume channel=&quot;RF&quot; val=&quot;100&quot;/&gt;&lt;Mute channel=&quot;Master&quot; val=&quot;0&quot;/&gt;&lt;Mute channel=&quot;LF&quot; val=&quot;0&quot;/&gt;&lt;Mute channel=&quot;RF&quot; val=&quot;0&quot;/&gt;&lt;Bass val=&quot;4&quot;/&gt;&lt;Treble val=&quot;4&quot;/&gt;&lt;Loudness channel=&quot;Master&quot; val=&quot;1&quot;/&gt;&lt;OutputFixed val=&quot;0&quot;/&gt;&lt;HeadphoneConnected val=&quot;0&quot;/&gt;&lt;SpeakerSize val=&quot;-1&quot;/&gt;&lt;SubGain val=&quot;0&quot;/&gt;&lt;SubCrossover val=&quot;0&quot;/&gt;&lt;SubPolarity val=&quot;0&quot;/&gt;&lt;SubEnabled val=&quot;1&quot;/&gt;&lt;PresetNameList&gt;FactoryDefaults&lt;/PresetNameList&gt;&lt;/InstanceID&gt;&lt;/Event&gt;</LastChange></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": {
      "LastChange": {
        "Event": {
          "-xmlns": "urn:schemas-upnp-org:metadata-1-0/RCS/",
          "InstanceID": {
            "-val": "0",
            "Volume": [
              {
                "-channel": "Master",
                "-val": "41"
              },
              {
                "-channel": "LF",
                "-val": "100"
              },
              {
                "-channel": "RF",
                "-val": "100"
              }
            ],
            "Mute": [
              {
                "-channel": "Master",
                "-val": "0"
              },
              {
                "-channel": "LF",
                "-val": "0"
              },
              {
                "-channel": "RF",
                "-val": "0"
              }
            ],
            "Bass": { "-val": "4" },
            "Treble": { "-val": "4" },
            "Loudness": {
              "-channel": "Master",
              "-val": "1"
            },
            "OutputFixed": { "-val": "0" },
            "HeadphoneConnected": { "-val": "0" },
            "SpeakerSize": { "-val": "-1" },
            "SubGain": { "-val": "0" },
            "SubCrossover": { "-val": "0" },
            "SubPolarity": { "-val": "0" },
            "SubEnabled": { "-val": "1" },
            "PresetNameList": "FactoryDefaults"
          }
        }
      }
    }
  }
}
> The raw event is: NOTIFY /Connection Manager HTTP/1.1
HOST: 192.168.1.41:3403
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 1925
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283AC801400_sub0000003088
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><SourceProtocolInfo></SourceProtocolInfo></e:property><e:property><SinkProtocolInfo>http-get:*:audio/mp3:*,x-file-cifs:*:audio/mp3:*,http-get:*:audio/mp4:*,x-file-cifs:*:audio/mp4:*,http-get:*:audio/mpeg:*,x-file-cifs:*:audio/mpeg:*,http-get:*:audio/mpegurl:*,x-file-cifs:*:audio/mpegurl:*,real.com-rhapsody-http-1-0:*:audio/mpegurl:*,file:*:audio/mpegurl:*,http-get:*:audio/mpeg3:*,x-file-cifs:*:audio/mpeg3:*,http-get:*:audio/wav:*,x-file-cifs:*:audio/wav:*,http-get:*:audio/wma:*,x-file-cifs:*:audio/wma:*,http-get:*:audio/x-ms-wma:*,x-file-cifs:*:audio/x-ms-wma:*,http-get:*:audio/aiff:*,x-file-cifs:*:audio/aiff:*,http-get:*:audio/flac:*,x-file-cifs:*:audio/flac:*,http-get:*:application/ogg:*,x-file-cifs:*:application/ogg:*,http-get:*:audio/audible:*,x-file-cifs:*:audio/audible:*,real.com-rhapsody-http-1-0:*:audio/x-ms-wma:*,real.com-rhapsody-direct:*:audio/mp3:*,sonos.com-mms:*:audio/x-ms-wma:*,sonos.com-http:*:audio/mpeg3:*,sonos.com-http:*:audio/mpeg:*,sonos.com-http:*:audio/wma:*,sonos.com-http:*:audio/mp4:*,sonos.com-http:*:audio/wav:*,sonos.com-http:*:audio/aiff:*,sonos.com-http:*:audio/flac:*,sonos.com-http:*:application/ogg:*,sonos.com-spotify:*:audio/x-spotify:*,sonos.com-rtrecent:*:audio/x-sonos-recent:*,real.com-rhapsody-http-1-0:*:audio/x-rhap-radio:*,real.com-rhapsody-direct:*:audio/x-rhap-radio:*,pandora.com-pndrradio:*:audio/x-pandora-radio:*,pandora.com-pndrradio-http:*:audio/mpeg3:*,sirius.com-sirradio:*:audio/x-sirius-radio:*,x-rincon:*:*:*,x-rincon-mp3radio:*:*:*,x-rincon-playlist:*:*:*,x-rincon-queue:*:*:*,x-rincon-stream:*:*:*,x-sonosapi-stream:*:*:*,x-sonosapi-radio:*:audio/x-sonosapi-radio:*,x-rincon-cpcontainer:*:*:*,last.fm-radio:*:audio/x-lastfm-radio:*,last.fm-radio-http:*:audio/mpeg3:*</SinkProtocolInfo></e:property><e:property><CurrentConnectionIDs></CurrentConnectionIDs></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      {
        
      },
      { "SinkProtocolInfo": "http-get:*:audio/mp3:*,x-file-cifs:*:audio/mp3:*,http-get:*:audio/mp4:*,x-file-cifs:*:audio/mp4:*,http-get:*:audio/mpeg:*,x-file-cifs:*:audio/mpeg:*,http-get:*:audio/mpegurl:*,x-file-cifs:*:audio/mpegurl:*,real.com-rhapsody-http-1-0:*:audio/mpegurl:*,file:*:audio/mpegurl:*,http-get:*:audio/mpeg3:*,x-file-cifs:*:audio/mpeg3:*,http-get:*:audio/wav:*,x-file-cifs:*:audio/wav:*,http-get:*:audio/wma:*,x-file-cifs:*:audio/wma:*,http-get:*:audio/x-ms-wma:*,x-file-cifs:*:audio/x-ms-wma:*,http-get:*:audio/aiff:*,x-file-cifs:*:audio/aiff:*,http-get:*:audio/flac:*,x-file-cifs:*:audio/flac:*,http-get:*:application/ogg:*,x-file-cifs:*:application/ogg:*,http-get:*:audio/audible:*,x-file-cifs:*:audio/audible:*,real.com-rhapsody-http-1-0:*:audio/x-ms-wma:*,real.com-rhapsody-direct:*:audio/mp3:*,sonos.com-mms:*:audio/x-ms-wma:*,sonos.com-http:*:audio/mpeg3:*,sonos.com-http:*:audio/mpeg:*,sonos.com-http:*:audio/wma:*,sonos.com-http:*:audio/mp4:*,sonos.com-http:*:audio/wav:*,sonos.com-http:*:audio/aiff:*,sonos.com-http:*:audio/flac:*,sonos.com-http:*:application/ogg:*,sonos.com-spotify:*:audio/x-spotify:*,sonos.com-rtrecent:*:audio/x-sonos-recent:*,real.com-rhapsody-http-1-0:*:audio/x-rhap-radio:*,real.com-rhapsody-direct:*:audio/x-rhap-radio:*,pandora.com-pndrradio:*:audio/x-pandora-radio:*,pandora.com-pndrradio-http:*:audio/mpeg3:*,sirius.com-sirradio:*:audio/x-sirius-radio:*,x-rincon:*:*:*,x-rincon-mp3radio:*:*:*,x-rincon-playlist:*:*:*,x-rincon-queue:*:*:*,x-rincon-stream:*:*:*,x-sonosapi-stream:*:*:*,x-sonosapi-radio:*:audio/x-sonosapi-radio:*,x-rincon-cpcontainer:*:*:*,last.fm-radio:*:audio/x-lastfm-radio:*,last.fm-radio-http:*:audio/mpeg3:*" },
      {
        
      }
    ]
  }
}
> Subscribing to events
> The raw event is: NOTIFY /Transport Event HTTP/1.1
HOST: 192.168.1.41:3403
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 5623
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58283AC801400_sub0000003089
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><LastChange>&lt;Event xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/AVT/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot;&gt;&lt;InstanceID val=&quot;0&quot;&gt;&lt;TransportState val=&quot;PAUSED_PLAYBACK&quot;/&gt;&lt;CurrentPlayMode val=&quot;NORMAL&quot;/&gt;&lt;CurrentCrossfadeMode val=&quot;0&quot;/&gt;&lt;NumberOfTracks val=&quot;77&quot;/&gt;&lt;CurrentTrack val=&quot;24&quot;/&gt;&lt;CurrentSection val=&quot;0&quot;/&gt;&lt;CurrentTrackURI val=&quot;x-sonos-spotify:spotify%3atrack%3a00sPD3dShAg2v5BFDwgjlO?sid=9&amp;amp;flags=0&quot;/&gt;&lt;CurrentTrackDuration val=&quot;0:03:32&quot;/&gt;&lt;CurrentTrackMetaData val=&quot;&amp;lt;DIDL-Lite xmlns:dc=&amp;quot;http://purl.org/dc/elements/1.1/&amp;quot; xmlns:upnp=&amp;quot;urn:schemas-upnp-org:metadata-1-0/upnp/&amp;quot; xmlns:r=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot; xmlns=&amp;quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&amp;quot;&amp;gt;&amp;lt;item id=&amp;quot;-1&amp;quot; parentID=&amp;quot;-1&amp;quot; restricted=&amp;quot;true&amp;quot;&amp;gt;&amp;lt;res protocolInfo=&amp;quot;sonos.com-spotify:*:audio/x-spotify:*&amp;quot; duration=&amp;quot;0:03:32&amp;quot;&amp;gt;x-sonos-spotify:spotify%3atrack%3a00sPD3dShAg2v5BFDwgjlO?sid=9&amp;amp;amp;flags=0&amp;lt;/res&amp;gt;&amp;lt;r:streamContent&amp;gt;&amp;lt;/r:streamContent&amp;gt;&amp;lt;r:radioShowMd&amp;gt;&amp;lt;/r:radioShowMd&amp;gt;&amp;lt;upnp:albumArtURI&amp;gt;/getaa?s=1&amp;amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a00sPD3dShAg2v5BFDwgjlO%3fsid%3d9%26flags%3d0&amp;lt;/upnp:albumArtURI&amp;gt;&amp;lt;dc:title&amp;gt;Everything&amp;lt;/dc:title&amp;gt;&amp;lt;upnp:class&amp;gt;object.item.audioItem.musicTrack&amp;lt;/upnp:class&amp;gt;&amp;lt;dc:creator&amp;gt;Michael Bubl̩&amp;lt;/dc:creator&amp;gt;&amp;lt;upnp:album&amp;gt;Everything&amp;lt;/upnp:album&amp;gt;&amp;lt;/item&amp;gt;&amp;lt;/DIDL-Lite&amp;gt;&quot;/&gt;&lt;r:NextTrackURI val=&quot;x-sonos-spotify:spotify%3atrack%3a75fcAl0A7ztkD6F4OdcdFY?sid=9&amp;amp;flags=0&quot;/&gt;&lt;r:NextTrackMetaData val=&quot;&amp;lt;DIDL-Lite xmlns:dc=&amp;quot;http://purl.org/dc/elements/1.1/&amp;quot; xmlns:upnp=&amp;quot;urn:schemas-upnp-org:metadata-1-0/upnp/&amp;quot; xmlns:r=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot; xmlns=&amp;quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&amp;quot;&amp;gt;&amp;lt;item id=&amp;quot;-1&amp;quot; parentID=&amp;quot;-1&amp;quot; restricted=&amp;quot;true&amp;quot;&amp;gt;&amp;lt;res protocolInfo=&amp;quot;sonos.com-spotify:*:audio/x-spotify:*&amp;quot; duration=&amp;quot;0:04:14&amp;quot;&amp;gt;x-sonos-spotify:spotify%3atrack%3a75fcAl0A7ztkD6F4OdcdFY?sid=9&amp;amp;amp;flags=0&amp;lt;/res&amp;gt;&amp;lt;upnp:albumArtURI&amp;gt;/getaa?s=1&amp;amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a75fcAl0A7ztkD6F4OdcdFY%3fsid%3d9%26flags%3d0&amp;lt;/upnp:albumArtURI&amp;gt;&amp;lt;dc:title&amp;gt;Cry Me A River&amp;lt;/dc:title&amp;gt;&amp;lt;upnp:class&amp;gt;object.item.audioItem.musicTrack&amp;lt;/upnp:class&amp;gt;&amp;lt;dc:creator&amp;gt;Michael Bubl̩&amp;lt;/dc:creator&amp;gt;&amp;lt;upnp:album&amp;gt;Crazy Love&amp;lt;/upnp:album&amp;gt;&amp;lt;/item&amp;gt;&amp;lt;/DIDL-Lite&amp;gt;&quot;/&gt;&lt;r:EnqueuedTransportURI val=&quot;x-rincon-cpcontainer:1006008cspotify%3auser%3amanicaphid%3aplaylist%3a1El5jmE4qEq8Svkl1OheOR&quot;/&gt;&lt;r:EnqueuedTransportURIMetaData val=&quot;&amp;lt;DIDL-Lite xmlns:dc=&amp;quot;http://purl.org/dc/elements/1.1/&amp;quot; xmlns:upnp=&amp;quot;urn:schemas-upnp-org:metadata-1-0/upnp/&amp;quot; xmlns:r=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot; xmlns=&amp;quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&amp;quot;&amp;gt;&amp;lt;item id=&amp;quot;1006008cspotify%3auser%3amanicaphid%3aplaylist%3a1El5jmE4qEq8Svkl1OheOR&amp;quot; parentID=&amp;quot;1006008cspotify%3auser%3amanicaphid%3aplaylist%3a1El5jmE4qEq8Svkl1OheOR&amp;quot; restricted=&amp;quot;true&amp;quot;&amp;gt;&amp;lt;dc:title&amp;gt;All Tracks&amp;lt;/dc:title&amp;gt;&amp;lt;upnp:class&amp;gt;object.container.playlistContainer&amp;lt;/upnp:class&amp;gt;&amp;lt;desc id=&amp;quot;cdudn&amp;quot; nameSpace=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot;&amp;gt;SA_RINCON2311_postsi&amp;lt;/desc&amp;gt;&amp;lt;/item&amp;gt;&amp;lt;/DIDL-Lite&amp;gt;&quot;/&gt;&lt;PlaybackStorageMedium val=&quot;NETWORK&quot;/&gt;&lt;AVTransportURI val=&quot;x-rincon-queue:RINCON_000E58283AC801400#0&quot;/&gt;&lt;AVTransportURIMetaData val=&quot;&quot;/&gt;&lt;CurrentTransportActions val=&quot;Set, Play, Stop, Pause, Seek, Next, Previous&quot;/&gt;&lt;TransportStatus val=&quot;OK&quot;/&gt;&lt;r:SleepTimerGeneration val=&quot;0&quot;/&gt;&lt;r:AlarmRunning val=&quot;0&quot;/&gt;&lt;r:SnoozeRunning val=&quot;0&quot;/&gt;&lt;r:RestartPending val=&quot;0&quot;/&gt;&lt;TransportPlaySpeed val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;CurrentMediaDuration val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;RecordStorageMedium val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;PossiblePlaybackStorageMedia val=&quot;NONE, NETWORK&quot;/&gt;&lt;PossibleRecordStorageMedia val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;RecordMediumWriteStatus val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;CurrentRecordQualityMode val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;PossibleRecordQualityModes val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;NextAVTransportURI val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;NextAVTransportURIMetaData val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;/InstanceID&gt;&lt;/Event&gt;</LastChange></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": {
      "LastChange": {
        "Event": {
          "-xmlns": "urn:schemas-upnp-org:metadata-1-0/AVT/",
          "-xmlns:r": "urn:schemas-rinconnetworks-com:metadata-1-0/",
          "InstanceID": {
            "-val": "0",
            "TransportState": { "-val": "PAUSED_PLAYBACK" },
            "CurrentPlayMode": { "-val": "NORMAL" },
            "CurrentCrossfadeMode": { "-val": "0" },
            "NumberOfTracks": { "-val": "77" },
            "CurrentTrack": { "-val": "24" },
            "CurrentSection": { "-val": "0" },
            "CurrentTrackURI": { "-val": "x-sonos-spotify:spotify%3atrack%3a00sPD3dShAg2v5BFDwgjlO?sid=9&amp;flags=0" },
            "CurrentTrackDuration": { "-val": "0:03:32" },
            "CurrentTrackMetaData": { "-val": "&lt;DIDL-Lite xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot; xmlns:upnp=&quot;urn:schemas-upnp-org:metadata-1-0/upnp/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot; xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&quot;&gt;&lt;item id=&quot;-1&quot; parentID=&quot;-1&quot; restricted=&quot;true&quot;&gt;&lt;res protocolInfo=&quot;sonos.com-spotify:*:audio/x-spotify:*&quot; duration=&quot;0:03:32&quot;&gt;x-sonos-spotify:spotify%3atrack%3a00sPD3dShAg2v5BFDwgjlO?sid=9&amp;amp;flags=0&lt;/res&gt;&lt;r:streamContent&gt;&lt;/r:streamContent&gt;&lt;r:radioShowMd&gt;&lt;/r:radioShowMd&gt;&lt;upnp:albumArtURI&gt;/getaa?s=1&amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a00sPD3dShAg2v5BFDwgjlO%3fsid%3d9%26flags%3d0&lt;/upnp:albumArtURI&gt;&lt;dc:title&gt;Everything&lt;/dc:title&gt;&lt;upnp:class&gt;object.item.audioItem.musicTrack&lt;/upnp:class&gt;&lt;dc:creator&gt;Michael Bubl̩&lt;/dc:creator&gt;&lt;upnp:album&gt;Everything&lt;/upnp:album&gt;&lt;/item&gt;&lt;/DIDL-Lite&gt;" },
            "r:NextTrackURI": { "-val": "x-sonos-spotify:spotify%3atrack%3a75fcAl0A7ztkD6F4OdcdFY?sid=9&amp;flags=0" },
            "r:NextTrackMetaData": { "-val": "&lt;DIDL-Lite xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot; xmlns:upnp=&quot;urn:schemas-upnp-org:metadata-1-0/upnp/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot; xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&quot;&gt;&lt;item id=&quot;-1&quot; parentID=&quot;-1&quot; restricted=&quot;true&quot;&gt;&lt;res protocolInfo=&quot;sonos.com-spotify:*:audio/x-spotify:*&quot; duration=&quot;0:04:14&quot;&gt;x-sonos-spotify:spotify%3atrack%3a75fcAl0A7ztkD6F4OdcdFY?sid=9&amp;amp;flags=0&lt;/res&gt;&lt;upnp:albumArtURI&gt;/getaa?s=1&amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a75fcAl0A7ztkD6F4OdcdFY%3fsid%3d9%26flags%3d0&lt;/upnp:albumArtURI&gt;&lt;dc:title&gt;Cry Me A River&lt;/dc:title&gt;&lt;upnp:class&gt;object.item.audioItem.musicTrack&lt;/upnp:class&gt;&lt;dc:creator&gt;Michael Bubl̩&lt;/dc:creator&gt;&lt;upnp:album&gt;Crazy Love&lt;/upnp:album&gt;&lt;/item&gt;&lt;/DIDL-Lite&gt;" },
            "r:EnqueuedTransportURI": { "-val": "x-rincon-cpcontainer:1006008cspotify%3auser%3amanicaphid%3aplaylist%3a1El5jmE4qEq8Svkl1OheOR" },
            "r:EnqueuedTransportURIMetaData": { "-val": "&lt;DIDL-Lite xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot; xmlns:upnp=&quot;urn:schemas-upnp-org:metadata-1-0/upnp/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot; xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&quot;&gt;&lt;item id=&quot;1006008cspotify%3auser%3amanicaphid%3aplaylist%3a1El5jmE4qEq8Svkl1OheOR&quot; parentID=&quot;1006008cspotify%3auser%3amanicaphid%3aplaylist%3a1El5jmE4qEq8Svkl1OheOR&quot; restricted=&quot;true&quot;&gt;&lt;dc:title&gt;All Tracks&lt;/dc:title&gt;&lt;upnp:class&gt;object.container.playlistContainer&lt;/upnp:class&gt;&lt;desc id=&quot;cdudn&quot; nameSpace=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot;&gt;SA_RINCON2311_postsi&lt;/desc&gt;&lt;/item&gt;&lt;/DIDL-Lite&gt;" },
            "PlaybackStorageMedium": { "-val": "NETWORK" },
            "AVTransportURI": { "-val": "x-rincon-queue:RINCON_000E58283AC801400#0" },
            "AVTransportURIMetaData": {
              
            },
            "CurrentTransportActions": { "-val": "Set, Play, Stop, Pause, Seek, Next, Previous" },
            "TransportStatus": { "-val": "OK" },
            "r:SleepTimerGeneration": { "-val": "0" },
            "r:AlarmRunning": { "-val": "0" },
            "r:SnoozeRunning": { "-val": "0" },
            "r:RestartPending": { "-val": "0" },
            "TransportPlaySpeed": { "-val": "NOT_IMPLEMENTED" },
            "CurrentMediaDuration": { "-val": "NOT_IMPLEMENTED" },
            "RecordStorageMedium": { "-val": "NOT_IMPLEMENTED" },
            "PossiblePlaybackStorageMedia": { "-val": "NONE, NETWORK" },
            "PossibleRecordStorageMedia": { "-val": "NOT_IMPLEMENTED" },
            "RecordMediumWriteStatus": { "-val": "NOT_IMPLEMENTED" },
            "CurrentRecordQualityMode": { "-val": "NOT_IMPLEMENTED" },
            "PossibleRecordQualityModes": { "-val": "NOT_IMPLEMENTED" },
            "NextAVTransportURI": { "-val": "NOT_IMPLEMENTED" },
            "NextAVTransportURIMetaData": { "-val": "NOT_IMPLEMENTED" }
          }
        }
      }
    }
  }
}
> The raw event is: NOTIFY /Alarm Clock HTTP/1.1
HOST: 192.168.1.41:3401
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 629
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E585445BA01400_sub0000002807
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><TimeZone>00000a000502000003000501ffc4</TimeZone></e:property><e:property><TimeServer>0.sonostime.pool.ntp.org,1.sonostime.pool.ntp.org,2.sonostime.pool.ntp.org,3.sonostime.pool.ntp.org</TimeServer></e:property><e:property><TimeGeneration>4</TimeGeneration></e:property><e:property><AlarmListVersion>RINCON_000E5828228801400:22</AlarmListVersion></e:property><e:property><TimeFormat>INV</TimeFormat></e:property><e:property><DateFormat>INV</DateFormat></e:property><e:property><DailyIndexRefreshTime>02:00:00</DailyIndexRefreshTime></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "TimeZone": "00000a000502000003000501ffc4" },
      { "TimeServer": "0.sonostime.pool.ntp.org,1.sonostime.pool.ntp.org,2.sonostime.pool.ntp.org,3.sonostime.pool.ntp.org" },
      { "TimeGeneration": "4" },
      { "AlarmListVersion": "RINCON_000E5828228801400:22" },
      { "TimeFormat": "INV" },
      { "DateFormat": "INV" },
      { "DailyIndexRefreshTime": "02:00:00" }
    ]
  }
}
> The raw event is: NOTIFY /Music Services HTTP/1.1
HOST: 192.168.1.41:3401
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 166
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E585445BA01400_sub0000002808
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ServiceListVersion>RINCON_000E5828228801400:943</ServiceListVersion></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": { "ServiceListVersion": "RINCON_000E5828228801400:943" }
  }
}
> The raw event is: NOTIFY /Audio In HTTP/1.1
HOST: 192.168.1.41:3401
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 360
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E585445BA01400_sub0000002809
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><AudioInputName>Line-In</AudioInputName></e:property><e:property><Icon></Icon></e:property><e:property><LineInConnected>0</LineInConnected></e:property><e:property><LeftLineInLevel>1</LeftLineInLevel></e:property><e:property><RightLineInLevel>1</RightLineInLevel></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "AudioInputName": "Line-In" },
      {
        
      },
      { "LineInConnected": "0" },
      { "LeftLineInLevel": "1" },
      { "RightLineInLevel": "1" }
    ]
  }
}
> The raw event is: NOTIFY /Device Properties HTTP/1.1
HOST: 192.168.1.41:3401
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 708
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E585445BA01400_sub0000002810
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneName>Lauren Room</ZoneName></e:property><e:property><Icon>x-rincon-roomicon:living</Icon></e:property><e:property><Invisible>0</Invisible></e:property><e:property><IsZoneBridge>0</IsZoneBridge></e:property><e:property><SettingsReplicationState>RINCON_000E5828228801400,17,RINCON_FFFFFFFFFFFF99999,0,RINCON_000E58283BD401400,48,RINCON_000E5828228801400,216,RINCON_000E5828228801400,87,RINCON_000E5828A1C401400,58,RINCON_000E5828228801400,943,RINCON_000E5855842601400,76,RINCON_000E5828228801400,4,RINCON_000E5828A1C401400,27</SettingsReplicationState></e:property><e:property><ChannelMapSet></ChannelMapSet></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "ZoneName": "Lauren Room" },
      { "Icon": "x-rincon-roomicon:living" },
      { "Invisible": "0" },
      { "IsZoneBridge": "0" },
      { "SettingsReplicationState": "RINCON_000E5828228801400,17,RINCON_FFFFFFFFFFFF99999,0,RINCON_000E58283BD401400,48,RINCON_000E5828228801400,216,RINCON_000E5828228801400,87,RINCON_000E5828A1C401400,58,RINCON_000E5828228801400,943,RINCON_000E5855842601400,76,RINCON_000E5828228801400,4,RINCON_000E5828A1C401400,27" },
      {
        
      }
    ]
  }
}
> The raw event is: NOTIFY /Zone Group HTTP/1.1
HOST: 192.168.1.41:3401
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 5809
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E585445BA01400_sub0000002811
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneGroupState>&lt;ZoneGroups&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58289F2E01400&quot; ID=&quot;RINCON_000E58289F2E01400:106&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58289F2E01400&quot; Location=&quot;http://192.168.1.39:1400/xml/device_description.xml&quot; ZoneName=&quot;Dining Room&quot; Icon=&quot;x-rincon-roomicon:dining&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;99&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283AC801400&quot; ID=&quot;RINCON_000E58283AC801400:103&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283AC801400&quot; Location=&quot;http://192.168.1.27:1400/xml/device_description.xml&quot; ZoneName=&quot;TV Room&quot; Icon=&quot;x-rincon-roomicon:tvroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;102&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283BD401400&quot; ID=&quot;RINCON_000E58283BD401400:177&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283BD401400&quot; Location=&quot;http://192.168.1.38:1400/xml/device_description.xml&quot; ZoneName=&quot;Bathroom&quot; Icon=&quot;x-rincon-roomicon:bathroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;110&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A1C401400&quot; ID=&quot;RINCON_000E5828A1C401400:76&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A1C401400&quot; Location=&quot;http://192.168.1.34:1400/xml/device_description.xml&quot; ZoneName=&quot;Record Player&quot; Icon=&quot;x-rincon-roomicon:den&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;47&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A20201400&quot; ID=&quot;RINCON_000E5828A20201400:185&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A20201400&quot; Location=&quot;http://192.168.1.36:1400/xml/device_description.xml&quot; ZoneName=&quot;Master Bed&quot; Icon=&quot;x-rincon-roomicon:masterbedroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;97&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828228801400&quot; ID=&quot;RINCON_000E58283BD401400:176&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828228801400&quot; Location=&quot;http://192.168.1.37:1400/xml/device_description.xml&quot; ZoneName=&quot;Kitchen&quot; Icon=&quot;x-rincon-roomicon:kitchen&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;95&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5855842601400&quot; ID=&quot;RINCON_000E5855842601400:17&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58980FE001400&quot; Location=&quot;http://192.168.1.32:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; Invisible=&quot;1&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;14&quot;/&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5855842601400&quot; Location=&quot;http://192.168.1.26:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;9&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E585445BA01400&quot; ID=&quot;RINCON_000E585445BA01400:6&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E585445BA01400&quot; Location=&quot;http://192.168.1.28:1400/xml/device_description.xml&quot; ZoneName=&quot;Lauren Room&quot; Icon=&quot;x-rincon-roomicon:living&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;15&quot;/&gt;&lt;/ZoneGroup&gt;&lt;/ZoneGroups&gt;</ZoneGroupState></e:property><e:property><ThirdPartyMediaServersX>2:Vgq9muXO6jYrfIFUq8BoNG9a2f8U6gbOHZUZc+I/jiX3fPZ8uHlaQZH8K2XtykvqlqrY6IxUyPjs+/gD56j1zuwjSTIj2y7r1KsIkjp09YBmMYmZfF+XgUmOPGI69hqHBMueJ0zfb87MMvR8RRss/tarj7N8IVdvpCjjtez25BRU/D368ZnBG3dw420lDZ69Gr/3jcR5tUREBC/fgXcLtrWb4uKdSL4y84RYLV+qI/UR2TBAzhDyfXhgOPkYJu2mEMWRom8oxVLxrk++OpR0InxtyvTC+vRBxw8SWdLfHrsO4hVDZg2U0iWELmhUigZuANmBJnAi2QcQNLuvBEqAXuZ/YwNKz5bLNo6Df3PgEN/jvlZqbk5zFCJE3wCe3mhRNgggNHhnhTjrBSyWBzABwiN4xd5K7PuIDIK6M/dUb867FvxaTRzpb8+vw1EnuF4Aup4znxlcnKdtcmZFEe8vNHLRTxD6MZj83gFR0nWKVCH6otdaKV2VBTLhJjWXtwmeIkxVlc46xTtFqfKpiMplHk/lLs2XH9VltwL6BQZqwJDwFMVERkkf0AK74R7+XcVNmlIdaQOq3/wljiYjh7dvMcn49GcVTDuDULpK/YfT3+H840aAlhbGqnneYk5YDkqawWK8PYD9eSiMW8d3u12Vc1eRbmY2C2R90UxnBpw3LK6/q8zVq8xGL2UZM8M0vDtHfmqQbFCdQV7n7sc6ioPYEdzi6XhZnuVuxsROHmv2/wFkw2DKV7OqDR/S4NDF7yYRDSYq/cqFec+cG5J7HuReiElLuFRx7BkAedWIdYAzR8dKXPt0YJC+vGkO8QBCVj3pO9eToEpJDar1z/7HhGDstOhfMqnIM3Mf3dXjGGH8kBRBmm/BCBLr+9csBJhMQqKRvDz3VcIMjkgQxIDJeYIMChV/0HXodazudfnbysuXJjk=</ThirdPartyMediaServersX></e:property><e:property><AvailableSoftwareUpdate>&lt;UpdateItem xmlns=&quot;urn:schemas-rinconnetworks-com:update-1-0&quot; Type=&quot;Software&quot; Version=&quot;19.3-53220&quot; UpdateURL=&quot;http://update.sonos.com/firmware/Gold/v3.8-Hammer-RC2/^19.3-53220&quot; DownloadSize=&quot;0&quot; ManifestURL=&quot;http://update.sonos.com/firmware/Gold/v3.8.2-Hammer-Patch-MDCR/update_1344386463.upm&quot;/&gt;</AvailableSoftwareUpdate></e:property><e:property><AlarmRunSequence>RINCON_000E585445BA01400:15:0</AlarmRunSequence></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      {
        "ZoneGroupState": {
          "ZoneGroups": {
            "ZoneGroup": [
              {
                "-Coordinator": "RINCON_000E58289F2E01400",
                "-ID": "RINCON_000E58289F2E01400:106",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58289F2E01400",
                  "-Location": "http://192.168.1.39:1400/xml/device_description.xml",
                  "-ZoneName": "Dining Room",
                  "-Icon": "x-rincon-roomicon:dining",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "99"
                }
              },
              {
                "-Coordinator": "RINCON_000E58283AC801400",
                "-ID": "RINCON_000E58283AC801400:103",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58283AC801400",
                  "-Location": "http://192.168.1.27:1400/xml/device_description.xml",
                  "-ZoneName": "TV Room",
                  "-Icon": "x-rincon-roomicon:tvroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "102"
                }
              },
              {
                "-Coordinator": "RINCON_000E58283BD401400",
                "-ID": "RINCON_000E58283BD401400:177",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58283BD401400",
                  "-Location": "http://192.168.1.38:1400/xml/device_description.xml",
                  "-ZoneName": "Bathroom",
                  "-Icon": "x-rincon-roomicon:bathroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "110"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828A1C401400",
                "-ID": "RINCON_000E5828A1C401400:76",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828A1C401400",
                  "-Location": "http://192.168.1.34:1400/xml/device_description.xml",
                  "-ZoneName": "Record Player",
                  "-Icon": "x-rincon-roomicon:den",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "47"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828A20201400",
                "-ID": "RINCON_000E5828A20201400:185",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828A20201400",
                  "-Location": "http://192.168.1.36:1400/xml/device_description.xml",
                  "-ZoneName": "Master Bed",
                  "-Icon": "x-rincon-roomicon:masterbedroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "97"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828228801400",
                "-ID": "RINCON_000E58283BD401400:176",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828228801400",
                  "-Location": "http://192.168.1.37:1400/xml/device_description.xml",
                  "-ZoneName": "Kitchen",
                  "-Icon": "x-rincon-roomicon:kitchen",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "95"
                }
              },
              {
                "-Coordinator": "RINCON_000E5855842601400",
                "-ID": "RINCON_000E5855842601400:17",
                "ZoneGroupMember": [
                  {
                    "-UUID": "RINCON_000E58980FE001400",
                    "-Location": "http://192.168.1.32:1400/xml/device_description.xml",
                    "-ZoneName": "Office",
                    "-Icon": "x-rincon-roomicon:office",
                    "-Invisible": "1",
                    "-SoftwareVersion": "19.3-53220b",
                    "-MinCompatibleVersion": "19.1-00000",
                    "-ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW",
                    "-BootSeq": "14"
                  },
                  {
                    "-UUID": "RINCON_000E5855842601400",
                    "-Location": "http://192.168.1.26:1400/xml/device_description.xml",
                    "-ZoneName": "Office",
                    "-Icon": "x-rincon-roomicon:office",
                    "-SoftwareVersion": "19.3-53220b",
                    "-MinCompatibleVersion": "19.1-00000",
                    "-ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW",
                    "-BootSeq": "9"
                  }
                ]
              },
              {
                "-Coordinator": "RINCON_000E585445BA01400",
                "-ID": "RINCON_000E585445BA01400:6",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E585445BA01400",
                  "-Location": "http://192.168.1.28:1400/xml/device_description.xml",
                  "-ZoneName": "Lauren Room",
                  "-Icon": "x-rincon-roomicon:living",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "15"
                }
              }
            ]
          }
        }
      },
      { "ThirdPartyMediaServersX": "2:Vgq9muXO6jYrfIFUq8BoNG9a2f8U6gbOHZUZc+I/jiX3fPZ8uHlaQZH8K2XtykvqlqrY6IxUyPjs+/gD56j1zuwjSTIj2y7r1KsIkjp09YBmMYmZfF+XgUmOPGI69hqHBMueJ0zfb87MMvR8RRss/tarj7N8IVdvpCjjtez25BRU/D368ZnBG3dw420lDZ69Gr/3jcR5tUREBC/fgXcLtrWb4uKdSL4y84RYLV+qI/UR2TBAzhDyfXhgOPkYJu2mEMWRom8oxVLxrk++OpR0InxtyvTC+vRBxw8SWdLfHrsO4hVDZg2U0iWELmhUigZuANmBJnAi2QcQNLuvBEqAXuZ/YwNKz5bLNo6Df3PgEN/jvlZqbk5zFCJE3wCe3mhRNgggNHhnhTjrBSyWBzABwiN4xd5K7PuIDIK6M/dUb867FvxaTRzpb8+vw1EnuF4Aup4znxlcnKdtcmZFEe8vNHLRTxD6MZj83gFR0nWKVCH6otdaKV2VBTLhJjWXtwmeIkxVlc46xTtFqfKpiMplHk/lLs2XH9VltwL6BQZqwJDwFMVERkkf0AK74R7+XcVNmlIdaQOq3/wljiYjh7dvMcn49GcVTDuDULpK/YfT3+H840aAlhbGqnneYk5YDkqawWK8PYD9eSiMW8d3u12Vc1eRbmY2C2R90UxnBpw3LK6/q8zVq8xGL2UZM8M0vDtHfmqQbFCdQV7n7sc6ioPYEdzi6XhZnuVuxsROHmv2/wFkw2DKV7OqDR/S4NDF7yYRDSYq/cqFec+cG5J7HuReiElLuFRx7BkAedWIdYAzR8dKXPt0YJC+vGkO8QBCVj3pO9eToEpJDar1z/7HhGDstOhfMqnIM3Mf3dXjGGH8kBRBmm/BCBLr+9csBJhMQqKRvDz3VcIMjkgQxIDJeYIMChV/0HXodazudfnbysuXJjk=" },
      {
        "AvailableSoftwareUpdate": {
          "UpdateItem": {
            "-xmlns": "urn:schemas-rinconnetworks-com:update-1-0",
            "-Type": "Software",
            "-Version": "19.3-53220",
            "-UpdateURL": "http://update.sonos.com/firmware/Gold/v3.8-Hammer-RC2/^19.3-53220",
            "-DownloadSize": "0",
            "-ManifestURL": "http://update.sonos.com/firmware/Gold/v3.8.2-Hammer-Patch-MDCR/update_1344386463.upm"
          }
        }
      },
      { "AlarmRunSequence": "RINCON_000E585445BA01400:15:0" }
    ]
  }
}
> The raw event is: NOTIFY /Group Management HTTP/1.1
HOST: 192.168.1.41:3401
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 233
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E585445BA01400_sub0000002812
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><GroupCoordinatorIsLocal>1</GroupCoordinatorIsLocal></e:property><e:property><LocalGroupUUID>RINCON_000E585445BA01400:6</LocalGroupUUID></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "GroupCoordinatorIsLocal": "1" },
      { "LocalGroupUUID": "RINCON_000E585445BA01400:6" }
    ]
  }
}
> The raw event is: NOTIFY /Content Directory HTTP/1.1
HOST: 192.168.1.41:3401
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 907
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E585445BA01400_sub0000002813
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><SystemUpdateID>10</SystemUpdateID></e:property><e:property><ContainerUpdateIDs>S:,2</ContainerUpdateIDs></e:property><e:property><ShareListRefreshState>NOTRUN</ShareListRefreshState></e:property><e:property><ShareIndexInProgress>0</ShareIndexInProgress></e:property><e:property><ShareIndexLastError></ShareIndexLastError></e:property><e:property><RadioFavoritesUpdateID>RINCON_000E5828228801400,17</RadioFavoritesUpdateID></e:property><e:property><RadioLocationUpdateID>RINCON_000E5828228801400,87</RadioLocationUpdateID></e:property><e:property><SavedQueuesUpdateID>RINCON_000E58283BD401400,48</SavedQueuesUpdateID></e:property><e:property><ShareListUpdateID>RINCON_000E5828228801400,216</ShareListUpdateID></e:property><e:property><RecentlyPlayedUpdateID>RINCON_000E5855842601400,76</RecentlyPlayedUpdateID></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "SystemUpdateID": "10" },
      { "ContainerUpdateIDs": "S:,2" },
      { "ShareListRefreshState": "NOTRUN" },
      { "ShareIndexInProgress": "0" },
      {
        
      },
      { "RadioFavoritesUpdateID": "RINCON_000E5828228801400,17" },
      { "RadioLocationUpdateID": "RINCON_000E5828228801400,87" },
      { "SavedQueuesUpdateID": "RINCON_000E58283BD401400,48" },
      { "ShareListUpdateID": "RINCON_000E5828228801400,216" },
      { "RecentlyPlayedUpdateID": "RINCON_000E5855842601400,76" }
    ]
  }
}
> The raw event is: NOTIFY /Render Control HTTP/1.1
HOST: 192.168.1.41:3401
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 1059
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E585445BA01400_sub0000002814
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><LastChange>&lt;Event xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/RCS/&quot;&gt;&lt;InstanceID val=&quot;0&quot;&gt;&lt;Volume channel=&quot;Master&quot; val=&quot;25&quot;/&gt;&lt;Volume channel=&quot;LF&quot; val=&quot;100&quot;/&gt;&lt;Volume channel=&quot;RF&quot; val=&quot;100&quot;/&gt;&lt;Mute channel=&quot;Master&quot; val=&quot;1&quot;/&gt;&lt;Mute channel=&quot;LF&quot; val=&quot;0&quot;/&gt;&lt;Mute channel=&quot;RF&quot; val=&quot;0&quot;/&gt;&lt;Bass val=&quot;0&quot;/&gt;&lt;Treble val=&quot;0&quot;/&gt;&lt;Loudness channel=&quot;Master&quot; val=&quot;1&quot;/&gt;&lt;OutputFixed val=&quot;0&quot;/&gt;&lt;HeadphoneConnected val=&quot;0&quot;/&gt;&lt;SpeakerSize val=&quot;3&quot;/&gt;&lt;SubGain val=&quot;0&quot;/&gt;&lt;SubCrossover val=&quot;0&quot;/&gt;&lt;SubPolarity val=&quot;0&quot;/&gt;&lt;SubEnabled val=&quot;1&quot;/&gt;&lt;PresetNameList&gt;FactoryDefaults&lt;/PresetNameList&gt;&lt;/InstanceID&gt;&lt;/Event&gt;</LastChange></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": {
      "LastChange": {
        "Event": {
          "-xmlns": "urn:schemas-upnp-org:metadata-1-0/RCS/",
          "InstanceID": {
            "-val": "0",
            "Volume": [
              {
                "-channel": "Master",
                "-val": "25"
              },
              {
                "-channel": "LF",
                "-val": "100"
              },
              {
                "-channel": "RF",
                "-val": "100"
              }
            ],
            "Mute": [
              {
                "-channel": "Master",
                "-val": "1"
              },
              {
                "-channel": "LF",
                "-val": "0"
              },
              {
                "-channel": "RF",
                "-val": "0"
              }
            ],
            "Bass": { "-val": "0" },
            "Treble": { "-val": "0" },
            "Loudness": {
              "-channel": "Master",
              "-val": "1"
            },
            "OutputFixed": { "-val": "0" },
            "HeadphoneConnected": { "-val": "0" },
            "SpeakerSize": { "-val": "3" },
            "SubGain": { "-val": "0" },
            "SubCrossover": { "-val": "0" },
            "SubPolarity": { "-val": "0" },
            "SubEnabled": { "-val": "1" },
            "PresetNameList": "FactoryDefaults"
          }
        }
      }
    }
  }
}
> The raw event is: NOTIFY /Connection Manager HTTP/1.1
HOST: 192.168.1.41:3401
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 1925
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E585445BA01400_sub0000002815
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><SourceProtocolInfo></SourceProtocolInfo></e:property><e:property><SinkProtocolInfo>http-get:*:audio/mp3:*,x-file-cifs:*:audio/mp3:*,http-get:*:audio/mp4:*,x-file-cifs:*:audio/mp4:*,http-get:*:audio/mpeg:*,x-file-cifs:*:audio/mpeg:*,http-get:*:audio/mpegurl:*,x-file-cifs:*:audio/mpegurl:*,real.com-rhapsody-http-1-0:*:audio/mpegurl:*,file:*:audio/mpegurl:*,http-get:*:audio/mpeg3:*,x-file-cifs:*:audio/mpeg3:*,http-get:*:audio/wav:*,x-file-cifs:*:audio/wav:*,http-get:*:audio/wma:*,x-file-cifs:*:audio/wma:*,http-get:*:audio/x-ms-wma:*,x-file-cifs:*:audio/x-ms-wma:*,http-get:*:audio/aiff:*,x-file-cifs:*:audio/aiff:*,http-get:*:audio/flac:*,x-file-cifs:*:audio/flac:*,http-get:*:application/ogg:*,x-file-cifs:*:application/ogg:*,http-get:*:audio/audible:*,x-file-cifs:*:audio/audible:*,real.com-rhapsody-http-1-0:*:audio/x-ms-wma:*,real.com-rhapsody-direct:*:audio/mp3:*,sonos.com-mms:*:audio/x-ms-wma:*,sonos.com-http:*:audio/mpeg3:*,sonos.com-http:*:audio/mpeg:*,sonos.com-http:*:audio/wma:*,sonos.com-http:*:audio/mp4:*,sonos.com-http:*:audio/wav:*,sonos.com-http:*:audio/aiff:*,sonos.com-http:*:audio/flac:*,sonos.com-http:*:application/ogg:*,sonos.com-spotify:*:audio/x-spotify:*,sonos.com-rtrecent:*:audio/x-sonos-recent:*,real.com-rhapsody-http-1-0:*:audio/x-rhap-radio:*,real.com-rhapsody-direct:*:audio/x-rhap-radio:*,pandora.com-pndrradio:*:audio/x-pandora-radio:*,pandora.com-pndrradio-http:*:audio/mpeg3:*,sirius.com-sirradio:*:audio/x-sirius-radio:*,x-rincon:*:*:*,x-rincon-mp3radio:*:*:*,x-rincon-playlist:*:*:*,x-rincon-queue:*:*:*,x-rincon-stream:*:*:*,x-sonosapi-stream:*:*:*,x-sonosapi-radio:*:audio/x-sonosapi-radio:*,x-rincon-cpcontainer:*:*:*,last.fm-radio:*:audio/x-lastfm-radio:*,last.fm-radio-http:*:audio/mpeg3:*</SinkProtocolInfo></e:property><e:property><CurrentConnectionIDs></CurrentConnectionIDs></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      {
        
      },
      { "SinkProtocolInfo": "http-get:*:audio/mp3:*,x-file-cifs:*:audio/mp3:*,http-get:*:audio/mp4:*,x-file-cifs:*:audio/mp4:*,http-get:*:audio/mpeg:*,x-file-cifs:*:audio/mpeg:*,http-get:*:audio/mpegurl:*,x-file-cifs:*:audio/mpegurl:*,real.com-rhapsody-http-1-0:*:audio/mpegurl:*,file:*:audio/mpegurl:*,http-get:*:audio/mpeg3:*,x-file-cifs:*:audio/mpeg3:*,http-get:*:audio/wav:*,x-file-cifs:*:audio/wav:*,http-get:*:audio/wma:*,x-file-cifs:*:audio/wma:*,http-get:*:audio/x-ms-wma:*,x-file-cifs:*:audio/x-ms-wma:*,http-get:*:audio/aiff:*,x-file-cifs:*:audio/aiff:*,http-get:*:audio/flac:*,x-file-cifs:*:audio/flac:*,http-get:*:application/ogg:*,x-file-cifs:*:application/ogg:*,http-get:*:audio/audible:*,x-file-cifs:*:audio/audible:*,real.com-rhapsody-http-1-0:*:audio/x-ms-wma:*,real.com-rhapsody-direct:*:audio/mp3:*,sonos.com-mms:*:audio/x-ms-wma:*,sonos.com-http:*:audio/mpeg3:*,sonos.com-http:*:audio/mpeg:*,sonos.com-http:*:audio/wma:*,sonos.com-http:*:audio/mp4:*,sonos.com-http:*:audio/wav:*,sonos.com-http:*:audio/aiff:*,sonos.com-http:*:audio/flac:*,sonos.com-http:*:application/ogg:*,sonos.com-spotify:*:audio/x-spotify:*,sonos.com-rtrecent:*:audio/x-sonos-recent:*,real.com-rhapsody-http-1-0:*:audio/x-rhap-radio:*,real.com-rhapsody-direct:*:audio/x-rhap-radio:*,pandora.com-pndrradio:*:audio/x-pandora-radio:*,pandora.com-pndrradio-http:*:audio/mpeg3:*,sirius.com-sirradio:*:audio/x-sirius-radio:*,x-rincon:*:*:*,x-rincon-mp3radio:*:*:*,x-rincon-playlist:*:*:*,x-rincon-queue:*:*:*,x-rincon-stream:*:*:*,x-sonosapi-stream:*:*:*,x-sonosapi-radio:*:audio/x-sonosapi-radio:*,x-rincon-cpcontainer:*:*:*,last.fm-radio:*:audio/x-lastfm-radio:*,last.fm-radio-http:*:audio/mpeg3:*" },
      {
        
      }
    ]
  }
}
> Subscribing to events
> The raw event is: NOTIFY /Transport Event HTTP/1.1
HOST: 192.168.1.41:3401
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 4636
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E585445BA01400_sub0000002816
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><LastChange>&lt;Event xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/AVT/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot;&gt;&lt;InstanceID val=&quot;0&quot;&gt;&lt;TransportState val=&quot;STOPPED&quot;/&gt;&lt;CurrentPlayMode val=&quot;NORMAL&quot;/&gt;&lt;CurrentCrossfadeMode val=&quot;0&quot;/&gt;&lt;NumberOfTracks val=&quot;73&quot;/&gt;&lt;CurrentTrack val=&quot;1&quot;/&gt;&lt;CurrentSection val=&quot;0&quot;/&gt;&lt;CurrentTrackURI val=&quot;x-sonos-spotify:spotify%3atrack%3a7m6RmxKfpsVs8UzF5duu8A?sid=9&amp;amp;flags=0&quot;/&gt;&lt;CurrentTrackDuration val=&quot;0:04:10&quot;/&gt;&lt;CurrentTrackMetaData val=&quot;&amp;lt;DIDL-Lite xmlns:dc=&amp;quot;http://purl.org/dc/elements/1.1/&amp;quot; xmlns:upnp=&amp;quot;urn:schemas-upnp-org:metadata-1-0/upnp/&amp;quot; xmlns:r=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot; xmlns=&amp;quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&amp;quot;&amp;gt;&amp;lt;item id=&amp;quot;-1&amp;quot; parentID=&amp;quot;-1&amp;quot; restricted=&amp;quot;true&amp;quot;&amp;gt;&amp;lt;res protocolInfo=&amp;quot;sonos.com-spotify:*:audio/x-spotify:*&amp;quot; duration=&amp;quot;0:04:10&amp;quot;&amp;gt;x-sonos-spotify:spotify%3atrack%3a7m6RmxKfpsVs8UzF5duu8A?sid=9&amp;amp;amp;flags=0&amp;lt;/res&amp;gt;&amp;lt;r:streamContent&amp;gt;&amp;lt;/r:streamContent&amp;gt;&amp;lt;r:radioShowMd&amp;gt;&amp;lt;/r:radioShowMd&amp;gt;&amp;lt;upnp:albumArtURI&amp;gt;/getaa?s=1&amp;amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a7m6RmxKfpsVs8UzF5duu8A%3fsid%3d9%26flags%3d0&amp;lt;/upnp:albumArtURI&amp;gt;&amp;lt;dc:title&amp;gt;Kiss Kiss&amp;lt;/dc:title&amp;gt;&amp;lt;upnp:class&amp;gt;object.item.audioItem.musicTrack&amp;lt;/upnp:class&amp;gt;&amp;lt;dc:creator&amp;gt;Chris Brown featuring T-Pain&amp;lt;/dc:creator&amp;gt;&amp;lt;upnp:album&amp;gt;Exclusive&amp;lt;/upnp:album&amp;gt;&amp;lt;/item&amp;gt;&amp;lt;/DIDL-Lite&amp;gt;&quot;/&gt;&lt;r:NextTrackURI val=&quot;x-sonos-spotify:spotify%3atrack%3a7Irp5B9hUwbLQ1bSOJhxoa?sid=9&amp;amp;flags=0&quot;/&gt;&lt;r:NextTrackMetaData val=&quot;&amp;lt;DIDL-Lite xmlns:dc=&amp;quot;http://purl.org/dc/elements/1.1/&amp;quot; xmlns:upnp=&amp;quot;urn:schemas-upnp-org:metadata-1-0/upnp/&amp;quot; xmlns:r=&amp;quot;urn:schemas-rinconnetworks-com:metadata-1-0/&amp;quot; xmlns=&amp;quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&amp;quot;&amp;gt;&amp;lt;item id=&amp;quot;-1&amp;quot; parentID=&amp;quot;-1&amp;quot; restricted=&amp;quot;true&amp;quot;&amp;gt;&amp;lt;res protocolInfo=&amp;quot;sonos.com-spotify:*:audio/x-spotify:*&amp;quot; duration=&amp;quot;0:03:33&amp;quot;&amp;gt;x-sonos-spotify:spotify%3atrack%3a7Irp5B9hUwbLQ1bSOJhxoa?sid=9&amp;amp;amp;flags=0&amp;lt;/res&amp;gt;&amp;lt;upnp:albumArtURI&amp;gt;/getaa?s=1&amp;amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a7Irp5B9hUwbLQ1bSOJhxoa%3fsid%3d9%26flags%3d0&amp;lt;/upnp:albumArtURI&amp;gt;&amp;lt;dc:title&amp;gt;Faded&amp;lt;/dc:title&amp;gt;&amp;lt;upnp:class&amp;gt;object.item.audioItem.musicTrack&amp;lt;/upnp:class&amp;gt;&amp;lt;dc:creator&amp;gt;Tyga&amp;lt;/dc:creator&amp;gt;&amp;lt;upnp:album&amp;gt;Faded&amp;lt;/upnp:album&amp;gt;&amp;lt;/item&amp;gt;&amp;lt;/DIDL-Lite&amp;gt;&quot;/&gt;&lt;r:EnqueuedTransportURI val=&quot;file:///jffs/settings/trackqueue.rsq#0&quot;/&gt;&lt;r:EnqueuedTransportURIMetaData val=&quot;&quot;/&gt;&lt;PlaybackStorageMedium val=&quot;NETWORK&quot;/&gt;&lt;AVTransportURI val=&quot;x-rincon-queue:RINCON_000E585445BA01400#0&quot;/&gt;&lt;AVTransportURIMetaData val=&quot;&quot;/&gt;&lt;CurrentTransportActions val=&quot;Set, Play, Stop, Pause, Seek, Next, Previous&quot;/&gt;&lt;TransportStatus val=&quot;OK&quot;/&gt;&lt;r:SleepTimerGeneration val=&quot;0&quot;/&gt;&lt;r:AlarmRunning val=&quot;0&quot;/&gt;&lt;r:SnoozeRunning val=&quot;0&quot;/&gt;&lt;r:RestartPending val=&quot;0&quot;/&gt;&lt;TransportPlaySpeed val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;CurrentMediaDuration val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;RecordStorageMedium val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;PossiblePlaybackStorageMedia val=&quot;NONE, NETWORK&quot;/&gt;&lt;PossibleRecordStorageMedia val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;RecordMediumWriteStatus val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;CurrentRecordQualityMode val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;PossibleRecordQualityModes val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;NextAVTransportURI val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;NextAVTransportURIMetaData val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;/InstanceID&gt;&lt;/Event&gt;</LastChange></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": {
      "LastChange": {
        "Event": {
          "-xmlns": "urn:schemas-upnp-org:metadata-1-0/AVT/",
          "-xmlns:r": "urn:schemas-rinconnetworks-com:metadata-1-0/",
          "InstanceID": {
            "-val": "0",
            "TransportState": { "-val": "STOPPED" },
            "CurrentPlayMode": { "-val": "NORMAL" },
            "CurrentCrossfadeMode": { "-val": "0" },
            "NumberOfTracks": { "-val": "73" },
            "CurrentTrack": { "-val": "1" },
            "CurrentSection": { "-val": "0" },
            "CurrentTrackURI": { "-val": "x-sonos-spotify:spotify%3atrack%3a7m6RmxKfpsVs8UzF5duu8A?sid=9&amp;flags=0" },
            "CurrentTrackDuration": { "-val": "0:04:10" },
            "CurrentTrackMetaData": { "-val": "&lt;DIDL-Lite xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot; xmlns:upnp=&quot;urn:schemas-upnp-org:metadata-1-0/upnp/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot; xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&quot;&gt;&lt;item id=&quot;-1&quot; parentID=&quot;-1&quot; restricted=&quot;true&quot;&gt;&lt;res protocolInfo=&quot;sonos.com-spotify:*:audio/x-spotify:*&quot; duration=&quot;0:04:10&quot;&gt;x-sonos-spotify:spotify%3atrack%3a7m6RmxKfpsVs8UzF5duu8A?sid=9&amp;amp;flags=0&lt;/res&gt;&lt;r:streamContent&gt;&lt;/r:streamContent&gt;&lt;r:radioShowMd&gt;&lt;/r:radioShowMd&gt;&lt;upnp:albumArtURI&gt;/getaa?s=1&amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a7m6RmxKfpsVs8UzF5duu8A%3fsid%3d9%26flags%3d0&lt;/upnp:albumArtURI&gt;&lt;dc:title&gt;Kiss Kiss&lt;/dc:title&gt;&lt;upnp:class&gt;object.item.audioItem.musicTrack&lt;/upnp:class&gt;&lt;dc:creator&gt;Chris Brown featuring T-Pain&lt;/dc:creator&gt;&lt;upnp:album&gt;Exclusive&lt;/upnp:album&gt;&lt;/item&gt;&lt;/DIDL-Lite&gt;" },
            "r:NextTrackURI": { "-val": "x-sonos-spotify:spotify%3atrack%3a7Irp5B9hUwbLQ1bSOJhxoa?sid=9&amp;flags=0" },
            "r:NextTrackMetaData": { "-val": "&lt;DIDL-Lite xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot; xmlns:upnp=&quot;urn:schemas-upnp-org:metadata-1-0/upnp/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot; xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/&quot;&gt;&lt;item id=&quot;-1&quot; parentID=&quot;-1&quot; restricted=&quot;true&quot;&gt;&lt;res protocolInfo=&quot;sonos.com-spotify:*:audio/x-spotify:*&quot; duration=&quot;0:03:33&quot;&gt;x-sonos-spotify:spotify%3atrack%3a7Irp5B9hUwbLQ1bSOJhxoa?sid=9&amp;amp;flags=0&lt;/res&gt;&lt;upnp:albumArtURI&gt;/getaa?s=1&amp;amp;u=x-sonos-spotify%3aspotify%253atrack%253a7Irp5B9hUwbLQ1bSOJhxoa%3fsid%3d9%26flags%3d0&lt;/upnp:albumArtURI&gt;&lt;dc:title&gt;Faded&lt;/dc:title&gt;&lt;upnp:class&gt;object.item.audioItem.musicTrack&lt;/upnp:class&gt;&lt;dc:creator&gt;Tyga&lt;/dc:creator&gt;&lt;upnp:album&gt;Faded&lt;/upnp:album&gt;&lt;/item&gt;&lt;/DIDL-Lite&gt;" },
            "r:EnqueuedTransportURI": { "-val": "file:///jffs/settings/trackqueue.rsq#0" },
            "r:EnqueuedTransportURIMetaData": {
              
            },
            "PlaybackStorageMedium": { "-val": "NETWORK" },
            "AVTransportURI": { "-val": "x-rincon-queue:RINCON_000E585445BA01400#0" },
            "AVTransportURIMetaData": {
              
            },
            "CurrentTransportActions": { "-val": "Set, Play, Stop, Pause, Seek, Next, Previous" },
            "TransportStatus": { "-val": "OK" },
            "r:SleepTimerGeneration": { "-val": "0" },
            "r:AlarmRunning": { "-val": "0" },
            "r:SnoozeRunning": { "-val": "0" },
            "r:RestartPending": { "-val": "0" },
            "TransportPlaySpeed": { "-val": "NOT_IMPLEMENTED" },
            "CurrentMediaDuration": { "-val": "NOT_IMPLEMENTED" },
            "RecordStorageMedium": { "-val": "NOT_IMPLEMENTED" },
            "PossiblePlaybackStorageMedia": { "-val": "NONE, NETWORK" },
            "PossibleRecordStorageMedia": { "-val": "NOT_IMPLEMENTED" },
            "RecordMediumWriteStatus": { "-val": "NOT_IMPLEMENTED" },
            "CurrentRecordQualityMode": { "-val": "NOT_IMPLEMENTED" },
            "PossibleRecordQualityModes": { "-val": "NOT_IMPLEMENTED" },
            "NextAVTransportURI": { "-val": "NOT_IMPLEMENTED" },
            "NextAVTransportURIMetaData": { "-val": "NOT_IMPLEMENTED" }
          }
        }
      }
    }
  }
}
> The raw event is: NOTIFY /Alarm Clock HTTP/1.1
HOST: 192.168.1.41:3409
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 629
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58289F2E01400_sub0000002487
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><TimeZone>00000a000502000003000501ffc4</TimeZone></e:property><e:property><TimeServer>0.sonostime.pool.ntp.org,1.sonostime.pool.ntp.org,2.sonostime.pool.ntp.org,3.sonostime.pool.ntp.org</TimeServer></e:property><e:property><TimeGeneration>3</TimeGeneration></e:property><e:property><AlarmListVersion>RINCON_000E5828228801400:22</AlarmListVersion></e:property><e:property><TimeFormat>INV</TimeFormat></e:property><e:property><DateFormat>INV</DateFormat></e:property><e:property><DailyIndexRefreshTime>02:00:00</DailyIndexRefreshTime></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "TimeZone": "00000a000502000003000501ffc4" },
      { "TimeServer": "0.sonostime.pool.ntp.org,1.sonostime.pool.ntp.org,2.sonostime.pool.ntp.org,3.sonostime.pool.ntp.org" },
      { "TimeGeneration": "3" },
      { "AlarmListVersion": "RINCON_000E5828228801400:22" },
      { "TimeFormat": "INV" },
      { "DateFormat": "INV" },
      { "DailyIndexRefreshTime": "02:00:00" }
    ]
  }
}
> The raw event is: NOTIFY /Music Services HTTP/1.1
HOST: 192.168.1.41:3409
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 166
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58289F2E01400_sub0000002488
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ServiceListVersion>RINCON_000E5828228801400:943</ServiceListVersion></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": { "ServiceListVersion": "RINCON_000E5828228801400:943" }
  }
}
> The raw event is: NOTIFY /Audio In HTTP/1.1
HOST: 192.168.1.41:3409
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 360
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58289F2E01400_sub0000002489
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><AudioInputName>Line-In</AudioInputName></e:property><e:property><Icon></Icon></e:property><e:property><LineInConnected>0</LineInConnected></e:property><e:property><LeftLineInLevel>1</LeftLineInLevel></e:property><e:property><RightLineInLevel>1</RightLineInLevel></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "AudioInputName": "Line-In" },
      {
        
      },
      { "LineInConnected": "0" },
      { "LeftLineInLevel": "1" },
      { "RightLineInLevel": "1" }
    ]
  }
}
> The raw event is: NOTIFY /Device Properties HTTP/1.1
HOST: 192.168.1.41:3409
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 708
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58289F2E01400_sub0000002490
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneName>Dining Room</ZoneName></e:property><e:property><Icon>x-rincon-roomicon:dining</Icon></e:property><e:property><Invisible>0</Invisible></e:property><e:property><IsZoneBridge>0</IsZoneBridge></e:property><e:property><SettingsReplicationState>RINCON_000E5828228801400,17,RINCON_FFFFFFFFFFFF99999,0,RINCON_000E58283BD401400,48,RINCON_000E5828228801400,216,RINCON_000E5828228801400,87,RINCON_000E5828A1C401400,58,RINCON_000E5828228801400,943,RINCON_000E5855842601400,76,RINCON_000E5828228801400,4,RINCON_000E5828A1C401400,27</SettingsReplicationState></e:property><e:property><ChannelMapSet></ChannelMapSet></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "ZoneName": "Dining Room" },
      { "Icon": "x-rincon-roomicon:dining" },
      { "Invisible": "0" },
      { "IsZoneBridge": "0" },
      { "SettingsReplicationState": "RINCON_000E5828228801400,17,RINCON_FFFFFFFFFFFF99999,0,RINCON_000E58283BD401400,48,RINCON_000E5828228801400,216,RINCON_000E5828228801400,87,RINCON_000E5828A1C401400,58,RINCON_000E5828228801400,943,RINCON_000E5855842601400,76,RINCON_000E5828228801400,4,RINCON_000E5828A1C401400,27" },
      {
        
      }
    ]
  }
}
> The raw event is: NOTIFY /Zone Group HTTP/1.1
HOST: 192.168.1.41:3409
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 5809
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58289F2E01400_sub0000002491
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><ZoneGroupState>&lt;ZoneGroups&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A20201400&quot; ID=&quot;RINCON_000E5828A20201400:185&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A20201400&quot; Location=&quot;http://192.168.1.36:1400/xml/device_description.xml&quot; ZoneName=&quot;Master Bed&quot; Icon=&quot;x-rincon-roomicon:masterbedroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;97&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283BD401400&quot; ID=&quot;RINCON_000E58283BD401400:177&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283BD401400&quot; Location=&quot;http://192.168.1.38:1400/xml/device_description.xml&quot; ZoneName=&quot;Bathroom&quot; Icon=&quot;x-rincon-roomicon:bathroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;110&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58283AC801400&quot; ID=&quot;RINCON_000E58283AC801400:103&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58283AC801400&quot; Location=&quot;http://192.168.1.27:1400/xml/device_description.xml&quot; ZoneName=&quot;TV Room&quot; Icon=&quot;x-rincon-roomicon:tvroom&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;102&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E585445BA01400&quot; ID=&quot;RINCON_000E585445BA01400:6&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E585445BA01400&quot; Location=&quot;http://192.168.1.28:1400/xml/device_description.xml&quot; ZoneName=&quot;Lauren Room&quot; Icon=&quot;x-rincon-roomicon:living&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;15&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5855842601400&quot; ID=&quot;RINCON_000E5855842601400:17&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58980FE001400&quot; Location=&quot;http://192.168.1.32:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; Invisible=&quot;1&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;14&quot;/&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5855842601400&quot; Location=&quot;http://192.168.1.26:1400/xml/device_description.xml&quot; ZoneName=&quot;Office&quot; Icon=&quot;x-rincon-roomicon:office&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; ChannelMapSet=&quot;RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW&quot; BootSeq=&quot;9&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828228801400&quot; ID=&quot;RINCON_000E58283BD401400:176&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828228801400&quot; Location=&quot;http://192.168.1.37:1400/xml/device_description.xml&quot; ZoneName=&quot;Kitchen&quot; Icon=&quot;x-rincon-roomicon:kitchen&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;95&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E5828A1C401400&quot; ID=&quot;RINCON_000E5828A1C401400:76&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E5828A1C401400&quot; Location=&quot;http://192.168.1.34:1400/xml/device_description.xml&quot; ZoneName=&quot;Record Player&quot; Icon=&quot;x-rincon-roomicon:den&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;47&quot;/&gt;&lt;/ZoneGroup&gt;&lt;ZoneGroup Coordinator=&quot;RINCON_000E58289F2E01400&quot; ID=&quot;RINCON_000E58289F2E01400:106&quot;&gt;&lt;ZoneGroupMember UUID=&quot;RINCON_000E58289F2E01400&quot; Location=&quot;http://192.168.1.39:1400/xml/device_description.xml&quot; ZoneName=&quot;Dining Room&quot; Icon=&quot;x-rincon-roomicon:dining&quot; SoftwareVersion=&quot;19.3-53220b&quot; MinCompatibleVersion=&quot;19.1-00000&quot; BootSeq=&quot;99&quot;/&gt;&lt;/ZoneGroup&gt;&lt;/ZoneGroups&gt;</ZoneGroupState></e:property><e:property><ThirdPartyMediaServersX>2:XWH8VU47qCgw57pthEopUFtloj67LzoG6PhfJIxzrgTAf0DedhsjIx7LHjiTLpfPjLhqZrN97t2KLdLoisP2ydmsbyC4n7mWuYn0uuL9RgIDwIbRE5Dg3hv+V+T6536I6QcJKjkHljsAZQSCdajatm3fXB7xuhw7K074MFaNC2+T+U1y7RED1Yo40Tj9okTZ2a+DehsoneD8hkUJrulMEeiGYmwLk+m00hdOx8RpPPI0bf2hPr226O5S4qntByStFY+pj7xEsmsiLeSZe+6TGF7hgoies45U0DPOdR4n+bGdXQHrK1GWU9EfuyGpNd3Wd+5RcEPkgE8TwB1SpwMt7Cv+q2N5800Jq6XtqRrue3vw8T7FaHEz23Vg/P+bVwQS8WVKkwO8gVsV+uxRb5WoC70IFi/Ytb66K2+co3pw8QMdgydij2+WQYzzgSS85V/U0VqtPoJqNWozrzX1O6ovKcHcBH12GbANpLoBSqe8i+KLzWfHKakVWPr6J/8Fb2NDkGTzMPBbBqfNx4nRn+LkPCF7laDaGmNoT2tcP1c3FyL6QtL5RD3Zpd3OmZ+LwKtMA58dToo1N/fudMZv7wSBnZTE5aaRPmxedMMPU0NvCTlBPqxKFnEuk0ixuZgmFVsDoNFv0D/+748wPna7iaM2mQe7DlVc73Rjhd4/FvN53B1GE6opUsirVjBXIhtxN6dN8CdKi3B8gS/31YKstyJ4rTgm3zVb4YqRNkkYGGiqNgBjnnZRbtc2nHo/9f0N8PkCRY4Hnw54zDT0KqiF/mobTFPr61H74SQB1BdPcRXLHUTWzg3sGUVLrLQY/XJ4WFFq1QQm0pTtfi4cB6qmkHvpe1YfH3uI6AqqaVU737zFV8YpnRcfvxCmF9VcaNJGdtpiu+eFfDHxkVPH/ssT4t8+Amlnl7YCoesfzDAHdMKCec0=</ThirdPartyMediaServersX></e:property><e:property><AvailableSoftwareUpdate>&lt;UpdateItem xmlns=&quot;urn:schemas-rinconnetworks-com:update-1-0&quot; Type=&quot;Software&quot; Version=&quot;19.3-53220&quot; UpdateURL=&quot;http://update.sonos.com/firmware/Gold/v3.8-Hammer-RC2/^19.3-53220&quot; DownloadSize=&quot;0&quot; ManifestURL=&quot;http://update.sonos.com/firmware/Gold/v3.8.2-Hammer-Patch-MDCR/update_1344386463.upm&quot;/&gt;</AvailableSoftwareUpdate></e:property><e:property><AlarmRunSequence>RINCON_000E58289F2E01400:99:0</AlarmRunSequence></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      {
        "ZoneGroupState": {
          "ZoneGroups": {
            "ZoneGroup": [
              {
                "-Coordinator": "RINCON_000E5828A20201400",
                "-ID": "RINCON_000E5828A20201400:185",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828A20201400",
                  "-Location": "http://192.168.1.36:1400/xml/device_description.xml",
                  "-ZoneName": "Master Bed",
                  "-Icon": "x-rincon-roomicon:masterbedroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "97"
                }
              },
              {
                "-Coordinator": "RINCON_000E58283BD401400",
                "-ID": "RINCON_000E58283BD401400:177",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58283BD401400",
                  "-Location": "http://192.168.1.38:1400/xml/device_description.xml",
                  "-ZoneName": "Bathroom",
                  "-Icon": "x-rincon-roomicon:bathroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "110"
                }
              },
              {
                "-Coordinator": "RINCON_000E58283AC801400",
                "-ID": "RINCON_000E58283AC801400:103",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58283AC801400",
                  "-Location": "http://192.168.1.27:1400/xml/device_description.xml",
                  "-ZoneName": "TV Room",
                  "-Icon": "x-rincon-roomicon:tvroom",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "102"
                }
              },
              {
                "-Coordinator": "RINCON_000E585445BA01400",
                "-ID": "RINCON_000E585445BA01400:6",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E585445BA01400",
                  "-Location": "http://192.168.1.28:1400/xml/device_description.xml",
                  "-ZoneName": "Lauren Room",
                  "-Icon": "x-rincon-roomicon:living",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "15"
                }
              },
              {
                "-Coordinator": "RINCON_000E5855842601400",
                "-ID": "RINCON_000E5855842601400:17",
                "ZoneGroupMember": [
                  {
                    "-UUID": "RINCON_000E58980FE001400",
                    "-Location": "http://192.168.1.32:1400/xml/device_description.xml",
                    "-ZoneName": "Office",
                    "-Icon": "x-rincon-roomicon:office",
                    "-Invisible": "1",
                    "-SoftwareVersion": "19.3-53220b",
                    "-MinCompatibleVersion": "19.1-00000",
                    "-ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW",
                    "-BootSeq": "14"
                  },
                  {
                    "-UUID": "RINCON_000E5855842601400",
                    "-Location": "http://192.168.1.26:1400/xml/device_description.xml",
                    "-ZoneName": "Office",
                    "-Icon": "x-rincon-roomicon:office",
                    "-SoftwareVersion": "19.3-53220b",
                    "-MinCompatibleVersion": "19.1-00000",
                    "-ChannelMapSet": "RINCON_000E5855842601400:LF,RF;RINCON_000E58980FE001400:SW,SW",
                    "-BootSeq": "9"
                  }
                ]
              },
              {
                "-Coordinator": "RINCON_000E5828228801400",
                "-ID": "RINCON_000E58283BD401400:176",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828228801400",
                  "-Location": "http://192.168.1.37:1400/xml/device_description.xml",
                  "-ZoneName": "Kitchen",
                  "-Icon": "x-rincon-roomicon:kitchen",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "95"
                }
              },
              {
                "-Coordinator": "RINCON_000E5828A1C401400",
                "-ID": "RINCON_000E5828A1C401400:76",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E5828A1C401400",
                  "-Location": "http://192.168.1.34:1400/xml/device_description.xml",
                  "-ZoneName": "Record Player",
                  "-Icon": "x-rincon-roomicon:den",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "47"
                }
              },
              {
                "-Coordinator": "RINCON_000E58289F2E01400",
                "-ID": "RINCON_000E58289F2E01400:106",
                "ZoneGroupMember": {
                  "-UUID": "RINCON_000E58289F2E01400",
                  "-Location": "http://192.168.1.39:1400/xml/device_description.xml",
                  "-ZoneName": "Dining Room",
                  "-Icon": "x-rincon-roomicon:dining",
                  "-SoftwareVersion": "19.3-53220b",
                  "-MinCompatibleVersion": "19.1-00000",
                  "-BootSeq": "99"
                }
              }
            ]
          }
        }
      },
      { "ThirdPartyMediaServersX": "2:XWH8VU47qCgw57pthEopUFtloj67LzoG6PhfJIxzrgTAf0DedhsjIx7LHjiTLpfPjLhqZrN97t2KLdLoisP2ydmsbyC4n7mWuYn0uuL9RgIDwIbRE5Dg3hv+V+T6536I6QcJKjkHljsAZQSCdajatm3fXB7xuhw7K074MFaNC2+T+U1y7RED1Yo40Tj9okTZ2a+DehsoneD8hkUJrulMEeiGYmwLk+m00hdOx8RpPPI0bf2hPr226O5S4qntByStFY+pj7xEsmsiLeSZe+6TGF7hgoies45U0DPOdR4n+bGdXQHrK1GWU9EfuyGpNd3Wd+5RcEPkgE8TwB1SpwMt7Cv+q2N5800Jq6XtqRrue3vw8T7FaHEz23Vg/P+bVwQS8WVKkwO8gVsV+uxRb5WoC70IFi/Ytb66K2+co3pw8QMdgydij2+WQYzzgSS85V/U0VqtPoJqNWozrzX1O6ovKcHcBH12GbANpLoBSqe8i+KLzWfHKakVWPr6J/8Fb2NDkGTzMPBbBqfNx4nRn+LkPCF7laDaGmNoT2tcP1c3FyL6QtL5RD3Zpd3OmZ+LwKtMA58dToo1N/fudMZv7wSBnZTE5aaRPmxedMMPU0NvCTlBPqxKFnEuk0ixuZgmFVsDoNFv0D/+748wPna7iaM2mQe7DlVc73Rjhd4/FvN53B1GE6opUsirVjBXIhtxN6dN8CdKi3B8gS/31YKstyJ4rTgm3zVb4YqRNkkYGGiqNgBjnnZRbtc2nHo/9f0N8PkCRY4Hnw54zDT0KqiF/mobTFPr61H74SQB1BdPcRXLHUTWzg3sGUVLrLQY/XJ4WFFq1QQm0pTtfi4cB6qmkHvpe1YfH3uI6AqqaVU737zFV8YpnRcfvxCmF9VcaNJGdtpiu+eFfDHxkVPH/ssT4t8+Amlnl7YCoesfzDAHdMKCec0=" },
      {
        "AvailableSoftwareUpdate": {
          "UpdateItem": {
            "-xmlns": "urn:schemas-rinconnetworks-com:update-1-0",
            "-Type": "Software",
            "-Version": "19.3-53220",
            "-UpdateURL": "http://update.sonos.com/firmware/Gold/v3.8-Hammer-RC2/^19.3-53220",
            "-DownloadSize": "0",
            "-ManifestURL": "http://update.sonos.com/firmware/Gold/v3.8.2-Hammer-Patch-MDCR/update_1344386463.upm"
          }
        }
      },
      { "AlarmRunSequence": "RINCON_000E58289F2E01400:99:0" }
    ]
  }
}
> The raw event is: NOTIFY /Group Management HTTP/1.1
HOST: 192.168.1.41:3409
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 235
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58289F2E01400_sub0000002492
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><GroupCoordinatorIsLocal>1</GroupCoordinatorIsLocal></e:property><e:property><LocalGroupUUID>RINCON_000E58289F2E01400:106</LocalGroupUUID></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "GroupCoordinatorIsLocal": "1" },
      { "LocalGroupUUID": "RINCON_000E58289F2E01400:106" }
    ]
  }
}
> The raw event is: NOTIFY /Content Directory HTTP/1.1
HOST: 192.168.1.41:3409
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 906
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58289F2E01400_sub0000002493
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><SystemUpdateID>2</SystemUpdateID></e:property><e:property><ContainerUpdateIDs>S:,1</ContainerUpdateIDs></e:property><e:property><ShareListRefreshState>NOTRUN</ShareListRefreshState></e:property><e:property><ShareIndexInProgress>0</ShareIndexInProgress></e:property><e:property><ShareIndexLastError></ShareIndexLastError></e:property><e:property><RadioFavoritesUpdateID>RINCON_000E5828228801400,17</RadioFavoritesUpdateID></e:property><e:property><RadioLocationUpdateID>RINCON_000E5828228801400,87</RadioLocationUpdateID></e:property><e:property><SavedQueuesUpdateID>RINCON_000E58283BD401400,48</SavedQueuesUpdateID></e:property><e:property><ShareListUpdateID>RINCON_000E5828228801400,216</ShareListUpdateID></e:property><e:property><RecentlyPlayedUpdateID>RINCON_000E5855842601400,76</RecentlyPlayedUpdateID></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      { "SystemUpdateID": "2" },
      { "ContainerUpdateIDs": "S:,1" },
      { "ShareListRefreshState": "NOTRUN" },
      { "ShareIndexInProgress": "0" },
      {
        
      },
      { "RadioFavoritesUpdateID": "RINCON_000E5828228801400,17" },
      { "RadioLocationUpdateID": "RINCON_000E5828228801400,87" },
      { "SavedQueuesUpdateID": "RINCON_000E58283BD401400,48" },
      { "ShareListUpdateID": "RINCON_000E5828228801400,216" },
      { "RecentlyPlayedUpdateID": "RINCON_000E5855842601400,76" }
    ]
  }
}
> The raw event is: NOTIFY /Render Control HTTP/1.1
HOST: 192.168.1.41:3409
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 1062
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58289F2E01400_sub0000002494
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><LastChange>&lt;Event xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/RCS/&quot;&gt;&lt;InstanceID val=&quot;0&quot;&gt;&lt;Volume channel=&quot;Master&quot; val=&quot;15&quot;/&gt;&lt;Volume channel=&quot;LF&quot; val=&quot;100&quot;/&gt;&lt;Volume channel=&quot;RF&quot; val=&quot;100&quot;/&gt;&lt;Mute channel=&quot;Master&quot; val=&quot;0&quot;/&gt;&lt;Mute channel=&quot;LF&quot; val=&quot;0&quot;/&gt;&lt;Mute channel=&quot;RF&quot; val=&quot;0&quot;/&gt;&lt;Bass val=&quot;10&quot;/&gt;&lt;Treble val=&quot;10&quot;/&gt;&lt;Loudness channel=&quot;Master&quot; val=&quot;1&quot;/&gt;&lt;OutputFixed val=&quot;0&quot;/&gt;&lt;HeadphoneConnected val=&quot;0&quot;/&gt;&lt;SpeakerSize val=&quot;-1&quot;/&gt;&lt;SubGain val=&quot;0&quot;/&gt;&lt;SubCrossover val=&quot;0&quot;/&gt;&lt;SubPolarity val=&quot;0&quot;/&gt;&lt;SubEnabled val=&quot;1&quot;/&gt;&lt;PresetNameList&gt;FactoryDefaults&lt;/PresetNameList&gt;&lt;/InstanceID&gt;&lt;/Event&gt;</LastChange></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": {
      "LastChange": {
        "Event": {
          "-xmlns": "urn:schemas-upnp-org:metadata-1-0/RCS/",
          "InstanceID": {
            "-val": "0",
            "Volume": [
              {
                "-channel": "Master",
                "-val": "15"
              },
              {
                "-channel": "LF",
                "-val": "100"
              },
              {
                "-channel": "RF",
                "-val": "100"
              }
            ],
            "Mute": [
              {
                "-channel": "Master",
                "-val": "0"
              },
              {
                "-channel": "LF",
                "-val": "0"
              },
              {
                "-channel": "RF",
                "-val": "0"
              }
            ],
            "Bass": { "-val": "10" },
            "Treble": { "-val": "10" },
            "Loudness": {
              "-channel": "Master",
              "-val": "1"
            },
            "OutputFixed": { "-val": "0" },
            "HeadphoneConnected": { "-val": "0" },
            "SpeakerSize": { "-val": "-1" },
            "SubGain": { "-val": "0" },
            "SubCrossover": { "-val": "0" },
            "SubPolarity": { "-val": "0" },
            "SubEnabled": { "-val": "1" },
            "PresetNameList": "FactoryDefaults"
          }
        }
      }
    }
  }
}
> The raw event is: NOTIFY /Connection Manager HTTP/1.1
HOST: 192.168.1.41:3409
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 1925
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58289F2E01400_sub0000002495
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><SourceProtocolInfo></SourceProtocolInfo></e:property><e:property><SinkProtocolInfo>http-get:*:audio/mp3:*,x-file-cifs:*:audio/mp3:*,http-get:*:audio/mp4:*,x-file-cifs:*:audio/mp4:*,http-get:*:audio/mpeg:*,x-file-cifs:*:audio/mpeg:*,http-get:*:audio/mpegurl:*,x-file-cifs:*:audio/mpegurl:*,real.com-rhapsody-http-1-0:*:audio/mpegurl:*,file:*:audio/mpegurl:*,http-get:*:audio/mpeg3:*,x-file-cifs:*:audio/mpeg3:*,http-get:*:audio/wav:*,x-file-cifs:*:audio/wav:*,http-get:*:audio/wma:*,x-file-cifs:*:audio/wma:*,http-get:*:audio/x-ms-wma:*,x-file-cifs:*:audio/x-ms-wma:*,http-get:*:audio/aiff:*,x-file-cifs:*:audio/aiff:*,http-get:*:audio/flac:*,x-file-cifs:*:audio/flac:*,http-get:*:application/ogg:*,x-file-cifs:*:application/ogg:*,http-get:*:audio/audible:*,x-file-cifs:*:audio/audible:*,real.com-rhapsody-http-1-0:*:audio/x-ms-wma:*,real.com-rhapsody-direct:*:audio/mp3:*,sonos.com-mms:*:audio/x-ms-wma:*,sonos.com-http:*:audio/mpeg3:*,sonos.com-http:*:audio/mpeg:*,sonos.com-http:*:audio/wma:*,sonos.com-http:*:audio/mp4:*,sonos.com-http:*:audio/wav:*,sonos.com-http:*:audio/aiff:*,sonos.com-http:*:audio/flac:*,sonos.com-http:*:application/ogg:*,sonos.com-spotify:*:audio/x-spotify:*,sonos.com-rtrecent:*:audio/x-sonos-recent:*,real.com-rhapsody-http-1-0:*:audio/x-rhap-radio:*,real.com-rhapsody-direct:*:audio/x-rhap-radio:*,pandora.com-pndrradio:*:audio/x-pandora-radio:*,pandora.com-pndrradio-http:*:audio/mpeg3:*,sirius.com-sirradio:*:audio/x-sirius-radio:*,x-rincon:*:*:*,x-rincon-mp3radio:*:*:*,x-rincon-playlist:*:*:*,x-rincon-queue:*:*:*,x-rincon-stream:*:*:*,x-sonosapi-stream:*:*:*,x-sonosapi-radio:*:audio/x-sonosapi-radio:*,x-rincon-cpcontainer:*:*:*,last.fm-radio:*:audio/x-lastfm-radio:*,last.fm-radio-http:*:audio/mpeg3:*</SinkProtocolInfo></e:property><e:property><CurrentConnectionIDs></CurrentConnectionIDs></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": [
      {
        
      },
      { "SinkProtocolInfo": "http-get:*:audio/mp3:*,x-file-cifs:*:audio/mp3:*,http-get:*:audio/mp4:*,x-file-cifs:*:audio/mp4:*,http-get:*:audio/mpeg:*,x-file-cifs:*:audio/mpeg:*,http-get:*:audio/mpegurl:*,x-file-cifs:*:audio/mpegurl:*,real.com-rhapsody-http-1-0:*:audio/mpegurl:*,file:*:audio/mpegurl:*,http-get:*:audio/mpeg3:*,x-file-cifs:*:audio/mpeg3:*,http-get:*:audio/wav:*,x-file-cifs:*:audio/wav:*,http-get:*:audio/wma:*,x-file-cifs:*:audio/wma:*,http-get:*:audio/x-ms-wma:*,x-file-cifs:*:audio/x-ms-wma:*,http-get:*:audio/aiff:*,x-file-cifs:*:audio/aiff:*,http-get:*:audio/flac:*,x-file-cifs:*:audio/flac:*,http-get:*:application/ogg:*,x-file-cifs:*:application/ogg:*,http-get:*:audio/audible:*,x-file-cifs:*:audio/audible:*,real.com-rhapsody-http-1-0:*:audio/x-ms-wma:*,real.com-rhapsody-direct:*:audio/mp3:*,sonos.com-mms:*:audio/x-ms-wma:*,sonos.com-http:*:audio/mpeg3:*,sonos.com-http:*:audio/mpeg:*,sonos.com-http:*:audio/wma:*,sonos.com-http:*:audio/mp4:*,sonos.com-http:*:audio/wav:*,sonos.com-http:*:audio/aiff:*,sonos.com-http:*:audio/flac:*,sonos.com-http:*:application/ogg:*,sonos.com-spotify:*:audio/x-spotify:*,sonos.com-rtrecent:*:audio/x-sonos-recent:*,real.com-rhapsody-http-1-0:*:audio/x-rhap-radio:*,real.com-rhapsody-direct:*:audio/x-rhap-radio:*,pandora.com-pndrradio:*:audio/x-pandora-radio:*,pandora.com-pndrradio-http:*:audio/mpeg3:*,sirius.com-sirradio:*:audio/x-sirius-radio:*,x-rincon:*:*:*,x-rincon-mp3radio:*:*:*,x-rincon-playlist:*:*:*,x-rincon-queue:*:*:*,x-rincon-stream:*:*:*,x-sonosapi-stream:*:*:*,x-sonosapi-radio:*:audio/x-sonosapi-radio:*,x-rincon-cpcontainer:*:*:*,last.fm-radio:*:audio/x-lastfm-radio:*,last.fm-radio-http:*:audio/mpeg3:*" },
      {
        
      }
    ]
  }
}
> **********************************************************
> All zone subscriptions have completed so can start everything now
> **********************************************************
> The discovered device details are:
> The raw event is: NOTIFY /Transport Event HTTP/1.1
HOST: 192.168.1.41:3409
CONTENT-TYPE: text/xml
CONTENT-LENGTH: 2003
NT: upnp:event
NTS: upnp:propchange
SID: uuid:RINCON_000E58289F2E01400_sub0000002496
SEQ: 0

<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><LastChange>&lt;Event xmlns=&quot;urn:schemas-upnp-org:metadata-1-0/AVT/&quot; xmlns:r=&quot;urn:schemas-rinconnetworks-com:metadata-1-0/&quot;&gt;&lt;InstanceID val=&quot;0&quot;&gt;&lt;TransportState val=&quot;STOPPED&quot;/&gt;&lt;CurrentPlayMode val=&quot;NORMAL&quot;/&gt;&lt;CurrentCrossfadeMode val=&quot;0&quot;/&gt;&lt;NumberOfTracks val=&quot;0&quot;/&gt;&lt;CurrentTrack val=&quot;0&quot;/&gt;&lt;CurrentSection val=&quot;0&quot;/&gt;&lt;CurrentTrackURI val=&quot;&quot;/&gt;&lt;CurrentTrackDuration val=&quot;0:00:00&quot;/&gt;&lt;CurrentTrackMetaData val=&quot;&quot;/&gt;&lt;r:NextTrackURI val=&quot;&quot;/&gt;&lt;r:NextTrackMetaData val=&quot;&quot;/&gt;&lt;r:EnqueuedTransportURI val=&quot;&quot;/&gt;&lt;r:EnqueuedTransportURIMetaData val=&quot;&quot;/&gt;&lt;PlaybackStorageMedium val=&quot;NONE&quot;/&gt;&lt;AVTransportURI val=&quot;&quot;/&gt;&lt;AVTransportURIMetaData val=&quot;&quot;/&gt;&lt;CurrentTransportActions val=&quot;Set, Play, Stop, Pause, Seek, Next, Previous&quot;/&gt;&lt;TransportStatus val=&quot;OK&quot;/&gt;&lt;r:SleepTimerGeneration val=&quot;0&quot;/&gt;&lt;r:AlarmRunning val=&quot;0&quot;/&gt;&lt;r:SnoozeRunning val=&quot;0&quot;/&gt;&lt;r:RestartPending val=&quot;0&quot;/&gt;&lt;TransportPlaySpeed val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;CurrentMediaDuration val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;RecordStorageMedium val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;PossiblePlaybackStorageMedia val=&quot;NONE, NETWORK&quot;/&gt;&lt;PossibleRecordStorageMedia val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;RecordMediumWriteStatus val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;CurrentRecordQualityMode val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;PossibleRecordQualityModes val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;NextAVTransportURI val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;NextAVTransportURIMetaData val=&quot;NOT_IMPLEMENTED&quot;/&gt;&lt;/InstanceID&gt;&lt;/Event&gt;</LastChange></e:property></e:propertyset>
> JSON version of event is is: {
  "e:propertyset": {
    "-xmlns:e": "urn:schemas-upnp-org:event-1-0",
    "e:property": {
      "LastChange": {
        "Event": {
          "-xmlns": "urn:schemas-upnp-org:metadata-1-0/AVT/",
          "-xmlns:r": "urn:schemas-rinconnetworks-com:metadata-1-0/",
          "InstanceID": {
            "-val": "0",
            "TransportState": { "-val": "STOPPED" },
            "CurrentPlayMode": { "-val": "NORMAL" },
            "CurrentCrossfadeMode": { "-val": "0" },
            "NumberOfTracks": { "-val": "0" },
            "CurrentTrack": { "-val": "0" },
            "CurrentSection": { "-val": "0" },
            "CurrentTrackURI": {
              
            },
            "CurrentTrackDuration": { "-val": "0:00:00" },
            "CurrentTrackMetaData": {
              
            },
            "r:NextTrackURI": {
              
            },
            "r:NextTrackMetaData": {
              
            },
            "r:EnqueuedTransportURI": {
              
            },
            "r:EnqueuedTransportURIMetaData": {
              
            },
            "PlaybackStorageMedium": { "-val": "NONE" },
            "AVTransportURI": {
              
            },
            "AVTransportURIMetaData": {
              
            },
            "CurrentTransportActions": { "-val": "Set, Play, Stop, Pause, Seek, Next, Previous" },
            "TransportStatus": { "-val": "OK" },
            "r:SleepTimerGeneration": { "-val": "0" },
            "r:AlarmRunning": { "-val": "0" },
            "r:SnoozeRunning": { "-val": "0" },
            "r:RestartPending": { "-val": "0" },
            "TransportPlaySpeed": { "-val": "NOT_IMPLEMENTED" },
            "CurrentMediaDuration": { "-val": "NOT_IMPLEMENTED" },
            "RecordStorageMedium": { "-val": "NOT_IMPLEMENTED" },
            "PossiblePlaybackStorageMedia": { "-val": "NONE, NETWORK" },
            "PossibleRecordStorageMedia": { "-val": "NOT_IMPLEMENTED" },
            "RecordMediumWriteStatus": { "-val": "NOT_IMPLEMENTED" },
            "CurrentRecordQualityMode": { "-val": "NOT_IMPLEMENTED" },
            "PossibleRecordQualityModes": { "-val": "NOT_IMPLEMENTED" },
            "NextAVTransportURI": { "-val": "NOT_IMPLEMENTED" },
            "NextAVTransportURIMetaData": { "-val": "NOT_IMPLEMENTED" }
          }
        }
      }
    }
  }
}
> LastFM recent stations title is: RECOMMENDED
> LastFM recent stations title is: NEIGHBORHOOD
> LastFM recent stations title is: PERSONALRADIO
> LastFM recent stations title is: RECOMMENDED Tag Radio
> LastFM recent stations title is: sting Tag Radio
> LastFM recent stations title is: Sting Similar Artists
> LastFM recent stations title is: pop Tag Radio
> LastFM recent stations title is: punk Tag Radio
> LastFM recent stations title is: rock Tag Radio
> LastFM recent stations title is: alternative Tag Radio
> LastFM recent stations title is: seen live Tag Radio
> LastFM recent stations title is: seen live Tag Radio
> LastFM recent stations title is: 80s Tag Radio
> LastFM recent stations title is: 00s Tag Radio
> LastFM recent stations title is: 60s Tag Radio
> LastFM recent stations title is: sludge Tag Radio
> LastFM recent stations title is: Chris Botti Similar Artists
> Lost connection with iViewer
> Lost realtime monitor connection