package com.i4.dandog.controller;

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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.i4.dandog.entity.Faq;
import com.i4.dandog.entity.Member;
import com.i4.dandog.service.FaqService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor // @Autowired 를 사용하지 않아도 됨
@RequestMapping(value="/faq") // "/~" 로 시작하는 모든 요청을 처리
@Controller
@Log4j2
public class FaqController {
	
	FaqService fservice;
//	
//	// ** Board_Cri_paging
////	@GetMapping("/qcriList")
////	public void qcriList(Model model, SearchCriteria cri, PageMaker pageMaker) {
////		// 1) Criteria 처리
////		// => ver01: currPage, rowsPerPage 값들은 Parameter 로 전달되어 자동으로 cri에 set
////		// => ver02: ver01 + searchType, keyword 도 동일하게 cri 에 set
////		cri.setSnoEno();   // 이미 Criteria.java 에 이미 입력되있어서 이것만 쓰면 됨
////		
////		// 2) Service 처리
////		// => ver01, ver02 모두 같은 서비스를 사용
////		//    단, mapper interface 에서 사용하는 Sql 구문만 변경해서 사용
////		//    BoardMapper 에 SQL 구문 추가, interface 수정
////		model.addAttribute("banana", service.qcriList(cri));
////		
////		// 3) View 처리 : PageMaker 필요
////		// => cri, totalRowsCount(DB 에서 Read)
////		pageMaker.setCri(cri);
////		pageMaker.setTotalRowsCount(service.criTotalCount(cri)); 
////		// => ver01: 전체 rows 갯수
////		// => ver02: 검색조건에 해당하는 rows 갯수
////		model.addAttribute("pageMaker", pageMaker);
////		
////	}
//	
//	// ** replyInsert
//	// => replyInsert Form 출력메서드
//	//    bdetail 화면에서 요청시 쿼리스트링으로 보낸 부모그의 root, step, indent 를 
//	//	  replyInsert Form 으로 전달
//	// => replyInsert Form 에서는 이값들을 hidden 으로 숨겨놓음( rinsert 위해 필요함)
//	
//	// => 매핑메서드의 인자로 정의된 dto 는 request.setAttribute 와 동일 scope
//	//    그러므로 response 출력 전까지는 사용가능
//	//    단, 클래스명의 첫글자를 소문자로 ...  ${boardDTO.root}
//	//      그러므로 아래와같은 구문은 필요없음.
//	//     model.addAttribute("apple", dto);
	
//	@PostMapping(value="/fcontentinsert")
//	public String fcontentinsert(Faq entity) {
//		
//		fservice.fcontentinsert(entity.getFaq_seq(), entity.getFaq_content());
//		String uri="redirect:faqList";
//		return uri;
//	}
	
//	
	// ** FaqList
	@GetMapping (value="/faqList")
	public void faqlist(Model model) {
		System.out.println("** FaqList **");
		model.addAttribute("faqi", fservice.findAllDesc());
	}
//	
//   // ** BoardDetail
//   // => 조회수 증가 조건
//   //   -> 글보는이(loginID)와 글쓴이가 다를때 
//   //   -> 글보는이(loginID)가 "admin" 이 아닌경우 
//   //   -> 수정요청이 아닌경우
//   // => 조회수 증가 처리 
//   //   -> Table 의 cnt=cnt+1
//   //   -> Update 메서드 활용
//   //      - mapper 의 xml 수정 (Mybatis)
//   //      - bUpdateForm 에서 cnt값 전달 가능하도록 수정
//
//	// ** BoardDetail
//	//@RequestMapping(value = "/bdetail", method=RequestMethod.GET)
	@GetMapping(value = "/fdetail")
	public String fdetail(HttpServletRequest request, Model model, Faq entity) {
//		// 1) Detail Service 처리
//		//dto.setId("검색id");
		entity = fservice.selectOne(entity.getFaq_seq());
//		
//		// 2) 조회수 증가
//		// => get loginID
//		String loginID = (String)request.getSession().getAttribute("loginID");
//		
//		// => 조회수 증가 조건
//		if (!"admin".equals(loginID) &&
//			! entity.getUser_id().equals(loginID) &&
//			! "U".equals(request.getParameter("jCode"))) {
//			// => 조회수 증가 처리
//			entity.setQna_view(entity.getQna_view()+1);
//			service.save(entity);
//		}
//		
//		// 3) view 처리
//		// => 글 수정화면 요청인 경우 구분
		model.addAttribute("faqi", entity);
//		//if (request.getParameter("jCode").equals("U"))
		if ("U".equals(request.getParameter("jCode")))	
			return  "faq/faqUpdate";
		else return "faq/faqDetail";
	} //fdetail
//	
//	// ** 새글등록: insert
	@GetMapping(value="/faqInsert")
	public void faqInsert() {
//		// viewName 생략 -> 요청명이 viewName 이 됨
	}
//	
//	// => Insert Service 처리: POST
//	//@RequestMapping(value="/join", method=RequestMethod.POST)    // home.jsp 에 저장된 변수값 참고
	@PostMapping(value="/finsert")
	public String finsert(Faq entity, Model model, RedirectAttributes rttr) {
//	      // 1. 요청분석 & Service
//	      // => 성공: boardList
//	      // => 실패: 재입력 유도 (입력폼 으로, board/boardInsert.jsp)
		String uri="redirect:faqList"; // 성공
//		
//		// 2. Service 처리
		if (fservice.save(entity)>0) {
			rttr.addFlashAttribute("message", "~ 새글등록 성공!! ~");
		}else {
			model.addAttribute("message", "~ 새글등록 실패!! 다시 하세요 ~");
			uri="faq/faqInsert";
		}
//		
//		// 3. View
		return uri; //"" 안에 쓰면 그 파일을 views 에서 이 파일명을 찾으므로 이 주소의 파일로 가게 하려면 ""없이 써야함
	} //Join_Post
//	
//	// ** Board Update // 글 수정. 폼 떠야함
//	// => 성공: boardDetail
//	// => 실패: boardUpdate
	@PostMapping(value="/fupdate")
	public String fUpdate(Faq entity, Model model) {
//		
//		// => 처리결과에 따른 화면출력을 위해서 dto 의 값을 Attribute 에 보관
		model.addAttribute("faqi", entity);
		String uri="faq/faqDetail";
//		
//		// => Service 처리
		if (fservice.save(entity) > 0) {
			model.addAttribute("message", "~ 글 수정 성공 ~");
		}else {
			model.addAttribute("message", "~ 글 수정 실패! 다시 하세요 ~");
			uri="faq/faqUpdate";
		}
		return uri;
	} // qUpdate
//	
//	// ** Board Delete: 글 삭제
//	@GetMapping(value="/qdelete")
//	public String qdelete(Qna entity, Model model, RedirectAttributes rttr) {
//		
//		String uri = "redirect:qnaList";
//		
//		if (service.delete(entity.getQna_seq())>0) {
//			rttr.addFlashAttribute("message", "~ 글삭제 성공! ~");
//		}else {
//				rttr.addFlashAttribute("message", "~ 글삭제 실패! ~");
//			}
//		return uri;
//	} // qdelete
//}

// ======== 글 삭제 =======
	@PostMapping(value = "/fdelete", consumes = MediaType.APPLICATION_JSON_VALUE)
	public String fdelete(@RequestBody Map<String, List<String>> requestMap, Model model) {
	    try {
	        List<String> valueArr = requestMap.get("valueArr");
	        if (valueArr != null) {
	            log.info("** " + valueArr.size());
	            for (String faq_seq : valueArr) {
	                fservice.fdelete(Integer.parseInt(faq_seq));                
	                log.info("delete 성공! 질문 글번호: " + faq_seq);
	            }
	            model.addAttribute("message", "글 삭제 성공");            
	        } else {
	            model.addAttribute("message", "삭제하실 글을 선택하세요.");
	        }
			
		} catch (Exception e) {
			log.info("** delete Exception => "+e.toString());
			model.addAttribute("message", "글 삭제 실패");
		}
		
	    return "redirect:faqList";
	} // delete
}//class
