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
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Lounge extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int lounge_no;
	
	@Column(length = 100, nullable = false)
	private String user_id;
	
	@Column(length = 3000, nullable = false)
	private String lounge_img;
	
	@Column(length = 200)
	private String lounge_title;
	
	@Column(nullable = false)
	private String lounge_content;
	
	@Column(length = 100)
	private String lounge_category;
	
	@Column(length = 100)
	private String lounge_likes;
	
	@Column(length = 100)
	private String lounge_hits;
	
	
}
