package com.i4.dandog.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.Lounge;
import com.i4.dandog.entity.LoungeLikes;
import com.i4.dandog.entity.LoungeLikesKeyId;
import com.i4.dandog.entity.Member;
import com.i4.dandog.repository.LoungeLikesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoungeLikesServiceImpl implements LoungeLikesService {
	
	private final LoungeLikesRepository repository;
	
    @Override
    public void insert(LoungeLikes entity) {
        repository.save(entity);
    }
	
	@Override
	public LoungeLikes selectOne(LoungeLikesKeyId keyId) {
		Optional<LoungeLikes> result = repository.findById(keyId);
		if (result.isPresent())
			return result.get();
		else
			return null;
	}
}
