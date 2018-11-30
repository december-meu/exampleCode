package com.dadi.nyd.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import com.dadi.base.model.Pager;
import com.dadi.nyd.entity.PrjAttach;
import com.dadi.nyd.entity.PrjInfo;

public interface PrjInfoService {
	public Page<PrjInfo> findByFilter(Specification<PrjInfo> spec, Pageable pageRequest);// 分页排序

	public List<PrjInfo> findByFilter(Specification<PrjInfo> spec, Sort sort);// 不分页，排序

	public List<PrjInfo> findByFilter(Specification<PrjInfo> spec);// 不分页

	public PrjInfo findById(String id);// 按id查找

	public int delete(String id);// 根据id删除

	public int batchDelete(String ids);// 批量删除

	public PrjInfo addPrjInfo(PrjInfo PrjInfo);// 添加

	public PrjInfo updatePrjInfo(PrjInfo PrjInfo);// 更新
	
	/**
	 *上传附件
	 * @param request
	 * @return
	 */
	public Map<String, Object> upload(HttpServletRequest request,String id );
	
	/**
	 * 删除附件
	 */
	public Integer deleteFile(String id);
	
	/**
	 * 查看九大类附件
	 */
	public List<PrjAttach> getAttach(String prjId);
	
	/**
	 * 查看所有附件
	 */
	public List<PrjAttach> getAllAttach(String prjId);
	
	/**
	 * 查看所有已上传的附件
	 */
	public List<PrjAttach> getAllUploadedAttach(String prjId);
	
	/**
	 * 项目id和附件类型id查附件
	 */
	public List<PrjAttach> getAttachByTypeAndPrj(String prjId,Set<String> set);
	
	/**
	 * 查找待办list
	 */
	public Pager findTodoList(PageRequest pageRequest);
	
	/**
	 * 查字典表指定类型的集合，去除指定的类型
	 * @param typeCode
	 * @param names
	 * @return
	 */
	public Set<String> getDictSet(String typeCode,Set<String> names);
	
	/**
	 * 关联附件类型字典查询附件
	 */
	public Map<String,Object> getPrjAttachDict(String typeode);
	
	/**
	 * 查找单个文档
	 * 
	 * @param id
	 * @return
	 */
	PrjAttach findAttachOne(String id);

}
