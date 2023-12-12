package com.i4.dandog.restController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.entity.Item;
import com.i4.dandog.entity.Lounge;
import com.i4.dandog.entity.NeighborhoodReview;
import com.i4.dandog.service.ItemService;
import com.i4.dandog.service.LoungeService;
import com.i4.dandog.service.NeighborhoodReviewService;
import com.i4.dandog.service.QnaService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/searchall")
@Log4j2
@AllArgsConstructor
public class SearchRestController {

	ItemService iService;
	LoungeService lService;
	NeighborhoodReviewService rService;
	QnaService qService;
//	NoticeService nService;

	 // 전체 검색
	@GetMapping("/{searchValue}")
	public ResponseEntity<Map<String, List<? extends Object>>> searchAll(@PathVariable String searchValue) {
	    try {
	    	log.info("searchValue: " + searchValue);
	        Page<Item> searchedItems = iService.findByCategoryAndItemName(null, searchValue, null);
	        List<Lounge> searchedLounges = lService.findByCategoryLoungeContents(null, searchValue);
	        
	        Map<String, List<? extends Object>> result = new HashMap<>();
	        result.put("items", searchedItems.getContent());
	        result.put("lounges", searchedLounges);

	        return ResponseEntity.ok(result);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}
	
	
	@GetMapping("/myposting/{user_id}")
	public ResponseEntity<Map<String, List<? extends Object>>> searchMyPosting(@PathVariable String user_id) {
	    try {
	    	log.info("user_id: " + user_id);
	        List<Lounge> searchedLounges = lService.findByCategoryUserId(null, user_id);
	        List<NeighborhoodReview> searchedNeighbors = rService.findByCategoryUserId(null, user_id);
	        
	        Map<String, List<? extends Object>> result = new HashMap<>();
	        result.put("lounges", searchedLounges);
	        result.put("neighbors", searchedNeighbors);

	        return ResponseEntity.ok(result);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}



}
