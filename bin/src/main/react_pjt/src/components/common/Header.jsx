import styles from "../../css/common/common.module.css";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const navigate = useNavigate();
  const [searchAllValue, setSearchAllValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [login, setLogin] = useState("로그인");
  const [join, setJoin] = useState("회원가입");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/searchall/${encodeURIComponent(searchAllValue)}`);
    setSearchAllValue("");
  };

  useEffect(() => {
    const loginId = sessionStorage.getItem("loginId");
    if (loginId != null) {
      setLogin("로그아웃");
      if (loginId == "manager") {
        setJoin("관리자 페이지");
      } else {
        setJoin("마이페이지");
      }
    }
  });

  useEffect(() => {
    if (sessionStorage.getItem("loginId") == null) {
      setLogin("로그인");
      setJoin("회원가입");
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

  const handleCartLinkClick = () => {
    if (login === "로그인") {
      alert("로그인이 필요합니다.");
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
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="검색어를 입력해주세요."
            value={searchAllValue}
            onChange={(e) => setSearchAllValue(e.target.value)}
          />
        </form>

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
            <Link
              to={login === "로그인" ? "/login" : "/cart"}
              onClick={handleCartLinkClick}
            >
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
