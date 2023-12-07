package com.i4.dandog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.NeighborhoodReview;

public interface NeighborhoodReviewRepository extends JpaRepository<NeighborhoodReview, Integer> {
	
	@Query("select r from NeighborhoodReview r where neighbor_category = :neighbor_category")
	public List<NeighborhoodReview> findByCategory(@Param("neighbor_category") String neighbor_category);
	
	@Query("select n from NeighborhoodReview n where (:searchCategory is null or n.neighbor_category = :searchCategory) "
			+ "and (LOWER(n.user_id) LIKE LOWER(concat('%', :searchValue, '%'))) order by n.neighbor_no desc")
	public List<NeighborhoodReview> findByCategoryUserId(@Param("searchCategory") String searchCategory,
			@Param("searchValue") String searchValue);
	
	@Query("SELECT n FROM NeighborhoodReview n WHERE " + "(:searchCategory IS NULL OR n.neighbor_category = :searchCategory) AND "
			+ "(LOWER(n.neighbor_title) LIKE LOWER(concat('%', :searchValue, '%')) OR "
			+ "LOWER(n.neighbor_content) LIKE LOWER(concat('%', :searchValue, '%'))) " + "ORDER BY n.neighbor_no DESC")
	public List<NeighborhoodReview> findByCategoryLoungeContents(@Param("searchCategory") String searchCategory,
			@Param("searchValue") String searchValue);
	
	@Query("select n from NeighborhoodReview n where (:searchCategory is null or n.neighbor_category = :searchCategory) "
			+ "and (LOWER(n.neighbor_brand_name) LIKE LOWER(concat('%', :searchValue, '%'))) order by n.neighbor_no desc")
	public List<NeighborhoodReview> findByCategoryLoungeBrand(@Param("searchCategory") String searchCategory,
			@Param("searchValue") String searchValue);
	
	
}

