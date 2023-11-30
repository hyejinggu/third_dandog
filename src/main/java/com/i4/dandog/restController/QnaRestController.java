package com.i4.dandog.restController;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.entity.Qna;
import com.i4.dandog.service.QnaService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/qna")
@Log4j2
@AllArgsConstructor
public class QnaRestController {

	QnaService qservice;
	
	public List<Qna> Qna(@RequestParam(name = "category") String category) {
		System.out.println("**" + category + "question");
		
		List<Qna> questions;
		
		switch (category) {
			case "OP":
				questions = qservice.findByCategory("OP"); // 주문/결제 Order/Payment
				break;
			case "S":
				questions = qservice.findByCategory("S"); // 배송 Shipping
				break;
			case "CR":
				questions = qservice.findByCategory("CR"); // 취소/반품 Cancellation/Return
				break;
			case "EA":
				questions = qservice.findByCategory("EA"); // 교환/AS  Exchange/As
				break;
			case "M":
				questions = qservice.findByCategory("M"); // 회원 Member
				break;
			case "PE":
				questions = qservice.findByCategory("PE"); // 적립금/이벤트  Point/Event
				break;	
			case "E":
				questions = qservice.findByCategory("E"); // 기타
				break;	
			default:
				questions = qservice.findByCategory("OP"); 
		}
		return questions;
	}
	
	//
	@PostMapping("/creatQuestion")
	public String creatQuestion(Model model, @RequestBody Qna entity) {
		
		try {
			qservice.save(entity);
			model.addAttribute("message", "질문 등록 성공");
			return "질문이 등록되었습니다.";
		} catch (Exception e) {
			log.info("insert Exception: " + e.toString());
			model.addAttribute("message", "질문 등록 실패");
			return "다시 등록해주세요";
		}
	}
}

