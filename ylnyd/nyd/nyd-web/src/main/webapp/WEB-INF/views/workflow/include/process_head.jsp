<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<div class="wrapper wrapper-content">
	<input type="hidden" id="yonCanBack" value="${!empty yonCanBack?yonCanBack:1}"> <input type="hidden" id="taskAssign" value="${processModel.taskAsign}"> 
	<input type="hidden" id="sourcePage" value="${sourcePage}">
	<input type="hidden" id="proInstanceId" value="${processModel.proInstanceId}">
	<div class="row top_msg">
		<div class="form-group col-md-12 col-sm-12">
			<c:if test="${(sourcePage==2) }">
				<span class="td_left">当前任务:</span>
				<span id="taskName" class="hight_light">[${ processModel.taskName}]</span>
				<c:if test="${!empty processModel.assign }">
					<span class="td_left" style="margin-left: 30px">办理人:</span>
					<span class="hight_light">[${ processModel.assign.username}]</span>
				</c:if>

				<c:if test="${!empty processModel.candidators}">
					<span class="td_left" style="margin-left: 30px">候选办理人：</span>
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
				<span class="td_left" style="margin-left: 30px">下一节点:</span>
				<span class="hight_light">[${ processModel.nextTaskName}]</span>
				<c:if test="${!empty processModel.assign }">
					<span class="td_left" style="margin-left: 30px">办理人:</span>
					<span class="hight_light">[${ processModel.assign.username}]</span>
				</c:if>

				<c:if test="${!empty processModel.candidators}">
					<span class="td_left" style="margin-left: 30px">候选办理人：</span>
					<c:forEach var="item" items="${processModel.candidators}">
						<span class="hight_light">${item.username}</span>
					</c:forEach>
				</c:if>

				<!-- 				<div align="right" class="form-group col-md-4 col-sm-4 pull-right"margin-right: 30px"> -->
				<!-- 					<a href="#" id="expenseList" class="btn btn-primary op_btn right" onclick="javascript:expenseList('010105')" data-options="iconCls:'icon-layout-content'" target="blank">打印单据</a>  -->

				<%-- 					<a style="display: none;" href="${webPath}/process/resource/${processModel.proInstanceId}?type=xml" class="btn btn-info op_btn right" target="blank">查看流程xml文件</a> --%>


				<!-- 				</div> -->
			</c:if>
		</div>
	</div>
	<div class="row">
		<div class="form-group col-md-12 col-sm-12">
			<span id="close" class="pull-right"><a href="#" class="btn btn-primary op_btn" data-options="iconCls:'icon-cancel'" onclick="closeThis()">返回</a></span>
			<c:if test="${!empty taskId}">
				<c:if test="${(empty yonCanBack)||(yonCanBack==1)}">
					<span id="rollback"> <a href="#" class="btn btn-warning op_btn" data-options="iconCls:'icon-logout'" onclick="javascript:rollbackSingle('${taskId}','${currentUser.oldUserId}')">回退</a>

					</span>
					<%-- <span id="rollback_multi"> <a href="#" class="btn btn-success op_btn" data-options="iconCls:'icon-logout'" onclick="javascript:jump(1,'${taskId}')">多级回退</a></span> --%>
					<%-- 				<span id="jump_multi"> <a href="#" class="btn btn-primary op_btn" data-options="iconCls:'icon-logout'" onclick="javascript:jump(2,'${taskId}')">越级审批</a> --%>

					</span>
				</c:if>
				<span id="candidate" style="display: none;"> <a href="#" class="btn btn-warning op_btn" data-options="iconCls:'icon-logout'"
					onclick="javascript:claim('${taskId}','${currentUser.oldUserId}')">签收任务</a>

				</span>
				<span id="assign" style="display: none;"> <c:forEach var="item" items="${btns}">
						<a href="#" class="btn btn-primary op_btn" data-options="iconCls:'icon-logout'" onclick="javascript:complete('${item.key}')">${item.value}</a>
					</c:forEach>
				</span>
			</c:if>
			<a href="${webPath}/process/task/viewPage/${processModel.proInstanceId}?type=image" class="btn btn-primary op_btn pull-right" data-options="iconCls:'icon-layout-content'" target="blank">查看流程图</a>
			<c:if test="${(sourcePage==1) }">
				<a id="btnEndTask" style="margin-left: 50px;" href="#" class="btn btn-danger op_btn right" data-options="iconCls:'icon-stop'" onclick="javascript:endProcess('${taskId}','${_userId}')">终止流程</a>
			</c:if>
		</div>
	</div>
	<!-- 批注 -->
	<c:if test="${!empty taskId}">
		<div class="row form-horizontal" style="margin-top: 14px; margin-bottom: 20px;">
			<c:if test="${!empty showPassSelect&&showPassSelect==1}">
				<div class="col-xm-12 col-sm-12" style="display: none">
					<div class="form-group">
						<label class="control-label col-xm-1 col-sm-1">审批状态</label>
						<div id="audit_result" class="col-xm-10 col-sm-10">
							<label><input type="radio" name="yonPass" value="1" checked="checked" style="margin-top: 7px;"> 通过</label> <label><input type="radio" name="yonPass" value="0" style="margin-top: 7px;">
								不通过</label>
						</div>
					</div>

				</div>
			</c:if>
			<div class="col-xm-12 col-sm-12">
				<div class="form-group">
					<label class="control-label col-xm-1 col-sm-1">审批意见</label>
					<div class="col-xm-10 col-sm-10">
						<textarea id="comment" class="form-control" rows="3" placeholder="请填写审批意见"></textarea>
					</div>
				</div>
			</div>
		</div>
	</c:if>

	<c:if test="${!empty taskId||!empty processInstanceId}">
		<c:if test="${!empty comments }">
			<div class="row">
				<div class="form-group col-md-12 col-sm-12">
					<span class="">上一节点批注:</span> <span class=""> <c:forEach items="${comments}" var="item" begin="0" varStatus="i">
							<c:if test="${i.index==0 }">
								<fmt:formatDate value="${item.time}" pattern="yyyy-MM-dd HH:mm:ss" />;${item.userName}[${item.taskName}];${item.state};&nbsp;意见：${item.fullmessage}
										</c:if>
						</c:forEach>
					</span>
				</div>
			</div>
		</c:if>
		<div class="row ">
			<div class="col-12 col-sm-12">
				<div class="wlf panel panel-default">
					<div class="panel-heading">
						<h4 class="panel-title">
							<a data-toggle="collapse" data-target="#c1"> 历史批注 >></a>
						</h4>
					</div>
					<div id="c1" class="panel-collapse collapse out">
						<div class="panel-body">
							<table class="table" align="left" height="auto" style="font-size: 14px;">
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
		</div>
	</c:if>
</div>
