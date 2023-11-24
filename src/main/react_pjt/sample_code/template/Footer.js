function Footer() {
    return (
        <footer>
            <div className="footer_wrap">
                <div className="ft_info1">
                    <h3>주문/배송 문의: 010-1254-9478</h3>
                    <h3>대량 구매 문의: tlsgPwls@gmail.com</h3>
                    <h3>마케팅 제휴 문의: tlsgPwls@gmail.com</h3>
                    <p><span>영업시간</span>
                        월 ~ 금: 9:00 - 18:00
                        토: 9:00 - 12:00
                        일요일 및 공휴일: 휴무
                    </p>
                </div>
                <div className="ft_copy">
                    <img src={'/header/logo.png'} alt="로고" className="logo" />
                    <p>&copy; 2023 웹사이트. All rights reserved.</p>
                </div>
                <div className="ft_info2">
                    <p>상호 : 단독/DanDog 대표 : 연제승
                        주소 : 경기도 광명시 일직로 43 C동 410호
                        사업자번호 : 359-86-00037
                        통신판매업신고 : 2015-경기광명-0274
                        대표번호 : 02-899-7892 이메일 : gaenim@ysfnc.kr
                    </p>
                    <ul>
                        <li>회사소개</li>
                        <li>이용약관</li>
                        <li>개인정보처리방침</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
