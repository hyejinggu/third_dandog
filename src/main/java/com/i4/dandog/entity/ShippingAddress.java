package com.i4.dandog.entity;

import javax.persistence.Id;

public class ShippingAddress {
	
	@Id
	private String user_id;
	
	private String recipient_name;
	
	private String recipient_phone;
	
	private int post_code;
	
	private String user_address1;
	
	private String user_address2;
	
	
	
}
