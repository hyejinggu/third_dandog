package com.i4.dandog.entity;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class CartId implements Serializable  {
    private String user_id;
    private int item_no;

    // 생성자, equals, hashCode 등
}