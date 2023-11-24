import { Link } from "react-router-dom";
import styles from "../../css/subpage/Itemlist.module.css";
import React from "react";

function ItemInfo({ selectedIteminfo }) {
  return (
    <div>
      <ul>
        {selectedIteminfo.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              localStorage.getItem("recentItem")
                ? localStorage.setItem(
                    "recentItem",
                    JSON.stringify([
                      item,
                      ...JSON.parse(localStorage.getItem("recentItem")),
                    ])
                  )
                : localStorage.setItem("recentItem", JSON.stringify([item]));
            }}
          >
            <Link
              to="/itemdetail"
              state={{ selectedItem: selectedIteminfo[index] }}
            >
              <div className={styles.item_container}>
                <div className={styles.normal_item}>
                  <img src={item.image[0]} alt="" />
                  <img src={item.image[1]} alt="" />
                </div>
                <div className={styles.item_info_wrap}>
                  <h3>{item.name}</h3>
                  <span>{item.saleInfo}%</span>
                  <span>{item.normalPr.toLocaleString("ko")}원</span>
                  <span>
                    {(
                      item.normalPr -
                      (item.normalPr * item.saleInfo) / 100
                    ).toLocaleString("ko")}
                    원
                  </span>
                </div>
                <div className={styles.color}>
                  {item.color.map((color, colorIdx) => (
                    <span
                      key={colorIdx}
                      title={color}
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(ItemInfo);
