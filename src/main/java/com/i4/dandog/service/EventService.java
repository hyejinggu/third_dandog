package com.i4.dandog.service;

import java.time.LocalDate;
import java.util.List;

import com.i4.dandog.entity.Event;

public interface EventService {

	
	List<Event> findByEventName(String searchValue);
	List<Event> findByDate(LocalDate regDate, LocalDate expDate);
	
	// selectList
	List<Event> selectList();
		
	// selectOne
	Event selectOne(int event_no);
	
	// insert
	int save(Event entity);
	
	// delete
	int delete(int event_no);
	
	
	
}
