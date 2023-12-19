import ItemInfo from "./ItemInfo";
import RecentSeenItem from "./RecentSeenItem";
import styles from "../../css/subpage/Itemlist.module.css";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ItemList = () => {
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  // ======== 상품 목록 배열 ========

  const [itemList, setItemList] = useState([]);
  const [itemSort, setItemSort] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    setInputValue("");
    switch (category) {
      case "snack":
        setTitle("간식•사료");
        break;
      case "toy":
        setTitle("장난감");
        break;
      case "living":
        setTitle("리빙•패션");
        break;
      case "stroll":
        setTitle("산책•케어");
        break;
      default:
        setTitle("간식•사료");
        break;
    }
    setCurrentPage(1);
    handleItemList(`?category=${category}&sort=new&inputValue`);
  }, [category]);

  useEffect(() => {
    handleItemList(
      `?category=${category}&sort=${itemSort}&inputValue=${inputValue}`
    );
  }, [itemSort]);

  const handleInputValue = () => {
    handleItemList(
      `?category=${category}&sort=${itemSort}&inputValue=${inputValue}`
    );
  };

  const handleItemList = (requestURL) => {
    axios
      .get(`/item/getItemList${requestURL}`)
      .then((res) => {
        setItemList((prevItemList) => {
          const itemMap = new Map();

          res.data.forEach((item) => {
            const itemName = item.item_name;

            if (
              !itemMap.has(itemName) ||
              itemMap.get(itemName).item_no > item.item_no
            ) {
              itemMap.set(itemName, item);
            }
          });

          const uniqueItemNames = Array.from(itemMap.values());
          return uniqueItemNames;
        });
      })
      .catch((error) => console.error(error));
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

  // pagination 구현
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const listPerPage = 16; // 페이지 당 게시글 개수
  const totalPages = Math.ceil(itemList.length / listPerPage); // 전체 페이지 번호

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * listPerPage;
    const endIndex = startIndex + listPerPage;
    return itemList.slice(startIndex, endIndex);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPage]);

  // return 시작
  return (
    <div className={styles.itemlist_wrap}>
      <div className={styles.container}>
        <div className={styles.cate_wrap}>
          <h2 className={styles.title}>{title}</h2>
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
          <ItemInfo itemList={getPaginatedData()} />
        </div>
        <p className={styles.item_count}>총 {itemList.length}개의 상품</p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div
        className={styles.recent_seen}
        style={{ transform: `translateY(${scrollY}px)` }}
      >
        <RecentSeenItem />
      </div>
    </div>
  );
};

export default ItemList;
