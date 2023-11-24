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
    const storedId = localStorage.getItem("id");
    const storedPw = localStorage.getItem("pw");
    if (storedId && storedPw) {
      setLogin("로그아웃");
      setJoin("마이페이지");
    }
  });

  const handleLoginState = () => {
    if (login === "로그아웃") {
      localStorage.removeItem("id");
      localStorage.removeItem("pw");
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
            <Link to={login === "로그아웃" ? "/myPage/*" : "/join/Agree"}>
              <img src={"/images/header/join_img.png"} alt="" />
              {join}
            </Link>
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
          <img src={"/images/header/food_img.png"} alt="" />
          간식&#183;사료
        </li>
        <li>
          <Link to="/itemlist">
            <img src={"/images/header/toy_img.png"} alt="" />
            장난감
          </Link>
        </li>
        <li>
          <img src={"/images/header/living_img.png"} alt="" />
          리빙&#183;패션
        </li>
        <li>
          <img src={"/images/header/stroll_img.png"} alt="" />
          산책&#183;케어
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
