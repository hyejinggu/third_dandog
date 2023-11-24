import React, { useState } from "react";
import styles from "../../css/subpage/ItemDetail.module.css";
import { Link as ScrollLink } from "react-scroll"; // 별칭 사용

const ItemDetailSection3 = () => {
  const [reviews, setReviews] = useState([
    {
      grade: 5,
      text: "만족합니다. 재질도 부들부들하니 저도 물고싶네요",
      date: "2022-08-21",
      recommendations: 7,
      user: "ehd****",
    },
    {
      grade: 4,
      text: "맘에 들어요",
      date: "2023-02-20",
      recommendations: 32,
      user: "rhk****",
    },
    {
      grade: 3,
      text: "보통이에요",
      date: "2021-08-19",
      recommendations: 1,
      user: "dkd****",
    },
    {
      grade: 2,
      text: "그냥 그래요",
      date: "2023-03-18",
      recommendations: 10,
      user: "rla****",
    },
    {
      grade: 1,
      text: "별로에요",
      date: "2023-03-20",
      recommendations: 0,
      user: "qkr****",
    },
    // 다른 리뷰 항목들도 마찬가지로 추가
  ]);
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
      <div className={styles.review_wrap}>
        <div className={styles.review}>
          <span>REVIEW</span>
          <span>(4)</span>
          <hr />
        </div>
        <div className={styles.total_score}>
          <div className={styles.grades_1}>
            <span>3.0</span>
            <p>
              <strong>100%</strong>의 구매자가 이 상품을 좋아합니다.
            </p>
          </div>
          <div className={styles.grades_2}>
            <ul>
              <li>
                아주 좋아요 <span></span> <b>1</b>
              </li>
              <li>
                맘에들어요<span></span> <b>1</b>
              </li>
              <li>
                보통이에요<span></span> <b>1</b>
              </li>
              <li>
                그냥 그래요<span></span> <b>1</b>
              </li>
              <li>
                별로예요<span></span> <b>1</b>
              </li>
            </ul>
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
                {Array.from({ length: review.grade }, (_, index) => (
                  <span key={index}>&#9733;</span> // 별 모양의 유니코드를 사용해서 표현
                ))}
              </li>
              <li className={styles.user_text_review}>{review.text}</li>
              <li className={styles.user_info}>날짜: {review.date}</li>
              <li className={styles.user_info}>user : {review.user}</li>
              {/* <li className={styles.user_info}>추천 수: {review.recommendations}</li> */}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItemDetailSection3;
