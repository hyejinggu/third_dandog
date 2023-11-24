package com.i4.dandog.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetail {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int order_num; 
	private String user_id; 
	private int item_no; 
	private int total_price; 
	private String payment; 
	private String shipping_msp; 
	private String recipient_name; 
	private String recipient_phone; 
	private int post_code; 
	private String user_address1; 
	private String user_address2;
	
}
