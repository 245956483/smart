package com.cserver.saas.system.module.smart.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "a1")
public class A1 implements Serializable {
	private static final long serialVersionUID = 1L;
	/**姓名*/
	private String name;
	/**年龄*/
	private int age;
	/**主键*/
	@Id
	private String id;
	/**打印*/
	private String printWord;
	/**创建人*/
	private String createUser;
	/**创建人姓名*/
	private String createUserName;
	/**创建时间*/
	private Date createTime;
	/**修改时间*/
	private Date updateTime;
	/**地址*/
	private String address;
	/**备注*/
	private String memo;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPrintWord() {
		return printWord;
	}
	public void setPrintWord(String printWord) {
		this.printWord = printWord;
	}
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public String getCreateUserName() {
		return createUserName;
	}
	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
}
