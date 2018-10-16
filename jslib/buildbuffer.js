var _codeGBK = _ucd([ 103, 98, 107 ]);
var _codeUTF = _ucd([ 117, 116, 102, 45, 56 ]);
function _ucd(codestr) {
	var tb = new Uint8Array(codestr);
	var tblen = tb.byteLength;
	var td = "";
	var tbi = 0;
	while (tbi < tblen) {
		td += String.fromCharCode(tb[tbi]);
		tbi++;
	}
	return td;
}
/**
 * 字符串buffer<b>
 * 编码格式:默认可以不传.true为GBK<b>
 * @param buffer
 * @param _code
 * @returns {String}
 */
function ASCIIBuild2String(buffer,_code) {
	var binary = '';
	var bytes = new Uint8Array(buffer);
	var len = bytes.byteLength;
	var i = 0;
	var codelen = (_code?3:2);
	while (i < len) {
		if (bytes[i] > 160) {
			if (i > len - codelen) {
				break;
			}
			var strb = new ArrayBuffer(codelen);
			var iii8V = new Uint8Array(strb);
			for (var j = 0; j < codelen; j++) {
				iii8V[j] = bytes[i+j];
			}
			var dataView = new DataView(strb);
			var decoder = new TextDecoder(codelen==3?_codeUTF:_codeGBK);
			binary += decoder.decode(dataView);
			i = i + codelen;
		} else {
			binary += String.fromCharCode(bytes[i]);
			i++;
		}
	}
	return binary;
}