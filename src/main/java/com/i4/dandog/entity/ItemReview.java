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
@Table(name = "Item_review")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemReview extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int review_no;
	
	private String user_id;
	
	private String item_name;
	
	private String review_content;
	
	private int review_star;
	
	private int order_num;
	
	
}
