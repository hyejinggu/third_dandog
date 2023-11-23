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
	
	@Column(length = 10)
	private String faq_category;
	
	@Column(length = 100, nullable = false)
	private String faq_title;
	
	@Column(length = 1500, nullable = false)
	private String faq_content;
	
	@Column(length = 200)
	private String faq_img;
	
	@Column(nullable = false)
	private int faq_view;
	
	@Column(length = 100)
	private String etc;
}
