package com.i4.dandog.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.OrderDetail;
import com.i4.dandog.repository.OrderDetailRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class OrderDetailServiceImpl implements OrderDetailService {

    private final OrderDetailRepository orderDetailRepository;

    @Override
    public List<OrderDetail> getAllOrders() {
        return orderDetailRepository.findAll();
    }

    @Override
    public OrderDetail selectOne(int order_detail_no) {
        return orderDetailRepository.findById(order_detail_no).orElse(null);
    }

    @Override
    public void delete(int order_detail_no) {
        orderDetailRepository.deleteById(order_detail_no);
    }
    
    @Override
    public void updateOrderState(int order_detail_no, String order_state) {
        OrderDetail orderDetail = orderDetailRepository.findById(order_detail_no).orElse(null);

        if (orderDetail != null) {
            orderDetail.setOrder_state(order_state);
            orderDetailRepository.save(orderDetail);
        }
    }
}