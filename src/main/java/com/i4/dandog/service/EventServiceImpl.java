package com.i4.dandog.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.Event;
import com.i4.dandog.repository.EventRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
	
	private final EventRepository repository;
	
	
	@Override
	public List<Event> findByEventName(String searchValue) {
		return repository.findByEventName(searchValue);
	}
	
	@Override
	public List<Event> findByDate(LocalDate regDate, LocalDate expDate) {
		return repository.findByDate(regDate, expDate);
	}
	
	
	@Override
	public List<Event> selectList() {
		return repository.findAll();
	}
	
	@Override
	public Event selectOne(int event_no) {
		Optional<Event> result = repository.findById(event_no);
    	if ( result.isPresent() ) return result.get();
    	else return null;
	}
	
	@Override
	public int save(Event entity) {
		repository.save(entity);
		return entity.getEvent_no();
	}
	
	@Override
	public int delete(int event_no) {
		repository.deleteById(event_no);
		return event_no;
	}
	
	
	

	
}
