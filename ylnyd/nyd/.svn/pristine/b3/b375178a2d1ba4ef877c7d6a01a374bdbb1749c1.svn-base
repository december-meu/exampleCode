package com.dadi.nyd.service;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import com.dadi.nyd.entity.App;
public interface AppService {  
	public Page<App> findByFilter(Specification<App> spec, Pageable pageRequest);//分页排序
	public List<App> findByFilter(Specification<App> spec,Sort sort);//不分页，排序
	public List<App> findByFilter(Specification<App> spec);//不分页
	public App findById(String id);//按id查找
	public App findByCode(String code);//按编码查找
	public int delete(String id);//根据id删除
	public int batchDelete(String ids);//批量删除
	public App addApp(App app);//添加
	public App updateApp(App app);//更新
}
