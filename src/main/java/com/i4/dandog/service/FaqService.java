package com.i4.dandog.service;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.i4.dandog.entity.Faq;

public interface FaqService {
	
	
	public List<Faq> selectsearchAllList(String searchText);
	
	public List<Faq> selectsearchList(String selectedFaq_category, String searchText);

	public List<Faq> selectList();
	
	public List<Faq> findByCategory(String faq_category);
	
	public Faq selectOne(int faq_seq);

	public int save(Faq entity);

	public int fdelete(int faq_seq);

	public List<Faq> findByloginId(String loginid);
	
	public List<Faq> findAllDesc();

//	public void fcontentinsert(int faq_seq, String faq_content);

	
	

}
