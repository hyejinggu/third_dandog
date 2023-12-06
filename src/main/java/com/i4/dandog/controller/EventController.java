package com.i4.dandog.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.i4.dandog.entity.Event;
import com.i4.dandog.service.EventService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@Log4j2
@AllArgsConstructor
@RequestMapping("/community")
public class EventController {
	
	private EventService service;

	@GetMapping(value = "/eventList")
	public String getLoungeList(
			@RequestParam(name = "search_category", defaultValue = "name") String searchCategory,
            @RequestParam(name = "search_value", defaultValue = "") String searchValue,
            @RequestParam(name = "reg_date", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate regDate,
            @RequestParam(name = "exp_date", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate expDate,
            Model model) {
		
		log.info("searchCategory: " + searchCategory + " searchValue: " + searchValue);
		
		if (searchCategory.equals("name")) {
			if (searchValue.equals("")) {
				model.addAttribute("eventList", service.selectList());
			} else {
				model.addAttribute("eventList", service.findByEventName(searchValue));					
			}
		} else {
			model.addAttribute("eventList", service.findByDate(regDate, expDate));
		}
		return "event/eventList";
	}

	@GetMapping(value = "/eventInsert")
	public String loungeInsert() {
		return "event/eventInsert";
	}
//	
	@PostMapping(value = "/eventUpload")
	public String loungeupload(Event entity, Model model) throws IOException {
	    String redirectUri = "redirect:/";

	    try {
	        String uploadPath = "D:\\teamproject\\third_dandog\\dandog\\src\\main\\react_pjt\\public\\images\\";
	        MultipartFile eventImageFile = entity.getEvent_imgToUpload();

	        if (eventImageFile != null && !eventImageFile.isEmpty()) {
	            String fileName = eventImageFile.getOriginalFilename();
	            String filePath = uploadPath + fileName;

	            // 중복 파일 이름 처리 (예: UUID 사용)
	            // String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
	            // String filePath = uploadPath + uniqueFileName;

	            eventImageFile.transferTo(new File(filePath));
	            entity.setEvent_img(fileName);
	        }

	        service.save(entity);
	    } catch (Exception e) {
	        log.error("** Insert Exception => ", e);

	        // 사용자에게 어떤 문제가 발생했는지 알려주는 메시지를 모델에 추가
	        model.addAttribute("errorMessage", "이벤트 업로드 중 오류가 발생했습니다.");

	        // 오류가 발생한 경우에는 다른 페이지로 리다이렉트
	        redirectUri = "errorPage"; // 적절한 에러 페이지로 수정
	    }

	    return redirectUri;
	}


}
