package com.i4.dandog.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table
@DynamicInsert
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member extends BaseEntity {
	
	@Id
	@Column(length = 20)
	//@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String user_id;
	
	@Column(length = 100, nullable = false)
	private String user_password;
	
	@Column(length = 30, nullable = false)
	private String user_name;
	
	@Column(length = 8, nullable = false)
	private String user_birthday;
	
	@Column(length = 12, nullable = false)
	private String user_phonenum;
	
	@Column(length = 50, nullable = false)
	private String user_email;
	
	@Column(length = 10)
	private String ani_name;
	
	@Column(length = 8)
	private String ani_birthday;
	
	@Column(length = 5, nullable = false)
	private String ani_type;
	
	@Column(length = 100)
	private String ani_info;
	
	@Column(length = 1, nullable = false) //DEFAULT 'Y' NOT NULL
	private String required_check;
	
	@Column(length = 1, nullable = false)
	private String choice_check;
	
	@Column(length = 5, nullable = false)
	private int post_code;
	
	@Column
	private int point;
	
	@Column(length = 50, nullable = false)
	private String user_address1;
	
	@Column(length = 50, nullable = false)
	private String user_address2;
	
}
