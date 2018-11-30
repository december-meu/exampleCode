package com.dadi.nyd.web;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import com.dadi.base.controller.BaseController;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dadi.auth.AuthCasRealm;
import com.dadi.auth.AuthUser;
import com.dadi.base.constants.RespContants;
import com.dadi.common.AppInit;
import com.dadi.common.Encryption;
import com.dadi.core.modules.persistence.query.JpaQuery;
import com.dadi.nyd.entity.App;
import com.dadi.sys.utils.BootstrapUtil;
import com.dadi.nyd.entity.App;
import com.dadi.nyd.service.AppService;
import com.dadi.util.StringUtils;


@Controller
@RequestMapping("nyd/app")
public class AppIndexController extends BaseController{
	@Autowired
	private AppService appService;

	@RequestMapping(value = {"index",""})
  public String index(HttpServletRequest request, Model model, HttpSession session){
	
	  return "nyd/app/index";
  }

	@ModelAttribute("app")
	public App get(@RequestParam(required = false) String id) {
		if (StringUtils.isNotBlank(id)) {
			return appService.findById(id);
		} else {
			return new App();
		}
	}

	@RequestMapping(value = "/list")
	@ResponseBody
	public Map<String, Object> list(HttpServletRequest request, Model model) {
		JpaQuery<App> query = getQuery(request);
		Page<App> AppPage = appService.findByFilter(query.getSpec(), query.getPageRequest());
		return BootstrapUtil.getPageData(AppPage);
	}

	// 添加或修改页面
	@RequestMapping(value = "/form", method = RequestMethod.GET)
	public String getSaveOrUpdateForm(String depId, Model model) {
		return "nyd/app/form";
	}

	@RequestMapping(value = "/save")
	@ResponseBody
	public Map<String, Object> add(App app, @RequestParam(required = false) String depId,
		@RequestParam(required = false) String typeId) {
		App AppAdded = null;
		String id = app.getId();
		if (StringUtils.isBlank(id)) {
			AppAdded = appService.addApp(app);
		} else {

			AppAdded = appService.updateApp(app);
		}
		return getResponse(RespContants.OK, "操作成功！", AppAdded);
	}
	@RequestMapping(value = "/delete")
	@ResponseBody
	public Map<String, Object> delete(String id) throws Exception {
		int count = appService.delete(id);
		return getResponse(RespContants.OK, "删除了" + count + "调数据！", null);
	}

	@RequestMapping(value = "/batchdelete")
	@ResponseBody
	public Map<String, Object> batchDelete(String ids) throws Exception {
		int count = appService.batchDelete(ids);
		return getResponse(RespContants.OK, "删除了" + count + "调数据！", null);
	}
	
	@RequestMapping(value = "/existcheck/code")
	@ResponseBody
	public Map<String, Object> isCodeExist(String code) {
		App app= appService.findByCode(code);
		return BootstrapUtil.validate(app != null, "字典编码重复！");
	}

}
