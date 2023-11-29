package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.i4.dandog.entity.Member;
import com.i4.dandog.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

	private final MemberRepository repository;

	// ** selectList
	@Override
	public List<Member> selectList() {
		return repository.findAll();
	}

	// ** selectOne
	@Override
	public Member selectOne(Member dto) {
		Optional<Member> result = repository.findById(dto.getUser_id());
		if (result.isPresent())
			return result.get();
		else
			return null;
	}

	// ** insert, update
	@Override
	public String save(Member entity) {
		repository.save(entity); // 저장 또는 수정
		return entity.getUser_id(); // 저장후 key return
	}

	// ** delete
	@Override
	public String delete(Member dto) {
		repository.deleteById(dto.getUser_id());
		return dto.getUser_id(); // 삭제후 key return
	}

	// ** update
	@Override
	public String update(Member dto) {
		return dto.getUser_id();
	}

	// ** join
	@Override
	public void processData(Member member) {


		// MemberRepository를 사용하여 데이터베이스에 저장
		repository.save(member);
	}

} // class
