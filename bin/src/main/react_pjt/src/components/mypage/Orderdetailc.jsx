import React, { useEffect, useState } from "react";
import styles from "../../css/myPage/OrderInquiry.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Orderdetailc = ({ item, order }) => {
    const [itemData, setItemData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/mypage/getitem?item_no=${item.item_no}`);
                setItemData(response.data);
                // 여기서 response.data를 사용해 아이템 데이터를 처리할 수 있음
            } catch (error) {
                console.error("데이터를 가져오는 동안 오류 발생:", error);
            }
        };

        fetchData();
    }, [item.item_no]); // item.item_no이 변경될 때마다 fetchData 호출

    return (
        <tr>
            <td>{item.order_detail_no}</td>
            <td>{itemData.item_name}</td>
            <td>{item.item_quantity} 개</td>
            <td>{item.item_price.toLocaleString("ko")} 원</td>
            <td>{item.option_size}</td>
            <td>{item.option_color}</td>
            {order.order_state === '배송완료' && item.review_state === '작성대기' ? (
                <div className={styles.button}>
                    <Link to="/ItemReview" state={{
                        order: item,
                        item_name:itemData.item_name,
                    }}>
                        <input type="button" value="리뷰쓰기" />
                    </Link>
                </div>
            ) : (
                <div></div>
            )}
        </tr>
    );
};

export default Orderdetailc;
