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
  const [cartItemInfo, setCartItemInfo] = useState([]);


  useEffect(() => {
    axios
      .get(`/restCart/getCartItems/${loginId}`)
      .then((response) => {
        const items = response.data.map((cartDTO) => {
          const selectedItem = {
            user_id: loginId,
            item_no: cartDTO.item_no,
            item_quantity: cartDTO.item_quantity,
            item_img: cartDTO.item_img1,
            item_name: cartDTO.item_name,
            item_price: cartDTO.item_price,
            item_sales_volume: cartDTO.item_sales_volume
          };


          return { selectedItem }; // 수정된 부분: selectedItem를 반환 객체에 포함
        });

        setCartItems(items);
      })
      .catch((error) => {
        console.error("API 요청 중 오류 발생:", error);
      });
  }, []);



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

  const handleIncrease = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].item_quantity += 1;
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
    // 'item'이 정의되었고 'item.selectedItem' 속성이 있는지 확인합니다.
    if (!item || !item.selectedItem) {
      console.error("잘못된 'item' 또는 'selectedItem'");
      return 0; // 또는 기본값을 반환합니다.
    }

    const selectedItem = item.selectedItem;

    // 'selectedItem'에 필요한 속성이 있는지 확인합니다.
    const originalPrice = selectedItem.item_price || 0;
    const salePrice = originalPrice - originalPrice * (selectedItem.item_sales_volume / 100);

    // 'selectedItem'에 'item_quantity' 속성이 있는지 확인합니다.
    const quantity = selectedItem.item_quantity == null ? 1 : selectedItem.item_quantity;

    const totalPrice = salePrice * quantity;

    return totalPrice;
  };

  const calculateTotalCartPrice = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
      // console.error("잘못된 'items' 또는 빈 배열");
      return 0;
    }

    let totalCartPrice = 0;

    for (const cartItem of items) {
      if (!cartItem.selectedItem) {
        console.error("잘못된 'cartItem' 또는 'selectedItem'");
        continue;
      }

      const itemTotalPrice = calculateTotalPrice(cartItem);
      totalCartPrice += itemTotalPrice;
    }

    // 배송비가 50,000원 이상인 경우 0으로 설정합니다.
    const deliveryPrice = totalCartPrice >= 50000 ? 0 : 3000;

    return totalCartPrice + deliveryPrice;
  };

  const delivery_price = calculateTotalCartPrice(cartItems) >= 50000 ? 0 : 3000;
  console.log(calculateTotalCartPrice(cartItems));

  return (
    <>
      <h2 className="title"> 장바구니</h2>
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
                  <th></th>
                </tr>
              </thead>

              {cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  selectedItem={item.selectedItem}
                  quantity={item.item_quantity}
                  onIncrease={(event) => handleIncrease(index, event)}
                  onDecrease={(event) => handleDecrease(index, event)}
                  totalPrice={calculateTotalPrice(item)}  // 변경된 부분
                  handleDelete={() => handleDelete(index)}
                />
              ))}

            </table>
            <CartItemPrice
              totalPrice={calculateTotalCartPrice(cartItems)}
              delivery_price={delivery_price}   // 함수 호출로 변경
            />
            <Link to="/payment">
              <input type="button" value="구매하기" className="order" />
            </Link>
          </form>
        )}
      </div>
    </>
  );
};

export default Cart;
