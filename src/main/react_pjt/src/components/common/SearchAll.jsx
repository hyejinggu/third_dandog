import React from "react";
import styles from "../../css/common/search_all.module.css";
import { useParams } from "react-router-dom";

export default function SearchAll() {
  const { searchAllValue } = useParams();

  return (
    <div id="wrap">
      <h2 className={styles.title}>'{searchAllValue}'의 검색 결과</h2>
      <div className={styles.searched_area}>
        <div className={styles.resultsContainer}>
          <div className={styles.productResults}>
            <h2>상품 검색 결과</h2>
            {/* 상품 검색 결과를 여기에 나열 */}
            <ul>
              <li>상품 1</li>
              <li>상품 2</li>
              {/* ... */}
            </ul>
          </div>
          <div className={styles.boardResults}>
            <h2>고객센터 검색 결과</h2>
            {/* 고객센터 검색 결과를 여기에 나열 */}
            <ul>
              <li>FAQ 1</li>
              <li>문의 내역 2</li>
              {/* ... */}
            </ul>
          </div>
          <div className={styles.communityResults}>
            <h2>커뮤니티 검색 결과</h2>
            {/* 커뮤니티 검색 결과를 여기에 나열 */}
            <ul>
              <li>게시글 1</li>
              <li>토론 글 2</li>
              {/* ... */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
