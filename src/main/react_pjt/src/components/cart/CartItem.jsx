import React from "react";

const CartItem = ({
  selectedItem,
  onIncrease,
  onDecrease,
  totalPrice,
  handleDelete,
}) => {
  const loginId = sessionStorage.getItem("loginId");



  const cartRequest = {
    user_id: loginId !== null ? loginId : "nonmember",
    item_no: selectedItem.item_no,
    item_quantity: selectedItem.quantity,
    item_img: selectedItem.item_img,
  };

  const formatter = new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const itemName = selectedItem.item_name;
  console.log("상품 이름:", itemName, selectedItem.item_price);

  return (
    <tbody>
      <tr>
        <td>
          <img src={`/images/subpage/${selectedItem.item_img}`} alt="상품이미지" />
          <span className="text-ellipsis">{selectedItem.item_name}</span>
        </td>

        <td>
          <button onClick={onDecrease}>-</button>
          <span className="total">{selectedItem.item_quantity}</span>
          <button onClick={onIncrease}>+</button>
        </td>
        <td className="price">
          <span className="sale_info">{selectedItem.item_sales_volume}%</span>
          <del>{selectedItem.item_price}원</del>
          <span className="sale_price">
            {(
              selectedItem.item_price -
              (selectedItem.item_price * selectedItem.item_sales_volume) / 100
            ).toLocaleString("ko")}
            원
          </span>
        </td>
        <td className="total">{totalPrice.toLocaleString()}원</td>
        <td>
          <input type="button" onClick={handleDelete} value="X" />
        </td>
      </tr>
    </tbody>
  );
};
export default CartItem;
