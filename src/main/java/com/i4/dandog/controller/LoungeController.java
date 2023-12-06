package com.i4.dandog.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.i4.dandog.entity.Lounge;
import com.i4.dandog.service.LoungeService;
//import com.sun.org.apache.xpath.internal.operations.Mod;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@Log4j2
@AllArgsConstructor
@RequestMapping("/community")
public class LoungeController {
	private LoungeService service;

	@GetMapping(value = "/loungeList")
	public String getLoungeList(Model model) {
		model.addAttribute("loungeList", service.selectList());
		return "lounge/loungeList";
	}
	

	@GetMapping(value = "/loungeInsert")
	public String loungeInsert() {
		return "lounge/loungeInsert";
	}
	
	@PostMapping(value = "/loungeUpload")
	public String loungeupload(Lounge entity, Model model) throws IOException {
	    String uri = "redirect:/";

	    String realPath = "D:\\teamproject\\third_dandog\\dandog\\src\\main\\react_pjt\\public\\images\\item\\";
	    MultipartFile lounge_imgf = entity.getLounge_imgf(); 
	    if (lounge_imgf != null && !lounge_imgf.isEmpty()) {
	        String fileName = lounge_imgf.getOriginalFilename();
	        String filePath = realPath + fileName;
	        lounge_imgf.transferTo(new File(filePath));
	        
	        String file2 = fileName;
	        entity.setLounge_img(file2);
	    }

	    try {
	    	service.save(entity);
	    } catch (Exception e) {
	        log.info("** insert Exception => " + e.toString());
	        uri = "lounge/loungeInsert";
	    }

	    return uri;
	}


}
