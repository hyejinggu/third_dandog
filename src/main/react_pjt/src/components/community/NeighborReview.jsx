import styles from "../../css/subpage/community_neighbor.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const NeiborReview = () => {
  const [neighborArray, setNeighborArray] = useState([]);
  useEffect(() => {
    axios
      .get("/neighbor/beautyReview")
      .then((res) => {
        setNeighborArray(res.data);
        console.log(res.data);
      })
      .catch((res) => console.log(res));
  }, []);

  return (
    <div className={styles.review_wrap}>
      <div className={styles.review_title}>review</div>
      <ul>
        {neighborArray.map((it, index) => (
          <li key={index}>
            <p>{it.user_id}</p>
            <span>{it.neighbor_brand_name}</span>
            <span>{it.neighbor_title}</span>
            <span>{it.neighbor_content}</span>
            <span>{it.rating}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NeiborReview;
