package com.i4.dandog.repository;


import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.i4.dandog.entity.Qna;

public interface QnaRepository extends JpaRepository<Qna, Integer>{

	@Query("select q from Qna q where qna_category = :qna_category")
	public List<Qna> findByCategory(@Param("qna_category") String qna_category);

	@Modifying
    @Transactional
    @Query("update Qna q SET q.qna_reply = :reply, q.answer_state='답변완료' where q.qna_seq = :seq")
	void replyinsert(@Param("seq") int qna_seq, @Param("reply") String qna_reply);
	
}
