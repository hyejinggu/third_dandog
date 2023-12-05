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

import com.i4.dandog.domain.CartDTO;
import com.i4.dandog.entity.Cart;
import com.i4.dandog.service.CartService;

import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/cart")
@AllArgsConstructor
public class CartController {
	CartService service;

	@GetMapping
	public String viewCart(@RequestParam String user_id, Model model) {
		List<CartDTO> cartItems = service.getCartItems(user_id);
		model.addAttribute("cartItems", cartItems);
		return "cart";
	}


}
