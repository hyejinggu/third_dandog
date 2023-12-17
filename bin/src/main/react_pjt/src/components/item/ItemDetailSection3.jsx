import React, { useState, useEffect } from "react";
import styles from "../../css/subpage/ItemDetail.module.css";
import { Link as ScrollLink } from "react-scroll"; // 별칭 사용
import axios from "axios";

const ItemDetailSection3 = ({ item_name }) => {
  const [reviews, setReviews] = useState([]);

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/mypage/getreviews?item_name=${item_name}`);

        // reviews가 배열이면 설정, 아니면 빈 배열로 설정
        // setReviews(Array.isArray(response.data) ? response.data : [response.data]);
        setReviews(response.data);
      } catch (error) {
        console.error("유저데이터를 가져오는 동안 오류 발생:", error);
      }
    };

    fetchData();
  }, [item_name]);

  // 리뷰 수 및 별점 평균 계산
  const [reviewCount, setReviewCount] = useState(reviews.length);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    setReviewCount(reviews.length);

    const totalRating = reviews.reduce((total, review) => total + review.review_star, 0);
    const avgRating = reviewCount > 0 ? totalRating / reviewCount : 0;
    setAverageRating(avgRating);
  }, [reviews, reviewCount]);


  const [sortBy, setSortBy] = useState("popular"); // 기본 정렬: 인기순

  // 정렬 기능을 위한 함수
  const sortReviews = (sortingCriteria) => {
    let sortedReviews = [...reviews];

    if (sortingCriteria === "rating") {
      // 별점 내림차순 정렬
      sortedReviews.sort((a, b) => b.grade - a.grade);
    } else if (sortingCriteria === "latest") {
      // 최신순 정렬
      sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortingCriteria === "popular") {
      // 인기순 정렬 (추천 수를 반영하여 정렬)
      sortedReviews.sort((a, b) => b.recommendations - a.recommendations);
    }

    setReviews(sortedReviews);
    setSortBy(sortingCriteria);
  };

  return (
    <section id="section3" className={styles.section3}>
      <nav className={styles.nav}>
        <ScrollLink to="section1" offset={0}>
          상품상세정보
        </ScrollLink>
        <ScrollLink to="section2" offset={0}>
          상품구매안내
        </ScrollLink>
        <ScrollLink to="section3" offset={0}>
          상품사용후기
        </ScrollLink>
        <ScrollLink to="section4" offset={0}>
          상품Q&A
        </ScrollLink>
      </nav>
      {reviews.length === 0 ? (
        <div className={styles.empty_review_wrap}>
          리뷰가 없습니다
        </div>
      ) : (
        <div className={styles.review_wrap}>
          <div className={styles.review}>
            <span>REVIEW</span>
              <span>{`(${reviewCount} 개의 리뷰)`}</span>
            <hr />
          </div>
          <div className={styles.total_score}>
            <div className={styles.grades_1}>
                <span>{averageRating.toFixed(1)}</span>
              <p>
                  <strong>{averageRating.toFixed(1) * 20}%</strong>의 구매자가 이 상품을 좋아합니다.
              </p>
            </div>
          </div>

          <div className={styles.user_review}>
            <ul className={styles.review_header}>
              <li
                onClick={() => sortReviews("popular")}
                className={sortBy === "popular" ? styles.checking : null}
              >
                인기순
              </li>
              <li
                onClick={() => sortReviews("latest")}
                className={sortBy === "latest" ? styles.checking : null}
              >
                최신순
              </li>
              <li
                onClick={() => sortReviews("rating")}
                className={sortBy === "rating" ? styles.checking : null}
              >
                별점순
              </li>
            </ul>

            {reviews.map((review, index) => (
              <ul key={index}>
                <li className={styles.grades_3}>
                  별점 :
                  {Array.from({ length: review.review_star }, (_, index) => (
                    <span key={index}>&#9733;</span> // 별 모양의 유니코드를 사용해서 표현
                  ))}
                </li>
                <li className={styles.user_text_review}>{review.review_content}</li>
                <li className={styles.user_info}>작성일: {new Date(review.regdate).toLocaleDateString()}</li>
                <li className={styles.user_info}>user : {review.user_id}</li>
                {/* <li className={styles.user_info}>추천 수: {review.recommendations}</li> */}
              </ul>
            ))
            }
          </div>
        </div>
      )}
    </section>
  );
};

export default ItemDetailSection3;
