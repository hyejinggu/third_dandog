package com.i4.dandog.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.i4.dandog.entity.ShippingAddress;
import com.i4.dandog.entity.ShippingAddressKeyId;
import com.i4.dandog.repository.ShippingAddressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShippingAddressServiceImpl implements ShippingAddressService {
    private final ShippingAddressRepository repository;

    
    @Override
    public List<ShippingAddress> getAllAddresses() {
        return repository.findAll();
    }

    @Override
    public void addNewAddress(
    		String user_id,
    		String recipient_name,
    		String recipient_phone,
    		int post_code,
    		String user_address1,
    		String user_address2) {
    	ShippingAddress Address = new ShippingAddress();
    	Address.setUser_id(user_id);
    	Address.setRecipient_name(recipient_name);
    	Address.setRecipient_phone(recipient_phone);
    	Address.setPost_code(post_code);
    	Address.setUser_address1(user_address1);
    	Address.setUser_address2(user_address2);
    	repository.save(Address);
    }
    
    @Override
    public void delete(ShippingAddressKeyId keyId) {
    	repository.deleteById(keyId);
    }
    
    @Override
    public List<ShippingAddress> getAddressForUser(String user_id) {
        return repository.findByUser_id(user_id);
    }
    

}
