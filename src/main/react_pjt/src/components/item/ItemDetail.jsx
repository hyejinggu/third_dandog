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
import { useNavigate } from "react-router-dom";

const ItemDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItem = location.state.item;
  const [imageData, setImageData] = useState([]);
  const [colorSize, setColorSize] = useState({ Color: [], Size: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 첫 번째 axios 요청 실행
        const imageDataResponse = await axios.get("/itemdetail/getImageData");
        setImageData(imageDataResponse.data);

        // 두 번째 axios 요청 실행
        const colorSizeResponse = await axios.get(
          `/item/getColorSize?item_name=${selectedItem.item_name}`
        );

        setColorSize({
          Color: colorSizeResponse.data.Color || [], // Color가 없으면 빈 배열로 설정
          Size: colorSizeResponse.data.Size || [], // Size가 없으면 빈 배열로 설정
        });
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

  const loginId = sessionStorage.getItem("loginId");
  const cartRequest = {
    user_id: loginId,
    item_no: selectedItem.item_no,
    item_quantity: quantity,
    item_options_size: selectedItem.options_size,
    item_options_color: selectedItem.options_color,
  };

  const handleAddToCart = () => {
    if (!loginId) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      console.log(cartRequest);
      axios
        .post(`/restCart/addCart?user_id=${loginId}`, cartRequest, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          alert(`상품이 장바구니에 담겼습니다.`);
          // Only navigate if the user is logged in
          navigate("/cart");
        })
        .catch((error) => {
          // Handle the error
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
    }
  };

  const present_pr =
    selectedItem.item_price -
    (selectedItem.item_price * selectedItem.item_discount_rate) / 100;

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
              {imageData.map(
                (i, index) =>
                  selectedItem.item_no === i.item_no && (
                    <img
                      key={index}
                      src={`/images/subpage/${i.item_img}`}
                      alt={`상품 이미지 ${index}`}
                      onClick={() => handleImageClick(i.item_img)} // 이미지 클릭 시 처리
                    />
                  )
              )}
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
                {colorSize.Size.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            {/* 컬러 */}
            <div>컬러</div>
            <div>
              <select id="option" name="colorOption">
                {colorSize.Color.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
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
                  quantity: quantity,
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
              <input
                type="button"
                value="장바구니 담기"
                className={styles.button}
                onClick={handleAddToCart} // 장바구니 버튼 클릭 시 처리
              />
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
