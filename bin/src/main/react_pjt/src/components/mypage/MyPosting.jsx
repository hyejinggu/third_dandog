import React, { useEffect, useState } from "react";
import styles from "../../css/common/my_posting.module.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Modal from "../common/Modal";

export default function MyPoting() {
  const [neighbors, setNeighbors] = useState([]);
  const [lounges, setLounges] = useState([]);
  const [selectedNeighbor, setSelectedNeighbor] = useState(null);
  const [selectedLounge, setSelectedLounge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestAxios, setRequestAxios] = useState("");

  const handleShowOptions = (item, type) => {
    if (type === "neighbor") {
      setSelectedNeighbor((prev) =>
        prev === item.neighbor_no ? null : item.neighbor_no
      );
      setSelectedLounge(null);
    } else if (type === "lounge") {
      setSelectedLounge((prev) =>
        prev === item.lounge_no ? null : item.lounge_no
      );
      setSelectedNeighbor(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/searchall/myposting/${sessionStorage.getItem("loginId")}`
        );
        const { lounges, neighbors } = response.data;

        // 받아온 데이터를 상태에 업데이트
        setLounges(lounges || []);
        setNeighbors(neighbors || []);
      } catch (error) {
        console.error("AxiosError:", error);
      }
    };

    fetchData();
  }, [isModalOpen]);

  const handleNDelete = (no) => {
    setRequestAxios(`/neighbor/delete?neighbor_no=${no}`);
    setIsModalOpen(true);
  };

  const handleLDelete = (no) => {
    setRequestAxios(`/lounge/postDelete?lounge_no=${no}`);
    setIsModalOpen(true);
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div id="wrap">
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalContent={"정말 삭제하시겠습니까?"}
          modalAfterPath={"/myposting"}
          requestAxios={requestAxios}
          requestMethod={"get"}
        />
      )}
      <h2 className={styles.title}>내가 쓴 글</h2>
      <div className={styles.searched_area}>
        <div className={styles.resultsContainer}>
          <div className={styles.loungeResults}>
            <h2>라운지</h2>
            <ul>
              <li className={styles.community_first}>
                <span>이미지</span>
                <span>제목 및 내용</span>
                <span>추천수</span>
                <span>조회수</span>
                <span>등록 날짜</span>
                <span>카테고리</span>
                <span>수정 및 삭제</span>
              </li>
              {lounges.map((i) => (
                <li key={i.lounge_no}>
                  <span>
                    <img src={`/images/community/${i.lounge_img}`} alt="" />
                  </span>
                  <Link to="/community/loungepostdetail" state={{ post: i }}>
                    <span>
                      <p>{i.lounge_title}</p>
                      <p>{i.lounge_content}</p>
                    </span>
                  </Link>
                  <span>{i.lounge_likes}</span>
                  <span>{i.lounge_hits}</span>
                  <span>{formatDate(i.regdate)}</span>
                  <span>{i.lounge_category}</span>
                  <span
                    className={styles.show_options}
                    onClick={() => handleShowOptions(i, "lounge")}
                  >
                    ...
                    {selectedLounge === i.lounge_no && (
                      <ul className={styles.update_delete_options}>
                        <Link
                          to="/community/loungepostedit"
                          state={{ lounge_no: i.lounge_no }}
                        >
                          <li>수정</li>
                        </Link>
                        <li onClick={() => handleLDelete(i.lounge_no)}>삭제</li>
                      </ul>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.neighborResults}>
            <h2>우리 동네</h2>
            <ul>
              <li className={styles.community_first}>
                <span>상호명</span>
                <span>제목 및 내용</span>
                <span>별점</span>
                <span>등록 날짜</span>
                <span>카테고리</span>
                <span>수정 및 삭제</span>
              </li>
              {neighbors.map((i) => (
                <li key={i.neighbor_no}>
                  <span>{i.neighbor_brand_name}</span>
                  <Link to="/community/neighborhood">
                    <span>
                      <p>{i.neighbor_title}</p>
                      <p>{i.neighbor_content}</p>
                    </span>
                  </Link>
                  <span>{i.neighbor_rating}</span>
                  <span>{formatDate(i.regdate)}</span>
                  <span>{i.neighbor_category}</span>
                  <span
                    className={styles.show_options}
                    onClick={() => handleShowOptions(i, "neighbor")}
                  >
                    ...
                    {selectedNeighbor === i.neighbor_no && (
                      <ul className={styles.update_delete_options}>
                        <Link
                          to="/community/neighborreviewedit"
                          state={{ neighbor_no: i.neighbor_no }}
                        >
                          <li>수정</li>
                        </Link>
                        <li onClick={() => handleNDelete(i.neighbor_no)}>
                          삭제
                        </li>
                      </ul>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
