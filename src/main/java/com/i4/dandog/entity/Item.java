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
public class Item extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int item_no;
	
	private String item_category;
	private String item_name;
	private int item_price;
	private String oprions_size;
	private String oprions_color;
	private String item_desc;
	private String item_img1;
	private String item_img2;
	private int item_sales_volume;
	private int item_discount_rate;
	private int item_stock;
	
	
}
