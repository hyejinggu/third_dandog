package com.i4.dandog.repository;

import java.util.List;

import com.i4.dandog.domain.ReviewInfoDTO;
import com.i4.dandog.entity.Item;
import com.i4.dandog.entity.Lounge;

public interface RepositoryCustom {
	List<Lounge> findByLoungeDynamicQuery(String category, String inputValue, String filterValue, String sort);


	// 베스트셀러
	
	public List<Item> getBestSeller(String category);
	
	
	List<ReviewInfoDTO> starFilterWithCategory(double filter, String category);
	List<ReviewInfoDTO> sortWithCategory(String sorting, String category);

}
