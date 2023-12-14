package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.entity.NeighborhoodReview;

public interface NeighborhoodReviewService {

	// selectList
	List<NeighborhoodReview> selectList();
	
	List<NeighborhoodReview> findBySelectedPlace(String selectedPlace);
	
	// 정렬, 필터
//	List<String> sortAndFilterWithCategory(String sorting, 
//			String filter, String neighbor_category);
	List<String> starFilterWithCategory(double filter, String category);
	List<String> sortWithCategory(String sorting, String category);
	
	
	
	// ======== 관리자 검색
	List<NeighborhoodReview> findByCategoryUserId(String searchCategory, String searchValue);
	List<NeighborhoodReview> findByCategoryLoungeContents(String searchCategory, String searchValue);
	List<NeighborhoodReview> findByCategoryLoungeBrand(String searchCategory, String searchValue);
	
	
	
	
	// selectOne
	NeighborhoodReview selectOne(int neighbor_no);
	
	// insert
	int save(NeighborhoodReview entity);
	
	// delete
	int delete(int neighbor_no);
	
}
