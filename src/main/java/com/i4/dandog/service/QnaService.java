package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.entity.Faq;
import com.i4.dandog.entity.Qna;

public interface QnaService {
	
	
	public List<Qna> selectsearchAllList(String searchText);
	
	public List<Qna> selectsearchList(String selectedQna_category, String searchText);
	
	public void replyinsert(int qna_seq, String qna_reply);

	public List<Qna> selectList();
	
	public List<Qna> findByCategory(String qna_category);
	
	public Qna selectOne(int qna_seq);

	public int save(Qna entity);

	public int qdelete(int qna_seq);

	public List<Qna> findByloginId(String loginid);
	
	public List<Qna> findAllDesc();

}
