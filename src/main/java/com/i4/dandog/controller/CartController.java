package com.i4.dandog.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.i4.dandog.entity.Cart;
import com.i4.dandog.service.CartService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/cart")
@Log4j2 // @Log4j -> Boot 에서는 2015년 이후 지원중단
@AllArgsConstructor
public class CartController {
	CartService service;

	@GetMapping
	public String viewCart(@RequestParam String user_id, Model model) {
		List<Cart> cartItems = service.getCartItems(user_id);
		model.addAttribute("cartItems", cartItems);
		return "cart";
	}


}
