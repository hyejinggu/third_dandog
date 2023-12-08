package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.Member;
import com.i4.dandog.entity.NeighborhoodReview;
import com.i4.dandog.entity.Qna;
import com.i4.dandog.repository.QnaRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

//import criTest.SearchCriteria;

@Service
//@Log4j2
@RequiredArgsConstructor
public class QnaServiceImpl implements QnaService {
	
	private final QnaRepository repository;

	@Override
	public void replyinsert(int qna_seq, String qna_reply) {
		repository.replyinsert(qna_seq, qna_reply);
	}
	
	// ** selectList
	@Override
	public List<Qna> selectList() {
		return repository.findAll();
	}
	
	@Override
	public List<Qna> findByCategory(String qna_category) {
		return repository.findByCategory(qna_category);
	}
	
	// ** selectOne
	@Override
	public Qna selectOne(int qna_seq) {
		Optional<Qna> result = repository.findById(qna_seq);
		if(result.isPresent()) return result.get();
		else return null;
	}
	
	// ** insert,update
	@Override
	public int save(Qna entity) {
		repository.save(entity);
		return entity.getQna_seq();
	}
	
	
	// ** delete
	@Override
	public int qdelete(int qna_seq) {
		repository.deleteById(qna_seq);
		return qna_seq;
	}
	
	
	
} // class

