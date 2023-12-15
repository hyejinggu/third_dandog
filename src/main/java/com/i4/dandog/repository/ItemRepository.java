package com.i4.dandog.repository;

import org.springframework.data.domain.Pageable;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {

	@Query("select i from Item i where (:searchCategory is null or i.item_category = :searchCategory) and lower(i.item_name) like lower(concat('%', :searchValue, '%')) order by item_no desc")
	Page<Item> findByCategoryAndItemName(
			@Param("searchCategory") String searchCategory,
			@Param("searchValue") String searchValue,
			Pageable pageable);

	@Query("select i from Item i where (:searchCategory is null or i.item_category = :searchCategory) and i.item_no = :searchValue order by item_no desc")
	Page<Item> findByCategoryItemNo(
			@Param("searchCategory") String searchCategory,
			@Param("searchValue") int searchValue,
			Pageable pageable);
	
	
// =========================== Rest Controller에서 사용 =====================================


	
	
	@Query("select i from Item i where item_name like %:inputValue% and item_category = :category order by i.item_sales_volume desc")
	public List<Item> findByOrderByItemSalesVolumeDesc(@Param("inputValue") String inputValue,
			@Param("category") String category);

	@Query("select i from Item i where item_name like %:inputValue% and item_category = :category order by i.item_price desc")
	public List<Item> findByOrderByItemPriceDesc(@Param("inputValue") String inputValue,
			@Param("category") String category);

	@Query("select i from Item i where item_name like %:inputValue% and item_category = :category order by i.item_price")
	public List<Item> findByOrderByItemPriceAsc(@Param("inputValue") String inputValue,
			@Param("category") String category);

	@Query("select i from Item i where item_name like %:inputValue% and item_category = :category order by i.regdate")
	public List<Item> findByOrderByRegdate(@Param("inputValue") String inputValue, @Param("category") String category);

	
	// Color, Size
	@Query("select i.options_color from Item i where i.item_name = :item_name")
	public List<String> findColors(@Param("item_name") String item_name);
	
	@Query("select i.options_size from Item i where i.item_name = :item_name")
	public List<String> findSizes(@Param("item_name") String item_name);
	

	@Query("select i.item_no from Item i where i.item_name = :itemName "
			+ "and i.options_color = :selectedColor and i.options_size = :selectedSize")
	public int updateOption(@Param("itemName") String itemName, 
			@Param("selectedColor") String selectedColor, @Param("selectedSize") String selectedSize);
	
	
}
