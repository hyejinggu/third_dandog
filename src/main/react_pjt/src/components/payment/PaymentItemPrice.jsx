import React from "react";
import styles from "../../css/payment/paymentItemPrice.module.css";

const CartItemPrice = ({ totalPrice, delivery_price, quantity }) => {
  return (
    <div>
      <p className={styles.total_product}>총 주문 상품</p>
      <div className={styles.total_price}>
        <p>50,000원 이상 구매시 배송비 무료</p>
        <div className={styles.firstB_price}>
          <span className={styles.product_price}>
            {totalPrice().toLocaleString()}원
          </span>
          <span className={styles.delivery_price}>
            {delivery_price().toLocaleString()}원
          </span>
          <span className={styles.total_price2}>
            {(totalPrice() + delivery_price()).toLocaleString()}원
          </span>
        </div>
        <div className={styles.price_info}>
          <ul>
            <li className={styles.product_price}>주문금액</li>
            <li className={styles.delivery_price}>배송비</li>
            <li className={styles.total_price2}>결제금액</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartItemPrice;
