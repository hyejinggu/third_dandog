import styles from "../../css/subpage/community_neighbor.module.css";
import Pagination from "../item/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";

const NeighborReview = ({ category, selectedPlace }) => {
  const [neighborArray, setNeighborArray] = useState([]);
  const [queryCategory, setQueryCategory] = useState("beauty");
  const [sortingOption, setSortingOption] = useState("basic");
  const [ratingFilter, setRatingFilter] = useState("1.0");
  const [clickedIndex, setClickedIndex] = useState(null);

  const [detailedReviewData, setDetailedReviewData] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  // 카테고리 변경 axios
  useEffect(() => {
    setSortingOption("basic");
    setRatingFilter("1.0");

    let newQueryCategory = "beauty"; // default value

    switch (category) {
      case "뷰티, 미용":
        newQueryCategory = "beauty";
        break;
      case "병원":
        newQueryCategory = "hospital";
        break;
      case "카페, 호텔":
        newQueryCategory = "cafe";
        break;
      case "훈련, 시터":
        newQueryCategory = "training";
        break;
      default:
        newQueryCategory = "beauty";
        break;
    }

    setQueryCategory(newQueryCategory);
    handleReviewList(`?category=${newQueryCategory}&sorting=basic&filter=1.0`);
  }, [category]);

  const handleFilterApply = () => {
    handleReviewList(
      `?category=${queryCategory}&sorting=${sortingOption}&filter=${ratingFilter}`
    );
  };

  // 상호 정렬 및 필터링
  const handleReviewList = (requestURL) => {
    axios
      .get(`/neighbor/review${requestURL}`)
      .then((res) => {
        setNeighborArray(res.data);
        console.log(res.data);
      })
      .catch((res) => console.log(res));
  };

  // 상호명별 리뷰 리스트 찾기
  const handleReviewClick = (it, index) => {
    setSelectedReview(it);
    setClickedIndex(index);

    axios
      .get(`/neighbor/reviewDetails?neighborBrandName=${it.neighborBrandName}`)
      .then((res) => {
        setDetailedReviewData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching detailed review data:", error);
      });

    setRCurrentPage(1);
  };

  // 선택된 장소 리뷰 가져오기 axios
  useEffect(() => {
    axios
      .get("/neighbor/brand?selectedPlace=" + selectedPlace)
      .then((res) => {
        setDetailedReviewData(res.data);
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

  // brand pagination 구현
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

  // review pagination 구현
  const [rcurrentPage, setRCurrentPage] = useState(1); // 현재 페이지 번호
  const rlistPerPage = 8; // 페이지 당 게시글 개수
  const rtotalPages = Math.ceil(detailedReviewData.length / rlistPerPage); // 전체 페이지 번호

  const rhandlePageChange = (page) => {
    setRCurrentPage(page);
  };

  const rgetPaginatedData = () => {
    const startIndex = (rcurrentPage - 1) * rlistPerPage;
    const endIndex = startIndex + rlistPerPage;
    return detailedReviewData.slice(startIndex, endIndex);
  };

  const renderRatingFilterSelect = () => {
    if (sortingOption === "star") {
      return (
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="1.0">별점⭐</option>
          <option value="4.5">4.5이상</option>
          <option value="4.0">4.0이상</option>
          <option value="3.5">3.5이상</option>
        </select>
      );
    } else {
      return null;
    }
  };

  const TruncatedContent = ({ content, maxLength }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleToggle = () => {
      setIsExpanded(!isExpanded);
    };
    const shouldShowMoreButton = content.length > maxLength;
    const truncatedText = isExpanded
      ? content
      : `${content.slice(0, maxLength)}`;

    return (
      <div>
        <span className={styles.truncatedContent} onClick={handleToggle}>
          {truncatedText}
        </span>
        {shouldShowMoreButton && !isExpanded && (
          <span className={styles.readMore} onClick={handleToggle}>
            ...[더보기]
          </span>
        )}
      </div>
    );
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
            <div className={styles.brand_list}>
              <span>상호명</span>
              <span>평균 별점</span>
            </div>
            <ul>
              {getPaginatedData().map((it, index) => (
                <li
                  key={index}
                  className={`${styles.neighbor_brand} ${
                    clickedIndex === index ? styles.brand_clicked : ""
                  }`}
                >
                  <div onClick={() => handleReviewClick(it, index)}>
                    <span>{it.neighborBrandName}</span>
                    <div className={styles.review_counting}>
                      <span>리뷰</span>
                      <span>[{it.reviewCount}]</span>
                    </div>
                  </div>
                  <span>{parseFloat(it.averageRating).toFixed(1)}</span>
                </li>
              ))}
            </ul>
            {/* 페이지 이동 */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            ></Pagination>
          </div>
          <div className={styles.review_list_wrap}>
            <div className={styles.review_list_container}>
              <div className={styles.review_list}>
                <span>제목</span>
                <span>내용</span>
                <span>별점</span>
                <span>등록일</span>
                <span>작성자</span>
              </div>
              <ul>
                {rgetPaginatedData().map((it, index) => (
                  <li key={it.neighbor_no} className={styles.neighbor_review}>
                    <span>{it.neighbor_title}</span>
                    <TruncatedContent
                      content={it.neighbor_content}
                      maxLength={30}
                    />
                    <span>{it.neighbor_rating}</span>
                    <span>{formatDate(it.regdate)}</span>
                    <span>{it.user_id}</span>
                  </li>
                ))}
              </ul>
              <Pagination
                currentPage={rcurrentPage}
                totalPages={rtotalPages}
                onPageChange={rhandlePageChange}
              ></Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeighborReview;
