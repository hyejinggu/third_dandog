package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.Item;
import com.i4.dandog.repository.ItemRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

	private final ItemRepository repository;

	
	// ============ Controller에서 사용 ============
	@Override
	public List<Item> selectList(String searchCategory, String searchField, String searchValues_) {
		if ("all".equals(searchCategory)) {
			searchCategory = "";
		} else if ("no".equals(searchField)) {
			int searchValues = Integer.parseInt(searchValues_);
			return repository.findByCategoryItemNo(searchCategory, searchValues);
		} else if ("name".equals(searchField)) {
			return repository.findByCategoryAndItemName(searchCategory, searchValues_);
		}
		
		return repository.findAll();
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
	
	
	
	//=============================================================
	
	
	
	@Override
	public Item selectOne(int item_no) {
		Optional<Item> result = repository.findById(item_no);
    	if ( result.isPresent() ) return result.get();
    	else return null;
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
