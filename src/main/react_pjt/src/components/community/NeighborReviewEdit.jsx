import styles from "../../css/subpage/create_review.module.css";
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../common/Modal";
import axios from "axios";

const NeighborReviewEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const neighbor_no = location.state.neighbor_no;
  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get(`/neighbor/selectOne?neighbor_no=${neighbor_no}`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
        setPostTitle(res.data.neighbor_title);
        setPostContent(res.data.neighbor_content);
        setSelectedCategory(res.data.neighbor_category);
        setSelectedRating(res.data.neighbor_rating);
        setBrandName(res.data.neighbor_brand_name);
        const ratingValue = res.data.neighbor_rating;
        setStarRatings(Array(ratingValue).fill(1));
      })
      .catch((res) => console.log(res));
  }, []);

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const brandRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [postTitle, setPostTitle] = useState(post.neighbor_title);
  const [postContent, setPostContent] = useState("");
  const [brandName, setBrandName] = useState("");
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
    if (!postTitle) {
      titleRef.current.focus();
    } else if (!postContent) {
      contentRef.current.focus();
    } else if (!brandName) {
      brandRef.current.focus();
    } else {
      let formData = new FormData(document.getElementById("review_form"));

      let url = "/neighbor/createReview";

      axios
        .post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
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

  const handleGoBack = () => {
    navigate(-1); // This is equivalent to history.goBack()
  };

  return (
    <div className={styles.createpost_wrap}>
      <div>
        {isModalOpen && (
          <Modal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modalContent={"글 작성이 완료되었습니다."}
            modalAfterPath={"/community/neighborhood"}
          />
        )}
      </div>
      <h2>리뷰 수정</h2>
      <div className={styles.form_wrap}>
        <form onSubmit={handleSubmit} id="review_form">
          <input
            type="hidden"
            value={sessionStorage.getItem("loginId")}
            name="user_id"
          />
          <input type="hidden" name="neighbor_no" value={post.neighbor_no} />
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
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
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
              </td>
            </tr>
            <tr className={styles.brand_star_wrap}>
              <th>
                <label htmlFor="brand">상호명</label>
              </th>
              <td>
                <input
                  type="text"
                  id="brand"
                  value={brandName}
                  name="neighbor_brand_name"
                  onChange={(e) => setBrandName(e.target.value)}
                  ref={brandRef}
                />
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
                  <input
                    type="hidden"
                    value={selectedRating}
                    name="neighbor_rating"
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
                  name="neighbor_content"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  ref={contentRef}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <div className={styles.button_wrap}>
                  <input
                    className={styles.btn}
                    type="button"
                    onClick={handleGoBack}
                    value={"취소하기"}
                  />
                  <span className={styles.btn} onClick={handleSubmit}>
                    작성 완료
                  </span>
                </div>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
};

export default NeighborReviewEdit;
