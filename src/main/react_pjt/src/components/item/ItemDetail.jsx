import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../css/subpage/ItemDetail.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ItemDetailSection1 from "./ItemDetailSection1";
import ItemDetailSection2 from "./ItemDetailSection2";
import ItemDetailSection3 from "./ItemDetailSection3";
import ItemDetailSection4 from "./ItemDetailSection4";
import RecentSeenItem from "./RecentSeenItem";

const ItemDetail = () => {
  const location = useLocation();
  const selectedItem = location.state.item;
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/itemdetail/getImageData");
        setImageData(response.data);
      } catch (error) {
        console.error("데이터를 가져오는 동안 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  // 수량 설정
  const [quantity, setQuantity] = useState(1); // 초기 수량 설정

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value)); // 수량 변경 시 상태 업데이트
  };

  const [mainImage, setMainImage] = useState(selectedItem.item_img1); // 초기 메인 이미지

  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl); // 클릭한 이미지를 메인 이미지로 설정
  };

  const loginId = sessionStorage.getItem('loginId') || "admin";
  const cartRequest = {
    user_id: loginId,
    item_no: selectedItem.item_no,
    item_quantity: quantity,
  };

  // axios를 사용하여 서버에 장바구니 담기 요청
  const handleAddToCart = () => {
    console.log(cartRequest);
    axios
      .post(`/restCart/addCart?user_id=${loginId}`, cartRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // 성공적으로 응답을 받았을 때 처리
        alert(`상품이 장바구니에 담겼습니다.`);
      })
      .catch((error) => {
        // 에러 발생 시 처리
        if (error.response) {
          console.error("서버에서 오류 응답:", error.response.data);
          console.error("Status code:", error.response.status);
        } else if (error.request) {
          console.error("서버로부터 응답을 받지 못했습니다.");
        } else {
          console.error("요청 설정 중 오류 발생:", error.message);
        }
        console.error("전부 에러:", error);
      });
  };

  const present_pr =
    selectedItem.item_price -
    (selectedItem.item_price * selectedItem.item_discount_rate) / 100;

  const total_price = present_pr * quantity;

  return (
    <div className={styles.detail_wrap}>
      <form onSubmit={handleAddToCart}>
        <div className={styles.top_area}>
          <section className={styles.img_area}>
            {/* 메인 이미지 */}
            <div className={styles.main_img}>
              <img src={`/images/subpage/${mainImage}`} alt="상품이미지" />
            </div>

            {/* 서브 이미지들 */}
            <div className={styles.sub_img}>
              {imageData.map((i, index) => (
                selectedItem.item_no === i.item_no && (
                  <img
                    key={index}
                    src={`/images/subpage/${i.item_img}`}
                    alt={`상품 이미지 ${index}`}
                    onClick={() => handleImageClick(i.item_img)} // 이미지 클릭 시 처리
                  />
                )))}
            </div>
          </section>
          <section className={styles.info_area}>
            {/* 상품명 */}
            <div>상품명</div>
            <div className={styles.present_pr}>{selectedItem.item_name}</div>
            {/* 판매가 */}
            <div>판매가</div>
            <div>
              <span className={styles.sale_info}>
                {selectedItem.item_discount_rate}%
              </span>
              <span className={styles.normal_pr}>
                {selectedItem.item_price.toLocaleString("ko")}원
              </span>
              <span className={styles.present_pr}>
                {(
                  selectedItem.item_price -
                  (selectedItem.item_price * selectedItem.item_discount_rate) /
                  100
                ).toLocaleString("ko")}
                원
              </span>
            </div>
            {/* 배송비 */}
            <div>배송비</div>
            <div>2,500원(30,000원 이상 구매시 무료)</div>
            {/* 사이즈 */}
            <div>사이즈</div>
            <div>
              <select id="option" name="sizeOption">
                {selectedItem.options_size === "F" && (
                  <option key="1" value={selectedItem.options_size}>
                    OneSize
                  </option>
                )}
                {selectedItem.options_size === "S" && (
                  <option key="2" value={selectedItem.options_size}>
                    S
                  </option>
                )}
                {selectedItem.options_size !== "F" &&
                  selectedItem.options_size !== "S" && (
                    <option key="3" value={selectedItem.options_size}>
                      선택없음
                    </option>
                  )}
              </select>
            </div>
            {/* 컬러 */}
            <div>컬러</div>
            <div>
              <select id="option" name="colorOption">
                {selectedItem.options_color === "Br" && (
                  <option key="1" value={selectedItem.options_color}>
                    브라운
                  </option>
                )}
                {selectedItem.options_color === "Bk" && (
                  <option key="2" value={selectedItem.options_color}>
                    블랙
                  </option>
                )}
                {selectedItem.options_color === "Pk" && (
                  <option key="3" value={selectedItem.options_color}>
                    핑크
                  </option>
                )}
                {selectedItem.options_color === "Ye" && (
                  <option key="4" value={selectedItem.options_color}>
                    옐로우
                  </option>
                )}
                {selectedItem.options_color !== "Br" &&
                  selectedItem.options_color !== "Bk" &&
                  selectedItem.options_color !== "Pk" &&
                  selectedItem.options_color !== "Ye" && (
                    <option key="5" value={selectedItem.options_color}>
                      선택없음
                    </option>
                  )}
              </select>
            </div>
            {/* 수량 */}
            <div>수량</div>
            <div>
              <select
                id="option"
                name="item_quantity"
                value={quantity}
                onChange={handleQuantityChange} // 수량 변경 시 처리
              >
                {Array.from({ length: 10 }, (_, index) => index + 1).map(
                  (count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  )
                )}
              </select>
            </div>
            {/* 구매 버튼 */}
            <div>
              <Link
                to="/payment"
                state={{
                  selectedItem: selectedItem,
                  item_quantity: quantity,
                }}
              >
                <input
                  type="button"
                  value="바로 구매하기"
                  className={styles.button}
                />
              </Link>
            </div>
            {/* 장바구니 버튼 */}
            <div>
              <Link to="/cart"
                state={{
                  selectedItem: selectedItem,
                  item_quantity: quantity,
                }}
              >
                <input
                  type="button"
                  value="장바구니 담기"
                  className={styles.button}
                  onClick={handleAddToCart} // 장바구니 버튼 클릭 시 처리
                />
              </Link>
            </div>
          </section>
        </div>
        <ItemDetailSection1 />
        <ItemDetailSection2 />
        <ItemDetailSection3 />
        <ItemDetailSection4 />
      </form>
      {/* <RecentSeenItem /> */}
    </div>
  );
};

export default ItemDetail;
