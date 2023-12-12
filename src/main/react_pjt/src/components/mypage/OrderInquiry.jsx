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

    const [itemSort, setItemSort] = useState("");

    const handleSort = (e) => {
        switch (e.target.innerText) {
            case "인기순":
                setItemSort("popular");
                break;
            case "높은가격순":
                setItemSort("high");
                break;
            case "낮은가격순":
                setItemSort("low");
                break;
            case "신상품순":
                setItemSort("new");
                break;
            default:
                setItemSort("new");
                break;
        }
    };

    const [itemList, setItemList] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleInputValue = () => {
        handleItemList(
            `/item/getItemList?category=${category}&sort=${itemSort}&inputValue=${inputValue}`
        );
    };

    const handleItemList = (requestURL) => {
        axios
            .get(`${requestURL}`)
            .then((res) => {
                setItemList(res.data);
                setItemList((prevItemList) => {
                    const uniqueItemNames = [];
                    const itemNamesSet = new Set();

                    prevItemList.forEach((item) => {
                        if (!itemNamesSet.has(item.item_name)) {
                            itemNamesSet.add(item.item_name);
                            uniqueItemNames.push(item);
                        }
                    });
                    return uniqueItemNames;
                });
            })
            .catch((res) => console.log(res));
    };

    // const [array, dispatch] = useReducer(arrayReducer, itemList);

    // // 페이지 이동(onClick)에 따라 보여지는 배열 바꿔주기
    // const [page, setPage] = useState(1);
    // const itemsPerPage = 20;
    // const startIndex = (page - 1) * itemsPerPage;
    // const displayedItemInfo = array.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className = {styles.container}>
            <h2 className={styles.title}>주문조회</h2>
            <div className={styles.sort}>
                <ul>
                    <li onClick={(e) => handleSort(e)}>주문일순</li>
                    <li onClick={(e) => handleSort(e)}>높은가격순</li>
                    <li onClick={(e) => handleSort(e)}>낮은가격순</li>
                    <li onClick={(e) => handleSort(e)}>배송상태순</li>
                </ul>
                <div className={styles.search_bar}>
                    <div>
                        <input
                            type="text"
                            placeholder="검색"
                            // value={inputValue}
                            // onChange={(e) => setInputValue(e.target.value)}
                            // onKeyDown={(e) => {
                            //     if (e.keyCode === 13) {
                            //         handleInputValue();
                            //     }
                            // }}
                        />
                    </div>
                    <span onClick={handleInputValue}>🔍</span>
                </div>
            </div>
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
                        </tr>
                        {orderInquiryData.map((i, index) => (
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
                                    <input type="button" value="상세보기" />
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
            <Pagination setPage={""} />
        </div>
    )
}

export default OrderInquiry; 