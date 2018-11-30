package com.dadi.nyd.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.dadi.sys.entity.Dict;
import com.dadi.sys.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "prj_status")
public class PrjStatus extends BaseEntity {
	private static final long serialVersionUID = 1L;

	private PrjInfo prjInfo; // 基本信息id
	private Integer yonSubmit; // 提交状态
	private Integer yonAudit; // 审核状态
	private Integer yonReaudit; // 复审状态
	private Integer yonApprove; // 审批/批准状态
	private Integer yonRecord; // 备案通知状态
	private Date revocationTime; // 撤销时间
	private String revocationStaff; // 撤销人员
	private String revocationReason; // 撤销意见
	private Dict prjState; // 项目状态（在审核、已备案、已撤销、未通过）
	private Integer yonPass = 1;

	@OneToOne(cascade = { CascadeType.ALL })
	@JoinColumn(name = "prj_id")
	@JsonBackReference
	public PrjInfo getPrjInfo() {
		return prjInfo;
	}

	public void setPrjInfo(PrjInfo prjInfo) {
		this.prjInfo = prjInfo;
	}

	public Integer getYonSubmit() {
		return yonSubmit;
	}

	public void setYonSubmit(Integer yonSubmit) {
		this.yonSubmit = yonSubmit;
	}

	public Integer getYonAudit() {
		return yonAudit;
	}

	public void setYonAudit(Integer yonAudit) {
		this.yonAudit = yonAudit;
	}

	public Integer getYonReaudit() {
		return yonReaudit;
	}

	public void setYonReaudit(Integer yonReaudit) {
		this.yonReaudit = yonReaudit;
	}

	public Integer getYonApprove() {
		return yonApprove;
	}

	public void setYonApprove(Integer yonApprove) {
		this.yonApprove = yonApprove;
	}

	public Integer getYonRecord() {
		return yonRecord;
	}

	public void setYonRecord(Integer yonRecord) {
		this.yonRecord = yonRecord;
	}

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getRevocationTime() {
		return revocationTime;
	}

	public void setRevocationTime(Date revocationTime) {
		this.revocationTime = revocationTime;
	}

	public String getRevocationStaff() {
		return revocationStaff;
	}

	public void setRevocationStaff(String revocationStaff) {
		this.revocationStaff = revocationStaff;
	}

	@Column(columnDefinition = "text")
	public String getRevocationReason() {
		return revocationReason;
	}

	public void setRevocationReason(String revocationReason) {
		this.revocationReason = revocationReason;
	}

	@ManyToOne
	@JoinColumn(name = "prj_state_id")
	public Dict getPrjState() {
		return prjState;
	}

	public void setPrjState(Dict prjState) {
		this.prjState = prjState;
	}

}
