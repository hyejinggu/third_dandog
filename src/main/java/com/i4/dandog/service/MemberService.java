package com.i4.dandog.service;
import java.util.List;

import org.springframework.ui.Model;

import com.i4.dandog.entity.Member;
public interface MemberService {
	

	// ** selectList
	List<Member> selectList();

	// ** selectOne
	Member selectOne(String user_id);

	// ** insert, update
	String save(Member entity);

	// ** delete
	String delete(String user_id);

	// ** update
	void update(Member entity);

	// React에서 받은 데이터 처리
    void processData(Member member);

    // ** id 중복체크
    boolean isIdDuplicate(String user_id);



}