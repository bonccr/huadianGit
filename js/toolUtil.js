/************
***工具类
*************/
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g,'');
}


//随机数生成器（整数）
function fRandomBy(under, over){ 
   switch(arguments.length){ 
     case 1: return parseInt(Math.random()*under+1); 
     case 2: return parseInt(Math.random()*(over-under+1) + under); 
     default: return 0; 
   } 
}
//随机数生成器（小数）
function fRandomByfloat(under, over){ 
   return under+Math.random()*(over-under);
}

/** 
 * 和PHP一样的时间戳格式化函数 
 * @param {string} format 格式 如：date('Y-m-d','1350052653');date('Y-m-d H:i:s','1350052653');
 * @param {int} timestamp 要格式化的时间 默认为当前时间 
 * @return {string}   格式化的时间字符串 
 */
function date(timestamp){
	return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}


var dojoConfig = {
    paths: {
      extras: location.pathname.replace(/\/[^/]+$/, "") + "/extras"
    },
    parseOnLoad: true
};

//重写ajax方法
//var ajax_noheader = $.ajax;
//$.ajax = function(opt){
//  //备份opt中error和success方法  
//  var fn = {  
//      error:function(XMLHttpRequest, textStatus, errorThrown){},  
//      success:function(data, textStatus){},
//      data:function(){return {};}
//  }  
//  if(opt.error){  
//      fn.error=opt.error;  
//  }  
//  if(opt.success){  
//      fn.success=opt.success;  
//  }
//     
//  //扩展增强处理  
//  var _opt = $.extend(opt,{
//      error:function(XMLHttpRequest, textStatus, errorThrown){  
//          //错误方法增强处理 
//          if(XMLHttpRequest.responseText && XMLHttpRequest.responseText.indexOf('突泉大数据平台登录') != -1 )
//          {
////              window.location = "login.html";
//              return;
//          }
//          fn.error(XMLHttpRequest, textStatus, errorThrown);  
//      },  
//      success:function(data, textStatus){  
//          //成功回调方法增强处理  
//          // console.log(data);
//          fn.success(data, textStatus);  
//      },
//      beforeSend:function(XHR){
//          if($.cookie('tq_login')!='true'){
////              window.location = "login.html";
//          }
//          //提交前回调方法  
//          // console.log("has---mask");
//          try{
//              window.parent.ajaxShowMask();
//          }catch(e){
//              
//          }
//          XHR.setRequestHeader("logininfo",JSON.stringify([loginname,loginpass]));
//      },  
//      complete:function(XHR, TS){  
//          //请求完成后回调函数 (请求成功或失败之后均调用)。 
//          try{
//              window.parent.ajaxHideMask();
//          }catch(e){
//              
//          }
//      }  
//  });  
//  return ajax_noheader(_opt);
//}
//var ajax_nomask = function(opt){
//  //备份opt中error和success方法  
//  var fn = {  
//      error:function(XMLHttpRequest, textStatus, errorThrown){},  
//      success:function(data, textStatus){},
//      data:function(){return {};}
//  }  
//  if(opt.error){  
//      fn.error=opt.error;  
//  }  
//  if(opt.success){  
//      fn.success=opt.success;  
//  }
//     
//  //扩展增强处理  
//  var _opt = $.extend(opt,{
//      error:function(XMLHttpRequest, textStatus, errorThrown){  
//          //错误方法增强处理 
//          if(XMLHttpRequest.responseText && XMLHttpRequest.responseText.indexOf('突泉大数据平台登录') != -1 )
//          {
//              window.location = "login.html";
//              return;
//          }
//          fn.error(XMLHttpRequest, textStatus, errorThrown);  
//      },  
//      success:function(data, textStatus){  
//          //成功回调方法增强处理  
//          // console.log(data);
//          fn.success(data, textStatus);  
//      },
//      beforeSend:function(XHR){
//          if($.cookie('tq_login')!='true'){
//              window.location = "login.html";
//          }
//          // console.log("no---mask");
//          //提交前回调方法  
//          XHR.setRequestHeader("logininfo",JSON.stringify([loginname,loginpass]));
//      },  
//      complete:function(XHR, TS){  
//          //请求完成后回调函数 (请求成功或失败之后均调用)。 
//      }  
//  });  
//  return ajax_noheader(_opt);
//}

//获取当前年份
function currentYear(){
    var dt = new Date();
    return dt.getFullYear();
}