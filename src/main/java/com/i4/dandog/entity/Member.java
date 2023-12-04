package com.i4.dandog.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Member")
@DynamicInsert
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member extends BaseEntity {

    @Id
    private String user_id;

    private String user_password;

    private String user_name;

    private String user_birthday;

    private String user_phonenum;

    private String user_email;

    private String ani_name;

    private String ani_birthday;

    private String ani_type;

    private String ani_info;

    private String required_check;

    private String choice_check;

    private Integer post_code;

    private String user_address1;

    private String user_address2;



	@CreatedDate
	@Column(name = "withdrawal_date", updatable = false) private LocalDateTime
	withdrawal_date;
	
	@Column(name = "point")
	private Integer point;

	
	@Column(name = "regdate", updatable = false) private LocalDateTime
	regdate;
	
	
	



}
