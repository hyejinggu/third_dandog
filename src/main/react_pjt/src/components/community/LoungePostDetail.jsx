import styles from "../../css/subpage/lounge_post_detail.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "../common/Modal";

const LoungePostDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state.post;
  const [updatedHits, setUpdatedHits] = useState(0);
  const [updatedLikes, setUpdatedLikes] = useState(post.lounge_likes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loginId = sessionStorage.getItem("loginId");

  useEffect(() => {
    // 서버로 업데이트된 조회수를 전송
    axios
      .get(`/lounge/updateHits?lounge_no=${post.lounge_no}`)
      .then((response) => {
        console.log("조회수 업데이트 성공:", response.data);
        setUpdatedHits(response.data);
      })
      .catch((error) => {
        console.error("조회수 업데이트 실패:", error);
      });
  }, [post]);

  const handleGoBack = () => {
    navigate("/community"); // This is equivalent to history.goBack()
  };

  if (!post) {
    return <h3>게시글을 찾을 수 없습니다.</h3>;
  }

  function updateLikes() {
    axios
      .get(`/lounge/updateLikes?lounge_no=${post.lounge_no}&user_id=${loginId}`)
      .then((response) => {
        if (response.data == 0) {
          alert("중복 추천은 불가합니다.");
        } else {
          console.log("추천수 업데이트 성공:", response.data);
          setUpdatedLikes(response.data);
        }
      })
      .catch((error) => {
        console.error("추천수 업데이트 실패:", error);
      });
  }
  function handleDelete() {
    setIsModalOpen(true);
  }

  return (
    <div className={styles.post_detail_wrap}>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalContent={"정말 삭제하시겠습니까?"}
          modalAfterPath={"/community"}
          requestAxios={`/lounge/postDelete?lounge_no=${post.lounge_no}`}
          requestMethod={"get"}
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
            <td>{post.lounge_category}</td>

            <th scope="row">등록일</th>
            <td>{post.regdate}</td>
          </tr>
          <tr>
            <th scope="row">제목</th>
            <td>{post.lounge_title}</td>

            <th scope="row">조회수</th>
            <td colspan="3">{updatedHits}</td>
          </tr>
          <tr>
            <th scope="row">작성자</th>
            <td>{post.user_id}</td>
            <th scope="row">추천수</th>
            <td colspan="3">{updatedLikes}</td>
          </tr>
          <tr className={styles.content_wrap}>
            <th scope="row">내용</th>
            <td colspan="3">
              <div className={styles.gridContainer}>
                {post.lounge_img && (
                  <img
                    src={`/images/community/${post.lounge_img}`}
                    alt={`lounge image`}
                  />
                )}
                <span>{post.lounge_content}</span>
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
                  value={"글 목록"}
                />
                {post.user_id === loginId && (
                  <>
                    <Link to="/community/loungepostedit" state={{ post: post }}>
                      <input
                        className={styles.btn}
                        type="button"
                        value={"수정"}
                      />
                    </Link>
                    <input
                      className={styles.btn}
                      type="button"
                      onClick={handleDelete}
                      value={"삭제"}
                    />
                  </>
                )}
                {post.user_id !== loginId && (
                  <>
                    <input
                      className={styles.btn}
                      type="button"
                      onClick={updateLikes}
                      value={"추천👍"}
                    />
                  </>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LoungePostDetail;
