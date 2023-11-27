package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.ItemImage;
import com.i4.dandog.repository.ItemImageRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class ItemImageServiceImpl implements ItemImageService {

	private final ItemImageRepository repository;

	@Override
	public List<ItemImage> selectList() {
		return repository.findAll();
	}

	@Override
	public ItemImage selectOne(int item_no) {
		Optional<ItemImage> result = repository.findById(item_no);
    	if ( result.isPresent() ) return result.get();
    	else return null;
	}

	@Override
	public int save(ItemImage entity) {
		repository.save(entity);
		return entity.getItem_no();
	}
	
	
	@Override
	public int delete(int item_no) {
		repository.deleteById(item_no);
		return item_no;
	}
	
	
	@Override
	public List<ItemImage> findByItemNo(int item_no) {
		System.out.println("item_no: " + item_no);
		System.out.println("findByItem_no: " + repository.findByItemNo(item_no));
		return repository.findByItemNo(item_no);
//		if ( result != null && !result.isEmpty()) {
//			return result;
//		} else return null;
	}
	
	
}
