package com.i4.dandog.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderNum;
    private String userId;
    private int itemNo;
    private int totalPrice;
    private Date orderDate;
    private String payment;
    private String shippingMsg;
    private String recipientName;
    private String recipientPhone;
    private int postCode;
    private String userAddress1;
    private String userAddress2;
}

