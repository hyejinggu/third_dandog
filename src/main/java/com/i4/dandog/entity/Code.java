package com.i4.dandog.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Code {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int code_seq;
	
	@Column(length = 5, nullable = false)
	private String code_name;
	
	@Column(length = 10, nullable = false)
	private String code_value;
}
