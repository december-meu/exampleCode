(function($, window) {

  var applicationPath = window.applicationPath === "" ? "" : window.applicationPath || "../..";
  var UpdataLoadarrayObj = new Array();
  function SuiJiNum() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  function initWebUpload(item, options) {

    // if (!WebUploader.Uploader.support()) {
    // var error = "上传控件不支持您的浏览器！请尝试升级flash版本或者使用Chrome引擎的浏览器。<a target='_blank'
    // href='http://se.360.cn'>下载页面</a>";
    // if (window.console) {
    // window.console.log(error);
    // }
    // $(item).text(error);
    // return;
    // }
    var target = $(item);// 容器
    if (target.find(".uploader-list").length > 0) {
      return;
    }
    // 创建默认参数
    var defaults = {
      multiple : true,
      auto : true,
      hiddenInputId : "uploadifyHiddenInputId", // input hidden id
      onAllComplete : function(event) {
      }, // 当所有file都上传后执行的回调函数
      onComplete : function(event) {
      },// 每上传一个file的回调函数
      fileNumLimit : 20,// 验证文件总数量, 超出则不允许加入队列
      fileSizeLimit : 1024 * 1024 * 1024,// 验证文件总大小是否超出限制, 超出则不允许加入队列。
      fileSingleSizeLimit : 20 * 1024 * 1024,// 验证单个文件大小是否超出限制, 超出则不允许加入队列
      PostbackHold : false,
      server : '',// 请求地址
      chunked : false,// 是否分片
      chunkSize : 5 * 1024 * 1024,// 分片大小
      extensions : 'gif,jpg,jpeg,bmp,png'
    };

    var opts = $.extend(defaults, options);
    var hdFileData = $("#" + opts.hiddenInputId);
    var pickerid = "";
    if (typeof guidGenerator36 != 'undefined')// 给一个唯一ID
      pickerid = guidGenerator36();
    else
      pickerid = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    var uploaderStrdiv = '<div class="webuploader">'
    if (opts.auto) {
      uploaderStrdiv = '<div  class="uploader-list"></div>' + '<div class="btns">' + '<div id="' + pickerid + '">选择文件</div>'
          + '</div>'

    } else {
      uploaderStrdiv = '<div  class="uploader-list"></div>' + '<div class="btns">' + '<div style="float:left"  id="' + pickerid + '">选择文件</div>'
          + '<button class="webuploadbtn btn btn-primary"  type="button">开始上传</button>' + '</div>'
    }
    uploaderStrdiv += '<div style="display:none" class="UploadhiddenInput" >\
                         </div>'
    uploaderStrdiv += '</div>';
    target.append(uploaderStrdiv);

    var $list = target.find('.uploader-list'), $btn = target.find('.webuploadbtn'), // 手动上传按钮备用
    state = 'pending', $hiddenInput = target.find('.UploadhiddenInput')
    var jsonData = {
      fileList : []
    };
    // debugger;
    var webuploaderoptions = $.extend({

      // swf文件路径
      swf : '/../dweb/static/plugins/webuploader-0.1.5/Uploader.swf',
      // 文件接收服务端。
      server : opts.server,
      compress : null,// 图片不压缩
      chunked : opts.chunked, // 分片
      chunkSize : opts.chunkSize, // 每片5M
      chunkRetry : false,// 如果失败，则不重试
      threads : '5', // 同时运行5个线程传输
      // 自定义参数
      formData : opts.formData,
      //deleteServer : '/Home/DeleteFile',
      // 选择文件的按钮。可选。
      // 内部根据当前运行是创建，可能是input元素，也可能是flash.
      pick : {
        id : '#' + pickerid,
        // 只能选择一个文件上传
        multiple : opts.multiple
      },
      // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
      resize : false,
      //runtimeOrder : 'flash',
      fileNumLimit : opts.fileNumLimit,
      fileSizeLimit : opts.fileSizeLimit,
      fileSingleSizeLimit : opts.fileSingleSizeLimit,
      // 限制只能上传图片,格式gif,jpg,jpeg,bmp,png
      accept : {
        title : 'Images',
        extensions : opts.extensions,
        mimeTypes : 'image/*'
      }
    }, opts);
    var uploader = WebUploader.create(webuploaderoptions);
    UpdataLoadarrayObj[$(item)[0].id] = uploader;
    var ratio = window.devicePixelRatio || 1

    // 缩略图大小
    var thumbnailWidth = 210 * ratio
    var thumbnailHeight = 294 * ratio
  
      // 优化retina, 在retina下这个值是2

      uploader.on('fileQueued', function(file) {
//    	  console.log(file)
//    	  var str=""
//    	  for(var i=0;i<file.length;i++){
//    		  str+=file[i].name
//    	  }
//    	  console.log(opts.rongqi)
//    	  opts.rongqi.val(str)
    	    $list.append( '<div id="' + file.id + '" class="item" style="float:left;">' +
    	            '<h4 class="info">' + file.name + '<i class="file-panel glyphicon glyphicon-remove" style="cursor:pointer"  ></i>&nbsp;</h4>' +
    	        '</div>' );
      });
    

    // uploader.refresh();

    // 文件验证
    uploader.on("error", function(type) {
//      debugger;
      if (type == "Q_TYPE_DENIED") {
        if (opts.extensions == 'zip,rar') {
          layer.msg("请选择压缩类型文件");
        } else if (opts.extensions == 'gif,jpg,jpeg,bmp,png') {
          layer.msg("请选择图片类型文件");
        } else {
          layer.msg("请选择正确类型文件");
        }
      } else if (type == "Q_EXCEED_SIZE_LIMIT") {
        layer.msg("文件大小不可超过" + opts.fileSingleSizeLimit.split("*")[0] + "M");
      } else if (type == "Q_EXCEED_NUM_LIMIT") {
        layer.msg("文件总数不可超过" + opts.fileNumLimit + "个");
      }
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function(file, percentage) {
        var $li = $( '#'+file.id ),
        $percent = $li.find('.progress .progress-bar');

    // 避免重复创建
    if ( !$percent.length ) {
        $percent = $('<div class="progress progress-striped active">' +
          '<div class="progress-bar" role="progressbar" style="width: 0%">' +
          '</div>' +
        '</div>').appendTo( $li ).find('.progress-bar');
    }

    $li.find('p.state').text('上传中');

    $percent.css( 'width', percentage * 100 + '%' );
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function(file, response) {
    	 $( '#'+file.id ).find('p.state').text('已上传');
    	 layer.msg("已上传")
//    	  setTimeout(function(){
//              window.location.reload()
//            },1000)

    });

    // 文件上传失败，显示上传出错。
    uploader.on('uploadError', function(file) {
    	 $( '#'+file.id ).find('p.state').text('上传出错');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function(file, response) {
    	$( '#'+file.id ).find('.progress').fadeOut();
    });

    uploader.on('all', function(type) {
//      debugger;
      if (type === 'startUpload') {
        state = 'uploading';
      } else if (type === 'stopUpload') {
        state = 'paused';
      } else if (type === 'uploadFinished') {
        state = 'done';
      }

      if (state === 'uploading') {
//        debugger;
        $btn.text('暂停上传');
      } else {
        $btn.text('开始上传');
      }
    });

    // 删除时执行的方法
    uploader.on('fileDequeued', function(file) {
//      debugger;
      // debugger;
      var fullName = $("#hiddenInput" + $(item)[0].id + file.id).val();
      if (fullName != null) {
        $.post(webuploaderoptions.deleteServer, {
          fullName : fullName
        }, function(data) {
          // alert(data.message);
        })
      }
      $("#" + $(item)[0].id + file.id).remove();
      $("#hiddenInput" + $(item)[0].id + file.id).remove();

    })

    // 多文件点击上传的方法
    $btn.on('click', function(e) {
      if (state === 'uploading') {
        uploader.stop();
      } else {
        uploader.upload();
        e.stopPropagation();// 阻止点击事件向上冒泡
      }
    });

    // 删除
    $list.on("click", ".file-panel", function() {
//      debugger;
      // debugger
      var $ele = $(this);
      $ele.parent().parent().remove()
      var id = $ele.parent().parent().attr("id");
      var file = uploader.getFile(id);
//      console.log(file)
      uploader.removeFile(file,true);
    });

  }
  $.fn.CleanUpload = function(options) {
    var uploadrFile = UpdataLoadarrayObj[$(this).attr("id")]
    var fileslist = uploadrFile.getFiles();
    for ( var i in fileslist) {
      uploadrFile.removeFile(fileslist[i],true);
    }
    // var ele = $(this);
    // var filesdata = ele.find(".UploadhiddenInput");
    // filesdata.find(".hiddenInput").remove();
    // ele.find(".uploader-list .item").remove();
  }
  $.fn.GetFilesAddress = function(options) {
    var ele = $(this);
    var filesdata = ele.find(".UploadhiddenInput");
    var filesAddress = [];
    filesdata.find(".hiddenInput").each(function() {
      filesAddress.push($(this).val());
    })
    return filesAddress;

  }

  $.fn.powerWebUploads = function(options) {
    var ele = this;

    if (typeof WebUploader == 'undefined') {
      var casspath = applicationPath + "/../dweb/static/plugins/webuploader-0.1.5/webuploader.css";
      $("<link>").attr({
        rel : "stylesheet",
        type : "text/css",
        href : casspath
      }).appendTo("head");
      var jspath = applicationPath + "/../dweb/static/plugins/webuploader-0.1.5/webuploader.withoutimage.min.js";
      $.getScript(jspath).done(function() {

        initWebUpload(ele, options);
      }).fail(function() {
        layer.msg("请检查webuploader的路径是否正确!")
      });

    } else {
      initWebUpload(ele, options);
    }
  }
})(jQuery, window);
