package com.i4.dandog.domain;


import java.util.List;

import com.i4.dandog.entity.ItemOrder;
import com.i4.dandog.entity.OrderDetail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetailDTO {
	
	private ItemOrder itemOrder;
	private List<OrderDetail> orderDetail;
	private int point;
	
	
}
