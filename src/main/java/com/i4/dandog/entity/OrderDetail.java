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
@Table(name = "Order_Detail")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int order_detail_no;
	private int order_num;
	private int item_no;
	private int item_quantity;
	private int item_price;
	private String review_state;
	private String option_size;
	private String option_color;
	

}
