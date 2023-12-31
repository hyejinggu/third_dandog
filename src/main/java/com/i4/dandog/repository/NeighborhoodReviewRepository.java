package com.i4.dandog.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.NeighborhoodReview;

public interface NeighborhoodReviewRepository extends JpaRepository<NeighborhoodReview, Integer> {
	
	// 카카오맵에서 선택된 장소 찾기
	@Query("select r from NeighborhoodReview r where neighbor_brand_name = :selectedPlace")
	public List<NeighborhoodReview> findBySelectedPlace(@Param("selectedPlace") String selectedPlace);
	
	
	// 상호명별 리뷰 찾기
	@Query("select r from NeighborhoodReview r where neighbor_brand_name = :neighborBrandName")
	public List<NeighborhoodReview> findReviewByBrand(@Param("neighborBrandName") String neighborBrandName);
	
	
	
	// ======== 관리자
	@Query("select n from NeighborhoodReview n where (:searchCategory is null or n.neighbor_category = :searchCategory) "
			+ "and (LOWER(n.user_id) LIKE LOWER(concat('%', :searchValue, '%'))) order by n.neighbor_no desc")
	public Page<NeighborhoodReview> findByCategoryUserId(
			@Param("searchCategory") String searchCategory,
			@Param("searchValue") String searchValue,
			Pageable pageable);
	
	@Query("SELECT n FROM NeighborhoodReview n WHERE " + "(:searchCategory IS NULL OR n.neighbor_category = :searchCategory) AND "
			+ "(LOWER(n.neighbor_title) LIKE LOWER(concat('%', :searchValue, '%')) OR "
			+ "LOWER(n.neighbor_content) LIKE LOWER(concat('%', :searchValue, '%'))) " + "ORDER BY n.neighbor_no DESC")
	public Page<NeighborhoodReview> findByCategoryLoungeContents(
			@Param("searchCategory") String searchCategory,
			@Param("searchValue") String searchValue,
			Pageable pageable);
	
	@Query("select n from NeighborhoodReview n where (:searchCategory is null or n.neighbor_category = :searchCategory) "
			+ "and (LOWER(n.neighbor_brand_name) LIKE LOWER(concat('%', :searchValue, '%'))) order by n.neighbor_no desc")
	public Page<NeighborhoodReview> findByCategoryLoungeBrand(
			@Param("searchCategory") String searchCategory,
			@Param("searchValue") String searchValue,
			Pageable pageable);
	
	
}

