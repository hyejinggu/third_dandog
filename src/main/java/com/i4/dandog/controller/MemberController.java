package com.i4.dandog.controller;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
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
	@GetMapping(value = "/mdetail")
	public String mdetail(HttpServletRequest request, Model model, Member entity) {
		model.addAttribute("apple", service.selectOne(entity.getUser_id()));

		if ("U".equals(request.getParameter("jCode")))
			return "member/memberUpdate";
		else
			return "member/memberDetail";
	} // mdetail

	// ** MemberJoin
	@PostMapping("/details")
	public String join(@RequestBody Member entity, Model model) {

		try {
			service.save(entity);
			model.addAttribute("message", "회원가입 성공");
			return "성공";

		} catch (Exception e) {
			log.info("insert Exception: " + e.toString());
			model.addAttribute("message", "회원가입 실패");
			return "실패냐!!";
		}
	}

	// ** Member Update
	@PostMapping(value="/update")
	public String memberUpdate(HttpSession session,
							  Member entity, Model model) throws IOException {
		
		model.addAttribute("apple", entity);
		String uri="join/Details";
		
		// ** password는 수정불가
		
		try {
			log.info("** update 성공 id => "+service.save(entity));
			session.setAttribute("loginName", entity.getUser_name());

			model.addAttribute("message", "회원정보가 수정되었습니다.");
		} catch (Exception e) {
			log.info("** update Exception => "+e.toString());
			model.addAttribute("message", "회원정보 수정이 실패하였습니다.");
			uri="mypage/UpdateProfile";
		}
		
		return uri;
	} //memberUpdte

	// ** Member Delete: 회원탈퇴
	@PostMapping(value = "/delete")
	public String delete(HttpSession session, Member entity, Model model, RedirectAttributes rttr) {

		// 1) 본인탈퇴
		// 결과 : message(삭제 성공/실패), home.jsp, session 무효화

		// 2) 관리자에 의한 강제탈퇴
		// 결과 : message(삭제 성공/실패), memberList.jsp

		// => 본인탈퇴 or 관리자에 의한 강제탈퇴 구분이 필요
		// entity 의 id 와 session 의 loginID 와 같으면 본인탈퇴,
		// 다르면서 session 의 loginID 값이 "admin" 이면 강제탈퇴
		String uri = "redirect:/home";

		try {
			log.info("** delete 성공 id => " + service.delete(entity.getUser_id()));
			rttr.addFlashAttribute("message", "~~ 탈퇴 성공!! 1개월후 재가입 가능 합니다 ~~");
//			if (((String) session.getAttribute("loginID")).equals("admin")) {
//				// => 관리자에 의한 강제탈퇴 : memberList.jsp
//				uri = "redirect:memberList";
//			} else {
//				// => 본인탈퇴 : home.jsp, session 무효화
//				session.invalidate();
//			}
		} catch (Exception e) {
			log.info("** delete Exception => " + e.toString());
			rttr.addFlashAttribute("message", "~~ 탈퇴 실패 ~~");
		}

		return uri;
	} 
}