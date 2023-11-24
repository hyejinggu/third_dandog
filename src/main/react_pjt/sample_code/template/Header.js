// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";
import { useState } from "react";
import '../common/css/header.css';
import '../common/css/common.css';

function Header() {

    // const [openedDrawer, setOpenedDrawer] = useState(false)

    // function toggleDrawer() {
    //   setOpenedDrawer(!openedDrawer);
    // }

    // function changeNav(event) {
    //   if (openedDrawer) {
    //     setOpenedDrawer(false)
    //   }
    // }

    return (
        <div className="menu_list">
            <a href="./index.html">
                <img src={'/header/logo.png'} alt="로고" className="logo" />
            </a>
            <input type="search" name="search" id="search" placeholder="검색어를 입력해주세요." />

            <ul>
                <li>
                    <a href="./pjt/login/html/login.html">
                        <img src={'/header/login_img.png'} alt="" /> 로그인</a>
                </li>
                <li>
                    <a href="./pjt/join/html/profile.html"><img src={'/header/join_img.png'}
                        alt="" />
                        회원가입</a>
                </li>
                <li>
                    <a href="./pjt/cart/html/cart.html"><img src={'/header/cart_img.png'}
                        alt="" />
                        장바구니</a>
                </li>
                <li>
                    <a href="./pjt/board/html/board.html"><img
                        src={'/header/customer_service_img.png'} alt="" />
                        고객센터</a>
                </li>
            </ul>
        </div>
    );
}

export default Header;
