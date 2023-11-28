package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.NeighborhoodReview;
import com.i4.dandog.repository.NeighborhoodReviewRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class NeighborhoodReviewServiceImpl implements NeighborhoodReviewService {
	
	private final NeighborhoodReviewRepository repository;
	
	@Override
	public List<NeighborhoodReview> selectList() {
		return repository.findAll();
	}
	
	@Override
	public List<NeighborhoodReview> findByCategory(String neighbor_category) {
		return repository.findByCategory(neighbor_category);
	}
	
	@Override
	public NeighborhoodReview selectOne(int neighbor_no) {
		Optional<NeighborhoodReview> result = repository.findById(neighbor_no);
    	if ( result.isPresent() ) return result.get();
    	else return null;
	}
	
	@Override
	public int save(NeighborhoodReview entity) {
		repository.save(entity);
		return entity.getNeighbor_no();
	}
	
	@Override
	public int delete(int neighbor_no) {
		repository.deleteById(neighbor_no);
		return neighbor_no;
	}
	
	

	
}
