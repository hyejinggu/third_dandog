//package com.i4.dandog.controller;
//
//import java.io.File;
//import java.io.IOException;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//import com.i4.dandog.entity.Cart;
//import com.i4.dandog.service.CartService;
//
//import lombok.AllArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//
//@Controller
//@RequestMapping("/cart")
//@Log4j2 // @Log4j -> Boot 에서는 2015년 이후 지원중단
//@AllArgsConstructor
//public class CartController {
//	private final CartService cartService;
//
//    @PostMapping("/add")
//    public void addToCart(Cart entity) {
//        cartService.addToCart(entity);
//    }
//}
