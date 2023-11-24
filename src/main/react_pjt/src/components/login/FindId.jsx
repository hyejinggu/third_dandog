import "../../css/login/findid.css";

const FindId = () => {
    return (
        <main className="findId">
            <div className="img_container">
                <img src={"/images/login/bg3.png"} alt="" />
            </div>
            <div className="findId_container">
                <div className="findId_box">
                    <h2>아이디찾기</h2>
                    <form className="form_wrap">
                        <label for="text">이름 : </label>
                        <input type="text" placeholder="이름을 입력하세요" required />
                        <label for="phone">휴대폰 번호 : </label>
                        <input type="phone" placeholder="휴대전화 번호를 입력하세요" required />
                        <label for="email">이메일 : </label>
                        <input type="email" id="email" name="email" placeholder="example@example.com" required/>
                        <input type="submit" value="로그인" />
                    </form>
                </div>
            </div>
        </main>
    );
};
export default FindId;