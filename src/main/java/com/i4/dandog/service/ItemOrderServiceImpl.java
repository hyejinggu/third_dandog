package com.i4.dandog.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.i4.dandog.entity.ItemOrder;
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
//    public OrderDetail selectOne(int order_detail_no) {
//        return orderDetailRepository.findById(order_detail_no).orElse(null);
//    }
//
    @Override
    public void delete(int order_num) {
    	repository.deleteById(order_num);
    }
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
	
	//*-------------------------------관리자--------------------------------*

	  @Override
	  public List<ItemOrder> getAllOrders() {
	      return repository.findAll();
	  }
	  
	    @Override
	    public Page<ItemOrder> findByDeliveryUserId(String searchDelivery, String searchValue, Pageable pageable) {
	        String query = "select io from ItemOrder io where (:searchDelivery is null or io.order_state = :searchDelivery) and lower(io.user_id) like lower(concat('%', :searchValue, '%')) order by order_num desc";
	        log.info("findByDeliveryUserId query: {}", query);
	        try {
	            return repository.findByDeliveryUserId(searchDelivery, searchValue, pageable);
	        } catch (Exception e) {
	            log.error("Error in findByDeliveryUserId", e);
	            throw e; // 예외가 발생하면 적절한 처리를 수행하세요.
	        }
	    }

	    @Override
	    public Page<ItemOrder> findByDeliveryPayState(String searchDelivery, String searchValue, Pageable pageable) {
	        String query = "select io from ItemOrder io where (:searchDelivery is null or io.order_state = :searchDelivery) and io.pay_state = :searchValue order by order_num desc";
	        log.info("findByDeliveryPayState query: {}", query);
	        try {
	            return repository.findByDeliveryPayState(searchDelivery, searchValue, pageable);
	        } catch (Exception e) {
	            log.error("Error in findByDeliveryPayState", e);
	            throw e; // 예외가 발생하면 적절한 처리를 수행하세요.
	        }
	    }
}
