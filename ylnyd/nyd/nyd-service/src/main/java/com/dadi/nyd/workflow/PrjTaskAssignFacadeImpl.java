package com.dadi.nyd.workflow;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.SystemException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dadi.sys.entity.AdmOrg;
import com.dadi.sys.entity.Department;
import com.dadi.sys.entity.User;
import com.dadi.sys.service.RoleService;
import com.dadi.sys.service.UserService;
import com.dadi.util.StringUtils;
import com.google.common.collect.Sets;

@Component
public class PrjTaskAssignFacadeImpl {
	Logger logger = LoggerFactory.getLogger(PrjTaskAssignFacadeImpl.class);
	@Autowired
	private UserService userService;
	@Autowired
	private RoleService roleService;

	public String getAssignOrCandidateUserId(String lastAssignId, String roleNameStr) throws SystemException {
		// 按照角色名称查找
		List<User> users1 = userService.findUserByRoleName(roleNameStr);
		if (users1.size() == 1) {
			User user = users1.get(0);
			// 如果找到只有一人则直接返回
			logger.info("该角色只有一个用户,即办理人为:{}", user.getUsername());
			return user.getId();
		} else if (users1.size() > 1) {
			User lastAssign = userService.findById(lastAssignId);
			User superio = lastAssign.getDirectSuperior();
			logger.info("上一节点执行人:{}的直接上级为:{}", lastAssign != null ? lastAssign.getUsername() : "[空]",
					superio != null ? superio.getUsername() : "[空]");
			if (superio != null) {
				// 如果直接上级岗位相符
				for (User u : users1) {
					if (superio.getId().equals(u.getId())) {
						logger.info("办理人为上一节点执行人的直接上级:{}", superio.getUsername());
						return superio.getId();
					}
				}

			}
			// 如果部门领导不是上一节点执行人，则部门领导
			Department dep = lastAssign.getDepartment();
			// // 通过部门加岗位查找
			if (dep == null)
				throw new SystemException("当前用户未设置部门信息!");
			User lastLeader = dep.getDepLeader();
			if (lastAssign != null && lastLeader != null && !lastAssign.equals(lastLeader.getId())) {
				for (User u : users1) {
					if (lastLeader.getId().equals(u.getId())) {
						logger.info("办理人为上一节点执行人部门领导:{}", superio.getUsername());
						return lastLeader.getId();
					}
				}
			}
			// 如果有大区则查看大区负责人是否该角色
			AdmOrg ao = dep.getAdmOrg();
			if (ao != null) {
				User leader = ao.getLeader();
				if (leader != null) {
					for (User u : users1) {
						if (leader.getId().equals(u.getId())) {
							logger.info("办理人为大区负责人:{}", leader.getUsername());
							return leader.getId();
						}
					}
				}
			}
			Department superDep = dep.getAdmParent();
			if (superDep == null)
				superDep = dep.getParent();

			Set<User> users = Sets.newHashSet();
			// 通过部门角色查找，部门可能是当前部门，也可能是上级部门
			for (User u : users1) {
				if (u.getDepartment().equals(dep) || u.getDepartment().equals(superDep)) {
					users.add(u);
				}
			}
			// if (users.size() == 1) {
			// User u = users.iterator().next();
			// logger.info("根据部门[{}]和角色[{}]找到用户{}为办理人",
			// u.getDepartment().getName(), roleName, u.getUsername());
			// return u.getId();
			// } else if (users.size() > 1) {
			// User leader = dep.getDepLeader();
			// if (leader != null) {
			// for (User u : users) {
			// if (leader.getId().equals(u.getId()))
			// logger.info("根据上一节点执行人部门[{}]和角色[{}]找到用户{}为办理人",
			// u.getDepartment().getName(), roleName, u.getUsername());
			// return leader.getId();
			// }
			// }
			//
			// if (superDep != null) {
			// // 上级部门负责人
			// User user1 = superDep.getDepLeader();
			// if (user1 != null) {
			// for (User u : users1) {
			// if (user1.getId().equals(u.getId()))
			// logger.info("根据上节点父部门[{}]和角色[{}]找到用户{}为办理人",
			// u.getDepartment().getName(), roleName, u.getUsername());
			// return user1.getId();
			// }
			// }
			// }
			// Set<String> ids = new HashSet<String>();
			// for (User u : users) {
			// logger.info("根据部门[{}]和角色[{}]找到候选办理人:{}",
			// u.getDepartment().getName(), roleName, u.getUsername());
			// ids.add(u.getId());
			// }
			// return StringUtils.setToSqlStrs(ids);
			//
			// }
			// 如果没有找到
			Set<String> ids = new HashSet<String>();
			// for (User u : users1) {
			// logger.info("根据角色[{}]找到候选办理人:{}", roleName, u.getUsername());
			// ids.add(u.getId());
			//
			// }
			return StringUtils.setToSqlStrs(ids);
		}
		return null;
	}

	public String getAssignOrCandidateUserId(String bizName, String bizId, String lastAssignId, String roleNameStr) {
		String prjId = null;
		List<User> users1 = userService.findUserByRoleName(roleNameStr);
		if (users1.size() == 1) {
			User user = users1.get(0);
			// 如果找到只有一人则直接返回
			logger.info("该角色只有一个用户,即办理人为:{}", user.getUsername());
			return user.getId();
		} else if (users1.size() > 1) {
			// 如果没有找到
			Set<String> ids = new HashSet<String>();
			for (User u : users1) {
				logger.info("根据角色[{}]找到候选办理人:{}", roleNameStr, u.getUsername());
				ids.add(u.getId());
			}
			return StringUtils.setToSqlStrs(ids);
		}
		return null;
	}
}
