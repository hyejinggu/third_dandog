package com.i4.dandog.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.Lounge;
import com.i4.dandog.repository.LoungeRepository;
import com.i4.dandog.repository.LoungeRepositoryCustom;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class LoungeServiceImpl implements LoungeService {

	private final LoungeRepository loungeRepository;
	private final LoungeRepositoryCustom loungeRepositoryCustom;

	
	@Override
	public List<Lounge> findByDynamicQuery(String category, String inputValue, String filterValue, String sort) {
		return loungeRepositoryCustom.findByDynamicQuery(category, inputValue, filterValue, sort);
	}
	
	//========================================================================

	
	@Override
	public List<Lounge> findByCategoryLoungeContents(String category, String inputValue) {
		return loungeRepository.findByCategoryLoungeContents(category, inputValue);
	}
	
	@Override
	public List<Lounge> findByCategoryUserId(String category, String inputValue) {
		return loungeRepository.findByCategoryUserId(category, inputValue);
	}
	
	
	@Override
	public List<Lounge> selectList() {
		return loungeRepository.findAll();
	}
	
	
	@Override
	public Lounge selectOne(int lounge_no) {
		return loungeRepository.findById(lounge_no).orElse(null);
	}

	@Override
	public String save(Lounge entity) {
		loungeRepository.save(entity); // 저장 또는 수정
		return entity.getUser_id(); // 저장후 key return
	}

	@Override
	public void delete(int lounge_no) {
		loungeRepository.deleteById(lounge_no);
	}

	@Override
	public void updateHits(int loungeNo) {
		loungeRepository.updateHits(loungeNo);
	}

	@Override
	public void updateLikes(int loungeNo) {
		loungeRepository.updateLikes(loungeNo);
	}

}
