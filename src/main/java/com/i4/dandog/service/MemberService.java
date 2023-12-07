package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

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
	String withdraw(String user_id);

	// ** update
	void update(Member entity);

	// React에서 받은 데이터 처리
	void processData(Member member);

	// ** id 중복체크
	boolean isIdDuplicate(String user_id);

	// ** 관리자 delete
	String deleteById(String user_id);

	// ** 관리자 Search
//	List<Member> searchMembers(String searchField, String searchValue);
	List<Member> searchMembersId(String searchValue);
	List<Member> searchMembersName(String searchValue);

	// ** 결제페이지 userinfo
	List<Member> getuserinfoForUser(String user_id);
	
	// ** 결제페이지 기본배송지
	void updateAddress(String user_id, String user_address1, String user_address2, int post_code);

}