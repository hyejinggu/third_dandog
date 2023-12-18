import "../../css/board/board.css";
import { Link } from "react-router-dom";
import React, { useState } from 'react';

const Board = () => {
  const [openQuestion, setOpenQuestion] = useState(null); // 선택된 질문의 인덱스를 저장
  const [searchText, setSearchText] = useState(""); // 검색어를 위한 새 상태
  const [filteredBoardArray, setFilteredBoardArray] = useState([]);
  // 필터링된 항목을 저장할 상태.검색버튼을 눌렀을때만 필터링. (boardArray) 쓸 경우 const 는 배열 밑에 위치하기
  const [showInitialTable, setShowInitialTable] = useState(true); // 초기 테이블 보여주기 여부를 저장하는 상태
  // 위의 useState가 빈 배열로 바뀌고 아래 한 줄이 추가되면서 다시 배열의 위로 위치함.

  // 게시판 글 목록 데이터 배열. table을 배열로 수정. const로 수정
  const boardArray = [
    {
      number: 6,
      title: "입점 및 제휴 문의",
      writer: "관리자",
      date: "2023-05-19",
      view: "10",
      answer: "입점절차안내 공급사 입점 신청 입점 심의 입점 상담 상품 등록, 등록상품 승인 상품 판매"
    },

    {
      number: 5,
      title: "배송안내",
      writer: "관리자",
      date: "2023-05-19",
      view: "10",
      answer: "공휴일 제외하고 주문완료 후 3일이내 배송됩니다."
    },

    {
      number: 4,
      title: "상품출고관련안내",
      writer: "관리자",
      date: "2023-05-19",
      view: "10",
      answer: "상품 입고 후 3일 내 출고가능합니다."
    },

    {
      number: 3,
      title: "유통기한 임박상품 관련 안내",
      writer: "관리자",
      date: "2023-05-19",
      view: "10",
      answer: "유통기한 임박상품 세일중입니다. "
    },

    {
      number: 2,
      title: "적립금 관련안내",
      writer: "관리자",
      date: "2023-05-19",
      view: "10",
      answer: "적립금 5천점 이상일 때 현금처럼 사용가능합니다. "
    },

    {
      number: 1,
      title: "회원정보 이용내역 관련 안내",
      writer: "관리자",
      date: "2023-05-19",
      view: "10",
      answer:
        <div>
          회원가입 신청 후, 영업시간 기준 1일 이내에 담당자 확인후, 승인이 완료됩니다.<br />
          승인이 완료되면, 카카오 톡 알림톡으로 회원가입 승인 완료 알림을 보내드리고 있습니다.<br />
        </div>
    },
  ];

  // 검색 버튼을 누르면 필터링된 항목을 보여지게 하는 함수. boardArray 보다 앞에 위치해야 작동함.
  /* const handleSearch = (e) => {
    e.preventDefault();
    const filteredItems = boardArray.filter(
      (item) =>
        item.title.includes(searchText) || item.answer.includes(searchText)
    );
    setFilteredBoardArray(filteredItems);
    setShowInitialTable(false); // 검색 결과를 보여준 후 초기 테이블 숨기기
  }; */

  // 검색 함수
  // answer 의 JSX 내용을 문자열로 변환하기 위해서는 .props.children을 활용
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredItems = boardArray.filter((item) => {
      const answerText = typeof item.answer === 'string' ? item.answer : item.answer.props.children.join(" "); // JSX일 경우 문자열로 변환
      return (
        item.title.includes(searchText) || answerText.includes(searchText)
      );
    });
    setFilteredBoardArray(filteredItems);
    setShowInitialTable(false); // 검색 결과를 보여준 후 초기 테이블 숨기기
    setSearchText(""); // 검색 후 검색창의 검색어 초기화
  }; // 검색 로직

  // 엔터 키 눌렀을 때 검색 실행
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  }; // 엔터키 처리 로직

  // 답변 펼치기/접기 함수
  const toggleAnswer = (index) => {
    if (openQuestion === index) {
      setOpenQuestion(null); // 같은 질문을 클릭하면 닫기
    } else {
      setOpenQuestion(index); // 다른 질문을 클릭하면 해당 질문 열기
    }
  }; // ... (펼치기/접기 로직)

  // 검색어 입력후 공지사항 눌렀을때 다시 초기 테이블(항목이 나오게)로 돌아가기 함수
  const handleInitialTable = () => {
    setFilteredBoardArray([]); // 초기 테이블 항목을 보여주기 위해 필터링된 배열 초기화
    setShowInitialTable(true); // 초기 테이블 내용 보여주기
    setSearchText(""); // 검색어 초기화
  };

  // 고객센터 게시판 종류
  return (
    <main>
      <div id="board">
        <h1 className="title">고객센터</h1>

        <div className="box_wrap">
          <Link to="/board">
            <span className="box_a" onClick={handleInitialTable}>공지사항</span>
          </Link>
          <Link to="/board/boardfaq">
            <span className="box_a" onClick={handleInitialTable}>FAQ</span>
          </Link>
          <Link to="/board/boardqna">
            <span className="box_a" onClick={handleInitialTable}>QnA</span>
          </Link>
        </div>

        {/* 검색창 */}
        <form action="#" method="get" onSubmit={handleSearch}>
          <input
            type="search"
            name="search"
            id="board_search" //id 다른 파일이랑 달라야하는지 찾기
            placeholder="검색어를 입력해주세요."
            // 검색기능 추가
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            //
            onKeyDown={handleEnterKey} // Enter 키 눌렀을 때 검색 실행
          />
          <input type="submit" value="검색" onClick={handleSearch} />
        </form>
        <form action="#" method="post"></form>

        <table>
          <thead>
            <tr>
              <th></th>
              <th>번호</th>
              <th>카테고리</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {/* {boardArray
              // 검색기능 추가
              .filter(
                (item) =>
                  item.title.includes(searchText) || item.answer.includes(searchText)
              )
              // */}
            {showInitialTable ? (
              // 초기 테이블 항목 보여주기
              boardArray.map((item, index) => (
                <React.Fragment key={item.number}>
                  <tr className={`question_1 ${openQuestion === index ? "show-answer" : ""}`}
                    onClick={() => toggleAnswer(index)}>
                    <td></td>
                    <td>{item.number}</td>
                    <td>{item.qna_category}</td>
                    <td>{item.title}</td>
                    <td>{item.writer}</td>
                    <td>{item.date}</td>
                    <td>{item.view}</td>
                  </tr>
                  {openQuestion === index && (
                    <tr className="answer">
                      {/* tr.answer의 시작점을 tr.question_1.show-answer의 세 번째 td와 같도록 수정 */}
                      <td></td>
                      <td></td>
                      <td></td>
                      <td colSpan="4">
                        {/*  */}
                        <span>{item.answer}</span>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              // 필터링된 항목 보여주기
              filteredBoardArray
                .map((item, index) => (
                  <React.Fragment key={item.number}>
                    <tr className={`question_1 ${openQuestion === index ? "show-answer" : ""}`}
                      onClick={() => toggleAnswer(index)}>
                      <td></td>
                      <td>{item.number}</td>
                      <td>{item.title}</td>
                      <td>{item.writer}</td>
                      <td>{item.date}</td>
                      <td>{item.view}</td>
                    </tr>
                    {openQuestion === index && (
                      <tr className="answer">
                        {/* tr.answer의 시작점을 tr.question_1.show-answer의 세 번째 td와 같도록 수정 */}
                        <td></td>
                        <td></td>
                        <td></td>
                        <td colSpan="4">
                          {/*  */}
                          <span>{item.answer}</span>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
            )}
          </tbody>
        </table>

        <div className="page_shift">
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
        </div>
        <br></br>
      </div>
    </main>
  );
};

export default Board;
