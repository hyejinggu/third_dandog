import styles from "../../css/subpage/lounge_post_detail.module.css";
import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";

const CreatePost = () => {
  const navigate = useNavigate();
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
      setIsModalOpen(true);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // This is equivalent to history.goBack()
  };

  function handleInsert() {}

  return (
    <div className={styles.post_detail_wrap}>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalContent={"정말 삭제하시겠습니까?"}
          modalAfterPath={"/community"}
          requestAxios={`/lounge/postDelete`}
        />
      )}
      <h2>커뮤니티 글</h2>
      <table className={styles.table}>
        <colgroup>
          <col style={{ width: "20%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "30%" }} />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">카테고리</th>
            <td>
              <select name="lounge_category">
                <option value="자유 게시판">자유 게시판</option>
                <option value="고민 상담소">고민 상담소</option>
                <option value="지식 공유">지식 공유</option>
                <option value="친구 찾기">친구 찾기</option>
              </select>
            </td>

            <th scope="row">작성자</th>
            <td>
              <input
                type="text"
                value={sessionStorage.getItem("loginId")}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <th scope="row">제목</th>
            <td colSpan={3}>
              <input type="text" />
            </td>
          </tr>
          <tr className={styles.content_wrap}>
            <th scope="row">내용</th>
            <td colspan="3">
              <div className={styles.gridContainer}>
                <textarea name="" id="" cols="30" rows="10"></textarea>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">첨부파일</th>
            <td colSpan={3}>
              <input type="file" />
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <div className={styles.btn_wrap}>
                <input
                  className={styles.btn}
                  type="button"
                  onClick={handleGoBack}
                  value={"글 목록"}
                />
                <input
                  className={styles.btn}
                  type="button"
                  onClick={handleInsert}
                  value={"등록"}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CreatePost;
