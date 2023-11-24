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
public class Faq extends BaseEntity {

	@Id //primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
	private int faq_seq;
	
	private String faq_category;
	
	private String faq_title;
	
	private String faq_content;
	
	private String faq_img;
	
	private int faq_view;
	
	private String etc;
}
