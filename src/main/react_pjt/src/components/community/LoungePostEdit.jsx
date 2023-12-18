import styles from "../../css/subpage/lounge_post_detail.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../common/Modal";

const LoungePostEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lounge_no = location.state.lounge_no;
  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get(`/lounge/selectOne?lounge_no=${lounge_no}`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
        setPostTitle(res.data.lounge_title);
        setPostContent(res.data.lounge_content);
        setSelectedCategory(res.data.lounge_category);
      })
      .catch((res) => console.log(res));
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleEdit() {
    let formData = new FormData(document.getElementById("lounge_update_form"));

    let url = "/lounge/postUpdate";

    axios
      .post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        // console.log(`response.data : ${response.data}`);
        navigate("/community");
      })
      .catch((err) => {
        if (err.response.status == "502") {
          alert("[입력오류] 다시 시도하세요.");
        } else {
          alert("[시스템 오류] 잠시 후에 다시 시도하세요." + err.message);
        }
      });
  }

  const handleGoBack = () => {
    navigate(-1); // This is equivalent to history.goBack()
  };

  if (!post) {
    return <h3>게시글을 찾을 수 없습니다.</h3>;
  }

  function handleDelete() {
    setIsModalOpen(true);
  }

  return (
    <div className={styles.post_edit_wrap}>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalContent={"정말 삭제하시겠습니까?"}
          modalAfterPath={"/community"}
          requestAxios={`/lounge/postDelete?lounge_no=${post.lounge_no}`}
        />
      )}
      <h2>내 글 수정하기</h2>
      <form
        id="lounge_update_form"
        action="/lounge/postUpdate"
        method="post"
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
                <input type="hidden" name="lounge_no" value={post.lounge_no} />
              </td>

              <th scope="row">등록일</th>
              <td>
                <input
                  className={styles.readonly_input}
                  name="regdate"
                  value={post.regdate}
                  readOnly
                />
              </td>
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
              <td colspan="3">
                <input
                  className={styles.readonly_input}
                  name="lounge_hits"
                  value={post.lounge_hits}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th scope="row">작성자</th>
              <td>
                <input
                  className={styles.readonly_input}
                  name="user_id"
                  value={post.user_id}
                  readOnly
                />
              </td>
              <th scope="row">추천수</th>
              <td colspan="3">
                <input
                  className={styles.readonly_input}
                  name="lounge_likes"
                  value={post.lounge_likes}
                  readOnly
                />
              </td>
            </tr>
            <tr className={styles.content_wrap}>
              <th scope="row">내용</th>
              <td colspan="3">
                <div className={styles.gridContainer}>
                  <textarea
                    className={styles.edit_textarea}
                    name="lounge_content"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td colSpan={3}>
                <img
                  className={styles.origin_img}
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : `/images/community/${post.lounge_img}`
                  }
                  alt="image"
                />
                <input
                  type="hidden"
                  name="lounge_img"
                  value={post.lounge_img}
                />
                <input
                  type="file"
                  name="lounge_imgf"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
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
                    onClick={handleDelete}
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
