package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.entity.Item;

public interface ItemService {

	// selectList
	List<Item> selectList();
	
	// insert
	int save(Item entity);
}
