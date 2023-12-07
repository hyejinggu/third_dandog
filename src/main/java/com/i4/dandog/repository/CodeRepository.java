package com.i4.dandog.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.i4.dandog.entity.Code;

public interface CodeRepository extends JpaRepository<Code, Integer> {

	@Query("select distinct code_name from Code")
	public List<String> selectCodeName();
	
	@Query("select code_value from Code where code_name = 'color'")
	public List<String> selectColors();
	
	
	@Query("select code_value from Code where code_name = 'size'")
	public List<String> selectSizes();
	
	
}

