import CartItem from "./CartItem";
import CartItemPrice from "./CartItemPrice";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import EmptyItem from "./EmptyItem";
import "../../css/cart/cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleDelete = (index, itemName) => {
    const confirmDelete = window.confirm(
      `<${itemName}> 상품을 삭제하시겠습니까?`
    );

    if (confirmDelete) {
      const updatedCart = [...cartItems];
      updatedCart.splice(index, 1); // 해당 인덱스의 아이템 삭제
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // 로컬 스토리지 업데이트
    }
  };

  // 수량 관리
  const handleIncrease = (index, event) => {
    event.preventDefault();
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // 로컬 스토리지 업데이트
  };

  // 수량이 0 미만으로 갈때

  const handleDecrease = (index, event) => {
    event.preventDefault();
    if (cartItems[index].quantity > 0) {
      const updatedCart = [...cartItems];
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // 로컬 스토리지 업데이트
    } else {
      alert("최소 주문수량은 1개 입니다.");
    }
  };

  // 수량에 맞춰 가격 계산
  const calculateTotalPrice = (item) => {
    const originalPr = item.selectedItem.normalPr;
    const salePr = originalPr - originalPr * (item.selectedItem.saleInfo / 100);
    const totalpr = salePr * item.quantity;
    return totalpr;
  };

  // 장바구니 가격 총합
  const calculateTotalCartPrice = () => {
    let totalCartPrice = 0;

    for (const item of cartItems) {
      const itemTotalPrice = calculateTotalPrice(item);
      totalCartPrice += itemTotalPrice;
    }

    return totalCartPrice;
  };

  const delivery_price = () => {
    // const totalpr = salePr * quantity
    return calculateTotalCartPrice() >= 50000 ? 0 : 3000;
  };

  return (
    <>
      <h2 className="title">장바구니</h2>
      <div className="cart">
        {cartItems.length === 0 ? (
          <EmptyItem />
        ) : (
          <form action="#" method="post">
            <table>
              <thead>
                <tr>
                  <th>상품/옵션 정보</th>
                  <th>수량</th>
                  <th>상품금액</th>
                  <th>합계금액</th>
                  <th> </th>
                </tr>
              </thead>

              {cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  selectedItem={item.selectedItem}
                  quantity={item.quantity}
                  onIncrease={(event) => handleIncrease(index, event)}
                  onDecrease={(event) => handleDecrease(index, event)}
                  totalPrice={() => calculateTotalPrice(item)}
                  handleDelete={() =>
                    handleDelete(index, item.selectedItem.name)
                  } // 삭제 핸들러 전달
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
        )}
      </div>
    </>
  );
}
