package com.i4.dandog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.ShippingAddress;
import com.i4.dandog.entity.ShippingAddressKeyId;

public interface ShippingAddressRepository extends JpaRepository<ShippingAddress, ShippingAddressKeyId> {
	
	@Query("SELECT sa FROM ShippingAddress sa WHERE sa.user_id = :user_id")
	List<ShippingAddress> findByUser_id(@Param("user_id") String user_id);

}
