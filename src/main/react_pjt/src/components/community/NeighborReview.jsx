import styles from "../../css/subpage/community_neighbor.module.css";
import { useEffect } from "react";
import axios from "axios";

const NeiborReview = () => {
  const neighborArray[] = new Array;
  useEffect(() => {
    axios
      .get("/neighbor/beautyReview")
      .then((res) => {
        neighborArray = res.data;
        console.log(res.data);
      })
      .catch((res) => console.log(res));
  }, []);

  return (
    <div className={styles.review_wrap}>
      <ul>
        <div className={styles.review_title}>review</div>
        {neighborArray.map((it, index) => (
          <li key={index}>
            <p>{it.title}</p>
            <span>{it.content}</span>
            <span>{it.grade}</span>
            <span>{it.userid}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NeiborReview;
