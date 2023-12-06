package com.i4.dandog.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Component;

import com.i4.dandog.entity.Lounge;

@Component
public class LoungeRepositoryCustomImpl implements LoungeRepositoryCustom {
	private final EntityManager entityManager;

	public LoungeRepositoryCustomImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

	@Override
	public List<Lounge> findByDynamicQuery(String category, String inputValue, String filterValue, String sort) {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Lounge> query = criteriaBuilder.createQuery(Lounge.class);
		Root<Lounge> root = query.from(Lounge.class);
		List<Predicate> predicates = new ArrayList<>();

		// Add conditions based on parameters
		predicates.add(criteriaBuilder.equal(root.get("lounge_category"), category));

		if ("all".equals(filterValue)) {
	        // Add OR condition for multiple fields
	        Predicate allFieldsPredicate = criteriaBuilder.or(
	            criteriaBuilder.like(root.get("lounge_content"), "%" + inputValue + "%"),
	            criteriaBuilder.like(root.get("lounge_title"), "%" + inputValue + "%"),
	            criteriaBuilder.like(root.get("user_id"), "%" + inputValue + "%")
	        );
	        predicates.add(allFieldsPredicate);
	    } else {
	        // If filterValue is not "all", search only in the specified field
	        if (filterValue != null && !filterValue.isEmpty()) {
	            predicates.add(criteriaBuilder.like(root.get(filterValue), "%" + inputValue + "%"));
	        }
	    }

		query.where(predicates.toArray(new Predicate[0]));

		// Add sorting conditions
		if (sort != null && !sort.isEmpty()) {
			if ("popular".equals(sort)) {
				query.orderBy(criteriaBuilder.desc(root.get("lounge_hits")));
			} else if ("new".equals(sort)) {
				query.orderBy(criteriaBuilder.desc(root.get("regdate")));
			} else if ("old".equals(sort)) {
				query.orderBy(criteriaBuilder.asc(root.get("regdate")));
			}
		}

		return entityManager.createQuery(query).getResultList();
	}

}
