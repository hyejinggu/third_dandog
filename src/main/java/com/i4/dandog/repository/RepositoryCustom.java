package com.i4.dandog.repository;

import java.util.List;

import com.i4.dandog.entity.Lounge;
import com.i4.dandog.entity.NeighborhoodReview;

public interface RepositoryCustom {
	List<Lounge> findByLoungeDynamicQuery(String category, String inputValue, String filterValue, String sort);

	// public List<String> sortAndFilterWithCategory(String sorting, double filter, String category);
	
	List<String> starFilterWithCategory(double filter, String category);
	List<String> sortWithCategory(String sorting, String category);

}
