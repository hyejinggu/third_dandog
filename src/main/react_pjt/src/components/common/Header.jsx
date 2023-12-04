import styles from "../../css/common/common.module.css";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";

const Header = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [login, setLogin] = useState("로그인");
  const [join, setJoin] = useState("회원가입");

  useEffect(() => {
    if (sessionStorage.getItem("loginId") != null) {
      setLogin("로그아웃");
      if (sessionStorage.getItem("loginId") == "manager") {
        setJoin("관리자 페이지");
      } else {
        setJoin("마이페이지");
      }
    }
  });

  const handleLoginState = () => {
    if (login === "로그아웃") {
      sessionStorage.removeItem("loginId");
      setLogin("로그인");
      setJoin("회원가입");
      setIsModalOpen(true);
    }
  };

  return (
    <header>
      <div>
        {isModalOpen && (
          <Modal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modalContent={"로그아웃 되었습니다."}
          />
        )}
      </div>
      <div className={styles.menu_list}>
        <Link to="/main">
          <img
            src={"/images/header/logo.png"}
            alt="로고"
            className={styles.logo}
          />
        </Link>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="검색어를 입력해주세요."
        />

        <ul>
          <li onClick={handleLoginState}>
            <Link to={login === "로그아웃" ? "/main" : "/login"}>
              <img src={"/images/header/login_img.png"} alt="" /> {login}
            </Link>
          </li>
          <li>
            {join === "관리자 페이지" ? (
              <a href="http://localhost:8080">
                <img src={"/images/header/join_img.png"} alt="" />
                {join}
              </a>
            ) : (
              <Link to={login === "로그아웃" ? "/myPage/*" : "/join/Agree"}>
                <img src={"/images/header/join_img.png"} alt="" />
                {join}
              </Link>
            )}
          </li>
          <li>
            <Link to="/cart">
              <img src="/images/header/cart_img.png" alt="" />
              장바구니
            </Link>
          </li>
          <li>
            <Link to="/board">
              <img src={"/images/header/customer_service_img.png"} alt="" />
              고객센터
            </Link>
          </li>
        </ul>
      </div>
      <ul className={styles.gnb_list}>
        <li>
          <Link to="/itemlist?category=snack">
            <span>
              <img src={"/images/header/food_img.png"} alt="" />
              간식&#183;사료
            </span>
          </Link>
        </li>
        <li>
          <Link to="/itemlist?category=toy">
            <img src={"/images/header/toy_img.png"} alt="" />
            장난감
          </Link>
        </li>
        <li>
          <Link to="/itemlist?category=living">
            <img src={"/images/header/living_img.png"} alt="" />
            리빙&#183;패션
          </Link>
        </li>
        <li>
          <Link to="/itemlist?category=stroll">
            <img src={"/images/header/stroll_img.png"} alt="" />
            산책&#183;케어
          </Link>
        </li>
        <li>
          <Link to="/community">
            <img src={"/images/header/community_img.png"} alt="" />
            커뮤니티
          </Link>
        </li>
      </ul>
    </header>
  );
};
export default Header;

// {'/header/cart_img.png'}
