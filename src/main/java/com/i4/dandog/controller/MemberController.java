package com.i4.dandog.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.i4.dandog.entity.Member;
import com.i4.dandog.service.MemberService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/member")
@Log4j2 // @Log4j -> Boot 에서는 2015년 이후 지원중단
@AllArgsConstructor // 모든 맴버변수 생성자 주입하므로 각각 @Autowired 할 필요없음
public class MemberController {

	MemberService service;
	PasswordEncoder passwordEncoder;

	// ** MemberList
	@GetMapping("/memberList")
	public void memberList(Model model) {
		model.addAttribute("memberList", service.selectList());
		log.info("** MemberList 성공 **");
	}

	// ** MemberDetail
	@GetMapping(value ="/mdetail")
	public String mdetail(HttpServletRequest request, Model model, Member dto) {
		model.addAttribute("apple", service.selectOne(dto));
		
		if ( "U".equals(request.getParameter("jCode")) )
			 return "member/memberUpdate";
		else return "member/memberDetail";
	} //mdetail

	// ** Member Update
	@PostMapping(value = "/mupdate")
	public String memberUpdte(HttpServletRequest request, Member dto, Model model) throws IOException {

		// => 처리결과에 따른 화면 출력을 위해서 memberDTO 의 값을 Attribute에 보관
		model.addAttribute("apple", dto);
		String uri = "member/memberDetail";

		// ** password 수정과 나머지 컬럼 수정을 분리
		// => mapper 에서 이것을 구분 하할 수 있도록 password 값을 null 로
		dto.setUser_password(null);

		// => Service 처리
		if (!"0".equals(service.update(dto))) {
			model.addAttribute("message", "회원정보 수정 성공");
		} else {
			model.addAttribute("message", "회원정보 수정 실패 다시 실행해주세요.");
			uri = "member/memberUpdate";
		}
		return uri;
	} // memberUpdte

	// ** Member Delete: 회원탈퇴
//	@GetMapping(value="/mdelete")
//	public String mdelete(HttpSession session, Member dto, Model model, RedirectAttributes rttr) {
//		
//		// 1) 본인탈퇴
//		// 결과 : message(삭제 성공/실패), home.jsp, session 무효화 
//		
//		// 2) 관리자에 의한 강제탈퇴
//		// 결과 : message(삭제 성공/실패), memberList.jsp
//		
//		// => 본인탈퇴 or 관리자에 의한 강제탈퇴 구분이 필요
//		//	  dto 의 id 와 session 의 loginID 와 같으면 본인탈퇴,
//		//    다르면서 session 의 loginID 값이 "admin" 이면 강제탈퇴
//		String uri = "redirect:/home";
//		
//		if ( service.delete(dto.getUser_id()) > 0 ) {
//			 rttr.addFlashAttribute("message", "~~ 탈퇴 성공!! 1개월후 재가입 가능 합니다 ~~") ;	
//			 if ( ((String)session.getAttribute("loginID")).equals("admin") ) {
//				 // => 관리자에 의한 강제탈퇴
//				 uri="redirect:memberList";
//			 }else {
//				 // => 본인탈퇴
//				 session.invalidate();
//			 }
//		}else {
//			rttr.addFlashAttribute("message", "~~ 탈퇴 실패 ~~");
//		}
//		return uri;
//	} // mdelete
}