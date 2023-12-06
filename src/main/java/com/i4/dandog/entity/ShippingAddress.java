package com.i4.dandog.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity 
@Table(name = "shipping_address")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@IdClass(ShippingAddressKeyId.class)
public class ShippingAddress {
	
	@Id
    private String user_id;
	
	private String recipient_name;
	
	@Id
	private String recipient_phone;
	
	private int post_code;
	
	private String user_address1;
	
	private String user_address2;
	
}
