 /*
	该文件为总结中信银行大屏项目前端各功能主题块函数，
	目前总结有对设备cpu，menu内存处理，
	线路利用率变化操作，
	事件告警处理，
	事件数据处理,
	闪烁灯状态处理，
	移除闪烁效果
	等功能函数
	
	***注释：该文件大部分操作方法依赖于jquery框架，使用该文件时请确保先引入jquery框架***
	
	更新时间 2017-04-27
 */
 /*** 大屏公共变量 ***/
//var bs = false;//标识符：true:生产，false: 测试
//var mosq = new Mosquitto();
//var url = "ws://" + host + ":" + port + "/mqtt";
//function defineMQ(){
//	mosq.onmessage = function(topic, payload, qos) {
//		try {
//			toMassage(topic,payload)
//		} catch (err) {
//			//alert(err);
//		} finally {
//			//alert('mq返回值:格式错误');
//		}
//	};
//	mosq.onconnect = function(rc) {
//		console.log("连接成功！");/*只有mq连接成功之后输出*/	
//	};
//	mosq.ondisconnect = function(rc) {
//		setTimeout(connectMq, 30000);//失去连接后，30秒自动在连	
//	};
//}
 
 
 
 
 
 /***刷屏计时器***/
	var mcount=30;/***预计跑100次***/
	var nc = 0;   /***id 按位数数值逐渐增加~ N秒跑完，可以跑M次***/
	function _test(data){
		var notFinanceCnt = data.value;
	    //notFinanceCnt  = Math.round(Math.random()*9999999);
	    var cnt = parseInt(notFinanceCnt) + "";
	    var len2 =cnt.length;
		var spans= $("span[id*="+data.type+"]");
	    
	    var len =spans.length;
		var len1 = len - len2;
		var arr=[];
		for(var  i = 0 ;i<len1;i++){//补0
			cnt = "0" + cnt;  
		}
		//console.log("处理后的值="+cnt);
		for ( var i = 0; i < cnt.length; i++) {
			 ss = Number(cnt.substr(i, 1));    
			 arr.push(ss);
			 if($(spans[i]).html()!=arr[i]+""){//循环所有id*=value的span，如果和上次不相等，就变化
					addCount($(spans[i]),arr[i],0);
			}
		}
	}
	function addCount(obj,orderValue,runcount){
		var _val = Number(obj.html());
		if(!isNaN(_val)){
			var tempnum= _val - (-1);
			if(tempnum==10){
				obj.html(0);
			}else{
				obj.html(tempnum);
			}
			runcount++;
			if(runcount>=mcount){
				if(orderValue == Number(obj.html())){
					return ;
				}
			}
			setTimeout(function(){
				addCount(obj,orderValue,runcount);
				},150*Math.random());
		}else{
			return ;
		}
	}
/***添加千位符***/
function milliFormat(s){
	s = s+"";
	if(/[^0-9\.]/.test(s)) return "invalid value";
	s=s.replace(/^(\d*)$/,"$1.");
	s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
	s=s.replace(".",",");
	var re=/(\d)(\d{3},)/;
	while(re.test(s)){
		s=s.replace(re,"$1,$2");
	}
	s=s.replace(/,(\d\d)$/,".$1");
	s=s.replace(/^\./,"0.");
	s=s.toString();
	return s.substring(0,s.length-3);
}
 /***当前时间处理***/
function setDateTime() {
	$("#datetime").html(moment().format("YYYY/MM/DD"));
	$("#hourminute").html(moment().format("HH:mm:ss"));
	setTimeout(setDateTime,1000);
}
 /***单独处理CPU***/
function proCpu(arr){
	for(var i = 0, len = arr.length; i < len; i++){
		var obj = arr[i];
		var id = obj.id;
		var cpu = obj.cpu ? obj.cpu : null;
		var menu = obj.menu ? obj.menu : null;
		var cpu_pb = document.getElementById('cpu_pb'+id);
		var cpu_val = document.getElementById('cpu_val'+id);
		var menu_pb = document.getElementById('menu_pb'+id);
		if(cpu_pb){
			removeShine($("#cpu_val"+id));
			if(cpu<50){//绿色
				proGd(id,cpu,'#01ff07');
				$("#img_"+id).attr("src","images/LYG.png");
			}else if(cpu>=50 && cpu<80){//橙色
				proGd(id,cpu,'#ff9f00');
				$("#img_"+id).attr("src","images/LYY.png");
		 		$("#cpu_val"+id).addClass("shineO");
			}else if(cpu>=80){//红色
				proGd(id,cpu,'#ff1700');
				$("#img_"+id).attr("src","images/LYR.png");
		 		$("#cpu_val"+id).addClass("shineR");
			}
		}
		if(menu_pb){
			removeShine($("#menu_val"+id));
			if(menu<50){//绿色
				proGd(id,menu,"#01ff07");
			}else if(menu>=50 && menu<80){//橙色
				proGd(id,menu,"#ff9f00");
		 		$("#menu_val"+id).addClass("shineO");
			}else if(menu>=80){//红色
				proGd(id,menu,'#ff1700');
		 		$("#menu_val"+id).addClass("shineR");
			}
		}
	}
}
/***处理CPU和内存时通用函数***/
function proGd(id,data,bl){
	if(data) {
		$("#cpu_pb"+id).css({"width":cpu + '%',"background-color":bl});
		$("#cpu_val"+id).html("<font color="+ bl +">"+menu + '%</font>');
	}
}
/***移除闪烁效果***/
function removeShine(obj){
	obj.removeClass("shineG");
	obj.removeClass("shineY");
	obj.removeClass("shineO");
	obj.removeClass("shineR");
	
	obj.removeClass("shineGray");
	obj.removeClass("shineP");
	obj.removeClass("shineBB");
	
	obj.removeClass("shineGG");
	obj.removeClass("shineYY");
	obj.removeClass("shineOO");
	obj.removeClass("shineRR");
	
	obj.removeClass("shineGray1");
	obj.removeClass("shineP1");
	obj.removeClass("shineBB1");
}

/***处理提示灯闪烁事件***/
function proEvent(arr){
	for(var i = 0, len = arr.length; i < len; i++){
		var obj = arr[i];
		var id = obj.id;
			var status = obj.status;
			var list_event = obj.list_event;
			var oStatusDiv = document.getElementById("status_"+id);
			if(oStatusDiv){
				removeShine($("#_"+id));
				switch (status) {
					case '-1':
						$('#status_'+id).css({'width':'18px','height':'18px','border-radius':'9px','left':'85px','top':'8px'}).addClass("shineG");
						break;
					case '0':
						proEventCss($('#status_'+id)).addClass("shineGray");
						break;
					case '1':
						proEventCss($('#status_'+id)).addClass("shineP");
						break;
					case '2':
						proEventCss($('#status_'+id)).addClass("shineBB");
						break;
					case '3':
						proEventCss($('#status_'+id)).addClass("shineY");
						break;
					case '4':
						proEventCss($('#status_'+id)).addClass("shineO");
						break;
					case '5':
						proEventCss($('#status_'+id)).addClass("shineR");
						break;
					default:
						break;
				}
			}
		
	}
}
/***还原提示灯样式***/
function proEventCss(obj){
	obj.css({'width':'24px','height':'24px','border-radius':'12px','left':'82px','top':'5px'});
	return obj;
}

/***初始化事件数据数组***/
function initEventList(dataArr,tgArr){
	dataArr = [];
	for(var i = 0, len = tgArr.length; i < len; i++){
		dataArr.push({"id":tgArr[i].id,"list_event":[]});
	}
	return dataArr;
}


/***
 * 轮询举牌子功能
 * ***/
function processTip(){
	//顺序循环
	if(two){
		proGroup2();
	}else{
		proGroup();
	}
}
var index0 = 0;
var count0 = false;
function proGroup(){
	if(count0 ){
		if(index0 == 0){
			for(var i = 1; i< 4; i++){
				if(mapTip[mapTip.length-i] && document.getElementById("divtip"+mapTip[mapTip.length-i].id))
					//document.getElementById("mapCharts").removeChild(document.getElementById("divtip"+mapTip[mapTip.length-i].id));
					$("#divtip"+mapTip[mapTip.length-i].id).fadeOut(500,function(){
						$(this).remove();
					})
					//$("#divtip"+mapTip[mapTip.length-i].id).fadeOut();
			}
		}else{
			for(var i = 1; i< 4; i++){
				if(mapTip[mapTip.length-i] && document.getElementById("divtip"+mapTip[index0-i].id))
					//document.getElementById("mapCharts").removeChild(document.getElementById("divtip"+mapTip[index0-i].id));
					$("#divtip"+mapTip[index0-i].id).fadeOut(500,function(){
						$(this).remove();
					})
					//$("#divtip"+mapTip[index0-i].id).fadeOut();
			}
		}
	}
	var arr = [];
	for(var i = 0; i< 3; i++){
		if(mapTip[index0] && (mapTip[index0]).isShow){
			//addDiv(mapTip[index0],i);
			arr.push(mapTip[index0]);
		}
		index0++;
	}
	sortHeight(arr);
	count0 = true;
	if(index0 >= mapTip.length){
		index0 = 0;
	}
}
function addDiv(obj,flag,s){
		var newdiv = document.createElement("div");
		newdiv.id = "divtip"+ obj.id;
		if(flag == 0){
			newdiv.className="flex_Box _divStyDb_gai ani2";//"_divStyDb ani2";
			newdiv.style.height = obj.h +"px";
			newdiv.style.animationDelay = s + "s";
			newdiv.style.left = (obj.x + 10) +"px";
			var ooo = newdiv.style.top =( obj.y + 46 - (obj.h - 204) )+"px";
			if(obj.name == "密云"){
				newdiv.style.top =( obj.y + 46 - (obj.h - 204) )+"px";
			}
		}else{
			newdiv.className="_divStyDb _divStyDb_Down ani2";
			newdiv.style.left = (obj.x + 10) +"px";
			newdiv.style.top = (obj.y + 245)+"px";
		}
		newdiv.innerHTML = "<div class='flex_Box divStyDb_son_gai'><div><span style='font-size:8px;'>NO</span><span style='font-size:16px;color:#ffff06;'>"+obj.No+"</span></div><div style='font-size:14px;'>"+obj.name+"</div><div style='color:#ffff06;font-size:16px;'>"+obj.value+"</div></div><div class='divStyDb_son_xian'></div>";
		document.getElementById("mapCharts").appendChild(newdiv);
}
function proGroup2(){
	if(count0 ){
		if(index0 == 0){
			for(var i = 1; i< 3; i++){
				if(mapTip[mapTip.length-i] && document.getElementById("divtip"+mapTip[mapTip.length-i].id))
					document.getElementById("mapCharts").removeChild(document.getElementById("divtip"+mapTip[mapTip.length-i].id));
			}
		}else{
			for(var i = 1; i< 3; i++){
				if(mapTip[mapTip.length-i] && document.getElementById("divtip"+mapTip[index0-i].id))
					document.getElementById("mapCharts").removeChild(document.getElementById("divtip"+mapTip[index0-i].id));
			}
		}
	}
	for(var i = 0; i< 2; i++){
		if(mapTip[index0] && (mapTip[index0]).isShow){
			addDiv2(mapTip[index0],i);
		}
		index0++;
	}
	count0 = true;
	if(index0 >= mapTip.length){
		index0 = 0;
	}
}
function addDiv2(obj,flag){
		var newdiv = document.createElement("div");
		newdiv.id = "divtip"+ obj.id;
		if(flag == 0){
			newdiv.className="_divStyDb ani2";//"_divStyDb ani2";
			newdiv.style.left = (obj.x + 10) +"px";
			newdiv.style.top =( obj.y + 446 )+"px";
		}else{               
			newdiv.className="_divStyDb _divStyDb_Down ani2";
			newdiv.style.left = (obj.x + 10) +"px";
			newdiv.style.top = (obj.y + 245)+"px";
		}
		newdiv.innerHTML = "<div class='flex_Box divStyDb_son'><div><span style='font-size:8px;'>NO</span><span style='font-size:16px;color:#ffff06;'>"+obj.id+"</span></div><div style='font-size:14px;'>"+obj.name+"</div><div style='color:#ffff06;font-size:16px;'>"+obj.value+"</div></div>";
		document.getElementById("mapCharts").appendChild(newdiv);
}
/*****一次添加三个举牌div,计算每个牌子的高度和位置*******/
function sortHeight(arr){ 
    console.log(arr)
	arr.sort(function(num1,num2){
		return num1.x - num2.x;
	})
	//console.log(JSON.stringify(arr));
	var R = 100;
	arr[0].h = 270;  //排序之后给要添加的数组固定一个高度，以便于计算另外两个的高度    
	if(arr[1]){
		if(arr[1].x - arr[0].x >= R && Math.abs(arr[1].y - arr[0].y) >= 100){
			arr[1].h = arr[0].h;
			if(arr[2]){
				if(arr[2].x - arr[1].x >= R || (Math.abs(arr[2].y - arr[1].y) >= 100 && Math.abs(arr[2].y - arr[0].y) >= 100) || Math.abs(arr[2].y - arr[1].y) >> 100 || Math.abs(arr[2].y - arr[0].y) >> 100  ){
					arr[2].h = 204;
				}else{
					if(arr[2].x - arr[1].x < R && arr[1].y > arr[0].y){
						arr[2].h = arr[0].h - Math.sqrt((Math.pow(R,2) - Math.pow((arr[2].x-arr[1].x),2)));
					}else if(arr[2].x - arr[1].x < R && arr[0].y > arr[1].y){
						arr[2].h = arr[0].h - Math.sqrt((Math.pow(R,2) - Math.pow((arr[2].x-arr[0].x),2)));
					}
				}
			}
		}else{
			if(arr[1]){
				arr[1].h = arr[0].h + Math.sqrt(Math.abs(Math.pow(R,2) - Math.pow((arr[1].x-arr[0].x),2))) - (arr[0].y-arr[1].y);
				if(arr[2]){                    
						arr[2].h = arr[0].h - Math.sqrt(Math.abs(Math.pow(R,2) - Math.pow((arr[2].x-arr[0].x),2))) - (arr[0].y-arr[2].y);
						if(arr[2].h < 110 && arr[2].x - arr[0].x < R){                           
							arr[0].h = 120;
							arr[1].h = arr[0].h + Math.sqrt(Math.abs(Math.pow(R,2) - Math.pow((arr[1].x-arr[0].x),2))) - (arr[0].y-arr[1].y);
							arr[2].h = arr[1].h + Math.sqrt((Math.pow(R,2) - Math.pow((arr[2].x-arr[1].x),2))) - (arr[1].y-arr[2].y);//Math.abs(arr[1].y-arr[2].y);
						}else if(arr[2].x - arr[0].x > R){                           
							arr[2].h = arr[1].h- Math.sqrt(Math.abs(Math.pow(R,2) - Math.pow((arr[2].x-arr[1].x),2))) - (arr[1].y-arr[2].y);
                            console.log(arr[2].h)
                            //Math.abs(arr[1].y-arr[2].y); 
                        }
				}
			}
		}
	}
	arr.sort(function(num1,num2){
		return num2.h - num1.h;
	});
	$('span[id*=XHpublic]').css('background-color','#0975d7');
	var s = 0.2;
	for(var i =0 ;i<arr.length;i++){
		$('#XHpublic'+arr[i].id).css('background-color','#f8c200');
		addDiv(arr[i],0,s);
		s += 0.1*(i+1);     //举牌事件差，自定义
	}
}