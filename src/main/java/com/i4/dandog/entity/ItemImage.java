package com.i4.dandog.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Item_Image")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemImage {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int image_no;
	
	private int item_no;
	private String item_img;
	
	@Transient
	private MultipartFile[] etcImages;
}
