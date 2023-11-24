package com.i4.dandog.entity;

import javax.persistence.Id;

import org.hibernate.annotations.DynamicInsert;

@DynamicInsert
public class Cart {

	@Id
	private String user_id;
	
	@Id
	private int item_no;
	
	private int item_quantity;
	
}
