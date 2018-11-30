package com.dadi.nyd.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.SystemException;

import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dadi.auth.AuthUser;
import com.dadi.base.constants.RespContants;
import com.dadi.base.controller.BaseController;
import com.dadi.core.modules.persistence.query.JpaQuery;
import com.dadi.nyd.entity.PrjAttach;
import com.dadi.nyd.entity.PrjInfo;
import com.dadi.nyd.service.PrjBoundaryService;
import com.dadi.nyd.service.PrjInfoService;
import com.dadi.sys.entity.Dict;
import com.dadi.sys.model.UserModel;
import com.dadi.sys.service.DictService;
import com.dadi.sys.service.UserService;
import com.dadi.sys.utils.BootstrapUtil;
import com.dadi.sys.utils.UserUtil;
import com.dadi.util.StringUtils;
import com.dadi.workflow.model.CommentModel;
import com.dadi.workflow.model.ProcessModel;
import com.dadi.workflow.service.ActTaskService;
import com.dadi.workflow.service.ProcessTraceService;

@Controller
@RequestMapping("nyd/prj")
public class PrjInfoController extends BaseController {
	@Autowired
	private PrjInfoService prjInfoService;
	@Autowired
	private ActTaskService actTaskService;
	@Autowired
	private DictService dictService;
	@Autowired
	private ProcessTraceService processTraceService;
	@Autowired
	private PrjBoundaryService prjBoundaryService;
	@Autowired
	private UserService userService;
	/**
	 * 在审列表
	 */
	@RequestMapping(value = { "index", "" })
	public String index(HttpServletRequest request, Model model, HttpSession session) {
		return "nyd/prj/index";
	}

	@ModelAttribute("prjInfo")
	public PrjInfo get(@RequestParam(required = false) String id) {
		if (StringUtils.isNotBlank(id)) {
			return prjInfoService.findById(id);
		} else {
			return new PrjInfo();
		}
	}

	/**
	 * 录入列表 all
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/list")
	@ResponseBody
	public Map<String, Object> list(HttpServletRequest request, Model model) {
		JpaQuery<PrjInfo> query = getQuery(request);
		Page<PrjInfo> PrjInfoPage = prjInfoService.findByFilter(query.getSpec(), query.getPageRequest());
		List<PrjInfo> list = new ArrayList<>();
		if (BootstrapUtil.getPageData(PrjInfoPage) != null) {
			list = (List<PrjInfo>) BootstrapUtil.getPageData(PrjInfoPage).get("rows");
		}
		for (int i = 0; i < list.size(); i++) {
			String processInstanceId = list.get(i).getProcessInstanceId();
			System.out.println();
			if (StringUtils.isValid(processInstanceId)) {
				List<CommentModel> commentModelList = actTaskService.getCommentsByProcessInstanceId(processInstanceId);
				ProcessModel processModel = actTaskService.getProcessModelByProcessInstanceId(processInstanceId);
				ProcessInstance processInstance = processTraceService.getProcessInstanceById(processInstanceId);
//				Task task = processTraceService.getCurrentTaskInfo(processInstance);

				list.get(i).setCommentModelList(commentModelList);
				list.get(i).setProcessModel(processModel);
//				list.get(i).setTask(task);
			}
		}
		BootstrapUtil.getPageData(PrjInfoPage).put("rows", list);
		return BootstrapUtil.getPageData(PrjInfoPage);
	}

	/**
	 * 项目详情页
	 */
	@RequestMapping(value = "/form", method = RequestMethod.GET)
	public String getSaveOrUpdateForm(String prjId, Model model) {
		if (StringUtils.isValid(prjId)) {
			PrjInfo prjInfo = prjInfoService.findById(prjId);
			model.addAttribute("prjInfo", prjInfo);
			List<Map<String, Object>> landList = prjBoundaryService.getPrjLand(prjId);
			System.out.println("landList-----"+landList);
			model.addAttribute("landList", landList);
		}
		return "nyd/prj/form";
	}
	
	/**
	 * 只读的详情页
	 */
	@RequestMapping(value = "/showForm", method = RequestMethod.GET)
	public String gotoShowForm(String prjId, Model model) {
		if (StringUtils.isValid(prjId)) {
			PrjInfo prjInfo = prjInfoService.findById(prjId);
			model.addAttribute("prjInfo", prjInfo);
			List<Map<String, Object>> landList = prjBoundaryService.getPrjLand(prjId);
			System.out.println("landList readonly-----"+landList);
			model.addAttribute("landList", landList);
		}
		return "nyd/prj/show_form";
	}
	
	/**
	 * 
	 */
	@RequestMapping(value = "/gotoViewer", method = RequestMethod.GET)
	public String gotoHome(String id, Model model) {
		model.addAttribute("attach", prjInfoService.findAttachOne(id));
		return "nyd/prj/view/viewer";
	}

	/**
	 * 首页
	 */
	@RequestMapping(value = "/gotoHome", method = RequestMethod.GET)
	public String gotoHome(Model model) {
		return "nyd/prj/home";
	}

	/**
	 * 上传备案通知附件页
	 */
	@RequestMapping(value = "/upload/caseAttach", method = RequestMethod.GET)
	public String uploadCase(String prjId, Model model) {
		model.addAttribute("prjId", prjId);
		return "nyd/prj/caseAttach";
	}

	/**
	 * 上传界址点
	 */
	@RequestMapping(value = "/upload/caseScope", method = RequestMethod.GET)
	public String uploadCaseScope(String prjId, Model model) {
		model.addAttribute("prjId", prjId);
		return "nyd/prj/caseScope";
	}

	@RequestMapping(value = "/save")
	@ResponseBody
	public Map<String, Object> add(PrjInfo prjInfo, @RequestParam(required = false) String prjId) {
		PrjInfo prjInfoed = null;
		String id = prjInfo.getId();
		if (StringUtils.isBlank(id)) {
			prjInfoed = prjInfoService.addPrjInfo(prjInfo);
		} else {

			prjInfoed = prjInfoService.updatePrjInfo(prjInfo);
		}
		return getResponse(RespContants.OK, "操作成功！", prjInfoed);
	}

	@RequestMapping(value = "/delete")
	@ResponseBody
	public Map<String, Object> delete(String id) throws Exception {
		int count = prjInfoService.delete(id);
		return getResponse(RespContants.OK, "删除了" + count + "调数据！", null);
	}

	@RequestMapping(value = "/batchdelete")
	@ResponseBody
	public Map<String, Object> batchDelete(String ids) throws Exception {
		int count = prjInfoService.batchDelete(ids);
		return getResponse(RespContants.OK, "删除了" + count + "调数据！", null);
	}
	
	/**
	 * 展示附件字典类型
	 */
	@RequestMapping({ "/getPrjAttachDict" })
	@ResponseBody
	public Map<String, Object> getPrjAttachDict()  {
		String typeCode = "type-attach";
		return prjInfoService.getPrjAttachDict(typeCode);
	}

	/**
	 * 九大类文件上传
	 * 
	 * @param request
	 * @param taskBookId
	 * @return
	 * @throws SystemException
	 */
	@RequestMapping({ "/upload" })
	@ResponseBody
	public Map<String, Object> upload(HttpServletRequest request) throws SystemException {
		Map<String, Object> map = new HashMap<>();
		map = prjInfoService.upload(request, null);
		return map;
	}

	/**
	 * 备案通知文件上传
	 * 
	 * @param request
	 * @param taskBookId
	 * @return
	 * @throws SystemException
	 */
	@RequestMapping({ "/uploadCaseFile" })
	@ResponseBody
	public Map<String, Object> uploadCaseFile(HttpServletRequest request) throws SystemException {
		Map<String, Object> map = new HashMap<>();
		String id = "";
		Dict type = dictService.findByName("备案通知书");
		if (type != null) {
			String typeId = type.getId();
			String prjId = request.getParameter("prjId");// 项目id
			if (StringUtils.isValid(prjId)) {
				Set<String> set = new HashSet<>();
				set.add(typeId);
				List<PrjAttach> list = prjInfoService.getAttachByTypeAndPrj(prjId, set);
				if (list.size() > 0) {
					PrjAttach prjAttach = list.get(0);
					id = prjAttach.getId();
				}
			}
		}
		map = prjInfoService.upload(request, id);
		return map;
	}

	/**
	 * 查询所有项目附件
	 * 
	 * @param prjId
	 * @return
	 */
	@RequestMapping({ "/getPrjInfoAttach" })
	@ResponseBody
	public Map<String, Object> getPrjInfoAttach(String prjId) {
		PrjInfo prjInfo = prjInfoService.findById(prjId);
		List<PrjAttach> list = prjInfo.getAttachList();
		List<PrjAttach> returnList = new ArrayList<>();
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getDel() == 0) {
				returnList.add(list.get(i));
			}
		}
		return BootstrapUtil.getPageData(returnList.size(), returnList);
	}

	/**
	 * 查询九大类附件
	 * 
	 * @param prjId
	 * @return
	 */
	@RequestMapping({ "/getAttach" })
	@ResponseBody
	public Map<String, Object> getAttach(String prjId) {
		if (StringUtils.isValid(prjId)) {
			List<PrjAttach> list = prjInfoService.getAttach(prjId);
			return BootstrapUtil.getPageData(list.size(), list);
		} else {
			return null;
		}
	}

	/**
	 * 查询所有附件
	 * 
	 * @param prjId
	 * @return
	 */
	@RequestMapping({ "/getAllAttach" })
	@ResponseBody
	public Map<String, Object> getFlowAttach(String prjId) {
		if (StringUtils.isValid(prjId)) {
			List<PrjAttach> list = prjInfoService.getAllAttach(prjId);
			return BootstrapUtil.getPageData(list.size(), list);
		} else {
			return null;
		}
	}
	
	/**
	 * 查询所有已上传的附件
	 * 
	 * @param prjId
	 * @return
	 */
	@RequestMapping({ "/getAllUploadedAttach" })
	@ResponseBody
	public Map<String, Object> getAllUploadedAttach(String prjId) {
		if (StringUtils.isValid(prjId)) {
			List<PrjAttach> list = prjInfoService.getAllUploadedAttach(prjId);
			return BootstrapUtil.getPageData(list.size(), list);
		} else {
			return null;
		}
	}

	/**
	 * 删除附件
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping({ "/deleteFile" })
	@ResponseBody
	public Map<String, Object> deleteFile(String id) {
		Integer num = prjInfoService.deleteFile(id);
		return getResponse(RespContants.OK, "已删除" + num + "条数据", null);
	}

	/*----------------------------------------------------------审核----------------------------------------------------------*/

	/**
	 * 流程开始
	 * 
	 * @param proDefKey
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "process/form/{proDefKey}")
	public String getProcessFormStart(@PathVariable String proDefKey, Model model) {
		UserModel user = AuthUser.getCurrentUser();
		model.addAttribute("proDefKey", proDefKey);
		model.addAttribute("businessName", PrjInfo.class.getSimpleName());
		model.addAttribute("flag", "start");
		return "nyd/prj/approval/task_form";
	}

	@RequestMapping(value = "process/form")
	public String getProcessForm(@RequestParam(required = false) String proDefKey, @RequestParam(required = false) String taskKey, Model model) {
		if (StringUtils.isValid(taskKey)) {
			model.addAttribute("taskKey", taskKey);
			model.addAttribute("flag", "todo");
		} else {
			model.addAttribute("flag", "search");
		}
		model.addAttribute("proDefKey", proDefKey);
		return "nyd/prj/approval/task_form";
	}

	/**
	 * 审核列表
	 */
	@RequestMapping(value = "/approval/index", method = RequestMethod.GET)
	public String gotoApproval(String prjId, Model model) {
		model.addAttribute("prjId", prjId);
		UserModel user = AuthUser.getCurrentUser();
//		UserUtil.getUserRoles(user.getId());
//		userService.findUserRoleCodes(user.getId());
		model.addAttribute("user", user);
		return "nyd/prj/approval/index";
	}
/*-------------------------------------------------------变更----------------------------------------------------------*/
	/**
	 *变更页面
	 */
	@RequestMapping(value = "/gotoChange", method = RequestMethod.GET)
	public String gotoChange(Model model) {
		return "nyd/prj/change/index";
	}
	
	/**
	 * 变更详情页
	 */
	@RequestMapping(value = "/gotoChange/form", method = RequestMethod.GET)
	public String gotoChangeForm(String prjId,Model model) {
		if (StringUtils.isValid(prjId)) {
			PrjInfo prjInfo = prjInfoService.findById(prjId);
			model.addAttribute("prjInfo", prjInfo);
			List<Map<String, Object>> landList = prjBoundaryService.getPrjLand(prjId);
			model.addAttribute("landList", landList);
		}
		return "nyd/prj/form";
	}
	
/*-------------------------------------------------------备案监管----------------------------------------------------------*/
	@RequestMapping(value = "/gotoSupervise", method = RequestMethod.GET)
	public String gotoSupervise(Model model) {
		return "nyd/prj/supervise/index";
	}
	
/*-------------------------------------------------------项目查询----------------------------------------------------------*/
	@RequestMapping(value = "/gotoSearch", method = RequestMethod.GET)
	public String gotoSearch(Model model) {
		return "nyd/prj/search/index";
	}
	
/*-------------------------------------------------------项目统计----------------------------------------------------------*/
	@RequestMapping(value = "/gotoCount", method = RequestMethod.GET)
	public String gotoCount(Model model) {
		return "nyd/prj/count/index";
	}
}
