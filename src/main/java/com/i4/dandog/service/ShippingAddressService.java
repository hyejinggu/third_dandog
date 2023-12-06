package com.i4.dandog.service;

import java.util.List;

import com.i4.dandog.entity.ShippingAddress;
//import com.i4.dandog.entity.ShippingAddressKeyId;

public interface ShippingAddressService {
	
	List<ShippingAddress> getAddressForUser(String user_id);
}
