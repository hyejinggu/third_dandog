package com.i4.dandog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {
//	@Query("SELECT item_no, item_img FROM Item i LEFT OUTER JOIN ItemImage ii on i.item_no = ii.item_no")
//	public List<ItemImage> getAllImages();
	
	@Query("select i from Item i order by i.item_sales_volume desc")
	public List<Item> itemListSortedByPopular();
	
	@Query("select i from Item i order by i.item_price desc")
	public List<Item> itemListSortedByHigh();
	
	@Query("select i from Item i order by i.item_price")
	public List<Item> itemListSortedByLow();
	
	@Query("select i from Item i order by i.regdate")
	public List<Item> itemListSortedByNew();
	
//    // Popular 순으로 정렬된 아이템 목록 조회
//    List<Item> findByOrderByItemSalesVolumeDesc();
//
//    // 가격이 높은 순으로 정렬된 아이템 목록 조회
//    List<Item> findByOrderByItemPriceDesc();
//
//    // 가격이 낮은 순으로 정렬된 아이템 목록 조회
//    List<Item> findByOrderByItemPriceAsc();
//
//    // 등록일 순으로 정렬된 아이템 목록 조회
//    List<Item> findByOrderByRegdate();
	
//	@Query("delete from Customer c where c.id in :ids")
//    void deleteAllByIdInQuery(@Param("ids") List<Long> ids);
	
}

