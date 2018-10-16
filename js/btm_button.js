$(function(){
	$('.tabItem').each(function(){
		$(this).click(function(){
			var i = $(this).attr('data');
			if(i=="1"){
				$(this).css('background-image','url(image/btm_left_click.png)');
				$('.deposit').css('background-image','url(image/btm_left_1.png)');
				$('.loan').css('background-image','url(image/btm_left_3.png)');
				$('.risk').css('background-image','url(image/btm_mid.png)');
				$('.capital').css('background-image','url(image/btm_right_1.png)');
				$('.budget').css('background-image','url(image/btm_right_3.png)');
				$('.account').css('background-image','url(image/btm_right_3.png)');
			}else if( i=="2"){
				$(this).css('background-image','url(image/btm_left_click.png)');
				$('.pay').css('background-image','url(image/btm_left_1.png)');
				$('.loan').css('background-image','url(image/btm_left_3.png)');
				$('.risk').css('background-image','url(image/btm_mid.png)');
				$('.capital').css('background-image','url(image/btm_right_1.png)');
				$('.budget').css('background-image','url(image/btm_right_3.png)');
				$('.account').css('background-image','url(image/btm_right_3.png)');
			}else if(i=="3"){
				$(this).css('background-image','url(image/btm_left_3_click.png)');
				$('.pay').css('background-image','url(image/btm_left_1.png)');
				$('.deposit').css('background-image','url(image/btm_left_1.png)');
				$('.risk').css('background-image','url(image/btm_mid.png)');
				$('.capital').css('background-image','url(image/btm_right_1.png)');
				$('.budget').css('background-image','url(image/btm_right_3.png)');
				$('.account').css('background-image','url(image/btm_right_3.png)');
			}else if(i=="4"){
				$(this).css('background-image','url(image/btm_mid_click.png)');
				$('.pay').css('background-image','url(image/btm_left_1.png)');
				$('.deposit').css('background-image','url(image/btm_left_1.png)');
				$('.loan').css('background-image','url(image/btm_left_3.png)');
				$('.capital').css('background-image','url(image/btm_right_1.png)');
				$('.budget').css('background-image','url(image/btm_right_3.png)');
				$('.account').css('background-image','url(image/btm_right_3.png)');
			}else if(i=="5"){
				$(this).css('background-image','url(image/btm_right_1_click.png)');
				$('.pay').css('background-image','url(image/btm_left_1.png)');
				$('.deposit').css('background-image','url(image/btm_left_1.png)');
				$('.loan').css('background-image','url(image/btm_left_3.png)');
				$('.risk').css('background-image','url(image/btm_mid.png)');
				$('.budget').css('background-image','url(image/btm_right_3.png)');
				$('.account').css('background-image','url(image/btm_right_3.png)');
			}else if(i=="6"){
				$(this).css('background-image','url(image/btm_right_3_click.png)');
				$('.deposit').css('background-image','url(image/btm_left_1.png)');
				$('.loan').css('background-image','url(image/btm_left_3.png)');
				$('.risk').css('background-image','url(image/btm_mid.png)');
				$('.capital').css('background-image','url(image/btm_right_1.png)');
				$('.account').css('background-image','url(image/btm_right_3.png)');
			}else if(i=="7"){
				$(this).css('background-image','url(image/btm_right_3_click.png)');
				$('.deposit').css('background-image','url(image/btm_left_1.png)');
				$('.loan').css('background-image','url(image/btm_left_3.png)');
				$('.risk').css('background-image','url(image/btm_mid.png)');
				$('.capital').css('background-image','url(image/btm_right_1.png)');
				$('.budget').css('background-image','url(image/btm_right_3.png)');
			}
		})
	})
})
