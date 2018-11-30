package com.dadi.nyd.workflow;

import java.util.Map;
import java.util.Set;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.ExecutionListener;
import org.activiti.engine.delegate.Expression;
import org.activiti.engine.delegate.TaskListener;
import org.activiti.engine.task.Comment;
import org.activiti.engine.task.IdentityLink;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.dadi.sys.api.UserFacade;
import com.dadi.sys.api.impl.UserFacadeImpl;
import com.dadi.sys.model.SysExecption;
import com.dadi.sys.model.UserModel;
import com.dadi.util.SpringContextHolder;
import com.dadi.util.StringUtils;
import com.dadi.workflow.service.ActAssignListenler;
import com.dadi.workflow.service.ActTaskService;
import com.dadi.workflow.service.ProcessTraceService;
import com.dadi.workflow.service.impl.ActTaskServiceImpl;

public class PrjTaskAssignListener implements ExecutionListener, TaskListener {

	private Logger logger = LoggerFactory.getLogger(ActAssignListenler.class);

	private static ProcessTraceService processTraceService = SpringContextHolder.getBean(ProcessTraceService.class);
	private static ActTaskService actTaskService = SpringContextHolder.getBean(ActTaskService.class);
	private static UserFacade userFacade = SpringContextHolder.getBean(UserFacadeImpl.class);
	private static PrjTaskAssignFacadeImpl prjTaskAssignFacade = SpringContextHolder
			.getBean(PrjTaskAssignFacadeImpl.class);
	// private static TaskService taskServie =
	// SpringContextHolder.getBean(TaskServiceImpl.class);
	/*** */
	private static final long serialVersionUID = 1L;
	/**
	 * 监听器中设置的FiledName(角色名称)
	 */
	private Expression roleName;

	public void setRoleName(Expression roleName) {
		this.roleName = roleName;
	}

	public Expression getRoleName() {
		return roleName;
	}

	private Expression ownerRole;

	public void setOwnerRole(Expression ownerRole) {
		this.ownerRole = ownerRole;
	}

	public Expression getOwnerRole() {
		return ownerRole;
	}

	@Override
	public void notify(DelegateTask delegateTask) {
		// 获取监听任务节点主键
		String taskKey = delegateTask.getTaskDefinitionKey();
		// 监听时间名称 "create"
		String event = delegateTask.getEventName();
		// 获取流程实例id
		String processIntsanceId = delegateTask.getProcessInstanceId();
		String bizName = String.valueOf(delegateTask.getVariable("bizName"));
		String bizId = String.valueOf(delegateTask.getVariable("bizId"));

		// 上一节点办理人id
		String lastAssignId = processTraceService.getLastCommentUserId(processIntsanceId);
		// findUsers By position; if count=1 setAssign else find with
		// lastDepartment
		logger.info("lastAssign id={}", lastAssignId);
		UserModel um = userFacade.findUserModelById(lastAssignId);
		logger.info("lastAssign name={}", um != null ? um.getUsername() : "null");

		if (ownerRole != null) {
			Object ownerObj = ownerRole.getValue(delegateTask);
			logger.info("owner角色名称为 {}", ownerObj.toString());
			String id = actTaskService.getOwnerByRoleName(ownerObj.toString());
			if (StringUtils.isValid(id) && id.split(",").length > 1) {
				throw new SysExecption("节点拥有人大于一位,请联系管理员查看相应角色！");
			} else if (StringUtils.isValid(id)) {
				delegateTask.setOwner(id);
			}
		}
		// String
		// assignId=userFacade.getWorkFlowExecutor(lastAssignId,positionName);
		if ("create".equals(event)) {

			System.out.println("==create===");
			// 获取节点设置的办理人id
			String assignId = delegateTask.getAssignee();
			logger.info("在create事件中获得的assignId为{}", assignId);

			// 获取上一条批注
			Comment comment = processTraceService.getLastCommentByProInstanceId(processIntsanceId);
			// TODO Auto-generated method stub
			if (comment != null) {
				String fullMessage = comment.getFullMessage();
				if (StringUtils.isValid(fullMessage)) {
					String[] tempArray = fullMessage.split("_");
					// 如果是驳回或多级回退 0：回退，3：多级回退
					if ("0".equals(tempArray[0]) || "3".equals(tempArray[0])) {
						String oriAssign = actTaskService.getOrignalAssign(taskKey, processIntsanceId);
						if (StringUtils.isValid(oriAssign)) {
							assignId = oriAssign;
							delegateTask.setAssignee(assignId);
							logger.info("被驳回后找到本节点原始执行人 id为:{}", assignId);
						}
					}
				}
			}
			// 不需要
			if (StringUtils.isValid(assignId)) {
				// 根据办理人id获取流程变量（是否属于大区 是的话admOrg=1，否则admOrg=0）
				Map<String, Object> vars = actTaskService.getFlowVariables(assignId);
				delegateTask.setVariables(vars);
				// Object
				// obj=delegateTask.getVariable("admOrg");
				// logger.info("======>admOrg="+obj.toString());
			}
			// 获取节点办理候选人
			Set<IdentityLink> is = delegateTask.getCandidates();
			if (StringUtils.isNotValid(assignId) && is.size() == 1) {
				// 如果候选办理人只有一个则将其指定为办理人
				delegateTask.setAssignee(is.iterator().next().getUserId());
			}
			// 如果没有指定办理人，也没有候选人则根据角色和上一节点执行人查找
			if (StringUtils.isNotValid(assignId) && is.size() == 0) {
				if (roleName == null) {
					throw new SysExecption("该节点未指定办理人，并且未指定相应角色!");
				}

				delegateTask.getVariable("流程变量");
				String assignOrCandidates = null;
				// 节点监听中设置的roleName的值（中文名称）
				String roleNameStr = roleName.getValue(delegateTask).toString();
				logger.info("roleName={}", roleNameStr);

				// 抽取出来
				// 根据上一节点办理人和该节点办理角色名称查找当前节点办理人id或候选人id串
				assignOrCandidates = prjTaskAssignFacade.getAssignOrCandidateUserId(bizName, bizId, lastAssignId,
						roleNameStr);
				if (assignOrCandidates == null) {
					logger.info("没有找到节点执行人,节点角色名称为:{}", roleNameStr);
					throw new SysExecption("未找到下一节点执行人,请联系管理员设置相应角色！");
				} else if (assignOrCandidates.split(",").length == 1) {
					logger.info("节点key:{},节点执行人:{}", taskKey, roleNameStr);
					delegateTask.setAssignee(assignOrCandidates);
				} else if (assignOrCandidates.split(",").length > 1) {
					logger.info("节点key:{},节点候选人ids:{}", taskKey, assignOrCandidates);
					delegateTask.addCandidateUsers(StringUtils.sqlStrsToSet(assignOrCandidates));
				}
			}

		} else if ("complete".equals(event)) {
			logger.debug("task commplete:{}", taskKey);
		} else if ("assignment".equals(event)) {
			logger.debug("task assignment:{}", taskKey);
		} else if ("delete".equals(event)) {
			logger.debug("task delete:{}", taskKey);
		}
	}

	@Override
	public void notify(DelegateExecution execution) throws Exception {

	}

}
