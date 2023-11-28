package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.Member;
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

	
	// ** selectList
	@Override
	public List<Qna> selectList() {
		return repository.findAll();
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
	public int delete(int qna_seq) {
		repository.deleteById(qna_seq);
		return qna_seq;
	}
	
} // class

