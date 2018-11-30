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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dadi.base.constants.RespContants;
import com.dadi.base.controller.BaseController;
import com.dadi.core.modules.persistence.query.JpaQuery;
import com.dadi.nyd.entity.PrjAttach;
import com.dadi.nyd.entity.PrjBoundary;
import com.dadi.nyd.service.PrjBoundaryService;
import com.dadi.sys.entity.Dict;
import com.dadi.sys.utils.BootstrapUtil;
import com.dadi.util.StringUtils;

@Controller
@RequestMapping("nyd/prjBoundary")
public class PrjBoundaryController extends BaseController {
	@Autowired
	private PrjBoundaryService prjBoundaryService;

	@RequestMapping(value = { "index", "" })
	public String index(HttpServletRequest request, Model model, HttpSession session) {

		return "nyd/prj/index";
	}

	@ModelAttribute("prjBoundary")
	public PrjBoundary get(@RequestParam(required = false) String id) {
		if (StringUtils.isNotBlank(id)) {
			return prjBoundaryService.findById(id);
		} else {
			return new PrjBoundary();
		}
	}

	@RequestMapping(value = "/list")
	@ResponseBody
	public Map<String, Object> list(HttpServletRequest request, Model model) {
		JpaQuery<PrjBoundary> query = getQuery(request);
		Page<PrjBoundary> prjBoundaryPage = prjBoundaryService.findByFilter(query.getSpec(), query.getPageRequest());
		return BootstrapUtil.getPageData(prjBoundaryPage);
	}

	/**
	 * 项目id查范围list
	 */
	@RequestMapping(value = "findByPrjId")
	@ResponseBody
	public Map<String, Object> list(String prjId) {
		List<PrjBoundary> list = null;
		if(StringUtils.isValid(prjId)){
			list = prjBoundaryService.findByPrjId(prjId);
			return getResponse(RespContants.OK, "查询成功", list);
		}else{
			return getResponse(RespContants.OK, "查询失败", list);
		}
	}

	// 添加或修改页面
	@RequestMapping(value = "/form", method = RequestMethod.GET)
	public String getSaveOrUpdateForm(String depId, Model model) {
		return "nyd/prj/form";
	}

	@RequestMapping(value = "/save")
	@ResponseBody
	public Map<String, Object> add(PrjBoundary prjBoundary, @RequestParam(required = false) String prjId) {
		PrjBoundary PrjBoundaryAdded = null;
		String id = prjBoundary.getId();
		if (StringUtils.isBlank(id)) {
			PrjBoundaryAdded = prjBoundaryService.addPrjBoundary(prjBoundary);
		} else {

			PrjBoundaryAdded = prjBoundaryService.updatePrjBoundary(prjBoundary);
		}
		return getResponse(RespContants.OK, "操作成功！", PrjBoundaryAdded);
	}

	@RequestMapping(value = "/delete")
	@ResponseBody
	public Map<String, Object> delete(String id) throws Exception {
		int count = prjBoundaryService.delete(id);
		return getResponse(RespContants.OK, "删除了" + count + "调数据！", null);
	}

	@RequestMapping(value = "/batchdelete")
	@ResponseBody
	public Map<String, Object> batchDelete(String ids) throws Exception {
		int count = prjBoundaryService.batchDelete(ids);
		return getResponse(RespContants.OK, "删除了" + count + "调数据！", null);
	}
	
	@RequestMapping(value = "/findInfoByid")
	@ResponseBody
	public Map<String, Object> findInfoByid(String id) {
		Map<String, Object> map = prjBoundaryService.findInfoByid(id);
		return map;
	}
	
	/**
	 * 界址点上传
	 * @param request
	 * @param taskBookId
	 * @return
	 * @throws SystemException
	 */
	@RequestMapping({ "/uploadScope" })
	@ResponseBody
	public Map<String, Object> uploadCaseFile(HttpServletRequest request) throws SystemException {
		Map<String, Object> map = new HashMap<>();
		map = prjBoundaryService.upload(request);
		return map;
	}
	
	/**
	 * 数据库关联保存地图数据
	 */
	@RequestMapping({ "/saveLandByPrjId" })
	@ResponseBody
	public Map<String, Object> saveLandByPrjId(String attachId, String prjId) {
		List<PrjBoundary> list = prjBoundaryService.updateLandByPrjId(attachId, prjId);
		return getResponse(200, "保存成功", list);
	}

	/**
	 * 查询新增项目范围
	 */
	@RequestMapping({ "/selectLands" })
	@ResponseBody
	public Map<String, Object> selectLands(String landIds) {
		List<Map<String, Object>> lists = new ArrayList<>();
		if(StringUtils.isValid(landIds)){
			String[] array = landIds.split(",");
			for(int i =0;i<array.length;i++){
				List<Map<String, Object>> list = prjBoundaryService.getPrjLandById(array[i]);
				if(list.size()>0){
					lists.add(list.get(0)); 
				}
			}
		}
		return getResponse(200, "查询成功", lists);
	}
}
