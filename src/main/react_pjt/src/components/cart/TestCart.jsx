
import CartItem from "./CartItem";
import CartItemPrice from "./CartItemPrice";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../css/cart/cart.css";

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // const location = useLocation();
  // const selectedItem = location.state.selectedItem;

  // const [quantity, setQuantity] = useState(1);

  const handleDelete = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1); // 해당 인덱스의 아이템 삭제
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // 로컬 스토리지 업데이트
  };

  // 수량 관리
  const handleIncrease = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // 로컬 스토리지 업데이트
  };


  // 수량이 0 미만으로 갈때

  const handleDecrease = (index) => {
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
}

  return (
    <>
      <h2 className="title">장바구니</h2>
      <div className="cart">
        <form action="#" method="post">
          <table>

            <thead>
              <tr>
                <th>상품/옵션 정보</th>
                <th>수량</th>
                <th>상품금액</th>
                <th>합계금액</th>
                {/* <th>
                  <input type="button" value="삭제 "/>
                </th> */}
              </tr>
            </thead>
            <tbody>
              
              {cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  selectedItem={item.selectedItem}
                  quantity={item.quantity}
                  onIncrease={() => handleIncrease(index)}
                  onDecrease={() => handleDecrease(index)}
                  totalPrice={() => calculateTotalPrice(item)}
                  handleDelete={() => handleDelete(index)} // 삭제 핸들러 전달
                />
              ))}
            </tbody>
          </table>

          <CartItemPrice
            totalPrice={calculateTotalCartPrice}
            delivery_price={delivery_price}
          />

          <Link to="/payment" state={{
            // selectedItem: selectedItem,
            // quantity: quantity, // item 객체를 그대로 전달합니다.
          }}><input type="button" value="구매하기" className="order" /></Link>

        </form>
      </div>
    </>
  );
}
