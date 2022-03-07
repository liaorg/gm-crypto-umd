(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/*******************************************************
*
* 函数名称：Base64encode()
* 功    能：对数据进行Base64加密
* 说	明：函数中将数据使用_utf8_encode()进行编码转换后再加密,保证数据完整
*
**********************************************************/

var urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
// const _keyStr = 'useandom+26T198340PX75pxJACKVERYMINDBUSHWOLF/GQZbfghjklqvwyzrict=';
var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function base64Encode(input) {

	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;

	input = _utf8_encode(input);

	while (i < input.length) {

		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = (chr1 & 3) << 4 | chr2 >> 4;
		enc3 = (chr2 & 15) << 2 | chr3 >> 6;
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
	}
	return output;
}

/*******************************************************
*
* 函数名称：Base64decode()
* 功    能：对数据进行Base64解密
* 说	明：函数中将数据使用_utf8_decode()将解密后的数据编码,保证数据完整
*
**********************************************************/
function base64Decode(input) {
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;

	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	while (i < input.length) {

		enc1 = _keyStr.indexOf(input.charAt(i++));
		enc2 = _keyStr.indexOf(input.charAt(i++));
		enc3 = _keyStr.indexOf(input.charAt(i++));
		enc4 = _keyStr.indexOf(input.charAt(i++));

		chr1 = enc1 << 2 | enc2 >> 4;
		chr2 = (enc2 & 15) << 4 | enc3 >> 2;
		chr3 = (enc3 & 3) << 6 | enc4;

		output = output + String.fromCharCode(chr1);

		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
	}

	output = _utf8_decode(output);

	return output;
}

/*******************************************************
*
* 函数名称：_utf8_encode()
* 功    能：将数据进行utf8编码
* 说	明：
*
**********************************************************/
function _utf8_encode(string) {
	string = string.replace(/\r\n/g, "\n");
	var utftext = "";

	for (var n = 0; n < string.length; n++) {

		var c = string.charCodeAt(n);

		if (c < 128) {
			utftext += String.fromCharCode(c);
		} else if (c > 127 && c < 2048) {
			utftext += String.fromCharCode(c >> 6 | 192);
			utftext += String.fromCharCode(c & 63 | 128);
		} else {
			utftext += String.fromCharCode(c >> 12 | 224);
			utftext += String.fromCharCode(c >> 6 & 63 | 128);
			utftext += String.fromCharCode(c & 63 | 128);
		}
	}
	return utftext;
}

/*******************************************************
*
* 函数名称：_utf8_decode()
* 功    能：将数据进行utf8解码
* 说	明：
*
**********************************************************/
function _utf8_decode(utftext) {
	var string = "";
	var i = 0;
	var c = c1 = c2 = 0;

	while (i < utftext.length) {

		c = utftext.charCodeAt(i);

		if (c < 128) {
			string += String.fromCharCode(c);
			i++;
		} else if (c > 191 && c < 224) {
			c2 = utftext.charCodeAt(i + 1);
			string += String.fromCharCode((c & 31) << 6 | c2 & 63);
			i += 2;
		} else {
			c2 = utftext.charCodeAt(i + 1);
			c3 = utftext.charCodeAt(i + 2);
			string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
			i += 3;
		}
	}
	return string;
}

// MTIzMTIz
console.log('MTIzMTIz');
console.log(base64Encode('123123'));

fact_rec = function (_fact_rec) {
	function fact_rec(_x, _x2) {
		return _fact_rec.apply(this, arguments);
	}

	fact_rec.toString = function () {
		return _fact_rec.toString();
	};

	return fact_rec;
}(function (x, kont) {
	return x == 1 ? kont(1) : fact_rec(x - 1, function (res) {
		return kont(x * res);
	});
});

},{}]},{},[1]);
