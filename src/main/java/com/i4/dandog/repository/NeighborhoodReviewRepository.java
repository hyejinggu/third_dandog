package com.i4.dandog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.NeighborhoodReview;

public interface NeighborhoodReviewRepository extends JpaRepository<NeighborhoodReview, Integer> {
	
	@Query("select r from NeighborhoodReview r where neighbor_brand_name = :selectedPlace")
	public List<NeighborhoodReview> findBySelectedPlace(@Param("selectedPlace") String selectedPlace);
	
	
//	@Query("SELECT nr FROM NeighborhoodReview nr " +
//	        "WHERE " +
//	        "(:filter = 0.0 OR :filter <= ALL (SELECT AVG(r.neighbor_rating) FROM NeighborhoodReview r WHERE r.neighbor_brand_name = nr.neighbor_brand_name)) " +
//	        "AND (:neighbor_category IS NULL OR nr.neighbor_category = :neighbor_category) " +
//	        "GROUP BY nr.neighbor_brand_name " +
//	        "HAVING " +
//	        "   :sorting = 'star' AND :filter <= ALL (SELECT AVG(r.neighbor_rating) FROM NeighborhoodReview r WHERE r.neighbor_brand_name = nr.neighbor_brand_name) OR " +
//	        "   :sorting = 'review' AND :filter <= ALL (SELECT COUNT(r.neighbor_brand_name) FROM NeighborhoodReview r WHERE r.neighbor_brand_name = nr.neighbor_brand_name) " +
//	        "ORDER BY " +
//	        "   CASE WHEN :sorting = 'star' THEN MAX(AVG(r.neighbor_rating)) END DESC, " +
//	        "   CASE WHEN :sorting = 'review' THEN MAX(COUNT(nr.neighbor_brand_name)) END DESC, " +
//	        "   MAX(nr.regdate) DESC")
//	public List<String> sortAndFilterWithCategory(
//	        @Param("sorting") String sorting,
//	        @Param("filter") double filter,
//	        @Param("neighbor_category") String neighbor_category);
	
	
//	@Query("SELECT nr FROM NeighborhoodReview nr " +
//	        "WHERE " +
//	        "(:filter = 0.0 OR (SELECT AVG(r.neighbor_rating) FROM NeighborhoodReview r WHERE r.neighbor_brand_name = nr.neighbor_brand_name) >= :filter) " +
//	        "AND (:neighbor_category IS NULL OR nr.neighbor_category = :neighbor_category) " +
//	        "GROUP BY nr.neighbor_brand_name " +
//	        "HAVING " +
//	        "   (:sorting = 'star' AND (SELECT AVG(r.neighbor_rating) FROM NeighborhoodReview r WHERE r.neighbor_brand_name = nr.neighbor_brand_name) >= :filter) OR " +
//	        "   (:sorting = 'review' AND COUNT(nr.neighbor_brand_name) >= :filter) " +
//	        "ORDER BY " +
//	        "   CASE WHEN :sorting = 'star' THEN (SELECT AVG(r.neighbor_rating) FROM NeighborhoodReview r WHERE r.neighbor_brand_name = nr.neighbor_brand_name) END DESC, " +
//	        "   CASE WHEN :sorting = 'review' THEN COUNT(nr.neighbor_brand_name) END DESC, " +
//	        "   MAX(nr.regdate) DESC")
//	public List<NeighborhoodReview> sortAndFilterWithCategory(
//	        @Param("sorting") String sorting,
//	        @Param("filter") double filter,
//	        @Param("neighbor_category") String neighbor_category);
	
	
	
	// ======== 관리자
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

