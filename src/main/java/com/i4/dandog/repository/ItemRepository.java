package com.i4.dandog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.i4.dandog.entity.Item;
import com.i4.dandog.entity.ItemImage;

public interface ItemRepository extends JpaRepository<Item, Integer> {
//	@Query("SELECT item_no, item_img FROM Item i LEFT OUTER JOIN ItemImage ii on i.item_no = ii.item_no")
//	public List<ItemImage> getAllImages();
}

