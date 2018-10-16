/*
 * jquery-counter plugin
 * Download by http://www.codefans.net
 * Copyright (c) 2009 Martin Conte Mac Donell <Reflejo@gmail.com>
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 */
jQuery.fn.countdown = function(userOptions)
{
  // Default options
  var options = {
    stepTime: 60,
    // startTime and format MUST follow the same format.
    // also you cannot specify a format unordered (e.g. hh:ss:mm is wrong)
    format: "dddddddd",
    startTime: "00000000",
    newvalue:"",
    digitImages: 6,//这个值暂时不要修改，写死成6
    digitWidth: 35,
    //digitWidth: window.innerWidth*0.0253,
    digitHeight: 50,
    timerEnd: function(){},
    image: "digits3.png"
  };
  var digits = [], interval;

  // Draw digits in given container
  var createDigits = function(where) 
  {
    var c = 0;digits = [];
    // Iterate each startTime digit, if it is not a digit
    // we'll asume that it's a separator
    for (var i = 0; i < options.startTime.length; i++)
    {
      var sobj =options.startTime.split("");
      if (parseInt(sobj[i]) >= 0) 
      {
        elem = $('<div id="cnt_' + i + '" class="cntDigit" />').css({
          height: options.digitHeight * options.digitImages * 10, 
          float: 'left', background: 'url(\'' + options.image + '\')',
          width: options.digitWidth,backgroundPosition:'center'});
        digits.push(elem);
        margin(c, -((parseInt(sobj[i]) * options.digitHeight *
                              options.digitImages)));//设置高度。
        digits[c].__max = 9;
        // Add max digits, for example, first digit of minutes (mm) has 
        // a max of 5. Conditional max is used when the left digit has reach
        // the max. For example second "hours" digit has a conditional max of 4 
        switch (options.format[i]) {
          case 'h':
            digits[c].__max = (c % 2 == 0) ? 2: 9;
            if (c % 2 == 0)
              digits[c].__condmax = 4;
            break;
          case 'd': 
            digits[c].__max = 9;
            break;
          case 'm':
          case 's':
            digits[c].__max = (c % 2 == 0) ? 5: 9;//设置最大值
        }
        ++c;
      }
      else 
        elem = $('<div class="cntSeparator"/>').css({float: 'left'}).text(sobj[i]);

      where.append(elem)
    }
  };
  
  // Set or get element margin
  var margin = function(elem, val) 
  {
    if (val !== undefined)
      return digits[elem].css({'marginTop': val + 'px'});

    return parseInt(digits[elem].css('marginTop').replace('px', ''));
  };

  // Makes the movement. This is done by "digitImages" steps.
  var moveStep = function(elem) 
  {
	  
  	_desc=1;//1为正计时，0为倒计时
    digits[elem]._digitInitial=((digits[elem].__max) * options.digitHeight * options.digitImages)*(_desc-1);
    return function _move() {
      mtop = margin(elem) -(_desc-1)* options.digitHeight-(_desc)* options.digitHeight;
      if (mtop == (-1*(_desc)*((digits[elem].__max+1) * options.digitHeight * options.digitImages)-(_desc-1)* options.digitHeight)) {//倒计时计数到0
      	//(digits[elem].__max+1)是因为他是从0到__max的，最后一个是__max。(__max+1)时刻在进位
        margin(elem, digits[elem]._digitInitial);
        if (elem > 0) {
			//moveStep(elem - 1)();//递归调用进位使用 进位 
        }
        else 
        {
          clearInterval(interval);// 原来倒计时是翻滚到0时刻就该停止了
          
//          for (var i=0; i < digits.length; i++) margin(i, 0);
          options.timerEnd();
          return;
        }
        if ((elem > 0) && (digits[elem].__condmax !== undefined) && 
            (digits[elem - 1]._digitInitial == margin(elem - 1)))
          margin(elem, (digits[elem].__condmax * options.digitHeight * options.digitImages)*(_desc-1));//进位的数值
        return;
      }
			
      margin(elem, mtop);//本位置的数值，秒数等
      if (margin(elem) / options.digitHeight % options.digitImages != 0)
        setTimeout(_move, options.stepTime);

      //if (mtop == 0) digits[elem].__ismax = true;//当翻转到0时记录
    }
  };
//  var moveStop = function() {
//	  options.startTime=options.newvalue;
//	  options.newvalue="";
//	  clearInterval(interval);
//  }
  $.extend(options, userOptions);
//  alert(options.newvalue!=options.startTime);
//  alert(options.newvalue!="");
  this.empty();
  this.css({height: options.digitHeight, overflow: 'hidden' ,width:options.digitWidth*options.format.lengt+'px'});//隐藏部分
  createDigits(this);
  if(options.newvalue!=options.startTime){//暂时都初始化成6位,必须是一样的位数
	  if(options.newvalue!=""){
		  var sobj =options.startTime.split("");
		  var eobj =options.newvalue.split("");
//		  alert(sobj.length);
		  for(var i=0;i<sobj.length;i++){//位数
			  var _count = 0;
			  if((sobj[i]-eobj[i])<=0) _count=eobj[i]-sobj[i];
			  else _count=10-(sobj[i]-eobj[i]);
			  for(var j=0;j<_count;j++){//次数
				  setTimeout(moveStep(i),(100+(i+1)*10)*(j+1));//需要几个列一起变，不能每次都循环，来不及
			  }
		  }
		  
	  }
  }
//  document.getElementById("aa").value="newvalue"+options.newvalue+"startTime"+options.startTime;
//  alert(options.newvalue+"ahdiska"+options.startTime);
//  moveStep(digits.length - 1);
//  setTimeout(moveStep(digits.length - 1),1000);
  //interval = setInterval(moveStep(digits.length - 1), 1000);
};

