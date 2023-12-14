import "../../css/login/findid.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../common/Modal";

const FindId = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleFindId(e) {
    e.preventDefault();

    const url = "/member/findid";
    const data = {
      userName: userName,
      userPhone: userPhone,
      userBirth: userBirth,
    };

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUserId(response.data);
        setIsModalOpen(true);
      });
  }

  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history
  };

  return (
    <main className="findId">
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalContent={`'${userName}'님의 ID는 '${userId}'입니다.`}
          modalAfterPath={"/login"}
        />
      )}
      <div className="img_container">
        <img src={"/images/login/bg3.png"} alt="" />
      </div>
      <div className="findId_container">
        <div className="findId_box">
          <h2>아이디 찾기</h2>
          <form className="form_wrap" onSubmit={(e) => handleFindId(e)}>
            <label htmlFor="name">이름 : </label>
            <input
              id="name"
              type="text"
              placeholder="이름 입력"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <label htmlFor="phone">휴대폰 번호 : </label>
            <input
              id="phone"
              type="phone"
              placeholder="휴대전화 번호를 입력 ex) 01012341234"
              required
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />

            <label htmlFor="birth">생년월일 : </label>
            <input
              type="text"
              id="birth"
              name="birthday"
              placeholder="8자리 입력 ex) 19990101"
              required
              value={userBirth}
              onChange={(e) => setUserBirth(e.target.value)}
            />
            <div className="button_box">
              <input
                type="submit"
                value="아이디 찾기"
                className="find_button"
              />
              <input
                type="button"
                value="뒤로가기"
                onClick={handleGoBack}
                className="find_button"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
export default FindId;
