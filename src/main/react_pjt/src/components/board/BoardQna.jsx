import "../../css/board/board.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
//import Creat from "./NeighborReview";

// 게시판 글 목록 배열
const BoardQna = () => {
    const [selectedQna_category, setSelectedQna_category] = useState("ALL");
    const [openQuestion, setOpenQuestion] = useState(null); // 선택된 질문의 인덱스를 저장
    const [searchText, setSearchText] = useState(""); // 검색어를 위한 새 상태
    const [filteredBoardArray, setFilteredBoardArray] = useState([]);
    // 필터링된 항목을 저장할 상태.검색버튼을 눌렀을때만 필터링. (boardArray) 쓸 경우 const 는 배열 밑에 위치하기
    const [showInitialTable, setShowInitialTable] = useState(true); // 초기 테이블 보여주기 여부를 저장하는 상태
    // 위의 useState가 빈 배열로 바뀌고 아래 한 줄이 추가되면서 다시 배열의 위로 위치함.

    // 게시판 글 목록 데이터 배열. table을 배열로 수정. const로 수정

    const [boardArray, setBoardArray] = useState([]);
    //const boardList = boardArray;

    // 카테고리별 검색시 필요
    // useEffect(() => {
    //     setInputValue("");
    //     switch (qna_Category) {
    //         case "주문/결제":
    //             queryCategory = "OP";
    //             break;
    //         case "배송":
    //             queryCategory = "S";
    //             break;
    //         case "취소/반품":
    //             queryCategory = "CR";
    //             break;
    //         case "교환":
    //             queryCategory = "EA";
    //             break;
    //         case "회원":
    //             queryCategory = "M";
    //             break;
    //         case "적립금/이벤트":
    //             queryCategory = "PE";
    //             break;
    //         case "기타":
    //             queryCategory = "E";
    //             break;
    //     }
    // })

    console.log('boardArray' + boardArray);
    useEffect(() => {
        axios
            .get("/qnar/qnaList") //post에서 바꿈
            .then((res) => {
                // 게시글을 qna_seq 기준으로 내림차순 정렬
                const sortedBoardArray = res.data.sort((a, b) => b.qna_seq - a.qna_seq);
                // setFilteredBoardArray(sortedBoardArray);
                setShowInitialTable(true);
                //setSearchText("");
                setBoardArray(sortedBoardArray);
                console.log('res.data : ' + res.data);
            })
            .catch((res) => console.log('** res.data.err : ' + res));
    }, [searchText]); // 검색기능 FilteredBoardArray를 추가한 이후 openQuestion, 있으면 다시 기본리스트 전체출력문제로 제외함 

    // CreateQuestion에서 글을 등록하는 로직 수행 후
    // 데이터를 다시 불러오기 위해 openQuestion 상태를 변경
    const handleCreateQuestion = () => {
        setOpenQuestion(openQuestion === null ? 0 : null);
    }

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

    // 검색 함수 ** 배열안에 모든 질문을 담을수없으니 
    // answer 의 JSX 내용을 문자열로 변환하기 위해서는 .props.children을 활용
    const handleSearch = (e) => {
        e.preventDefault();

        // const selectedCategory = selectedQna_category;

        // 서버에서 검색조건(qna_category, search)에 해당하는 목록 가져오기

        const filterRequest = {
            qna_category: selectedQna_category,
            searchText: searchText,
        };


        alert(`category=${selectedQna_category}, searchText=${searchText}`);
        axios
            .get(`/qnar/qnasearchList/${selectedQna_category}/${searchText}`)
            .then((res) => {
                // 게시글을 qna_seq 기준으로 내림차순 정렬
                const sortedBoardArray = res.data.sort((a, b) => b.qna_seq - a.qna_seq);
                setFilteredBoardArray(sortedBoardArray);
                setShowInitialTable(false);
                //setSearchText("");
                //setBoardArray(res.data);
                console.log('res.data : ' + res.data);
            })
            .catch((res) => console.log('** res.data.err : ' + res));

        //
        // const filteredItems = boardArray.filter((item) => {
        //     if (item.answer) {
        //         const answerText = typeof item.answer === 'string' ? item.answer : item.answer.props.children.join(" "); // JSX일 경우 문자열로 변환
        //         return (
        //             (selectedQna_category === "" || item.qna_category === selectedQna_category) &&
        //             (item.qna_title.includes(searchText) || answerText.includes(searchText))
        //         );
        //     }
        //     return false; 
        // });
        // setFilteredBoardArray(filteredItems);
        //setShowInitialTable(false); // 검색 결과를 보여준 후 초기 테이블 숨기기
        //setSearchText(""); // 검색 후 검색창의 검색어 초기화
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

    // 검색어 입력후 공지사항 눌렀을때 다시 초기 테이블(항목이 나오게)로 돌아가기 함수

    const handleInitialTable = () => {
        setFilteredBoardArray([]); // 초기 테이블 항목을 보여주기 위해 필터링된 배열 초기화
        setShowInitialTable(true); // 초기 테이블 내용 보여주기
        setSearchText(""); // 검색어 초기

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
                    <select
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
                                <React.Fragment key={item.qna_seq}>
                                    <tr className={`question_1 ${openQuestion === index ? "show-answer" : ""}`}
                                        onClick={() => handleAnswerToggle(index, item.user_id)}>
                                        <td></td>
                                        <td>{item.qna_seq}</td>
                                        <td>{item.qna_category}</td>
                                        <td>
                                            {((sessionStorage.getItem('loginId') === item.user_id) || (sessionStorage.getItem('isAdmin') === "true")) ? (
                                                <a href={`qdetail?qna_seq=${item.qna_seq}`}>{item.qna_title}</a>
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
                                            {/* <td colSpan={2}></td> */}
                                            <td>
                                                <div>[질문] {item.qna_content}</div>
                                                <br></br>
                                                {item.qna_reply ? <div>[답변] {item.qna_reply}</div> : null}
                                            </td>

                                            {/* <td colSpan={3}></td> */}
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            // 필터링된 항목 보여주기
                            filteredBoardArray.map((item, index) => (
                                <React.Fragment key={item.qna_seq}>
                                    <tr className={`question_1 ${openQuestion === index ? "show-answer" : ""}`}
                                        onClick={() => handleAnswerToggle(index, item.user_id)}>
                                        <td></td>
                                        <td>{item.qna_seq}</td>
                                        <td>{item.qna_category}</td>
                                        <td>
                                            {((sessionStorage.getItem('loginId') === item.user_id) || (sessionStorage.getItem('isAdmin') === "true")) ? (
                                                <a href={`qdetail?qna_seq=${item.qna_seq}`}>{item.qna_title}</a>
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
                                        // <tr className="answer">
                                        //     {/* tr.answer의 시작점을 tr.question_1.show-answer의 세 번째 td와 같도록 수정 */}
                                        //     <td></td>
                                        //     <td></td>
                                        //     <td colSpan="4">
                                        //         {/*  */}
                                        //         <span>{item.answer}</span>
                                        //     </td>
                                        // </tr>
                                        <tr className="answer">
                                            <td></td>
                                            <td></td>
                                            <td>{item.qna_category}</td>
                                            {/* <td colSpan={2}></td> */}
                                            <td>
                                                <div>[질문] {item.qna_content}</div>
                                                <br></br>
                                                {item.qna_reply ? <div>[답변] {item.qna_reply}</div> : null}
                                            </td>

                                            {/* <td colSpan={3}></td> */}
                                            <td></td>
                                            <td></td>
                                            <td></td>
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
        </main>
    );
};

export default BoardQna;
