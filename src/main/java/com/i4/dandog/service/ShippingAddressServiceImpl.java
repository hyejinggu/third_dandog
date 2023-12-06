package com.i4.dandog.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.ShippingAddress;
import com.i4.dandog.repository.ShippingAddressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShippingAddressServiceImpl implements ShippingAddressService {
    private final ShippingAddressRepository repository;

    @Override
    public List<ShippingAddress> getAddressForUser(String user_id) {
        return repository.findByUser_id(user_id);
    }
    

}
