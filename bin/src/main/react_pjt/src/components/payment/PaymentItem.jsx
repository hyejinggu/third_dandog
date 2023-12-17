import styles from '../../css/payment/payment.module.css';
import React from "react";

const PaymentItem = ({ totalPrice, selectedItem, quantity }) => {



    return (
        <tr>
            <td>
                <img src={selectedItem.image[1]} alt="이미지" />
                <span className={styles.name}>{selectedItem.name}</span>
            </td>
            <td>
                <span className={styles.quantity}>수량 : {quantity}개</span>
            </td>
            <td>
                <span className={styles.sale_info}>{selectedItem.saleInfo}%</span>
                <span className={styles.normal_pr}>{selectedItem.normalPr.toLocaleString("ko")}원</span>
                <span className={styles.present_pr}>
                    {(
                        selectedItem.normalPr -
                        (selectedItem.normalPr * selectedItem.saleInfo) / 100
                    ).toLocaleString("ko")}원
                </span>
            </td>
            <td className={styles.total}>
                <span>{totalPrice()}원</span>
            </td>
        </tr>
    );
};

export default PaymentItem;