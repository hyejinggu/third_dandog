import styles from "../../css/main/main.module.css";
import BestsellerList from "./BestsellerList";
import { useEffect, useState } from "react";
import axios from "axios";

const Bestseller = () => {
  const [category, setCategory] = useState("Snack");
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    axios
      .get("/item/bestseller?category=" + category)
      .then((res) => {
        // 중복된 item_name을 걸러내는 코드
        const uniqueBestSeller = res.data.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.item_name === item.item_name)
        );

        setBestSeller(uniqueBestSeller);
        console.log(uniqueBestSeller);
      })
      .catch((error) => console.error(error));
  }, [category]);

  return (
    <div className={styles.bestseller_wrap}>
      <h1>베스트 셀러 상품</h1>
      <div className={styles.bestseller_list}>
        <div onClick={() => setCategory("Snack")}>
          <h2>간식, 사료</h2>
        </div>
        <div onClick={() => setCategory("Toy")}>
          <h2>장난감</h2>
        </div>
        <div onClick={() => setCategory("Living")}>
          <h2>리빙, 패션</h2>
        </div>
        <div onClick={() => setCategory("Stroll")}>
          <h2>산책, 케어</h2>
        </div>
      </div>
      <BestsellerList selectedIteminfo={bestSeller} />
    </div>
  );
};

export default Bestseller;
