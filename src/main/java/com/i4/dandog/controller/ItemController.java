package com.i4.dandog.controller;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.i4.dandog.entity.Item;
import com.i4.dandog.service.ItemService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/item")
@Log4j2  //@Log4j -> Boot 에서는 2015년 이후 지원중단
@AllArgsConstructor
public class ItemController {
	
	ItemService service;
	
	@GetMapping("/itemList")
	public void itemList(Model model) {
		model.addAttribute("itemList", service.selectList());
	}
	
	
	@GetMapping(value="/itemInsert")
	public void itemInsert() {
		// viewName 생략 -> 요청명이 viewName 이 됨
	}
	
	@GetMapping(value = "/insert")
	public String join(HttpServletRequest request, 
			Item entity, Model model) throws IOException  {
		
		String uri = "item/itemInsert";
		
		// 이미지 등록
		String realPath = "D:\\teamproject\\third_dandog\\dandog\\src\\main\\webapp\\resources\\images";
		String file1, file2 = "resources/images/basic.jpg"; // 기본 이미지 지정
		String file3, file4 = "resources/images/basic.jpg"; // 기본 이미지 지정
		
		MultipartFile uploadfilef1 = entity.getUploadfileF1(); // 첫번째 상품 이미지
		if ( uploadfilef1!=null && !uploadfilef1.isEmpty() ) {
			// => image_File 을 선택함 -> 저장 (저장경로: relaPath+화일명)
			// 물리적위치 저장 (file1)
			file1 = realPath + uploadfilef1.getOriginalFilename(); //저장경로 완성 
			uploadfilef1.transferTo(new File(file1)); //해당경로에 저장(붙여넣기)
			System.out.println("file1: " + file1);
			
			// Table 저장경로 완성 (file2)
			file2 = "resources/images/" + uploadfilef1.getOriginalFilename();
			System.out.println("file2: " + file2);
		}
		entity.setItem_img1(file2);
		
		MultipartFile uploadfilef2 = entity.getUploadfileF2(); // 두번째 상품 이미지
		if ( uploadfilef2!=null && !uploadfilef2.isEmpty() ) {
			// => image_File 을 선택함 -> 저장 (저장경로: relaPath+화일명)
			// 물리적위치 저장 (file1)
			file3 = realPath + uploadfilef2.getOriginalFilename(); //저장경로 완성 
			uploadfilef2.transferTo(new File(file3)); //해당경로에 저장(붙여넣기)
			System.out.println("file3: " + file3);
			
			// Table 저장경로 완성 (file2)
			file4 = "resources/images/" + uploadfilef2.getOriginalFilename();
			System.out.println("file4: " + file4);
		}
		
		
		entity.setItem_img2(file4);
		
		try {
			log.info("insert 성공! 상품 번호: "+service.save(entity));
			model.addAttribute("message", "상품 등록 성공");
		} catch (Exception e) {
			log.info("insert Exception: "+e.toString());
			model.addAttribute("message", "상품 등록 실패");
		}
		
		return uri;
	}
	
	
}
