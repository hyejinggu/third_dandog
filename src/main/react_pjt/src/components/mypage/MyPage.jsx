import "../../css/myPage/myPage.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";



const MyPage = () => {
  // member data 가져오기
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/payment/getuserinfo?user_id=${sessionStorage.loginId}`);
        setuserData(response.data[0]);
      } catch (error) {
        console.error("유저데이터를 가져오는 동안 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  // 주문 데이터 불러오기
  const [orderInquiryData , setOrderInquiryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/mypage/getorderinquiry?user_id=${sessionStorage.loginId}`);
        setOrderInquiryData(response.data);
      } catch (error) {
        console.error("유저데이터를 가져오는 동안 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  // 배송중인 상품 개수 계산
  const inDeliveryCount = orderInquiryData.filter(order => order.order_state === '배송중').length;

  // 배송완료된 상품 개수 계산
  const deliveredCount = orderInquiryData.filter(order => order.order_state === '배송완료').length;
  
  // 입금대기 상품 개수 계산
  const payCount = orderInquiryData.filter(order => order.pay_state === '입금대기').length;


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
            <div className="num">{userData.point?.toLocaleString("ko")} point</div>
          </li>
          <li>
            <img src={"/images/myPage/change.png"} alt="" />
            <p>주문 현황</p>
            <div className="num">{orderInquiryData.length}</div>
          </li>
          <li>
            <img src={"/images/myPage/review.svg"} alt="" />

            <p>후기작성</p>
            <div className="num">{deliveredCount}</div>
          </li>
        </ul>
      </div>
      <div className="mypageContainer">
        <h2>주문/배송조회</h2>
        <ul>
          <li>
            <div className="num">{payCount}</div>
            <p>입금/결제 대기</p>
          </li>
          <li>
            <div className="num">{inDeliveryCount}</div>
            <p>배송중</p>
          </li>
          <li>
            <div className="num">{deliveredCount}</div>
            <p>배송완료</p>
          </li>
          <li>
            <div className="point">{deliveredCount}</div>
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
            <Link to="/OrderInquiry">
            <img src={"/images/myPage/delete.png"} alt="" />
            주문조회
            </Link>
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
