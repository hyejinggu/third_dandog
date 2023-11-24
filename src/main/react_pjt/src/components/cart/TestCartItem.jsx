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
    <tr>
      <td>
        <img src={selectedItem.image[1]} alt="이미지" />
        <span className="text-ellipsis">{selectedItem.name}</span>
      </td>
      <td>
        <button onClick={onDecrease}>-</button>
        <span className="total">{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </td>
      <td className="price">
        <span className="sale_info">{selectedItem.saleInfo}%</span>
        <del>{selectedItem.normalPr.toLocaleString("ko")}원</del>
        <span className="sale_price">
          {(
            selectedItem.normalPr -
            (selectedItem.normalPr * selectedItem.saleInfo) / 100
          ).toLocaleString("ko")}
          원
        </span>
      </td>
      <td className="total">{totalPrice().toLocaleString()}원</td>
      {/* <td>
                <button onClick={handleDelete}>삭제</button>
            </td> */}
      {/* <td>
                <input type="button" value='X' />
            </td> */}
    </tr>
  );
};

export default CartItem;
