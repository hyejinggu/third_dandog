package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.entity.Event;

public interface EventService {

	// selectList
	List<Event> selectList();
		
	// selectOne
	Event selectOne(int event_no);
	
	// insert
	int save(Event entity);
	
	// delete
	int delete(int event_no);
	
}
