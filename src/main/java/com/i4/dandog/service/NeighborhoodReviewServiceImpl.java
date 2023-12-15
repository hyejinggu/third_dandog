package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.i4.dandog.domain.ReviewInfoDTO;
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
	
	// 카카오맵에서 선택된 장소 찾기
	@Override
	public List<NeighborhoodReview> findBySelectedPlace(String selectedPlace) {
		return repository.findBySelectedPlace(selectedPlace);
	}
	
	// 상호명별 리뷰 찾기
	@Override
	public List<NeighborhoodReview> findReviewByBrand(String neighborBrandName) {
		return repository.findReviewByBrand(neighborBrandName);
	}
	
	// 정렬, 검색
	@Override
	public List<ReviewInfoDTO> starFilterWithCategory(double filter, String category) {
		return customRepository.starFilterWithCategory(filter, category);
	}
	
	@Override
	public List<ReviewInfoDTO> sortWithCategory(String sorting, String category) {
		return customRepository.sortWithCategory(sorting, category);
	}
	
	
	
	// ======== 관리자 검색
	@Override
	public Page<NeighborhoodReview> findByCategoryUserId(
			String searchCategory, String searchValue, Pageable pageable) {
		return repository.findByCategoryUserId(searchCategory, searchValue, pageable);
	}
	
	@Override
	public Page<NeighborhoodReview> findByCategoryLoungeContents(
			String searchCategory, String searchValue, Pageable pageable) {
		return repository.findByCategoryLoungeContents(searchCategory, searchValue, pageable);
	}  
	
	
	@Override
	public Page<NeighborhoodReview> findByCategoryLoungeBrand(
			String searchCategory, String searchValue, Pageable pageable) {
		return repository.findByCategoryLoungeBrand(searchCategory, searchValue, pageable);
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
