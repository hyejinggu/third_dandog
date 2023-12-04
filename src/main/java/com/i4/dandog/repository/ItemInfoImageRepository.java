package com.i4.dandog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.ItemInfoImage;

public interface ItemInfoImageRepository extends JpaRepository<ItemInfoImage, Integer> {
//	@Transactional
//	@Modifying
//    @Query("INSERT INTO item_image (item_img, item_no) VALUES (:item_img, :item_no)")
//    public int insertEtcImages(@Param("item_img") String item_img, @Param("item_no") int item_no);

	@Query("select i from ItemInfoImage i where i.item_no = :item_no")
	public List<ItemInfoImage> findByItemNo(@Param("item_no") int item_no);
	
}

