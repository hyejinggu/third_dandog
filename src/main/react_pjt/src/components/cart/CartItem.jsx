import React from "react";

const CartItem = ({
  onIncrease,
  onDecrease,
  totalPrice,
  selectedItem,
  quantity,
  handleDelete,
}) => {
  return (
    <tbody>
      <tr>
        <td>
          {/* <img src={ } alt="이미지" /> */}
          <span className="text-ellipsis">{selectedItem.name}</span>
        </td>
        <td>
          <button onClick={onDecrease}>-</button>
          <span className="total">{quantity}</span>
          <button onClick={onIncrease}>+</button>
        </td>
        <td className="price">
          <span className="sale_info">{selectedItem.saleInfo}%</span>
          {/* <del>{selectedItem.normalPr.toLocaleString("ko")}원</del> */}
          <span className="sale_price">
            {/* {(
              selectedItem.normalPr -
              (selectedItem.normalPr * selectedItem.saleInfo) / 100
            ).toLocaleString("ko")}
            원 */}
          </span>
        </td>
        {/* <td className="total">{totalPrice().toLocaleString()}원</td> */}
        <td>
          <input type="button" onClick={handleDelete} value="X" />
        </td>
      </tr>
    </tbody>
  );
};

export default CartItem;
