package com.i4.dandog.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table
@Data
@DynamicInsert
// @DynamicInsert를 사용해서 아예 null값이 되었을 때 쿼리문에서 제외되도록 해야, DDL에 설정한 default값으로 잘 들어가진다.
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Item extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int item_no;
	
	@Column(length = 10, nullable = false)
	private String item_category;
	
	@Column(length = 50, nullable = false)
	private String item_name;
	
	@Column(nullable = false)
	private int item_price;
	
	@Column(length = 10, nullable = false)
	private String oprions_size;
	@Column(length = 10, nullable = false)
	private String oprions_color;
	
	@Column(length = 500, nullable = false)
	private String item_desc;
	
	@Column(length = 100, nullable = false)
	private String item_img1;
	@Column(length = 10)
	private String item_img2;
	
	// default 값이 0이어서 위에 @DynamicInsert 적용
	private int item_sales_volume;
	private int item_discount_rate;
	
	@Column(nullable = false)
	private int item_stock;
	
	
}
