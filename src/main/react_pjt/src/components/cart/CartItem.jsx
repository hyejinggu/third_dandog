import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const CartItem = ({
  key,
  selectedItem,
  onIncrease,
  onDecrease,
  totalPrice,
  handleDelete,
  setIsChecked,
  isChecked,
  itemNo, // itemNo 프롭 추가
  updateItemNo, // updateItemNo 프롭 추가
}) => {
  const loginId = sessionStorage.getItem("loginId");
  const [colorSize, setColorSize] = useState({ Color: [], Size: [] });
  const itemName = selectedItem.item_name;
  const [selectedColor, setSelectedColor] = useState(
    selectedItem.options_color
  );
  const [selectedSize, setSelectedSize] = useState(selectedItem.options_size);

  // 상품 옵션 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const colorSizeResponse = await axios.get(
          `/item/getColorSize?item_name=${itemName}`
        );

        setColorSize({
          Color: colorSizeResponse.data.Color || [],
          Size: colorSizeResponse.data.Size || [],
        });
      } catch (error) {
        console.error("데이터를 가져오는 동안 오류 발생:", error);
      }
    };

    fetchData();
  }, [selectedItem]);

  // 색상 및 사이즈 선택 변경 핸들러
  const handleOptionChange = (event) => {
    const { name, value } = event.target;

    if (name === "colorOption") {
      setSelectedColor(value);
    } else if (name === "sizeOption") {
      setSelectedSize(value);
    }
  };

  useEffect(() => {
    const updateColorSizeOnServer = async () => {
      try {
        console.log("전송 데이터:", {
          loginId,
          itemName,
          selectedColor,
          selectedSize,
        });
        const response = await axios.post(
          `/restCart/updateColorSize/${loginId}/${itemNo}/${itemName}/${selectedColor}/${selectedSize}`
        );
        updateItemNo(response.data);
        Navigate("/cart");
      } catch (error) {
        console.error("서버에 업데이트하는 동안 오류 발생:", error);
      }
    };

    //   // 호출 전에 필요한 데이터가 존재하는지 확인
    //   if (loginId && itemNo && itemName && selectedColor && selectedSize) {
    updateColorSizeOnServer();
    //   }
  }, [selectedColor, selectedSize]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          className="cart_check"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </td>
      <td className="first_block">
        <div>
          <img src={`/images/item/${selectedItem.item_img}`} alt="상품이미지" />
          <span className="text-ellipsis">{selectedItem.item_name}</span>
        </div>
      </td>
      <td className="cart_item_options">
        <div>
          <span>사이즈</span>
          <span className="cart_opt">
            <select
              name="sizeOption"
              value={selectedSize}
              onChange={handleOptionChange}
            >
              {colorSize.Size.map((size, index) => (
                <option value={size}>{size}</option>
              ))}
            </select>
          </span>
        </div>
        <div>
          <span>색상</span>
          <span className="cart_opt">
            <select
              name="colorOption"
              value={selectedColor}
              onChange={handleOptionChange}
            >
              {colorSize.Color.map((color, index) => (
                <option value={color}>{color}</option>
              ))}
            </select>
          </span>
        </div>
      </td>
      <td>
        <button onClick={onDecrease}>-</button>
        <span className="total">{selectedItem.item_quantity}</span>
        <button onClick={onIncrease}>+</button>
      </td>
      <td className="price">
        <span className="sale_info">{selectedItem.item_discount_rate}%</span>
        <del>{selectedItem.item_price}원</del>
        <span className="sale_price">
          {(
            selectedItem.item_price -
            (selectedItem.item_price * selectedItem.item_discount_rate) / 100
          ).toLocaleString("ko")}
          원
        </span>
      </td>
      <td className="total">{totalPrice.toLocaleString()}원</td>
      <td className="xxx">
        <input type="button" onClick={handleDelete} value="X" />
      </td>
    </tr>
  );
};
export default CartItem;
