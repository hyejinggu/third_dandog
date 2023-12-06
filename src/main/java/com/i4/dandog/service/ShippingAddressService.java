package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.entity.ShippingAddress;
//import com.i4.dandog.entity.ShippingAddressKeyId;
import com.i4.dandog.entity.ShippingAddressKeyId;

public interface ShippingAddressService {

    List<ShippingAddress> getAllAddresses();
    
    void addNewAddress(
    		String user_id,
    		String recipient_name,
    		String recipient_phone,
    		int post_code,
    		String user_address1,
    		String user_address2);
    
    void delete(ShippingAddressKeyId keyId);
	
	List<ShippingAddress> getAddressForUser(String user_id);
}
