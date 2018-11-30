package com.dadi.nyd.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import com.dadi.auth.AuthUser;
import com.dadi.util.StringUtils;
import com.dadi.nyd.entity.App;
import com.dadi.nyd.dao.AppDao;
import com.dadi.nyd.service.AppService;



@Service
public class AppServiceImpl implements AppService {
	@Autowired
	private AppDao appDao;

	@Override
	public App findById(String id) {
		return appDao.findOne(id);
	}

	@Override
	public Page<App> findByFilter(Specification<App> spec, Pageable pageRequest) {
		return appDao.findAll(spec, pageRequest);
	}

	@Override
	public List<App> findByFilter(Specification<App> spec, Sort sort) {
		// TODO Auto-generated method stub
		return appDao.findAll(spec, sort);
	}

	@Override
	public List<App> findByFilter(Specification<App> spec) {
		// TODO Auto-generated method stub
		return appDao.findAll(spec);
	}

	@Override
	public App findByCode(String code) {
		// TODO Auto-generated method stub
		return appDao.findByCode(code);
	}

	@Override
	public int delete(String id) {
		// TODO Auto-generated method stub
		return appDao.deletById(id);
	}

	@Override
	public int batchDelete(String ids) {
		Set<String> idSet = StringUtils.sqlStrsToSet(ids);
		return appDao.batchDelete(idSet);
	}

	@Override
	public App addApp(App app) {
		app.setCreateUser(AuthUser.getCurrentUser());
		app.setCreateDate(new Date());
		return appDao.save(app);
	}

	@Override
	public App updateApp(App app) {
		// TODO Auto-generated method stub
		return appDao.saveAfterClearCache(app);
	}
}

