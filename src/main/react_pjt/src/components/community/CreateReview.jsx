import styles from "../../css/subpage/create_review.module.css";
import React, { useState, useRef, useContext } from "react";
import { CreatePostContext } from "./Community";
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
            <tr>
              <td>
                <label htmlFor="title">제목</label>
              </td>
              <td colSpan={3}>
                <select name="neighbor_category" id="commmu_board_select">
                  <option value="beauty">미용</option>
                  <option value="hospital">병원</option>
                  <option value="cafe">카페, 호텔</option>
                  <option value="training">훈련, 시터</option>
                </select>
                <input
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
              <td>
                <label htmlFor="brand">상호명</label>
              </td>
              <td>
                <input type="text" id="brand" name="neighbor_brand_name" />
              </td>
              <td>
                <label htmlFor="rating">별점</label>
              </td>
              <td>
                <input type="text" id="rating" name="neighbor_rating" />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="content">내용</label>
              </td>
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
          </table>

          <div className={styles.button_wrap}>
            <button type="submit" onClick={handleSubmit}>
              작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
