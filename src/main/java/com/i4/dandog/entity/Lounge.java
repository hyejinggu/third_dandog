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
public class Lounge extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int lounge_no;
	
	private String user_id;
	
	private String lounge_img;
	
	private String lounge_title;
	
	private String lounge_content;
	
	private String lounge_category;
	
	private int lounge_likes;
	private int lounge_hits;
	
	
}
