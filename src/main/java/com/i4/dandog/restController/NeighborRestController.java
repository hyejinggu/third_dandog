package com.i4.dandog.restController;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.domain.ReviewInfoDTO;
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

	
	@GetMapping("/brand")
	public List<NeighborhoodReview> selectedPlaceReview(@RequestParam(name = "selectedPlace") String selectedPlace) {

		List<NeighborhoodReview> reviews;

		reviews = nservice.findBySelectedPlace(selectedPlace);

		return reviews;
	}
	
	
	@GetMapping("/review")
	public List<ReviewInfoDTO> sortAndFilterWithCategory(
			@RequestParam(name = "sorting") String sorting,
			@RequestParam(name = "filter") String filter_,
			@RequestParam(name = "category") String category) {

		List<ReviewInfoDTO> reviews;		
		
		if ("star".equals(sorting)) {
			double filter = Double.parseDouble(filter_);
			reviews = nservice.starFilterWithCategory(filter, category);
		} else {
			reviews = nservice.sortWithCategory(sorting, category);
		}
		
		return reviews;
	}
	
	
	@GetMapping("/reviewDetails")
	public List<NeighborhoodReview> findReviewByBrand(
			@RequestParam(name = "neighborBrandName") String neighborBrandName) {

		List<NeighborhoodReview> reviews;		
		reviews = nservice.findReviewByBrand(neighborBrandName);
		
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
			model.addAttribute("message", "상품 등록 실패");
			return "실패냐!!";
		}

	}

}
