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

  return (
    <div className={styles.review_wrap}>
      <div className={styles.review_title}>review</div>
      <ul>
        {neighborArray.map((it, index) => (
          <li key={it.neighbor_no}>
            <p>{it.neighbor_brand_name}</p>
            <span>
              <p>{it.neighbor_title}</p>
              {it.neighbor_content}
            </span>
            <span>{it.neighbor_rating}</span>
            <span>{it.regdate}</span>
            <span>{it.user_id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NeighborReview;
