package com.dadi.nyd.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import com.dadi.nyd.entity.PrjBoundary;

public interface PrjBoundaryService {
	public Page<PrjBoundary> findByFilter(Specification<PrjBoundary> spec, Pageable pageRequest);// 分页排序

	public List<PrjBoundary> findByFilter(Specification<PrjBoundary> spec, Sort sort);// 不分页，排序

	public List<PrjBoundary> findByFilter(Specification<PrjBoundary> spec);// 不分页

	public PrjBoundary findById(String id);// 按id查找

	public int delete(String id);// 根据id删除

	public int batchDelete(String ids);// 批量删除

	public PrjBoundary addPrjBoundary(PrjBoundary PrjBoundary);// 添加

	public PrjBoundary updatePrjBoundary(PrjBoundary PrjBoundary);// 更新

	/**
	 * 项目id查询所有
	 */
	public List<PrjBoundary> findByPrjId(String prjId);
	
	
	public Map<String ,Object> findInfoByid(String id);
	
	public List<Map<String ,Object>> getPrjLand(String prjId);
	
	public List<Map<String, Object>> getPrjLandById(String id);
	
	/**
	 *上传界址点
	 * @param request
	 * @return
	 */
	public Map<String, Object> upload(HttpServletRequest request);
	
	/**
	 * 数据库关联保存地图数据
	 */
	public List<PrjBoundary> updateLandByPrjId(String attachId,String prjId);
}
