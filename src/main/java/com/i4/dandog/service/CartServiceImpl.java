package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.Cart;
import com.i4.dandog.entity.CartKeyId;
import com.i4.dandog.repository.CartRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository repository;

    @Override
    public List<Cart> selectAll() {
        return repository.findAll();
    }

    @Override
    public Cart selectOne(CartKeyId keyId) {
    	Optional<Cart> result = repository.findById(keyId);
    	if ( result.isPresent() ) return result.get();
    	else return null;
    }
    
    @Override
    public void save(Cart entity) {
    	repository.save(entity);
    }
    
    @Override
    public void dupUpdateQuantity(String user_id, int item_no, int item_quantity) {
    	repository.dupUpdateQuantity(user_id, item_no, item_quantity);
    	
    }
    
    @Override
    public void delete(CartKeyId keyId) {
    	repository.deleteById(keyId);
    	
    }
    
    
    
    
}
