import "../../css/login/findpw.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../common/Modal";

const FindPw = () => {
  const navigate = useNavigate();

  const [mailAddress, setMailAddress] = useState("");
  const [mailDomain, setMailDomain] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleFindPassword(e) {
    e.preventDefault();

    const url = "/member/findpw";
    const data = {
      userId: userId,
      mailAddress: mailAddress,
      mailDomain: mailDomain,
      userBirth: userBirth,
    };

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert(response.data);
      });
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className="findPw">
      <div className="img_container">
        <img src={"/images/login/bg3.png"} alt="" />
      </div>
      <div className="findPw_container">
        <div className="findPw_box">
          <h2>비밀번호찾기</h2>
          <form onSubmit={(e) => handleFindPassword(e)}>
            <label htmlFor="id">아이디 : </label>
            <input
              id="id"
              type="text"
              placeholder="아이디를 입력해주세요"
              required
              className="text_box"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
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
              className="text_box"
            />

            <label htmlFor="email">이메일 : </label>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="가입 시 입력했던"
              required
              value={mailAddress}
              onChange={(e) => setMailAddress(e.target.value)}
              className="mail_box"
            />
            <span>&nbsp;@&nbsp;</span>
            <input
              type="text"
              name="email"
              placeholder="e-mail을 입력"
              required
              value={mailDomain}
              onChange={(e) => setMailDomain(e.target.value)}
              className="mail_box"
            />
            <select
              className="mail_box_last"
              value={mailDomain}
              onChange={(e) => setMailDomain(e.target.value)}
            >
              <option value="">직접 입력</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.com">daum.com</option>
              <option value="google.com">google.com</option>
            </select>

            <div className="button_box">
              <input
                type="submit"
                value="비밀번호 찾기"
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
export default FindPw;
