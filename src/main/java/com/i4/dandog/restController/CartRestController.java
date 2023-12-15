package com.i4.dandog.restController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.domain.CartDTO;
import com.i4.dandog.entity.Cart;
import com.i4.dandog.entity.CartKeyId;
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

	 // 장바구니 아이템 삭제
    @DeleteMapping("/deleteCartItem/{user_id}/{item_no}")
    public ResponseEntity<String> deleteCartItem(@PathVariable String user_id, @PathVariable int item_no) {
        try {
            CartKeyId keyId = new CartKeyId(user_id, item_no);
            cartService.delete(keyId);
            return ResponseEntity.ok("장바구니에서 상품이 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("장바구니 삭제 실패");
        }
    }

	
	
	// 장바구니에 상품 추가
	@PostMapping("/addCart/{loginId}/{itemName}/{selectedSize}/{selectedColor}/{itemQuantity}")
	public String addToCart(
			@PathVariable String loginId,
	        @PathVariable String itemName,
	        @PathVariable String selectedSize,
	        @PathVariable String selectedColor,
	        @PathVariable int itemQuantity
	) {
		int itemNoToUpdate = itemService.updateOption(itemName, selectedColor, selectedSize);
		cartService.addToCart(loginId, itemNoToUpdate, itemQuantity);
		return "redirect:/cart";
	}

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

	// 장바구니 목록 조회
    @GetMapping("/getCartItems/{user_id}")
    public ResponseEntity<List<CartDTO>> getCartItems(@PathVariable String user_id) {
        List<CartDTO> cartItems = cartService.getCartItems(user_id);

        return ResponseEntity.ok(cartItems);
    }

    private Item getItemInfo(int item_no) {
        try {
            return itemService.selectOne(item_no);
        } catch (Exception e) {
            log.error("Error while fetching item information", e);
            return new Item(); // 에러 시 가상의 Item 반환
        }
    }
    
    
    // 장바구니 옵션 업데이트
    @PostMapping("/updateColorSize/{loginId}/{itemNo}/{itemName}/{selectedColor}/{selectedSize}")
    public ResponseEntity<Integer> updateColorSize(	
    	@PathVariable String loginId,
    	@PathVariable String itemNo,
        @PathVariable String itemName,
        @PathVariable String selectedColor,
        @PathVariable String selectedSize
    ) {
        int originalItemNo = Integer.parseInt(itemNo);
        
    	int itemNoToUpdate = itemService.updateOption(itemName, selectedColor, selectedSize);
    
    	cartService.updateOption(loginId, originalItemNo, itemNoToUpdate);

        return ResponseEntity.ok(itemNoToUpdate);
    }
    
    
    
    
    // 장바구니 아이템 수량 업데이트 엔드포인트
    @PostMapping("/onIncrease/{user_id}/{item_no}/{item_quantity}")
    public ResponseEntity<CartDTO> onIncrease(
            @PathVariable String user_id,
            @PathVariable int item_no,
            @PathVariable int item_quantity) {
        try {
            CartDTO updatedItem = cartService.onIncrease(user_id, item_no, item_quantity);

            if (updatedItem != null) {
                return new ResponseEntity<>(updatedItem, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @PostMapping("/onDecrease/{user_id}/{item_no}/{item_quantity}")
    public ResponseEntity<CartDTO> onDecrease(
            @PathVariable String user_id,
            @PathVariable int item_no,
            @PathVariable int item_quantity) {
        try {
            CartDTO updatedItem = cartService.onDecrease(user_id, item_no, item_quantity);

            if (updatedItem != null) {
                return new ResponseEntity<>(updatedItem, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
