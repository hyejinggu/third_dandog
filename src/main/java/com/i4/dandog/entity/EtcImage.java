package com.i4.dandog.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class EtcImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int etc_img_no;
	
	@Column(length = 100, nullable = false)
	private String etc_img;
}
