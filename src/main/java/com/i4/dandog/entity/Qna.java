package com.i4.dandog.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

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

	private String user_id;

	private String qna_category;

	private String qna_title;

	private String qna_content;

	private String qna_reply;

	private String qna_img;

	private int qna_view;

	private String answer_state;

	private String etc;

	@CreatedDate
	@Column(name = "answer_regdate", updatable = false)
	private LocalDateTime answer_regdate;

}
