package com.i4.dandog.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.Lounge;
import com.i4.dandog.repository.LoungeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class LoungeServiceImpl implements LoungeService {

    private final LoungeRepository loungeRepository;

    @Override
    public List<Lounge> getAllLounge() {
        return loungeRepository.findAll();
    }

    @Override
    public Lounge selectOne(int lounge_no) {
        return loungeRepository.findById(lounge_no).orElse(null);
    }
    
	@Override
	public String save(Lounge entity) {
		loungeRepository.save(entity); // 저장 또는 수정
        return entity.getUser_id();   // 저장후 key return
	}

    @Override
    public void delete(int lounge_no) {
    	loungeRepository.deleteById(lounge_no);
    }
}
