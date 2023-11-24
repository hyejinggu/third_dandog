import styles from "../../css/subpage/create_post.module.css";
import React, { useState, useRef, useContext } from "react";
import { CreatePostContext } from "./Community";
import Modal from "../common/Modal";

const CreatePost = () => {
  const { addPostFromLocalStorage } = useContext(CreatePostContext);

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
      localStorage.setItem("title", postTitle);
      localStorage.setItem("content", postContent);
      addPostFromLocalStorage();
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
      <h2>글쓰기</h2>
      <div className={styles.form_wrap}>
        <form onSubmit={handleSubmit}>
          {/* 제목 영역 */}
          <div className={styles.title_wrap}>
            <label htmlFor="title">제목</label>
            <select name="commmu_board_select" id="commmu_board_select">
              <option value="general">자유 게시판</option>
              <option value="consult">고민 상담소</option>
              <option value="sharing_info">지식 공유</option>
              <option value="find_friends">친구 찾기</option>
            </select>
            <input
              type="text"
              id="title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              ref={titleRef}
            />
            <div className={styles.empty_alert}>
              {postTitle ? "" : "제목을 입력하세요"}
            </div>
          </div>

          {/* 내용 영역 */}
          <div className={styles.content_wrap}>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              ref={contentRef}
            />
            <div className={styles.empty_alert}>
              {postContent ? "" : "내용을 입력하세요"}
            </div>
          </div>

          {/* 이미지 영역 */}
          <div className={styles.image_wrap}>
            <label htmlFor="image">이미지 첨부</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              // onChange={handleImageChange}
            />
          </div>

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
