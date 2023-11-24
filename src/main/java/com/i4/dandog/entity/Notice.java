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
	
	// DB에 이미 테이블 속성을 입력해둬서 @Column 을 추가하지않아도 됨
	private String notice_title;
	
	private String notice_content;
	
	private String notice_img;
	
	private int notice_view;
	
	private String etc;
	
	
}
