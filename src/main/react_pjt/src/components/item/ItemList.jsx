import ItemInfo from "./ItemInfo";
import RecentSeenItem from "./RecentSeenItem";
import styles from "../../css/subpage/Itemlist.module.css";
import PageNation from "./PageNation";
import { useReducer, useState } from "react";

const ItemList = () => {
  // ======== 상품 목록 배열 ========
  const iteminfo = [
    {
      name: "알록달록 로프 장난감",
      saleInfo: 10,
      normalPr: 13000,
      image: [
        "/images/subpage/item1.jpg",
        "/images/subpage/item1_1.jpg",
        "/images/subpage/item1_2.jpg",
        "/images/subpage/item1_3.jpg",
        "/images/subpage/item1_4.jpg",
      ],
      infoimage: [
        "/images/subpage/order1.jpg",
        "/images/subpage/order2.jpg",
        "/images/subpage/order3.jpg",
      ],
      color: ["#1dcc03", "#ffeb0c"],
      clicked: 1300,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "붕어빵 기계 장난감",
      saleInfo: 5,
      normalPr: 14000,
      image: ["/images/subpage/item2.jpg", "/images/subpage/item2_1.jpg"],
      infoimage: [],
      color: ["#7d7d7d", "#865d10"],
      clicked: 2200,
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
      name: "애벌레야, 안녕",
      saleInfo: 20,
      normalPr: 18000,
      image: ["/images/subpage/item4.jpg", "/images/subpage/item4_1.jpg"],
      infoimage: [],
      color: ["#fe60c2", "#1dcc03", "#ffeb0c"],
      clicked: 982,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "에그토스트 짱맛",
      saleInfo: 10,
      normalPr: 8700,
      image: [
        "https://shop-phinf.pstatic.net/20220622_16/1655861639641Rj5qS_JPEG/56997484945979985_1482470265.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20220622_84/16558616432463dOwW_JPEG/56997488694113469_797086549.jpg?type=m510",
      ],
      infoimage: [],
      color: ["#ffeb0c", "#1dcc03", "#0ea7ff", "#fe60c2"],
      clicked: 2023,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "뭐, 풍선 처음 봐?",
      saleInfo: 10,
      normalPr: 10000,
      image: [
        "https://shop-phinf.pstatic.net/20221230_29/16723840110040CxGk_JPEG/73519909700759419_247623899.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20221230_240/1672384019545UzBqj_JPEG/73519918233666949_1073249528.jpg?type=m510",
      ],
      infoimage: [],
      color: ["#fe60c2", "#1dcc03", "#ffeb0c"],
      clicked: 1444,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "내가 너무 귀여운 탓인가",
      saleInfo: 15,
      normalPr: 15000,
      image: [
        "https://shop-phinf.pstatic.net/20220622_102/1655861796185iWHxA_JPEG/56997641675055614_1711392658.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20220622_7/1655861790836OM9oA_JPEG/56997636352752980_913818899.jpg?type=m510",
      ],
      infoimage: [],
      color: ["#ff9b0e", "#1dcc03", "#0ea7ff", "#ff0e0e"],
      clicked: 2000,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "그냥 왕 물어버려(치석 제거)",
      saleInfo: 10,
      normalPr: 11000,
      image: ["/images/subpage/item8.jpg", "/images/subpage/item8_1.jpg"],
      infoimage: [],
      color: ["#ffeb0c", "#1dcc03", "#0ea7ff", "#fe60c2"],
      clicked: 999,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "바나나 먹으면 나한테 바나나",
      saleInfo: 5,
      normalPr: 7500,
      image: [
        "https://shop-phinf.pstatic.net/20221110_218/1668047279892UmIuM_JPEG/69183059599346706_1257908217.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20221110_175/16680472703125ojCr_JPEG/69183050018559750_1403867106.jpg?type=f296_296",
      ],
      infoimage: [],
      color: ["#7d7d7d", "#865d10"],
      clicked: 1200,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "나랑 크룽지 먹을래?",
      saleInfo: 5,
      normalPr: 9500,
      image: [
        "https://shop-phinf.pstatic.net/20220622_297/1655861872866d85sN_JPEG/56997718556216326_1004639879.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20220622_64/1655861877819VUmhp_JPEG/56997723067386766_1461203258.jpg?type=m510",
      ],
      infoimage: [],
      color: ["#ff9b0e"],
      clicked: 1135,
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
      name: "애벌레야, 안녕",
      saleInfo: 20,
      normalPr: 18000,
      image: ["/images/subpage/item4.jpg", "/images/subpage/item4_1.jpg"],
      infoimage: [],
      color: ["#fe60c2", "#1dcc03", "#ffeb0c"],
      clicked: 982,
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
      name: "내가 너무 귀여운 탓인가",
      saleInfo: 15,
      normalPr: 15000,
      image: [
        "https://shop-phinf.pstatic.net/20220622_102/1655861796185iWHxA_JPEG/56997641675055614_1711392658.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20220622_7/1655861790836OM9oA_JPEG/56997636352752980_913818899.jpg?type=m510",
      ],
      infoimage: [],
      color: ["#ff9b0e", "#1dcc03", "#0ea7ff", "#ff0e0e"],
      clicked: 2000,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "청경채 청경재",
      saleInfo: 30,
      normalPr: 20000,
      image: [
        "https://puppydog.co.kr/web/product/big/202306/af62bd2845d0ed50e1e0f32e1de5e0e7.jpg",
        "https://puppydog.co.kr/web/product/big/202306/af62bd2845d0ed50e1e0f32e1de5e0e7.jpg",
      ],
      infoimage: [],
      color: ["#ffeb0c", "#1dcc03", "#0ea7ff", "#fe60c2"],
      clicked: 900,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "그냥 왕 물어버려(치석 제거)",
      saleInfo: 10,
      normalPr: 11000,
      image: ["/images/subpage/item8.jpg", "/images/subpage/item8_1.jpg"],
      infoimage: [],
      color: ["#ffeb0c", "#1dcc03", "#0ea7ff", "#fe60c2"],
      clicked: 999,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "더울 땐 아이스크림",
      saleInfo: 10,
      normalPr: 12000,
      image: [
        "https://shop-phinf.pstatic.net/20220622_36/1655861504599ro6rf_JPEG/56997350317792807_945107917.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20220622_198/1655861508378Bt109_JPEG/56997354093668207_1355805436.jpg?type=m510",
      ],
      infoimage: [],
      color: ["#865d10"],
      clicked: 1450,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "붕어빵 기계 장난감",
      saleInfo: 5,
      normalPr: 14000,
      image: ["/images/subpage/item2.jpg", "/images/subpage/item2_1.jpg"],
      infoimage: [],
      color: ["#7d7d7d", "#865d10"],
      clicked: 2200,
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
      name: "나랑 크룽지 먹을래?",
      saleInfo: 5,
      normalPr: 9500,
      image: [
        "https://shop-phinf.pstatic.net/20220622_297/1655861872866d85sN_JPEG/56997718556216326_1004639879.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20220622_64/1655861877819VUmhp_JPEG/56997723067386766_1461203258.jpg?type=m510",
      ],
      infoimage: [],
      color: ["#ff9b0e"],
      clicked: 1135,
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
    {
      name: "피자 한 입 먹을 견",
      saleInfo: 20,
      normalPr: 13000,
      image: ["/images/subpage/item7.jpg", "/images/subpage/item7-1.jpg"],
      infoimage: [],
      color: ["#ff9b0e", "#ff0e0e"],
      clicked: 1432,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "청경채 청경재",
      saleInfo: 30,
      normalPr: 20000,
      image: [
        "https://puppydog.co.kr/web/product/big/202306/af62bd2845d0ed50e1e0f32e1de5e0e7.jpg",
        "https://puppydog.co.kr/web/product/big/202306/af62bd2845d0ed50e1e0f32e1de5e0e7.jpg",
      ],
      infoimage: [],
      color: ["#ffeb0c", "#1dcc03", "#0ea7ff", "#fe60c2"],
      clicked: 900,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "Hello 해마",
      saleInfo: 25,
      normalPr: 16000,
      image: [
        "https://puppydog.co.kr/web/product/big/202306/163053c0ab8892ebf3c25e49a48f2c40.jpg",
        "https://puppydog.co.kr/web/product/big/202306/163053c0ab8892ebf3c25e49a48f2c40.jpg",
      ],
      infoimage: [],
      color: ["#1dcc03", "#ffeb0c"],
      clicked: 887,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "바나나 먹으면 나한테 바나나",
      saleInfo: 5,
      normalPr: 7500,
      image: [
        "https://shop-phinf.pstatic.net/20221110_218/1668047279892UmIuM_JPEG/69183059599346706_1257908217.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20221110_175/16680472703125ojCr_JPEG/69183050018559750_1403867106.jpg?type=f296_296",
      ],
      infoimage: [],
      color: ["#7d7d7d", "#865d10"],
      clicked: 1200,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "더울 땐 아이스크림",
      saleInfo: 10,
      normalPr: 12000,
      image: [
        "https://shop-phinf.pstatic.net/20220622_36/1655861504599ro6rf_JPEG/56997350317792807_945107917.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20220622_198/1655861508378Bt109_JPEG/56997354093668207_1355805436.jpg?type=m510",
      ],
      infoimage: [],
      color: ["#865d10"],
      clicked: 1450,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "뭐, 풍선 처음 봐?",
      saleInfo: 10,
      normalPr: 10000,
      image: [
        "https://shop-phinf.pstatic.net/20221230_29/16723840110040CxGk_JPEG/73519909700759419_247623899.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20221230_240/1672384019545UzBqj_JPEG/73519918233666949_1073249528.jpg?type=m510",
      ],
      infoimage: [],
      color: ["#fe60c2", "#1dcc03", "#ffeb0c"],
      clicked: 1444,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "나랑 크룽지 먹을래?",
      saleInfo: 5,
      normalPr: 9500,
      image: [
        "https://shop-phinf.pstatic.net/20220622_297/1655861872866d85sN_JPEG/56997718556216326_1004639879.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20220622_64/1655861877819VUmhp_JPEG/56997723067386766_1461203258.jpg?type=m510",
      ],
      infoimage: [],
      color: ["#ff9b0e"],
      clicked: 1135,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "윙크하는 체리",
      saleInfo: 20,
      normalPr: 10000,
      image: [
        "https://shop-phinf.pstatic.net/20220622_3/16558617140495Ie4w_JPEG/56997559537862602_1376681798.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20220622_41/16558617103374kJf4_JPEG/56997556034529665_1813476850.jpg?type=m510",
      ],
      infoimage: [],
      color: ["#ff9b0e", "#1dcc03", "#0ea7ff", "#ff0e0e"],
      clicked: 1398,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "피자 한 입 먹을 견",
      saleInfo: 20,
      normalPr: 13000,
      image: ["/images/subpage/item7.jpg", "/images/subpage/item7-1.jpg"],
      infoimage: [],
      color: ["#ff9b0e", "#ff0e0e"],
      clicked: 1432,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "곰도리 캔디 공 장난감(3개)",
      saleInfo: 25,
      normalPr: 16000,
      image: [
        "https://shop-phinf.pstatic.net/20221110_99/1668047462509Gclle_JPEG/69183242217934185_1522426491.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20221110_99/1668047462509Gclle_JPEG/69183242217934185_1522426491.jpg?type=m510",
      ],
      infoimage: [],
      color: ["#ff9b0e", "#1dcc03", "#0ea7ff", "#ff0e0e"],
      clicked: 1785,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
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
      name: "붕어빵 기계 장난감",
      saleInfo: 5,
      normalPr: 14000,
      image: ["/images/subpage/item2.jpg", "/images/subpage/item2_1.jpg"],
      infoimage: [],
      color: ["#7d7d7d", "#865d10"],
      clicked: 2200,
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
      name: "애벌레야, 안녕",
      saleInfo: 20,
      normalPr: 18000,
      image: ["/images/subpage/item4.jpg", "/images/subpage/item4_1.jpg"],
      infoimage: [],
      color: ["#fe60c2", "#1dcc03", "#ffeb0c"],
      clicked: 982,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "윙크하는 체리",
      saleInfo: 20,
      normalPr: 10000,
      image: [
        "https://shop-phinf.pstatic.net/20220622_3/16558617140495Ie4w_JPEG/56997559537862602_1376681798.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20220622_41/16558617103374kJf4_JPEG/56997556034529665_1813476850.jpg?type=m510",
      ],
      infoimage: [],
      color: ["#ff9b0e", "#1dcc03", "#0ea7ff", "#ff0e0e"],
      clicked: 1398,
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
    {
      name: "피자 한 입 먹을 견",
      saleInfo: 20,
      normalPr: 13000,
      image: ["/images/subpage/item7.jpg", "/images/subpage/item7-1.jpg"],
      infoimage: [],
      color: ["#ff9b0e", "#ff0e0e"],
      clicked: 1432,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "에그토스트 짱맛",
      saleInfo: 10,
      normalPr: 8700,
      image: [
        "https://shop-phinf.pstatic.net/20220622_16/1655861639641Rj5qS_JPEG/56997484945979985_1482470265.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20220622_84/16558616432463dOwW_JPEG/56997488694113469_797086549.jpg?type=m510",
      ],
      infoimage: [],
      color: ["#ffeb0c", "#1dcc03", "#0ea7ff", "#fe60c2"],
      clicked: 2023,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
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
      name: "붕어빵 기계 장난감",
      saleInfo: 5,
      normalPr: 14000,
      image: ["/images/subpage/item2.jpg", "/images/subpage/item2_1.jpg"],
      infoimage: [],
      color: ["#7d7d7d", "#865d10"],
      clicked: 2200,
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
      name: "애벌레야, 안녕",
      saleInfo: 20,
      normalPr: 18000,
      image: ["/images/subpage/item4.jpg", "/images/subpage/item4_1.jpg"],
      infoimage: [],
      color: ["#fe60c2", "#1dcc03", "#ffeb0c"],
      clicked: 982,
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
      name: "곰도리 캔디 공 장난감(3개)",
      saleInfo: 25,
      normalPr: 16000,
      image: [
        "https://shop-phinf.pstatic.net/20221110_99/1668047462509Gclle_JPEG/69183242217934185_1522426491.jpg?type=m510",
        "https://shop-phinf.pstatic.net/20221110_99/1668047462509Gclle_JPEG/69183242217934185_1522426491.jpg?type=m510",
      ],
      infoimage: [],
      color: ["#ff9b0e", "#1dcc03", "#0ea7ff", "#ff0e0e"],
      clicked: 1785,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "피자 한 입 먹을 견",
      saleInfo: 20,
      normalPr: 13000,
      image: ["/images/subpage/item7.jpg", "/images/subpage/item7-1.jpg"],
      infoimage: [],
      color: ["#ff9b0e", "#ff0e0e"],
      clicked: 1432,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
    {
      name: "그냥 왕 물어버려(마지막)",
      saleInfo: 10,
      normalPr: 11000,
      image: ["/images/subpage/item8.jpg", "/images/subpage/item8_1.jpg"],
      infoimage: [],
      color: ["#ffeb0c", "#1dcc03", "#0ea7ff", "#fe60c2"],
      clicked: 999,
      sizes: ["S", "M", "L"],
      colors: ["노랑", "연두"],
    },
  ];

  const [inputValue, setInputValue] = useState("");
  // ======== 상품 정렬을 위한 reducer 함수 시작 ========
  const arrayReducer = (state, action) => {
    switch (action.type) {
      case "search":
        setInputValue("");
        return inputValue === ""
          ? state
          : iteminfo.filter((it) => it.name.includes(inputValue));

      case "popular":
        return [...state].sort((a, b) => b.clicked - a.clicked);
      case "low":
        return [...state].sort((a, b) => a.normalPr - b.normalPr);
      case "high":
        return [...state].sort((a, b) => b.normalPr - a.normalPr);
      case "new":
        return iteminfo;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    dispatch({ type: "search" });
  };

  const [array, dispatch] = useReducer(arrayReducer, iteminfo);

  // 페이지 이동(onClick)에 따라 보여지는 배열 바꿔주기
  const [page, setPage] = useState(1);
  const itemsPerPage = 16;
  const startIndex = (page - 1) * itemsPerPage;
  const displayedItemInfo = array.slice(startIndex, startIndex + itemsPerPage);

  // return 시작
  return (
    <div className={styles.container}>
      <div className={styles.cate_wrap}>
        <h2 className={styles.title}>장난감</h2>
      </div>

      <div className={styles.sort}>
        <ul>
          <li onClick={() => dispatch({ type: "popular" })}>인기순</li>
          <li onClick={() => dispatch({ type: "high" })}>높은가격순</li>
          <li onClick={() => dispatch({ type: "low" })}>낮은가격순</li>
          <li onClick={() => dispatch({ type: "new" })}>신상품순</li>
        </ul>
        <p>총 {iteminfo.length}개의 상품</p>
      </div>

      <div className={styles.item_wrap}>
        <ItemInfo selectedIteminfo={displayedItemInfo} />
      </div>
      <div className={styles.search_bar}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="검색"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                onSubmit(e);
              }
            }}
          />
        </form>
        <span onClick={onSubmit}>🔍</span>
      </div>
      <RecentSeenItem />
      <PageNation setPage={setPage} />
    </div>
  );
};

export default ItemList;
