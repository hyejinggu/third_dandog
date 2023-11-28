package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.entity.NeighborhoodReview;

public interface NeighborhoodReviewService {

	// selectList
	List<NeighborhoodReview> selectList();
	
	// selectOne
	NeighborhoodReview selectOne(int neighbor_no);
	
	// insert
	int save(NeighborhoodReview entity);
	
	// delete
	int delete(int neighbor_no);
	
}
