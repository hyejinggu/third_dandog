package com.i4.dandog.entity;

//import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Item_Order")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemOrder extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int order_num;
    private String user_id;
    private int total_price;
    private String payment;
    private String recipient_name;
    private String recipient_phone;
    private int post_code;
    private String user_address1;
    private String user_address2;
    private String order_state;
    private String pay_state;
    
	@CreatedDate
	@Column(name = "regdate", updatable = false)
	private LocalDateTime regdate;
	
}

