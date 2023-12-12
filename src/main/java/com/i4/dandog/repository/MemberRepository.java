package com.i4.dandog.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.Item;
import com.i4.dandog.entity.Member;

public interface MemberRepository extends JpaRepository<Member, String> {

	boolean existsById(String user_id);
	
	@Query("SELECT m FROM Member m WHERE lower(m.user_id) like lower(concat('%', :searchValue, '%'))")
	List<Member> searchMembersId(@Param("searchValue") String searchValue);
	@Query("SELECT m FROM Member m WHERE lower(m.user_name) like lower(concat('%', :searchValue, '%'))")
	List<Member> searchMembersName(@Param("searchValue") String searchValue);

//	@Query("SELECT m FROM Member m WHERE (:searchField is null or m.user_email = :searchField) and lower(m.user_email) like lower(concat('%', :searchValue, '%'))")
//	List<Member> findByUser_email(@Param("searchField") String searchField,
//			@Param("searchValue") String searchValue);
	

	// 이것만돼!!!!!!!!!
//    @Query("SELECT m FROM Member m WHERE (:searchField is null or :searchField = '' or "
//            + ":searchField = 'user_id' and m.user_id = :searchValue)")
//    List<Member> searchMembers(@Param("searchField") String searchField, @Param("searchValue") String searchValue);



	@Query("SELECT m FROM Member m WHERE m.user_id = :user_id")
	List<Member> findByUser_id(@Param("user_id") String user_id);
	
	@Transactional
	@Modifying 
	@Query("update Member m set m.point = :point WHERE m.user_id = :user_id")
	void pointUpdate(@Param("user_id") String user_id, @Param("point") int point);
	
	@Transactional
	@Modifying
	@Query("update Member m set m.withdrawal_date = current_timestamp where m.user_id = :user_id")
	void updateWithdraw(@Param("user_id") String user_id);



}
