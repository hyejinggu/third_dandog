package com.i4.dandog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.i4.dandog.service.NeighborhoodReviewService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/community")
@Log4j2
@AllArgsConstructor
public class NeighborController {
	
	NeighborhoodReviewService nservice;
	
	
	// ======== 라운지 관리 =======
	@GetMapping("/adminLounge")
	public void adminLounge(Model model) {
	}
	
	
	// ======== 우리 동네 관리 =======
	@GetMapping("/adminNeighbor")
	public void adminNeighbor(Model model) {
		model.addAttribute("NeighborList", nservice.selectList());
	}
	
	
	
	
	
}
