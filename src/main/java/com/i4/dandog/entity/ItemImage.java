package com.i4.dandog.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "item_image")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemImage {
	@Id
	private int item_no;
	
	private String item_img;

}
