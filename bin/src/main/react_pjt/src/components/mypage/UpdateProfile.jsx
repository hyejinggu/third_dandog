import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import axios from "axios";
import "../../css/myPage/updateProfile.css";
import "../../css/join/join.css";
import { useNavigate, useLocation, Link } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberData, setMemberData] = useState({});
  const loginId = sessionStorage.getItem("loginId");
  const [formValue, setFormValue] = useState({
    user_id: "",
    user_name: "",
    user_year: "2019",
    user_month: "01",
    user_day: "01",
    user_phonenum: "",
    user_email: "",
    ani_name: "",
    ani_birthday: "",
    ani_type: "",
    ani_info: "",
  });

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await axios.get(
          `/member/detailRest?user_id=${loginId}`
        );
        setMemberData(response.data);

        // 이 부분에서 formValue를 업데이트할 때 기존 formValue를 사용해야 합니다.
        setFormValue((prevFormValue) => ({
          ...prevFormValue,
          user_id: response.data.user_id,
          user_name: response.data.user_name,
          user_birthday: `${prevFormValue.user_year}${prevFormValue.user_month}${prevFormValue.user_day}`,
          user_phonenum: response.data.user_phonenum,
          user_email: response.data.user_email,
          ani_name: response.data.ani_name,
          ani_birthday: response.data.ani_birthday,
          ani_type: response.data.ani_type,
          ani_info: response.data.ani_info,
        }));
      } catch (error) {
        console.error("Error fetching member details:", error);
      }
    };

    fetchMemberDetails();
  }, [loginId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_birthday =
      formValue.user_year + formValue.user_month + formValue.user_day;
    const dataToSend = {
      ...location.state,
      user_id: formValue.user_id,
      user_name: formValue.user_name,
      user_birthday: user_birthday,
      user_phonenum: formValue.user_phonenum,
      user_email: formValue.user_email,

      ani_name: formValue.ani_name,
      ani_birthday: formValue.ani_birthday,
      ani_type: formValue.ani_type,
      ani_info: formValue.ani_info,
    };

    console.log("데이터 배열:", dataToSend);

    try {
      // 경로를 정확하게 확인해야 합니다.
      const response = await axios.post("/member/updateRest", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("회원 정보 수정 완료");
    } catch (error) {
      // 오류가 발생한 경우 콘솔에 오류를 출력하여 디버깅에 도움이 될 수 있습니다.
      console.error("Error updating member details:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }

      alert("[시스템 오류] 잠시 후에 다시 시도하세요.");
    }
  };

  // ==============================================================================

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      setIsModalOpen(true);
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  const requestFunction = () => {
    sessionStorage.removeItem("loginId");
  };

  // ==============================================================================
  return (
    <form action="/updateRest" id="updateProfile_form" method="post">
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalContent="정말 탈퇴하시겠습니까?"
          modalAfterPath={"/main"}
          requestAxios={`/member/withdraw/${loginId}`}
          requestMethod={"get"}
          requestFunction={requestFunction}
        />
      )}
      <figure>
        <table>
          <tbody>
            <div className="left_contents">
              <h2>회원 정보 수정</h2>
              <hr />
              <tr>
                <th>
                  <label htmlFor="user_id">
                    아이디
                    <span className="update_id">
                      (아이디는 변경하실 수 없습니다.)
                    </span>
                  </label>
                </th>
                <td>
                  <input
                    type="text"
                    name="user_id"
                    className="user_id"
                    value={formValue.user_id}
                    readOnly
                  />
                  <div className="update_pw">
                    <Link to="/updatepw">
                      <span>비밀번호 변경하기</span>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="user_name">이름</label>
                </th>
                <td>
                  <input
                    type="text"
                    name="user_name" // Add "name" attribute
                    id="user_name"
                    className="user_name"
                    value={formValue.user_name}
                    onChange={handleChange}
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label htmlFor="user_birthday">생년월일</label>
                </th>
                <td className="user_birthday">
                  <select
                    className="user_year"
                    name="user_year"
                    onChange={handleChange}
                  >
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                    <option value="1995">1995</option>
                    <option value="1994">1994</option>
                    <option value="1993">1993</option>
                    <option value="1992">1992</option>
                    <option value="1991">1991</option>
                    <option value="1990">1990</option>
                    <option value="1989">1989</option>
                    <option value="1988">1988</option>
                    <option value="1987">1987</option>
                    <option value="1986">1986</option>
                    <option value="1985">1985</option>
                    <option value="1984">1984</option>
                    <option value="1983">1983</option>
                    <option value="1982">1982</option>
                    <option value="1981">1981</option>
                    <option value="1980">1980</option>
                    <option value="1979">1979</option>
                    <option value="1978">1978</option>
                    <option value="1977">1977</option>
                    <option value="1976">1976</option>
                    <option value="1975">1975</option>
                    <option value="1974">1974</option>
                    <option value="1973">1973</option>
                    <option value="1972">1972</option>
                    <option value="1971">1971</option>
                    <option value="1970">1970</option>
                    <option value="1969">1969</option>
                    <option value="1968">1968</option>
                    <option value="1967">1967</option>
                    <option value="1966">1966</option>
                    <option value="1965">1965</option>
                    <option value="1964">1964</option>
                    <option value="1963">1963</option>
                    <option value="1962">1962</option>
                    <option value="1961">1961</option>
                    <option value="1960">1960</option>
                    <option value="1959">1959</option>
                    <option value="1958">1958</option>
                    <option value="1957">1957</option>
                    <option value="1956">1956</option>
                    <option value="1955">1955</option>
                    <option value="1954">1954</option>
                    <option value="1953">1953</option>
                    <option value="1952">1952</option>
                    <option value="1951">1951</option>
                    <option value="1950">1950</option>
                    <option value="1949">1949</option>
                    <option value="1948">1948</option>
                    <option value="1947">1947</option>
                    <option value="1946">1946</option>
                    <option value="1945">1945</option>
                    <option value="1944">1944</option>
                    <option value="1943">1943</option>
                    <option value="1942">1942</option>
                    <option value="1941">1941</option>
                    <option value="1940">1940</option>
                    <option value="1939">1939</option>
                    <option value="1938">1938</option>
                    <option value="1937">1937</option>
                    <option value="1936">1936</option>
                    <option value="1935">1935</option>
                    <option value="1934">1934</option>
                    <option value="1933">1933</option>
                    <option value="1932">1932</option>
                    <option value="1931">1931</option>
                    <option value="1930">1930</option>
                    <option value="1929">1929</option>
                    <option value="1928">1928</option>
                    <option value="1927">1927</option>
                    <option value="1926">1926</option>
                    <option value="1925">1925</option>
                    <option value="1924">1924</option>
                    <option value="1923">1923</option>
                    <option value="1922">1922</option>
                    <option value="1921">1921</option>
                    <option value="1920">1920</option>
                  </select>
                  <select
                    className="user_month"
                    name="user_month"
                    onChange={handleChange}
                  >
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                  <select
                    className="user_day"
                    name="user_day"
                    onChange={handleChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="user_phonenum">핸드폰 번호</label>
                </th>
                <td>
                  <input
                    type="tel"
                    name="user_phonenum"
                    id="user_phonenum"
                    placeholder="숫자만 입력해주세요"
                    value={formValue.user_phonenum}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="user_email">이메일 주소</label>
                </th>
                <td>
                  <input
                    type="email"
                    name="user_email"
                    id="user_email"
                    value={formValue.user_email}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </div>

            <div className="right_contents">
              <h2>반려동물 정보 수정</h2>
              <tr>
                <th></th>
                <td></td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="ani_name">반려동물 이름</label>
                </th>
                <td>
                  <input
                    type="text"
                    name="ani_name"
                    id="ani_name"
                    value={formValue.ani_name}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="ani_birthday">반려동물 생일</label>
                </th>
                <td>
                  <input
                    type="text"
                    name="ani_birthday"
                    id="ani_birthday"
                    placeholder="ex) 20230203"
                    value={formValue.ani_birthday}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="ani_type">반려동물 종류</label>
                </th>
                <td className="ani_type">
                  <input type="radio" name="ani_type" id="dog" value="강아지" />
                  <label htmlFor="dog">강아지</label>
                  <input type="radio" name="ani_type" id="cat" value="고양이" />
                  <label htmlFor="cat">고양이</label>
                  <input type="radio" name="ani_type" id="any" value="기타" />
                  <label htmlFor="any">기타</label>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor="ani_info">반려동물 특성</label>
                </th>
                <td className="ani_info">
                  <textarea
                    name="ani_info"
                    id="ani_info"
                    cols="84"
                    rows="3"
                    value={formValue.ani_info}
                    onChange={handleChange}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <th></th>
                <td>
                  <input
                    type="submit"
                    value="회원 탈퇴"
                    onClick={handleWithdraw}
                  />

                  <input
                    type="submit"
                    value="수정 완료"
                    onClick={handleSubmit}
                  />
                </td>
              </tr>
            </div>
          </tbody>
        </table>
      </figure>
    </form>
  );
};

export default UpdateProfile;
