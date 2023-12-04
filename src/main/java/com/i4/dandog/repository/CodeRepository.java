package com.i4.dandog.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.i4.dandog.entity.Code;

public interface CodeRepository extends JpaRepository<Code, Integer> {

	@Query("select distinct code_name from Code")
	public List<String> selectCodeName();
}

