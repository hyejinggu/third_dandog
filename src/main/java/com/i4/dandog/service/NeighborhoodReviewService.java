package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.entity.NeighborhoodReview;

public interface NeighborhoodReviewService {

	// selectList
	List<NeighborhoodReview> selectList();
	
	List<NeighborhoodReview> findByCategory(String neighbor_category);
	
	// 관리자 검색
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
