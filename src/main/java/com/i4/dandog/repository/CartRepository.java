package com.i4.dandog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.i4.dandog.entity.Cart;
import com.i4.dandog.entity.CartKeyId;


public interface CartRepository extends JpaRepository<Cart, CartKeyId> {
	@Modifying 
	@Transactional
	@Query( nativeQuery=true,
			value = "insert into cart VALUES (:user_id, :item_no, :item_quantity)"
				 + " ON DUPLICATE KEY UPDATE item_quantity = item_quantity+:item_quantity")
	void dupUpdateQuantity(@Param("user_id") String user_id, @Param("item_no") int item_no, @Param("item_quantity") int item_quantity);
}

