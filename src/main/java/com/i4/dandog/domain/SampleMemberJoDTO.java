package com.i4.dandog.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// ** Member, Jo JoinDTO

@Data
public class SampleMemberJoDTO {
	
	private String id;
	private String name;
	private int jno;
	private String jname;
	private String project;
	
	// => Join 구문결과 받기위해서는 
	//	  select 구문의 순서와 동일하게 모든 컬럼을 초기화하는 생성자 필요함. 
	public SampleMemberJoDTO(String id, String name, int jno, String jname, String project) {
		super();
		this.id = id;
		this.name = name;
		this.jno = jno;
		this.jname = jname;
		this.project = project;
	}
} //class
