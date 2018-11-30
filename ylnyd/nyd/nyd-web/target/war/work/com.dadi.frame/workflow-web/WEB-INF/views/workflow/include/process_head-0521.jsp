<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<script>
    
</script>
<div class="wrapper wrapper-content">
	<input type="hidden" id="taskAssign" value="${processModel.taskAsign}"> <input type="hidden" id="proInstanceId" value="${processModel.proInstanceId}">
	<div class="row top_msg">
		<div class="form-group col-md-8 col-sm-8">

			<c:if test="${(sourcePage==2) }">
				<span class="td_left">当前任务:</span>
				<span id="taskName" class="hight_light">[${ processModel.taskName}]</span>
				<c:if test="${!empty processModel.assign }">
					<span class="td_left" style="margin-left: 30px">办理人:</span>
					<span class="hight_light">[${ processModel.assign.username}]</span>
				</c:if>

				<c:if test="${!empty processModel.candidators}">
					<span class="td_left">候选办理人：</span>
					<c:forEach var="item" items="${processModel.candidators}">
						<span class="hight_light">${item.username}</span>
					</c:forEach>

				</c:if>

			</c:if>

			<c:if test="${!empty taskId}">
				<input type="hidden" id="taskId" value="${ processModel.taskId}">
				<input type="hidden" id="task-key" value="${ processModel.taskDefinKey}">
				<span class="td_left">当前任务:</span>
				<span class="hight_light">[${ processModel.taskName}]</span>
				<span class="hight_light" id="assignHint"></span>
				<span class="td_left" style="margin-left: 100px">下一节点:</span>
				<span class="hight_light">[${ processModel.nextTaskName}]</span>
				<c:if test="${!empty processModel.assign }">
					<span class="td_left" style="margin-left: 30px">办理人:</span>
					<span class="hight_light">[${ processModel.assign.username}]</span>
				</c:if>

				<c:if test="${!empty processModel.candidators}">
					<span class="td_left">候选办理人：</span>
					<c:forEach var="item" items="${processModel.candidators}">
						<span class="hight_light">${item.username}</span>
					</c:forEach>
				</c:if>

				<div align="right" class="form-group col-md-4 col-sm-4 pull-right"margin-right: 30px">
					<!--<a href="#" id="expenseList" class="btn btn-primary op_btn right" onclick="javascript:expenseList('010105')" data-options="iconCls:'icon-layout-content'" target="blank">打印单据</a>  -->
					<a href="${webPath}/process/task/viewPage/${processModel.proInstanceId}?type=image" class="btn btn-warning op_btn right" data-options="iconCls:'icon-layout-content'" target="blank">查看流程图</a> <a
						style="display: none;" href="${webPath}/process/resource/${processModel.proInstanceId}?type=xml" class="btn btn-info op_btn right" target="blank">查看流程xml文件</a> <a href="#"
						class="btn btn-danger op_btn right" data-options="iconCls:'icon-stop'" onclick="javascript:endProcess('${taskId}','${_userId}')">结束流程</a>
				</div>
			</c:if>
		</div>
	</div>
	<div class="row">
		<div class="form-group col-md-8 col-sm-8">
			<span id="close"><a href="#" class="btn btn-danger op_btn" data-options="iconCls:'icon-cancel'" onclick="closeThis()">返回</a></span>
			<c:if test="${!empty taskId}">
				<span id="rollback"> <a href="#" class="btn btn-warning op_btn" data-options="iconCls:'icon-logout'" onclick="javascript:rollbackSingle('${taskId}','${currentUser.oldUserId}')">回退</a>

				</span>
				<span id="rollback_multi"> <a href="#" class="btn btn-primary op_btn" data-options="iconCls:'icon-logout'" onclick="javascript:jump(1,'${taskId}')">多级回退</a></span>
<%-- 				<span id="jump_multi"> <a href="#" class="btn btn-primary op_btn" data-options="iconCls:'icon-logout'" onclick="javascript:jump(2,'${taskId}')">越级审批</a> --%>

				</span>
				<span id="candidate" style="display: none;"> <a href="#" class="btn btn-warning op_btn" data-options="iconCls:'icon-logout'"
					onclick="javascript:claim('${taskId}','${currentUser.oldUserId}')">签收任务</a>

				</span>
				<span id="assign" style="display: none;"> <c:forEach var="item" items="${btns}">
						<a href="#" class="btn btn-warning op_btn" data-options="iconCls:'icon-logout'" onclick="javascript:complete('${item.key}')">${item.value}</a>
					</c:forEach>
				</span>
			</c:if>
		</div>
	</div>
	<!-- 批注 -->
	<c:if test="${!empty taskId}">
		<div class="row">
			<div class="col-xm-6">
				<div class="form-group" style="margin: 5 15 15 15px; width: 50%">
					<textarea id="comment" class="form-control" rows="3" placeholder="请填写审批意见"></textarea>
				</div>
			</div>
		</div>
	</c:if>

	<c:if test="${!empty taskId||!empty processInstanceId}">
		<c:if test="${!empty comments }">
			<div class="row">
				<div class="form-group">
					<span class="col-md-1 col-sm-1 form-group">上一节点批注:</span> <span class="form-group col-md-8 col-sm-8"> <c:forEach items="${comments}" var="item" begin="0" varStatus="i">
							<c:if test="${i.index==0 }">
								<fmt:formatDate value="${item.time}" pattern="yyyy-MM-dd HH:mm:ss" />;${item.userName}[${item.taskName}];${item.state};&nbsp;意见：${item.fullmessage}
										</c:if>
						</c:forEach>
					</span>
				</div>
			</div>
		</c:if>
		<div class="row">
			<div class="wlf panel panel-default col-8 col-sm-8" style="margin-left: 15px; padding-left: 0px; padding-right: 0px; font-size: 5px;">
				<div class="panel-heading">
					<h4 class="panel-title">
						<a data-toggle="collapse" data-target="#c1"> 历史批注 >></a>
					</h4>
				</div>
				<div id="c1" class="panel-collapse collapse out">
					<div class="panel-body">
						<table class="table" align="left" height="auto">
							<c:if test="${!empty comments}">
								<thead>
									<tr>
										<th>时间</th>
										<th>批注人</th>
										<th>状态</th>
										<th style="">意见</th>
									</tr>
								</thead>

								<tbody>
									<c:forEach var="item" items="${comments}" begin="0" varStatus="status">
										<tr>
											<td><fmt:formatDate value="${item.time}" pattern="yyyy-MM-dd HH:mm:ss" /></td>
											<td>${item.userName}[${item.taskName}]</td>
											<td>${item.state}</td>
											<td style=''>${item.fullmessage}</td>
										</tr>

									</c:forEach>
									<c:if test="${!empty processModel.initator}">
										<tr>
											<td><fmt:formatDate value="${processModel.startTime}" pattern="yyyy-MM-dd HH:mm:ss" /></td>
											<td>${processModel.initator.username}</td>
											<td>发起</td>
											<td style=''></td>
										</tr>
									</c:if>
								</tbody>
							</c:if>
						</table>
					</div>
				</div>
			</div>
		</div>
	</c:if>
</div>
</div>
