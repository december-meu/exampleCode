package com.dadi.nyd.dao;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dadi.base.persistance.BaseDao;
import com.dadi.nyd.entity.PrjBoundary;

@Repository
public interface PrjBoundaryDao extends BaseDao<PrjBoundary, String> {
	@Query("select t from PrjBoundary t where t.del=0 and t.prjInfo.id=?1")
	List<PrjBoundary> findByPrjId(String prjId);

	@Modifying
	@Query("update PrjBoundary t set t.del=1 where t.id=?1")
	int deletById(String id);

	@Modifying
	@Query("update PrjBoundary t set t.del=1 where t.id in (?1)")
	public int batchDelete(Set<String> idSet);
}
