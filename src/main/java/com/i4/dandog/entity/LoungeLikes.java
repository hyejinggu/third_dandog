package com.i4.dandog.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lounge_likes")
@Data
@AllArgsConstructor
@NoArgsConstructor
@IdClass(LoungeLikesKeyId.class)
public class LoungeLikes implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
    private String user_id;

	@Id
    private int lounge_no;
}
