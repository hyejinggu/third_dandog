package com.i4.dandog.controller;

import java.io.File;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.i4.dandog.entity.Lounge;
import com.i4.dandog.service.LoungeService;
import com.sun.org.apache.xpath.internal.operations.Mod;

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

		// ** MultipartFile ***********************
		String realPath = "D:\\teamproject03\\DanDog\\src\\main\\webapp\\resources\\communityimages";
		// => 기본 이미지 지정하기
		String file1, file2 = "resources/communityimages/basic.gif";

		// => 저장경로 완성
		MultipartFile uploadfilef = entity.setLounge_imgf();
		if (uploadfilef != null && !uploadfilef.isEmpty()) {
			// => image_File 을 선택함 -> 저장 (저장경로: relaPath+화일명)
			// 1.3.1) 물리적위치 저장 (file1)
			file1 = realPath + uploadfilef.getOriginalFilename(); // 저장경로 완성
			uploadfilef.transferTo(new File(file1)); // 해당경로에 저장(붙여넣기)

			// 1.3.2) Table 저장경로 완성 (file2)
			file2 = "resources/uploadImages/" + uploadfilef.getOriginalFilename();
		} // Image 선택한 경우

		// 1.4) 완성된 경로를 dto 에 set
		entity.setLounge_img(file2);

		// 2. Service 처리
		try {
			loungeService.save(entity);
		} catch (Exception e) {
			log.info("** insert Exception => " + e.toString());
			uri = "member/memberJoin";
		}

		// 3. View
		return uri;
	}

}
