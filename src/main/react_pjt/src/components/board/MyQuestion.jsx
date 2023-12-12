import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyQuestionsComponent = () => {
    const [myQuestions, setMyQuestions] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const loginId = sessionStorage.getItem("loginId");

    useEffect(() => {
        // 로그인한 사용자의 아이디를 기반으로 질문 목록을 조회하는 함수
        const fetchMyQuestions = async () => {
            try {
                const response = await axios.get(`/qnar/myQuestions/${loginId}`);
                setMyQuestions(response.data);
            } catch (error) {
                console.error('Error fetching my questions:', error);
            }
        };

        // 함수 호출
        fetchMyQuestions();
    }, [loginId]); // loginId가 변경될 때마다 useEffect가 호출

    // 체크박스
    const handleCheckboxChange = (qna_seq) => {
        // 해당 행의 체크 여부를 토글
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(qna_seq)) {
                return prevSelectedRows.filter((row) => row !== qna_seq);
            } else {
                return [...prevSelectedRows, qna_seq];
            }
        });
    };

    const handleSelectAllChange = () => {
        // 전체 선택/해제 상태를 토글하고 선택된 행을 업데이트
        setSelectAll((prevSelectAll) => !prevSelectAll);
        setSelectedRows((prevSelectedRows) => {
            if (!selectAll) {
                // 전체 선택이었을 때는 모든 행을 추가
                return myQuestions.map((qna) => qna.qna_seq);
            } else {
                // 전체 선택 해제일 때는 빈 배열
                return [];
            }
        });
    };

    const handleDeleteSelected = async () => {
        // 선택된 행을 삭제하는 요청 등 추가적인 로직을 구현할 수 있음
        try {
            // 예시: 선택된 행의 qna_seq를 이용하여 삭제 요청
            await axios.post('/qnar/deleteSelected', { selectedRows });
            // 삭제 후 질문 목록을 업데이트
            const response = await axios.get(`/qnar/myQuestions/${loginId}`);
            setMyQuestions(response.data);
            // 선택된 행 초기화
            setSelectedRows([]);
            setSelectAll(false);
        } catch (error) {
            console.error('Error deleting selected questions:', error);
        }
    };



    return (
        <div>
            <h2>My Questions</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th></th>
                        {/* <th>Seq</th> */}
                        {/* <th>ID</th> */}
                        {/* <th>Category</th> */}
                        <th>Title</th>
                        <th>Content</th>
                        <th>date</th>
                        <th>답변여부</th>
                    </tr>
                </thead>
                
                <tbody>
                    {myQuestions.map((qna) => (
                        <tr key={qna.qna_seq}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(qna.qna_seq)}
                                    onChange={() => handleCheckboxChange(qna.qna_seq)}
                                />
                            </td>
                            {/* <td>{qna.qna_seq}</td> */}
                            {/* <td>{qna.user_id}</td> */}
                            {/* <td>{qna.qna_category}</td> */}
                            <td>{qna.qna_title}</td>
                            <td>{qna.qna_content}</td>
                            <td>{qna.regdate}</td>
                            <td>{qna.answer_state}</td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
            &nbsp;
            <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
            />
            &nbsp;<button onClick={handleDeleteSelected}>삭제</button>
            
        </div>
    );
};

export default MyQuestionsComponent;
