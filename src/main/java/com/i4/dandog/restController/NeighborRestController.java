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

//	@GetMapping("/review")
//	public List<NeighborhoodReview> neighborhoodReview(@RequestParam(name = "category") String category) {
//
//		List<NeighborhoodReview> reviews;
//
//		reviews = nservice.findByCategory(category);
//
//		return reviews;
//	}
	
	
	@GetMapping("/brand")
	public List<NeighborhoodReview> selectedPlaceReview(@RequestParam(name = "selectedPlace") String selectedPlace) {

		List<NeighborhoodReview> reviews;

		reviews = nservice.findBySelectedPlace(selectedPlace);

		return reviews;
	}
	
	
	@GetMapping("/review")
	public List<String> sortAndFilterWithCategory(
			@RequestParam(name = "sorting") String sorting,
			@RequestParam(name = "filter") String filter_,
			@RequestParam(name = "category") String category) {

		List<String> reviews;		
		
		log.info("+++++++++++sorting: " + sorting);
		
		if ("star".equals(sorting)) {
			log.info("이곳은 star 영역");
			double filter = Double.parseDouble(filter_);
			reviews = nservice.starFilterWithCategory(filter, category);
		} else {
			log.info("이곳은 basic, review 영역");
			reviews = nservice.sortWithCategory(sorting, category);
		}
		
		log.info("review!!!!!!!!!!!!!!!!!!!!!!: " + reviews);
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
