import React from "react";
import styles from "../../css/main/main.module.css";
import { Link } from "react-router-dom";
const MainEvent = () => {
  return (
    <div className={styles.community_wrap}>
      <div className={styles.community_event}>
        <Link to="/community/event">
          <div href="#" className={styles.event_img}>
            <img src={"/images/main/event_sample.PNG"} alt="" />
          </div>
          <p className={styles.event_title}>🐕ANF 6Free+ 심플팩 100원!🐕</p>
          <div className={styles.event_info}>
            반려동물을 이해해온 68년, 이해하니까 더 무해하게, ANF 멜로망스
            김민석이 나레이션한 무해한 광고 영상 확인하고 ANF 식스프리 샘플팩
            100원에 신청하세요! 이미지를 누르면 샘플키트 구매 페이지로 넘어갑니다.
          </div>
          <ul>
            <li>
              <p>
                <img src={"/images/main/bestseller3.jpeg"} alt="" />
                [100원] ANF 식스프리 플러스 강아지 사료 샘플키트 기호성 테스트
                <br />
                <span>
                  98% <strong>100원</strong>
                </span><br />
                <span>평점 4.9 · 리뷰 408</span>
              </p>
            </li>
          </ul>
          <ul>
            <li>
              <p>
                <img src={"/images/main/bestseller3.jpeg"} alt="" />
                [100원] ANF 식스프리 플러스 강아지 사료 샘플키트 기호성 테스트
                <br />

                <span>
                  98% <strong>100원</strong>
                </span>
                <br />
                <span>평점 4.9 · 리뷰 408</span>
              </p>
            </li>
          </ul>
        </Link>
      </div>

      <div className={styles.community_event}>
        <Link to="/community/event">
          <div href="#" className={styles.event_img}>
            <img src={"/images/main/event_sample2.PNG"} alt="" />
          </div>
          <p className={styles.event_title}>💘생육 + 35억마리 유산균💘</p>
          <p className={styles.event_account}>
            ANF 홀리스틱 생육 + 35억마리 유산균으로 건강하게 밥먹자!
          </p>
        </Link>
      </div>

      <div className={styles.community_event}>
        <Link to="/community/event">
          <div href="#" className={styles.event_img}>
            <img src={"/images/main/event_sample3.PNG"} alt="" />
          </div>
          <p className={styles.event_title}>🐶이즈칸 패키지 리뉴얼🐶</p>
          <div className={styles.event_info}>
            이즈칸이 패키지 리뉴얼되어 돌아왔습니다! 이즈칸 로고와 패키지는 리뉴얼
            되었지만, 내용물은 변경되지 않았으니 마음놓고 먹이셔도 됩니다!
            생육으로 생기있게 활발하게 생육 펫푸드 이즈칸 지금 바로 신청하세요!
          </div>
          <ul>
            <li>
              <p>
                <img src={"/images/main/bestseller2.png"} alt="" />
                이즈칸 독 퍼포먼스 퍼피 2.5kg 그레인프리 강아지 사료
                <br />
                <span>
                  10% <strong>54,000원</strong>
                </span>
                <br />

                <span>평점 4.9 · 리뷰 8</span>
              </p>
            </li>
          </ul>
        </Link>
      </div>
    </div>
  );
};

export default MainEvent;
