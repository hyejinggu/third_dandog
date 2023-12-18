package com.i4.dandog.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
	public String getLoungeList(
			@RequestParam(name = "search_category", defaultValue = "all") String searchCategory,
            @RequestParam(name = "search_field", defaultValue = "contents") String searchField,
            @RequestParam(name = "search_value", defaultValue = "") String searchValue,
	        @RequestParam(name = "page", defaultValue = "0") int page,
	        @RequestParam(name = "size", defaultValue = "10") int size,
            Model model) {
	
		if (searchCategory.equals("all")) searchCategory = null;
		
		
	    Pageable pageable = PageRequest.of(page, size);
	    Page<Lounge> loungePage;

		
		if ("id".equals(searchField)) {
			loungePage = service.findByCategoryUserId(searchCategory, searchValue, pageable);
			model.addAttribute("loungeList", loungePage.getContent());
		} else {
			loungePage = service.findByCategoryLoungeContents(searchCategory, searchValue, pageable);
			model.addAttribute("loungeList", loungePage.getContent());			
		}
		
	    // 페이지 관련 정보를 모델에 추가
	    model.addAttribute("loungePage", loungePage);
	    model.addAttribute("currentPage", loungePage.getNumber());
	    model.addAttribute("totalPages", loungePage.getTotalPages());
	    model.addAttribute("totalLounges", loungePage.getTotalElements());
		
		
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
	
	
	
	
	@PostMapping(value = "/deleteLounge", consumes = MediaType.APPLICATION_JSON_VALUE)
	public String deleteLounge(@RequestBody Map<String, List<String>> requestMap, Model model) {
	    try {
	        List<String> valueArr = requestMap.get("valueArr");
	        if (valueArr != null) {
	        	
	            for (String lounge : valueArr) {
	                service.delete(Integer.parseInt(lounge));                
	            }
	            
	            model.addAttribute("message", "선택 게시글 삭제 성공");            
	        } else {
	            model.addAttribute("message", "삭제할 게시글을 선택하세요.");
	        }
			
		} catch (Exception e) {
			log.info("** delete Exception => "+e.toString());
			model.addAttribute("message", "선택 게시글 삭제 실패");
		}
		
	    return "/lounge/loungeList";
	} // delete


}
