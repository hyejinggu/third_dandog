package com.i4.dandog.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "event")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Event {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int event_no;
	
	private String event_name;
	private String event_img;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate e_reg_date;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate e_exp_date;
	
	@Transient // DB에는 따로 생성되지 않음
	private MultipartFile event_imgToUpload;
	
	
}
