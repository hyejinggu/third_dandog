package com.i4.dandog.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.Cart;
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
    public Cart save(Cart entity) {
        return repository.save(entity);
    }
}
