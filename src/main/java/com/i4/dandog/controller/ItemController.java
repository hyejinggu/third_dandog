package com.i4.dandog.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.i4.dandog.entity.Item;
import com.i4.dandog.entity.ItemImage;
import com.i4.dandog.service.ItemImageService;
import com.i4.dandog.service.ItemInfoImageService;
import com.i4.dandog.service.ItemService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/item")
@Log4j2 // @Log4j -> Boot 에서는 2015년 이후 지원중단
@AllArgsConstructor
public class ItemController {

	ItemService service;
	ItemImageService iservice;
	ItemInfoImageService iiservice;
	
	
	// ======== 상품 리스트 =======
	@GetMapping("/itemList")
	public String itemList(
            @RequestParam(name = "search_category", defaultValue = "all") String searchCategory,
            @RequestParam(name = "search_feild", defaultValue = "name") String searchField,
            @RequestParam(name = "search_value", defaultValue = "") String searchValue,
            Model model) {
		if (searchCategory.equals("all")) {
			searchCategory = null;
		}
		log.info("Controller - searchCategory: " + searchCategory);
		model.addAttribute("itemList", service.selectList(searchCategory, searchField, searchValue));
		model.addAttribute("itemImgList", iservice.selectList());
		
		return "/item/itemList";
	}
	
	
	
	// ======== 상품 디테일 =======
	@GetMapping("/itemdetail")
	public String itemDetail(Item entity, Model model) {
		model.addAttribute("itemDetail", service.selectOne(entity.getItem_no()));
		model.addAttribute("itemImages", iservice.findByItemNo(entity.getItem_no()));
		model.addAttribute("itemInfoImages", iiservice.findByItemNo(entity.getItem_no()));
		
		return "item/itemDetail";
	}

	
	
	// ======== 상품 등록 =======
	@GetMapping(value = "/itemInsert")
	public void itemInsert() {
		// viewName 생략 -> 요청명이 viewName 이 됨
	}

	@PostMapping(value = "/insert")
	public String insert(Item entity, Model model, @RequestParam("etcImages") MultipartFile[] images) throws IOException {

		String uri = "redirect:/";

		// 이미지 등록
		String realPath = "D:\\teamproject\\third_dandog\\dandog\\src\\main\\react_pjt\\public\\images\\item\\";
		String file1, file2 = "/basic.jpg"; // 기본 이미지 지정
		String file3, file4 = "/basic.jpg"; // 기본 이미지 지정

		MultipartFile uploadfilef1 = entity.getUploadfileF1(); // 첫번째 상품 이미지
		System.out.println("uploadfilef1: " + uploadfilef1);
		if (uploadfilef1 != null && !uploadfilef1.isEmpty()) {
			// => image_File 을 선택함 -> 저장 (저장경로: relaPath+화일명)
			// 물리적위치 저장 (file1)
			file1 = realPath + uploadfilef1.getOriginalFilename(); // 저장경로 완성
			uploadfilef1.transferTo(new File(file1)); // 해당경로에 저장(붙여넣기)
			System.out.println("file1: " + file1);

			// Table 저장경로 완성 (file2)
			file2 = uploadfilef1.getOriginalFilename();
			System.out.println("file2: " + file2);
		}
		entity.setItem_img1(file2);

		MultipartFile uploadfilef2 = entity.getUploadfileF2(); // 두번째 상품 이미지
		if (uploadfilef2 != null && !uploadfilef2.isEmpty()) {
			// => image_File 을 선택함 -> 저장 (저장경로: relaPath+화일명)
			// 물리적위치 저장 (file1)
			file3 = realPath + uploadfilef2.getOriginalFilename(); // 저장경로 완성
			uploadfilef2.transferTo(new File(file3)); // 해당경로에 저장(붙여넣기)
			System.out.println("file3: " + file3);

			// Table 저장경로 완성 (file2)
			file4 = uploadfilef2.getOriginalFilename();
			System.out.println("file4: " + file4);
		}

		entity.setItem_img2(file4);

		
		try {
			log.info("insert 성공! 상품 번호: " + service.save(entity));
			
			model.addAttribute("message", "상품 등록 성공");
		} catch (Exception e) {
			log.info("insert Exception: " + e.toString());
			model.addAttribute("message", "상품 등록 실패");
		}
		
		
		// 그 외 기타 이미지
		for (MultipartFile img : images) {
			if (img != null && !img.isEmpty()) {
				String file5 = realPath + img.getOriginalFilename();
				img.transferTo(new File(file5));
				
				String file6 = img.getOriginalFilename();
				
				ItemImage imgEntity = new ItemImage();
//				imgEntity.setImage_no(0);
				imgEntity.setItem_no(entity.getItem_no());
				imgEntity.setItem_img(file6);
				log.info("images insert 성공! 상품 번호: " + iservice.save(imgEntity));
			}
		}

		return uri;
	}

	// ======== 상품 정보 수정 =======
	
	@GetMapping(value = "/itemupdate")
	public String itemUpdate(Item entity, Model model) {
		model.addAttribute("itemDetail", service.selectOne(entity.getItem_no()));
		model.addAttribute("itemImages", iservice.findByItemNo(entity.getItem_no()));
		
		return "item/itemUpdate";
	}

	@PostMapping(value = "/update")
	public String update(Item entity, Model model,  @RequestParam("etcImages") MultipartFile[] images) throws IOException {

		String uri = "redirect:/";

		// 이미지 수정
		String realPath = "D:\\teamproject\\third_dandog\\dandog\\src\\main\\react_pjt\\public\\images\\item\\";
		MultipartFile uploadfilef1 = entity.getUploadfileF1(); // 첫번째 상품 이미지
		if (uploadfilef1 != null && !uploadfilef1.isEmpty()) {
			// 물리적위치 저장 (file1)
			String file1 = realPath + uploadfilef1.getOriginalFilename(); // 저장경로 완성
			uploadfilef1.transferTo(new File(file1)); // 해당경로에 저장(붙여넣기)

			// Table 저장경로 완성 (file2)
			String file2 = uploadfilef1.getOriginalFilename();
			entity.setItem_img1(file2);
		}

		MultipartFile uploadfilef2 = entity.getUploadfileF2(); // 두번째 상품 이미지
		if (uploadfilef2 != null && !uploadfilef2.isEmpty()) {
			// 물리적위치 저장 (file1)
			String file3 = realPath + uploadfilef2.getOriginalFilename(); // 저장경로 완성
			uploadfilef2.transferTo(new File(file3)); // 해당경로에 저장(붙여넣기)

			// Table 저장경로 완성 (file2)
			String file4 = uploadfilef2.getOriginalFilename();
			entity.setItem_img2(file4);
		}


		try {
			log.info("insert 성공! 상품 번호: " + service.save(entity));
			model.addAttribute("message", "상품 수정 성공");
		} catch (Exception e) {
			log.info("insert Exception: " + e.toString());
			model.addAttribute("message", "상품 수정 실패");
			uri = "item/itemUpdate";
		}

		
		// 그 외 기타 이미지
		for (MultipartFile img : images) {
			if (img != null && !img.isEmpty()) {
				String file5 = realPath + img.getOriginalFilename();
				img.transferTo(new File(file5));
				
				String file6 = img.getOriginalFilename();
				
				ItemImage imgEntity = new ItemImage();
//				imgEntity.setImage_no(0);
				imgEntity.setItem_no(entity.getItem_no());
				imgEntity.setItem_img(file6);
				log.info("images insert 성공! 상품 번호: " + iservice.save(imgEntity));
			}
		}
		
		
		return uri;
	}
	
	
	
	
	// ======== 상품 삭제 =======
	@PostMapping(value = "/deleteItem", consumes = MediaType.APPLICATION_JSON_VALUE)
	public String deleteItem(@RequestBody Map<String, List<String>> requestMap, Model model) {
	    try {
	        List<String> valueArr = requestMap.get("valueArr");
	        if (valueArr != null) {
	            log.info("***********길이: " + valueArr.size());
	            for (String item : valueArr) {
	                service.delete(Integer.parseInt(item));                
	                log.info("delete 성공! 상품 번호: " + item);
	            }
	            model.addAttribute("message", "선택 상품 삭제 성공");            
	        } else {
	            model.addAttribute("message", "삭제할 상품을 선택하세요.");
	        }
			
		} catch (Exception e) {
			log.info("** delete Exception => "+e.toString());
			model.addAttribute("message", "선택 상품 삭제 실패");
		}
		
	    return "/item/itemList";
	} // delete
	
	
	
	// ====================================================================
	
	

	
	
	

}
