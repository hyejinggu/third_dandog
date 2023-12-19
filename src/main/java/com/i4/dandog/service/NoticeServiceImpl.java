package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.Faq;
import com.i4.dandog.entity.Member;
import com.i4.dandog.entity.NeighborhoodReview;
import com.i4.dandog.entity.Notice;
import com.i4.dandog.repository.NoticeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

//import criTest.SearchCriteria;

@Service
@Log4j2
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {
	
	private final NoticeRepository repository;
	
	
	@Override
	public List<Notice> selectsearchAllList(String searchText) {
		return repository.selectsearchAllList(searchText);
	}
	
	@Override
	public List<Notice> selectsearchList(String selectedNotice_category, String searchText) {
		return repository.selectsearchList(selectedNotice_category, searchText);
	}

	@Override
	public List<Notice> findByloginId(String loginid) {
		return repository.findAllByUserId(loginid);
	}
	
	// ** selectList
	@Override
	public List<Notice> selectList() {
		return repository.findAll();
	}
	
	@Override
	public List<Notice> findByCategory(String notice_category) {
		return repository.findByCategory(notice_category);
	}
	
	// ** selectOne
	@Override
	public Notice selectOne(int notice_seq) {
		Optional<Notice> result = repository.findById(notice_seq);
		if(result.isPresent()) return result.get();
		else return null;
	}
	
	// ** insert,update
	@Override
	public int save(Notice entity) {
		repository.save(entity);
		return entity.getNotice_seq();
	}
	
	
	// ** delete
	@Override
	public int ndelete(int notice_seq) {
		repository.deleteById(notice_seq);
		return notice_seq;
	}
	
	// List 내림차순
	@Override
	public List<Notice> findAllDesc() {
		return repository.findAllDesc();
	}
	
} // class

