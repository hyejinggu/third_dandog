package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.i4.dandog.entity.Member;
import com.i4.dandog.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

	private final MemberRepository repository;

	// ** id 중복확인
	@Override
	public boolean isIdDuplicate(String user_id) {
		return repository.existsById(user_id);
	}

	// ** selectList
	@Override
	public List<Member> selectList() {
		return repository.findAll();
	}

	// ** selectOne
	@Override
	public Member selectOne(String user_id) {
		Optional<Member> result = repository.findById(user_id);
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

	@Override
	public String delete(String user_id) {
	    try {
	        repository.deleteById(user_id);
	        return user_id; // 삭제 후 key return
	    } catch (EmptyResultDataAccessException e) {
	        // 특별한 동작이 필요하지 않은 경우, 예외를 그대로 전파하지 않고 처리할 수 있습니다.
	        // 예를 들어, 삭제할 회원이 존재하지 않으면 그냥 삭제되었다고 간주할 수 있습니다.
	        // 또는 다른 동작이 필요하다면 해당 동작을 수행하고 그에 맞는 응답을 반환할 수 있습니다.
	        return "회원이 존재하지 않아 삭제되지 않았습니다.";
	    } catch (Exception e) {
	        throw new RuntimeException("회원 삭제 중 오류가 발생했습니다.", e);
	    }
	}

	// ** update
	@Override
	public void update(Member entity) {
		repository.save(entity);
	}

	// ** join
	@Override
	public void processData(Member member) {
		repository.save(member);
	}

} // class
