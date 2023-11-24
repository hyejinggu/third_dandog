package com.i4.dandog.entity;

import javax.persistence.Column;
import javax.persistence.Id;

import org.hibernate.annotations.DynamicInsert;

@DynamicInsert
public class Cart {

	@Id
	@Column(length = 20)
	private String user_id;
	
	@Id
	@Column
	private int item_no;
	
	@Column
	private int item_quantity;
	
}
