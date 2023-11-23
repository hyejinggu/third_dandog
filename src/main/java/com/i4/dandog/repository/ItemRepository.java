package com.i4.dandog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.i4.dandog.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {
}

