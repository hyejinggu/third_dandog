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
  const loginId = sessionStorage.getItem("loginId");
  const location = useLocation();
  const [mainImage, setMainImage] = useState("");
  const [cartItemInfo, setCartItemInfo] = useState(null);

  // useEffect(() => {
  //   const fetchCartItemInfo = async () => {
  //     try {
  //       const response = await axios.get(`/restCart/getCartItems?user_id=${loginId}`);
  //       setCartItemInfo(response.data);
  //     } catch (error) {
  //       console.error("Error fetching cart item info:", error);
  //     }
  //   };

  //   if (loginId) {
  //     fetchCartItemInfo();
  //   }
  // }, [loginId]);

  // useEffect(() => {
  //   axios.get(`/restCart/getCartItems/${loginId}`).then((response) => {
  //     setCartItemInfo(response.data);
  //   });
  // }, []);

  const cartRequest = {
    user_id: loginId !== null ? loginId : "",
    item_no: selectedItem.item_no,
    item_quantity: quantity,
  };

  const formatter = new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return (
    <tbody>
      {cartItemInfo &&
        cartItemInfo.map((i, index) => {
          const calculateTotalPrice = () => {
            const presentPr =
              i.item_price - (i.item_price * i.item_discount_rate) / 100;
            const totalPr = presentPr * i.quantity;
            const totalWithDelivery =
              totalPr >= 50000 ? totalPr : totalPr + 2500;
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
                <span className="sale_info">{i.item_discount_rate}%</span>
                <del>{i.item_price.toLocaleString("ko")}원</del>
                <span className="sale_price">
                  {(
                    i.item_price -
                    (i.item_price * i.item_discount_rate) / 100
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
