import styles from "../../css/subpage/community_neighbor.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const NeighborReview = ({ category }) => {
  const [neighborArray, setNeighborArray] = useState([]);
  useEffect(() => {
    axios
      .get("/neighbor/" + category)
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
          <li key={index}>
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
