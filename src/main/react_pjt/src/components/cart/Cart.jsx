import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import EmptyItem from "./EmptyItem";
import CartItemPrice from "./CartItemPrice";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const loginId = sessionStorage.getItem("loginId");


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


          return { selectedItem };
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
    if (!item || !item.selectedItem) {
      console.error("잘못된 'item' 또는 'selectedItem'");
      return 0;
    }

    const selectedItem = item.selectedItem;

    const originalPrice = selectedItem.item_price || 0;
    const salePrice = originalPrice - originalPrice * (selectedItem.item_sales_volume / 100);

    const quantity = selectedItem.item_quantity == null ? 1 : selectedItem.item_quantity;

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
                  totalPrice={calculateTotalPrice(item)}
                  handleDelete={() => handleDelete(index)}
                />
              ))}

            </table>
            <CartItemPrice
              totalPrice={calculateTotalCartPrice(cartItems)}
              delivery_price={delivery_price} />
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
