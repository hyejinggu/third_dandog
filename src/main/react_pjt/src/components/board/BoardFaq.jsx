import "../../css/board/board.css";
import { Link } from "react-router-dom";
import React, { useState } from 'react';

// 게시판 글 목록 배열
//const BoardFaq = ({ item }) => {
const BoardFaq = () => {
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
            title: "[결제] 결제방법이 궁금해요",
            writer: "육이",
            date: "2023-06-17",
            view: "10",
            answer:
                <div>
                    내게 맞는 방법으로 결제하고 언제든 변경할 수 있어요<br />
                    신용카드,계좌이제,휴대전화 등 원하는 방법으로 결제가능해요<br />
                </div>
        },

        {
            number: 5,
            title: "[교환/반품] 반품하려고 상품을 보냈는데 언제 처리 되나요?",
            writer: "오오",
            date: "2023-06-16",
            view: "10",
            answer:
                <div>
                    환불을 위해 상품을 보내주신 경우, 고객님이 상품을 보냄<br />
                    - CJ대한통문 물류센터로 입고(3~5일 소요)<br />
                    - 아르르 본사에서 확인하는 절차로 진행이 됩니다.<br />
                    <br />
                    아르르에서 반품 상품을 확인 한 후 1~2일 내에 빠르게 처리하고 있습니다.<br />

                    반품시에는 주문자명과 택배를 보내시는 분의 성명을 동일하게 보내주셔야합니다.<br />
                </div>
        },

        {
            number: 4,
            title: "[교환/반품] 주문한 상품이 아닌 다른 상품 또는 불량상품이 배송되었습니다.",
            writer: "사사",
            date: "2023-06-15",
            view: "10",
            answer:
                <div>
                    먼저, 하자/ 오배송으로 불편을 드려 죄송합니다.<br />
                    DanDog 에서 책임을 지고 정상제품으로 교환해 드리겠습니다!<br />
                    잘못된 상품의 검품 및 재준비를 위해서 상품을 반드시 DanDog 측으로 보내주셔야 처리가 되니,<br />
                    번거로우시더라도 부탁드리겠습니다.<br />
                    <br />
                    반송처: 경기도 광명시 일직로 43 C동 410호<br />
                    대표번호 : 02-899-7892 <br />
                </div>
        },

        {
            number: 3,
            title: "[회원] 비회원으로 주문하였는데 주문번호가 기억나지 않아요",
            writer: "삼삼",
            date: "2023-06-14",
            view: "10",
            answer:
                <div>
                    DanDog 고객센터(02-899-7892) 으로 운영시간에 전화주시면 빠르게 주문번호 조회 도와드리겠습니다.<br />
                    고객센터 운영시간: 평일 오전9시~오후6시, 토요일 오전9시~오후12시 주말 / 공휴일 휴무<br />
                </div>
        },

        {
            number: 2,
            title: "[입금] 주문금액과 다른금액을 입금했어요.",
            writer: "dldl",
            date: "2023-06-13",
            view: "10",
            answer:
                <div>
                    (1) 주문금액보다 더 입금해 주신 경우<br />
                    - 입금은행명 / 날짜 / 시간 / 입금금액과 원하시는 처리방법을 상품Q& A에 작성해 주시거나,<br />
                    고객센터(02 - 6951 - 2688)를 통해 연락을 주시면 처리해드리겠습니다.<br />
                    과입금 금액에 대해 환불 혹은 예치금 전환 처리 해드리고 있습니다.<br />
                    <br />

                    (2)주문금액보다 적은 금액을 입금해 주신 경우<br />
                    - 미입금된 금액을 입금 후에, 처음 입금해주신 이력과 추후에 입금해주신 이력을 상품Q & A에 작성해 주시거나,<br />
                    고객센터(02 - 6951 - 2688)를 통해 연락주시면 입금 확인 가능합니다.
                </div>
        },

        {
            number: 1,
            title: "[배송] 배송상태가 ‘발송’상태 인데 배송추적이 되지 않습니다.",
            writer: "일일",
            date: "2023-06-12",
            view: "10",
            answer:
                <div>
                    주문상태가 '발송'으로 표시되면, 고객님이 주문하신 상품이 아르르 에서 물류업체로 넘어간 상태입니다.<br />
                    물류업체에서 출고가 되었지만 택배사 집하점의 스캔이 입력되지 않은 시간동안 배송추적이 안될 수 있습니다.<br />
                    발송으로 바뀐 당일의 오후 10시 이후에 조회를 해주시면 배송 추적이 가능하니 확인 부탁드리겠습니다.
                </div>
        },
    ];

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
                        id="board_search"
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

                <div className="button">
                    <input type="submit" value="글쓰기" />
                </div>
            </div>
        </main>
    );
};

export default BoardFaq;
