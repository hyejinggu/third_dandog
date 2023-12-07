package com.i4.dandog.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.i4.dandog.service.NeighborhoodReviewService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/community")
@Log4j2
@AllArgsConstructor
public class NeighborController {
	
	NeighborhoodReviewService service;
	
	
	// ======== 우리 동네 관리 =======
	@GetMapping(value = "/neighborList")
	public String getNeighborList(
			@RequestParam(name = "search_category", defaultValue = "all") String searchCategory,
            @RequestParam(name = "search_field", defaultValue = "contents") String searchField,
            @RequestParam(name = "search_value", defaultValue = "") String searchValue,
            Model model) {
		log.info("************************ " +searchField);
	
		if (searchCategory.equals("all")) searchCategory = null;
		if ("id".equals(searchField)) {
			model.addAttribute("neighborList", service.findByCategoryUserId(searchCategory, searchValue));
		} else if("contents".equals(searchField)) {
			model.addAttribute("neighborList", service.findByCategoryLoungeContents(searchCategory, searchValue));			
		} else {
			model.addAttribute("neighborList", service.findByCategoryLoungeBrand(searchCategory, searchValue));	
		}
		
		return "/neighbor/neighborList";
	}
	
	
	
	
	@PostMapping(value = "/deleteNeighbor", consumes = MediaType.APPLICATION_JSON_VALUE)
	public String deleteNeighbor(@RequestBody Map<String, List<String>> requestMap, Model model) {
	    try {
	        List<String> valueArr = requestMap.get("valueArr");
	        if (valueArr != null) {
	        	
	            for (String neighbor : valueArr) {
	                service.delete(Integer.parseInt(neighbor));                
	            }
	            
	            model.addAttribute("message", "선택 게시글 삭제 성공");            
	        } else {
	            model.addAttribute("message", "삭제할 게시글을 선택하세요.");
	        }
			
		} catch (Exception e) {
			log.info("** delete Exception => "+e.toString());
			model.addAttribute("message", "선택 게시글 삭제 실패");
		}
		
	    return "/neighbor/neighborList";
	} // delete
	
	
}
