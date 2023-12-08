package com.i4.dandog.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Transient;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "QNA")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Qna extends BaseEntity {

	//DB에도 추가해야됨
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int qna_seq;

	private String user_id;

	private String qna_category;

	private String qna_title;

	private String qna_content;

	private String qna_reply;

	//private String qna_img;

	private int qna_view;

	private String answer_state;

	private String etc;
	
	//==================================
	//private int step; // DB에도 추가하기
	
	//private int indent; // DB에도 추가하기
	//==================================
	
	// 파일 업로드를 위한 필드 추가
//    @Transient
//    private MultipartFile qnafile;  // 업로드된 파일을 저장하는 필드
	
	@LastModifiedDate
	@Column(name = "answer_regdate")
	private LocalDateTime answer_regdate;

}
