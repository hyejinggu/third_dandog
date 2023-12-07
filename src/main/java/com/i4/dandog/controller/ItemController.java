package com.i4.dandog.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

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
import com.i4.dandog.service.CodeService;
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
	CodeService cservice;
	
	
	// ======== 상품 리스트 =======
	@GetMapping("/itemList")
	public String itemList(
            @RequestParam(name = "search_category", defaultValue = "all") String searchCategory,
            @RequestParam(name = "search_field", defaultValue = "name") String searchField,
            @RequestParam(name = "search_value", defaultValue = "") String searchValue,
            Model model) {
		if (searchCategory.equals("all")) {
			searchCategory = null;
		}

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
	public void itemInsert(Model model) {
		List<String> itemSizes = cservice.selectSizes();
		List<String> itemColors = cservice.selectColors();
		model.addAttribute("itemSizes", itemSizes);
		model.addAttribute("itemColors", itemColors);
	}

	@PostMapping(value = "/insert")
	public String insert(Item entity, Model model, @RequestParam("etcImages") MultipartFile[] images) throws IOException {
		System.out.println("entity: " + entity);
		String uri = "redirect:/";
		String[] colors = entity.getOptions_colors();
		String[] sizes = entity.getOptions_sizes();
		try {
			if (colors != null && sizes != null) {
				for (int i = 0; i < colors.length; i++) {
					for (int j = 0; j < sizes.length; j++) {
						
						Item newItem = new Item();
						
						newItem.setItem_category(entity.getItem_category());
						newItem.setItem_desc(entity.getItem_desc());
						newItem.setItem_discount_rate(entity.getItem_discount_rate());
						newItem.setItem_name(entity.getItem_name());
						newItem.setItem_price(entity.getItem_price());
						newItem.setItem_sales_volume(entity.getItem_sales_volume());
						newItem.setItem_stock(entity.getItem_stock());
						
						newItem.setOptions_color(colors[i]); // 컬러 설정
						newItem.setOptions_size(sizes[j]); // 사이즈 설정
						
						String realPath = "D:\\teamproject\\dandog_pjt\\dandog\\src\\main\\react_pjt\\public\\images\\item\\";
						if (i == 0 && j == 0) {
							// 이미지 등록 (첫 번째 아이템에만 이미지 등록)
							String file1, file2 = "/basic.jpg"; // 기본 이미지 지정
							String file3, file4 = "/basic.jpg"; // 기본 이미지 지정
							
							MultipartFile uploadfilef1 = entity.getUploadfileF1(); // 첫번째 상품 이미지
							MultipartFile uploadfilef2 = entity.getUploadfileF2(); // 두번째 상품 이미지

							if (uploadfilef1 != null && !uploadfilef1.isEmpty()) {
								// => image_File 을 선택함 -> 저장 (저장경로: relaPath+파일명)
								// 물리적위치 저장 (file1)
								file1 = realPath + uploadfilef1.getOriginalFilename(); // 저장경로 완성
								uploadfilef1.transferTo(new File(file1)); // 해당경로에 저장(붙여넣기)
								System.out.println("file1: " + file1);
								
								// Table 저장경로 완성 (file2)
								file2 = uploadfilef1.getOriginalFilename();
								System.out.println("file2: " + file2);
							}
							
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
							
							newItem.setItem_img1(file2);
							newItem.setItem_img2(file4);
						}
						
						// colors.length * sizes.length 만큼 save
						service.save(newItem);
						
						if (i == 0 && j == 0) {
							// 그 외 기타 이미지
							for (MultipartFile img : images) {
								if (img != null && !img.isEmpty()) {
									String file5 = realPath + img.getOriginalFilename();
									img.transferTo(new File(file5));
									
									String file6 = img.getOriginalFilename();
									
									ItemImage imgEntity = new ItemImage();
								    // imgEntity.setImage_no(0);
									imgEntity.setItem_no(newItem.getItem_no());
									imgEntity.setItem_img(file6);
									log.info("images insert 성공! 상품 번호: " + iservice.save(imgEntity));
								}
							}
	
						}
						model.addAttribute("message", "상품 등록 성공, 상품 번호: " + newItem.getItem_no());
						
						
					} // sizes 반복문 끝
				} // colors 반복문 끝
			}
			
		} catch (Exception e) {
			log.info("insert Exception: " + e.toString());
			model.addAttribute("message", "상품 등록 실패");
		}
		
		

		return uri;
	}

	// ======== 상품 정보 수정 =======
	
	@GetMapping(value = "/itemupdate")
	public String itemUpdate(Item entity, Model model) {
		List<String> itemSizes = cservice.selectSizes();
		List<String> itemColors = cservice.selectColors();
		model.addAttribute("itemSizes", itemSizes);
		model.addAttribute("itemColors", itemColors);
		model.addAttribute("itemDetail", service.selectOne(entity.getItem_no()));
		model.addAttribute("itemImages", iservice.findByItemNo(entity.getItem_no()));
		
		return "item/itemUpdate";
	}

	@PostMapping(value = "/update")
	public String update(Item entity, Model model, @RequestParam(value = "selectedImages", required = false) List<Long> selectedImages,
	        @RequestParam("etcImages") MultipartFile[] images) throws IOException {

		String uri = "redirect:/";

	    // 이미지 수정
	    String realPath = "D:\\teamproject\\dandog_pjt\\dandog\\src\\main\\react_pjt\\public\\images\\item\\";

	    // 업로드된 첫번째 이미지 처리
	    handleUploadedFile(entity.getUploadfileF1(), realPath, entity::setItem_img1);
	    // 업로드된 두번째 이미지 처리
	    handleUploadedFile(entity.getUploadfileF2(), realPath, entity::setItem_img2);
	    
	    
	    try {
	        log.info("insert 성공! 상품 번호: " + service.save(entity));
	        model.addAttribute("message", "상품 수정 성공");
	    } catch (Exception e) {
	        log.info("insert Exception: " + e.toString());
	        model.addAttribute("message", "상품 수정 실패");
	        uri = "item/itemUpdate";
	    }

		
	 // 기존에 속한 이미지 중에서 선택되지 않은 이미지 삭제
	    if (selectedImages != null && !selectedImages.isEmpty()) {
	        // 기존에 속한 모든 이미지 번호를 가져오는 로직 (예: service.getAllImageNumbersByItemNo(entity.getItem_no()))
	        List<Integer> allImageNumbers = iservice.getAllImageNumbersByItemNo(entity.getItem_no());

	        // 선택된 이미지를 제외한 나머지 이미지를 삭제
	        allImageNumbers.stream()
	                .filter(imageNo -> !selectedImages.contains(imageNo.intValue()))
	                .forEach(imageNo -> {
	                    iservice.delete(imageNo.intValue());
	                });
	    }

	    
	    // 새로 추가된 이미지 처리
	    for (MultipartFile img : images) {
	        if (img != null && !img.isEmpty()) {
	            String file5 = realPath + img.getOriginalFilename();
	            img.transferTo(new File(file5));

	            String file6 = img.getOriginalFilename();

	            ItemImage imgEntity = new ItemImage();
	            imgEntity.setItem_no(entity.getItem_no());
	            imgEntity.setItem_img(file6);
	            log.info("images insert 성공! 상품 번호: " + iservice.save(imgEntity));
	        }
	    }
		
		
		return uri;
	} //update
	
    private void handleUploadedFile(MultipartFile file, String realPath, Consumer<String> setItemImg) throws IOException {
    	if (file != null && !file.isEmpty()) {
    		String filePath = realPath + file.getOriginalFilename();
    		file.transferTo(new File(filePath));
    		setItemImg.accept(file.getOriginalFilename());
    	}
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
