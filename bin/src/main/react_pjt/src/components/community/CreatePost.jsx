import styles from "../../css/subpage/lounge_post_detail.module.css";
import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";

const CreatePost = () => {
  const navigate = useNavigate();
  // const [image, setImage] = useState(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("자유 게시판");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = () => {
    if (!postTitle) {
      titleRef.current.focus();
    } else if (!postContent) {
      contentRef.current.focus();
    } else {
      const updatedFormData = new FormData(
        document.getElementById("lounge_post_form")
      );
      setFormData(updatedFormData);
      setIsModalOpen(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreviewImage(URL.createObjectURL(file));

      const updatedFormData = new FormData();
      updatedFormData.append("lounge_imgf", file);
      setFormData(updatedFormData);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.post_detail_wrap}>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalContent={"게시글을 등록하겠습니까?"}
          modalAfterPath={"/community"}
          requestAxios={`/lounge/postUpdate`}
          requestMethod={"post"}
          dataToRequest={formData}
        />
      )}
      <h2>커뮤니티 글 작성</h2>
      <form
        id="lounge_post_form"
        // action="/lounge/postUpdate"
        // method="post"
        enctype="multipart/form-data"
      >
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
                <select
                  name="lounge_category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="free">자유 게시판</option>
                  <option value="trouble">고민 상담소</option>
                  <option value="sharing">지식 공유</option>
                  <option value="friends">친구 찾기</option>
                </select>
              </td>

              <th scope="row">작성자</th>
              <td>
                <input
                  type="text"
                  name="user_id"
                  value={sessionStorage.getItem("loginId")}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th scope="row">제목</th>
              <td colSpan={3}>
                <input
                  className={styles.title_input}
                  type="text"
                  name="lounge_title"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  ref={titleRef}
                />
              </td>
            </tr>
            <tr className={styles.content_wrap}>
              <th scope="row">내용</th>
              <td colspan="3">
                <div className={styles.gridContainer}>
                  <textarea
                    name="lounge_content"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    ref={contentRef}
                  ></textarea>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">첨부파일</th>
              <td colSpan={3}>
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className={styles.previewImage}
                  />
                )}
                <input
                  type="file"
                  name="lounge_imgf"
                  onChange={handleImageChange}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <div className={styles.btn_wrap}>
                  <span
                    className={styles.btn}
                    // type="button"
                    onClick={handleGoBack}
                  >
                    이전으로
                  </span>
                  <span className={styles.btn} onClick={handleSubmit}>
                    등록
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default CreatePost;
