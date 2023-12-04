package com.i4.dandog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.i4.dandog.entity.Event;


public interface EventRepository extends JpaRepository<Event, Integer> {
	
}

