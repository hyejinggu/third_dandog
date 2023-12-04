// import "../../css/subpage/community_lounge.css";
import styles from "../../css/subpage/community_lounge.module.css";
import PageNation from "../item/PageNation";
import CommunityPost from "./CommunityPost";
import SideBar from "./SideBar";
import React, { useReducer, useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
// import { CreatePostContext } from "./Community";

export default function Lounge() {
  const [loungeArray, setLoungeArray] = useState([]);
  const loungeList = loungeArray;
  useEffect(() => {
    axios
      .get("/lounge/allLoungeList")
      .then((res) => {
        setLoungeArray(res.data);
        console.log(res.data);
      })
      .catch((res) => console.log(res));
  }, []);

  const arrayReducer = (state, action) => {
    switch (action.type) {
      // 글 정렬 case
      case "popular":
        return [...state].sort(
          (a, b) => b.recommended + b.views - (a.recommended + a.views)
        );
      case "notice":
        return loungeList;

      // 글 검색 case
      case "allPost":
        return inputValue === ""
          ? state
          : loungeList.filter(
              (it) =>
                it.title.includes(inputValue) ||
                it.content.includes(inputValue) ||
                it.userid.includes(inputValue)
            );
      case "postTitle":
        return inputValue === ""
          ? state
          : loungeList.filter((it) => it.title.includes(inputValue));
      case "postContent":
        return inputValue === ""
          ? state
          : loungeList.filter((it) => it.content.includes(inputValue));
      case "postUserId":
        return inputValue === ""
          ? state
          : loungeList.filter((it) => it.userid.includes(inputValue));
      default:
        return loungeList;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: selectedValue }); // 글 목록 정렬
  };

  // 글 검색을 위해 select, input value에 useState 설정
  const [selectedValue, setSelectedValue] = useState("allPost");
  const [inputValue, setInputValue] = useState("");

  // 사이드 바 선택
  const [category, setCategory] = useState("자유 게시판");

  // 글 추가, 정렬을 위해 useReducer 설정
  const [array, dispatch] = useReducer(arrayReducer, loungeList);

  // page 이동
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (page - 1) * itemsPerPage;
  const displayedItemInfo = array.slice(startIndex, startIndex + itemsPerPage);

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
          <li onClick={() => dispatch({ type: "popular" })}>인기글</li>
          <li onClick={() => dispatch({ type: "notice" })}>공지사항</li>
          <li>최신순</li>
          <li>오래된순</li>
        </ul>
        <p>총 {loungeArray.length}개의 글</p>
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
            <div className={styles.search_bar}>
              <form onSubmit={onSubmit}>
                <select
                  onChange={(e) => setSelectedValue(e.target.value)}
                  name="search_condition"
                  id="search_condition"
                >
                  <option value="allPost">전체</option>
                  <option value="postTitle">제목</option>
                  <option value="postContent">내용</option>
                  <option value="postUserId">작성자</option>
                </select>
                <input
                  onChange={(e) => setInputValue(e.target.value)}
                  type="text"
                  placeholder="검색"
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      onSubmit(e);
                    }
                  }}
                />
              </form>
              <span onClick={() => dispatch({ type: selectedValue })}>🔍</span>
            </div>

            <Link to="/community/createpost">
              <button>글쓰기</button>
            </Link>
          </div>
        </div>
      </div>

      {/* 페이지 이동 */}
      <PageNation setPage={setPage} />
    </div>
  );
}
