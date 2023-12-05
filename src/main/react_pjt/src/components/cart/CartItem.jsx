// CartItem.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CartItem = ({
  selectedItem,
  onIncrease,
  onDecrease,
  totalPrice,
  quantity,
  handleDelete,
}) => {
  const loginId = sessionStorage.getItem('loginId');
  const location = useLocation();
  const [mainImage, setMainImage] = useState("");
  const [cartItemInfo, setCartItemInfo] = useState(null);

  useEffect(() => {
    const fetchCartItemInfo = async () => {
      console.log(loginId);
      try {
        const response = await
          axios.get(`/cart?user_id=${loginId}`);
        setCartItemInfo(response.data);
      } catch (error) {
        console.error("Error fetching cart item info:", error);
      }
    };

    if (loginId) {
      fetchCartItemInfo();
    }
  }, [loginId]);

  const cartRequest = {
    user_id: loginId !== null ? loginId : '',
    item_no: selectedItem.item_no,
    item_quantity: quantity,
  };

  // const addToCart = async () => {
  //   const user_id = sessionStorage.loginId;
  //   const item_no = selectedItem.item_no;  // Use actual item number
  //   const item_quantity = quantity;  // Use actual quantity

  //   try {
  //     const response = await axios.post('/cart/add', {
  //       user_id,
  //       item_no,
  //       item_quantity,
  //     });

  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error adding item to cart:', error);
  //   }
  // };

  // // 함수 호출을 useEffect로 이동
  // useEffect(() => {
  //   addToCart();
  // }, []);

  const formatter = new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return (
    <tbody>

      {selectedItem.quantity === null && [selectedItem].map((i, index) => {
        const calculateTotalPrice = () => {
          const presentPr =
            i.item_price - (i.item_price * i.item_discount_rate) / 100;
          const totalPr = presentPr * i.quantity;
          const totalWithDelivery = totalPr >= 50000 ? totalPr : totalPr + 2500;
          return formatter.format(totalWithDelivery);
        };
        return (
          <tr key={index}>
            <td>
              <img src={`/images/subpage/${mainImage}`} alt="상품이미지" />
              <span className="text-ellipsis">{i.item_name}</span>
            </td>
            <td>
              <button onClick={onDecrease}>-</button>
              <span className="total">{quantity}</span>
              <button onClick={onIncrease}>+</button>
            </td>
            <td className="price">
              <span className="sale_info">{selectedItem.item_discount_rate}%</span>
              <del>{selectedItem.item_price.toLocaleString("ko")}원</del>
              <span className="sale_price">
                {(
                  selectedItem.item_price -
                  (selectedItem.item_price * selectedItem.item_discount_rate) /
                  100
                ).toLocaleString("ko")}
                원
              </span>
            </td>
            <td className="total">{totalPrice().toLocaleString()}원</td>
            <td>
              <input type="button" onClick={handleDelete} value="X" />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default CartItem;
