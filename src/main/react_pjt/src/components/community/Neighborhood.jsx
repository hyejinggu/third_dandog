/* eslint-disable no-undef */ // 'kakao' is a global variable from Kakao Maps SDK

// import kakao from "kakao"; // Kakao Maps SDK 모듈을 임포트
import styles from "../../css/subpage/community_neighbor.module.css";
import SideBar from "./SideBar";
import { NavLink } from "react-router-dom";
import React, { useState, useMemo } from "react";
import NeiborReview from "./NeighborReview";
import NeighborMap from "./NeighborMap";

const neiborReview = {
  beautyReview: [
    {
      title: "멍멍 미용",
      content: "🐶너무 예쁘게 미용해주셨어요.",
      grade: 4.5,
      userid: "hello",
    },
    {
      title: "월월 미용",
      content: "둥실둥실 브로콜리가 되었어요🥦",
      grade: 4.8,
      userid: "hello",
    },
    {
      title: "예뻐지개",
      content: "메롱메롱메롱메롱",
      grade: 4.5,
      userid: "hello",
    },
    {
      title: "예뻐지개",
      content: "메롱메롱메롱메롱",
      grade: 4.5,
      userid: "hello",
    },
    {
      title: "예뻐지개",
      content: "메롱메롱메롱메롱😍",
      grade: 4.5,
      userid: "hello",
    },
  ],
  hosReview: [
    {
      title: "멍멍 병원",
      content: "우리 토실이가 아파서 가까운 병원 갔는데 너무 친절하셨어요.",
      grade: 4.6,
      userid: "hihi",
    },
    {
      title: "월월 hospital",
      content: "👍둥실둥실 브로콜리가 되었어요",
      grade: 4.8,
      userid: "나옹이",
    },
    {
      title: "아프지마시개",
      content: "할 말이 없다냥",
      grade: 4.5,
      userid: "멍멍이",
    },
    {
      title: "멍냥멍냥",
      content: "메롱메롱메롱메롱",
      grade: 4.5,
      userid: "도마뱀",
    },
    {
      title: "아프지마시개",
      content: "메롱메롱메롱메롱",
      grade: 4.5,
      userid: "토끼",
    },
  ],
  cafeReview: [
    {
      title: "호로록",
      content: "카라멜마끼야또 맛있다☕",
      grade: 4.5,
      userid: "hello",
    },
    {
      title: "강아지도 커피 마심",
      content: "집에 가고 싶어...",
      grade: 4.8,
      userid: "hello",
    },
    {
      title: "안돼!!",
      content: "🎈동해물과 백두산이 마르고 닳도록",
      grade: 4.5,
      userid: "hello",
    },
    {
      title: "내맘이야",
      content: "오늘은 2023년 8월 17일!!",
      grade: 4.5,
      userid: "hello",
    },
    {
      title: "호로록",
      content: "그만해!!!!!!!",
      grade: 4.5,
      userid: "hello",
    },
  ],
  trainingReview: [
    {
      title: "내 이름은 개",
      content: "강아지 배변훈련 여기가 최고입니다.🧡",
      grade: 4.5,
      userid: "hello",
    },
    {
      title: "강강약약",
      content: "🐺우리 강아지가 강강약약이 되었어요.",
      grade: 4.8,
      userid: "hello",
    },
    {
      title: "강약약강",
      content: "🐶우리 강아지가 강약약강이 되었어요.",
      grade: 4.5,
      userid: "hello",
    },
    {
      title: "여행가고싶지",
      content: "급한 일이 생겼는데 반려동물 맡기고 싶을 때! 이곳을 선택하세요.",
      grade: 4.5,
      userid: "hello",
    },
    {
      title: "놀러가자",
      content: "ㅎㅎㅎㅎㅎㅎ",
      grade: 4.5,
      userid: "hello",
    },
  ],
};

export default function Neighborhood() {
  const [category, setCategory] = useState("미용");
  const [neighborArray, setNeiborArray] = useState(neiborReview.beautyReview);

  useMemo(() => {
    switch (category) {
      case "미용":
        setNeiborArray(neiborReview.beautyReview);
        break;
      case "병원":
        setNeiborArray(neiborReview.hosReview);
        break;
      case "카페, 호텔":
        setNeiborArray(neiborReview.cafeReview);
        break;
      case "훈련, 시터":
        setNeiborArray(neiborReview.trainingReview);
        break;
      default:
        setNeiborArray(neiborReview.beautyReview);
    }
  }, [category]);

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
        <SideBar content="neighbor" setCategory={setCategory} />

        <div className={styles.right_side}>
          <NeighborMap />

          <NeiborReview neighborArray={neighborArray} />
        </div>
      </div>
    </div>
  );
}
