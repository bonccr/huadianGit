/** 支持缩放功能   **/
//监听浏览器窗口改变大小
var winWidth = 1920;
var winHeight = 1080;
$(window).resize(function(){
	//resetScale();
});
function getSize(){//获得窗口大小
	if (window.innerWidth)
		winWidth = window.innerWidth;
	else if ((document.body) && (document.body.clientWidth))
		winWidth = document.body.clientWidth;
	//获取窗口高度
	if (window.innerHeight)
		winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;

	//通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientHeight
			&& document.documentElement.clientWidth) {
		winHeight = document.documentElement.clientHeight;
		winWidth = document.documentElement.clientWidth;
	}
}
function resetScale(){//调整缩放
	getSize();
	var db = document.body;
	db.style.transform="scale("+winWidth/1920+","+winHeight/1080+")";
}
$(document).ready(function() {
	//resetScale();//初始化缩放
})
/** 支持缩放功能   **/
//打开二级页面
function openModal(titleName, obj){
	$.get("eventGrid.html",function(data){
		$('#myModal').html(data);
		$('#myModalLabel').html(titleName + "——事件详情");//窗口标题
		$('#myModal').draggable({
			handle:".modal-header,.modal-body,.modal-footer"
		});
		$('#myModal').modal('show');
		var $table = $("#eventTable");
		var tb=document.getElementById("eventTable");
		$table.bootstrapTable();
//		var arrObj = [];
//		for(var i = 0; i< 21; i++){
//			arrObj.push({
//				OCCURRENCE_TIME : "2015-09-29 12:12:0"+i,
//				IP : "102.0.32.2",
//				EVENT_DESC : "test",
//				EVENT_LEVEL : "3",
//				dhr:"aaa"
//			});
//		}
		$table.bootstrapTable("append", obj);
		$table.bootstrapTable().on('click-row.bs.table', function(e, row) {
			$("#EVENT_ID").val(row.EVENT_ID);
			$("#IP").val(row.IP);
			$("#EVENT_LEVEL").val(row.EVENT_LEVEL);
			$("#AGENT").val(row.AGENT);
			$("#ALERTKEY").val(row.ALERTKEY);
			$("#SITUATIONNAME").val(row.SITUATIONNAME);
			$("#POSITION").val(row.POSITION);
			$("#OCCURRENCE_TIME").val(row.OCCURRENCE_TIME);
			$("#EVENT_TYPE").val(row.EVENT_TYPE);
			$("#NODEALIAS").val(row.NODEALIAS);
			$("#OCCURRENCE_TIMES").val(row.OCCURRENCE_TIMES);
			$("#MANAGER").val(row.MANAGER);
			$("#HANDLE").val((row.HANDLE=="0"?"未解决":"已解决"));
			$("#SITUATIONALIAS").val(row.SITUATIONALIAS);
			$("#APP_NAME").val(row.APP_NAME);
			$("#LAST_OCCU_TIME").val(row.LAST_OCCU_TIME);
			$("#IDENTIFIER").val(row.IDENTIFIER);
			$("#EVENT_DESC").val(row.EVENT_DESC);
			var trs=document.getElementById("eventTable").getElementsByTagName('tr');
			for(var i = 0, len = trs.length; i < len; i++){
				//console.log(trs[i].childNodes[0].textContent);
				if(trs[i].childNodes[0].textContent == row.EVENT_ID){//rowIndex: 2    outerText     e.childNodes[0].textContent
					trs[i].style.backgroundColor = "#08344e";
					trs[i].style.color = "#ffdd00";
					trs[i].style.height = 10;
				}else{
					trs[i].style.backgroundColor = "";
					trs[i].style.color = "#fff";
					trs[i].style.height = 10;
				}
				
			}
		})
//		setInterval(makescroll, 500);//0点页面自动刷新
	});
	

}
//ATM打开二级页面
function openAtmModal(id, obj,obj2){

	$.get("ATMgrid.html?t="+new Date().getTime(),function(data){
		$('#myModal').html(data);
		$('#myModalLabel').html($('#nameDiv'+id).html() + "ATM");//窗口标题
		$('#atmId span').eq(1).html($('#IdDiv'+id).html().replace('id:',''));
		$('#atmIp span').eq(1).html($('#IP_'+id).val());
		$('#atmZoom span').eq(1).html($('#ZOOM_'+id).val());
		$('#myModal').draggable({
			handle:".modal-header,.modal-body,.modal-footer"
		});
		$('#myModal').modal('show');
		var $table = $("#eventTable");
		var $table2 = $("#eventTable2");
		$table.bootstrapTable();
		$table2.bootstrapTable();
		$table.bootstrapTable("append", obj);
		$table2.bootstrapTable("append", obj2);
	});
	

}
function makescroll(){
	$("#tbview_eventTable").niceScroll( {
				cursorborder : "",
				cursorcolor : "#fff",
				cursoropacitymin : 1,
				cursorfixedheight : window.innerHeight * 0.03,
				boxzoom : false
			});
}
//把多生成的一个table，隐藏掉
//BootstrapTable.prototype.initContainer = function () {
//        this.$container = $([
//            '<div class="bootstrap-table">',
//                '<div class="fixed-table-toolbar"></div>',
//                '<div class="fixed-table-container">',
//                    '<div class="fixed-table-header"><table style="display: none;"></table></div>',
////                    '<div class="fixed-table-header"><table></table></div>',
//                    '<div class="fixed-table-body">',
//                        '<div class="fixed-table-loading">',
//                            this.options.formatLoadingMessage(),
//                        '</div>',
//                    '</div>',
//                    '<div class="fixed-table-pagination"></div>',
//                '</div>',
//            '</div>'].join(''));
//打开网银系统二级页面
function openSubModal(titleName, coreNode){
	$.get("subebank.html",function(data){
		$('#mysubModal').html(data);
		$('#mysubModalLabel').html(titleName + "");//窗口标题
		var left = 25;
		var w = 260;
		var h = 170;
		var countx = 0
		var county = 0;
		var counti = 0;//计数器
		for ( var i = 0, len = coreNode.length; i < len; i++) {
			document.getElementById("submain").innerHTML += "<div class='mysubdiv' id='"
						+ coreNode[i].id
						+ "'"
						+ "	style='position: absolute;padding-left: 6px;top: "
						+ (30+h*county)
						+ "px;left: "
						+ (left+w*countx)
						+ "px;width: "
						+ 230
						+ "px;height: "
						+ 135
						+ "px;border-radius:4px;'>"
						+ "<img class='myimg2' width='140' height='35' alt='' src='images/zj.gif'>"
						+"	<div  onclick='openEventWin("+coreNode[i].id+")' class='mycursor shineG' style='position: absolute;width:18px; height:18px; background-color:#00ff00; border-radius:9px;float: left;top: 10px;left: 16px;' id='_"+coreNode[i].id+"'></div>"
						+ "		<span  id='sysname_"+coreNode[i].id+"' class='mycursor' style=\"position: absolute;left:63px;top:6px;font-family: '微软雅黑';font-size: 14px;color: #68fffe;\">"
						+ coreNode[i].name //+"("+ coreNode[i].id + ")"
						+ "</span>"
						+ "<span style='position: absolute;left:17px;top:75px;font-size: 16px;color: #E4E4E4;'>CPU</span>"
						+ "<span id='cpu_val"+coreNode[i].id+"'  style='position: absolute;left:130px;top:75px;font-size: 16px;color: #30e828;'>0%</span>"
						+ "<div class='progress' style='position: absolute;left:60px;top:80px;background-color: #091216;width:60px;border-style: solid;border-color: #30e828;border-width: 1px;border-radius:0px;height: 10px;padding: 2px;'>"
						+ "<div id='cpu_pb"+coreNode[i].id+"' class='progress-bar' role='progressbar' aria-valuenow='0' aria-valuemin='10' aria-valuemax='100' style='background-color: #30e828;width:0%;text-align: center;'>"
						+ "</div>"
						+ "</div>"
						
						+ "<span style='position: absolute;left:17px;top:100px;font-size: 16px;color: #E4E4E4;'>内存</span>"
						+ "<span id='menu_val"+coreNode[i].id+"'  style='position: absolute;left:130px;top:100px;font-size: 16px;color: #30e828;'>0%</span>"
						+ "<div class='progress' style='position: absolute;left:60px;top:105px;background-color: #091216;width:60px;border-style: solid;border-color: #30e828;border-width: 1px;border-radius:0px;height: 10px;padding: 2px;'>"
						+ "<div id='menu_pb"+coreNode[i].id+"' class='progress-bar' role='progressbar' aria-valuenow='0' aria-valuemin='10' aria-valuemax='100' style='background-color: #30e828;width:0%;text-align: center;'>"
						+ "</div>"
						+ "</div>"
						
						+ "</div>";
			countx++;
			if((counti+1)%3 == 0 && counti!=0){
				countx=0;
				county++;
			}
			counti++;
		}
		$('#mysubModal').draggable({
			handle:".modal-header,.modal-body,.modal-footer"
		});
		$('#mysubModal').modal('show');
		//调用java初始化mq
		$.ajax( {
			type : "post",
			contentType : "appliaction/json",
			url : "inEC?dashboardname=ebank",
			data : {},
			dataType : "json",
			async : true,
			success : function(result) {

			}
		})
		//调用java初始化mq
	})
}
//打开二级页面
function openModalEC(obj){
	$.get("eventForm.html",function(data){
		$('#myModal').html(data);
		$('#myModalLabel').html(obj.APP_NAME + "——事件详情");//窗口标题
		$('#myModal').draggable({
			handle:".modal-header,.modal-body,.modal-footer"
		});
		$('#myModal').modal('show');
		$("#EVENT_ID").val(obj.EVENT_ID);
		$("#IP").val(obj.IP);
		$("#EVENT_LEVEL").val(obj.EVENT_LEVEL);
		$("#AGENT").val(obj.AGENT);
		$("#ALERTKEY").val(obj.ALERTKEY);
		$("#SITUATIONNAME").val(obj.SITUATIONNAME);
		$("#POSITION").val(obj.POSITION);
		$("#OCCURRENCE_TIME").val(obj.OCCURRENCE_TIME);
		$("#EVENT_TYPE").val(obj.EVENT_TYPE);
		$("#NODEALIAS").val(obj.NODEALIAS);
		$("#OCCURRENCE_TIMES").val(obj.OCCURRENCE_TIMES);
		$("#MANAGER").val(obj.MANAGER);
		$("#HANDLE").val((obj.HANDLE=="0"?"未解决":"已解决"));
		$("#SITUATIONALIAS").val(obj.SITUATIONALIAS);
		$("#APP_NAME").val(obj.APP_NAME);
		$("#LAST_OCCU_TIME").val(obj.LAST_OCCU_TIME);
		$("#IDENTIFIER").val(obj.IDENTIFIER);
		$("#EVENT_DESC").val(obj.EVENT_DESC);
	});
	

}
//业务与运行状态视图——打开二级页面
function openModalView(titleName, obj){
	$.get("eventGridView.html",function(data){
		$('#myModal').html(data);
		$('#myModalLabel').html(titleName + "——事件详情");//窗口标题
		$('#myModal').draggable({
			handle:".modal-header,.modal-body,.modal-footer"
		});
		$('#myModal').modal('show');
		var $table = $("#eventTable");
		var tb=document.getElementById("eventTable");
		$table.bootstrapTable();
		//console.log(obj.list_event);
		var info = obj.info;
		$("#name").val(info.name);
		$("#chushi").val(info.chushi);
		$("#type").val(info.type);
		$("#position").val(info.position);
		
		$table.bootstrapTable("append", obj.list_event);
		$table.bootstrapTable().on('click-row.bs.table', function(e, row) {
			$("#EVENT_ID").val(row.EVENT_ID);
			$("#IP").val(row.IP);
			$("#EVENT_LEVEL").val(row.EVENT_LEVEL);
			$("#AGENT").val(row.AGENT);
			$("#ALERTKEY").val(row.ALERTKEY);
			$("#SITUATIONNAME").val(row.SITUATIONNAME);
			$("#POSITION").val(row.POSITION);
			$("#OCCURRENCE_TIME").val(row.OCCURRENCE_TIME);
			$("#EVENT_TYPE").val(row.EVENT_TYPE);
			$("#NODEALIAS").val(row.NODEALIAS);
			$("#OCCURRENCE_TIMES").val(row.OCCURRENCE_TIMES);
			$("#MANAGER").val(row.MANAGER);
			$("#HANDLE").val((row.HANDLE=="0"?"未解决":"已解决"));
			$("#SITUATIONALIAS").val(row.SITUATIONALIAS);
			$("#APP_NAME").val(row.APP_NAME);
			$("#LAST_OCCU_TIME").val(row.LAST_OCCU_TIME);
			$("#IDENTIFIER").val(row.IDENTIFIER);
			$("#EVENT_DESC").val(row.EVENT_DESC);
			var trs=document.getElementById("eventTable").getElementsByTagName('tr');
			for(var i = 0, len = trs.length; i < len; i++){
				//console.log(trs[i].childNodes[0].textContent);
				if(trs[i].childNodes[0].textContent == row.EVENT_ID){//rowIndex: 2    outerText     e.childNodes[0].textContent
					trs[i].style.backgroundColor = "#08344e";
					trs[i].style.color = "#ffdd00";
					trs[i].style.height = 10;
				}else{
					trs[i].style.backgroundColor = "";
					trs[i].style.color = "#fff";
					trs[i].style.height = 10;
				}
				
			}
		})
//		setInterval(makescroll, 500);//0点页面自动刷新
	});
	

}
//打开支行运营状态视图的二级页面（查看明细）
function openModalInfo(titleName,i,arr1,arr2){
	$.get("operationInfoGrid.html",function(data){
		$('#myModal').html(data);
		$('#myModalLabel').html(titleName + "——支行交易明细");//窗口标题
		$('#myModal').draggable({
			handle:".modal-header,.modal-body,.modal-footer"
		});
		$('#myModal').modal('show');
	});
	setTimeout(function(){
		for(var ii=0;ii<arr1.length;ii++){
			if(arr1[ii].lineNum == i) {
				$("#bankName").html(arr1[ii].name);
				$("#number").html(arr1[ii].lineNumText);
				$("#address").html(arr1[ii].address);
				break;
			}
		}
		var counterArr = arr2.slice(0,8);
		var $table1 = $("#tradeTable");
		$table1.bootstrapTable();
		$table1.bootstrapTable("append", counterArr);
	},500)
}