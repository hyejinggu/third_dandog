import styles from "../../css/subpage/community_lounge.module.css";
import { useState } from "react";

export default function SideBar({ content, setCategory }) {
  const loungeSide = ["자유 게시판", "고민 상담소", "지식 공유", "친구 찾기"];
  const neighborSide = [
    "beautyReview",
    "hospitalReview",
    "cafeReview",
    "trainingReview",
  ];

  const sidebarItems = content === "lounge" ? loungeSide : neighborSide;
  // 현재 선택된 카테고리
  const [currentCategory, setCurrentCategory] = useState(sidebarItems[0]);

  // 클릭 시 배열 바꿔주기
  const handleCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setCurrentCategory(selectedCategory); // 현재 카테고리 업데이트
  };

  return (
    <div className={styles.side_bar_wrap}>
      <ul className={styles.side_bar}>
        {sidebarItems.map((content, index) => (
          <li
            className={currentCategory === content ? styles.sidebar_active : ""}
            onClick={() => handleCategory(content)}
            key={index}
          >
            {content}
          </li>
        ))}
      </ul>
    </div>
  );
}
