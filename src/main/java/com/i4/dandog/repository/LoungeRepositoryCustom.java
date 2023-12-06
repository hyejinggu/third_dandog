package com.i4.dandog.repository;

import java.util.List;

import com.i4.dandog.entity.Lounge;

public interface LoungeRepositoryCustom {
	List<Lounge> findByDynamicQuery(String category, String inputValue, String filterValue, String sort);
}
