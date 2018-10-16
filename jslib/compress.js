function onerror(message) {
	console.error(message);
}
//解压zip,,,文件形式
function unzipBlob(blob, callback) {
	zip.createReader(new zip.BlobReader(blob), function(zipReader) {
		zipReader.getEntries(function(entries) {
			entries[0].getData(new zip.BlobWriter(zip.getMimeType(entries[0].filename)), function(data) {
				zipReader.close();
				callback(data);
			});
		});
	}, onerror);
}

function unzip(b64,_code) {
	var strData = atob(b64);
	var charData = strData.split("").map(function(x){
		return x.charCodeAt(0)
	})
	var data = pako.inflate(charData);
	strData = ASCIIBuild2String(data,_code);
	
	return strData;
}

function gzip(str) {
// 	var binary = pako.gzip(str,{to:'string'});//GZIP压缩--后台使用的是~下面那个方法
	var binary = pako.deflate(str,{to:'string'});//GZIP----ZLIB算法
	return btoa(binary);
}
