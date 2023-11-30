package com.i4.dandog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.i4.dandog.domain.SampleMemberJoDTO;
import com.i4.dandog.entity.Member;

public interface SampleMemberRepository 
					extends JpaRepository<Member, String> {
	// ** @Query("...")
	// => Spring Data JPA에서 JPQL 또는 네이티브 SQL쿼리를 사용할 수 있도록 지원하는 @
	// => @Query는 JPQL(Java Persistence Query Language) 을 기본으로 사용하며
	//	  네이티브 SQL 사용시에는 nativeQuery 속성을 true로 설정 	
	//	  -> 예)	
	//		@Query(value = "SELECT * FROM USERS u WHERE u.status = 1"
	//			   nativeQuery = true)
	//		List<User> findAllActiveUsersNative();
	// => https://blog.naver.com/emblim98/223222404308 참고
	
	// ** Join Test
	// => select 결과를 받기위한 ~DTO 작성
	// => Repository 에 Join 메서드 정의
	// => @Query("...") 에 JPQL로 SQL구문 작성,
	// 	  단, DTO 형식으로 return 받기 위해서는 	
	// => 연관성이 없는 경우도 Join 가능
	// => 단, JPQL 의 select 의 return Type은 List<Object[]> 이며,
	//	  이를 ~DTO 로 받기 위해서 select new ~~~ 를 사용함.
	//    
	@Query("SELECT new com.example.demo.domain.MemberJoDTO(m.id, m.name, m.jno, j.jname, j.project) FROM Member m LEFT JOIN Jo j ON m.jno=j.jno order by m.jno")
    List<SampleMemberJoDTO> findMemberJo();
	
}
