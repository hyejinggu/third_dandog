package com.i4.dandog.service;
import java.util.List;

import com.i4.dandog.entity.Code;
public interface CodeService {
	

	// ** selectList
	List<Code> selectList();

	List<String> selectCodeName();
	
	// ** selectOne
	public Code selectOne(Code entity);

	// ** insert, update
	int save(Code entity);

	// ** delete
	int deleteById(int code_seq);



}