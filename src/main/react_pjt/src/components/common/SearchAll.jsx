import React, { useEffect, useState } from "react";
import styles from "../../css/common/search_all.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SearchAll() {
  const { searchAllValue } = useParams();
  const [items, setItems] = useState([]);
  const [lounges, setLounges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/searchall/${searchAllValue}`);
        const { lounges, items } = response.data;

        // 중복된 item_name 제거
        const uniqueItems = [
          ...new Set(items.map((item) => item.item_name)),
        ].map((itemName) => {
          return items.find((item) => item.item_name === itemName);
        });

        // 받아온 데이터를 상태에 업데이트
        setItems(uniqueItems || []);
        setLounges(lounges || []);
      } catch (error) {
        console.error("AxiosError:", error);
      }
    };

    fetchData();
  }, [searchAllValue]);

  return (
    <div id="wrap">
      <h2 className={styles.title}>'{searchAllValue}'의 검색 결과</h2>
      <div className={styles.searched_area}>
        <div className={styles.resultsContainer}>
          <div className={styles.itemResults}>
            <h2>상품 검색 결과</h2>
            <ul>
              {items.map((i) => (
                <li key={i.item_no}>
                  <img src={`/images/item/${i.item_img1}`} alt="" />
                  <p>{i.item_name}</p>
                  <p>{i.item_category}</p>
                  <p>{i.item_price}</p>
                  {/* 추가 필요한 정보들도 이와 같이 출력할 수 있습니다 */}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.boardResults}>
            <h2>고객센터 검색 결과</h2>
            {/* 고객센터 검색 결과를 여기에 나열 */}
            <ul>
              <li>FAQ 1</li>
              <li>문의 내역 2</li>
              {/* ... */}
            </ul>
          </div>
          <div className={styles.communityResults}>
            <h2>커뮤니티 검색 결과</h2>
            {/* 커뮤니티 검색 결과를 여기에 나열 */}
            <ul>
              <li>{lounges.lounge_no}</li>
              <li>토론 글 2</li>
              {/* ... */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
