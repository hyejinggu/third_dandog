package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.entity.Faq;
import com.i4.dandog.entity.Notice;

public interface NoticeService {
	
	
	public List<Notice> selectsearchAllList(String searchText);
	
	public List<Notice> selectsearchList(String selectedNotice_category, String searchText);

	public List<Notice> selectList();
	
	public List<Notice> findByCategory(String notice_category);
	
	public Notice selectOne(int notice_seq);

	public int save(Notice entity);
	
	public int ndelete(int notice_seq);
	
	public List<Notice> findByloginId(String loginid);
	
	public List<Notice> findAllDesc();

	
	

}

