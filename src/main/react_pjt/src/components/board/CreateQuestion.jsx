import "../../css/board/board.css";
import "../../css/board/question_form.css";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import React, { useState, useRef, useContext } from "react";
//import { CreateQuestionContext } from "./Board";
import Modal from "../common/Modal";
import axios from "axios";
import BoardQna from "./BoardQna";


const CreateQuestion = () => {
    //const { addPostFromLocalStorage } = useContext(CreateQuestionContext);

    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 상태 변수 정의
    const [user_id, setUser_id] = useState('');
    const [qna_Category, setQna_Category] = useState('주문/결제');
    const [qna_title, setQna_title] = useState('');
    const [qna_content, setQna_content] = useState('');
    //const [qna_image, setQna_image] = useState('');
    const [message, setMessage] = useState('');

    // 이미지 미리보기 함수
    // const previewImage = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();

    //     reader.onloadend = () => {
    //         setQna_image(reader.result);
    //     };

    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // };

    // 세션 스토리지에서 로그인 아이디 불러오기
    const loginId = sessionStorage.getItem('loginId'); // 'userId'는 저장된 로그인 아이디의 키입니다.

    // 불러온 로그인 아이디 사용하기
    console.log('loginId:', loginId);

    // 폼 제출 함수
    const handleSubmit = (e) => {
        e.preventDefault();

        // 테스트 titleRef 및 contentRef가 현재 어떤 요소에 연결되었는지 확인
        console.log('titleRef:', titleRef);
        console.log('contentRef:', contentRef);

        // TODO: 폼 데이터를 서버로 전송하는 로직 추가
        // 예시: 서버로 전송 후 메시지 설정
        if (!postTitle) {
            console.log('titleRef.current:', titleRef.current); //
            titleRef.current.focus();
        } else if (!postContent) {
            console.log('contentRef.current:', contentRef.current); //
            contentRef.current.focus();
        };
        let formData = new FormData(document.getElementById("question_form"));

        let url = "/qnar/createQuestion"; //이클립스 restController 의 mapping 경로

        axios
            .post(url, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                alert(`response.data : ${response.data}`);
                setMessage('등록이 완료되었습니다.');
                //location.reload();
            })
            .catch((err) => {
                if (err.response.status === "502") {
                    alert("[입력오류] 다시 시도하세요.");
                } else {
                    alert("[시스템 오류] 잠시 후에 다시 시도하세요." + err.message);
                }
            });
        //document.getElementById('resultArea2').innerHTML="";
        setIsModalOpen(true);
    }

        // 취소
        const handleCancel = () => {
        };
    
        //const history = useHistory();

        return (
            <div >
                <div>
                    {isModalOpen && (
                        <Modal
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            modalContent={"글 작성이 완료되었습니다."}
                            modalAfterPath={"/board/boardqna/*"}
                        />
                    )}
                </div>
                <h2 className="ctitle">** Qna_Insert **</h2>

                <form id="question_form">
                    <table>
                        <tr height="40">
                            <th bgcolor="Orange">User_ID</th>
                            <td>
                                <input
                                    type="text"
                                    name="user_id"
                                    id="id"
                                    value={loginId}
                                    readOnly
                                    size="20"
                                    onChange={(e) => setUser_id(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr height="40">
                            <th bgcolor="Orange">Qna_Category</th>
                            <td>
                                <select
                                    name="qna_category" id="q_board_select"
                                    value={qna_Category}
                                    onChange={(e) => setQna_Category(e.target.value)}
                                >
                                    <option value="OP">주문/결제</option>
                                    <option value="S">배송</option>
                                    <option value="CR">취소/반품</option>
                                    <option value="EA">교환/AS</option>
                                    <option value="M">회원</option>
                                    <option value="PE">적립금/이벤트</option>
                                    <option value="E">기타</option>
                                </select>
                            </td>
                        </tr>
                        <tr height="40">
                            <th bgcolor="Orange">Title</th>
                            <td>
                                <input
                                    type="text"
                                    name="qna_title"
                                    id="qtitle"
                                    value={qna_title}
                                    size="50"
                                    onChange={(e) => setQna_title(e.target.value)}
                                    ref={titleRef}
                                />
                            </td>
                        </tr>
                        <tr height="60">
                            <th bgcolor="Orange">Content</th>
                            <td>
                                <textarea
                                    rows="10"
                                    cols="1500"
                                    name="qna_content"
                                    id="qcontent"
                                    value={qna_content} //
                                    onChange={(e) => setQna_content(e.target.value)}
                                    ref={contentRef}
                                ></textarea>
                            </td>
                        </tr>
                        {/* <tr height="60">
                        <th bgcolor="Violet">Image</th>
                        <td>
                            <input
                                type="file"
                                name="qnaFile"
                                id="qimage"
                            />
                        </td>
                    </tr> */}
                        <tr height="40">
                            <th></th>
                            <td>
                                <button type="submit" onClick={handleSubmit}>
                                    등록
                                </button>
                                &nbsp;&nbsp;
                                <Link to="board/boardqna">
                                <button type="reset" onClick={handleCancel}>
                                    취소
                                </button>
                                </Link>
                            </td>
                        </tr>
                    </table>
                </form>

                {/* 이미지 미리보기 */}
                {/* {qna_image && (
                <img src={qna_image} alt="Uploaded Image" width="200" />
            )} */}
                <br></br>
                <hr />

                {/* 메시지 출력 */}
                {message && <div>{`=> ${message}`}</div>}
                
                <hr />
                
                {/* 이전으로 및 홈 링크 */}
                <div>
                    <br></br>
                    <a href="javascript:history.go(-1)">이전으로</a>&nbsp;&nbsp;&nbsp;
                    <a href="/home">Home</a>
                    
                </div>
                <br></br>
            </div>
        );
    };

export default CreateQuestion;
