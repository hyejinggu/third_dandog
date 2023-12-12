import "../../css/myPage/myPage.css";
import { Link } from "react-router-dom";

const MyPage = () => {
  return (
    <div className="mypageWrap">
      <h2 className="title">마이페이지</h2>
      <div className="mypageHeader">
        <ul>
          <li>
            <img
              src={"/images/myPage/coin.png"}
              style={{ width: "40px", height: "40px", padding: "5px 0" }}
              alt=""
            />
            <p>적립금</p>
            <div className="num">2,100</div>
          </li>
          <li>
            <img src={"/images/myPage/change.png"} alt="" />
            <p>주문 현황</p>
            <div className="num">2</div>
          </li>
          <li>
            <img src={"/images/myPage/review.svg"} alt="" />

            <p>후기작성</p>
            <div className="num">2</div>
          </li>
        </ul>
      </div>
      <div className="mypageContainer">
        <h2>주문/배송조회</h2>
        <ul>
          <li>
            <div className="num">0</div>
            <p>입금/결제</p>
          </li>
          <li>
            <div className="num">0</div>
            <p>배송중</p>
          </li>
          <li>
            <div className="num">0</div>
            <p>배송완료</p>
          </li>
          <li>
            <div className="point">2</div>
            <p>구매확정</p>
          </li>
          <li>
            <div className="num">0</div>
            <p>환불/교환</p>
          </li>
        </ul>
      </div>
      <div className="mypageBtn">
        <ul>
          <li>
            <img src={"/images/myPage/delivery.png"} alt="" />
            배송조회
          </li>
          <li>
            <img src={"/images/myPage/delete.png"} alt="" />
            주문조회
          </li>
          <li>
            <Link to="/myposting">
              <img src={"/images/myPage/change.png"} alt="" />
              내가 쓴 글
            </Link>
          </li>
          <li>
            <Link to="/UpdateProfile">
              <img src={"/images/myPage/change3.png"} alt="" />
              회원정보 수정
            </Link>
          </li>

          <li>
            <Link to="/board/createquestion">
            <img src={"/images/myPage/question.png"} alt="" />
              1:1 문의하기
            </Link>
          </li>
          <li>
            <Link to="/myquestion">
            <img src={"/images/myPage/answer.png"} alt="" />
              1:1 답변확인
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MyPage;
