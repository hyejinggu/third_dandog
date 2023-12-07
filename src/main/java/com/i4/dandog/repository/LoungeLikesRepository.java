package com.i4.dandog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.i4.dandog.entity.LoungeLikes;
import com.i4.dandog.entity.LoungeLikesKeyId;

public interface LoungeLikesRepository extends JpaRepository<LoungeLikes, LoungeLikesKeyId> {
	
}
