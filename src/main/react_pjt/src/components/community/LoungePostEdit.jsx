import styles from "../../css/subpage/lounge_post_detail.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const LoungePostEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state.post;
  const [postTitle, setPostTitle] = useState(post.lounge_title);
  const [postContent, setPostContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loginId = sessionStorage.getItem("loginId");

  // useEffect(() => {
  //   // 서버로 업데이트된 조회수를 전송
  //   axios
  //     .get(`/lounge/updateHits?lounge_no=${post.lounge_no}`)
  //     .then((response) => {
  //       console.log("조회수 업데이트 성공:", response.data);
  //       setUpdatedHits(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("조회수 업데이트 실패:", error);
  //     });
  // }, [post]);

  const handleGoBack = () => {
    navigate(-1); // This is equivalent to history.goBack()
  };

  if (!post) {
    return <h3>게시글을 찾을 수 없습니다.</h3>;
  }

  function handleEdit() {}
  function handleDelete() {}

  return (
    <div className={styles.post_edit_wrap}>
      <h2>내 글 수정하기</h2>
      <form>
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
                <input
                  className={styles.readonly_input}
                  name="lounge_category"
                  value={post.lounge_category}
                  readOnly
                />
              </td>

              <th scope="row">등록일</th>
              <td>{post.regdate}</td>
            </tr>
            <tr>
              <th scope="row">제목</th>
              <td>
                <input
                  className={styles.edit_input}
                  type="text"
                  name="lounge_title"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
              </td>

              <th scope="row">조회수</th>
              <td colspan="3">{post.lounge_hits}</td>
            </tr>
            <tr>
              <th scope="row">작성자</th>
              <td>{post.user_id}</td>
              <th scope="row">추천수</th>
              <td colspan="3">{post.lounge_likes}</td>
            </tr>
            <tr className={styles.content_wrap}>
              <th scope="row">내용</th>
              <td colspan="3">
                <div className={styles.gridContainer}>
                  <img src={`/images/item/${post.lounge_img}`} alt="" />
                  <input type="file" />
                  <textarea
                    name="lounge_content"
                    value={post.lounge_content}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <div className={styles.btn_wrap}>
                  <input
                    className={styles.btn}
                    type="button"
                    onClick={handleGoBack}
                    value={"취소하기"}
                  />

                  <input
                    className={styles.btn}
                    type="button"
                    onClick={handleEdit}
                    value={"등록"}
                  />
                  <input
                    className={styles.btn}
                    type="button"
                    onClick={handleEdit}
                    value={"삭제"}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default LoungePostEdit;
