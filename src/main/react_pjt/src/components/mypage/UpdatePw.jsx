import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import axios from "axios";
import "../../css/myPage/updatePw.css";
import "../../css/join/join.css";
import { useNavigate, useLocation } from "react-router-dom";

const UpdatePw = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orgPassword, setOrgPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const loginId = sessionStorage.getItem("loginId");
  const location = useLocation();

  const handleUpdatePw = async (e) => {
    e.preventDefault();

    // Password validation
    if (!validatePassword()) {
      return;
    }

    const dataToSend = {
      loginId,
      orgPassword,
      newPassword,
    };

    try {
      const response = await axios.post("/member/updatePw", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data === true) {
        alert("비밀번호 변경 성공");
        alert("다시 로그인 해주세요.");
        sessionStorage.removeItem("loginId");
        navigate("/login");
      } else {
        alert("비밀번호 변경 실패");
      }
    } catch (error) {
      console.error("Error updating member details:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }

      alert("[시스템 오류] 잠시 후에 다시 시도하세요.");
    }
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "비밀번호는 8자 이상, 영문자, 숫자, 특수문자(@$!%*#?&)를 포함해야 합니다."
      );
      return false;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("신규 비밀번호가 일치하지 않습니다.");
      return false;
    }

    setPasswordError("");
    return true;
  };

  return (
    <form action="/updateRest" id="updatepw_form" method="post">
      <figure>
        <table>
          <tbody>
            <div className="pw_wrap">
              <h2>비밀번호 변경</h2>
              <hr />
              <tr>
                <th>
                  <label htmlFor="user_password">기존 비밀번호</label>
                </th>
                <td>
                  <input
                    type="password"
                    name="org_password"
                    id="user_password"
                    value={orgPassword}
                    onChange={(e) => setOrgPassword(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="user_password">신규 비밀번호</label>
                </th>
                <td>
                  <input
                    type="password"
                    name="new_password"
                    id="user_password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="user_password">신규 비밀번호 확인</label>
                </th>
                <td>
                  <input
                    type="password"
                    name="user_password"
                    id="user_password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </td>
              </tr>
            </div>
            {passwordError && (
              <div className="password_error">{passwordError}</div>
            )}
            <div className="update_pw_btn">
              <input
                type="submit"
                value="비밀번호 변경"
                onClick={handleUpdatePw}
              />
            </div>
          </tbody>
        </table>
      </figure>
    </form>
  );
};

export default UpdatePw;
