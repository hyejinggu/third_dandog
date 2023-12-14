package com.i4.dandog.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.ItemOrder;

public interface ItemOrderRepository extends JpaRepository<ItemOrder , Integer> {
	
	@Transactional
	@Modifying
	@Query("SELECT io FROM ItemOrder io WHERE io.user_id = :user_id")
	List<ItemOrder> selectUserOrder(@Param("user_id") String user_id);
	
	@Query("SELECT io FROM ItemOrder io WHERE io.order_num = :order_num")
	ItemOrder findByOrder_num(@Param("order_num") int order_num);
}