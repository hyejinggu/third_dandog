package com.i4.dandog.restController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.dao.DataIntegrityViolationException;
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
@RequestMapping("/admin")
@Log4j2
@AllArgsConstructor
public class AdminRestController {
	ItemOrderService ioservice;

    @PostMapping(value = "/orderstatechange")
    public ResponseEntity<?> orderStateChange(@RequestParam int order_num) {
    	String order_state = "배송중";
    	try {
    		ioservice.orderStateChange(order_num, order_state);
    		return ResponseEntity.ok("수정 성공");
		} catch (Exception e) {
			System.out.println("orderStateChange => "+e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("수정실패" + e.toString());
		}
    }
    
    @PostMapping(value = "/paystatechange")
    public ResponseEntity<?> paystatechange(@RequestParam int order_num) {
    	String pay_state = "결제완료";
    	try {
    		ioservice.orderPayChange(order_num, pay_state);
    		return ResponseEntity.ok("수정 성공");
		} catch (Exception e) {
			System.out.println("orderStateChange => "+e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("수정실패" + e.toString());
		}
    }
}
