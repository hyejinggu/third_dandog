import styles from "../../css/common/recent_item.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const RecentSeenItem = () => {
  const seenItem = JSON.parse(sessionStorage.getItem("recentItem"));
  const limitedSeenItems = seenItem?.slice(0, 3) || []; // 세 개의 아이템만 보이도록 제한

  const [isClosed, setIsClosed] = useState(false); // 상태 추가

  if (!seenItem || seenItem.length === 0 || isClosed) {
    // seenItem이 없거나 빈 배열인 경우 또는 isClosed가 true인 경우 JSX를 보이지 않음
    return null;
  }

  const closeItems = () => {
    setIsClosed(true); // X 버튼을 누르면 상태를 변경하여 JSX를 보이지 않도록 함
  };

  return (
    <div className={styles.recent_item_container}>
      <ul>
        <li onClick={closeItems}>✖</li>
        {limitedSeenItems.map((i, index) => (
          <li key={index} className={styles.item_info_wrap}>
            <Link to="/itemdetail" state={{ item: i }}>
              <h4>{i.item_name}</h4>
              <div>
                <img src={`/images/item/${i.item_img1}`} alt="상품이미지" />
              </div>
              <span>{i.item_discount_rate}%</span>
              <span>{i.item_price.toLocaleString("ko")}원</span>
              <br />
              <span>
                {(
                  i.item_price -
                  (i.item_price * i.item_discount_rate) / 100
                ).toLocaleString("ko")}
                원
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSeenItem;
