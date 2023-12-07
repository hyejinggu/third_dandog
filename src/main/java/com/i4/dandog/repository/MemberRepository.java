package com.i4.dandog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.Item;
import com.i4.dandog.entity.Member;

public interface MemberRepository extends JpaRepository<Member, String> {

	boolean existsById(String user_id);
	
//	@Query("SELECT m FROM Member m WHERE (:searchField is null or m.user_id = :searchField) and lower(m.user_id) like lower(concat('%', :searchValue, '%'))")
//	List<Member> findByUser_id(@Param("searchField") String searchField,
//			@Param("searchValue") String searchValue);
//
//	@Query("SELECT m FROM Member m WHERE (:searchField is null or m.user_email = :searchField) and lower(m.user_email) like lower(concat('%', :searchValue, '%'))")
//	List<Member> findByUser_email(@Param("searchField") String searchField,
//			@Param("searchValue") String searchValue);
	

    @Query("SELECT m FROM Member m WHERE " + "(:searchField is null or :searchField = '' or "
            + ":searchField = 'user_id' and m.user_id = :searchValue)")
    List<Member> searchMembers(@Param("searchField") String searchField, @Param("searchValue") String searchValue);

	

	@Query("SELECT m FROM Member m WHERE m.user_id = :user_id")
	List<Member> findByUser_id(@Param("user_id") String user_id);


}
