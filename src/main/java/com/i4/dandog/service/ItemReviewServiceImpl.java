package com.i4.dandog.service;

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

//	@Override
//	public int delete(int item_no) {
//		repository.deleteById(item_no);
//		return item_no;
//	}

}
