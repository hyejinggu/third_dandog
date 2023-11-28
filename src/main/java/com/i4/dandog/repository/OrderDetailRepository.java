package com.i4.dandog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.i4.dandog.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
}