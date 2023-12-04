package com.i4.dandog.restController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.entity.Lounge;
import com.i4.dandog.service.LoungeService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/lounge")
@Log4j2
@AllArgsConstructor
public class LoungeRestController {

	LoungeService service;
	
	@GetMapping("/allLoungeList")
	public List<Lounge> allLoungeList() {

	    return service.getAllLounge();
	}

	
	@GetMapping("/updateHits")
	public int updateHits(@RequestParam(name="lounge_no") String lounge_no){

		int loungeNo = Integer.parseInt(lounge_no);
		int loungeHits = 0;
		try {
			service.updateHits(loungeNo);
			Lounge entity = service.selectOne(loungeNo);
			loungeHits = entity.getLounge_hits();
		} catch (Exception e) {
			log.error("update ERROR lounge hits", e);
		}
		
		return loungeHits;
	}
	
	
	
	@GetMapping("/updateLikes")
	public int updateLikes(@RequestParam(name="lounge_no") String lounge_no){

		int loungeNo = Integer.parseInt(lounge_no);
		int loungeLikes = 0;
		try {
			service.updateLikes(loungeNo);
			Lounge entity = service.selectOne(loungeNo);
			loungeLikes = entity.getLounge_likes();
		} catch (Exception e) {
			log.error("update ERROR lounge likes", e);
		}
		
		return loungeLikes;
	}

}
