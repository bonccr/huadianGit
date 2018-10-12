//时间:2018/10/11
//单页面应用

$(function(){
	//修改顶部名称
	changeName();
	
	//底部导航栏实现
	zfjk();
	
})
function changeName(){
	
	
	$('.nameContent').html('机构');
}

//底部导航栏实现
function zfjk(){
	$('.btm_ul li').each(function(){
		$(this).click(function(){
			var i = $(this).attr('data');
			if(i=="1"){
				$(this).css('background-image','url(image/btm_left_click.png)');
				$('.btm_two').css('background-image','url(image/btm_left_1.png)');
				$('.btm_three').css('background-image','url(image/btm_left_3.png)');
				$('.btm_four').css('background-image','url(image/btm_mid.png)');
				$('.btm_five').css('background-image','url(image/btm_right_1.png)');
				$('.btm_six').css('background-image','url(image/btm_right_3.png)');
				$('.btm_seven').css('background-image','url(image/btm_right_3.png)');
				
				
				
				zhifujiankong();
			}else if(i=="2"){
				$(this).css('background-image','url(image/btm_left_click.png)');
				$('.btm_one_it').css('background-image','url(image/btm_left_1.png)');
				$('.btm_three').css('background-image','url(image/btm_left_3.png)');
				$('.btm_four').css('background-image','url(image/btm_mid.png)');
				$('.btm_five').css('background-image','url(image/btm_right_1.png)');
				$('.btm_six').css('background-image','url(image/btm_right_3.png)');
				$('.btm_seven').css('background-image','url(image/btm_right_3.png)');
				
				
				cunkuan();
			}else if(i=="3"){
				$(this).css('background-image','url(image/btm_left_3_click.png)');
				$('.btm_one_it').css('background-image','url(image/btm_left_1.png)');
				$('.btm_two').css('background-image','url(image/btm_left_1.png)');
				$('.btm_four').css('background-image','url(image/btm_mid.png)');
				$('.btm_five').css('background-image','url(image/btm_right_1.png)');
				$('.btm_six').css('background-image','url(image/btm_right_3.png)');
				$('.btm_seven').css('background-image','url(image/btm_right_3.png)');
				
				
				daikuan();
			}else if(i=="4"){
				$(this).css('background-image','url(image/btm_mid_click.png))');
				$('.btm_one_it').css('background-image','url(image/btm_left_1.png)');
				$('.btm_two').css('background-image','url(image/btm_left_1.png)');
				$('.btm_three').css('background-image','url(image/btm_left_3.png)');
				$('.btm_five').css('background-image','url(image/btm_right_1.png)');
				$('.btm_six').css('background-image','url(image/btm_right_3.png)');
				$('.btm_seven').css('background-image','url(image/btm_right_3.png)');
				
				
				
				fengxian();
			}else if(i=="5"){
				$(this).css('background-image','url(image/btm_right_1_click.png)');
				$('.btm_one_it').css('background-image','url(image/btm_left_1.png)');
				$('.btm_two').css('background-image','url(image/btm_left_1.png)');
				$('.btm_three').css('background-image','url(image/btm_left_3.png)');
				$('.btm_four').css('background-image','url(image/btm_mid.png)');
				$('.btm_six').css('background-image','url(image/btm_right_3.png)');
				$('.btm_seven').css('background-image','url(image/btm_right_3.png)');
				
				
				
				zijin();
			}else if(i=="6"){
				$(this).css('background-image','url(image/btm_right_3_click.png)');
				$('.btm_one_it').css('background-image','url(image/btm_left_1.png)');
				$('.btm_two').css('background-image','url(image/btm_left_1.png)');
				$('.btm_three').css('background-image','url(image/btm_left_3.png)');
				$('.btm_four').css('background-image','url(image/btm_mid.png)');
				$('.btm_five').css('background-image','url(image/btm_right_1.png)');
				$('.btm_seven').css('background-image','url(image/btm_right_3.png)');
				
				
				
				yusuan();
			}else if(i=="7"){
				$(this).css('background-image','url(image/btm_right_3_click.png)');
				$('.btm_one_it').css('background-image','url(image/btm_left_1.png)');
				$('.btm_two').css('background-image','url(image/btm_left_1.png)');
				$('.btm_three').css('background-image','url(image/btm_left_3.png)');
				$('.btm_four').css('background-image','url(image/btm_mid.png)');
				$('.btm_five').css('background-image','url(image/btm_right_1.png)');
				$('.btm_six').css('background-image','url(image/btm_right_3.png)');
				
				
				zhanghuqingkuang();
			}
		})
	})
}

function zhifujiankong(){
	var i =  layer.load("请输入完成之后提交",{icon:2,shade:0,offset: '30px',anim: 6});
//	$('.important_main_it').css('background-image','url(image/china_map.png)');

	var map = '<div id="China_map" style="width:40%;height:80%;background:url(image/china_map.png)center center no-repeat;background-size:100% 100%; margin:8% auto;"></div>';
	
	
	$('.important_main_it').html(map);
	layer.close(i);
}
function cunkuan(){
	var i =  layer.load("请输入完成之后提交",{icon:2,shade:0,offset: '30px',anim: 6});
	$('.important_main_it').html('存款页面');
	layer.close(i);
}
function daikuan(){
	var i =  layer.load("请输入完成之后提交",{icon:2,shade:0,offset: '30px',anim: 6});
	$('.important_main_it').html('贷款页面');
	layer.close(i);
}
function fengxian(){
	var i =  layer.load("请输入完成之后提交",{icon:2,shade:0,offset: '30px',anim: 6});
	$('.important_main_it').html('风险页面');
	layer.close(i);
}
function zijin(){
	var i =  layer.load("请输入完成之后提交",{icon:2,shade:0,offset: '30px',anim: 6});
	$('.important_main_it').html('资金页面');
	layer.close(i);
}
function yusuan(){
	var i =  layer.load("请输入完成之后提交",{icon:2,shade:0,offset: '30px',anim: 6});
	$('.important_main_it').html('预算页面');
	layer.close(i);
}
function zhanghuqingkuang(){
	var i =  layer.load("请输入完成之后提交",{icon:2,shade:0,offset: '30px',anim: 6});
	$('.important_main_it').html('账户情况页面');
	layer.close(i);
}
