package com.i4.dandog.service;


import java.util.List;

import com.i4.dandog.entity.ItemOrder;

public interface ItemOrderService {
//    List<OrderDetail> getAllOrders();
//    
//    OrderDetail selectOne(int order_detail_no);
//    
//    void delete(int order_detail_no);
//    
//    void updateOrderState(int order_detail_no, String order_state);
    
int save(ItemOrder entity);
	
List<ItemOrder> getOrderInquiryForUser(String user_id);

}