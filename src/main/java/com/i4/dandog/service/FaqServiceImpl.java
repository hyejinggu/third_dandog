package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.Member;
import com.i4.dandog.entity.NeighborhoodReview;
import com.i4.dandog.entity.Faq;
import com.i4.dandog.repository.FaqRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

//import criTest.SearchCriteria;

@Service
@Log4j2
@RequiredArgsConstructor
public class FaqServiceImpl implements FaqService {
	
	private final FaqRepository repository;
	
	
	@Override
	public List<Faq> selectsearchAllList(String searchText) {
		return repository.selectsearchAllList(searchText);
	}
	
	@Override
	public List<Faq> selectsearchList(String selectedFaq_category, String searchText) {
		return repository.selectsearchList(selectedFaq_category, searchText);
	}

	@Override
	public List<Faq> findByloginId(String loginid) {
		return repository.findAllByUserId(loginid);
	}
	
//	@Override
//	public void fcontentinsert(int faq_seq, String faq_content) {
//		repository.fcontentinsert(faq_seq, faq_content);
//		
//	}
	
	// ** selectList
	@Override
	public List<Faq> selectList() {
		return repository.findAll();
	}
	
	@Override
	public List<Faq> findByCategory(String faq_category) {
		return repository.findByCategory(faq_category);
	}
	
	// ** selectOne
	@Override
	public Faq selectOne(int faq_seq) {
		Optional<Faq> result = repository.findById(faq_seq);
		if(result.isPresent()) return result.get();
		else return null;
	}
	
	// ** insert,update
	@Override
	public int save(Faq entity) {
		repository.save(entity);
		return entity.getFaq_seq();
	}
	
	
	// ** delete
	@Override
	public int fdelete(int faq_seq) {
		repository.deleteById(faq_seq);
		return faq_seq;
	}

	// faqList 내림차순
	@Override
	public List<Faq> findAllDesc() {
		return repository.findAllDesc();
	}
	
} // class

