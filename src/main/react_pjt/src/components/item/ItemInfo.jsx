import { Link } from "react-router-dom";
import styles from "../../css/subpage/Itemlist.module.css";
import React from "react";

function ItemInfo({ itemList }) {
  return (
    <div>
      <ul>
        {itemList.map((i, index) => (
          <li
            key={i.item_no}
            // onClick={() => {
            //   localStorage.getItem("recentItem")
            //     ? localStorage.setItem(
            //         "recentItem",
            //         JSON.stringify([
            //           i,
            //           ...JSON.parse(localStorage.getItem("recentItem")),
            //         ])
            //       )
            //     : localStorage.setItem("recentItem", JSON.stringify([i]));
            // }}
          >
            <Link to="/itemdetail" state={{ item: i }}>
              <div className={styles.item_container}>
                <div className={styles.normal_item}>
                  <img src={`/images/item/${i.item_img1}`} alt="" />
                  <img src={`/images/item/${i.item_img2}`} alt="" />
                </div>
                <div className={styles.item_info_wrap}>
                  <h3>{i.item_name}</h3>
                  <span>{i.item_discount_rate}%</span>
                  <span>{i.item_price.toLocaleString("ko")}원</span>
                  <span>
                    {(
                      i.item_price -
                      (i.item_price * i.item_discount_rate) / 100
                    ).toLocaleString("ko")}
                    원
                  </span>
                </div>
                {/* <div className={styles.color}>
                  {i.options_color.map((color, colorIdx) => (
                    <span
                      key={colorIdx}
                      title={color}
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </div> */}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemInfo;
