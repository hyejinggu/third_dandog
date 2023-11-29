package com.i4.dandog.restController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.service.NeighborhoodReviewService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/agree")
@Log4j2
@AllArgsConstructor
public class JoinAgreeRestController {
	
	@GetMapping("/test")
	public String test() {
		log.info("React Connect Test 중");
		return "Spring Boot & React 안농~~!";
	}
	
}
