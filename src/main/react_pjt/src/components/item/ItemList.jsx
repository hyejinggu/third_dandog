import ItemInfo from "./ItemInfo";
import RecentSeenItem from "./RecentSeenItem";
import styles from "../../css/subpage/Itemlist.module.css";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const ItemList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  // ======== 상품 목록 배열 ========

  const [itemList, setItemList] = useState([]);
  const [itemSort, setItemSort] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue("");
    handleItemList(
      `/item/getItemList?category=${category}&sort=${itemSort}&inputValue`
    );
  }, [category]);

  useEffect(() => {
    handleItemList(
      `/item/getItemList?category=${category}&sort=${itemSort}&inputValue=${inputValue}`
    );
  }, [itemSort]);

  const handleInputValue = () => {
    handleItemList(
      `/item/getItemList?category=${category}&sort=${itemSort}&inputValue=${inputValue}`
    );
  };

  const handleItemList = (requestURL) => {
    axios
      .get(`${requestURL}`)
      .then((res) => {
        setItemList(res.data);
        setItemList((prevItemList) => {
          const uniqueItemNames = [];
          const itemNamesSet = new Set();

          prevItemList.forEach((item) => {
            if (!itemNamesSet.has(item.item_name)) {
              itemNamesSet.add(item.item_name);
              uniqueItemNames.push(item);
            }
          });
          return uniqueItemNames;
        });
      })
      .catch((res) => console.log(res));
  };

  const handleSort = (e) => {
    switch (e.target.innerText) {
      case "인기순":
        setItemSort("popular");
        break;
      case "높은가격순":
        setItemSort("high");
        break;
      case "낮은가격순":
        setItemSort("low");
        break;
      case "신상품순":
        setItemSort("new");
        break;
      default:
        setItemSort("new");
        break;
    }
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
          <li onClick={(e) => handleSort(e)}>인기순</li>
          <li onClick={(e) => handleSort(e)}>높은가격순</li>
          <li onClick={(e) => handleSort(e)}>낮은가격순</li>
          <li onClick={(e) => handleSort(e)}>신상품순</li>
        </ul>
        <div className={styles.search_bar}>
          <div>
            <input
              type="text"
              placeholder="검색"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  handleInputValue();
                }
              }}
            />
          </div>
          <span onClick={handleInputValue}>🔍</span>
        </div>
      </div>

      <div className={styles.item_wrap}>
        <ItemInfo itemList={itemList} />
      </div>
      <p className={styles.item_count}>총 {itemList.length}개의 상품</p>

      {/* <RecentSeenItem /> */}
      <Pagination setPage={""} />
    </div>
  );
};

export default ItemList;
