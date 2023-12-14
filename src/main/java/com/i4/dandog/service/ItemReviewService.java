package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.entity.ItemReview;

public interface ItemReviewService {
	
	// insert
	int save(ItemReview entity);
	
	// selectOne
	List<ItemReview> selectOne(String item_name);
	
//	// delete
//	int delete(int item_no);
	
}
