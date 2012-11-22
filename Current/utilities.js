/* Sonos Viewer for CommandFusion
 ===============================================================================

 AUTHOR:	Simon Post
 CONTACT:	simon.post@mac.com
 VERSION:	v0.0.1

 =========================================================================
 HELP:

 This script holds various utilities that are used through the SONOS iviewer
 application such as escaping text

 =========================================================================
 */

// ======================================================================
// Global Object
// ======================================================================


var Utils = {
	escape     :function (string) {
		return this.xmlEscape(string);
	},
	unescape   :function (string) {
		return this.xmlUnescape(string);
	},
	unescapeLight : function (string) {
		return this.xmlUnescapeLight(string);
	},

	xmlEscape  :function (string) {
		string = string.replace(/&/g, "&amp;");
		string = string.replace(/"/g, "&quot;");
		string = string.replace(/'/g, "&apos;");
		string = string.replace(/</g, "&lt;");
		string = string.replace(/>/g, "&gt;");
		//string = string.replace(/:/g, "%3a");
		return string;
	},

	xmlUnescape:function (string) {
		string = string.replace(/&amp;/g, "&");
		string = string.replace(/&amp;/g, "&");
		string = string.replace(/&amp;/g, "&");
		string = string.replace(/&amp;/g, "&");
		string = string.replace(/&quot;/g, "\"");
		string = string.replace(/&apos;/g, "'");
		string = string.replace(/&lt;/g, "<");
		string = string.replace(/&gt;/g, ">");
		string = string.replace(/%3a/g, ":");
		string = string.replace(/%3d/g, "=");
		string = string.replace(/%3f/g, "?");
		string = string.replace(/%26/g, "&");
		string = string.replace(/%25/g, "%");
		string = string.replace(/%2f/g, "/");
		string = string.replace(/%20/g, " ");
		return string;
	},

	xmlUnescapeLight:function (string) {
		string = string.replace(/&amp;/g, "&");
		string = string.replace(/&lt;/g, "<");
		string = string.replace(/&gt;/g, ">");
		return string;
	}
	}

function trim(str) {
	var str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}


CF.modules.push({
	                name   :"Utils", // the name of the module (mostly for display purposes)
	                object :Utils, // the object to which the setup function belongs ("this")
	                version:1.0                // An optional module version number that is displayed in the Remote Debugger
                });