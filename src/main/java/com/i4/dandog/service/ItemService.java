package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.entity.Item;

public interface ItemService {

	// selectList
	List<Item> selectList();
	
	// selectOne
	Item selectOne(int item_no);
	
	// insert
	int save(Item entity);
	
	// delete
	int delete(int item_no);
	
	List<Item> itemListSortedByPopular();
	List<Item> itemListSortedByHigh();
	List<Item> itemListSortedByLow();
	List<Item> itemListSortedByNew();
	
}
