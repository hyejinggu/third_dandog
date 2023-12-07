package com.i4.dandog.controller;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	// 검색 결과를 가져오는 메소드
	@PostMapping("/memberList")
	public void memberSearch(Model model, @RequestParam(name = "search_field", required = false) String searchField,
			@RequestParam(name = "search_value", required = false) String searchValue) {
		if (searchField != null && searchValue != null) {
			// 검색 로직 실행
			List<Member> searchResult = service.searchMembers(searchField, searchValue);
			model.addAttribute("memberList", searchResult);
		} else {
			// 전체 멤버 리스트 조회
			model.addAttribute("memberList", service.selectList());
		}
		log.info("** MemberSearch 성공 **");
	}

	// ** MemberList
	@GetMapping("/memberList")
	public void memberList(Model model) {
		model.addAttribute("memberList", service.selectList());
		log.info("** MemberList 성공 **");
	}

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

	// Member 삭제
	@GetMapping("/delete")
	public String delete(Model model, @RequestParam(name = "user_id") String user_id) {
		service.deleteById(user_id);
		return "/member/memberList";
	}
}