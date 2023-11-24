package com.i4.dandog.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedDate;
// import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;

@MappedSuperclass
@EntityListeners(value = {AuditingEntityListener.class})
@Getter
abstract class BaseEntity {
   
   @CreatedDate
   @Column(name = "regdate", updatable = false)
   private LocalDateTime regdate;
   
   @CreatedDate
   @Column(name = "answer_regdate", updatable = false)
   private LocalDateTime answer_regdate;
   
   @CreatedDate
   @Column(name = "withdrawal_date", updatable = false)
   private LocalDateTime withdrawal_date;
   
   
//   @LastModifiedDate
//   @Column(name = "modDate")
//   private LocalDateTime modDate;
}
