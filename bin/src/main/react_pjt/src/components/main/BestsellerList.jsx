import React from "react";
import styles from "../../css/main/main.module.css";
import { Link } from "react-router-dom";

const BestsellerList = ({ selectedIteminfo }) => {
  return (
    <ul className={styles.bestseller}>
      {selectedIteminfo.map((item, index) => (
        <li key={index}>
          <Link to="/itemdetail" state={{ item: item }}>
            <div className={styles.item_info_wrap}>
              <img
                src={`/images/item/${item.item_img1}`}
                alt={`상품 ${index + 1}`}
              />
              <h3>{item.item_name}</h3>
              <span className={styles.sale_info}>
                {item.item_discount_rate}%
              </span>
              <span className={styles.normal_pr}>
                {item.item_price.toLocaleString("ko")}원
              </span>
              <span className={styles.present_pr}>
                {(
                  item.item_price -
                  (item.item_price * item.item_discount_rate) / 100
                ).toLocaleString("ko")}
                원
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BestsellerList;
