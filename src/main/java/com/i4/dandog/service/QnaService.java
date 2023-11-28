package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.entity.Member;
import com.i4.dandog.entity.Qna;

public interface QnaService {

	public List<Qna> selectList();
	
	public Qna selectOne(int qna_seq);

	public int save(Qna entity);

	public int delete(int qna_seq);


	

}
