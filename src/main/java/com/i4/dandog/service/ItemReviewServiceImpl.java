package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.ItemReview;
import com.i4.dandog.repository.ItemReviewRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class ItemReviewServiceImpl implements ItemReviewService {

	private final ItemReviewRepository repository;

	@Override
	public int save(ItemReview entity) {
		repository.save(entity);
		return entity.getReview_no();
	}
	
	@Override
	public List<ItemReview> selectOne(String item_name) {
		return repository.findByItem_name(item_name);
	}

	@Override
	public void deleteOrderNum(int order_num) {
		repository.deleteByOrderNum(order_num);
	}

}
