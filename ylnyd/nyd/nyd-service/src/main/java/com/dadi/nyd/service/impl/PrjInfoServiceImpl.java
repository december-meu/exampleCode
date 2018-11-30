package com.dadi.nyd.service.impl;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.dadi.auth.AuthUser;
import com.dadi.base.constants.RespContants;
import com.dadi.base.model.Pager;
import com.dadi.nyd.PrjConstants;
import com.dadi.nyd.dao.PrjAttachDao;
import com.dadi.nyd.dao.PrjInfoDao;
import com.dadi.nyd.dao.PrjStatusDao;
import com.dadi.nyd.entity.PrjAttach;
import com.dadi.nyd.entity.PrjInfo;
import com.dadi.nyd.entity.PrjStatus;
import com.dadi.nyd.service.PrjInfoService;
import com.dadi.sys.entity.Dict;
import com.dadi.sys.entity.DictType;
import com.dadi.sys.model.UserModel;
import com.dadi.sys.service.DictService;
import com.dadi.sys.service.DictTypeService;
import com.dadi.sys.utils.BootstrapUtil;
import com.dadi.util.DateUtils;
import com.dadi.util.StringUtils;
import com.dadi.workflow.model.CommentModel;
import com.dadi.workflow.model.ProcessModel;
import com.dadi.workflow.service.ActTaskService;

@Service
public class PrjInfoServiceImpl implements PrjInfoService {
	@Autowired
	private PrjInfoDao prjInfoDao;
	@Autowired
	private PrjAttachDao prjAttachDao;
	@Autowired
	private DictService dictService;
	@Autowired
	private ActTaskService actTaskService;
	@Autowired
	private PrjStatusDao prjStatusDao;
	@Autowired
	private DictTypeService dictTypeService;

	@Override
	public PrjInfo findById(String id) {
		return prjInfoDao.findOne(id);
	}

	@Override
	public Page<PrjInfo> findByFilter(Specification<PrjInfo> spec, Pageable pageRequest) {
		return prjInfoDao.findAll(spec, pageRequest);
	}

	@Override
	public List<PrjInfo> findByFilter(Specification<PrjInfo> spec, Sort sort) {
		return prjInfoDao.findAll(spec, sort);
	}

	@Override
	public List<PrjInfo> findByFilter(Specification<PrjInfo> spec) {
		return prjInfoDao.findAll(spec);
	}

	@Override
	public int delete(String id) {
		return prjInfoDao.deletById(id);
	}

	@Override
	public int batchDelete(String ids) {
		Set<String> idSet = StringUtils.sqlStrsToSet(ids);
		return prjInfoDao.batchDelete(idSet);
	}

	@Override
	public PrjInfo addPrjInfo(PrjInfo PrjInfo) {
		PrjInfo PrjInfoed = null;
		PrjInfo.setCreateUser(AuthUser.getCurrentUser());
		PrjInfo.setCreateDate(new Date());
		PrjInfo.setPrjCode(getCode());
		PrjInfoed = prjInfoDao.save(PrjInfo);

		List<Dict> list = dictService.findByTypeCode("type-attach");
		for (int i = 0; i < list.size(); i++) {
			if(list.get(i).getDel() == 0){
				PrjAttach attach = new PrjAttach();
				attach.setAttachType(list.get(i));
				attach.setPrjInfo(PrjInfoed);
				prjAttachDao.save(attach);
			}
		}
		PrjStatus prjStatus = new PrjStatus();
		prjStatus.setPrjInfo(PrjInfoed);
		prjStatusDao.saveWithUserAndDate(prjStatus);
		return PrjInfoed;
	}

	@Override
	public PrjInfo updatePrjInfo(PrjInfo PrjInfo) {
		return prjInfoDao.saveAfterClearCache(PrjInfo);
	}

	@Override
	public Map<String, Object> upload(HttpServletRequest request, String id) {
		Map<String, Object> map = new HashMap<String, Object>();

		String prjId = request.getParameter("prjId");// 项目id
		String typeId = request.getParameter("attachType.id");// 类型名称
		if (StringUtils.isNotValid(id)) {
			id = request.getParameter("id");// 附件id
		}

		try {
			CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());
			PrjAttach prjAttach = new PrjAttach();
			PrjAttach prjAttached = null;
			if (StringUtils.isValid(id)) {
				prjAttach = prjAttachDao.findOne(id);
			} else {
				map.put("code", 400);
				map.put("msg", "服务器内部错误");
				return map;
			}
			PrjInfo prj = null;
			if (StringUtils.isValid(prjId)) {
				prj = findById(prjId);
				prjAttach.setPrjInfo(prj);
			}
			Dict type = null;
			if (StringUtils.isValid(typeId)) {
				type = dictService.findById(typeId);
				prjAttach.setAttachType(type);
			}
			prjAttach.setCreateDate(new Date());
			prjAttach.setCreateUser(AuthUser.getCurrentUser());

			StringBuffer buffer = new StringBuffer();
			List<MultipartFile> files = new ArrayList<>();
			List<String> listPath = new ArrayList<>();
			if (multipartResolver.isMultipart(request)) { // 判断 request
				// 转换成多部分request
				MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
				files = multiRequest.getFiles("files"); // 取得上传文件的list
				if (files != null && files.size() != 0) {
					for (int i = 0; i < files.size(); i++) {
						// 是否有文件上传,即多部分请求
						MultipartFile filesI = files.get(i);
						// 取得当前上传文件的文件名称
						String myFileName = filesI.getOriginalFilename();
						// 如果名称不为“”,说明该文件存在，否则说明该文件不存在
						if (myFileName.trim() != "") {
							buffer.append(myFileName).append(",");
							// 重命名上传后的文件名
							String fileName = filesI.getOriginalFilename();
							fileName = URLDecoder.decode(fileName, "utf-8");
							System.out.println("fileName=" + fileName);

							String suffix = fileName.substring(fileName.lastIndexOf("."), fileName.length());
//							String name = fileName.substring(0, fileName.lastIndexOf(".")) + "_" + System.currentTimeMillis() + suffix;
							prjAttach.setName(fileName.substring(0, fileName.lastIndexOf(".")));
							String name = System.currentTimeMillis() + suffix;
							String path = PrjConstants.PRJ_DIR_ATTACH + name;
							File localFile = new File(path);
							filesI.transferTo(localFile);
							String savedPath = path.substring(PrjConstants.MEDIA_ROOT_PATH.length(), path.length());
							prjAttach.setAttachUrl(PrjConstants.PRJ_REQUEST_PATH + savedPath);
							listPath.add(PrjConstants.PRJ_REQUEST_PATH + savedPath);
							prjAttached = prjAttachDao.saveAfterClearCache(prjAttach);
						}
					}
				}
			}
			System.out.println("listPath=" + listPath);
			System.out.println("<===========================>");
			if (listPath.size() == 0) {
				map.put("code", RespContants.PARAM_ERROR);
				map.put("msg", "参数异常");
			} else {
				map.put("code", 200);
				map.put("msg", "上传成功");
				map.put("data", prjAttached);
			}

			// progressService.uploadAreaData(filePath, CgProcedureProgressId);

		} catch (IOException e) {
			e.printStackTrace();
			map.put("code", 400);
			map.put("msg", "服务器内部错误");
		} catch (Exception e) {
			e.printStackTrace();
			map.put("code", 400);
			map.put("msg", "服务器内部错误");
		}
		return map;
	}

	@Override
	public Integer deleteFile(String id) {
		Integer num = 0;
		if (StringUtils.isValid(id)) {
			PrjAttach prjAttach = prjAttachDao.findOne(id);
			prjAttach.setAttachUrl(null);
			prjAttach.setName(null);
			prjAttach.setCreateDate(null);
			prjAttach.setCreateUser(null);
			prjAttach.setCreateUserName(null);
			prjAttach.setCreateUserId(null);
			prjAttachDao.saveAfterClearCache(prjAttach);
		}
		return num;
	}

	@Override
	public List<PrjAttach> getAttach(String prjId) {
		Set<String> set = new HashSet<>();
		set.add("备案通知书");
		set.add("撤销备案通知书");
		Set<String> typeIds = new HashSet<>();
		typeIds = getDictSet("type-attach", set);
		return prjAttachDao.findByPrjId(prjId, typeIds);
	}

	@Override
	public List<PrjAttach> getAllAttach(String prjId) {
		return prjAttachDao.findAllByPrjId(prjId);
	}
	
	@Override
	public List<PrjAttach> getAllUploadedAttach(String prjId) {
		return prjAttachDao.findAllUploadedByPrjId(prjId);
	}

	@Override
	public Pager findTodoList(PageRequest pageRequest) {
		String stateId = "";
		Dict dict = dictService.findByName("在审核");
		if (dict != null) {
			stateId = dict.getId();
		}
		StringBuilder SQL = new StringBuilder("select prj_info.prjCode as prjcode, prj_info.prjName as prjname,prj_info.applier as applier,prj_info.phone as phone, "
				+ " prj_info.createUserName as createusername,prj_info.processInstanceId as processInstanceId " + " from prj_info left join prj_status on prj_info.id = prj_status.prj_id "
				+ " where (prj_status.prj_state_id is null or prj_status.prj_state_id = '" + stateId + "')");
		String sql = SQL.toString();
		Pager pager = prjInfoDao.findMapsBySql(sql, pageRequest);
		List<?> list = pager.getRows();
		for (int i = 0; i < list.size(); i++) {
			String processInstanceId = "";
			List<CommentModel> commentModelList = actTaskService.getCommentsByProcessInstanceId(processInstanceId);
			ProcessModel processModel = actTaskService.getProcessModelByProcessInstanceId(processInstanceId);
		}
		return pager;
	}

	@Override
	public Set<String> getDictSet(String typeCode, Set<String> names) {
		List<Dict> list = dictService.findByTypeCode(typeCode);
		Set<String> set = new HashSet<>();
		for (int i = 0; i < list.size(); i++) {
			set.add(list.get(i).getId());
		}
		Iterator<String> iter = names.iterator();
		while (iter.hasNext()) {
			Dict dict = dictService.findByName(iter.next());
			if (dict != null) {
				set.remove(dict.getId());
			}
		}
		return set;
	}

	public String getCode() {
		String year = DateUtils.getYear();
		String code = "YL" + year;
		List<String> list = prjInfoDao.getCode(code);
		if (list.size() > 0) {
			String thisCode = list.get(0);
			int num = Integer.valueOf(thisCode.substring(6)) + 1;
			String str = String.valueOf(num);
			int strLen = str.length();
			if (strLen < 3) {
				while (strLen < 3) {
					StringBuffer sb = new StringBuffer();
					sb.append("0").append(str);
					str = sb.toString();
					strLen = str.length();
				}
			}
			code = code + str;
			return code;
		} else {
			code = code + "001";
			return code;
		}
	}

	@Override
	public List<PrjAttach> getAttachByTypeAndPrj(String prjId, Set<String> set) {
		List<PrjAttach> list = prjAttachDao.findByPrjId(prjId, set);
		return list;
	}

	@Override
	public Map<String, Object> getPrjAttachDict(String typeCode) {
		Set<String> set = new HashSet<>();
		set.add("备案通知书");
		set.add("撤销备案通知书");
		Set<String> typeIds = new HashSet<>();
		typeIds = getDictSet("type-attach", set);
		String ids = "(";
		Iterator<String> it = typeIds.iterator();
		while (it.hasNext()) {
			String str = it.next();
			ids = ids + "'" + str + "',";
		}
		ids = ids.substring(0, ids.length() - 1);
		ids = ids + ")";
		StringBuilder SQL = new StringBuilder("select sys_dict.name as dictname from sys_dict where sys_dict.id in " + ids + "and sys_dict.del = 0  order by sys_dict.sort_num asc");
		String sql = SQL.toString();
		List<Map<String, Object>> listMap = prjInfoDao.getMapsBySql(sql);
		return BootstrapUtil.getPageData(listMap.size(), listMap);
	}

	@Override
	public PrjAttach findAttachOne(String id) {
		PrjAttach prjAttach = prjAttachDao.findOne(id);
		return prjAttach;
	}

}
