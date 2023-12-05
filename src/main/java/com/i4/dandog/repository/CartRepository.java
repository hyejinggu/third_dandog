package com.i4.dandog.repository;

import java.util.List;

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
	
	
	 @Query("SELECT new com.i4.dandog.domain.CartDTO(c.user_id, c.item_no, c.item_quantity, i.item_img1, i.item_name, i.item_desc) "
	            + "FROM com.i4.dandog.entity.Cart c JOIN com.i4.dandog.entity.Item i ON c.item_no = i.item_no "
	            + "WHERE c.user_id = :user_id ORDER BY c.item_no")
	    List<Cart> findByUser_id(String user_id);

}

