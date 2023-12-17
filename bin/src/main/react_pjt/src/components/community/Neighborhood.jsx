/* eslint-disable no-undef */ // 'kakao' is a global variable from Kakao Maps SDK

// import kakao from "kakao"; // Kakao Maps SDK 모듈을 임포트
import styles from "../../css/subpage/community_neighbor.module.css";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import NeighborReview from "./NeighborReview";
import NeighborMap from "./NeighborMap";
import SideBar from "./SideBar";

export default function Neighborhood() {
  const [category, setCategory] = useState("beauty");
  const [selectedPlace, setSelectedPlace] = useState("");
  const loginId = sessionStorage.getItem("loginId");

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
            <SideBar content="neighbor" setCategory={setCategory} />
          </ul>
        </div>

        <div className={styles.right_side}>
          <NeighborMap setSelectedPlace={setSelectedPlace} />

          <NeighborReview category={category} selectedPlace={selectedPlace} />
          {loginId && (
            <div className={styles.review_btn}>
              <span>
                <NavLink to="/community/createreview">리뷰 작성</NavLink>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
