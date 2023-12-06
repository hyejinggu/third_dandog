package com.i4.dandog.repository;

import java.util.List;

import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.i4.dandog.entity.Item;
import com.i4.dandog.entity.Lounge;

public interface LoungeRepository extends JpaRepository<Lounge, Integer> {

	@Query("SELECT l FROM Lounge l WHERE " + "(:searchCategory IS NULL OR l.lounge_category = :searchCategory) AND "
			+ "(LOWER(l.lounge_title) LIKE LOWER(concat('%', :searchValue, '%')) OR "
			+ "LOWER(l.lounge_content) LIKE LOWER(concat('%', :searchValue, '%'))) " + "ORDER BY l.lounge_no DESC")
	List<Lounge> findByCategoryLoungeContents(@Param("searchCategory") String searchCategory,
			@Param("searchValue") String searchValue);

	@Query("select l from Lounge l where (:searchCategory is null or l.lounge_category = :searchCategory) and l.user_id = :searchValue order by l.lounge_no desc")
	List<Lounge> findByCategoryUserId(@Param("searchCategory") String searchCategory,
			@Param("searchValue") String searchValue);

	// ============================RestController=============================================

	@Transactional
	@Modifying
	@Query("UPDATE Lounge l SET l.lounge_hits = l.lounge_hits + 1 WHERE l.lounge_no = :lounge_no")
	void updateHits(@Param("lounge_no") int lounge_no);

	@Transactional
	@Modifying
	@Query("UPDATE Lounge l SET l.lounge_likes = l.lounge_likes + 1 WHERE l.lounge_no = :lounge_no")
	void updateLikes(@Param("lounge_no") int lounge_no);

}
