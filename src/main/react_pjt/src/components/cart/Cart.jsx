import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import EmptyItem from "./EmptyItem";
import CartItemPrice from "./CartItemPrice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const loginId = sessionStorage.getItem("loginId");

  // 장바구니 정보 가져오기
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
            item_discount_rate: cartDTO.item_discount_rate,
          };

          return { selectedItem };
        });

        setCartItems(items);
      })
      .catch((error) => {
        console.error("API 요청 중 오류 발생:", error);
      });
  }, [loginId]);

  // 상품 삭제
  const handleDelete = (index) => {
    const selectedItem = cartItems[index].selectedItem;
    const confirmDelete = window.confirm(
      `<${selectedItem.item_name}> 상품을 삭제하시겠습니까?`
    );

    if (confirmDelete) {
      // 서버에서 해당 상품 삭제 요청
      axios
        .delete(`/restCart/deleteCartItem/${loginId}/${selectedItem.item_no}`)
        .then((response) => {
          console.log("Deleted item:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      const updatedCart = [...cartItems];
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // 수량 증가
  const handleIncrease = (index, event) => {
    event.preventDefault();

    const updatedCart = [...cartItems];
    updatedCart[index].selectedItem.item_quantity += 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // 서버에 수량 업데이트 요청
    const selectedItem = updatedCart[index].selectedItem;
    const updatedQuantity = selectedItem.item_quantity;

    axios
      .post(
        `/restCart/onIncrease/${selectedItem.user_id}/${selectedItem.item_no}/${updatedQuantity}`
      )
      .then((response) => {
        console.log("Updated item:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // 수량 감소
  const handleDecrease = (index, event) => {
    event.preventDefault();

    const updatedCart = [...cartItems];
    const selectedItem = updatedCart[index].selectedItem;

    if (selectedItem.item_quantity > 1) {
      selectedItem.item_quantity -= 1;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // 서버에 수량 업데이트 요청
      const updatedQuantity = selectedItem.item_quantity;
      axios
        .post(
          `/restCart/onDecrease/${selectedItem.user_id}/${selectedItem.item_no}/${updatedQuantity}`
        )
        .then((response) => {
          console.log("Updated item:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("최소 주문수량은 1개 입니다.");
    }
  };

  // 가격 계산
  const calculateTotalPrice = (item) => {
    if (!item || !item.selectedItem) {
      console.error("잘못된 'item' 또는 'selectedItem'");
      return 0;
    }

    const selectedItem = item.selectedItem;

    const originalPrice = selectedItem.item_price || 0;
    const salePrice =
      originalPrice - originalPrice * (selectedItem.item_discount_rate / 100);

    const quantity =
      selectedItem.item_quantity == null ? 1 : selectedItem.item_quantity;

    const totalPrice = salePrice * quantity;

    return totalPrice;
  };

  const calculateTotalCartPrice = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
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

    const deliveryPrice = totalCartPrice >= 50000 ? 0 : 3000;

    return totalCartPrice + deliveryPrice;
  };

  const delivery_price = calculateTotalCartPrice(cartItems) >= 50000 ? 0 : 3000;

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
                  <th>선택</th>
                  <th>상품 정보</th>
                  <th>옵션 정보</th>
                  <th>수량</th>
                  <th>상품금액</th>
                  <th>합계금액</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <CartItem
                    key={index}
                    selectedItem={item.selectedItem}
                    quantity={item.item_quantity}
                    onIncrease={(event) => handleIncrease(index, event)}
                    onDecrease={(event) => handleDecrease(index, event)}
                    totalPrice={calculateTotalPrice(item)}
                    handleDelete={() => handleDelete(index)}
                  />
                ))}
              </tbody>
            </table>
            <CartItemPrice
              totalPrice={calculateTotalCartPrice(cartItems)}
              delivery_price={delivery_price}
              quantity={cartItems.length}
            />
            <Link
              to="/payment"
              state={{
                selectedItem: cartItems,
              }}
            >
              <input
                type="button"
                value="선택상품 구매하기"
                className="order"
              />
            </Link>
          </form>
        )}
      </div>
    </>
  );
};

export default Cart;
