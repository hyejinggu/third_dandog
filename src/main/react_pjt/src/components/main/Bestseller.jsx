import React, { useState, useReducer } from "react";
import styles from "../../css/main/main.module.css";
import BestsellerList from "./BestsellerList";

const Bestseller = () => {
  const [iteminfo, setiteminfo] = useState([
    // 초기 상품 정보 배열
    {
      name: "알록달록 로프 장난감",
      saleInfo: 10,
      normalPr: 13000,
      image: ["/images/subpage/item1.jpg",
        "/images/subpage/item1_1.jpg",
        "/images/subpage/item1_2.jpg",
        "/images/subpage/item1_3.jpg",
        "/images/subpage/item1_4.jpg"
      ],
      infoimage: [
        "/images/subpage/order1.jpg",
        "/images/subpage/order2.jpg",
        "/images/subpage/order3.jpg"
      ],
      color: ["#1dcc03", "#ffeb0c"],
      clicked: 1300,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "당근 밭에서 당근 난다",
      saleInfo: 20,
      normalPr: 18000,
      image: ["/images/subpage/item5.jpeg", "/images/subpage/item5_1.jpg"],
      infoimage: [],
      color: ["#ff9b0e"],
      clicked: 1870,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "도토리를 찾아라!",
      saleInfo: 10,
      normalPr: 13000,
      image: ["/images/subpage/item3.jpg", "/images/subpage/item3_1.jpg"],
      infoimage: [],
      color: ["#865d10"],
      clicked: 1032,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "돌려 돌려 미로",
      saleInfo: 30,
      normalPr: 21000,
      image: ["/images/subpage/item6.jpg", "/images/subpage/item6_1.jpg"],
      infoimage: [],
      color: ["#ff9b0e", "#1dcc03", "#0ea7ff", "#ff0e0e"],
      clicked: 870,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
  ]);

  const snackiteminfo = [
    {
      name: "(간식) 진짜 연어",
      saleInfo: 30,
      normalPr: 39900,
      image: ["/images/main/bestseller1.jpeg", "/images/main/bestseller1.jpeg"],
      infoimage: [],
      color: ["#1dcc03", "#ffeb0c"],
    },
    {
      name: "(수입) 멍멍 사료",
      saleInfo: 20,
      normalPr: 399000,
      image: ["/images/main/bestseller2.png", "/images/main/bestseller2.png"],
    },
    {
      name: "하루 유산균",
      saleInfo: 10,
      normalPr: 40000,
      image: ["/images/main/bestseller3.jpeg", "/images/main/bestseller3.jpeg"],
    },
    {
      name: "아침애 사료(다이어트)",
      saleInfo: 30,
      normalPr: 29900,
      image: ["/images/main/bestseller4.png", "/images/main/bestseller4.png"],

    },
  ];

  const toyiteminfo = [
    {
      name: "알록달록 로프 장난감",
      saleInfo: 10,
      normalPr: 13000,
      image: ["/images/subpage/item1.jpg", "/images/subpage/item1_1.jpg"],
      infoimage: [],
      color: ["#1dcc03", "#ffeb0c"],
      clicked: 1300,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "당근 밭에서 당근 난다",
      saleInfo: 20,
      normalPr: 18000,
      image: ["/images/subpage/item5.jpeg", "/images/subpage/item5_1.jpg"],
      infoimage: [],
      color: ["#ff9b0e"],
      clicked: 1870,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "도토리를 찾아라!",
      saleInfo: 10,
      normalPr: 13000,
      image: ["/images/subpage/item3.jpg", "/images/subpage/item3_1.jpg"],
      infoimage: [],
      color: ["#865d10"],
      clicked: 1032,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "돌려 돌려 미로",
      saleInfo: 30,
      normalPr: 21000,
      image: ["/images/subpage/item6.jpg", "/images/subpage/item6_1.jpg"],
      infoimage: [],
      color: ["#ff9b0e", "#1dcc03", "#0ea7ff", "#ff0e0e"],
      clicked: 870,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
  ];

  const livingiteminfo = [
    // ... 다른 상품들
  ];

  const careiteminfo = [
    // ... 다른 산책 상품들
  ];

  const [displayedItemInfo, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_SELECTED_ITEMS":
        return action.payload;
      default:
        return state;
    }
  }, iteminfo);

  // 각 링크를 클릭할 때 실행되는 함수
  const handleLinkClick = (event, newiteminfo) => {
    event.preventDefault();
    dispatch({ type: "SET_SELECTED_ITEMS", payload: newiteminfo });
  };

  return (
    <div className={styles.bestseller_wrap}>
      <h1>베스트 셀러 상품</h1>
      <div className={styles.bestseller_list}>
        <div onClick={(event) => handleLinkClick(event, snackiteminfo)}>
          <h2>간식, 사료</h2>
        </div>
        <div onClick={(event) => handleLinkClick(event, toyiteminfo)}>
          <h2>장난감</h2>
        </div>
        <div onClick={(event) => handleLinkClick(event, livingiteminfo)}>
          <h2>리빙, 패션</h2>
        </div>
        <div onClick={(event) => handleLinkClick(event, careiteminfo)}>
          <h2>산책, 케어</h2>
        </div>
      </div>
      <BestsellerList
        selectedIteminfo={displayedItemInfo}
      />
    </div>
  );
};

export default Bestseller;
