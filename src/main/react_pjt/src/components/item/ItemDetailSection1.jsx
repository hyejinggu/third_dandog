import styles from "../../css/subpage/ItemDetail.module.css";
import { Link as RouterLink } from "react-router-dom"; // 별칭 사용
import { Link as ScrollLink } from 'react-scroll'; // 별칭 사용
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const ItemDetailSection1 = () => {
    const location = useLocation();
    const selectedItem = location.state.item;
    const [infoImageData, setInfoImageData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/itemdetail/getInfoImageData");
                setInfoImageData(response.data);
            } catch (error) {
                console.error("데이터를 가져오는 동안 오류 발생:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <section id="section1" className={styles.section1}>
            <nav className={styles.nav}>
                <ScrollLink
                    to="section1"
                    offset={0}
                >
                    상품상세정보
                </ScrollLink>
                <ScrollLink
                    to="section2"
                    offset={0}
                >
                    상품구매안내
                </ScrollLink>
                <ScrollLink
                    to="section3"
                    offset={0}
                >
                    상품사용후기
                </ScrollLink>
                <ScrollLink
                    to="section4"
                    offset={0}
                >
                    상품Q&A
                </ScrollLink>
            </nav>
            <div>
                <img src="/images/subpage/order.jpg" alt="주문마감시간" />

                {infoImageData.map((i, index) => (
                    selectedItem.item_no === i.item_no && (
                        <img
                            key={index}
                            src={`/images/subpage/${i.item_img}`}
                            alt={`이미지 ${index}`}
                        />
                        )
                    ))}

                <img src="/images/subpage/wash.jpg" alt="세탁방법" />
                <RouterLink
                    to='/board'
                >
                    <img src="/images/subpage/Inquiry.jpg" alt="1:1문의" />
                </RouterLink>
            </div>
        </section>
    );
}

export default ItemDetailSection1;