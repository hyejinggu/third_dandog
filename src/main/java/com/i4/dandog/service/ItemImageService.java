package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.entity.ItemImage;

public interface ItemImageService {

	// selectList
	List<ItemImage> selectList();
	
	// selectOne
	ItemImage selectOne(int item_no);
	
	// insert
	int save(ItemImage entity);
	
	// delete
	int delete(int item_no);
	
}
