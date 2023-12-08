import React, { useState, useEffect } from "react";
import axios from "axios";

const CartItem = ({
  selectedItem,
  onIncrease,
  onDecrease,
  totalPrice,
  handleDelete,
}) => {
  const loginId = sessionStorage.getItem("loginId");
  const [colorSize, setColorSize] = useState({ Color: [], Size: [] });
  const itemName = selectedItem.item_name;

  // 상품 옵션 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const colorSizeResponse = await axios.get(
          `/item/getColorSize?item_name=${itemName}`
        );

        setColorSize({
          Color: colorSizeResponse.data.Color || [],
          Size: colorSizeResponse.data.Size || [],
        });
      } catch (error) {
        console.error("데이터를 가져오는 동안 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <tr>
      <td>
        <input type="checkbox" className="cart_check" />
      </td>
      <td className="first_block">
        <div>
          <img
            src={`/images/subpage/${selectedItem.item_img}`}
            alt="상품이미지"
          />
          <span className="text-ellipsis">{selectedItem.item_name}</span>
        </div>
      </td>
      <td className="cart_item_options">
        <div>
          <span>사이즈</span>
          <span className="cart_opt">
            <select name="sizeOption">
              {colorSize.Size.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </span>
        </div>
        <div>
          <span>색상</span>
          <span className="cart_opt">
            <select name="colorOption" className="cart_opt">
              {colorSize.Color.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </span>
        </div>
      </td>
      <td>
        <button onClick={onDecrease}>-</button>
        <span className="total">{selectedItem.item_quantity}</span>
        <button onClick={onIncrease}>+</button>
      </td>
      <td className="price">
        <span className="sale_info">{selectedItem.item_discount_rate}%</span>
        <del>{selectedItem.item_price}원</del>
        <span className="sale_price">
          {(
            selectedItem.item_price -
            (selectedItem.item_price * selectedItem.item_discount_rate) / 100
          ).toLocaleString("ko")}
          원
        </span>
      </td>
      <td className="total">{totalPrice.toLocaleString()}원</td>
      <td>
        <input type="button" onClick={handleDelete} value="X" />
      </td>
    </tr>
  );
};
export default CartItem;
