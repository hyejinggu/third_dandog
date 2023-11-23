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
public class Qna extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int qna_seq;
	
	@Column(length = 20)
	private String user_id;
	
	@Column(length = 10)
	private String qna_category;
	
	@Column(length = 100, nullable = false)
	private String qna_title;
	
	@Column(length = 1500, nullable = false)
	private String qna_content;
	
	@Column(length = 1500)
	private String qna_reply;
	
	@Column(length = 200)
	private String qna_img;
	
	@Column(nullable = false)
	private int qna_view;
	
	@Column(length = 10, nullable = false)
	private String answer_state;
	
	@Column(length = 500)
	private String etc;
	
	
}
