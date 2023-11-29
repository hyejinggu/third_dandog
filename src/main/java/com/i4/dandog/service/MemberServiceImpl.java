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
		// React에서 받은 데이터 처리 로직 추가

		// 예를 들어, 받은 데이터를 회원 엔터티에 저장하고 저장하는 로직을 추가할 수 있습니다.
		// 이는 실제 사용에 맞게 수정하셔야 합니다.

		// 데이터베이스에 저장할 수 있도록 Member 엔터티에 필요한 필드들을 채워넣습니다.
		Member newMember = new Member();
		newMember.setUser_name(member.getUser_name());
		newMember.setUser_birthday(member.getUser_birthday());
		newMember.setUser_phonenum(member.getUser_phonenum());
		newMember.setUser_email(member.getUser_email());

		// MemberRepository를 사용하여 데이터베이스에 저장
		repository.save(newMember);
	}

} // class
