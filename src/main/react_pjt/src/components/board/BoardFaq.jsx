import "../../css/board/board.css";
import Pagination from "../item/Pagination";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

// 게시판 글 목록 배열
//const BoardFaq = ({ item }) => {
const BoardFaq = () => {
    const [selectedFaq_category, setSelectedFaq_category] = useState("ALL");
    const [openQuestion, setOpenQuestion] = useState(null); // 선택된 질문의 인덱스를 저장
    const [searchText, setSearchText] = useState(""); // 검색어를 위한 새 상태
    const [faqArray, setFaqArray] = useState([]);
    //const [filteredBoardArray, setFilteredBoardArray] = useState([]);
    // 필터링된 항목을 저장할 상태.검색버튼을 눌렀을때만 필터링. (boardArray) 쓸 경우 const 는 배열 밑에 위치하기
    //const [showInitialTable, setShowInitialTable] = useState(true); // 초기 테이블 보여주기 여부를 저장하는 상태
    // 위의 useState가 빈 배열로 바뀌고 아래 한 줄이 추가되면서 다시 배열의 위로 위치함.

    console.log('faqArray' + faqArray);

    useEffect(() => {
        axios
            .get("/faqr/faqList") //post에서 바꿈
            .then((res) => {
                // 게시글을 qna_seq 기준으로 내림차순 정렬
                const sortedFaqArray = res.data.sort((a, b) => b.faq_seq - a.faq_seq);
                //setShowInitialTable(true);
                setFaqArray(sortedFaqArray);
                console.log('res.data : ' + res.data);
            })
            .catch((res) => console.log('** res.data.err : ' + res));
    }, []);


    // 검색 함수
    // answer 의 JSX 내용을 문자열로 변환하기 위해서는 .props.children을 활용
    const handleSearch = (e) => {
        e.preventDefault();

        const filterRequest = {
            faq_category: selectedFaq_category,
            searchText: searchText,
        };

        alert(`category=${selectedFaq_category}, searchText=${searchText}`);
        axios
            .get(`/faqr/faqsearchList/${selectedFaq_category}/${searchText}`)
            .then((res) => {
                const sortedFaqArray = res.data.sort((a, b) => b.faq_seq - a.faq_seq);
                setFaqArray(sortedFaqArray);

                console.log('res.data : ' + res.data);
            })
            .catch((res) => console.log('** res.data.err : ' + res));
    }; // 검색 로직

    //     const filteredItems = faqArray.filter((item) => {
    //         const answerText = typeof item.answer === 'string' ? item.answer : item.answer.props.children.join(" "); // JSX일 경우 문자열로 변환
    //         return (
    //             item.title.includes(searchText) || answerText.includes(searchText)
    //         );
    //     });
    //     setFilteredBoardArray(filteredItems);
    //     setShowInitialTable(false); // 검색 결과를 보여준 후 초기 테이블 숨기기
    //     setSearchText(""); // 검색 후 검색창의 검색어 초기화
    // }; // 검색 로직

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
    // const handleInitialTable = () => {
    //     setFilteredBoardArray([]); // 초기 테이블 항목을 보여주기 위해 필터링된 배열 초기화
    //     setShowInitialTable(true); // 초기 테이블 내용 보여주기
    //     setSearchText(""); // 검색어 초기화
    // };

    // 사용자페이지 qnaList의 질문답변이 노출되도록 설정함
    const handleAnswerToggle = (index) => {
        //     //alert("*** " + user_id + " , " + sessionStorage.getItem('loginId'))
        //     if (sessionStorage.getItem('loginId') == 'manager' || sessionStorage.getItem('loginId') == user_id)
        setOpenQuestion((prevIndex) => (prevIndex === index ? null : index));
    };

    // *** pagination 구현
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const listPerPage = 5; // 페이지 당 게시글 개수
    const totalPages = Math.ceil(faqArray.length / listPerPage); // 전체 페이지 번호

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * listPerPage;
        const endIndex = startIndex + listPerPage;
        return faqArray.slice(startIndex, endIndex);
    };

    // 고객센터 게시판 종류
    return (
        <main>
            <div id="board">
                <h1 className="title">고객센터</h1>

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
                        name="faq_category"
                        onChange={(e) => setSelectedFaq_category(e.target.value)}>

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
                        id="faq_search"
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
                            {/* <th>작성자</th> */}
                            {/* <th>작성일</th> */}
                            {/* <th>조회수</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {getPaginatedData().map((item, index) => ( //faqArray.map
                            <React.Fragment key={item.faq_seq}>
                                <tr className={`question_1 ${openQuestion === index ? "show-answer" : ""}`}
                                    onClick={() => handleAnswerToggle(index)}>
                                    <td></td>
                                    <td>{item.faq_seq}</td>
                                    <td>{item.faq_category}</td>
                                    <td>{item.faq_title}</td>
                                </tr>
                                {openQuestion === index && (
                                    <tr className={`answer ${openQuestion === index ? "show-answer" : ""}`}>
                                        <td></td>
                                        <td></td>
                                        <td>{item.faq_category}</td>
                                        <td>
                                            <div>[질문] {item.faq_content}</div>
                                            <br></br>
                                            {item.faq_reply ? <div>[답변] {item.faq_reply}</div> : null}
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

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                ></Pagination>
                <br></br>
            </div>
        </main>
    );
};

export default BoardFaq;
