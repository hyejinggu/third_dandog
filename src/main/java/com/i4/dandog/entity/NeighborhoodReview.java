package com.i4.dandog.entity;

import javax.persistence.Column;
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
@Table(name = "Neighborhood_review")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NeighborhoodReview extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int neighbor_no;
	
	private String user_id;
	
	private String neighbor_brand_name;
	
	private String neighbor_title;
	
	private String neighbor_content;
	
	private double neighbor_rating;
	
	private String neighbor_category;
	
	
}
