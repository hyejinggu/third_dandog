package com.i4.dandog.restController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.i4.dandog.entity.Member;
import com.i4.dandog.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/join")
@Log4j2
@AllArgsConstructor
public class JoinAgreeRestController {

    private final MemberService memberService;

    @PostMapping("/details")  // 엔드포인트 경로 수정
    public ResponseEntity<String> receiveData(@RequestBody Member request) {  // @RequestBody 추가
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
}