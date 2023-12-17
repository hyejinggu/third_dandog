import React from 'react';
import styles from "../../css/subpage/ItemDetail.module.css";
import { Link as RouterLink } from "react-router-dom"; // 별칭 사용
import { Link as ScrollLink } from 'react-scroll'; // 별칭 사용

const ItemDetailSection4 = () => {

    return (
        <section id="section4" className={styles.section4}>
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
            <div>게시물이 없습니다</div>
            <RouterLink to='/board'>
                <input type="button" value="상품 문의하기" />
            </RouterLink>
        </section>
    );
};

export default ItemDetailSection4;
