package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.entity.Cart;

public interface CartService {
	List<Cart> selectAll();

	Cart save(Cart entity);
}
