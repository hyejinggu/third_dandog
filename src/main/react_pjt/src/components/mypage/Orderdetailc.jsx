import React, { useEffect, useState } from "react";
import styles from "../../css/myPage/OrderInquiry.module.css";
import { Link, useLocation } from "react-router-dom";
import Modal from "../common/Modal";
import axios from "axios";

const Orderdetailc = ({ i, order } ) => {

    // 아이템 데이터 불러오기
    const [itemData, setItemData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/mypage/getitem?item_no=${i.item_no}`);
                setItemData(response.data);
            } catch (error) {
                console.error("데이터를 가져오는 동안 오류 발생:", error);
            }
        };

        fetchData();
    }, []);




    return (
        <tr>
            <td>
                {i.order_detail_no}
            </td>
            <td>
                {i.item_no}
            </td>
            <td>
                {i.item_quantity} 개
            </td>
            <td>
                {(i.item_price).toLocaleString("ko")} 원
            </td>
            <td>
                {i.option_size}
            </td>
            <td>
                {i.option_color}
            </td>
            {order.order_state === '배송완료' && i.review_state === '작성대기' ? (
                <div className={styles.button}>
                    <Link to="/ItemReview" state={{ order: i }}>
                        <input type="button" value="리뷰쓰기" />
                    </Link>
                </div>
            ) : (
                <div>
                </div>
            )}
        </tr>
    );
}

export default Orderdetailc;