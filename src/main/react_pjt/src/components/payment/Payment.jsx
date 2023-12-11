import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from '../../css/payment/payment.module.css';
import style from "../../css/payment/paymentmodal.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Modal from "../common/Modal";
import DaumPostcode from 'react-daum-postcode';

const AddressModal = ({ closeModal, onSelectAddress }) => {
    const [addressData, setaddressData] = useState([]);
    const [userData, setuserData] = useState([]);
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);
    const [openPostcode, setOpenPostcode] = useState(false);
    const [newAddress, setNewAddress] = useState({
        recipient_name: '',
        user_address1: '',
        user_address2: '',
        post_code: '',
        recipient_phone: '',
    });

    // member data 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/payment/getuserinfo?user_id=${sessionStorage.loginId}`);
                setuserData(response.data);
            } catch (error) {
                console.error("유저데이터를 가져오는 동안 오류 발생:", error);
            }
        };

        fetchData();
    }, []);

    // 주소록 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/payment/getAddress?user_id=${sessionStorage.loginId}`);
                setaddressData(response.data);
            } catch (error) {
                console.error("데이터를 가져오는 동안 오류 발생:", error);
            }
        };

        fetchData();
    }, []);

    // 기본 배송지 설정
    const handleDefualtAddress = (user_address1, user_address2, post_code) => {
        axios
            .post(`/payment/addDefaultAddress?user_id=${sessionStorage.loginId}`, {
                user_address1,
                user_address2,
                post_code,
            })
            .then((response) => {
                // 성공적으로 응답을 받았을 때 처리
                alert(`기본 배송지로 설정되었습니다.`);
                closeModal();
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

    // 배송지 선택
    const handleSelectAddress = (selectedAddress) => {
        if (selectedAddress) {
            onSelectAddress(selectedAddress);
            closeModal();
        } else {
            alert('주소를 선택해주세요.');
        }
    };

    const handleAddAddress = () => {
        setShowAddAddressForm(true);
    };

    // 배송지 추가
    const handleAddNewAddress = () => {
        const newAddressData = {
            user_id: sessionStorage.loginId,
            recipient_name: recipient_name,
            recipient_phone: recipient_phone,
            post_code: newAddress.post_code,
            user_address1: newAddress.address,
            user_address2: user_address2,
        }
        axios
            .post(`/payment/addNewAddress?user_id=${sessionStorage.loginId}`, newAddressData)
            .then((response) => {
                setaddressData((prevData) => [...prevData, response.data]);
                setShowAddAddressForm(false);
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`/payment/getAddress?user_id=${sessionStorage.loginId}`);
                        setaddressData(response.data);
                    } catch (error) {
                        console.error("데이터를 가져오는 동안 오류 발생:", error);
                    }
                };

                fetchData();
            })
            .catch((error) => {
                console.error("주소 추가 중 오류 발생:", error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    // 도로명주소
    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);
        },

        // 주소 선택 이벤트
        selectAddress: (data) => {
            // console.log(`
            //     주소: ${data.address},
            //     우편번호: ${data.zonecode}
            // `)
            setOpenPostcode(false);
            setNewAddress((prevAddress) => ({
                ...prevAddress,
                post_code: data.zonecode,
                address: data.address,
            }));
            // handleSelectAddress(data);
        },
    }

    const [recipient_name, setRecipientName] = useState("");
    const [user_address2, setUserAddress2] = useState("");
    const [recipient_phone, setRecipientPhone] = useState("");

    const handleRecipientNameChange = (event) => {
        setRecipientName(event.target.value);
    };

    const handleUserAddress2Change = (event) => {
        setUserAddress2(event.target.value);
    };

    const handleRecipientPhoneChange = (event) => {
        setRecipientPhone(event.target.value);

    };
    return (
        <div className={style.modal}>
            <div className={style.modal_wrap}>
                <h2>배송지 선택</h2>
                <div className={styles.button} >
                    <input type="button" value="배송지 추가" onClick={handleAddAddress} />
                </div>
                {showAddAddressForm && (
                    <div>
                        {openPostcode &&
                            <DaumPostcode
                                onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                            // defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어 
                            />}
                        <table>
                            <tr>
                                <th>
                                    <label htmlFor="name">받는사람</label>
                                </th>
                                <td colSpan="">
                                    <input
                                        type="text"
                                        id="recipient_name"
                                        name="recipient_name"
                                        value={recipient_name}
                                        required
                                        placeholder="이름을 입력하세요."
                                        onChange={handleRecipientNameChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label htmlFor="address">주소</label>
                                </th>
                                <td colSpan="">
                                    <input
                                        type="text"
                                        id="post_code"
                                        name="post_code"
                                        value={newAddress.post_code}
                                        readOnly
                                        required
                                        placeholder="우편번호"
                                        onClick={handle.clickButton}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        id="user_address1"
                                        name="user_address1"
                                        value={newAddress.address}
                                        readOnly
                                        required
                                        placeholder="도로명, 지번, 건물명 등을 입력하세요"
                                        onClick={handle.clickButton}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        id="user_address2"
                                        name="user_address2"
                                        value={user_address2}
                                        required
                                        placeholder="상세주소를 입력하세요"
                                        onChange={handleUserAddress2Change}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label htmlFor="phone">전화번호</label>
                                </th>
                                <td>
                                    <input
                                        type="text"
                                        id="recipient_phone"
                                        name="recipient_phone"
                                        value={recipient_phone}
                                        required
                                        placeholder="-를 제외하고 입력하세요."
                                        onChange={handleRecipientPhoneChange}
                                    />
                                </td>
                            </tr>
                        </table>
                        <div className={styles.button} >
                            <input type="button" value="취소" onClick={() => setShowAddAddressForm(false)} />
                            <input type="button" value="등록" onClick={handleAddNewAddress} />
                        </div>
                    </div>
                )}
                <table>
                    <tr>
                        <th>
                            <label htmlFor={`name`}>받는사람</label>
                        </th>
                        <th>
                            <label htmlFor={`address`}>주소</label>
                        </th>
                        <th>
                            <label htmlFor={`phone`}>전화번호</label>
                        </th>
                    </tr>
                    {addressData.map((i, index) => (
                        <tr key={index}>
                            <td>
                                <strong>
                                    {i.recipient_name}
                                </strong>
                            </td>
                            <td>
                                <p>{`${i.user_address1} ${i.user_address2} (${i.post_code})`}</p>
                            </td>
                            <td>
                                <p>
                                    {i.recipient_phone}
                                </p>
                            </td>
                            <div className={styles.button} >
                                {userData.map((u, index) => (
                                    i.post_code !== u.post_code &&
                                    <input type="button" value="기본배송지로 선택" onClick={() => handleDefualtAddress(i.user_address1, i.user_address2, i.post_code)} />
                                ))}
                                <input type="button" value="삭제" />
                                <input type="button" value="선택" onClick={() => handleSelectAddress(i)} />
                            </div>
                        </tr>
                    ))}
                </table>
                <div className={styles.button} >
                    <input type="button" onClick={closeModal} value="취소" />
                </div>
            </div>
        </div>
    );
};


const Payment = () => {
    const location = useLocation();

    const selectedItem = location.state.selectedItem;
    const quantity = location.state.quantity;

    const calculateTotalPrice = (item) => {
        if (!item || !item.selectedItem) {
            console.error("잘못된 'item' 또는 'selectedItem'");
            return 0;
        }

        const selectedItem = item.selectedItem;

        const originalPrice = selectedItem.item_price || 0;
        const salePrice = originalPrice - originalPrice * (selectedItem.item_discount_rate / 100);

        const quantity = selectedItem.item_quantity == null ? 1 : selectedItem.item_quantity;

        const totalPrice = salePrice * quantity;

        return totalPrice;
    };

    const calculateTotalCartPrice = (items) => {
        if (!Array.isArray(items) || items.length === 0) {
            return 0;
        }

        let totalCartPrice = 0;

        for (const selectedItem of items) {
            if (!selectedItem.selectedItem) {
                console.error("잘못된 'selectedItem' 또는 'selectedItem.selectedItem'");
                continue;
            }

            const itemTotalPrice = calculateTotalPrice(selectedItem);
            totalCartPrice += itemTotalPrice;
        }

        const deliveryPrice = totalCartPrice >= 50000 ? 0 : 3000;

        return totalCartPrice + deliveryPrice;
    };


    const [addressModalOpen, setAddressModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [userData, setuserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/payment/getuserinfo?user_id=${sessionStorage.loginId}`);
                setuserData(response.data);
            } catch (error) {
                console.error("유저데이터를 가져오는 동안 오류 발생:", error);
            }
        };

        fetchData();
    }, []);

    const openAddressModal = () => {
        setAddressModalOpen(true);
    };

    const closeAddressModal = () => {
        setAddressModalOpen(false);
    };

    const onSelectAddress = (address) => {
        setSelectedAddress(address);
    };

    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    // ======== 가격 계산 및 형식 변환 함수 시작 ========
    const formatter = new Intl.NumberFormat("ko-KR", {
        //   style: "currency",
        //   currency: "USD", // 통화 코드를 원하는 통화로 변경
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });

    const totalPrice = () => {
        const present_pr = selectedItem.item_price -
            (selectedItem.item_price * selectedItem.item_discount_rate) / 100;

        const totalpr = present_pr * quantity;
        const totalWithDelivery = totalpr >= 50000 ? totalpr : totalpr + 2500;
        return formatter.format(totalWithDelivery);
    }

    const [modalMessage, setModalMessage] = useState('');

    const handlePurchase = async () => {
        const url = "/payment/orderInsert";

        try {
            const formData = new FormData(document.getElementById('order'));
            formData.append('order_state', '배송대기');
            formData.append('pay_state', '결제대기');
            formData.append('review_state', '작성대기');
            formData.append('user_id', sessionStorage.loginId);
            for (const pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
            const response = await axios.post(url, formData);

            console.log('주문 성공:', response.data);
            setModalMessage('상품 구매가 완료되었습니다.');
            setIsModalOpen(true);
        } catch (error) {
            console.error('주문 실패:', error);

            if (error.response && error.response.status === 502) {
                alert('[입력 오류] 다시 시도하세요.');
            } else {
                alert('[시스템 오류] 잠시 후에 다시 시도하세요.');
            }
        }
    };

    return (
        <div>
            <h2 className={styles.title}>주문/결제</h2>

            <form action="" id="order" method="post" className={styles.main}>
                {/* <!--배송지정보--> */}


                <h2 className={styles.title}>배송지</h2>
                <div className={styles.address_input}>
                    <div>
                        <div className={styles.button} >
                            <input type="button" value="배송지 선택" onClick={openAddressModal} />
                        </div>

                        {addressModalOpen && (
                            <AddressModal closeModal={closeAddressModal} onSelectAddress={onSelectAddress} />
                        )}

                        {selectedAddress.recipient_name == undefined &&
                            userData.map((i, index) => (
                                <table>
                                    <tr>
                                        <th>
                                            <label htmlFor="text">받는 분 : </label>
                                        </th>
                                        <td colSpan="">
                                            <input type="text" id="recipient_name" name="recipient_name" value={i.user_name} readOnly />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <label htmlFor="text">전화번호 : </label>
                                        </th>
                                        <td colSpan="">
                                            <input type="text" id="recipient_phone" name="recipient_phone" value={i.user_phonenum} readOnly />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <label htmlFor="text">주소 : </label>
                                        </th>

                                        {i.user_address1 === null &&
                                            <td colSpan="">
                                                <input type="text" value="배송지를 선택해주세요" />
                                            </td>
                                        }
                                        {i.user_address1 !== null &&
                                            <td colSpan="">
                                                < input type="text" id="user_address1" name="user_address1" value={i.user_address1} />
                                                < input type="text" id="user_address2" name="user_address2" value={i.user_address2} />
                                                < input type="text" id="post_code" name="post_code" value={i.post_code} />
                                            </td>
                                        }
                                    </tr>
                                </table>
                            ))
                        }{selectedAddress.recipient_name !== undefined &&
                            <table>
                                <tr>
                                    <th>
                                        <label htmlFor="text">받는 분 : </label>
                                    </th>
                                    <td colSpan="">
                                        <input type="text" id="recipient_name" name="recipient_name" value={selectedAddress.recipient_name} readOnly />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label htmlFor="text">전화번호 : </label>
                                    </th>
                                    <td colSpan="">
                                        <input type="text" id="recipient_phone" name="recipient_phone" value={selectedAddress.recipient_phone} readOnly />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label htmlFor="text">주소 : </label>
                                    </th>
                                    <td colSpan="">
                                        < input type="text" id="user_address1" name="user_address1" value={selectedAddress.user_address1} />
                                        < input type="text" id="user_address2" name="user_address2" value={selectedAddress.user_address2} />
                                        < input type="text" id="post_code" name="post_code" value={selectedAddress.post_code} />
                                    </td>
                                </tr>
                            </table>
                        }
                    </div>

                    <Link to="/itemList" className={styles.img_area}>
                        <img src="https://i.pinimg.com/originals/7e/35/0c/7e350c22750cea72abeb1ab755ad43d0.gif" alt="" />
                    </Link>
                    <div className={styles.pass_input}>
                        <hr />
                        <h2 className={styles.title}>주문자 정보</h2>
                        <tr>
                            <th>
                                <label htmlFor="payment">결제방법</label>
                            </th>
                            <td>
                                <select id="payment" name="payment">
                                    <option value="credit-card">신용카드</option>
                                    <option value="bank-transfer">계좌이체</option>
                                    <option value="tel">휴대전화</option>
                                </select>
                            </td>
                        </tr>
                        {userData.map((i, index) => (
                            <table>
                                <tr>
                                    <th>
                                        <label htmlFor="text">주문자 이름 : </label>
                                    </th>
                                    <td colSpan="">
                                        <input type="text" id="user_name" name="user_name" value={i.user_name} readOnly />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label htmlFor="email">주문자 이메일 : </label>
                                    </th>
                                    <td colSpan="">
                                        <input type="email" id="user_email" name="user_email" value={i.user_email} readOnly />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label htmlFor="text">주문자 전화번호 : </label>
                                    </th>
                                    <td colSpan="">
                                        <input type="text" id="user_phonenum" name="user_phonenum" value={i.user_phonenum} readOnly />
                                    </td>
                                </tr>
                            </table>
                        ))}
                    </div>
                </div>

                {/* <!-- 주문상품 --> */}

                <h2 className={styles.title}>주문상품</h2>
                <div className={styles.desc}>
                    <table>
                        <thead>
                            <tr>
                                <th>상품/옵션 정보</th>
                                <th>수량</th>
                                <th>상품금액</th>
                                <th>합계금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(selectedItem) ? (
                                selectedItem.map((i, index) => (
                                    <tr key={index}>
                                        <td>
                                            <h3 className={styles.name}>{i.selectedItem.item_name}</h3>
                                            <input hidden id="item_no" name="item_no" value={i.selectedItem.item_no} />
                                        </td>
                                        <td>
                                            <span className={styles.quantity}>
                                                수량 : {i.selectedItem.item_quantity}개
                                            </span>
                                            <input hidden id="item_quantity" name="item_quantity" value={i.selectedItem.item_quantity} />
                                        </td>
                                        <td>
                                            <ul>
                                                <li>
                                                    <span className={styles.sale_info}>
                                                        {i.selectedItem.item_discount_rate}%
                                                    </span>
                                                    <span className={styles.normal_pr}>
                                                        {i.selectedItem.item_price?.toLocaleString("ko")}원
                                                    </span>
                                                    <span className={styles.present_pr}>
                                                        {(i.selectedItem.item_price -
                                                            (i.selectedItem.item_price * i.selectedItem.item_discount_rate) / 100
                                                        )?.toLocaleString("ko")}원
                                                    </span>
                                                    <input hidden id="item_price" name="item_price" value={i.selectedItem.item_price - (i.selectedItem.item_price * i.selectedItem.item_discount_rate) / 100} />
                                                </li>
                                                <li>
                                                    <span className={styles.free_delivery}>2500원(50,000원 이상 구매시 무료)</span>
                                                </li>
                                            </ul>
                                        </td>
                                        <td className={styles.total}>
                                            <span>{calculateTotalPrice(i)?.toLocaleString("ko")}원</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>
                                        <h3 className={styles.name}>{selectedItem.item_name}</h3>
                                        <input hidden id="item_no" name="item_no" value={selectedItem.item_no} />
                                    </td>
                                    <td>
                                        <span className={styles.quantity} id="item_quantity" name="item_quantity" value={quantity} >수량 : {quantity}개</span>
                                        <input hidden id="item_quantity" name="item_quantity" value={quantity} />
                                    </td>
                                    <td>
                                        <ul>
                                            <li>
                                                <span className={styles.sale_info}>{selectedItem.item_discount_rate}%</span>
                                                <span className={styles.normal_pr}>{selectedItem.item_price?.toLocaleString("ko")}원</span>
                                                <span className={styles.present_pr}>
                                                    {(selectedItem.item_price -
                                                        (selectedItem.item_price * selectedItem.item_discount_rate) / 100
                                                    )?.toLocaleString("ko")}원
                                                </span>
                                                <input hidden id="item_price" name="item_price" value={selectedItem.item_price - (selectedItem.item_price * selectedItem.item_discount_rate) / 100} />
                                            </li>
                                            <li>
                                                <span className={styles.free_delivery}>2500원(50,000원 이상 구매시 무료)</span>
                                            </li>
                                        </ul>
                                    </td>
                                    <td className={styles.total}>
                                        <span>{totalPrice()?.toLocaleString("ko")}원</span>
                                        <input hidden id="total_price" name="total_price" value={(selectedItem.item_price - (selectedItem.item_price * selectedItem.item_discount_rate) / 100) * quantity} />
                                        <span>(배송비 포함금액)</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        {Array.isArray(selectedItem) ? (
                            <div className="cart">
                                <div>
                                    <p className="total_product">
                                    </p>
                                    <div className="total_price">
                                        <p>50,000원 이상 구매시 배송비 무료</p>
                                        <div className="firstB_price">
                                            <span className="product_price">
                                                {calculateTotalCartPrice(selectedItem)?.toLocaleString("ko")}원
                                            </span>
                                            <span className="delivery_price">
                                                {(calculateTotalCartPrice(selectedItem) >= 50000 ? 0 : 3000)?.toLocaleString("ko")}원
                                            </span>
                                            <span className="total_price2" >
                                                {(calculateTotalCartPrice(selectedItem) >= 50000 ? calculateTotalCartPrice(selectedItem) : calculateTotalCartPrice(selectedItem) + 3000)?.toLocaleString("ko")}원
                                            </span>
                                            <input hidden id="total_price" name="total_price" value={calculateTotalCartPrice(selectedItem) >= 50000 ? calculateTotalCartPrice(selectedItem) : calculateTotalCartPrice(selectedItem) + 3000} />
                                        </div>
                                        <div className="price_info">
                                            <ul>
                                                <li className="product_price">주문금액</li>
                                                <li className="delivery_price">배송비</li>
                                                <li className="total_price2">결제금액</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </table>
                </div>

                {/* <!--약관 동의--> */}

                <section>
                    <div className={styles.content}>
                        <h2 className={styles.title}>이용 약관</h2>
                        <p>

                        </p>
                        <div className={styles.checkbox_wrapper}>
                            <label>
                                <input type="checkbox" id="agree-checkbox" required />
                                약관에 동의합니다.
                            </label>
                        </div>

                        <h2 className={styles.title}>개인 정보 처리 방침</h2>
                        <p></p>

                        <div className={styles.checkbox_wrapper}>
                            <label>
                                <input type="checkbox" id="agree-checkbox" required />
                                개인 정보 처리 방침에 동의합니다.
                            </label>
                        </div>
                    </div>
                </section>
                <div className={styles.button}>
                    <Link
                        to="/itemList"
                    >
                        <input type="button" value="할인 상품 더 보기" />
                    </Link>

                    <input type="submit" value="구매하기" onClick={handlePurchase} />
                    {isModalOpen && (
                        <Modal
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            modalContent={modalMessage}
                            modalAfterPath="/main/*"
                        />

                    )}
                </div>
            </form>
        </div>
    );
}

export default Payment;