import "../../css/myPage/myPage.css";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Pagination from "../item/Pagination";
import axios from "axios";
import styles from "../../css/myPage/OrderInquiry.module.css";

const OrderInquiry = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");

    const [orderInquiryData, setOrderInquiryData] = useState([]);

    // 데이터 불러오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/mypage/getorderinquiry?user_id=${sessionStorage.loginId}`);
                setOrderInquiryData(response.data);
            } catch (error) {
                console.error("유저데이터를 가져오는 동안 오류 발생:", error);
            }
        };

        fetchData();
    }, []);

    // 배송상태 변경 (구매확정 버튼)
    const handleOrderStateChange = (seletedOrder) => {
        axios
            .post(`/mypage/OrderStateChange`, {
                order_num: seletedOrder.order_num,
                order_state: '배송완료',
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                // 서버 응답 성공 시
                alert(`구매확정이 완료되었습니다.`);
                window.location.reload();
            })
            .catch((error) => {
                // 서버 응답 에러 시
                console.error("에러 발생:", error);
            })
    };

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 페이지당 표시할 아이템 수

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = orderInquiryData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(orderInquiryData.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>주문조회</h2>
            <div className={styles.main}>
                <div>
                    <table>
                        <tr>
                            <th>주문번호</th>
                            <th>가격</th>
                            <th>주문일</th>
                            <th>결제방법</th>
                            <th>받는분</th>
                            <th>전화번호</th>
                            <th>주소</th>
                            <th>배송상태</th>
                            <th>결제상태</th>
                            <th>상세보기</th>
                            <th></th>
                        </tr>
                        {displayedItems.map((i, index) => (
                            <tr key={index}>
                                <td>
                                    {i.order_num}
                                </td>
                                <td>
                                    {i.total_price}
                                </td>
                                <td>
                                    {i.regdate}
                                </td>
                                <td>
                                    {i.payment}
                                </td>
                                <td>
                                    {i.recipient_name}
                                </td>
                                <td>
                                    {i.recipient_phone}
                                </td>
                                <td>
                                    <p>{i.user_address1} {i.user_address2} ({i.post_code})</p>
                                </td>
                                <td>
                                    {i.order_state}
                                </td>
                                <td>
                                    {i.pay_state}
                                </td>
                                <td>
                                    <Link to="/Orderdetail" state={{ order: i }}>
                                        <input type="button" value="상세보기" />
                                    </Link>
                                </td>
                                {i.order_state !== '배송완료' ? (
                                    <td>
                                        <input type="button" value="구매확정" onClick={() => handleOrderStateChange(i)} />
                                    </td>
                                ) : (
                                    <td>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default OrderInquiry; 