  $(function() {
      return;
      var imgSrc = $("#trace_diagram").attr("src");
      getImageWidth(imgSrc, function(w, h) {
        console.log({
          width : w,
          height : h
        });
        $('#trace_legend').css({
          top : h,
          left : 150
        })
      });
    });
    function closeThis() {
        var index = parent.layer.getFrameIndex(window.name);
       parent.layer.close(index);
    }
    function confirm(backOrForwrad){
        var activitiId = "";
        var chkObjs = $("input[name=activitId]");
        for (var i = 0; i < chkObjs.length; i++) {
      if (chkObjs[i].checked) {
          var activitiId = $(chkObjs[i]).val();
      }
        }

        if (activitiId == "") {
      layer.alert("请选择回退目标节点！");
      return;
        }
        if(parent.jumpComplete&&typeof(parent.jumpComplete)=="function"){
        parent.jumpComplete(backOrForwrad,activitiId);
        }
        
    }
  
    function rollback(backOrForwrad) {
      var activitiId = "";
      var chkObjs = $("input[name=activitId]");
      for (var i = 0; i < chkObjs.length; i++) {
        if (chkObjs[i].checked) {
          var activitiId = $(chkObjs[i]).val();
        }
      }

      if(activitiId==""){
        showMsg("请选择回退目标节点！");
        return;
      }
      var taskId = $("#taskId").val();
      var comment = $('#comment').val();
      var params;
      
      var backOrForward=$('#back-forward').val();
      if(backOrForward==1){
        
      params = {
        keys : 'comment,reject',
        values : comment + ",true",
        types : 'S,S'
      }
      }else{
        params = {
            keys : 'comment,jump',
            values : comment + ",true",
            types : 'S,S'
          }
      }
      var posting = $.post(webBasePath + 'process/task/rollback/' + taskId
          + "/" + activitiId, params, function(data) {
        //            closeFindialog();
        if(data.code==200){
          alert(JSON.stringify(data));
         var index = parent.layer.getFrameIndex(window.name);
         
//               parent.layer.close(index);
              top.layer.alert("操作成功！");
        }else{
          layer.alert("操作失败！");   
        }
      });

    }