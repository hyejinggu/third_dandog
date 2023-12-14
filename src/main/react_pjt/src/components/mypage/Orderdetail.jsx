import React, { useEffect, useState } from "react";
import styles from "../../css/myPage/OrderInquiry.module.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Orderdetailc from "./Orderdetailc";

const Orderdetail = () => {
    const location = useLocation();
    const order = location.state.order;

    // 데이터 불러오기
    const [orderDetailData, setOrderDetailData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/mypage/getorderdetail?order_num=${order.order_num}`);
                setOrderDetailData(response.data);
            } catch (error) {
                console.error("데이터를 가져오는 동안 오류 발생:", error);
            }
        };

        fetchData();
    }, []);



    return (
        <div className={styles.container}>
            <h2 className={styles.title}>주문 상세</h2>

            <form action="" id="order" method="post" className={styles.main}>


                <h2 className={styles.title}>주문 정보</h2>
                <div className={styles.OrderInquiry}>
                    <table border="1px">
                        <tr><th><span>주문번호 :</span></th>
                            <td><span>{order.order_num}</span></td></tr>

                        <tr><th><span>총각격 :</span></th>
                            <td><span>{order.total_price}</span></td></tr>

                        <tr><th><span>주문일 :</span></th>
                            <td><span>{order.regdate}</span></td></tr>

                        <tr><th><span>결제방법 :</span></th>
                            <td><span>{order.payment}</span></td></tr>

                        <tr><th><span>받으시는분 :</span></th>
                            <td><span>{order.recipient_name}</span></td></tr>

                        <tr><th><span>전화번호 :</span></th>
                            <td><span>{order.recipient_phone}</span></td></tr>

                        <tr><th><span>주소 :</span></th>
                            <td><span>{order.user_address1} {order.user_address2} ({order.post_code})</span></td></tr>

                        <tr><th><span>배송상태 :</span></th>
                            <td><span>{order.order_state}</span></td></tr>

                        <tr><th><span>결제상태 :</span></th>
                            <td><span>{order.pay_state}</span></td></tr>

                    </table>
                </div>


                <h2 className={styles.title}>주문 상품</h2>
                <div className={styles.desc}>
                    <table>
                        <tr>
                            <th>주문상세번호</th>
                            <th>상품명</th>
                            <th>상품수량</th>
                            <th>상품가격</th>
                            <th>옵션 사이즈</th>
                            <th>옵션 컬러</th>
                            <th></th>
                        </tr>
                        {orderDetailData.map((item, index) => (
                            <Orderdetailc key={index} item={item} order={order} />
                        ))}
                    </table>
                </div>

            </form>
        </div>
    );
}

export default Orderdetail;