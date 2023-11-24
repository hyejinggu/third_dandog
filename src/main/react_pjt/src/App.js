import "./App.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Main from "./components/common/Main";
import ScrollTop from "./components/common/ScrollTop";

// router
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Join from "./components/join/Join";
import Board from "./components/board/Board";
import ItemList from "./components/item/ItemList";
import ItemDetail from "./components/item/ItemDetail";
import Agree from "./components/join/Agree";
import Details from "./components/join/Details";
import Information from "./components/join/Information";
import Profile from "./components/join/Profile";
import Payment from "./components/payment/Payment";
import Payment2 from "./components/payment/Payment2";
import MyPage from "./components/common/MyPage";

// 커뮤니티 링크 페이지 import
import Community from "./components/community/Community";

// 로그인
import FindId from "./components/login/FindId";
import FindPw from "./components/login/FindPw";

// 게시판
import BoardFaq from "./components/board/BoardFaq";
import BoardQna from "./components/board/BoardQna";

// 장바구니
import EmptyItem from "./components/cart/EmptyItem";
import Cart from "./components/cart/Cart";
import CartItem from "./components/cart/CartItem";

import styles from "./css/common/common.module.css";
function App() {
  return (
    <div className="App" id={styles.wrap}>
      <ScrollTop />
      <Header />
      <Routes>
        {/* header 링크 */}
        <Route path="/*" element={<Main />} />
        <Route path="/main/*" element={<Main />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/join/*" element={<Join />} />
        <Route path="/cart/*" element={<Cart />} />
        <Route path="/board/*" element={<Board />} />
        <Route path="/itemlist/*" element={<ItemList />} />
        <Route path="/itemdetail" element={<ItemDetail />} />

        {/* 커뮤니티 링크 */}
        <Route path="/community/*" element={<Community />} />

        {/* 상세페이지, 장바구니, 결제 */}
        <Route path="/cartitem/*" element={<CartItem />} />
        <Route path="/emptyItem/*" element={<EmptyItem />} />
        <Route path="/myPage/*" element={<MyPage />} />

        {/* 로그인 */}
        <Route path="/findid/*" element={<FindId />} />
        <Route path="/findpw/*" element={<FindPw />} />

        {/* 게시판 */}
        <Route path="/board/boardfaq/" element={<BoardFaq />} />
        <Route path="/board/boardqna/" element={<BoardQna />} />

        <Route path="/agree/*" element={<Agree />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/details/*" element={<Details />} />
        <Route path="/information/*" element={<Information />} />

        <Route path="/itemdetail" element={<ItemDetail />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment2" element={<Payment2 />} />
      </Routes>

      {/* 회원가입 */}
      <Footer />
    </div>
  );
}

export default App;
