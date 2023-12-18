package com.i4.dandog.service;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.i4.dandog.entity.ItemOrder;


public interface ItemOrderService {
	
	// orderlist
	Page<ItemOrder> findByDeliveryUserId(String searchDelivery, String searchValues, Pageable pageable);
	Page<ItemOrder> findByDeliveryPayState(String searchDelivery, String searchValues, Pageable pageable);
//    List<OrderDetail> getAllOrders();
//    
//    OrderDetail selectOne(int order_detail_no);
//    
    void delete(int order_num);
//    
//    void updateOrderState(int order_detail_no, String order_state);
    
int save(ItemOrder entity);
	
List<ItemOrder> getOrderInquiryForUser(String user_id);

void updateOrderState(int order_num, String order_state);





//*-------------------------------관리자--------------------------------*


List<ItemOrder> getAllOrders();

void orderStateChange(int order_num, String order_state);

void orderPayChange(int order_num, String pay_state);

}