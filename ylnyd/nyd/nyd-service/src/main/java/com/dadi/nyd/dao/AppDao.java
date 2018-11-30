package com.dadi.nyd.dao;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.dadi.nyd.entity.App;
import com.dadi.base.persistance.BaseDao;

@Repository
public interface AppDao extends BaseDao<App, String> {
	@Query("select d from App d where d.code=?1 and d.del=0")
	App findByCode(String code);
	@Query("select t from App t where t.del=0 and t.type.id=?1")
	List<App> findByType(String typeId);
	@Query("select count(*) from App t where t.del=0 and t.type.id=?1")
	Integer getCountByType(String typeId);
	@Modifying
	@Query("update App t set t.del=1 where t.id=?1")
	int deletById(String id);
	@Modifying
	@Query("update App t set t.del=1 where t.id in (?1)")
	public int batchDelete(Set<String> idSet);
}
