package com.i4.dandog.restController;


import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.entity.Cart;
import com.i4.dandog.service.CartService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/cart")
@Log4j2
@AllArgsConstructor
public class CartRestController {

	CartService cartService;

	@PostMapping("/add")
	public String save(Model model, @RequestBody Cart entity) {

		try {
			cartService.save(entity);
			model.addAttribute("message", "상품 등록 성공");
			System.out.println("성공 => " + entity);
			return "성공!!";
		} catch (Exception e) {
			log.info("insert Exception: " + e.toString());
			model.addAttribute("message", "상품 등록 실패");
			System.out.println("실패 => " + entity);
			return "실패냐!!";
		}

	}

}
