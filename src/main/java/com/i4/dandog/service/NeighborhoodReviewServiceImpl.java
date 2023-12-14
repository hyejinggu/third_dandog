package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.NeighborhoodReview;
import com.i4.dandog.repository.NeighborhoodReviewRepository;
import com.i4.dandog.repository.RepositoryCustom;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class NeighborhoodReviewServiceImpl implements NeighborhoodReviewService {
	
	private final NeighborhoodReviewRepository repository;
	private final RepositoryCustom customRepository;
	
	@Override
	public List<NeighborhoodReview> selectList() {
		return repository.findAll();
	}
	
//	@Override
//	public List<NeighborhoodReview> findByCategory(String neighbor_category) {
//		return repository.findByCategory(neighbor_category);
//	}
	
	
	@Override
	public List<NeighborhoodReview> findBySelectedPlace(String selectedPlace) {
		return repository.findBySelectedPlace(selectedPlace);
	}
	
	// 정렬, 검색
//	@Override
//	public List<String> sortAndFilterWithCategory(String sorting, String filter_, String neighbor_category){
//		double filter = Double.parseDouble(filter_);
//		return customRepository.sortAndFilterWithCategory(sorting, filter, neighbor_category);
//	}
	@Override
	public List<String> starFilterWithCategory(double filter, String category) {
		return customRepository.starFilterWithCategory(filter, category);
	}
	
	@Override
	public List<String> sortWithCategory(String sorting, String category) {
		return customRepository.sortWithCategory(sorting, category);
	}
	
	
	
	// ======== 관리자 검색
	@Override
	public List<NeighborhoodReview> findByCategoryUserId(String searchCategory, String searchValue) {
		return repository.findByCategoryUserId(searchCategory, searchValue);
	}
	
	@Override
	public List<NeighborhoodReview> findByCategoryLoungeContents(String searchCategory, String searchValue) {
		return repository.findByCategoryLoungeContents(searchCategory, searchValue);
	}  
	
	
	@Override
	public List<NeighborhoodReview> findByCategoryLoungeBrand(String searchCategory, String searchValue) {
		return repository.findByCategoryLoungeBrand(searchCategory, searchValue);
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
