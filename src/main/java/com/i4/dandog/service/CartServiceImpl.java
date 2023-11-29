//package com.i4.dandog.service;
//
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.i4.dandog.entity.Cart;
//import com.i4.dandog.entity.Item;
//import com.i4.dandog.repository.CartRepository;
//import com.i4.dandog.repository.ItemRepository;
//
//import lombok.RequiredArgsConstructor;
//
//@Service
//public class CartServiceImpl implements CartService {
//    private final CartRepository cartRepository;
//
//    @Override
//    public String addToCart(Cart entity) {
//        cartRepository.save(entity);
//        return entity.getUser_id();
//    }
//}
