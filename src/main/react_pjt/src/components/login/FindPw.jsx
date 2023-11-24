import "../../css/login/findpw.css";

const FindPw = () => {
  return (
    <main className="findPw">
      <div className="img_container">
        <img src={"/images/login/bg3.png"} alt="" />
      </div>
      <div className="findPw_container">
        <div className="findPw_box">
          <h2>비밀번호찾기</h2>
          <form>
            <label for="text">아이디 : </label>
            <input type="text" placeholder="아이디를 입력해주세요" required />
            <input type="submit" value="다음" />
          </form>
        </div>
      </div>
    </main>
  );
};
export default FindPw;
