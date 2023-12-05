package com.i4.dandog.domain;


import lombok.Data;

@Data
public class CartDTO {
	
	private String user_id;
	
	private int item_no;
	
	private int item_quantity;
	
	private String item_img1;

	private String item_name;

	private String item_desc;
	
	
	 public CartDTO(String user_id, int item_no, int item_quantity, String item_img1, String item_name, String item_desc) {
	        this.user_id = user_id;
	        this.item_no = item_no;
	        this.item_quantity = item_quantity;
	        this.item_img1 = item_img1;
	        this.item_name = item_name;
	        this.item_desc = item_desc;
	    }
	
}
