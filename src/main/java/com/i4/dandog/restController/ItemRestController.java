package com.i4.dandog.restController;

import java.util.List;

import org.springframework.ui.Model;
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
	@GetMapping("/sortedList")
	public List<Item> itemList(@RequestParam(name = "sort") String sort, Model model) {
	    
		List<Item> itemList;

	    switch (sort) {
	        case "popular":
	            itemList = service.findByOrderByItemSalesVolumeDesc();
	            break;
	        case "high":
	            itemList = service.findByOrderByItemPriceDesc();
	            break;
	        case "low":
	            itemList = service.findByOrderByItemPriceAsc();
	            break;
	        case "new":
	            itemList = service.findByOrderByRegdate();
	            break;
	        default:
	            itemList = service.selectList();
	    }

	    return itemList;
	}


}
