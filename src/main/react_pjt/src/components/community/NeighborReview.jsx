import styles from "../../css/subpage/community_neighbor.module.css";
import Pagination from "../item/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";

const NeighborReview = ({ category, selectedPlace }) => {
  const [neighborArray, setNeighborArray] = useState([]);
  const [sortingOption, setSortingOption] = useState("basic");
  const [ratingFilter, setRatingFilter] = useState("0.0");

  const [showReviewDetails, setShowReviewDetails] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  let queryCategory = "beauty";

  // 카테고리 변경 axios
  useEffect(() => {
    setSortingOption("new");
    setRatingFilter("all");

    switch (category) {
      case "뷰티, 미용":
        queryCategory = "beauty";
        break;
      case "병원":
        queryCategory = "hospital";
        break;
      case "카페, 호텔":
        queryCategory = "cafe";
        break;
      case "훈련, 시터":
        queryCategory = "training";
        break;
      default:
        queryCategory = "beauty";
        break;
    }

    axios
      .get(
        `/neighbor/review?category=${queryCategory}&sorting=basic&filter=0.0`
      )
      .then((res) => {
        setNeighborArray(res.data);
        console.log(res.data);
      })
      .catch((res) => console.log(res));
  }, [category]);

  // 리뷰 정렬 및 필터링
  const handleFilterApply = () => {
    axios
      .get(
        `/neighbor/review?category=${queryCategory}&sorting=${sortingOption}&filter=${ratingFilter}`
      )
      .then((res) => {
        setNeighborArray(res.data);
        console.log(res.data);
      })
      .catch((res) => console.log(res));
  };

  const handleReviewClick = (review) => {
    // Toggle the state to show/hide the review details
    setShowReviewDetails(!showReviewDetails);
    // Save the selected review for display if needed
    setSelectedReview(review);
  };

  // 선택된 장소 리뷰 가져오기 axios
  useEffect(() => {
    axios
      .get("/neighbor/brand?selectedPlace=" + selectedPlace)
      .then((res) => {
        setNeighborArray(res.data);
        console.log(res.data);
      })
      .catch((res) => console.log(res));
  }, [selectedPlace]);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    const day = dateObject.getDate();
    return `${year}-${month}-${day}`;
  };

  // pagination 구현
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const listPerPage = 5; // 페이지 당 게시글 개수
  const totalPages = Math.ceil(neighborArray.length / listPerPage); // 전체 페이지 번호

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * listPerPage;
    const endIndex = startIndex + listPerPage;
    return neighborArray.slice(startIndex, endIndex);
  };

  const renderRatingFilterSelect = () => {
    if (sortingOption === "star") {
      return (
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="0.0">별점⭐</option>
          <option value="4.5">4.5이상</option>
          <option value="4.0">4.0이상</option>
          <option value="3.5">3.5이상</option>
        </select>
      );
    } else {
      return null; // Return null to hide the select element
    }
  };

  return (
    <div className={styles.review_content_wrap}>
      <div className={styles.review_wrap}>
        <div className={styles.review_title}>review</div>
        <div className={styles.review_sorting}>
          <select
            value={sortingOption}
            onChange={(e) => setSortingOption(e.target.value)}
          >
            <option value="basic">기본순</option>
            <option value="star">별점 높은 순</option>
            <option value="review">리뷰 많은 순</option>
          </select>
          {renderRatingFilterSelect()}
          <button onClick={handleFilterApply}>필터 적용</button>
        </div>
        <div className={styles.brand_review_wrap}>
          <div className={styles.brand_wrap}>
            <div className={styles.review_list}>
              <span>상호명</span>
              <span>리뷰 보기</span>
              <span>평균 별점</span>
            </div>
            <ul>
              {getPaginatedData().map((it, index) => (
                <li key={it.neighbor_no} className={styles.neighbor_review}>
                  <span>{it.neighbor_brand_name}</span>
                  <span onClick={() => handleReviewClick(it)}>
                    <p>리뷰</p>
                    <p>{it.Brand}</p>
                  </span>
                  <span>{it.neighbor_rating}</span>
                  {/* <span>{formatDate(it.regdate)}</span> */}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.brand_review_wrap}>
            {showReviewDetails ? <li>리뷰 안보기</li> : "리뷰 보기"}
          </div>
        </div>
      </div>
      <div>
        {/* 페이지 이동 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        ></Pagination>
      </div>
    </div>
  );
};

export default NeighborReview;
