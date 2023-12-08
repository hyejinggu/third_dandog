import React from "react";

const CartItem = ({
  selectedItem,
  onIncrease,
  onDecrease,
  totalPrice,
  handleDelete,
}) => {
  const loginId = sessionStorage.getItem("loginId");

  const itemName = selectedItem.item_name;
  console.log("상품 이름:", itemName, selectedItem.item_discount_rate);

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
      <td>
        <span>사이즈</span>
        <select>
          <option value="">S</option>
        </select>
        <span>색상</span>
        <select>
          <option value="">S</option>
        </select>
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
