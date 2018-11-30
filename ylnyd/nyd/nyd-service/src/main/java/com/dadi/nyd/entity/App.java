package com.dadi.nyd.entity;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import com.dadi.core.modules.entity.IdEntity;
import com.dadi.sys.entity.Dict;
import com.dadi.sys.model.BaseEntity;
@Entity
@Table
public class App extends BaseEntity{
	private String code;
	private String name;
	private Dict type;
	public void setCode(String code) {
		this.code = code;
	}
	public String getCode() {
		return code;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getName() {
		return name;
	}
	public void setType(Dict type) {
		this.type = type;
	}
	@ManyToOne
	@JoinColumn(name="type_id")
	public Dict getType() {
		return type;
	}
}
