package com.i4.dandog.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.entity.NeighborhoodReview;
import com.i4.dandog.service.NeighborhoodReviewService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/neighbor")
@Log4j2
@AllArgsConstructor
public class NeighborRestController {

	NeighborhoodReviewService nservice;

	
	@GetMapping("/test")
	public String test() {
		log.info("React Connect Test 중");
		return "Spring Boot & React 안농~~!";
	}
	
	

	// ======== 우리 동네 관리 =======
	@GetMapping("/beautyReview")
	public List<NeighborhoodReview> beautyReview() {
		return nservice.findByCategory("B");
		
	}

}
