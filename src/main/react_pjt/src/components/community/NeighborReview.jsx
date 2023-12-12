import styles from "../../css/subpage/community_neighbor.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const NeighborReview = ({ category }) => {
  const [neighborArray, setNeighborArray] = useState([]);
  useEffect(() => {
    let queryCategory = "beauty";
    switch (category) {
      case "뷰티, 미용":
        queryCategory = "beauty";
        break;
      case "병원":
        queryCategory = "hospital";
        break;
      case "카페, 호텔":
        queryCategory = "cafe";
        break;
      case "훈련, 시터":
        queryCategory = "training";
        break;
      default:
        queryCategory = "beauty";
        break;
    }
    axios
      .get("/neighbor/review?category=" + queryCategory)
      .then((res) => {
        setNeighborArray(res.data);
        console.log(res.data);
      })
      .catch((res) => console.log(res));
  }, [category]);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    const day = dateObject.getDate();
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={styles.review_wrap}>
      <div className={styles.review_title}>review</div>
      <ul>
        <li>
          <span>상호명</span>
          <span>제목 및 내용</span>
          <span>별점</span>
          <span>등록 날짜</span>
          <span>작성자</span>
        </li>
        {neighborArray.map((it, index) => (
          <li key={it.neighbor_no} className={styles.neighbor_review}>
            <p>{it.neighbor_brand_name}</p>
            <span>
              <p>{it.neighbor_title}</p>
              <p>{it.neighbor_content}</p>
            </span>
            <span>{it.neighbor_rating}</span>
            <span>{formatDate(it.regdate)}</span>
            <span>{it.user_id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NeighborReview;
