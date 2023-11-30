package com.i4.dandog.controller;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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

	@PostMapping(value = "/add")
	public String addCart(Model model, Cart entity, RedirectAttributes redirectAttributes) {
		try {
			// 장바구니 담기 성공 시 서비스를 통해 저장하고 로그에 기록
			log.info("장바구니 담기 성공! 사용자 ID: {}", service.save(entity));

			// 플래시 속성을 사용하여 리다이렉트 후 메시지 전달
			redirectAttributes.addFlashAttribute("message", "상품 담기 성공");
		} catch (DataIntegrityViolationException e) {
			// 데이터베이스 제약조건 위반 등 특정 예외 처리
			log.error("장바구니 담기 중 오류 발생. 데이터베이스 제약조건 위반", e);

			// 데이터베이스 제약조건 위반인 경우에 따라 다른 메시지 설정
			if (e.getMessage().contains("unique_constraint_name")) {
				redirectAttributes.addFlashAttribute("message", "상품 담기 실패: 이미 장바구니에 있는 상품");
			} else if (e.getMessage().contains("not_null_constraint_name")) {
				redirectAttributes.addFlashAttribute("message", "상품 담기 실패: 필수 정보가 누락됨");
			} else {
				redirectAttributes.addFlashAttribute("message", "상품 담기 실패: 중복 상품 또는 잘못된 값");
			}
		} catch (Exception e) {
			// 기타 오류 처리
			log.error("장바구니 담기 중 오류 발생", e);
			redirectAttributes.addFlashAttribute("message", "상품 담기 실패");
		}

		// 양식 제출 후 홈페이지로 리다이렉트
		return "redirect:/";
	}
}
