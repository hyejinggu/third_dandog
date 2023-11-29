package com.i4.dandog.restController;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	public List<NeighborhoodReview> neighborhoodReview(@RequestParam(name = "category") String category) {
	    System.out.println("************** " + category + "Review");

	    List<NeighborhoodReview> reviews;
	    
	    switch (category) {
	        case "B":
	            reviews = nservice.findByCategory("B");
	            break;
	        case "H":
	            reviews = nservice.findByCategory("H");
	            break;
	        case "C":
	            reviews = nservice.findByCategory("C");
	            break;
	        case "T":
	            reviews = nservice.findByCategory("T");
	            break;
	        default:
	            reviews = nservice.findByCategory("B");
	    }

	    return reviews;
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
