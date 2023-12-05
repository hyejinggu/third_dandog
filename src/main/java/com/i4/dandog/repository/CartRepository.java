package com.i4.dandog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.i4.dandog.domain.CartDTO;
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
	            + "FROM Cart c JOIN Item i ON c.item_no = i.item_no AND c.user_id = :user_id "
	            + "ORDER BY c.item_no")
	    List<CartDTO> findByUser_id(@Param("user_id") String user_id);
	 
	   // 장바구니 + 상품 Join
//	   @Query("SELECT new com.ojo.ojoa.domain.CartProdDTO(c.cart_num, c.id, c.prod_num, c.quantity, p.prod_mainimage, p.prod_name, p.prod_content) "
//	      + "FROM Cart c LEFT JOIN Product p ON c.prod_num=p.prod_num order by c.prod_num")
//	   List<CartProdDTO> findCartProd();


}

