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

	@Override
	public List<Item> selectList() {
		return repository.findAll();
	}

	// 정렬
	@Override
	public List<Item> itemListSortedByPopular() {
		return repository.itemListSortedByPopular();
	}
	
	@Override
	public List<Item> itemListSortedByHigh() {
		return repository.itemListSortedByHigh();
	}
	
	@Override
	public List<Item> itemListSortedByLow() {
		return repository.itemListSortedByLow();
	}
	
	@Override
	public List<Item> itemListSortedByNew() {
		return repository.itemListSortedByNew();
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
