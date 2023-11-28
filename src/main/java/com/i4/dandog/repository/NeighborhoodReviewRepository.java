package com.i4.dandog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.NeighborhoodReview;

public interface NeighborhoodReviewRepository extends JpaRepository<NeighborhoodReview, Integer> {
	
	@Query("select r from NeighborhoodReview r where neighbor_category = :neighbor_category")
	public List<NeighborhoodReview> findByCategory(@Param("neighbor_category") String neighbor_category);
}

