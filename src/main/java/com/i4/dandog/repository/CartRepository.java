package com.i4.dandog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.i4.dandog.entity.Cart;


public interface CartRepository extends JpaRepository<Cart, String> {
	
}

