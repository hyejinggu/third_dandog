package com.i4.dandog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.i4.dandog.entity.Member;

public interface MemberRepository extends JpaRepository<Member, String> {
}