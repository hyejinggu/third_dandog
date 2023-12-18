package com.i4.dandog.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.ItemReview;

public interface ItemReviewRepository extends JpaRepository<ItemReview, Integer> {
	@Query("SELECT ir FROM ItemReview ir WHERE ir.item_name = :item_name")
	List<ItemReview> findByItem_name(@Param("item_name") String item_name);

	@Transactional
	@Modifying
	@Query("DELETE FROM ItemReview ir WHERE ir.order_num = :order_num")
	void deleteByOrderNum(@Param("order_num") int order_num);

}
