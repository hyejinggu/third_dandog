package com.i4.dandog.service;

import java.util.List;

import javax.transaction.Transactional;

import com.i4.dandog.entity.ItemInfoImage;

public interface ItemInfoImageService {

	// selectList
	List<ItemInfoImage> selectList();
	
	// selectOne
	ItemInfoImage selectOne(int item_no);
	
	// insert, update
	int save(ItemInfoImage entity);
	
	// delete
	int delete(int item_no);
	
	
	// findByItem_no
	@Transactional
	List<ItemInfoImage> findByItemNo(int item_no);
}
