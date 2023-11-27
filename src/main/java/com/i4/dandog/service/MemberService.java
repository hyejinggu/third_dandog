package com.i4.dandog.service;
import java.util.List;

import com.i4.dandog.entity.Member;
public interface MemberService {
	

	// ** selectList
	List<Member> selectList();

	// ** selectOne
	Member selectOne(String id);

	// ** insert, update
	String save(Member dto);

	// ** delete
	String delete(String id);

}