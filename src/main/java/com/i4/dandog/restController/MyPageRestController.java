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

import com.i4.dandog.entity.ItemOrder;
import com.i4.dandog.entity.Member;
import com.i4.dandog.entity.ShippingAddress;
import com.i4.dandog.service.ItemOrderService;
import com.i4.dandog.service.MemberService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/mypage")
@Log4j2
@AllArgsConstructor
public class MyPageRestController {
	ItemOrderService ioservice;

	@GetMapping("/getorderinquiry")
	public ResponseEntity<List<ItemOrder>> getOrderInquiryForUser(@RequestParam String user_id) {
		List<ItemOrder> iorder = ioservice.getOrderInquiryForUser(user_id);
		return ResponseEntity.ok(iorder);
	}
	
}
