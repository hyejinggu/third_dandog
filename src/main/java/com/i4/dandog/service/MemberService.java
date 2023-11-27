package com.i4.dandog.service;
import java.util.List;

import org.springframework.ui.Model;

import com.i4.dandog.entity.Member;
public interface MemberService {
	

	// ** selectList
	List<Member> selectList();

	// ** selectOne
	Member selectOne(Member dto);

	// ** insert, update
	String save(Member dto);

	// ** delete
	String delete(Member dto);

	// ** update
	String update(Member dto);





}