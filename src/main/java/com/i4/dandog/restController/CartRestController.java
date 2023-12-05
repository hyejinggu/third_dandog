package com.i4.dandog.restController;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.domain.CartDTO;
import com.i4.dandog.entity.Cart;
import com.i4.dandog.service.CartService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/restCart")
@Log4j2
@AllArgsConstructor
public class CartRestController {

	CartService cartService;

	// 장바구니에 상품 추가
	@PostMapping("/addCart")
	public String addToCart(@RequestBody Cart entity) {
	    log.info("================================" + entity.getUser_id() +
	    		entity.getItem_no() + entity.getItem_quantity());
	    cartService.addToCart(entity.getUser_id(), entity.getItem_no(), entity.getItem_quantity());
	    return "redirect:/cart";
	}

	@PostMapping("/add") // URL 패턴 변경
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
	
	
    // 장바구니 목록 조회
    @GetMapping
    public ResponseEntity<List<Cart>> getCartItems(@RequestParam String user_id) {
        List<Cart> cartItems = cartService.getCartItems(user_id);
        return ResponseEntity.ok(cartItems);
    }

}
