package com.i4.dandog.restController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.entity.Event;
import com.i4.dandog.service.EventService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/event")
@Log4j2
@AllArgsConstructor
public class EventRestController {

	EventService service;	
	
	@GetMapping("/getEventList")
	public List<Event> getEventList() {

	    return service.selectList();
	}


}
