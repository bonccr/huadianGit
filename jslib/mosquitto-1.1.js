var CONNECT = 16;
var CONNACK = 32;
var PUBLISH = 48;
var PUBACK = 64;
var PUBREC = 80;
var PUBREL = 96;
var PUBCOMP = 112;
var SUBSCRIBE = 128;
var SUBACK = 144;
var UNSUBSCRIBE = 160;
var UNSUBACK = 176;
var PINGREQ = 192;
var PINGRESP = 208;
var DISCONNECT = 224;
var FLAGCODE = true;
var COMPRESS = 0;
var NOCOMPRESS = 0;
var ZIPCOMPRESS = 1;
var GZIPCOMPRESS = 2;

/**
 * 使用新方法ASCIIBuild2String
 * @deprecated
 * @param buffer
 * @returns {String}
 */
function AB2S(buffer) {
	var binary = '';
	var bytes = new Uint8Array(buffer);
	var len = bytes.byteLength;
	var i = 0;
	while (i < len) {
		if(bytes[i]==255){
			if (i > len - 3) {
				break;
			}
			var bytes2 = bytes[i+2].toString(16);
			if(bytes2.length<2) bytes2="0"+bytes2;
			binary += unescape("%u"+bytes[i+1].toString(16)+bytes2);
			i = i + 3;
		}else{
			if(FLAGCODE){
				if (bytes[i] > 160) {
					if (i > len - 3) {
						break;
					}
					var strb = new ArrayBuffer(3);
					var iii8V = new Uint8Array(strb);
					iii8V[0] = bytes[i];
					iii8V[1] = bytes[i + 1];
					iii8V[2] = bytes[i + 2];
					var dataView = new DataView(strb);
					var decoder = new TextDecoder(_codeUTF);
					binary += decoder.decode(dataView);
					i = i + 3;
				} else {
					binary += String.fromCharCode(bytes[i]);
					i++;
				}
			}else{
			if(bytes[i]>160){
				if(i>len-2){
					break;
				}
				var strb=new ArrayBuffer(2);
				var iii8V = new Uint8Array(strb);
				iii8V[0] = bytes[i];
				iii8V[1] = bytes[i+1];
				var dataView = new DataView(strb);
				var decoder=new TextDecoder(_codeGBK);
				binary+=decoder.decode(dataView);
				i=i+2;
				}else{
					binary+=String.fromCharCode(bytes[i]);
					i++;
				}
			}
		}
	}
	return binary;
}

function build_message(data,that,blob){
	var k = new Int8Array(data);
	var b = 0;
	while (k.length > 0 && b < 1000) {
		b++;
		switch (k[0] & 240) {
		case CONNACK:
			var l = k[1];
			var a = k[2];
			if (that.m.onconnect) {
				that.m.onconnect(a)
			}
			buffer = buffer.slice(l + 2);
			k = new Int8Array(buffer);
			break;
		case PUBLISH:
			var f = 1;
			var e = 1;
			var l = 0;
			var j = 0;
			var n;
			var s = (k[0] & 6) >> 1;
			var m = (k[0] & 1);
			var p = 0;
			do {
				j++;
				n = k[f++];
				l += (n & 127) * e;
				e *= 128
			} while ((n & 128) != 0);
			var d = k[f++] * 256 + k[f++];
			var c = data.slice(f, f + d);
			f += d;
			var h = ASCIIBuild2String(c,FLAGCODE);
			if (s > 0) {
				p = k[f++] * 256 + k[f++]
			}
			var g ;var o="";
			if(COMPRESS==ZIPCOMPRESS){
				g = blob.slice(f, l + j + 1);
				unzipBlob(g, function(unzippedBlob) {
					var reader = new FileReader();
					reader.onload = function(e) {
						o=(ASCIIBuild2String(e.target.result,FLAGCODE));//有中文问题,需要设置FLAGCODE
						if (that.m.onmessage) {
							that.m.onmessage(h, o, s, m)
						}
					};
					reader.readAsArrayBuffer(unzippedBlob);
				});
				data = data.slice(l + 1 + j);
				k = new Int8Array(data);
			}else if(COMPRESS==GZIPCOMPRESS){
				g = data.slice(f, l + j + 1);
				sd = ASCIIBuild2String(g,FLAGCODE);
//				strData = atob(sd);
//				var charData = strData.split("").map(function(x){
//					return x.charCodeAt(0)
//				});
//				gzipdata = pako.inflate(charData);
//				o=ASCIIBuild2String(gzipdata,FLAGCODE);
				o = unzip(sd,FLAGCODE);
				data = data.slice(l + 1 + j);
				k = new Int8Array(data);
				if (that.m.onmessage) {
					that.m.onmessage(h, o, s, m)
				}
			}else{
				g = data.slice(f, l + j + 1);
				o = ASCIIBuild2String(g,FLAGCODE);
				data = data.slice(l + 1 + j);
				k = new Int8Array(data);
				if (that.m.onmessage) {
					that.m.onmessage(h, o, s, m)
				}
			}
			break;
		case PUBREC:
		case PUBREL:
		case PUBACK:
		case PUBCOMP:
		case SUBACK:
		case UNSUBACK:
		case PINGRESP:
			var l = k[1];
			data = data.slice(l + 2);
			k = new Int8Array(data);
			break;
		}
	}
}
function Mosquitto() {
	this.ws = null;
	this.onconnect = null;
	this.ondisconnect = null;
	this.onmessage = null;
	
}
Mosquitto.prototype = {
	setcomp:function(s){
		COMPRESS = (!s ? NOCOMPRESS : s);
	},
	getcomp:function(){
		return COMPRESS;
	},
	setuc : function(s) {
		FLAGCODE = (!s ? false : true);
	},
	getuc : function() {
		if (FLAGCODE) {
			return _codeUTF;
		} else {
			return _codeGBK;
		}
	},
	mqtt_ping : function() {
		var b = new ArrayBuffer(2);
		var a = new Int8Array(b);
		a[0] = PINGREQ;
		a[1] = 0;
		if (this.ws.readyState == 1) {
			this.ws.send(b)
		} else {
			this.queue(b)
		}
		setTimeout(function(c) {
			c.mqtt_ping()
		}, 60000, this)
	},
	connect : function(a, b) {
		this.url = a;
		this.keepalive = b;
		this.mid = 1;
		this.out_queue = new Array();
		this.ws = new WebSocket(a, "mqttv3.1");
		this.ws.binaryType = "blob";
//		this.ws.binaryType = "arraybuffer";
		this.ws.onopen = this.ws_onopen;
		this.ws.onclose = this.ws_onclose;
		this.ws.onmessage = this.ws_onmessage;
		this.ws.m = this;
		this.ws.onerror = function(c) {
		//	alert(c.data);
		//	alert("交易提示信息");
		}
	},
	disconnect : function() {
		if (this.ws.readyState == 1) {
			var b = new ArrayBuffer(2);
			var a = new Int8Array(b);
			a[0] = DISCONNECT;
			a[1] = 0;
			this.ws.send(b);
			this.ws.close()
		}
	},
	ws_onopen : function(c) {
		var b = new ArrayBuffer(1 + 1 + 12 + 2 + 20);
		var a = new Int8Array(b);
		i = 0;
		a[i++] = CONNECT;
		a[i++] = 12 + 2 + 20;
		a[i++] = 0;
		a[i++] = 6;
		f = "MQIsdp";
		for (var d = 0; d < f.length; d++) {
			a[i++] = f.charCodeAt(d)
		}
		a[i++] = 3;
		a[i++] = 2;
		a[i++] = 0;
		a[i++] = 60;
		a[i++] = 0;
		a[i++] = 20;
		var f = "mjsws/";
		for (var d = 0; d < f.length; d++) {
			a[i++] = f.charCodeAt(d)
		}
		var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		for (var d = 0; d < 14; d++) {
			a[i++] = e.charCodeAt(Math.floor(Math.random() * e.length))
		}
		this.send(b);
		while (this.m.out_queue.length > 0) {
			this.send(this.m.out_queue.pop())
		}
		setTimeout(function(g) {
			g.mqtt_ping()
		}, 60000, this.m)
	},
	ws_onclose : function(a) {
		if (this.m.ondisconnect) {
			this.m.ondisconnect(a.data)
		}
	},
	ws_onmessage : function(r) {
//		console.log(r.data)
//		console.log(!r.data.byteLength?r.data.size:r.data.byteLength)
		var filereader = new FileReader();
		buffer = r.data;
		that = this;
		if ((buffer instanceof Blob)) {
//			console.log(new Date().getTime());
			filereader.readAsArrayBuffer(buffer);
			filereader.onload = function(event){
				build_message(filereader.result,that,buffer);
//				console.log(new Date().getTime());
			}
		}else{
			build_message(buffer,that);
		}
	},
	get_remaining_count : function(a) {
		if (a >= 0 && a < 128) {
			return 1
		} else {
			if (a >= 128 && a < 16384) {
				return 2
			} else {
				if (a >= 16384 && a < 2097152) {
					return 3
				} else {
					if (a >= 2097152 && a < 268435456) {
						return 4
					} else {
						return -1
					}
				}
			}
		}
	},
	generate_mid : function() {
		var a = this.mid;
		this.mid++;
		if (this.mid == 256) {
			this.mid = 0
		}
		return a
	},
	queue : function(a) {
		this.out_queue.push(a)
	},
	send_cmd_with_mid : function(d, c) {
		var b = new ArrayBuffer(4);
		var a = new Int8Array(b);
		a[0] = d;
		a[1] = 2;
		a[2] = c % 128;
		a[3] = c / 128;
		if (this.ws.readyState == 1) {
			this.ws.send(b)
		} else {
			this.queue(b)
		}
	},
	unsubscribe : function(d) {
		var g = 2 + 2 + d.length;
		var f = this.get_remaining_count(g);
		var b = new ArrayBuffer(1 + f + g);
		var a = new Int8Array(b);
		var e = 0;
		a[e++] = UNSUBSCRIBE | 2;
		do {
			digit = Math.floor(g % 128);
			g = Math.floor(g / 128);
			if (g > 0) {
				digit = digit | 128
			}
			a[e++] = digit
		} while (g > 0);
		a[e++] = 0;
		a[e++] = this.generate_mid();
		a[e++] = 0;
		a[e++] = d.length;
		for (var c = 0; c < d.length; c++) {
			a[e++] = d.charCodeAt(c)
		}
		if (this.ws.readyState == 1) {
			this.ws.send(b)
		} else {
			this.queue(b)
		}
	},
	subscribe : function(d, f) {
		if (f != 0) {
			return 1
		}
		var h = 2 + 2 + d.length + 1;
		var g = this.get_remaining_count(h);
		var b = new ArrayBuffer(1 + g + h);
		var a = new Int8Array(b);
		var e = 0;
		a[e++] = SUBSCRIBE | 2;
		do {
			digit = Math.floor(h % 128);
			h = Math.floor(h / 128);
			if (h > 0) {
				digit = digit | 128
			}
			a[e++] = digit
		} while (h > 0);
		a[e++] = 0;
		a[e++] = this.generate_mid();
		a[e++] = 0;
		a[e++] = d.length;
		for (var c = 0; c < d.length; c++) {
			a[e++] = d.charCodeAt(c)
		}
		a[e++] = f;
		if (this.ws.readyState == 1) {
			this.ws.send(b)
		} else {
			this.queue(b)
		}
	},
	publish : function(d, k, l, g) {
		if (l != 0) {
			return 1
		}
		var f = 2 + d.length + k.length;
		for (var a = 0; a < k.length; a++) {
				if(k.charCodeAt(a)>=19968){
					f+=2;
				}
		}
		var h = this.get_remaining_count(f);
		var b = new ArrayBuffer(1 + h + f);
		var e = new Int8Array(b);
		var c = 0;var j=0;
		g = g ? 1 : 0;
		e[c++] = PUBLISH | (l << 1) | g;
		do {
			digit = Math.floor(f % 128);
			f = Math.floor(f / 128);
			if (f > 0) {
				digit = digit | 128
			}
			e[c++] = digit
		} while (f > 0);
		e[c++] = 0;
		e[c++] = d.length;
		
		for (var a = 0; a < d.length; a++) {
			e[c++] = d.charCodeAt(a)
		}
		for (var a = 0; a < k.length; a++) {
//			前段发中文时使用gzip压缩
//			if(k.charCodeAt(a)>=19968){
//				var temp =k.charCodeAt(a).toString(16);
//				var strb1=temp.substring(0,2);
//				var strb2=temp.substring(2,4);
//				e[c++] = -1;
//				e[c++] = parseInt("0x"+strb1);
//				e[c++] = parseInt("0x"+strb2);
//			}else{
				e[c++] = k.charCodeAt(a);
//			}
		}

		if (this.ws.readyState == 1) {
			this.ws.send(b)
		} else {
			this.queue(b)
		}
	}
};