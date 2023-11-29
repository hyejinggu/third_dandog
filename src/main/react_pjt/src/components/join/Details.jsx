import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../css/join/join.css";
import Modal from "../common/Modal";

const Details = () => {

  // ================================================================================
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const [formValue, setFormValue] = useState({
    ...location.state,
    user_id: "",
    user_password: "",
    user_password2: ""
  });

  useEffect(() => {
    // Agree와 Profile에서 받아온 데이터 합치기
    if (location.state) {
      setFormValue((prevFormValue) => ({
        ...prevFormValue,
        ...location.state,
      }));
    }
  }, [location.state]);

  const [errors, setErrors] = useState(
    { user_id: "", user_password: "", user_password2: "" }
  );


  // ================================================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });

    // 유효성 검사 실행
    validateField(name, value);
  };

  // ================================================================================
  // 서버로 보낼 데이터

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 유효성 검사 실행
    if (validateForm()) {
      setIsModalOpen(true);

      // Agree, Profile, Information, Details의 데이터를 합친 배열
      const dataToSend = {
        ...location.state,
        user_id: formValue.user_id,
        user_password: formValue.user_password
      };

      console.log('데이터 배열:', dataToSend);

      // ================================================================================
      // 서버 요청

      let url = "/join/details";
      axios
        .post(url, dataToSend, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((response) => {
          alert('Server Response:', response);
          setIsModalOpen(true);
        })
        .catch((err) => {
          if (err.response.status === 502) {
            alert("[입력오류] 다시 시도하세요.");
          } else {
            alert("[시스템 오류] 잠시 후에 다시 시도하세요." + err.message);
          }
        });

      setIsModalOpen(true);

    } else {
      alert("필수정보를 입력해주세요.");
    }
  };

  // ================================================================================
  const validateField = (fieldName, value) => {
    const newErrors = {
      ...errors
    };

    switch (fieldName) {
      case "user_id":
        newErrors.user_id = !value
          ? "아이디를 입력하세요."
          : value.length < 6 || value.length > 20
            ? "아이디는 6~20자 사이여야 합니다."
            : "";
        break;
      case "user_password":
        newErrors.user_password = !value
          ? "비밀번호를 입력하세요."
          : value.length < 8
            ? "비밀번호는 8자 이상이어야 합니다."
            : "";
        break;
      case "user_password2":
        newErrors.user_password2 = !value
          ? "비밀번호를 확인하세요."
          : value !== formValue.user_password
            ? "비밀번호가 일치하지 않습니다."
            : "";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  // ================================================================================
  const validateForm = () => {
    const newErrors = {
      ...errors
    };

    // 아이디, 비밀번호, 비밀번호 확인 필드의 유효성 검사를 진행합니다.
    validateField("user_id", formValue.user_id);
    validateField("user_password", formValue.user_password);
    validateField("user_password2", formValue.user_password2);

    setErrors(newErrors);

    // 모든 필드의 값이 존재하고, 에러가 없으면 true를 반환합니다.
    return (
      formValue.user_id !== "" && formValue.user_password !== "" && formValue.user_password2 !== "" && Object.values(newErrors).every((error) => error === "")
    );
  };

  // ================================================================================
  return (
    <form
      action="/join/details"
      id="join_form"
      method="post"
      onSubmit={handleSubmit}>
      <figure>
        <table>
          <tbody>
            <tr>
              <th>
                <label htmlFor="user_id" className="required">
                  아이디
                </label>
              </th>
              <td>
                <input
                  type="text"
                  name="user_id"
                  id="user_id"
                  placeholder="아이디 입력(6~20자)"
                  value={formValue.user_id}
                  onChange={handleChange} />
              </td>
              {errors.user_id && <div className="error">{errors.user_id}</div>}
            </tr>
            <tr>
              <th>
                <label htmlFor="user_password" className="required">
                  비밀번호
                </label>
              </th>
              <td>
                <input
                  required="required"
                  type="password"
                  name="user_password"
                  id="user_password"
                  placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)"
                  value={formValue.user_password}
                  onChange={handleChange} />
              </td>
              {errors.user_password && (<div className="error">{errors.user_password}</div>)}
            </tr>
            <tr>
              <th>
                <label htmlFor="user_password2" className="required">
                  비밀번호 확인
                </label>
              </th>
              <td>
                <input
                  required="required"
                  type="password"
                  name="user_password2"
                  id="user_password2"
                  placeholder="비밀번호 재입력"
                  value={formValue.user_password2}
                  onChange={handleChange} />
              </td>
              {errors.user_password2 && (<div className="error">{errors.user_password2}</div>)}
            </tr>
          </tbody>
        </table>
      </figure>
      <input type="submit" value="회원가입" onClick={handleSubmit} /> {
        isModalOpen && (
          <Modal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modalContent="회원가입이 완료되었습니다."
            modalAfterPath={"/login/*"} />
        )
      }
    </form>
  );
};

export default Details;
