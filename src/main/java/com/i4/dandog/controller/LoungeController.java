package com.i4.dandog.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.i4.dandog.entity.Lounge;
import com.i4.dandog.service.LoungeService;
//import com.sun.org.apache.xpath.internal.operations.Mod;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@Log4j2
@AllArgsConstructor
@RequestMapping("/lounge")
public class LoungeController {
	private LoungeService loungeService;

	@GetMapping
	public String getLoungeList(Model model) {
		model.addAttribute("lounge", loungeService.getAllLounge());
		return "lounge/lounge";
	}

	@GetMapping(value = "/loungeInsert")
	public String loungeInsert(Lounge entity, @RequestParam("lounge_imgf") MultipartFile lounge_imgf, Model model) throws IOException {
	    String uri = "redirect:lounge";

	    String realPath = "D:\\teamproject03\\DanDog\\src\\main\\webapp\\resources\\uploadImages";
	    
	    if (lounge_imgf != null && !lounge_imgf.isEmpty()) {
	        String fileName = lounge_imgf.getOriginalFilename();
	        String filePath = realPath + File.separator + fileName;
	        lounge_imgf.transferTo(new File(filePath));
	        
	        String file2 = "resources/uploadImages/" + fileName;
	        entity.setLounge_img(file2);
	    }

	    try {
	        loungeService.save(entity);
	    } catch (Exception e) {
	        log.info("** insert Exception => " + e.toString());
	        uri = "lounge/loungeInsert";
	    }

	    return uri;
	}


}
