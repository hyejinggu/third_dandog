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
public class Notice extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int notice_seq;
	
	@Column(length = 100, nullable = false)
	private String notice_title;
	
	@Column(length = 3000, nullable = false)
	private String notice_content;
	
	@Column(length = 200)
	private String notice_img;
	
	@Column(nullable = false)
	private int notice_view;
	
	@Column(length = 100)
	private String etc;
	
	
}
