package com.dadi.nyd.service.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.dadi.auth.AuthUser;
import com.dadi.base.constants.RespContants;
import com.dadi.nyd.dao.PrjBoundaryDao;
import com.dadi.nyd.entity.PrjBoundary;
import com.dadi.nyd.entity.PrjInfo;
import com.dadi.nyd.service.PrjBoundaryService;
import com.dadi.nyd.service.PrjInfoService;
import com.dadi.sys.entity.Dict;
import com.dadi.sys.service.DictService;
import com.dadi.util.StringUtils;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.io.WKTReader;

@Service
public class PrjBoundaryServiceImpl implements PrjBoundaryService {
	@Autowired
	private PrjBoundaryDao PrjBoundaryDao;
	@Autowired
	private PrjInfoService prjInfoService;
	@Autowired
	private DictService dictService;

	@Override
	public PrjBoundary findById(String id) {
		return PrjBoundaryDao.findOne(id);
	}

	@Override
	public Page<PrjBoundary> findByFilter(Specification<PrjBoundary> spec, Pageable pageRequest) {
		return PrjBoundaryDao.findAll(spec, pageRequest);
	}

	@Override
	public List<PrjBoundary> findByFilter(Specification<PrjBoundary> spec, Sort sort) {
		return PrjBoundaryDao.findAll(spec, sort);
	}

	@Override
	public List<PrjBoundary> findByFilter(Specification<PrjBoundary> spec) {
		return PrjBoundaryDao.findAll(spec);
	}

	@Override
	public int delete(String id) {
		return PrjBoundaryDao.deletById(id);
	}

	@Override
	public int batchDelete(String ids) {
		Set<String> idSet = StringUtils.sqlStrsToSet(ids);
		return PrjBoundaryDao.batchDelete(idSet);
	}

	@Override
	public PrjBoundary addPrjBoundary(PrjBoundary PrjBoundary) {
		PrjBoundary.setCreateUser(AuthUser.getCurrentUser());
		PrjBoundary.setCreateDate(new Date());
		return PrjBoundaryDao.save(PrjBoundary);
	}

	@Override
	public PrjBoundary updatePrjBoundary(PrjBoundary PrjBoundary) {
		return PrjBoundaryDao.save(PrjBoundary);
	}

	@Override
	public List<PrjBoundary> findByPrjId(String prjId) {
		return PrjBoundaryDao.findByPrjId(prjId);
	}

	@Override
	public Map<String, Object> findInfoByid(String id) {
		StringBuilder SQL = new StringBuilder(
				"select prj_info.prj_name as prjname,prj_info.prj_code as prjcode,prj_info.prod_total_area as prodtotalarea,prj_info.attach_total_area as attachtotalarea,prj_info.accort_area as accortArea, "
						+ "landtype.name as landtype,status.name as statusname ,status.id as statusid , " + "prj_info.prj_start_time as starttime ,prj_info.prj_end_time as endtime from prj_info "
						+ "left join prj_boundary on prj_boundary.prj_id = prj_info.id " + "left join prj_status on prj_info.id = prj_status.prj_id "
						+ "left join sys_dict as landtype on landtype.id = prj_boundary.land_type_id " + "left join sys_dict as status on status.id = prj_status.prj_state_id "
						+ "where prj_boundary.del = 0 and prj_boundary.id = '" + id + "'");
		String sql = SQL.toString();
		List<Map<String, Object>> list = PrjBoundaryDao.getMapsBySql(sql);
		if (list.size() > 0) {
			return list.get(0);
		} else {
			Map<String, Object> map = new HashMap<>();
			map.put("msg", "未查询到该项目范围数据");
			return map;
		}
	}

	@Override
	public List<Map<String, Object>> getPrjLand(String prjId) {
		StringBuilder SQL = new StringBuilder("SELECT ST_ASTEXT(land_boundary) AS geom FROM prj_boundary WHERE del = 0 and prj_id = '" + prjId + "'");
		String sql = SQL.toString();
		List<Map<String, Object>> list = PrjBoundaryDao.getMapsBySql(sql);
		return list;
	}
	
	@Override
	public List<Map<String, Object>> getPrjLandById(String id) {
		StringBuilder SQL = new StringBuilder("SELECT ST_ASTEXT(l.land_boundary) AS geom,sys_dict.name as typename FROM prj_boundary l left join sys_dict on land_type_id = sys_dict.id WHERE l.del = 0 and l.id = '" + id + "'");
		String sql = SQL.toString();
		List<Map<String, Object>> list = PrjBoundaryDao.getMapsBySql(sql);
		return list;
	}
	

	@Override
	public Map<String, Object> upload(HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();

		String prjId = request.getParameter("prjId");// 项目id
		String typeName = request.getParameter("typeName");

		try {
			CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());
			PrjBoundary prjBoundary = new PrjBoundary();
			PrjBoundary prjBoundaryed = null;

			PrjInfo prj = null;
			if (StringUtils.isValid(prjId)) {
				prj = prjInfoService.findById(prjId);
				prjBoundary.setPrjInfo(prj);
			}
			if (StringUtils.isValid(typeName)) {
				Dict type = dictService.findByName(typeName);
				prjBoundary.setLandType(type);
				if(type!=null){
					prjBoundary.setLandTypeName(type.getName());
				}
			}

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
							try {
								String geomStrs = convertStreamToString(filesI.getInputStream());
								geomStrs = geomStrs.replace("/n", ")),((");
								geomStrs = geomStrs.substring(0, geomStrs.length() - 5);
								geomStrs = "MultiPolygon(((" + geomStrs + ")))";
								// System.out.println("wkt-----" + geomStrs);
								Geometry geometry = wktToGeometry(geomStrs);
								prjBoundary.setLandBoundary(geometry);
								if (StringUtils.isValid(prjId)) {
									if (StringUtils.isValid(typeName)) {
										List<PrjBoundary> list = findByPrjId(prjId);
										for (int n = 0; n < list.size(); n++) {
											if (list.get(n).getLandType() != null) {
												if (list.get(n).getLandType().getName().equals(typeName)) {
													delete(list.get(n).getId());
												}
											}
										}
									}
								}
								prjBoundaryed = addPrjBoundary(prjBoundary);
							} catch (IOException e) {
								e.printStackTrace();
							}
						}
					}
				}
				System.out.println("<===========================>");
				if (prjBoundaryed == null) {
					map.put("code", RespContants.PARAM_ERROR);
					map.put("msg", "参数异常");
				} else {
					map.put("code", 200);
					map.put("msg", "上传成功");
					map.put("data", prjBoundaryed);
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("code", 400);
			map.put("msg", "服务器内部错误");
		}
		return map;
	}

	public static String convertStreamToString(InputStream inputStream) {
		BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
		StringBuilder sb = new StringBuilder();

		String line = null;
		try {
			while ((line = reader.readLine()) != null) {
				sb.append(line + "/n");
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				inputStream.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return sb.toString();
	}

	/**
	 * 
	 */
	public Geometry wktToGeometry(String geomStr) {
		// WKT转Geometry
		WKTReader wktReader = new WKTReader();
		Geometry geometry = null;
		try {
			geometry = wktReader.read(geomStr);
			geometry.setSRID(2360);
		} catch (com.vividsolutions.jts.io.ParseException e) {
			e.printStackTrace();
		}
		return geometry;
	}

	@Override
	public List<PrjBoundary> updateLandByPrjId(String attachId, String prjId) {
		List<PrjBoundary> list = new ArrayList<>();
		String[] array = attachId.split(",");
		System.out.println(attachId+"----"+array.length);
		for (int i = 0; i < array.length; i++) {
			PrjBoundary prjBoundary = findById(array[i]);
			if (prjBoundary != null) {
				if (StringUtils.isValid(prjId)) {
					prjBoundary.setPrjInfo(prjInfoService.findById(prjId));
					PrjBoundary prjBoundaryed = updatePrjBoundary(prjBoundary);
					list.add(prjBoundaryed);
				}
			}
		}
		return list;
	}
}
