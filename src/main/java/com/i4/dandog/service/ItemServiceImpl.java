package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.Item;
import com.i4.dandog.repository.ItemRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

	private final ItemRepository repository;

	@Override
	public List<Item> selectList() {
		return repository.findAll();
	}

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
