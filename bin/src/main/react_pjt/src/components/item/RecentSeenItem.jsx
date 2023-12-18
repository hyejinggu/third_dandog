import styles from "../../css/common/recent_item.module.css";
import { useState } from "react";

const RecentSeenItem = () => {
  const seenItem = JSON.parse(localStorage.getItem("recentItem"));
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
        {limitedSeenItems.map((item, index) => (
          <li key={index}>
            <span>{item.name}</span>
            <div>
              <img src={item.image[1]} alt="상품이미지" />
            </div>
            <span>
              {(
                item.normalPr -
                (item.normalPr * item.saleInfo) / 100
              ).toLocaleString("ko")}
              원
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSeenItem;
