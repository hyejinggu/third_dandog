import "../../css/board/board.css";
import Pagination from "../item/Pagination";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
//import Creat from "./NeighborReview";

// 게시판 글 목록 배열
const BoardQna = () => {
    const [selectedQna_category, setSelectedQna_category] = useState("ALL");
    const [openQuestion, setOpenQuestion] = useState(null); // 선택된 질문의 인덱스를 저장
    const [searchText, setSearchText] = useState(""); // 검색어를 위한 새 상태
    const [boardArray, setBoardArray] = useState([]);
    //const [currentPage, setCurrentPage] = useState(1); // 아래 페이지네이션에 정의
    //const listPerPage = 5;

    console.log('boardArray' + boardArray);

    useEffect(() => {
        axios
            .get("/qnar/qnaList") //post에서 바꿈
            .then((res) => {
                // 게시글을 qna_seq 기준으로 내림차순 정렬
                const sortedBoardArray = res.data.sort((a, b) => b.qna_seq - a.qna_seq);
                //setShowInitialTable(true);
                setBoardArray(sortedBoardArray);
                console.log('res.data : ' + res.data);
            })
            .catch((res) => console.log('** res.data.err : ' + res));
    }, []); // 검색기능 FilteredBoardArray를 추가한 이후 openQuestion, 있으면 다시 기본리스트 전체출력문제로 제외함 

    // CreateQuestion에서 글을 등록하는 로직 수행 후, 데이터를 다시 불러오기 위해 openQuestion 상태를 변경
    const handleCreateQuestion = () => {
        setOpenQuestion(openQuestion === null ? 0 : null);
    }

    const handleSearch = (e) => {
        e.preventDefault();

        // 서버에서 검색조건(qna_category, search)에 해당하는 목록 가져오기
        const filterRequest = {
            qna_category: selectedQna_category,
            searchText: searchText,
        };

        alert(`category=${selectedQna_category}, searchText=${searchText}`);
        axios
            .get(`/qnar/qnasearchList/${selectedQna_category}/${searchText}`)
            .then((res) => {
                const sortedBoardArray = res.data.sort((a, b) => b.qna_seq - a.qna_seq);
                setBoardArray(sortedBoardArray);

                console.log('res.data : ' + res.data);
            })
            .catch((res) => console.log('** res.data.err : ' + res));
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

    // 사용자페이지 로그인한 아이디가 글쓴이와 같거나 관리자일때만 qnaList의 질문답변이 노출되도록 설정함
    const handleAnswerToggle = (index, user_id) => {
        //alert("*** " + user_id + " , " + sessionStorage.getItem('loginId'))
        if (sessionStorage.getItem('loginId') == 'manager' || sessionStorage.getItem('loginId') == user_id)
            setOpenQuestion((prevIndex) => (prevIndex === index ? null : index));
    };

    // *** pagination 구현
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const listPerPage = 5; // 페이지 당 게시글 개수
    const totalPages = Math.ceil(boardArray.length / listPerPage); // 전체 페이지 번호

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * listPerPage;
        const endIndex = startIndex + listPerPage;
        return boardArray.slice(startIndex, endIndex);
    };


    // 고객센터 게시판 종류
    return (
        <main>
            <div id="board">
                <h1 className="title">고객센터</h1>

                {/* // onClick={handleInitialTable} */}
                <div className="box_wrap">
                    <Link to="/board">
                        <span className="box_a">공지사항</span>
                    </Link>
                    <Link to="/board/boardfaq">
                        <span className="box_a">FAQ</span>
                    </Link>
                    <Link to="/board/boardqna">
                        <span className="box_a">QnA</span>
                    </Link>
                </div>

                {/* 검색창 */}
                <form action="#" method="get" onSubmit={handleSearch}>
                    <select
                        className="custom-select"
                        name="qna_category"
                        onChange={(e) => setSelectedQna_category(e.target.value)}>

                        <option value="ALL">전체</option>
                        <option value="OP">주문/결제</option>
                        <option value="S">배송</option>
                        <option value="CR">취소/반품</option>
                        <option value="EA">교환</option>
                        <option value="M">회원</option>
                        <option value="PE">적립금/이벤트</option>
                        <option value="E">기타</option>
                    </select>

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

                {/* <form action="#" method="post"></form> */}

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
                            <th>답변상태</th>
                        </tr>
                    </thead>

                    <tbody>
                        {getPaginatedData().map((item, index) => ( //boardArray.map
                            <React.Fragment key={item.qna_seq}>
                                <tr className={`question_1 ${openQuestion === index ? "show-answer" : ""}`}
                                    onClick={() => handleAnswerToggle(index, item.user_id)}>
                                    <td></td>
                                    <td>{item.qna_seq}</td>
                                    <td>{item.qna_category}</td>
                                    <td>
                                        {((sessionStorage.getItem('loginId') === item.user_id) || (sessionStorage.getItem('isAdmin') === "true")) ? (
                                            <Link to={{ pathname: "/board/boardqna", search: `?qna_seq=${item.qna_seq}` }}>{item.qna_title}</Link>
                                        ) : (
                                            <span>{item.qna_title}</span>
                                        )}
                                    </td>
                                    <td>{item.user_id}</td>
                                    <td>{item.regdate}</td>
                                    <td>{item.qna_view}</td>
                                    <td>{item.answer_state}</td>
                                </tr>
                                {openQuestion === index && (
                                    <tr className="answer">
                                        <td></td>
                                        <td></td>
                                        <td>{item.qna_category}</td>
                                        <td>
                                            <div>[질문] {item.qna_content}</div>
                                            <br></br>
                                            {item.qna_reply ? <div>[답변] {item.qna_reply}</div> : null}
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <br></br>

            <div className="qnabutton">
                <div className="button">
                    <Link to="/board/createquestion">
                        <input type="button" value="글쓰기" onClick={handleCreateQuestion} />
                    </Link>
                </div>

                <div className="button">
                    <Link to="/myquestion">
                        <input type="button" value="내글보기" />
                    </Link>
                </div>
            </div>
                    
                {/* 페이지 이동 */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                ></Pagination>

            </div>
        </main>
    );
};

export default BoardQna;
