package com.i4.dandog.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.ItemOrder;

public interface ItemOrderRepository extends JpaRepository<ItemOrder , Integer> {
	
	@Query("select io from ItemOrder io where (:searchDelivery is null or io.order_state = :searchDelivery) and lower(io.user_id) like lower(concat('%', :searchValue, '%')) order by order_num desc")
	Page<ItemOrder> findByDeliveryUserId(@Param("searchDelivery") String searchDelivery,
			@Param("searchValue") String searchValue,
			Pageable pageable);

	@Query("select io from ItemOrder io where (:searchDelivery is null or io.order_state = :searchDelivery) and io.pay_state = :searchValue order by order_num desc")
	Page<ItemOrder> findByDeliveryPayState(@Param("searchDelivery") String searchDelivery,
			@Param("searchValue") String searchValue,
			Pageable pageable);
	
	@Transactional
	@Modifying
	@Query("SELECT io FROM ItemOrder io WHERE io.user_id = :user_id")
	List<ItemOrder> selectUserOrder(@Param("user_id") String user_id);
	
	@Query("SELECT io FROM ItemOrder io WHERE io.order_num = :order_num")
	ItemOrder findByOrder_num(@Param("order_num") int order_num);
	
}