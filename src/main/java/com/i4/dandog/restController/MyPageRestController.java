package com.i4.dandog.restController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.entity.Item;
import com.i4.dandog.entity.ItemOrder;
import com.i4.dandog.entity.ItemReview;
import com.i4.dandog.entity.Member;
import com.i4.dandog.entity.OrderDetail;
import com.i4.dandog.entity.ShippingAddress;
import com.i4.dandog.service.ItemOrderService;
import com.i4.dandog.service.ItemReviewService;
import com.i4.dandog.service.ItemService;
import com.i4.dandog.service.MemberService;
import com.i4.dandog.service.OrderDetailService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/mypage")
@Log4j2
@AllArgsConstructor
public class MyPageRestController {
	ItemOrderService ioservice;
	OrderDetailService odservice;
	ItemService iservice;
	ItemReviewService irservice;

	@GetMapping("/getorderinquiry")
	public ResponseEntity<List<ItemOrder>> getOrderInquiryForUser(@RequestParam String user_id) {
		List<ItemOrder> iOrder = ioservice.getOrderInquiryForUser(user_id);
		return ResponseEntity.ok(iOrder);
	}
	
	@GetMapping("/getorderdetail")
	public ResponseEntity<List<OrderDetail>> getOrderDetailForUser(@RequestParam int order_num) {
		List<OrderDetail> oDetail = odservice.getOrderDetailForUser(order_num);
		return ResponseEntity.ok(oDetail);
	}
	
	@PostMapping("/OrderStateChange")
	public ResponseEntity<String> updateOrderState(@RequestBody ItemOrder itemOder) {

	    try {
	        // 주소 업데이트 메서드 호출
	    	ioservice.updateOrderState(itemOder.getOrder_num(), itemOder.getOrder_state());
	        return ResponseEntity.ok("배송상태가 성공적으로 변경되었습니다.");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("배송상태 업데이트 중 오류 발생: " + e.getMessage());
	    }
	}
	
	@GetMapping("/getitem")
	public Item getItem(@RequestParam int item_no) {
		return iservice.selectOne(item_no);
	}
	
	@PostMapping("/createReview")
	public int createReview(ItemReview entity) {
		return irservice.save(entity);
	}
}
