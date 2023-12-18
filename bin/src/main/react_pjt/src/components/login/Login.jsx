import "../../css/login/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../common/Modal";

const Login = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rememberId, setRememberId] = useState(false); // 추가된 부분

  function handleLogin(e) {
    e.preventDefault();

    // 만약 rememberId가 true인 경우, userId를 localStorage에 저장
    if (rememberId) {
      localStorage.setItem("rememberedUserId", userId);
    } else {
      localStorage.removeItem("rememberedUserId");
    }

    const url = "/member/login";
    const data = {
      user_id: userId,
      user_password: password,
    };

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data == "0") {
          setErrorMessage("아이디 또는 패스워드가 일치하지 않습니다.");
          navigate("/login");
        } else {
          const loggedInId = response.data;
          sessionStorage.setItem("loginId", loggedInId);
          setIsModalOpen(true);
        }
      })
      .catch((err) => {
        console.log("로그인 에러: " + err);
        setErrorMessage("로그인 중 오류가 발생했습니다.");
      });
  }

  // 체크박스 변경을 처리하는 함수
  const handleCheckboxChange = (e) => {
    setRememberId(e.target.checked);
  };

  // 컴포넌트가 마운트될 때 localStorage에서 rememberedUserId를 불러오기
  useEffect(() => {
    const rememberedUserId = localStorage.getItem("rememberedUserId");
    if (rememberedUserId) {
      setUserId(rememberedUserId);
      setRememberId(true);
    }
  }, []);

  return (
    <main className="login">
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalContent={sessionStorage.getItem("loginId") + "님 안녕하세요."}
          modalAfterPath={"/main"}
        />
      )}
      <div className="img_container">
        <img src={"/images/login/bg3.png"} alt="" />
      </div>

      <div className="login_container">
        <div className="login_box">
          <h2>LogIn</h2>
          <form onSubmit={(e) => handleLogin(e)}>
            <input
              required
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="로그인" />
          </form>
          {errorMessage && <p className="error_message">{errorMessage}</p>}

          <div className="saveId">
            <input
              type="checkbox"
              id="idsave"
              name="idsave"
              value="idsave"
              checked={rememberId}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="idsave" name="idsave" id="idsave">
              아이디 저장
            </label>
          </div>

          <div className="idpwfind">
            <Link to="/findid">
              <span>아이디찾기</span>
            </Link>
            <b> | </b>
            <Link to="/findpw">
              <span>비밀번호찾기</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
