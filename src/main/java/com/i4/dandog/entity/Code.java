package com.i4.dandog.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Code {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int code_seq;
	
	private String code_name;
	
	private String code_value;
}
