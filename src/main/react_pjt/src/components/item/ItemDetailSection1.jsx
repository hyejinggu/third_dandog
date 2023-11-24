import styles from "../../css/subpage/ItemDetail.module.css";
import { Link as RouterLink } from "react-router-dom"; // 별칭 사용
import { Link as ScrollLink } from 'react-scroll'; // 별칭 사용
import { useLocation } from "react-router-dom";


const ItemDetailSection1 = () => {
    const location = useLocation();
    const selectedItem = location.state.selectedItem;

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

                {selectedItem.infoimage.map((imageUrl, index) => (
                    <img
                        key={index}
                        src={imageUrl}
                        alt={`이미지 ${index}`}
                    />
                ))}

                <img src="/images/subpage/wash.jpg" alt="세탁방법" />
                <RouterLink
                    to='/board'
                >
                    <img src="/images/subpage/Inquiry.jpg" alt="1:1문의" />
                </RouterLink>
            </div>
            <h3>상품정보고지</h3>
            <table className={styles.Product_info}>
                <tr>
                    <th>품명 :</th>
                    <td>{selectedItem.name}</td>
                </tr>
                <tr>
                    <th>제조사 :</th>
                    <td>DanDog</td>
                </tr>
                <tr>
                    <th>제조국 :</th>
                    <td>국산</td>
                </tr>
                <tr>
                    <th>소비자 상담 관련 전화번호 :</th>
                    <td>1800-1234</td>
                </tr>
            </table>
        </section>
    );
}

export default ItemDetailSection1;