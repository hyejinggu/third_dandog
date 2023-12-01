package com.i4.dandog.restController;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.entity.Member;
import com.i4.dandog.service.MemberService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/member")
@Log4j2
@AllArgsConstructor
public class MemberRestController {

	private final MemberService memberService;
	private final PasswordEncoder passwordEncoder;

	@GetMapping("/idDupCheck")
	public ResponseEntity<String> idDupCheck(@RequestParam String user_id) {
		try {
			boolean isDuplicate = memberService.isIdDuplicate(user_id);

			if (isDuplicate) {
				// 중복된 아이디인 경우
				return ResponseEntity.ok("Duplicate");
			} else {
				// 중복되지 않은 경우
				return ResponseEntity.ok("NotDuplicate");
			}
		} catch (Exception e) {
			log.error("Error checking ID duplication", e);
			// 오류 발생 시
			return ResponseEntity.status(500).body("Error checking ID duplication");
		}
	}

	@GetMapping("/detailRest")
	public ResponseEntity<Member> getMemberDetails(@RequestParam String user_id) {
		Member member = memberService.selectOne(user_id);
		return ResponseEntity.ok(member);
	}

	 @PostMapping("/updateRest")
	    public ResponseEntity<String> memberUpdateProfile(@RequestBody Member entity) {
	        try {
	            // Password는 수정하지 않도록 체크
	            Member existingMember = memberService.selectOne(entity.getUser_id());

	            if (existingMember != null) {
	                // 기존 멤버 정보에서 password를 가져옴
	            	entity.setUser_password(existingMember.getUser_password());
	            }

	            // 멤버 정보 업데이트
	            memberService.update(entity);

	            return ResponseEntity.ok("Member updated successfully");
	        } catch (Exception e) {
	            log.error("Error updating member details", e);
	            return ResponseEntity.status(500).body("Error updating member details");
	        }
	    }

	@PostMapping("/join") // 엔드포인트 경로 수정
	public ResponseEntity<String> receiveData(@RequestBody Member request) {

		// ** PasswordEncoder (암호화 적용)
		request.setUser_password(passwordEncoder.encode(request.getUser_password()));
		// @RequestBody 추가
		try {
			log.info("Received data from React: {}", request);

			// 받아온 데이터를 서비스를 통해 처리
			memberService.processData(request);

			// 성공적인 응답
			return ResponseEntity.ok("Data received successfully");
		} catch (Exception e) {
			log.error("Error processing data from React", e);
			// 실패한 응답
			return ResponseEntity.status(500).body("Error processing data");
		}
	}

	@PostMapping("/login")
	public String login(@RequestBody Member request) {
		try {
			String id = request.getUser_id();
			String password = request.getUser_password();

			// 가정: username에 해당하는 Member 정보를 가져옴
			Member member = memberService.selectOne(id);

			if (member != null && passwordEncoder.matches(password, member.getUser_password())) {
				// 패스워드가 일치하는 경우
				return id;
			} else {
				// 패스워드가 일치하지 않는 경우
				return "0";
			}

		} catch (Exception e) {
			log.error("Error processing data from React", e);
			// 실패한 응답
			return "Error processing data";
		}
	}

}
