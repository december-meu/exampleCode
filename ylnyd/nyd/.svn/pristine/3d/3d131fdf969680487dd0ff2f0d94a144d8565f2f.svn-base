package com.dadi.nyd.dao;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dadi.base.persistance.BaseDao;
import com.dadi.nyd.entity.PrjInfo;

@Repository
public interface PrjInfoDao extends BaseDao<PrjInfo, String> {
	@Modifying
	@Query("update PrjInfo t set t.del=1 where t.id=?1")
	int deletById(String id);

	@Modifying
	@Query("update PrjInfo t set t.del=1 where t.id in (?1)")
	public int batchDelete(Set<String> idSet);
	
	@Query("select p.prjCode from PrjInfo p where p.prjCode like %?1% order by p.prjCode desc")
	public List<String> getCode (String code);
	
}
