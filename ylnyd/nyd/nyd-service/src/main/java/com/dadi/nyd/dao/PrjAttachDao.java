package com.dadi.nyd.dao;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dadi.base.persistance.BaseDao;
import com.dadi.nyd.entity.PrjAttach;

@Repository
public interface PrjAttachDao extends BaseDao<PrjAttach, String> {
	@Query("select t from PrjAttach t where t.del=0 and t.prjInfo.id=?1 order by t.attachType.sortNum asc")
	/**
	 * 根据prjId查全部附件
	 * @param prjId
	 * @return
	 */
	List<PrjAttach> findAllByPrjId(String prjId);
	
	@Query("select t from PrjAttach t where t.del=0 and t.prjInfo.id=?1 and t.attachUrl is not null order by t.attachType.sortNum asc")
	/**
	 * 根据prjId查全部附件
	 * @param prjId
	 * @return
	 */
	List<PrjAttach> findAllUploadedByPrjId(String prjId);
	
	@Query("select t from PrjAttach t where t.del=0 and t.prjInfo.id=?1 and t.attachType.id in (?2) and t.attachType.del = 0 order by t.attachType.sortNum asc")
	/**
	 * 根据prjId查九大类的附件
	 * @param prjId
	 * @return
	 */
	List<PrjAttach> findByPrjId(String prjId,Set<String> typeIds);
	@Modifying
	@Query("update PrjAttach t set t.del=1 where t.id=?1")
	int deletById(String id);
	@Modifying
	@Query("update PrjAttach t set t.del=1 where t.id in (?1)")
	public int batchDelete(Set<String> idSet);
}
