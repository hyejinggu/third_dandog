package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.domain.ReviewInfoDTO;
import com.i4.dandog.entity.NeighborhoodReview;

public interface NeighborhoodReviewService {

	// selectList
	List<NeighborhoodReview> selectList();
	
	// 카카오맵에서 선택된 장소 찾기
	List<NeighborhoodReview> findBySelectedPlace(String selectedPlace);
	
	// 상호명별 리뷰 찾기
	List<NeighborhoodReview> findReviewByBrand(String neighborBrandName);
	
	
	// 정렬, 필터
	List<ReviewInfoDTO> starFilterWithCategory(double filter, String category);
	List<ReviewInfoDTO> sortWithCategory(String sorting, String category);
	
	
	
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
