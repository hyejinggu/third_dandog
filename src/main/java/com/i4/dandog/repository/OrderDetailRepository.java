package com.i4.dandog.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
	
	@Transactional
	@Modifying
	@Query("SELECT od FROM OrderDetail od WHERE od.order_num = :order_num")
	List<OrderDetail> selectUserOrderDetails(@Param("order_num") int order_num);
}