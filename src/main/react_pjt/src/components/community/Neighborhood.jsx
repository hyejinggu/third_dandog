/* eslint-disable no-undef */ // 'kakao' is a global variable from Kakao Maps SDK

// import kakao from "kakao"; // Kakao Maps SDK 모듈을 임포트
import styles from "../../css/subpage/community_neighbor.module.css";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import NeighborReview from "./NeighborReview";
import NeighborMap from "./NeighborMap";

const neighborSide = ["B", "H", "C", "T"];
export default function Neighborhood() {
  const [category, setCategory] = useState("beautyReview");

  return (
    <div className={styles.neighborhood_container}>
      <div className={styles.title}>
        <strong>
          <NavLink to="/community/lounge">라운지</NavLink>
          <NavLink to="/community/event">이벤트</NavLink>
          <NavLink to="/community/neighborhood">우리 동네</NavLink>
        </strong>
      </div>
      <div className={styles.content_wrap}>
        <div className={styles.side_bar_wrap}>
          <ul className={styles.side_bar}>
            {neighborSide.map((content, index) => (
              <li
                className={category === content ? styles.sidebar_active : ""}
                onClick={() => setCategory(content)}
                key={index}
              >
                {content}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.right_side}>
          <NeighborMap />

          <NeighborReview category={category} />
        </div>
        <NavLink to="/community/createreview">리뷰 작성</NavLink>
      </div>
    </div>
  );
}
