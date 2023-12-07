import styles from "../../css/subpage/create_review.module.css";
import React, { useState, useRef, useContext } from "react";
import Modal from "../common/Modal";
import axios from "axios";

const CreatePost = () => {
  // const { addPostFromLocalStorage } = useContext(CreatePostContext);

  // const [image, setImage] = useState(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starRatings, setStarRatings] = useState([1, 1, 1, 1, 1]); // 모든 별이 선택된 상태로 시작
  const [selectedRating, setSelectedRating] = useState(0); // 기본적으로 5점 선택

  const handleStarClick = (index) => {
    const updatedRatings = starRatings.map((rating, i) => {
      return i <= index ? 1 : 0; // 클릭한 별을 포함하여 그 이전의 별은 전체로 채우기
    });
    setStarRatings(updatedRatings);
    setSelectedRating(index + 1); // 클릭한 별에 대한 등급 설정
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postTitle) {
      titleRef.current.focus();
    } else if (!postContent) {
      contentRef.current.focus();
    } else {
      let formData = new FormData(document.getElementById("review_form"));

      let url = "/neighbor/createReview";

      axios
        .post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          alert(`response.data : ${response.data}`);
          // location.reload();
        })
        .catch((err) => {
          if (err.response.status == "502") {
            alert("[입력오류] 다시 시도하세요.");
          } else {
            alert("[시스템 오류] 잠시 후에 다시 시도하세요." + err.message);
          }
        });

      setIsModalOpen(true);
    }
  };

  return (
    <div className={styles.createpost_wrap}>
      <div>
        {isModalOpen && (
          <Modal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modalContent={"글 작성이 완료되었습니다."}
            modalAfterPath={"/community/lounge/*"}
          />
        )}
      </div>
      <h2>리뷰 작성</h2>
      <div className={styles.form_wrap}>
        <form onSubmit={handleSubmit} id="review_form">
          <table>
            <tr className={styles.title_wrap}>
              <th>
                <label htmlFor="title">제목</label>
              </th>
              <td colSpan={3}>
                <select
                  className={styles.title_input}
                  name="neighbor_category"
                  id="commmu_board_select"
                >
                  <option value="beauty">미용</option>
                  <option value="hospital">병원</option>
                  <option value="cafe">카페, 호텔</option>
                  <option value="training">훈련, 시터</option>
                </select>
                <input
                  className={styles.title_input}
                  type="text"
                  name="neighbor_title"
                  id="title"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  ref={titleRef}
                />
                <span className={styles.empty_alert}>
                  {postTitle ? "" : "제목을 입력하세요"}
                </span>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="brand">상호명</label>
              </th>
              <td>
                <input type="text" id="brand" name="neighbor_brand_name" />
              </td>
              <th>
                <label htmlFor="rating">별점</label>
              </th>
              <td>
                <div className={styles.star_rating}>
                  {[0, 1, 2, 3, 4].map((index) => (
                    <span
                      key={index}
                      className={`${styles.star} ${
                        starRatings[index] === 1 ? styles.full : ""
                      }`}
                      onClick={() => handleStarClick(index)}
                    >
                      ★
                    </span>
                  ))}
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
                  name="neighbor_content"
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

export default CreatePost;
