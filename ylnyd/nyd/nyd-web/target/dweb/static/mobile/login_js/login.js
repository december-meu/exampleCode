SPA_RESOLVE_INIT = function(transition){
        $('#content').html(
                /*'<header class="bar bar-nav">'+
                  '<h1 class="title">登录</h1>'+
                '</header>'+*/
                '<div class="content" style="overflow:hidden">'+
                        '<div id="bg_img">'+
                                '<img style="width:100%;" src="'+webBasePath+'/static/mobile/images/bg.jpg">'+
                        '</div>'+
                        '<div id="login_bg" class="list-block">'+
                                '<ul>'+
                                '<li style="margin-bottom:5%">'+
                                                '<div class="item-content">'+
                                                        '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
                                                        '<div class="item-inner">'+
                                                            '<div class="item-title label"><img src="'+webBasePath+'/static/mobile/images/user.png"></div>'+
                                                            '<div class="item-input">'+
                                                                '<input type="text" id="account" placeholder="账号">'+
                                                            '</div>'+
                                                        '</div>'+
                                                '</div>'+
                                '</li>'+
                                '<li>'+
                                                '<div class="item-content">'+
                                                        '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
                                                        '<div class="item-inner">'+
                                                                '<div class="item-title label"><img src="'+webBasePath+'/static/mobile/images/password.png"></div>'+
                                                            '<div class="item-input">'+
                                                                '<input type="password" id="passWord" placeholder="密码">'+
                                                            '</div>'+
                                                        '</div>'+
                                                '</div>'+
                                '</li>'+
                                '<li>'+
                                                '<div class="item-content">'+
                                                        '<div class="item-media"><i class="icon icon-form-name"></i></div>'+
                                                        '<div class="item-inner" style="margin:0">'+
                                                                '<span>忘记密码？</span>'+
                                                                '<span id="register">马上注册</span>'+
                                                        '</div>'+
                                                '</div>'+
                                '</li>'+
                                '<li><p style="width:85%;margin:20% auto;height:45px;"><a href="#" class="button button-big button-fill button-round" id="log_in">登录</a></p></li>'+
                        '</ul>'+
                        '</div>'+
                '</div>'
        )
        var login={
                jumptRegisterPage:function(){
                        $('#content').on('click','#register',function(){
                                window.location.hash="#/Verification"
                        })
                        
                },
                login:function(){
                  
                        $('#content').off('click','#log_in');
                        $('#content').on('click','#log_in',function(){
                          var account=$('#account').val();
        var password=$('#passWord').val();
                                if(account==''||passWord==''){
                                        $.toast('账号或密码不能为空！');
                                        return;
                                }else{
                                        var params={
                                            account:account,
                                            password:password
                                        }
                                        $.toast('正在登录...');
                                        $.ajax({
                                                type:'get',
                                                url:webBasePath+'sys/user/auth/login/m',
                                                data:params,
                                                success:function(data){
                                                        if(data.code==200){
                                                                        $.toast('登陆成功');
                                                                        
                                                                        var wechatServiceId = $('#openId').val();
                  var headIcon = $('#headimgurl').val();
                  var account=$('#account').val();
                   var params1={
                        account:account,
                        wechatServiceId:wechatServiceId,
                        headIcon:headIcon
                    }
                   //将openID、headimg 放入User中
                   $.ajax({
                     type:'get',
                     url:webBasePath+'sys/user/whechat/update/common',
                     data:params1,
                     success:function(data){
                       if(data.code==200){
//                    $.toast('修改成功');
                       }
                     },
                     error:function(){
//                $.toast('修改失败');
                     }
                   })
                                                                        setTimeout(function(){
                                                                                window.location.href=webBasePath+'weChat/public/ineedyou/m?=wechatServiceId'+wechatServiceId;
                                                                        },1000)
                                                                        
                                                        }else{
                                                                $.toast('账号或密码错误');
                                                        }
                                                },
                                                error:function(){
                                                        $.toast('登录失败');
                                                }
                                                
                                        })
                                }
                        })
                        

                        
                }
        }
        
        
        login.jumptRegisterPage();
        login.login();
        
        
        
        
        
        
        
        
        
}