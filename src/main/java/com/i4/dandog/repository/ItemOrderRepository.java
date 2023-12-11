package com.i4.dandog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.i4.dandog.entity.ItemOrder;

public interface ItemOrderRepository extends JpaRepository<ItemOrder , Integer> {
}