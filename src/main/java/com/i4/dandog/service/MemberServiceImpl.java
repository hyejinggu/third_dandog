package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.i4.dandog.entity.Item;
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

	// ** delete (withdraw)
	@Override
	public String withdraw(String user_id) {
		Optional<Member> existingMember = repository.findById(user_id);
		if (existingMember.isPresent()) {
			repository.updateWithdraw(user_id);
			return user_id;
		} else {
			return "삭제할 회원이 존재하지 않습니다.";
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

	// ** 관리자 delete
	@Override
	public String deleteById(String user_id) {
		repository.deleteById(user_id);
		return user_id;
	}

    // ** 관리자 Search
//    @Override
//    public List<Member> searchMembers(String searchField, String searchValue) {
//        return repository.searchMembers(searchField, searchValue);
//    }
	@Override
	public List<Member> searchMembersName(String searchValue) {
		return repository.searchMembersName(searchValue);
	}
	@Override
	public List<Member> searchMembersId(String searchValue) {
		return repository.searchMembersId(searchValue);
	}
    

	// ** 결제페이지 userinfo
	@Override
	public List<Member> getuserinfoForUser(String user_id) {
		return repository.findByUser_id(user_id);
	}
	
	// ** 결제페이지 기본배송지
	@Override
    public void updateAddress(String user_id, String user_address1, String user_address2, int post_code) {
        Optional<Member> existingMember = repository.findById(user_id);

        if (existingMember.isPresent()) {
            Member member = existingMember.get();

            // 주소 정보 설정
            member.setUser_address1(user_address1);
            member.setUser_address2(user_address2);
            member.setPost_code(post_code);

            // 저장
            repository.save(member);
        } else {
            // 해당 user_id를 가진 Member가 없는 경우 예외처리 또는 다른 로직을 수행
        }
    }
	
	@Override
	public 	void pointUpdate(String user_id, int point) {
		repository.pointUpdate(user_id, point);
	}
	
} // class
