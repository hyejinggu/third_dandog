package com.i4.dandog.restController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.entity.Item;
import com.i4.dandog.service.ItemService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/item")
@Log4j2
@AllArgsConstructor
public class ItemRestController {

	ItemService service;

	
	// ======== 상품 리스트 =======
	@GetMapping("/getItemList")
	public List<Item> itemList(@RequestParam(name = "sort") String sort, 
			@RequestParam(name = "inputValue") String inputValue, 
			@RequestParam(name = "category") String category) {
	    
		List<Item> itemList; 

	    switch (sort) {
	        case "popular":
	            itemList = service.findByOrderByItemSalesVolumeDesc(inputValue, category);
	            break;
	        case "high":
	            itemList = service.findByOrderByItemPriceDesc(inputValue, category);
	            break;
	        case "low":
	            itemList = service.findByOrderByItemPriceAsc(inputValue, category);
	            break;
	        case "new":
	            itemList = service.findByOrderByRegdate(inputValue, category);
	            break;
	        default:
	        	itemList = service.findByOrderByRegdate(inputValue, category);
	    }
	    
	    return itemList;
	}
	
	@GetMapping("/getColorSize")
	public Map<String, List<String>> getColorSize(@RequestParam(name = "item_name") String item_name) {
	    
		List<String> colors = service.findColors(item_name);
		List<String> sizes = service.findSizes(item_name);


	    Map<String, List<String>> result = new HashMap<>();
	    result.put("Color", new ArrayList<>(new HashSet<>(colors)));
	    result.put("Size", new ArrayList<>(new HashSet<>(sizes)));

	    // **********{Color=[Black, White], Size=[S, M]}
	    
	    return result;
	}
	
	@GetMapping("/bestseller")
	public List<Item> getBestSeller(@RequestParam(name = "category") String category) {
	    
		List<Item> result = service.getBestSeller(category);
		log.info("result ============================: " + result);
	    
	    return result;
	}
	
	
	


}
