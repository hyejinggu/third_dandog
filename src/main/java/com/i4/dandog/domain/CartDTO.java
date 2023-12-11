package com.i4.dandog.domain;


import lombok.Data;

@Data
public class CartDTO {
	
	private String user_id;
	
	private int item_no;
	
	private int item_quantity;
	
	private String item_img1;

	private String item_name;

	private int item_price;
	
	private int item_discount_rate;
	
	private String options_color;
	private String options_size;
	
	
	 public CartDTO(String user_id, int item_no, int item_quantity, String item_img1, 
			 String item_name, int item_price, int item_discount_rate, 
			 String options_color, String options_size) {
	        this.user_id = user_id;
	        this.item_no = item_no;
	        this.item_quantity = item_quantity;
	        this.item_img1 = item_img1;
	        this.item_name = item_name;
	        this.item_price = item_price;
	        this.item_discount_rate = item_discount_rate;
	        this.options_color = options_color;
	        this.options_size = options_size;
	    }
	
}
