package com.dadi.nyd.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.dadi.sys.entity.Dict;
import com.dadi.sys.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vividsolutions.jts.geom.Geometry;

@Entity
@Table(name = "prj_boundary")
public class PrjBoundary extends BaseEntity {
	private static final long serialVersionUID = 1L;
	private PrjInfo prjInfo; // 基本信息id
	private Dict landType; // 类型（字典，项目用地和附属设施用地）
	private Geometry landBoundary; // 用地范围
	private String landTypeName;
	private String landStatus;

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
	@JoinColumn(name = "land_type_id")
	public Dict getLandType() {
		return landType;
	}

	public void setLandType(Dict landType) {
		this.landType = landType;
	}

	@JsonIgnore
	@Type(type = "org.hibernate.spatial.GeometryType")
	public Geometry getLandBoundary() {
		return landBoundary;
	}

	public void setLandBoundary(Geometry landBoundary) {
		this.landBoundary = landBoundary;
	}

	public String getLandTypeName() {
		return landTypeName;
	}

	public void setLandTypeName(String landTypeName) {
		this.landTypeName = landTypeName;
	}

	public String getLandStatus() {
		return landStatus;
	}

	public void setLandStatus(String landStatus) {
		this.landStatus = landStatus;
	}

}
