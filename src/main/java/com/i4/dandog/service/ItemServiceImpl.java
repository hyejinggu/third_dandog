package com.i4.dandog.service;

import java.util.List;

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
	public int save(Item entity) {
		repository.save(entity);
		return entity.getItem_no();
	}
}
