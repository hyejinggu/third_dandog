package com.i4.dandog.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.i4.dandog.entity.Item;

public interface ItemService {

	// selectList
	Page<Item> findByCategoryItemNo(String searchCategory, int searchValues, Pageable pageable);
	Page<Item> findByCategoryAndItemName(String searchCategory, String searchValues, Pageable pageable);

	
	// selectOne
	Item selectOne(int item_no);
	int updateOption(String itemName, String selectedColor, String selectedSize);
	
	// insert
	int save(Item entity);
	
	// delete
	int delete(int item_no);
	
	List<Item> findByOrderByItemSalesVolumeDesc(String inputValue, String category);
	List<Item> findByOrderByItemPriceDesc(String inputValue, String category);
	List<Item> findByOrderByItemPriceAsc(String inputValue, String category);
	List<Item> findByOrderByRegdate(String inputValue, String category);
	
	
	List<String> findSizes(String item_name);
	List<String> findColors(String item_name);
	
	
}
