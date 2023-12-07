package com.i4.dandog.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.Cart;
import com.i4.dandog.entity.Code;
import com.i4.dandog.repository.CodeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CodeServiceImpl implements CodeService {
    private final CodeRepository repository;

    @Override
    public List<Code> selectList() {
        return repository.findAll();
    }
    
    @Override
    public List<String> selectCodeName() {
    	return repository.selectCodeName();
    }
    
    
	@Override
	public List<String> selectColors() {
		return repository.selectColors();
	}
	
	@Override
	public List<String> selectSizes() {
		return repository.selectSizes();
	}
    
    @Override
    public Code selectOne(Code entity) {
    	repository.findById(entity.getCode_seq());
    	return entity;
    }

    @Override
    public int save(Code entity) {
		repository.save(entity);
		return entity.getCode_seq();
    }
    
    @Override
    public int deleteById(int code_seq) {
    	repository.deleteById(code_seq);
    	return 1;
    }
}
