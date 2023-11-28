package com.i4.dandog.controller;

import java.io.File;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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
@RequestMapping("/lounge")
public class LoungeController {
	private LoungeService loungeService;

	@GetMapping
	public String getLoungeList(Model model) {
		model.addAttribute("lounge", loungeService.getAllLounge());
		return "lounge/lounge";
	}

	@GetMapping(value = "/loungeInsert")
	public void loungeInsert(Lounge entity, Model model) {
		String uri = "redirect:lounge";

		String realPath = "D:\\teamproject03\\DanDog\\src\\main\\webapp\\resources\\communityimages";
		String file1, file2 = "resources/communityimages/basic.gif";

		MultipartFile uploadfilef = entity.setLounge_imgf();
		
		if (uploadfilef != null && !uploadfilef.isEmpty()) {
			file1 = realPath + uploadfilef.getOriginalFilename();
			uploadfilef.transferTo(new File(file1));
			file2 = "resources/uploadImages/" + uploadfilef.getOriginalFilename();
		}
		
		entity.setLounge_img(file2);
		
		try {
			loungeService.save(entity);
		} catch (Exception e) {
			log.info("** insert Exception => " + e.toString());
			uri = "member/memberJoin";
		}

		return uri;
	}

}
