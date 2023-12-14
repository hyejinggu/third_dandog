import styles from "../../css/subpage/create_review.module.css";
import React, { useState, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../common/Modal";
import axios from "axios";

const ItemReview = () => {
  const location = useLocation();
  const order = location.state.order;
  const item_name = location.state.item_name;
  // const { addPostFromLocalStorage } = useContext(CreatePostContext);

  // const [image, setImage] = useState(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starRatings, setStarRatings] = useState([1, 1, 1, 1, 1]); // 모든 별이 선택된 상태로 시작
  const [selectedRating, setSelectedRating] = useState(5); // 기본적으로 5점 선택

  const handleStarClick = (index) => {
    const updatedRatings = starRatings.map((rating, i) => {
      return i <= index ? 1 : 0; // 클릭한 별을 포함하여 그 이전의 별은 전체로 채우기
    });
    setStarRatings(updatedRatings);
    setSelectedRating(index + 1); // 클릭한 별에 대한 등급 설정
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postContent) {
      contentRef.current.focus();
    } else {
      const formData = new FormData(document.getElementById("review_form"));

      const url = "/mypage/createReview";

      axios
        .post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          // location.reload();
          setIsModalOpen(true);
        })
        .catch((err) => {
          if (err.response.status == "502") {
            alert("[입력오류] 다시 시도하세요.");
          } else {
            alert("[시스템 오류] 잠시 후에 다시 시도하세요." + err.message);
          }
        });

    }
  };

  return (
    <div className={styles.createpost_wrap}>
      <div>
        {isModalOpen && (
          <Modal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modalContent={"리뷰 작성이 완료되었습니다."}
            modalAfterPath={"/OrderInquiry"}
          />
        )}
      </div>
      <h2>리뷰 작성</h2>
      <div className={styles.form_wrap}>
        <form onSubmit={handleSubmit} id="review_form">
          <input
            type="hidden"
            value={sessionStorage.getItem("loginId")}
            name="user_id"
          />
          <table>
            <tr className={styles.brand_star_wrap}>
              <th>
                <label htmlFor="brand">상품명</label>
              </th>
              <td>
                <input type="text" id="item_no" name="item_no" value={order.item_no} hidden />
                <input type="text" id="order_num" name="order_num" value={order.order_num} hidden />
                <span>{item_name}</span>
              </td>
              <th>
                <label htmlFor="rating">별점</label>
              </th>
              <td>
                <div className={styles.star_rating}>
                  {[0, 1, 2, 3, 4].map((index) => (
                    <span
                      key={index}
                      className={`${styles.star} ${starRatings[index] === 1 ? styles.full : ""
                        }`}
                      onClick={() => handleStarClick(index)}
                    >
                      ★
                    </span>
                  ))}
                  <input
                    type="hidden"
                    value={selectedRating}
                    name="review_star"
                  />
                </div>
              </td>
            </tr>
            <tr className={styles.content_wrap}>
              <th>
                <label htmlFor="content">내용</label>
              </th>
              <td colSpan={3}>
                <textarea
                  id="content"
                  name="review_content"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  ref={contentRef}
                />
                <div className={styles.empty_alert}>
                  {postContent ? "" : "내용을 입력하세요"}
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <div className={styles.button_wrap}>
                  <div onClick={handleSubmit}>작성 완료</div>
                </div>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
};

export default ItemReview;
