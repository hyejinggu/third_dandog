package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.i4.dandog.entity.Item;
import com.i4.dandog.repository.ItemRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

	private final ItemRepository repository;

	// ============ Controller에서 사용 ============
	@Override
	public Page<Item> findByCategoryAndItemName(String searchCategory, String searchValue, Pageable pageable) {
		return repository.findByCategoryAndItemName(searchCategory, searchValue, pageable);
	}
	@Override
	public Page<Item> findByCategoryItemNo(String searchCategory, int searchValue, Pageable pageable) {
		return repository.findByCategoryItemNo(searchCategory, searchValue, pageable);
	}
	
	
	// ============ Rest Controller에서 사용 ============
	// 아이템 불러오기
	@Override
	public List<Item> findByOrderByItemSalesVolumeDesc(String inputValue, String category) {
		return repository.findByOrderByItemSalesVolumeDesc(inputValue, category);
	}

	@Override
	public List<Item> findByOrderByItemPriceDesc(String inputValue, String category) {
		return repository.findByOrderByItemPriceDesc(inputValue, category);
	}

	@Override
	public List<Item> findByOrderByItemPriceAsc(String inputValue, String category) {
		return repository.findByOrderByItemPriceAsc(inputValue, category);
	}

	@Override
	public List<Item> findByOrderByRegdate(String inputValue, String category) {
		return repository.findByOrderByRegdate(inputValue, category);
	}

	
	// ColorSize
	@Override
	public List<String> findColors(String item_name) {
		return repository.findColors(item_name);
	}
	
	@Override
	public List<String> findSizes(String item_name) {
		return repository.findSizes(item_name);
	}
	
	// =============================================================

	@Override
	public Item selectOne(int item_no) {
		Optional<Item> result = repository.findById(item_no);
		if (result.isPresent())
			return result.get();
		else
			return null;
	}
	
	@Override
	public int updateOption(String itemName, String selectedColor, String selectedSize) {
		return repository.updateOption(itemName, selectedColor, selectedSize);
	}

	@Override
	public int save(Item entity) {
		repository.save(entity);
		return entity.getItem_no();
	}

	@Override
	public int delete(int item_no) {
		repository.deleteById(item_no);
		return item_no;
	}

}
