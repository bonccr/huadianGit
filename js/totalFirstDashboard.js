
/** mqtt **/ 
var bs = false;//标识符：true:生产，false: 测试
var mosq = new Mosquitto();
var url = "ws://" + host + ":" + port + "/mqtt";
var mosq2 = new Mosquitto();
var url2 = "ws://" + host2 + ":" + port + "/mqtt";
var tabStr = "ZYSP";

var topicTrade1 = 'CT/event/'+tabStr+'selfSupport/money/all';   //71家支行自营存款数据
var topicTrade2 = 'CT/event/'+tabStr+'public/money/all';   //71家支行对公存款数据
var topicTrade3 = 'CT/event/'+tabStr+'savings/money/all';   //71家支行储蓄存款数据

var topicTrade4 = 'CT/event/'+tabStr+'in1/money/all'; 	//流入TOP20交易额数据 1 ~ 10 

var topicTrade11 = 'CT/event/'+tabStr+'in2/money/all'; 	//流入TOP20交易额数据11 ~ 20

var topicTrade12 = 'CT/event/'+tabStr+'out1/money/all'; 	//流出TOP20交易额数据 1 ~ 10

var topicTrade13 = 'CT/event/'+tabStr+'out2/money/all'; 	//流出TOP20交易额数据 11 ~ 20

var topicTrade5 = 'CT/event/'+tabStr+'yuE/money/all';   //中间翻牌交易余额显示数据

var topicTrade6 = 'CT/event/'+tabStr+'bar/data/all';    //柱状图交易数据

var topicTrade7 = 'CT/event/'+tabStr+'line/data/all';     //折线图交易数据

var topicTrade8 = 'CT/event/'+tabStr+'everyType/money/all';   //各类型交易数据展示

var topicTrade9 = 'CT/event/'+tabStr+'jX/money/all';   //折线图日均余额

var topicTrade10 = 'CT/event/'+tabStr+'dt/money/all';   //地图举牌子数据主题 
//   数据格式:     [{"NUM":1,"MONEY":"xx数值","BRANCH_NO":"支行机构号"}....]

/** mqtt **/

/*
 *  图表声明变量
 * */


//柱状图
var barChart = echarts.init(document.getElementById("barCharts"));
var barChart_option = {};
var lineChart = echarts.init(document.getElementById("lineCharts"));
var lineChart_option = {};
var mapChart = echarts.init(document.getElementById("mapCharts"));
var mapChart_option = {};


/***控制是否切换左侧表格***/
var switchL = true;     //设置鼠标滑过左侧表格标志，，划上静止，，鼠标移开开启
var switchT = true;    //防止重复开启延时器轮播左侧表格，，设置标签
var two = false;       //切换举牌子效果   true为两个同时，，false为三个同时
var lTime = 35000;     //记录右侧面板已加载的哪部分数据
var themROld = null;
var themR = {"in1":[],"in2":[],"out1":[],"out2":[]};

var guaData = [];       //记录挂牌数据


/****LG
 * 两侧表格tab标签点击函数
 * ****/
var thatt = null;      //防止重复点击同一个按钮，，，记录当前点击按钮
var clickTime = 0;    //为防止重复点击设置的时间戳，，，不起作用
function menuClick(that){
	indexTab = $(that).parent().index();
	if(that != thatt){
		var type = $(that).data().type;
		var id = $(that).attr("id");
		fadeFn({
			id : type,  //"R"
			bs:id
		},{
			id : type,  //"R"
			type:id,
			data:themData[id]
		});
		thatt = that;
	}
}
function myOnLoad() {
	//当前时间
	function setDateTime() {
		$("#datetime").html(moment().format("YYYY年MM月DD日"));
		$("#hourminute").html(moment().format("HH:mm:ss"));
		setTimeout(setDateTime, 1000);
	}
	setDateTime();
	//定时刷新
	function autoRefresh() {
		var today = new Date()
		var h = today.getHours()
		var m = today.getMinutes()
		var s = today.getSeconds()
		if (h == 23 && m == 59 && (s > 55 && s < 59)) {
			location.reload();
		}
		setTimeout(autoRefresh, 5000);
	}
	setTimeout(autoRefresh, 5000);
	$('.listL').hover(function (){
		switchL = false;
	},function(){
		switchL = true;
	});
	mapCharts();
	barCharts([]);
	lineCharts([]);
	setTimeout(function (){
		LoadTabDataR();
	//	setInterval(LoadTabDataR,10000);
	},500);
	setTimeout(loadGG,15000);
	if(bs){
			connectMq(mosq,url);
			connectMq(mosq2,url2);
			// 回调函数
			mosq.onmessage = function(topic, payload, qos) {
				// payload 订阅回来收到的消息。
				// topic 传回来从哪个订阅主题上返回的（主题）
				//console.log("主题："+topic+"=========内容："+payload);
				try {
					toMassage(topic,payload);
				} catch (err) {
					//alert(err);
				} finally {
					//alert('mq返回值:格式错误');
				}
			};
			mosq.ondisconnect = function(rc) {
				setTimeout(connectMq, 30000);//失去连接后，30秒自动在连	
			};
			mosq.onconnect = function(rc) {
				console.log("连接mq成功！");
			};
	}else{
        
		//setInterval(function(){_test({value:Math.round(Math.random()*99999999999),type:'value'})},10000);
		LoadTab('L',[{id:"self-support",data:[
					{num:1,branch_name:"自营支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:2,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:3,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:4,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:5,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:6,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:7,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:8,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:9,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:10,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:11,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:12,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:13,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:14,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:15,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:16,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:17,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:18,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:19,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},	
					{num:20,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:21,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:4,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:5,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:6,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:7,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:8,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:9,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:10,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:2,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:3,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:4,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:5,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:6,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03,unit_name:"万元"},
					{num:7,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:8,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:9,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:10,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},	
					{num:2,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:3,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:4,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:5,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:6,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:7,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:8,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:9,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:10,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},	
					{num:2,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:3,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:4,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:5,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:6,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:7,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:8,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:9,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:10,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},	
					{num:2,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:3,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:4,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:5,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:6,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:7,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:8,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:9,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:10,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},	
					{num:2,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:3,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:4,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:5,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:6,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:7,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:8,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:9,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03},
					{num:10,branch_name:"北苑南支行",money:"705",average_money:"705",change_rate:0.03}	
				]}]);
					LoadTab('R',[
              					 {num:1,branch_name:"流入支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",flow:'in',unit_name:"万元"},
						          {num:2,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:3,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"存款",unit_name:"万元"},
						          {num:4,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:5,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"存款",unit_name:"万元"},
						          {num:6,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:7,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"存款",unit_name:"万元"},
						          {num:8,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:9,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:10,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"}	
              				]);
		var a = 0;
		setInterval(function(){
			a++;
			if(a > 3){
				a = 0;
			}
			if(a == 0){
				LoadTab('R',[
              					{num:1,branch_name:"流入支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",flow:'in',unit_name:"万元"},
						          {num:2,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:3,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"存款",unit_name:"万元"},
						          {num:4,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:5,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"存款",unit_name:"万元"},
						          {num:6,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:7,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"存款",unit_name:"万元"},
						          {num:8,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:9,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:10,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"}	
              				]);
			}
			else if(a == 1){
				LoadTab('R',[
              					{num:11,branch_name:"流入支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",flow:'in',unit_name:"万元"},
						          {num:12,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:13,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"存款",unit_name:"万元"},
						          {num:14,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:15,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"存款",unit_name:"万元"},
						          {num:16,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:17,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"存款",unit_name:"万元"},
						          {num:18,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:19,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:20,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"}	
              				]);
			}
			else if(a == 2){
				LoadTab('R',[
              					{num:1,branch_name:"流入支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",flow:'out',unit_name:"万元"},
						          {num:2,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:3,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"存款",unit_name:"万元"},
						          {num:4,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:5,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"存款",unit_name:"万元"},
						          {num:6,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:7,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"存款",unit_name:"万元"},
						          {num:8,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:9,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:10,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"}	
              				]);
			}
			else if(a == 3){
				LoadTab('R',[
              					{num:11,branch_name:"流入支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",flow:'out',unit_name:"万元"},
						          {num:12,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:13,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"存款",unit_name:"万元"},
						          {num:14,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:15,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"存款",unit_name:"万元"},
						          {num:16,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:17,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"存款",unit_name:"万元"},
						          {num:18,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:19,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"},
						          {num:20,branch_name:"北苑南支行",money:"705",enterprise_name:"北京分公司",trade_type:"转账",unit_name:"万元"}	
              				]);
			}
		},5000);
		setTimeout(function(){
			barCharts(getBarChartData());
			lineCharts(getLineChartData());
			//placard();
		},2000)
		setTimeout(function(){
			lineChart_option.series[1].data = [2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200];
			lineChart.setOption(lineChart_option, true);
		},3000);
		
		two = false;
		setInterval(processTip,4000);
		loadPai([{'Dg-M':1111111111111111,'first_M':2323232332,'yes_D_M':232323,'y_e_rate':0.33,'l_threshold':500}]);
		loadG([
			{'deposit_type':'self','balance':'22222222','unit_name':'万元'},
			{'deposit_type':'public','balance':'33333333','unit_name':'万元'},
			{'deposit_type':'savings','balance':'4444444','unit_name':'万元'},
			{'deposit_type':'financial','balance':'5555555','unit_name':'万元'},
			{'deposit_type':'corporate','balance':'6666666','unit_name':'万元'},
			{'deposit_type':'personal','balance':'99999999','unit_name':'万元'},
			]);
		//_test({value:Math.round(Math.random()*99999999999),type:'value'})
		//processTip();
		//setInterval(function(){_test({value:Math.round(Math.random()*99999),type:'value1'})},5000);
		//动态折线图
//		setInterval(function (){
//			var data = getChartData();
//			for(var i = 0;i < 5; i++){
//				data[0].shift();
//				data[1].shift();
//				data[0].push(Math.round(Math.random()*100)+":"+Math.round(Math.random()*100));
//				data[1].push(Math.round(Math.random()*10));
//			}
//			lineChart_option.xAxis[0].data = data[0];
//			lineChart_option.series[0].data = data[1];
//			lineChart.setOption(lineChart_option, true);
//		},3000)
	}
		
		
		
		
		
		
}
//处理mq推送的消息
function toMassage(topic,payload){
	if (topic == topicTrade1) {
		//console.log("主题："+topic+"=========内容："+payload);
		var josnO = eval('(' + payload + ')');
		//console.log("==点的个数："+josnObj.branch_view.length);
		var selfData = jxTabL("self-support",josnO);
		LoadTab("L",selfData);
	}
	if (topic == topicTrade2) {
		var jsonT = eval('(' + payload + ')');
		var publicData = jxTabL("public",jsonT);
		LoadTab("L",publicData);
	}
	if (topic == topicTrade3) {
		var jsonTh = eval('(' + payload + ')');
		var savData = jxTabL("savings",jsonTh);
		LoadTab("L",savData);
	}
	if (topic == topicTrade4) {
		var josnIn1 = eval('(' + payload + ')');
		//LoadTab("R",josnR);
		if(!josnIn1.length){
			themR["in1"] = [];
		}else{
			storageTabR(josnIn1);
		}
		if(themR["in1"].length && !themR["in2"].length && !themR["out1"].length && !themR["out2"].length){
			themR["in1"][0].FLOW = "in";
			LoadTab("R",themR["in1"]);
			themObj["in1"] = false;
			themROld = "in1";
		}
		
	}
	if (topic == topicTrade11) {
		var josnIn2 = eval('(' + payload + ')');
		//LoadTab("R",josnR);
		if(!josnIn2.length){
			themR["in2"] = [];
		}else{
			storageTabR(josnIn2);
		}
	}
	if (topic == topicTrade12) {
		var josnOut1 = eval('(' + payload + ')');
		//LoadTab("R",josnR);
		if(!josnOut1.length){
			themR["out1"] = [];
		}else{
			storageTabR(josnOut1);
		}
		if(!themR["in2"].length && !themR["in1"].length && !themR["out2"].length && themR["out1"].length){
			themR["out1"][0].FLOW = "out";
			LoadTab("R",themR["out1"]);
			themObj["out1"] = false;
			themROld = "out1";
		}
		
	}
	if (topic == topicTrade13) {
		var josnOut2 = eval('(' + payload + ')');
		//LoadTab("R",josnR);
		if(!josnOut2.length){
			themR["out2"] = [];
		}else{
			storageTabR(josnOut2);
		}
		
	}
	if (topic == topicTrade5) {
		var josnPai = eval('(' + payload + ')');
		loadPai(josnPai[0]);
	}
	if (topic == topicTrade6) {
		var josnBar = eval('(' + payload + ')');
		getChartData("bar",josnBar);
	}
	if (topic == topicTrade7) {
		var josnLine = eval('(' + payload + ')');
		getChartData("line",josnLine);
	}
	if (topic == topicTrade8) {
		var josnG = eval('(' + payload + ')');
		guaData = josnG;
		loadG(josnG);
	}
	if (topic == topicTrade9) {
		var josnJX = eval('(' + payload + ')');
		var arr1 = [],arr2 = [],arr3 = [];
		for(var i = 0,len = josnJX.length;i < len ; i++){
			arr2.push(josnJX[i].X);     // x轴数据
			arr3.push(Number(josnJX[i].Y));      // y轴数据
		}
		//setTimeout(function (){
			lineChart_option.series[1].data = arr3;//[2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200];
			lineChart.setOption(lineChart_option, true);
		//},100);
	}
	if (topic == topicTrade10) {
		var josnD = eval('(' + payload + ')');
		loadDT(josnD);
	}
}
//订阅mq主题 
function connectMq(mosq,url){
	mosq.connect(url);//连接
	mosq.subscribe(topicTrade1,0);
	//mosq.subscribe(topicTrade2,0);
	//mosq.subscribe(topicTrade3,0);
	mosq.subscribe(topicTrade4,0);
	mosq.subscribe(topicTrade5,0);
	mosq.subscribe(topicTrade6,0);
	mosq.subscribe(topicTrade7,0);
	mosq.subscribe(topicTrade8,0);
	mosq.subscribe(topicTrade9,0);
	mosq.subscribe(topicTrade10,0);
	mosq.subscribe(topicTrade11,0);
	mosq.subscribe(topicTrade12,0);
	mosq.subscribe(topicTrade13,0);
	setTimeout(function (){
		connectMq2(mosq,url);
	},100);
}
function connectMq2(){
	mosq.subscribe(topicTrade2,0);
	mosq.subscribe(topicTrade3,0);
} 
function loadGG(){
	if(guaData.length){
		loadG(guaData);
	}
	setTimeout(loadGG,13000);
}
/**********储存右侧面板数据*********/
function storageTabR(arr){
	themR[arr[0].FLOW] = arr;
}
var themObj = {
	"in1":true,
	"in2":true,
	"out1":true,
	"out2":true
}
/**********处理右侧面板需加载的数据,写的很繁琐，有待修改*********/
function LoadTabDataR(){
	for(var i in themR){
		if(themR[i].length){
			if(themROld != i && themObj[i]){
				if(themR[i][0].FLOW.indexOf("in") > -1){
					themR[i][0].FLOW = "in";
					themObj[i] = false;
					if(themROld && themROld.indexOf("in") > -1){
						themObj["out1"] = true;
						themObj["out2"] = true;
						if((!themR["out1"].length && !themR["out2"].length) || (!themR["out1"].length && themR["out2"].length && i == "in1") || (themR["out1"].length && !themR["out2"].length && i == "in1") ){
							if(i == "in1"){
								themObj["in2"] = true;
							}else{
								themObj["in1"] = true;
							}
						}
					}else if(i == "in1" && !(themR["in2"].length)){
						themObj["out1"] = true;
						themObj["out2"] = true;
					}else if(i == "in2" && !(themR["in1"].length)){
						themObj["out1"] = true;
						themObj["out2"] = true;
					}
				}else if(themR[i][0].FLOW.indexOf("out") > -1){
					themR[i][0].FLOW = "out";
					themObj[i] = false;
					if(themROld && themROld.indexOf("out") > -1){
						themObj["in1"] = true;
						themObj["in2"] = true;
						if( (!themR["in1"].length && !themR["in2"].length) || (!themR["in1"].length && themR["in2"].length && i == "out1") || (themR["in1"].length && !themR["in2"].length && i == "out1")){
							if(i == "out1"){
								themObj["out2"] = true;
							}else{
								themObj["out1"] = true;
							}
						}
					}else if(i == "out1" && !(themR["out2"].length)){
						themObj["in1"] = true;
						themObj["in2"] = true;
					}else if(i == "out2" && !(themR["out1"].length)){
						themObj["in1"] = true;
						themObj["in2"] = true;
					}
				}
				LoadTab("R",themR[i]);
				themROld = i;
				//setTimeout(LoadTabDataR,10000);
				//return false;
				break;
			}
		}else{
	if((!themR["in2"].length && !themR["in1"].length && !themR["out1"].length && !themR["out2"].length) || (!themObj["in2"] && !themObj["in1"] && !themObj["out1"] && !themObj["out2"])){
				$('#tab_R').html("").children('li');
				$('#myMenu2 li').removeClass('active');
				themObj["in1"] = true;
				themObj["in2"] = true;
				themObj["out1"] = true;
				themObj["out2"] = true;
				themROld = null;
			}
		}
	}
	setTimeout(LoadTabDataR,10000);
}
/**********处理地图数据************/
function loadDT(obj) {
	for(var i = 0 , len = obj.length;i < len;i++){
		for(var j = 0 , lenM = mapTip.length;j < lenM;j++){
			if(mapTip[j].id == obj[i].BRANCH_NO){
				mapTip[j].value = obj[i].MONEY;
				mapTip[j].No = obj[i].NUM;
			}
		}
	}
}

/**********加载中间地图下挂牌数据,外加右侧大额阈值************/
//方法一
var old_index = '#000';
function loadG(obj) {
	$('.gua_pai').find('.init_gua').removeClass('add_gua');
	//$('.gua_pai').find('.gua_meng').removeClass('add_gua_meng');
	if(old_index == '#000') {
		old_index = 'rgba(6,182,210,.8)';//'rgba(21,106,174,.8)';//'rgba(6,189,218,.8)';//'#228CB3';//"#156AAE";
	}else{
		old_index = "#000";
	}
	var arr1 = [],arr2 = [];
	setTimeout(function(){
		for(var i = 0 , len = obj.length;i < len;i++){
			(function(obj){
				if(obj.DEPOSIT_TYPE == 'self' || obj.DEPOSIT_TYPE == 'public' || obj.DEPOSIT_TYPE == 'savings'){
		//fff(obj);
		arr1.push(obj);	
	}else{
		//setTimeout(function(){
			//fff(obj);
		//},500);
		arr2.push(obj)
	}
			})(obj[i])
		}
		//for(var j = 0;j<3;j++){
			fff(arr1);
			setTimeout(function(){
				fff(arr2);
			},800)
		
	},100);
	
}
function fff(obj){
	for(var i = 0;i<obj.length;i++){
		(function(obj){
			$('#'+obj.DEPOSIT_TYPE+'_deposit_parent').addClass('add_gua',function(){
				var that = $(this);
				setTimeout(function(){
					$('#'+obj.DEPOSIT_TYPE+'_deposit').fadeOut(400).html(milliFormat(obj.BALANCE)).fadeIn();
					$('#'+obj.DEPOSIT_TYPE+'_deposit_name').fadeOut(400).html(obj.UNIT_NAME).fadeIn();
					that.css('background-color',old_index);
				},380)
			})
			//$('#'+obj.DEPOSIT_TYPE+'_deposit_parent').children('.gua_meng').addClass('add_gua_meng');
		})(obj[i])
	}
}
//方法二
function loadG2(obj){
	$('.gua_pai').children('li').attr('style','');
	var n = 500;
	setTimeout(function(){
		for(var i = 0 , len = obj.length;i < len;i++){
			(function(obj,n){
				fff2(obj,n);
			})(obj[i],n)
			n += 500;
		}
	},100);
}
function fff2(obj,n){
	$('#'+obj.DEPOSIT_TYPE+'_deposit_parent').attr({'style':'animation: gua_money 1000ms ease-in-out '+ n +'ms forwards;'});
	setTimeout(function(){
		$('#'+obj.DEPOSIT_TYPE+'_deposit').html(milliFormat(obj.BALANCE));
		$('#'+obj.DEPOSIT_TYPE+'_deposit_name').html(obj.UNIT_NAME);
	},(n+550));
}
/************加载中间翻牌数据,外加右侧大额阈值************/
//{Dg-M:xxx数值，first_M：xxx数值，yes_D_M：xx数值，y_e_rate：xx数值,l_threshold:xxx数值}
function loadPai(obj) {
	if(obj['DG_M']){
		_test({value:obj['DG_M'],type:'value'})
	}
	if(obj.FIRST_M){
		$('#first_M').html(milliFormat(obj.FIRST_M));
	}else{
		$('#first_M').html('----');
	}
	if(obj.YES_D_M){
		$('#yes_D_M').html(milliFormat(obj.YES_D_M));
	}else{
		$('#first_M').html('----');
	}
	if(obj.L_THRESHOLD){
		$('#Fa_Z').val(obj.L_THRESHOLD);
	}else{
		$('#Fa_Z').val('---');
	}
	if(obj.Y_E_RATE > 0){
		$('#y_e_rate').html('增加 '+obj.Y_E_RATE+'%');
	}else{
		$('#y_e_rate').html(obj.Y_E_RATE+'%');
	}
}


/*****左侧表格数据分为三个主题，此函数为公共函数处理数据*****/
function jxTabL(direction,arr){
	var obj = {};
	obj.id = direction;
	obj.data = arr;
	return obj;
}
/*定时加载表格数据*/
function LoadTab(direction,obj){
	if(direction == "L"){
	//	for(var i = 0,len = obj.length;i < len;i++ ){
			themData[obj.id] = obj.data;
	//		if(obj.id == "public"){
	//			loadDT(obj.data);
	//		}
		//}
		var type = $('#myMenu1>li[class*=active]').find('a').attr('id');
			if(obj.id == type){
				fadeFn({
				id : direction,  //"R"
				bs:type
			},{
				id : direction,  //"R"
				type:type,
				data:themData[type]
			});
		}
		if(switchT){
			processTip();
			//setInterval(processTip,5000);
			setTimeout(timeSwitch,lTime);
			switchT = false;
		}
	}else{
		var type = obj[0].FLOW + "flow";
		$('#'+ type).parent().addClass('active').siblings('li').removeClass('active');
		fadeFn({
			id : direction,  //"R"
		},{
			id : direction,  //"R"
			data:obj
		});
	}
}
//定时任务
var indexTab = 0;
function timeSwitch(){
	if(switchL){
		indexTab++;
		if(indexTab >= $('#myMenu1 li').length ){
			indexTab = 0;
		}
		 $('#myMenu1 li').eq(indexTab).addClass('active').siblings('li').removeClass('active');
		var that = $('#myMenu1 li').eq(indexTab).children('a')[0];
		menuClick(that);
	}
	setTimeout(timeSwitch,lTime);
}
/*******************************以下为表格项飞入飞出效果代码*****************************/ 
/*******返回左侧表格加载项********/
function getTabL(obj,s,type){
	var str = "<li class='fadeInL flex_Box' style='animation: moveInL 650ms ease-in-out "+s+"ms forwards;'><span  class='xh' style='background-color:#"+(obj.NUM == 1 || obj.NUM == 2 || obj.NUM == 3 ? 'f8c200' : '0975d7')+"'>"
		+obj.NUM+"</span>"
		+"<span class='flex_Box white'>"+(obj.BRANCH_NAME ? obj.BRANCH_NAME : "")+"</span>"
		+"<span class='white white2'>"+(obj.MONEY ? obj.MONEY : "")+"</span>"
		+"<span class='bsColor'><font style='font-size:12px;margin-right:2px;'>日均</font><font>"+(obj.AVERAGE_MONEY ? obj.AVERAGE_MONEY : "")+"</font></span>"
		+"<span class='flex_Box white bx'>"+ setTabLBS(obj.CHANGE_RATE) +"</span>"
		+"</li>";
	return str;
}
/*******返回右侧表格加载项********/
function getTabR(obj,s){
	var str = "<li class='fadeInR flex_Box' style='animation: moveInR 650ms ease-in-out "+s+"ms forwards;'><span class='xh' style='background-color:#"+(obj.NUM == 1 || obj.NUM == 2 || obj.NUM == 3 ? 'f8c200' : '0975d7')+"'>"
		+obj.NUM+"</span>"
		+"<span class='white white4'>"+(obj.BRANCH_NAME ? obj.BRANCH_NAME : "")+"</span>"
		+"<span class='white white3 text-overflow'>"+(obj.ENTERPRISE_NAME ? obj.ENTERPRISE_NAME : "")+"</span>"
		+"<span class='bsColor2 text-overflow'>"+setTabRBS(obj.TRADE_TYPE)+"</span>"
		+"<span class='flex_Box white bx2'>"+(obj.MONEY ?  obj.MONEY : "")+"</span>"
		+"</li>";
	return str;
}
/*******处理右侧数据函数变色********/
function setTabRBS(n){
	var str = '';
	if(n == "转账"){
		str = "<font style='color:#21bcec;'>"+ n +"</font>";
	}else{
		str = "<font style='color:#ffdd00;'>"+( n ? n : "")+"</font>";
	}
	return str;
}
/*******处理左侧数据函数变色********/
function setTabLBS(n){
	var str = '';
	if( n >= 0){
		str = "<span style='min-width:69px;height:23px;background-color:#f85c05;line-height:23px;'>+"+ n +"%</span>";
	}else if(n < 0){
		str = "<span style='min-width:69px;height:23px;background-color:#04A709;line-height:23px;'>"+ n +"%</span>";
	}
	return str;
}
/*******渲染列表数据函数********/ 
function setTab(obj){
	var i = 0;
	var str = '';
	var s = 100;//800;
	while(obj.data[i]){
		str += (obj.id == "L" ? getTabL(obj.data[i],s,obj.type) : getTabR(obj.data[i],s));
		s += 50;
		i++;
	}
	$("#tab_"+obj.id).html(str);
}


/*******飞入飞出函数********/
function fadeFn(obj,objFn){
	if(obj.id == "L") {
		$('#tab_'+obj.id).scrollTop(0);
	}
	var aLi = $('#tab_'+obj.id+' li');
	var i = 0;
	if(!aLi.length && objFn){
		setTab(objFn);
		return false;
	}
	var s = 50;//800;
	function aaa(){
		if(i >= aLi.length){
			if(objFn){
				setTimeout(function(){
					//$('#'+obj.id).perfectScrollbar('destroy');
					setTab(objFn);
				},900);
			}
			return;
		}
		aLi.eq(i).toggleClass("fadeOut"+obj.id+" fadeIn"+obj.id).attr('style','animation:moveOut'+obj.id+' 600ms ease-in-out '+s+'ms forwards;');//.css('animation','moveOutL '+s+'ms ease-in-out forwards;');
		s += 50;
		i++;
		aaa();
	}
	aaa();
}
/*****************以上为表格项飞入飞出效果代码**/ 

/*****模拟图标数据函数******/
function getLineChartData(){
	var data = [["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],[2000,2300, 2005, 1500, 2320, 2302, 3400, 3220, 2132, 1920, 1130, 2023, 5002, 3902, 2023, 2300, 5232, 3145, 2321, 1213, 4211, 5653, 4652, 4541]];
	return data;
}
function getBarChartData(){
	var data = [["01-03","01-05","01-07","01-20","02-10","02-09","02-08","02-08","03-18","03-28","03-08","03-28","03-09","03-19","03-20","04-21","04-22","05-23","05-24","05-05","05-09","06-02","06-20","06-24"],[255, 276, 866, 666, 766, 366, 866, 866, 1266, 326, 1266, 236, 236, 256, 776, 666, 566, 555, 456, 446, 666, 446, 766, 666]];
	return data;
}
/***************图表数据解析******************/
function getChartData(chart,obj){
	if(obj){
		var arr1 = [],arr2 = [],arr3 = [];
		for(var i = 0,len = obj.length;i < len ; i++){
			arr2.push(obj[i].X);     // x轴数据
			arr3.push(Number(obj[i].Y));      // y轴数据
		}
		arr1.push(arr2);
		arr1.push(arr3);
		//return arr1;
		if(chart == "bar"){
			//barCharts(arr1);
			//return ;
			barChart_option.xAxis[0].data = arr2;
			barChart_option.series[0].data = arr3;
			barChart.setOption(barChart_option, true);
		}else{
			//lineCharts(arr1);
			//return ;
			lineChart_option.xAxis[0].data = arr2;
			lineChart_option.series[0].data = arr3;
			lineChart.setOption(lineChart_option, true);
		}
	}
}
/************柱状图代码***************/

function barCharts(obj){
	//app.title = '当年对公日均存款余额';

	barChart_option = {
	    color: ['#0df8fc'],
	    title:{
	    	text : '今年对公日均存款余额（百万）',
	    	textStyle:{
	    		color:'#fdfa89',
	    		fontSize:24,
	    		fontFamily : '微软雅黑',
	    		fontWeight : 'bold',
	    	}
	    },
	    tooltip : {
	        trigger: 'axis',
		//	 triggerOn :"none",        //取消提示框跟随鼠标移动效果，慎用,折线图的时候使用
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
	        },
	        formatter : function(obj) {
	        	return "时间：" + obj[0].axisValue+"<br>"+"金额："+obj[0].data + "&nbsp;&nbsp;百万";
			}
	    },
	    grid: {
	        left: '2%',
	        right: '5%',
	        bottom: '6%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	        	type : 'category',
	           // name : '月',
	            //nameLocation : 'end',
	            splitNumber : 3,
	            nameTextStyle :{
	                color:'#5a98bf'
	            },
	            data : (obj[0] ? obj[0] : []),
	            axisTick: {
	                show:false,
	                alignWithLabel: false
	            },
	            splitLine: {
	                show: false
	            },
	            axisLine :{
	                lineStyle :{
	                    color:"#90cae5",
	                    width :2,
	                    type :'solid'
	                }
	            },
	            axisLabel:{
	                textStyle:{
	                    color:"#96d6f9"
	                }
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	           // name : '(万元)',
	          //  nameLocation : 'start', //坐标轴数值单位
	            min : "dataMin",
	            nameTextStyle :{
	                color:'#5a98bf'
	            },
	            axisLine :{
	                show:false
	            },
	            axisTick :{
	                show:false
	            },
	            splitLine :{
	                lineStyle:{
	                    color:"rgba(238,238,238,.5)"
	                }
	            },
	            axisLabel:{
	            	textStyle :{
	            		color : '#85d9ff'
	            	}
	            }
	        },
	    ],
	    series : [
	        {
	            name:'柱状图',
	            type:'bar',
	           //	barWidth: 10,
	            data:(obj[1] ? obj[1] : [])
	            //data:[10, 52, 200, 334, 390, 330, 220, 52, 200, 334, 200, 334, 200, 334, 200, 334, 200, 334, 200, 334]
	        }
	    ],
	    animationEasing:'cubicOut',
	    animationDelay: function (idx) {
	        // 越往后的数据延迟越大
	        return idx * 30;
	    }
	};
	barChart.setOption(barChart_option, true);
}
/*****折线图配置项*****/
function lineCharts(obj) {
	lineChart_option = {
		    color: ['#f3f611'],
		    title:{
		    	text : '今日对公存款实时余额（百万）',
		    	textStyle:{
		    		color:'#fdfa89',
		    		fontSize:24,
		    		fontFamily : '微软雅黑',
		    		fontWeight : 'bold',
		    	},
		    	//textAlign:'center' 
		    	right:0
		    },
		    legend:{
			left:'4%',
			top:'9%',
			//orient:'vertical',
		        textStyle:{
			      color:'white',
			      fontSize:15,
			      fontWeight : 'bold'			
			},
			data:['今日实时余额','昨日日均余额']
		    },
		    tooltip : {
		        trigger: 'axis',
		        //triggerOn :"none",        //取消提示框跟随鼠标移动效果，慎用,折线图的时候使用
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'cross',        // 默认为直线，可选为：'line' | 'shadow'
		            axis :"x"
		        },
		        formatter : function(obj,a,b,v) {
		        	//console.log(obj);
		        	return "时间：" + obj[0].axisValue  + "<br>"+obj[0].seriesName+"："+obj[0].data+ "&nbsp;&nbsp;百万" +"<br>"+obj[1].seriesName+"："+ (isNaN(obj[1].data) ? "-----" : obj[1].data) + "&nbsp;&nbsp;百万";
				}
		    },
		    grid: {
		        left: '14%',
		        right: '2%',
		        bottom: '11%',
		        containLabel: false
		    },
		    xAxis : [
		        {
		        	type : 'category',
		            nameTextStyle :{
		                color:'#5a98bf'
		            },
		            data : (obj[0] ? obj[0] : []),
		            axisTick: {
		                show:false,
		                alignWithLabel: false
		            },
		            splitLine: {
		                show: false
		            },
		            axisLine :{
		                lineStyle :{
		                    color:"#90cae5",
		                    width :2,
		                    type :'solid'
		                }
		            },
		            axisPointer :{                          //Y轴坐标指示器默认显示配置，折线图的时候使用
		                show :true,
		                type :"line",
		                lineStyle :{
		                    color:"#eee",
		                  //  width :2,
		                    type :"solid",
		                },
		            },
		            axisLabel:{
		                textStyle:{
		                    color:"#96d6f9"
		                }
		            }
		        }
		    ],
		    yAxis : [
				{
		            type : 'value',
			    min : "dataMin",
		            axisLabel:{
		                textStyle:{
		                    color:"#96d6f9"
		                }
		            },
			    splitLine :{
	                	lineStyle:{
	                    	    color:"rgba(238,238,238,.5)"
	                	}
	            	     },
		            axisLine :{
		                show:false
		            },
		            axisTick :{
		                show:false
		            },
		            axisPointer :{                          //Y轴坐标指示器默认显示配置，折线图的时候使用
		                show :true,
		                type :"line",
		                lineStyle :{
		                    color:"#eee",
		                  //  width :2,
		                    type :"solid",
		                },
		                tiggerTooltip:true,
		                //value :2,
		                snap :false,
		                handle :{
		                    show:false,
		                    icon :null,
		                    size :[0,0]
		                }
		            }
		        }
		    ],
		    series : [
				{
		            name:'今日实时余额',
		            type:'line',
		             areaStyle: {
		                normal: {
		                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                        offset: 0,
		                        color: 'rgb(77, 21, 0)'
		                    }, {
		                        offset: 1,
		                        color: 'rgb(75, 21, 8)'
		                    }])
		                }
		            },
		            showSymbol:false,
		            data:(obj[1] ? obj[1] : [])
				},
				{
		            name:'昨日日均余额',
		            type:'line',
		            tooltip:{
		            	formatter:function(obj){
		            		
		            	}
		            	},
		            itemStyle:{
		            	normal: {
		                    color: "#0295fd"
		                }
		            },
		            showSymbol:false,
		            data:[]//[2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200,2200]
				}
		    ]
		};
		lineChart.setOption(lineChart_option, true);
}
/*****地图配置项*****/
function getInitdata(){
	var placeList = {
			"盐田":[114.244324,22.566908],
            "景田":[114.043723,22.554555],
            "横岗":[114.199607,22.652638],
            "宝城":[113.913661,22.566911],
            "福强":[114.051415,22.524409],
            "海湾":[113.960046,22.535688],
            "龙华":[114.036805,22.667054],
            "西乡":[113.868621,22.581786],
            "高新":[113.958441,22.544962],
            "分行":[114.064829,22.539222],
            "金山":[114.115777,22.546884],
            "红树":[113.976211,22.536547],
            "福南":[114.060358,22.544341],
            "八卦":[114.101719,22.564929],
            "宝安":[113.892283,22.565065],
            "福田":[114.075221,22.535929],
            "南山":[113.937492,22.537451],
            "龙岗":[114.235319,22.728119],
            "广场":[114.106171,22.546076],
            "罗湖":[114.124954,22.542258],
            "皇岗":[114.071836,22.528647],
            "笋岗":[114.111668,22.562923],
            "华侨":[113.988536,22.555724],
            "市民":[114.070516,22.548825],
            "泰然":[114.030868,22.541282],
            "后海":[113.92746,22.517379],
            "香蜜":[114.025121,22.554008],
            "罗湖":[114.126553,22.548799],
            "布吉":[114.129777,22.602266],
            "分行":[114.064829,22.539222],
            "香林":[114.025973,22.543248],
            "三诺":[113.923649,22.527829],
            "深南":[114.075033,22.543948],
            "沙井":[113.813168,22.733926],
            "光明":[113.946653,22.762775],
            "蛇口":[113.920928,22.486674],
            "民治":[114.044323,22.633641],
            "福华":[114.056953,22.541374],
            "大东":[114.346031,22.712597],
            "前海":[113.908022,22.521690]
			};
	var arr = [];
	var obj = {};
	for(var i in placeList){
		obj = {};
		obj.name = i;
		obj.coord  = placeList[i];
//		obj.value = placeList[i];
//		obj.value.push(10);
		arr.push(obj);
	}
	return arr;
}
function mapCharts(obj){
	$.get('json/shenzhen.json', function (chinaJson) {
	    echarts.registerMap('shenzhen', chinaJson);
		var color = ['#01ff07', '#ffa022', '#46bee9'];
		var data = getInitdata();
		mapChart_option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: '{b}'
			    },
			    title:{
			    	text : '支行对公存款余额（亿元）',
			    	textStyle:{
			    		color:'#fdfa89',
			    		fontSize:24,
			    		fontFamily : '微软雅黑',
			    		fontWeight : 'bold',
			    	},
			    },
			    geo: {
			        map: 'shenzhen',
			        label: {
			        	normal: {
			                show: false,
			                position: 'center',
			                textStyle:{
			                	color:'#fff',
			                	fontSize:13
			                }
			            },
			            emphasis: {
			                show: false
			            }
			        },
//			       // layoutCenter:['0%', '100%'],
//			        //layoutSize: 100,
			        aspectScale :0.75,
			        left:52,
			        top:180,
			        zoom:1.2,
			        roam: false,
			        itemStyle: {
			            normal: {
			                areaColor: 'rgba(6,15,44,.5)',
			                borderColor: 'rgba(26,232,255,.5)',
			                borderWidth:1
			            },
			            emphasis: {
			                areaColor: 'yellow'
			            }
			        }
			    },
			     series: [
//				         {
//					        name:'Top10',
//					        type: 'effectScatter',
//					        coordinateSystem: 'geo',
//					        zlevel: 2,
//					        rippleEffect: {
//					            brushType: 'fill'
//					        },
//					        label: {
//					            normal: {
//					                show: true,
//					                position: 'top',
//					                textStyle:{
//					                	color:'white'
//					                },
//					                formatter: '{b}',
//					                emphasis: {
//					                	show:true,
//						                color: 'yellow'
//						            }
//					            }
//					        },
//					        symbolSize: function (val) {
//					            return 10;
//					        },
//					        itemStyle: {
//					            normal: {
//					                color: color[0]
//					            },
//					            emphasis: {
//					                color: 'yellow'
//					            }
//					        },
//					        data: data
//					    }
						{
						    name: 'shenzhen',
						    type: 'map',
						    mapType: 'shenzhen',
						    left:52,
					        top:180,
					        zoom:1.2,
						    roam: false,
						    itemStyle: {
					            normal: {
					                areaColor: 'rgba(6,15,44,0)',
					                borderColor: 'rgba(26,232,255,0)',
					                borderWidth:1
					            },
					            emphasis: {
					                areaColor: 'rgba(26,232,255,0)'
					            }
					        },
						    label: {
						        normal: {
						            show: false,
						        },
						        emphasis: {
						            show: false
						        }
						    },
						    markPoint:{
						    	symbol:"circle",
						    	symbolSize:5,
						    	label: {
							        normal: {
							            show: false,
							            formatter : function(obj) {
//							            	var nn = mapChart.convertToPixel('geo', obj.data.coord);//把标准经纬度转换成像素坐标值
//							            	console.log(nn);
								        	//return "时间："+obj[0].axisValue+"<br>"+"金额："+obj[0].data;
										}
							        },
							        emphasis: {
							            show: false
							        }
							    },
							    itemStyle : {
							        normal: {
							        	color:'#eeeb00',
							        },
							        emphasis: {
							            show: false
							        }
							    },
						    	data:data
						    },
						    data:[]
						}
			     ]
			};
			mapChart.setOption(mapChart_option, true);
            getPixel(data);
	});
}
//地图举牌子函数
//数据格式{name:"复兴门支行",No:23,left:xxx,top:xxx,money:xxxxxx}
var index = 0;
function placard() {
	if(index > mapTip.length){
		index = 0;
	}
	var aDiv = $('#jp>div');
	if(aDiv.length){
		aDiv.eq(0).animate({'opacity':0},1500,function(){
			aDiv.eq(0).remove();
			if(mapTip[index].isShow){
				add(mapTip[index]);
			}
		});
	}else{
		for(var i=0;i<2;i++){
			if(mapTip[index].isShow){
				add(mapTip[index]);
			}
		}
	}
	setTimeout(placard,2000);
}
function add(obj){
	var $div = $("<div class='_divStyDb ani2' style='left:"+obj.x-100+"px;top:"+obj.y+"px'><div class='flex_Box divStyDb_son'><div><span style='font-size:8px;'>NO</span><span style='font-size:16px;color:#ffff06;'>"+obj.id+"</span></div><div style='font-size:18px;'>"+obj.name+"</div><div style='color:#ffff06;font-size:16px;'>"+obj.value+"</div></div></div>");
	$('#jp').append($div);
	index++;
}
function sortPixe(){
	var arr = [];
	var obj = {};
	var id = 0;
	for(var i in Pixel2){
		obj = {};
		id++;
		obj.id = id;
		obj.value = 0;
		obj.isShow = false;
		obj.x = Pixel2[i][0];
		obj.y = Pixel2[i][1];
		obj.name = i;
		arr.push(obj);
	}
	//console.log(JSON.stringify(arr));
}
//转换坐标函数
function getPixel(data){
	var arr = {};
	for(var i=0;i<data.length;i++){
		arr[data[i].name] = mapChart.convertToPixel('geo',data[i].coord);     
		arr[data[i].name][0] = arr[data[i].name][0]-64.5;
		arr[data[i].name][1] = arr[data[i].name][1]-246;          
		
	}
    console.log(JSON.stringify(arr));
}