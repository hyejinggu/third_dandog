import React, { useState } from 'react';

const CreateQuestion = () => {
    // 상태 변수 정의
    const [user_id, setUser_id] = useState('');
    const [qna_Category, setQna_Category] = useState('주문/결제');
    const [qna_title, setQna_title] = useState('');
    const [qna_content, setQna_content] = useState('');
    const [qna_image, setQna_image] = useState('');
    const [message, setMessage] = useState('');

    // 이미지 미리보기 함수
    const previewImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setQna_image(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // 폼 제출 함수
    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: 폼 데이터를 서버로 전송하는 로직 추가
        // 예시: 서버로 전송 후 메시지 설정
        if (!postTitle) {
            titleRef.current.focus();
        } else if (!postContent) {
            contentRef.current.focus();
        } else {
            let formData = new FormData(document.getElementById("question_form"));

            let url = "/qna/createQuestion"; //이클립스 restController 의 mapping 경로

            axios
                .post(url, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((response) => {
                    alert(`response.data : ${response.data}`);
                    setMessage('등록이 완료되었습니다.');
                    // location.reload();
                })
                .catch((err) => {
                    if (err.response.status == "502") {
                        alert("[입력오류] 다시 시도하세요.");
                    } else {
                        alert("[시스템 오류] 잠시 후에 다시 시도하세요." + err.message);
                    }
                });
            setIsModalOpen(true);
        }

    };

    return (
        <div>
            <h2>** Qna_Insert **</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <table>
                    <tr height="40">
                        <th bgcolor="Violet">User_ID</th>
                        <td>
                            <input
                                type="text"
                                name="user_id"
                                value={user_id}
                                readOnly
                                size="20"
                                onChange={(e) => setUser_id(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr height="40">
                        <th bgcolor="Violet">Qna_Category</th>
                        <td>
                            <select
                                name="qna_Category"
                                value={qna_Category}
                                onChange={(e) => setQna_Category(e.target.value)}
                            >
                                <option value="주문/결제">주문/결제</option>
                                <option value="배송">배송</option>
                                <option value="취소/반품">취소/반품</option>
                                <option value="교환/AS">교환/AS</option>
                                <option value="회원">회원</option>
                                <option value="적립금/이벤트">적립금/이벤트</option>
                                <option value="기타">기타</option>
                            </select>
                        </td>
                    </tr>
                    <tr height="40">
                        <th bgcolor="Violet">Title</th>
                        <td>
                            <input
                                type="text"
                                name="qna_title"
                                value={qna_title}
                                size="50"
                                onChange={(e) => setQna_title(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr height="60">
                        <th bgcolor="Violet">Content</th>
                        <td>
                            <textarea
                                rows="10"
                                cols="1500"
                                name="qna_content"
                                value={qna_content}
                                onChange={(e) => setQna_content(e.target.value)}
                            ></textarea>
                        </td>
                    </tr>
                    <tr height="60">
                        <th bgcolor="Violet">Image</th>
                        <td>
                            <input
                                type="file"
                                name="qna_image"
                                accept="image/*"
                                onChange={previewImage}
                            />
                        </td>
                    </tr>
                    <tr height="40">
                        <th></th>
                        <td>
                            <input type="submit" value="등록" />
                            <input type="reset" value="취소" />
                        </td>
                    </tr>
                </table>
            </form>

            {/* 이미지 미리보기 */}
            {qna_image && (
                <img src={qna_image} alt="Uploaded Image" width="200" />
            )}

            <hr />

            {/* 메시지 출력 */}
            {message && <div>{`=> ${message}`}</div>}

            <hr />

            {/* 이전으로 및 홈 링크 */}
            <div>
                <a href="javascript:history.go(-1)">이전으로</a>&nbsp;
                <a href="/home">Home</a>
            </div>
        </div>
    );
};

export default CreateQuestion;