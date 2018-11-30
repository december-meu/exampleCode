package com.dadi.nyd.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.dadi.sys.entity.Dict;
import com.dadi.sys.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "prj_attach")
public class PrjAttach extends BaseEntity {
	private static final long serialVersionUID = 1L;
	
	private PrjInfo prjInfo; // 基本信息id
	private Dict attachType; // 附件类型（字典，9大类，加上备案通知书附件和撤销备案通知书附件）
	private String attachUrl; // 附件地址
	private String name;//名称
	private String prjId;
	

	@ManyToOne
	@JoinColumn(name = "prj_id")
	@JsonBackReference
	public PrjInfo getPrjInfo() {
		return prjInfo;
	}

	public void setPrjInfo(PrjInfo prjInfo) {
		this.prjInfo = prjInfo;
	}

	@ManyToOne
	@JoinColumn(name = "attach_type_id")
	public Dict getAttachType() {
		return attachType;
	}

	public void setAttachType(Dict attachType) {
		this.attachType = attachType;
	}

	public String getAttachUrl() {
		return attachUrl;
	}

	public void setAttachUrl(String attachUrl) {
		this.attachUrl = attachUrl;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Transient
	public String getPrjId() {
		if(prjInfo!=null){
			return prjInfo.getId();
		}else{
			return null;
		}
	}

	public void setPrjId(String prjId) {
		this.prjId = prjId;
	}
}
