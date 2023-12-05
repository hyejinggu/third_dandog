package com.i4.dandog.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor
@AllArgsConstructor
public class CartKeyId implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String user_id;
	private int item_no;

}
