import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/join/join.css";

const Profile = () => {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    user_name: "",
    user_birth: "",
    user_month: "",
    user_day: "",
    user_num: "",
    user_email: "",
  });

  const [errors, setErrors] = useState({
    user_name: "",
    user_birth: "",
    user_num: "",
    user_email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });

    // 유효성 검사 실행
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사 실행
    if (validateForm()) {
      // 유효성 검사 통과 시 다음 단계로 진행
      navigate("/join/information");
    } else {
      alert("필수정보를 입력해주세요.");
    }
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "user_name":
        newErrors.user_name = !value ? "성함을 입력해주세요." : "";
        break;

      case "user_num":
        newErrors.user_num = !value
          ? "핸드폰 번호를 입력해주세요."
          : value.length < 10 || value.length > 11
          ? "휴대폰 번호를 정확히 입력해주세요."
          : "";
        break;

      case "user_email":
        newErrors.user_email = !value ? "이메일을 입력해주세요." : "";
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = { ...errors };

    validateField("user_name", formValue.user_name);
    validateField("user_num", formValue.user_num);
    validateField("user_email", formValue.user_email);

    setErrors(newErrors);

    return (
      formValue.user_name !== "" &&
      formValue.user_num !== "" &&
      formValue.user_email !== "" &&
      Object.values(newErrors).every((error) => error === "")
    );
  };

  // ================================================================================

  return (
    <form action="#" method="post" onSubmit={handleSubmit}>
      <figure>
        <table>
          <tbody>
            <tr>
              <th>
                <label htmlFor="user_name" className="required">
                  이름
                </label>
              </th>
              <td>
                <input
                  type="text"
                  name="user_name" // Add "name" attribute
                  id="user_name"
                  placeholder="이름을 입력해주세요"
                  required
                  value={formValue.user_name} // Add "value" attribute
                  onChange={handleChange} // Add "onChange" attribute
                />
              </td>
              {errors.user_name && (
                <div className="error">{errors.user_name}</div>
              )}
            </tr>

            <tr>
              <th>
                <label htmlFor="user_birth" className="required">
                  생년월일
                </label>
              </th>
              <td className="user_birth">
                <select className="user_year" required id="user_birth">
                  <option disabled defaultValue>
                    년
                  </option>
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
                <select className="user_month" required>
                  <option disabled defaultValue>
                    월
                  </option>
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
                <select className="user_day" required>
                  <option disabled defaultValue>
                    일
                  </option>
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
                <label htmlFor="user_num" className="required">
                  핸드폰 번호
                </label>
              </th>
              <td>
                <input
                  type="tel"
                  name="user_num"
                  id="user_num"
                  placeholder="- 없이 입력해주세요"
                  value={formValue.user_num}
                  onChange={handleChange}
                />
              </td>
              {errors.user_num && (
                <div className="error">{errors.user_num}</div>
              )}
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
                  className="user_email"
                  value={formValue.user_email}
                  onChange={handleChange}
                />
                <select className="domain_list">
                  <option disabled value="" defaultValue>
                    선택
                  </option>
                  <option value="naver.com">naver.com</option>
                  <option value="hanmail.net">hanmail.net</option>
                  <option value="google.com">google.com</option>
                  <option value="nate.com">nate.com</option>
                  <option value="custom">직접 입력</option>
                </select>
              </td>
              {errors.user_email && (
                <div className="error">{errors.user_email}</div>
              )}
            </tr>
          </tbody>
        </table>
      </figure>
      <input type="submit" value="Next" onClick={handleSubmit} />
    </form>
  );
};

export default Profile;
