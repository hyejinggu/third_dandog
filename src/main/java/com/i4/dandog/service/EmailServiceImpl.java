package com.i4.dandog.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender sender;

    @Value("${spring.mail.username}")
    private String fromAddress;

    @Override
    public void sendMail(String userEmail, String userId, String randomPw) {
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

        try {
            helper.setFrom(fromAddress);
            helper.setTo(userEmail);
            helper.setSubject("[DANDOG 커뮤니티 임시 비밀번호 입니다.]");

            String htmlContent = "<h1>임시비밀번호 발급</h1>" +
                    "<br/>" + userId + "님 " +
                    "<br/>비밀번호 찾기를 통한 임시 비밀번호입니다." +
                    "<br/>임시비밀번호 :   <h2>" + randomPw + "</h2>" +
                    "<br/>로그인 후 비밀번호 변경을 해주세요." +
                    "<a href='http://localhost:3000/login'>로그인 페이지</a>";

            helper.setText(htmlContent, true);

            sender.send(message);
        } catch (MessagingException e) {
            // 예외 처리
            e.printStackTrace();
        }
    }
}
