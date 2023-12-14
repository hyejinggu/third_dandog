package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.entity.Lounge;

public interface LoungeService {

    
	List<Lounge> findByLoungeDynamicQuery(String category, String inputValue, String filterValue, String sort);
	
	List<Lounge> findByCategoryLoungeContents(String category, String inputValue);
	List<Lounge> findByCategoryUserId(String category, String inputValue);
	
    List<Lounge> selectList();
    
    Lounge selectOne(int lounge_no);
    
	String save(Lounge entity);
    
    void delete(int lounge_no);
    
    void updateHits(int loungeNo);
    void updateLikes(int loungeNo);
}