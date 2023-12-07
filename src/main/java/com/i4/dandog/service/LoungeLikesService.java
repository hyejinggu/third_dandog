package com.i4.dandog.service;

import com.i4.dandog.entity.LoungeLikes;
import com.i4.dandog.entity.LoungeLikesKeyId;

public interface LoungeLikesService {
	// insert
	void insert(LoungeLikes entity);
	
	// selectOne
	LoungeLikes selectOne(LoungeLikesKeyId keyId);

}
