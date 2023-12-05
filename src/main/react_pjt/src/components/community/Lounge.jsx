// import "../../css/subpage/community_lounge.css";
import styles from "../../css/subpage/community_lounge.module.css";
import PageNation from "../item/PageNation";
import CommunityPost from "./CommunityPost";
import SideBar from "./SideBar";
import React, { useReducer, useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
export default function Lounge() {
  const [loungeArray, setLoungeArray] = useState([]);
  const loungeList = loungeArray;
  const [itemSort, setItemSort] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState("자유 게시판");
  // 글 검색을 위해 select, input value에 useState 설정
  const [filterValue, setFilterValue] = useState("all");
  let queryCategory = "free";
  useEffect(() => {
    switch (category) {
      case "자유 게시판":
        queryCategory = "free";
        break;
      case "고민 상담소":
        queryCategory = "trouble";
        break;
      case "지식 공유":
        queryCategory = "sharing";
        break;
      case "친구 찾기":
        queryCategory = "friends";
        break;
      default:
        queryCategory = "free";
        break;
    }
    axios
      .get(
        `/lounge/loungeList?category=${queryCategory}&sort${itemSort}&inputValue=${inputValue}`
      )
      .then((res) => {
        setLoungeArray(res.data);
        console.log(res.data);
      })
      .catch((res) => console.log(res));
  }, [category]);

  const handleInputValue = () => {
    handleItemList(
      `/item/loungeList?category=${queryCategory}&sort=${itemSort}&inputValue=${inputValue}`
    );
  };

  const handleItemList = (requestURL) => {};

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

  // 글 추가, 정렬을 위해 useReducer 설정
  // const [array, dispatch] = useReducer(arrayReducer, loungeList);

  // page 이동
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (page - 1) * itemsPerPage;
  // const displayedItemInfo = array.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div id="wrap" className={styles.lounge_container}>
      <div className={styles.title}>
        <strong>
          <NavLink to="/community/lounge">라운지</NavLink>
          <NavLink to="/community/event">이벤트</NavLink>
          <NavLink to="/community/neighborhood">우리 동네</NavLink>
        </strong>
      </div>
      {/* 글 정렬, 사이드 바 */}
      <div className={styles.sort}>
        <ul>
          <li onClick={(e) => handleSort(e)}>인기글</li>
          <li onClick={(e) => handleSort(e)}>공지사항</li>
          <li onClick={(e) => handleSort(e)}>최신순</li>
          <li onClick={(e) => handleSort(e)}>오래된순</li>
        </ul>
        <div className={styles.search_bar}>
          <select
            onChange={(e) => setFilterValue(e.target.value)}
            name="search_condition"
            id="search_condition"
          >
            <option value="all">전체</option>
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="id">작성자</option>
          </select>
          <input
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="검색"
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleInputValue(e);
              }
            }}
          />

          <span onClick={handleInputValue}>🔍</span>
        </div>
      </div>
      <div className={styles.content_wrap}>
        <SideBar content="lounge" setCategory={setCategory} />

        {/* 글 목록 시작 */}
        <div className={styles.post_wrap}>
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>이미지</th>
                <th>제목 및 내용</th>
                <th>작성자</th>
                <th>날짜</th>
                <th>추천수</th>
                <th>조회수</th>
              </tr>
            </thead>
            <CommunityPost loungeArray={loungeArray} />
          </table>

          {/* 검색 및 글쓰기 */}
          <div className={styles.search_and_post}>
            <p>총 {loungeArray.length}개의 글</p>

            {sessionStorage.getItem("loginId") == null ? (
              ""
            ) : (
              <Link to="/community/createpost">
                <button>글쓰기</button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 페이지 이동 */}
      <PageNation setPage={setPage} />
    </div>
  );
}
