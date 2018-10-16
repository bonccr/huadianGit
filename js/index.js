$(function(){
	//修改顶部名称
//	changeName();
	
	//底部导航栏实现
//	zfjk();
	
	//map
	mapCharts();
	loadDT(mapTip);
	placard();

	
})
//时间
function setDateTime() {
		$(".dateTxt1").html(moment().format("YYYY/MM/DD"));
		$(".dateTxt2").html(moment().format("HH:mm:ss"));
		setTimeout(setDateTime, 1000);
	}
	setDateTime();
//map
var mapChart = echarts.init(document.getElementById("mapCharts"));
var mapChart_option = {};
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
	$.get('Echarts_map/json/china.json', function (chinaJson) {
//		$.get('json/shenzhen.json', function (chinaJson) {
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
			        left:200,
			        top:90,
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
						    left:200,
			        		top:90,
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
	console.log(JSON.stringify(arr));
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
