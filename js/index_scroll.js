            var islogin = $.cookie('tq_login');
            var loginname = $.cookie('tq_phone') || "";
            var loginpass = $.cookie('tq_password') || "";
            var loginroleid = $.cookie('tq_roleid') || ""; 
            var loginsuperuser = $.cookie('tq_superuser') || ""; 
            var logintown = $.cookie('tq_town') || ""; 
            var loginvillage = $.cookie('tq_village') || ""; 
//          if(islogin!='true')
//          {
//              window.location.href='login.html';
//          }
            // console.log(loginsuperuser+"---------------");//此处去掉了部门导航
            var scaletransobj = [
                    /*{'scale':1,'translateX':0,'translateY':0,'image':'images/view/fpdt.png','title':'帮扶动态','desc':'展示扶贫动态信息'},
                    {'scale':0.8,'translateX':90,'translateY':-55,'image':'images/view/fpgk.png','title':'扶贫概况','desc':'展示全县建档立卡户的综合分析数据'},
                    {'scale':0.7,'translateX':250,'translateY':-110,'image':'images/view/nhxx.png','title':'统计查询','desc':'建档立卡户信息展示与跟踪'},
                    {'scale':0.6,'translateX':450,'translateY':-150,'image':'images/view/jczb.png','title':'监测指标','desc':'实时跟踪各项扶贫指标的完成进度'},
                    {'scale':0.5,'translateX':620,'translateY':-207,'image':'images/view/gbkh.png','title':'帮扶足迹','desc':'综合了解驻村干部工作状态'},
                    {'scale':0.4,'translateX':1005,'translateY':-290,'image':'images/view/mnpg.png','title':'模拟评估','desc':'提供农户的精准识别技术'},
                    {'scale':0.4,'translateX':1321,'translateY':-310,'title':'后台管理','desc':'进入后台管理系统'}*/
                    
                    
                    
                    {'scale':0.8,'translateX':-420,'translateY':0,'image':'images/view/fpdt.png','title':'帮扶动态','desc':'展示扶贫动态信息'},
                    {'scale':0.6,'translateX':-500,'translateY':-180,'image':'images/view/fpgk.png','title':'扶贫概况','desc':'展示全县建档立卡户的综合分析数据'},
                    {'scale':0.5,'translateX':250,'translateY':-110,'image':'images/view/nhxx.png','title':'统计查询','desc':'建档立卡户信息展示与跟踪'},
                    {'scale':0.4,'translateX':450,'translateY':-150,'image':'images/view/jczb.png','title':'监测指标','desc':'实时跟踪各项扶贫指标的完成进度'},
                    {'scale':0.3,'translateX':620,'translateY':-207,'image':'images/view/gbkh.png','title':'帮扶足迹','desc':'综合了解驻村干部工作状态'},
                    {'scale':0.2,'translateX':1005,'translateY':-290,'image':'images/view/mnpg.png','title':'模拟评估','desc':'提供农户的精准识别技术'},
                    {'scale':0.2,'translateX':1321,'translateY':-310,'title':'后台管理','desc':'进入后台管理系统'}
                

            ];
            function createDate(date) {
                var dtstr = date.replace(/\-/g, "/");
                var dt = new Date(dtstr);
                return dt;
            }
            $(function(){


                //填充滚动列表
                var ctdom = $('#rolecontent');
                for(var i=0;i<scaletransobj.length;i++){
                    var obj = scaletransobj[i];
                    ctdom.append("<div class='menupanel "+(i==0?"menupanel_canclick":"menupanel_bk")+"' data-url='"+obj.url+"' data-inx='"+(i+1)+"' style='transform:scale("+obj.scale+") translate("+obj.translateX+"px,"+obj.translateY+"px);z-index:"+(scaletransobj.length-i)+";'>"+
                                    "<div class='menuicon'></div>"+
                                    "<div class='menutext'>"+obj.title+"</div>"+
                                    "<div class='menudesc'>"+obj.desc+"</div>"+
                                "</div>");
                }


                if(loginsuperuser!='1'){
                    $('#bmdhmenu').css({'display':'none'});
                }
                $('#logout').bind('click',function(){
                    $.cookie('tq_login', null, {path: '/'}); 
                    $.cookie('tq_phone', null, {path: '/'}); 
                    $.cookie('tq_password', null, {path: '/'}); 
                    $.cookie('tq_username', null, {path: '/'}); 
                });

                

                $('.menuitem').bind('mouseenter',function(){
                    var cobj = $(this);
                    var dataurl = cobj.attr('data-url');
                    if(dataurl==""){
                        $(this).children('.subcontent').css({'left':'0%'});
                    }
                });
                $('.menuitem').bind('mouseleave',function(){
                    var cobj = $(this);
                    var dataurl = cobj.attr('data-url');
                    if(dataurl==""){
                        $(this).children('.subcontent').css({'left':'100%'});
                    }
                });




                //鼠标滚动菜单联动
                var isnotrolling = true;
                var rolltimeout = 250;//间隔多少毫秒触发一次滚轮操作，否则刷新太频繁
                $('#allitemcont').mousewheel(function(event, delta) {
                    if(isnotrolling)
                    {
                        isnotrolling = false;
                        setTimeout(function(){
                            isnotrolling = true;
                        },rolltimeout);
                        //滚轮向下
                        if(delta==-1)
                        {
                            // console.log('向下滚动');
                            menurollfun(false);
                        }
                        //滚轮向上
                        else
                        {
                            // console.log('向上滚动');
                            menurollfun(true);
                        }
                    }
                    event.preventDefault();
                });
                
                function menurollfun(isup){
                    if(isup){
                        $('.menupanel').each(function(){
                            var currobj = $(this);
                            var currinx = parseInt(currobj.attr('data-inx'))+1;
//                          var datainx = currinx>8?1:currinx;
							var datainx = currinx>7?1:currinx;

                            currobj.attr('data-inx',datainx);
//                          currobj.css({'z-index':(9-datainx)});
                            currobj.css({'z-index':(8-datainx)});
                            var scaletransobjitem = scaletransobj[datainx-1];
                            if(datainx==1){
                                currobj.removeClass('menupanel_bk').addClass('menupanel_canclick');
                            }else{
                                currobj.addClass('menupanel_bk').removeClass('menupanel_canclick');
                            }
                            currobj.css({'transform':'scale('+scaletransobjitem.scale+') translate('+scaletransobjitem.translateX+'px,'+scaletransobjitem.translateY+'px)'});
                        });
                    }else{
                        $('.menupanel').each(function(){
                            var currobj = $(this);
                            var currinx = parseInt(currobj.attr('data-inx'))-1;
//                          var datainx = currinx==0?8:currinx;
							 var datainx = currinx==0?7:currinx;

                            currobj.attr('data-inx',datainx);
//                          currobj.css({'z-index':(9-datainx)});
							currobj.css({'z-index':(8-datainx)});
                            var scaletransobjitem = scaletransobj[datainx-1];
                            if(datainx==1){
                                currobj.removeClass('menupanel_bk').addClass('menupanel_canclick');
                            }else{
                                currobj.addClass('menupanel_bk').removeClass('menupanel_canclick');
                            }
                            currobj.css({'transform':'scale('+scaletransobjitem.scale+') translate('+scaletransobjitem.translateX+'px,'+scaletransobjitem.translateY+'px)'});
                        });
                    }
                }
                

                $(document).on('click','.menupanel_bk',function(){
                    // console.log(1312423);
                    var cobj = $(this);
                    var datainx = cobj.attr('data-inx');
                    var sumcount = datainx-1;
                    var intval = setInterval(function(){
                        sumcount--;
                        menurollfun(false);
                        if(sumcount==0){
                            clearInterval(intval);
                        }
                    },1);
                });
            });

