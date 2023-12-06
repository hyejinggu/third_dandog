package com.i4.dandog.restController;

import java.util.List;

import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.entity.Member;
import com.i4.dandog.entity.ShippingAddress;
import com.i4.dandog.repository.ShippingAddressRepository;
import com.i4.dandog.service.MemberService;
import com.i4.dandog.service.ShippingAddressService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/payment")
@Log4j2
@AllArgsConstructor
public class PaymentRestController {

	ShippingAddressRepository addressRepository;
	ShippingAddressService service;
	MemberService mservice;

	@GetMapping("/getAddress")
	public ResponseEntity<List<ShippingAddress>> getAddressForUser(@RequestParam String user_id) {
		List<ShippingAddress> addresses = service.getAddressForUser(user_id);
		return ResponseEntity.ok(addresses);
	}

	@GetMapping("/getuserinfo")
	public ResponseEntity<List<Member>> getuserinfoForUser(@RequestParam String user_id) {
		List<Member> userinfo = mservice.getuserinfoForUser(user_id);
		return ResponseEntity.ok(userinfo);
	}

	@PostMapping("/addNewAddress")
	public String addNewAddress(@RequestBody ShippingAddress entity) {
		service.addNewAddress(
				entity.getUser_id(),
				entity.getRecipient_name(),
				entity.getRecipient_phone(),
				entity.getPost_code(),
				entity.getUser_address1(),
				entity.getUser_address2());
		return "redirect:/payment";
	}

}
