package com.i4.dandog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.Item;
import com.i4.dandog.entity.ItemImage;
import com.i4.dandog.entity.NeighborhoodReview;

public interface ItemRepository extends JpaRepository<Item, Integer> {
//	@Query("SELECT item_no, item_img FROM Item i LEFT OUTER JOIN ItemImage ii on i.item_no = ii.item_no")
//	public List<ItemImage> getAllImages();
	
	@Query("select i from Item i order by = :item_sales_volume desc")
	public List<Item> itemListSortedByPopular(@Param("item_sales_volume") String item_sales_volume);
	
	@Query("select i from Item i order by = :item_price desc")
	public List<Item> itemListSortedByHigh(@Param("item_price") String item_price);
	
	@Query("select i from Item i order by = :item_price")
	public List<Item> itemListSortedByLow(@Param("item_price") String item_price);
	
	@Query("select i from Item i order by = :regdate")
	public List<Item> itemListSortedByNew(@Param("regdate") String regdate);
	
}

