package com.i4.dandog.entity;

import javax.persistence.Column;
import javax.persistence.Id;

public class ShippingAddress {
	
	@Id
	@Column(length = 20, nullable = false)
	private String user_id;
	
	@Column(length = 30, nullable = false)
	private String recipient_name;
	
	@Column(length = 12, nullable = false)
	private String recipient_phone;
	
	@Column(length = 5, nullable = false)
	private int post_code;
	
	@Column(length = 50, nullable = false)
	private String user_address1;
	
	@Column(length = 50, nullable = false)
	private String user_address2;
	
	
	
}
