package com.i4.dandog.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;

import com.i4.dandog.entity.Event;


public interface EventRepository extends JpaRepository<Event, Integer> {
	
	
	@Query("select e from Event e where e.event_name like %:searchValue%")
	List<Event> findByEventName(@Param("searchValue") String searchValue);

	
	@Query("SELECT e FROM Event e " +
		       "WHERE (:regDate IS NULL OR e.e_reg_date >= :regDate) " +
		       "AND (:expDate IS NULL OR e.e_exp_date <= :expDate)")
		List<Event> findByDate(@Param("regDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate regDate,
		                       @Param("expDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate expDate);

}

