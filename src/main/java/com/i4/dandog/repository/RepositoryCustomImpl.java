package com.i4.dandog.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Component;

import com.i4.dandog.entity.Lounge;
import com.i4.dandog.entity.NeighborhoodReview;

@Component
public class RepositoryCustomImpl implements RepositoryCustom {

	private final EntityManager entityManager;

	public RepositoryCustomImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	
	@Override
    public List<String> starFilterWithCategory(double filter, String category) {
        if (filter == 0.0) {
            // If filter is 0.0, return all results
            return getAllReviewsByCategory(category);
        } else {
            // If filter is not 0.0, return brands with average rating >= filter
            return getReviewsByCategoryWithMinimumRating(category, filter);
        }
    }

    @Override
    public List<String> sortWithCategory(String sorting, String category) {
        // Implement your sorting logic here and return the result
        return getReviewsSortedByCategory(sorting, category);
    }

    
    // ========= 함수 ============
    
    private List<String> getAllReviewsByCategory(String category) {
        String jpql = "SELECT r.neighbor_brand_name FROM NeighborhoodReview r WHERE r.neighbor_category = :category"
        		+ " GROUP BY r.neighbor_brand_name";
        Query query = entityManager.createQuery(jpql, NeighborhoodReview.class); // 여기서 반환 타입 명시
        query.setParameter("category", category);
        return query.getResultList();
    }

    private List<String> getReviewsByCategoryWithMinimumRating(String category, double filter) {
        String jpql = "SELECT r.neighbor_brand_name, AVG(r.neighbor_rating) as rating FROM NeighborhoodReview r WHERE r.neighbor_category = :category "
        		+ "GROUP BY r.neighbor_brand_name HAVING AVG(r.neighbor_rating) >= :filter";
        Query query = entityManager.createQuery(jpql, NeighborhoodReview.class); // 여기서 반환 타입 명시
        query.setParameter("category", category);
        query.setParameter("filter", filter);
        return query.getResultList();
    }

    private List<String> getReviewsSortedByCategory(String sorting, String category) {
        String jpql = "SELECT r.neighbor_brand_name, COUNT(rr) as count " +
                      "FROM NeighborhoodReview r " +
                      "LEFT JOIN NeighborhoodReview rr ON rr.neighbor_brand_name = r.neighbor_brand_name " +
                      "WHERE r.neighbor_category = :category " +
                      "GROUP BY r.neighbor_brand_name " +
                      "ORDER BY ";

        switch (sorting) {
            case "basic":
                jpql += "r.neighbor_brand_name ASC";
                break;
            case "review":
                // Order by the number of reviews in descending order
                jpql += "COUNT(rr) DESC";
                break;
            default:
                jpql += "r.neighbor_brand_name ASC";
                break;
        }

        Query query = entityManager.createQuery(jpql, Object[].class);
        query.setParameter("category", category);

        List<Object[]> resultList = query.getResultList();

        // Convert the result to List<String>
        return resultList.stream()
                .map(result -> (String) result[0])
                .collect(Collectors.toList());
    }
    
    
    
    
    
    
    // ===================라운지
	@Override
	public List<Lounge> findByLoungeDynamicQuery(String category, String inputValue, String filterValue, String sort) {
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
					criteriaBuilder.like(root.get("user_id"), "%" + inputValue + "%"));
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
