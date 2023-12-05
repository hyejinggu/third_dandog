import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../css/subpage/ItemDetail.module.css";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import EmptyItem from "./EmptyItem";
import CartItemPrice from "./CartItemPrice";
import { useLocation } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const selectedItem = location.state.item;
  const loginId = sessionStorage.getItem("loginId");
  useEffect(() => {
    axios.get(`/restCart/getCartItems/${loginId}`).then((response) => {
      alert(response.data);
    });
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // 실제 서버 엔드포인트로 변경
  //       const response = await axios.get("/cart");
  //       setCartItems(response.data);
  //     } catch (error) {
  //       console.error("데이터를 가져오는 동안 오류 발생:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const handleAddToCart = async () => {
  //   try {
  //     const response = await axios.post("/cart/add", {
  //       user_id: sessionStorage.loginId, // 이 부분이 문제일 수 있음
  //       item_no: selectedItem.item_no, // item_no를 정확히 가져오는지 확인
  //       item_quantity: quantity, // quantity가 정확한지 확인
  //     });

  //     console.log("장바구니에 상품이 추가되었습니다.", response.data);
  //   } catch (error) {
  //     console.error("장바구니에 상품 추가 중 오류 발생:", error);
  //   }
  // };

  const handleDelete = (index, itemName) => {
    const confirmDelete = window.confirm(
      `<${itemName}> 상품을 삭제하시겠습니까?`
    );

    if (confirmDelete) {
      const updatedCart = [...cartItems];
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleIncrease = (index, event) => {
    event.preventDefault();
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrease = (index, event) => {
    event.preventDefault();
    if (cartItems[index].quantity > 0) {
      const updatedCart = [...cartItems];
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      alert("최소 주문수량은 1개 입니다.");
    }
  };

  const calculateTotalPrice = (item) => {
    const originalPr = item.selectedItem.normalPr;
    const salePr = originalPr - originalPr * (item.selectedItem.saleInfo / 100);
    const totalpr = salePr * item.quantity;
    return totalpr;
  };

  const calculateTotalCartPrice = () => {
    let totalCartPrice = 0;

    for (const item of cartItems) {
      const itemTotalPrice = calculateTotalPrice(item);
      totalCartPrice += itemTotalPrice;
    }

    return totalCartPrice;
  };

  const delivery_price = () => {
    return calculateTotalCartPrice() >= 30000 ? 0 : 3000;
  };

  return (
    <>
      <h2 className="title"> 장바구니</h2>
      <div className="cart">
        {/* {cartItems.length === 0 ? (
          <EmptyItem />
        ) : ( */}
        <form action="#" method="post">
          {" "}
          <table>
            <thead>
              <tr>
                <th>상품/옵션 정보</th>
                <th>수량</th>
                <th>상품금액</th>
                <th>합계금액</th>
                <th></th>
              </tr>
            </thead>

            {cartItems.map((item) => (
              <CartItem
                key={item.cart_id}
                selectedItem={item.selectedItem}
                quantity={item.item_quantity}
                onIncrease={(event) => handleIncrease(item.cart_id, event)}
                onDecrease={(event) => handleDecrease(item.cart_id, event)}
                totalPrice={() => calculateTotalPrice(item)}
                handleDelete={() =>
                  handleDelete(item.cart_id, item.selectedItem.item_name)
                }
              />
            ))}
          </table>
          <CartItemPrice
            totalPrice={calculateTotalCartPrice}
            delivery_price={delivery_price}
          />
          <Link to="/payment">
            <input type="button" value="구매하기" className="order" />
          </Link>
        </form>
      </div>
      {/* )} */}
    </>
  );
};

export default Cart;
