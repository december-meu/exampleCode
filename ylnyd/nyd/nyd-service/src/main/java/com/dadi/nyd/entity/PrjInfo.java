package com.dadi.nyd.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.format.annotation.DateTimeFormat;

import com.dadi.sys.entity.Dict;
import com.dadi.sys.model.BizEntity;
import com.dadi.workflow.model.CommentModel;
import com.dadi.workflow.model.ProcessModel;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "prj_info")
public class PrjInfo extends BizEntity {
	private static final long serialVersionUID = 1L;

	private String applier; // 申请人
	private String prjName; // 农业生产项目名称
	private String prjCode; // 农业生产项目编号
	private String prjLeader; // 项目负责人
	private String idcard; // 身份证号
	private String phone; // 联系电话
	private String location; // 土地坐落
	private Dict recordType; // 备案类型（字典：初次备案，续期）
	private String boundary; // 设施用地四至位置
	private Integer prodYonDoc; // 生产设施-是否有承诺书
	private BigDecimal prodTotalArea; // 生产-总面积
	private BigDecimal prodFarmland; // 生产-耕地
	private BigDecimal prodGarden; // 生产-园地
	private BigDecimal prodWoodland; // 生产-林地
	private BigDecimal prodOther; // 生产-其他
	private BigDecimal prodBaseLand; // 生产-基本农田
	private BigDecimal prodConstructLand; // 生产-建设用地
	private BigDecimal prodUnusedLand; // 生产-未利用地
	private Integer attachYonDoc; // 附属-是否有承诺书
	private BigDecimal attachTotalArea; // 附属--总面积
	private BigDecimal attachFarmland; // 附属-耕地
	private BigDecimal attachGarden; // 附属-园地
	private BigDecimal attachWookland; // 附属-林地
	private BigDecimal attachOther; // 附属-其他
	private BigDecimal attachConstructLand; // 附属-建设用地
	private BigDecimal attachUnusedLand; // 附属-未利用地
	private Integer assortTotalDoc; // 配套-是否有承诺书/补划方案
	private BigDecimal accortArea; // 配套-总面积
	private BigDecimal asortFarmland; // 配套-耕地
	private BigDecimal assortGarden; // 配套-园林
	private BigDecimal assortWoodland; // 配套-林地
	private BigDecimal assortOther; // 配套-其他
	private BigDecimal assortConstruct; // 配套-建设用地
	private BigDecimal assortUnused; // 配套未利用地
	private Date prjStartTime; // 项目开始时间
	private Date prjEndTime; // 项目结束时间

	private List<PrjAttach> attachList = new ArrayList<>();
	private List<PrjBoundary> boundaryList = new ArrayList<>();
	private PrjStatus status;
	
	private ProcessModel processModel;//流程相关
	private List<CommentModel> commentModelList = new ArrayList<>();//流程审批意见

	public String getApplier() {
		return applier;
	}

	public void setApplier(String applier) {
		this.applier = applier;
	}

	public String getPrjName() {
		return prjName;
	}

	public void setPrjName(String prjName) {
		this.prjName = prjName;
	}

	public String getPrjLeader() {
		return prjLeader;
	}

	public void setPrjLeader(String prjLeader) {
		this.prjLeader = prjLeader;
	}

	public String getIdcard() {
		return idcard;
	}

	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	@ManyToOne
	@JoinColumn(name = "record_type_id")
	public Dict getRecordType() {
		return recordType;
	}

	public void setRecordType(Dict recordType) {
		this.recordType = recordType;
	}

	public String getBoundary() {
		return boundary;
	}

	public void setBoundary(String boundary) {
		this.boundary = boundary;
	}

	public Integer getProdYonDoc() {
		return prodYonDoc;
	}

	public void setProdYonDoc(Integer prodYonDoc) {
		this.prodYonDoc = prodYonDoc;
	}

	public BigDecimal getProdTotalArea() {
		return prodTotalArea;
	}

	public void setProdTotalArea(BigDecimal prodTotalArea) {
		this.prodTotalArea = prodTotalArea;
	}

	public BigDecimal getProdFarmland() {
		return prodFarmland;
	}

	public void setProdFarmland(BigDecimal prodFarmland) {
		this.prodFarmland = prodFarmland;
	}

	public BigDecimal getProdGarden() {
		return prodGarden;
	}

	public void setProdGarden(BigDecimal prodGarden) {
		this.prodGarden = prodGarden;
	}

	public BigDecimal getProdWoodland() {
		return prodWoodland;
	}

	public void setProdWoodland(BigDecimal prodWoodland) {
		this.prodWoodland = prodWoodland;
	}

	public BigDecimal getProdOther() {
		return prodOther;
	}

	public void setProdOther(BigDecimal prodOther) {
		this.prodOther = prodOther;
	}

	public BigDecimal getProdBaseLand() {
		return prodBaseLand;
	}

	public void setProdBaseLand(BigDecimal prodBaseLand) {
		this.prodBaseLand = prodBaseLand;
	}

	public BigDecimal getProdConstructLand() {
		return prodConstructLand;
	}

	public void setProdConstructLand(BigDecimal prodConstructLand) {
		this.prodConstructLand = prodConstructLand;
	}

	public BigDecimal getProdUnusedLand() {
		return prodUnusedLand;
	}

	public void setProdUnusedLand(BigDecimal prodUnusedLand) {
		this.prodUnusedLand = prodUnusedLand;
	}

	public Integer getAttachYonDoc() {
		return attachYonDoc;
	}

	public void setAttachYonDoc(Integer attachYonDoc) {
		this.attachYonDoc = attachYonDoc;
	}

	public BigDecimal getAttachTotalArea() {
		return attachTotalArea;
	}

	public void setAttachTotalArea(BigDecimal attachTotalArea) {
		this.attachTotalArea = attachTotalArea;
	}

	public BigDecimal getAttachFarmland() {
		return attachFarmland;
	}

	public void setAttachFarmland(BigDecimal attachFarmland) {
		this.attachFarmland = attachFarmland;
	}

	public BigDecimal getAttachGarden() {
		return attachGarden;
	}

	public void setAttachGarden(BigDecimal attachGarden) {
		this.attachGarden = attachGarden;
	}

	public BigDecimal getAttachWookland() {
		return attachWookland;
	}

	public void setAttachWookland(BigDecimal attachWookland) {
		this.attachWookland = attachWookland;
	}

	public BigDecimal getAttachOther() {
		return attachOther;
	}

	public void setAttachOther(BigDecimal attachOther) {
		this.attachOther = attachOther;
	}

	public BigDecimal getAttachConstructLand() {
		return attachConstructLand;
	}

	public void setAttachConstructLand(BigDecimal attachConstructLand) {
		this.attachConstructLand = attachConstructLand;
	}

	public BigDecimal getAttachUnusedLand() {
		return attachUnusedLand;
	}

	public void setAttachUnusedLand(BigDecimal attachUnusedLand) {
		this.attachUnusedLand = attachUnusedLand;
	}

	public Integer getAssortTotalDoc() {
		return assortTotalDoc;
	}

	public void setAssortTotalDoc(Integer assortTotalDoc) {
		this.assortTotalDoc = assortTotalDoc;
	}

	public BigDecimal getAccortArea() {
		return accortArea;
	}

	public void setAccortArea(BigDecimal accortArea) {
		this.accortArea = accortArea;
	}

	public BigDecimal getAsortFarmland() {
		return asortFarmland;
	}

	public void setAsortFarmland(BigDecimal asortFarmland) {
		this.asortFarmland = asortFarmland;
	}

	public BigDecimal getAssortGarden() {
		return assortGarden;
	}

	public void setAssortGarden(BigDecimal assortGarden) {
		this.assortGarden = assortGarden;
	}

	public BigDecimal getAssortWoodland() {
		return assortWoodland;
	}

	public void setAssortWoodland(BigDecimal assortWoodland) {
		this.assortWoodland = assortWoodland;
	}

	public BigDecimal getAssortOther() {
		return assortOther;
	}

	public void setAssortOther(BigDecimal assortOther) {
		this.assortOther = assortOther;
	}

	public BigDecimal getAssortConstruct() {
		return assortConstruct;
	}

	public void setAssortConstruct(BigDecimal assortConstruct) {
		this.assortConstruct = assortConstruct;
	}

	public BigDecimal getAssortUnused() {
		return assortUnused;
	}

	public void setAssortUnused(BigDecimal assortUnused) {
		this.assortUnused = assortUnused;
	}

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getPrjStartTime() {
		return prjStartTime;
	}

	public void setPrjStartTime(Date prjStartTime) {
		this.prjStartTime = prjStartTime;
	}

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getPrjEndTime() {
		return prjEndTime;
	}

	public void setPrjEndTime(Date prjEndTime) {
		this.prjEndTime = prjEndTime;
	}

	@OneToMany(mappedBy = "prjInfo", cascade = { javax.persistence.CascadeType.ALL })
	@JsonBackReference
	public List<PrjAttach> getAttachList() {
		return attachList;
	}

	public void setAttachList(List<PrjAttach> attachList) {
		this.attachList = attachList;
	}

	@OneToMany(mappedBy = "prjInfo", cascade = { javax.persistence.CascadeType.ALL })
	@JsonBackReference
	public List<PrjBoundary> getBoundaryList() {
		return boundaryList;
	}

	public void setBoundaryList(List<PrjBoundary> boundaryList) {
		this.boundaryList = boundaryList;
	}
	
	@Transient
	public ProcessModel getProcessModel() {
		return processModel;
	}

	public void setProcessModel(ProcessModel processModel) {
		this.processModel = processModel;
	}
	
	@Transient
	public List<CommentModel> getCommentModelList() {
		return commentModelList;
	}

	public void setCommentModelList(List<CommentModel> commentModelList) {
		this.commentModelList = commentModelList;
	}

	public String getPrjCode() {
		return prjCode;
	}

	public void setPrjCode(String prjCode) {
		this.prjCode = prjCode;
	}

	@OneToOne(mappedBy = "prjInfo", cascade = CascadeType.ALL)
	public PrjStatus getStatus() {
		return status;
	}

	public void setStatus(PrjStatus status) {
		this.status = status;
	}

}
