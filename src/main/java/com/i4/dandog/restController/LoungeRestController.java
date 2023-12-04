package com.i4.dandog.restController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.entity.Lounge;
import com.i4.dandog.service.LoungeService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/lounge")
@Log4j2
@AllArgsConstructor
public class LoungeRestController {

	LoungeService service;	
	
	@GetMapping("/allLoungeList")
	public List<Lounge> allLoungeList() {

	    return service.getAllLounge();
	}

	
	
	// createReview
//	@PostMapping("/createReview")
//	public String createReview(Model model, NeighborhoodReview entity) {
//		
//		try {
//			nservice.save(entity);
//			model.addAttribute("message", "상품 등록 성공");
//			return "성공!!";
//		} catch (Exception e) {
//			log.info("insert Exception: " + e.toString());
//			model.addAttribute("message", "상품 등록 실패");
//			return "실패냐!!";
//		}
//		
//	}

}
