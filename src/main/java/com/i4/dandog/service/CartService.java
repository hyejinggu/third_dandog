package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.domain.CartDTO;
import com.i4.dandog.entity.Cart;
import com.i4.dandog.entity.CartKeyId;

public interface CartService {
	
	// selectList
	List<Cart> selectAll();

	// selectOne
	Cart selectOne(CartKeyId keyId);

	// insert
	void save(Cart entity);

	// DUPLICATE KEY UPDATE 구문 (insert 대신 사용 가능)
	CartDTO onIncrease(String user_id, int item_no, int item_quantity);
	CartDTO onDecrease(String user_id, int item_no, int item_quantity);
	
	// delete
	void delete(CartKeyId keyId);

	List<CartDTO> getCartItems(String user_id);

	void addToCart(String user_id, int item_no, int item_quantity);
	

}
