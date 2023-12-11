package com.i4.dandog.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.i4.dandog.domain.CartDTO;
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
    public void updateOption(String loginId, int originalItemNo, int itemNoToUpdate) {
    	repository.updateOption(originalItemNo, itemNoToUpdate, loginId);
    }
    
    @Override
    public void save(Cart entity) {
    	repository.save(entity);
    }
    
    @Override
    public CartDTO onIncrease(String user_id, int item_no, int item_quantity) {
        repository.onIncrease(user_id, item_no, item_quantity);
        return new CartDTO(user_id, item_no, item_quantity, "item_img1", "item_name", 10000, 10, "OneColor", "F");
    }
    
    @Override
    public CartDTO onDecrease(String user_id, int item_no, int item_quantity) {
        repository.onDecrease(user_id, item_no, item_quantity);
        return new CartDTO(user_id, item_no, item_quantity, "item_img1", "item_name", 10000, 10, "OneColor", "F");
    }
    
    @Override
    public void delete(CartKeyId keyId) {
    	repository.deleteById(keyId);
    	
    }
    

    @Override
    public List<CartDTO> getCartItems(String user_id) {
        return repository.findByUser_id(user_id);
    }
    
    @Override
    public void addToCart(String user_id, int item_no, int item_quantity) {
        Cart cartItem = new Cart();
        cartItem.setUser_id(user_id);
        cartItem.setItem_no(item_no);
        cartItem.setItem_quantity(item_quantity);
        repository.save(cartItem);
    }
   
    
    
}
