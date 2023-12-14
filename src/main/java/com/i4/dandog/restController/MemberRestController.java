package com.i4.dandog.restController;

import java.security.SecureRandom;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.entity.Member;
import com.i4.dandog.service.EmailService;
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
	private final EmailService mailService;

	 @DeleteMapping("/withdraw/{user_id}")
	    public ResponseEntity<String> withdraw(@PathVariable String user_id) {
	        try {
	            // 삭제할 회원이 존재하는지 확인
	            Optional<String> existingMemberId = Optional.ofNullable(memberService.withdraw(user_id));
	            if (!existingMemberId.isPresent()) {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원이 존재하지 않습니다.");
	            }

	            // 회원 삭제
	            return ResponseEntity.ok("회원 탈퇴 성공");
	        } catch (Exception e) {
	            log.error("Error processing member withdrawal request", e);
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 탈퇴 실패");
	        }
	    }
	
	@GetMapping("/detailRest")
	public ResponseEntity<Member> getMemberDetails(@RequestParam String user_id) {
	    Member member = memberService.selectOne(user_id);
	    if (member != null) {
	        return ResponseEntity.ok(member);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }
	}


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


	@PostMapping("/updatePw")
    public ResponseEntity<Boolean> updatePassword(@RequestBody Map<String, String> passwordRequest) {

        String user_id = passwordRequest.get("loginId");
        String orgPassword = passwordRequest.get("orgPassword");
        String newPassword = passwordRequest.get("newPassword");
        
        Member member = memberService.selectOne(user_id);
       
        if (passwordEncoder.matches(orgPassword, member.getUser_password())) {
        	member.setUser_password(passwordEncoder.encode(newPassword));
        	memberService.save(member);
        } else {
        	return ResponseEntity.ok(false);
        }

        return ResponseEntity.ok(true);
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
	
	@PostMapping("/findid")
	public String findId(@RequestBody Map<String, String> findIdRequest) {
		try {
			String user_name = findIdRequest.get("userName");
			String user_phone = findIdRequest.get("userPhone");
			String user_birth = findIdRequest.get("userBirth");
			
			String user_id = memberService.findUserId(user_name, user_phone, user_birth);
			
			return user_id;
			
		} catch (Exception e) {
			log.error("Error processing data", e);
			// 실패한 응답
			return "Error processing data";
		}
	}
	
	
	@PostMapping("/findpw")
	public String findPw(@RequestBody Map<String, String> findIdRequest) {
		try {
			String userId = findIdRequest.get("userId");
			String mailAddress = findIdRequest.get("mailAddress");
			String mailDomain = findIdRequest.get("mailDomain");
			String userBirth = findIdRequest.get("userBirth");
			
			String userEmail = mailAddress + "@" + mailDomain;
			userEmail = memberService.findUserEmail(userId, userEmail, userBirth);
			if (userEmail != null) {
				String randomPw = generateTempKey(8);
				// 생성한 임시 비밀번호를 암호화하여 저장
				Member member = memberService.selectOne(userId);
			    member.setUser_password(passwordEncoder.encode(randomPw));
		        memberService.save(member);
				
				
				// 메일 발송 서비스 실행
				mailService.sendMail(userEmail, userId, randomPw);
				return userEmail + "로 임시 비밀번호를 보냈습니다.";
			} else {
				return "이메일을 다시 확인해주세요.";
			}
			
		} catch (Exception e) {
			log.error("Error processing data", e);
			// 실패한 응답
			return "Error processing data";
		}
	}
	
    public static String generateTempKey(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder tempKey = new StringBuilder();

        SecureRandom random = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            tempKey.append(characters.charAt(index));
        }

        return tempKey.toString();
    }
	

}
