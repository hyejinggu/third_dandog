package com.i4.dandog.restController;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.i4.dandog.entity.Qna;
import com.i4.dandog.service.QnaService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/qnar")
@Log4j2
@AllArgsConstructor
public class QnaRestController {

	QnaService qservice;
	
	// ** QnaList
	@PostMapping (value="/qnaList")
	public List<Qna> qnalist(Model model) {
		System.out.println("** QnaList **");
		return qservice.selectList();
	}

	
	@PostMapping (value="/createQuestion1") // 검색버튼 옆 조회할때 필요함. value 이름 달라야 됨
	public List<Qna> createQuestion1(Qna entity)  {
		System.out.println("** createQuestion1 => " + entity);
		
//		List<Qna> questions; 
//		
//		switch (qna_category) {
//			case "OP":
//				questions = qservice.findByCategory("OP"); // 주문/결제 Order/Payment
//				break;
//			case "S":
//				questions = qservice.findByCategory("S"); // 배송 Shipping
//				break;
//			case "CR":
//				questions = qservice.findByCategory("CR"); // 취소/반품 Cancellation/Return
//				break;
//			case "EA":
//				questions = qservice.findByCategory("EA"); // 교환/AS  Exchange/As
//				break;
//			case "M":
//				questions = qservice.findByCategory("M"); // 회원 Member
//				break;
//			case "PE":
//				questions = qservice.findByCategory("PE"); // 적립금/이벤트  Point/Event
//				break;	
//			case "E":
//				questions = qservice.findByCategory("E"); // 기타
//				break;	
//			default:
//				questions = qservice.findByCategory("OP"); 
//		}
		return null;
	}
	
	//
	@PostMapping("/createQuestion")
	public String creatQuestion(Model model, Qna entity) throws Exception { //이미지사용할때
		
		System.out.println("** createQuestion  => "+entity);
		
//		// ** MultipartFile ***********************
				//String realPath = "C:\\MTest\\MyWork\\demoJ01\\src\\main\\webapp\\resources\\uploadImages\\";
//				// => 기본 이미지 지정하기
//				String file1, file2="resources/uploadImages/basicman4.png";
//				
//				// => 저장경로 완성
				
				//String file1, file2="resources/uploadImages/basic.jpg";
//				
//				MultipartFile uploadfilef = entity.getQnafile();
//				if ( uploadfilef!=null && !uploadfilef.isEmpty() ) {
////					// => image_File 을 선택함 -> 저장 (저장경로: relaPath+화일명)
////					// 1.3.1) 물리적위치 저장 (file1)
//					file1 = realPath + uploadfilef.getOriginalFilename(); //저장경로 완성 
//					uploadfilef.transferTo(new File(file1)); //해당경로에 저장(붙여넣기)
////					
////					// 1.3.2) Table 저장경로 완성 (file2)
//					file2 = "resources/uploadImages/" + uploadfilef.getOriginalFilename();
//				} // Image 선택한 경우
////				
////				// 1.4) 완성된 경로를 dto 에 set
				//entity.setQna_img(file2);
//		
		try {
			qservice.save(entity);
			model.addAttribute("message", "질문 등록 성공");
			return "질문이 등록되었습니다.";
		} catch (Exception e) {
			log.info("insert Exception: " + e.toString());
			model.addAttribute("message", "질문 등록 실패");
			return "다시 등록해주세요";
		}//try
	}//creatQuestion

				
}//class

