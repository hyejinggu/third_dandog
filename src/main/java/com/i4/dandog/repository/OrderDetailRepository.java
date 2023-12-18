package com.i4.dandog.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.ItemOrder;
import com.i4.dandog.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
	
	@Transactional
	@Modifying
	@Query("SELECT od FROM OrderDetail od WHERE od.order_num = :order_num")
	List<OrderDetail> selectUserOrderDetails(@Param("order_num") int order_num);
	
	@Query("SELECT od FROM OrderDetail od WHERE od.order_num = :order_num AND od.item_no = :item_no")
	OrderDetail findByOrder_num(@Param("order_num") int order_num, @Param("item_no") int item_no);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM OrderDetail od WHERE od.order_num = :order_num")
	void deleteByOrderNum(@Param("order_num")int order_num);
	
	@Query("SELECT od FROM OrderDetail od WHERE od.order_num = :order_num")
	List<OrderDetail> findByOrderNum(@Param("order_num") int order_num);
}