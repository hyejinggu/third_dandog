import React from "react";

const CartItemPrice = ({ totalPrice, delivery_price, quantity }) => {
  // totalPrice = totalPrice.toLocaleString();
  return (
    <div>
      <p className="total_product">
        총 주문 상품 <span>{quantity}</span>개
      </p>
      <div className="total_price">
        <p>50,000원 이상 구매시 배송비 무료</p>
        <div className="firstB_price">
          <span className="product_price">
            {totalPrice().toLocaleString()}원
          </span>
          <span className="delivery_price">
            {delivery_price().toLocaleString()}원
          </span>
          <span className="total_price2">
            {(totalPrice() + delivery_price()).toLocaleString()}원
          </span>
        </div>
        <div className="price_info">
          <ul>
            <li className="product_price">주문금액</li>
            <li className="delivery_price">배송비</li>
            <li className="total_price2">결제금액</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartItemPrice;
