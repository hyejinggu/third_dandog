package com.i4.dandog.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class EtcImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int etc_img_no;
	
	private String etc_img;
}
