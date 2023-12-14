package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.ItemOrder;
import com.i4.dandog.entity.Member;
import com.i4.dandog.repository.ItemOrderRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class ItemOrderServiceImpl implements ItemOrderService {

	private final ItemOrderRepository repository;
//
//    @Override
//    public List<OrderDetail> getAllOrders() {
//        return orderDetailRepository.findAll();
//    }
//
//    @Override
//    public OrderDetail selectOne(int order_detail_no) {
//        return orderDetailRepository.findById(order_detail_no).orElse(null);
//    }
//
//    @Override
//    public void delete(int order_detail_no) {
//        orderDetailRepository.deleteById(order_detail_no);
//    }
//    
//    @Override
//    public void updateOrderState(int order_detail_no, String order_state) {
//        OrderDetail orderDetail = orderDetailRepository.findById(order_detail_no).orElse(null);
//
//        if (orderDetail != null) {
//            orderDetail.setOrder_state(order_state);
//            orderDetailRepository.save(orderDetail);
//        }
//    }

	@Override
	public int save(ItemOrder entity) {
		repository.save(entity);
		return entity.getOrder_num();
	}

	@Override
	public List<ItemOrder> getOrderInquiryForUser(String user_id) {
		List<ItemOrder> userOrders = repository.selectUserOrder(user_id);

		return userOrders;
	}
	
	@Override
	public void updateOrderState(int order_num, String newOrderState) {
	    ItemOrder itemOrder = repository.findByOrder_num(order_num);

	        // 주문 상태 변경
	    	itemOrder.setOrder_state(newOrderState);

	        // 변경된 주문 정보 저장
	        repository.save(itemOrder);
	}
}
