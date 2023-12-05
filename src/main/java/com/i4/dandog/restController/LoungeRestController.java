package com.i4.dandog.restController;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.i4.dandog.entity.Item;
import com.i4.dandog.entity.Lounge;
import com.i4.dandog.entity.Qna;
import com.i4.dandog.service.LoungeService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/lounge")
@Log4j2
@AllArgsConstructor
public class LoungeRestController {

	LoungeService service;

	@GetMapping("/loungeList")
	public List<Lounge> loungeList(@RequestParam(name = "category") String category, 
			@RequestParam(name = "sort") String sort,
			@RequestParam(name = "filterValue") String filterValue,
			@RequestParam(name = "inputValue") String inputValue
			) {
//		List<Lounge> loungeList; 
//		loungeList = service.findByDynamicQuery(category, inputValue, filterValue, sort);
	    
	    return service.findByDynamicQuery(category, inputValue, filterValue, sort);
	}

	@GetMapping("/updateHits")
	public int updateHits(@RequestParam(name = "lounge_no") String lounge_no) {

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
	public int updateLikes(@RequestParam(name = "lounge_no") String lounge_no) {

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

	@PostMapping("/postUpdate")
	public String postUpdate(Lounge entity) throws IOException {
		String realPath = "D:\\teamproject\\third_dandog\\dandog\\src\\main\\react_pjt\\public\\images\\";
		MultipartFile uploadfilef1 = entity.getLounge_imgf(); // 첫번째 상품 이미지
		if (uploadfilef1 != null && !uploadfilef1.isEmpty()) {
			// 물리적위치 저장 (file1)
			String file1 = realPath + uploadfilef1.getOriginalFilename(); // 저장경로 완성
			uploadfilef1.transferTo(new File(file1)); // 해당경로에 저장(붙여넣기)

			// Table 저장경로 완성 (file2)
			String file2 = uploadfilef1.getOriginalFilename();
			entity.setLounge_img(file2);
		}

		try {
			service.save(entity);
			return "성공";

		} catch (Exception e) {
			log.info("insert Exception: " + e.toString());
			return null;
		}

	}

	@GetMapping("/postDelete")
	public String postDelete(@RequestParam(name = "lounge_no") String lounge_no) {
		int loungeNo = Integer.parseInt(lounge_no);
		try {
			service.delete(loungeNo);
			return "성공";
		} catch (Exception e) {
			log.error("update ERROR lounge likes", e);
			return "실패";
		}
	}

}
