package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.entity.Item;

public interface ItemService {

	// selectList
	List<Item> selectList(String searchCategory, String searchField, String searchValues);

	
	// selectOne
	Item selectOne(int item_no);
	
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
