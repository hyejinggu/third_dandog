package com.i4.dandog.restController;

import java.util.ArrayList;
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
import com.i4.dandog.entity.Item;
import com.i4.dandog.service.CartService;
import com.i4.dandog.service.ItemService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/restCart")
@Log4j2
@AllArgsConstructor
public class CartRestController {

	CartService cartService;
	ItemService itemService;

	// 장바구니에 상품 추가
	@PostMapping("/addCart")
	public String addToCart(@RequestBody Cart entity) {
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
    @GetMapping("/getCartItems/{user_id}")
    public ResponseEntity<List<CartDTO>> getCartItems(@PathVariable String user_id) {
    	log.info("*********************************" + user_id);
        List<CartDTO> cartItems = cartService.getCartItems(user_id);
        List<CartDTO> cartDTOs = new ArrayList<>();

        log.info("=========================================="+cartService.getCartItems(user_id));
        for (CartDTO cartItem : cartItems) {
            Item item = getItemInfo(cartItem.getItem_no());

            CartDTO cartDTO = new CartDTO(
                cartItem.getUser_id(),
                cartItem.getItem_no(),
                cartItem.getItem_quantity(),
                item.getItem_img1(),
                item.getItem_name(),
                item.getItem_desc()
            );
            cartDTOs.add(cartDTO);
        }

        return ResponseEntity.ok(cartDTOs);
    }

    private Item getItemInfo(int item_no) {
        // ItemService를 사용하여 해당 item_no에 해당하는 Item 정보를 가져오는 메서드
        try {
            return itemService.selectOne(item_no);
        } catch (Exception e) {
            // 예외 처리 로직 추가
            log.error("Error while fetching item information", e);
            return new Item(); // 에러 시 가상의 Item 반환
        }
    }

}
