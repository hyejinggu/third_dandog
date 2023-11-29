import ItemInfo from "./ItemInfo";
import RecentSeenItem from "./RecentSeenItem";
import styles from "../../css/subpage/Itemlist.module.css";
import PageNation from "./PageNation";
import { useReducer, useState, useEffect } from "react";
import axios from "axios";

const ItemList = () => {
  // ======== 상품 목록 배열 ========
  const [itemList, setItemList] = useState([]);
  const [itemSort, setItemSort] = useState("");
  useEffect(() => {
    axios
      .get("/item/sortedList?sort=" + itemSort)
      .then((res) => {
        setItemList(res.data);
        console.log(res.data);
      })
      .catch((res) => console.log(res));
  }, [itemSort]);

  // const [inputValue, setInputValue] = useState("");
  // // ======== 상품 정렬을 위한 reducer 함수 시작 ========
  // const arrayReducer = (state, action) => {
  //   switch (action.type) {
  //     case "search":
  //       setInputValue("");
  //       return inputValue === ""
  //         ? state
  //         : itemList.filter((it) => it.name.includes(inputValue));

  //     case "popular":
  //       return [...state].sort((a, b) => b.clicked - a.clicked);
  //     case "low":
  //       return [...state].sort((a, b) => a.normalPr - b.normalPr);
  //     case "high":
  //       return [...state].sort((a, b) => b.normalPr - a.normalPr);
  //     case "new":
  //       return itemList;
  //   }
  // };

  const onSubmit = (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    // dispatch({ type: "search" });
  };

  // const [array, dispatch] = useReducer(arrayReducer, itemList);

  // // 페이지 이동(onClick)에 따라 보여지는 배열 바꿔주기
  // const [page, setPage] = useState(1);
  // const itemsPerPage = 16;
  // const startIndex = (page - 1) * itemsPerPage;
  // const displayedItemInfo = array.slice(startIndex, startIndex + itemsPerPage);

  // return 시작
  return (
    <div className={styles.container}>
      <div className={styles.cate_wrap}>
        <h2 className={styles.title}>장난감</h2>
      </div>

      <div className={styles.sort}>
        <ul>
          <li onClick={() => setItemSort("popular")}>인기순</li>
          <li onClick={() => setItemSort("high")}>높은가격순</li>
          <li onClick={() => setItemSort("low")}>낮은가격순</li>
          <li onClick={() => setItemSort("new")}>신상품순</li>
        </ul>
        <p>총 {itemList.length}개의 상품</p>
      </div>

      <div className={styles.item_wrap}>
        <ItemInfo itemList={itemList} />
      </div>
      <div className={styles.search_bar}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="검색"
            // value={inputValue}
            // onChange={(e) => setInputValue(e.target.value)}
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
      <PageNation setPage={""} />
    </div>
  );
};

export default ItemList;
