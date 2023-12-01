package com.i4.dandog.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "code")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Code {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int code_seq;
	
	private String code_name;
	
	private String code_value;
}
