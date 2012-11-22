/* Sonos Viewer for CommandFusion
 ===============================================================================

 AUTHOR:	Taken from Internet
 CONTACT:
 VERSION:

 =========================================================================
 HELP:

 This script is used during the conversion of XML to JSON

 =========================================================================
 */

/*

 /*
 Copyright 2011 Abdulla Abdurakhmanov
 Original sources are available at https://code.google.com/p/x2js/

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/*
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
if (typeof(JKL) == 'undefined') JKL = function () {
};

//  JKL.Dumper Constructor

JKL.Dumper = function () {
	return this;
};

//  Dump the data into JSON format

JKL.Dumper.prototype.dump = function (data, offset) {
	if (typeof(offset) == "undefined") offset = "";
	var nextoff = offset + "  ";
	switch (typeof(data)) {
		case "string":
			return '"' + this.escapeString(data) + '"';
			break;
		case "number":
			return data;
			break;
		case "boolean":
			return data ? "true" : "false";
			break;
		case "undefined":
			return "null";
			break;
		case "object":
			if (data == null) {
				return "null";
			}
			else if (data.constructor == Array) {
				var array = [];
				for (var i = 0; i < data.length; i++) {
					array[i] = this.dump(data[i], nextoff);
				}
				return "[\n" + nextoff + array.join(",\n" + nextoff) + "\n" + offset + "]";
			}
			else {
				var array = [];
				for (var key in data) {
					var val = this.dump(data[key], nextoff);
//              if ( key.match( /[^A-Za-z0-9_]/ )) {
					key = '"' + this.escapeString(key) + '"';
//              }
					array[array.length] = key + ": " + val;
				}
				if (array.length == 1 && !array[0].match(/[\n\{\[]/)) {
					return "{ " + array[0] + " }";
				}
				return "{\n" + nextoff + array.join(",\n" + nextoff) + "\n" + offset + "}";
			}
			break;
		default:
			return data;
			// unsupported data type
			break;
	}
};

//  escape '\' and '"'

JKL.Dumper.prototype.escapeString = function (str) {
	return str.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
};

CF.modules.push({
	                name   :"XML2JSON", // the name of the module (mostly for display purposes)
	                object :JKL.Dumper, // the object to which the setup function belongs ("this")
	                version:1.0                // An optional module version number that is displayed in the Remote Debugger
                });
