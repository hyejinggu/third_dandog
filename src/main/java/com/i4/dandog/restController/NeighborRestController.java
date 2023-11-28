package com.i4.dandog.restController;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
		System.out.println("************** beautyReview");
		return nservice.findByCategory("B");
	}
	@GetMapping("/hospitalReview")
	public List<NeighborhoodReview> hospitalReview() {
		System.out.println("************** hospitalReview");
		return nservice.findByCategory("H");
	}
	@GetMapping("/cafeReview")
	public List<NeighborhoodReview> cafeReview() {
		System.out.println("************** cafeReview");
		return nservice.findByCategory("C");
	}
	@GetMapping("/trainingReview")
	public List<NeighborhoodReview> trainingReview() {
		System.out.println("************** trainingReview");
		return nservice.findByCategory("T");
	}
	
	// createReview
	@PostMapping("/createReview")
	public String createReview(Model model, NeighborhoodReview entity) {
		
		try {
			nservice.save(entity);
			model.addAttribute("message", "상품 등록 성공");
			return "성공!!";
		} catch (Exception e) {
			log.info("insert Exception: " + e.toString());
			model.addAttribute("message", "상품 등록 실패");
			return "실패냐!!";
		}
		
	}

}
