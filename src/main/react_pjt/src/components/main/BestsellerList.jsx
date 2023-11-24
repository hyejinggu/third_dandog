import React from "react";
import styles from "../../css/main/main.module.css";
import { Link } from "react-router-dom";

const BestsellerList = ({ selectedIteminfo, presentPr, normalPr }) => {
  return (
    <ul className={styles.bestseller}>
      {selectedIteminfo.map((item, index) => (
        <li key={index}>
          <Link
            to="/itemdetail"
            state={{ selectedItem: selectedIteminfo[index] }}
          >
            <div className={styles.item_info_wrap}>
              <img src={item.image[0]} alt={`상품 ${index + 1}`} />
              <h3>{item.name}</h3>
              <span className={styles.sale_info}>{item.saleInfo}%</span>
              <span className={styles.normal_pr}>{item.normalPr.toLocaleString("ko")}원</span>
              <span className={styles.present_pr}>
                {(
                  item.normalPr -
                  (item.normalPr * item.saleInfo) / 100
                ).toLocaleString("ko")}원
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BestsellerList;
