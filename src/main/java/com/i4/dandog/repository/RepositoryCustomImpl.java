package com.i4.dandog.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Component;

import com.i4.dandog.domain.ReviewInfoDTO;
import com.i4.dandog.entity.Item;
import com.i4.dandog.entity.Lounge;

@Component
public class RepositoryCustomImpl implements RepositoryCustom {

	private final EntityManager entityManager;

	public RepositoryCustomImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	// =========== 베스트 셀러 ==================
	@Override
    public List<Item> getBestSeller(String category) {
        // 서브쿼리
        String subQuery = "SELECT i.item_name FROM Item i WHERE i.item_category = :category " +
                          "GROUP BY i.item_name ORDER BY SUM(i.item_sales_volume) DESC LIMIT 4";

        Query subQueryObj = entityManager.createNativeQuery(subQuery);
        subQueryObj.setParameter("category", category);

        List<String> bestSellerItemNames = subQueryObj.getResultList();

        // 메인 쿼리
        String mainQuery = "SELECT i.* FROM Item i WHERE i.item_name IN :bestSellerItemNames";

        Query mainQueryObj = entityManager.createNativeQuery(mainQuery, Item.class);
        mainQueryObj.setParameter("bestSellerItemNames", bestSellerItemNames);

        return mainQueryObj.getResultList();
    }
	
	
	
	
	
	@Override
    public List<ReviewInfoDTO> starFilterWithCategory(double filter, String category) {
		return getReviewsByCategoryWithMinimumRating(category, filter);
    }

    @Override
    public List<ReviewInfoDTO> sortWithCategory(String sorting, String category) {
        // Implement your sorting logic here and return the result
        return getReviewsSortedByCategory(sorting, category);
    }

    
    // ========= 함수 ============

    private List<ReviewInfoDTO> getReviewsByCategoryWithMinimumRating(String category, double filter) {
        String jpql = "SELECT NEW com.i4.dandog.domain.ReviewInfoDTO(r.neighbor_brand_name, COUNT(r), AVG(r.neighbor_rating)) " +
                      "FROM NeighborhoodReview r " +
                      "WHERE r.neighbor_category = :category " +
                      "GROUP BY r.neighbor_brand_name " +
                      "HAVING AVG(r.neighbor_rating) >= :filter";
        
        Query query = entityManager.createQuery(jpql, ReviewInfoDTO.class);
        query.setParameter("category", category);
        query.setParameter("filter", filter);
        return query.getResultList();
    }
    
    
    private List<ReviewInfoDTO> getReviewsSortedByCategory(String sorting, String category) {
        String jpql = "SELECT r.neighbor_brand_name, AVG(r.neighbor_rating) " +
                      "FROM NeighborhoodReview r " +
                      "WHERE r.neighbor_category = :category " +
                      "GROUP BY r.neighbor_brand_name " +
                      "ORDER BY ";

        switch (sorting) {
            case "basic":
                jpql += "r.neighbor_brand_name ASC";
                break;
            case "review":
                // Order by the number of reviews in descending order
                jpql += "COUNT(r) DESC";
                break;
            default:
                jpql += "r.neighbor_brand_name ASC";
                break;
        }

        Query query = entityManager.createQuery(jpql);
        query.setParameter("category", category);

        List<Object[]> results = query.getResultList();

        List<ReviewInfoDTO> dtos = new ArrayList<>();

        for (Object[] result : results) {
            String brandName = (String) result[0];
            Long reviewCount = getReviewCountByBrandName(brandName, category);
            Double averageRating = (Double) result[1];

            ReviewInfoDTO dto = new ReviewInfoDTO(brandName, reviewCount, averageRating);
            dtos.add(dto);
        }

        return dtos;
    }

    private Long getReviewCountByBrandName(String brandName, String category) {
        String countJpql = "SELECT COUNT(r) FROM NeighborhoodReview r " +
                          "WHERE r.neighbor_brand_name = :brandName " +
                          "AND r.neighbor_category = :category";

        Query countQuery = entityManager.createQuery(countJpql);
        countQuery.setParameter("brandName", brandName);
        countQuery.setParameter("category", category);

        return (Long) countQuery.getSingleResult();
    }
    
    
    
//    private List<ReviewInfoDTO> getReviewsSortedByCategory(String sorting, String category) {
//    	String jpql = "SELECT NEW com.i4.dandog.domain.ReviewInfoDTO(r.neighbor_brand_name, COUNT(r), AVG(r.neighbor_rating)) " +
//    			"FROM NeighborhoodReview r " +
//    			"LEFT JOIN NeighborhoodReview rr ON rr.neighbor_brand_name = r.neighbor_brand_name " +
//    			"WHERE r.neighbor_category = :category " +
//    			"GROUP BY r.neighbor_brand_name " +
//    			"ORDER BY ";
//    	
//    	switch (sorting) {
//    	case "basic":
//    		jpql += "r.neighbor_brand_name ASC";
//    		break;
//    	case "review":
//    		// Order by the number of reviews in descending order
//    		jpql += "COUNT(rr) DESC";
//    		break;
//    	default:
//    		jpql += "r.neighbor_brand_name ASC";
//    		break;
//    	}
//    	
//    	Query query = entityManager.createQuery(jpql, ReviewInfoDTO.class);
//    	query.setParameter("category", category);
//    	
//    	return query.getResultList();
//    }
    
    
    
    
    // ===================라운지=======================
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
