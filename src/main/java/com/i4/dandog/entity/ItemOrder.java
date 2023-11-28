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
@Table(name = "Item_Order")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int order_num;
    private String user_id;
    private int item_no;
    private int total_price;
    private Date order_date;
    private String payment;
    private String shipping_msg;
    private String recipient_name;
    private String recipient_phone;
    private int post_code;
    private String userAddress1;
    private String userAddress2;
}

