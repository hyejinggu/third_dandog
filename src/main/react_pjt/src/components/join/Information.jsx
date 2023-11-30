import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Information = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Information 컴포넌트의 상태 변수
    const [formValue, setFormValue] = useState({
        ...location.state,
        ani_name: '',
        ani_birthday: '',
        ani_gender: '',
        ani_info: '',
        ani_type: '강아지',  // 추가: 반려동물 종류
    });

    useEffect(() => {
        // Agree와 Profile에서 받아온 데이터 합치기
        if (location.state) {
            setFormValue((prevFormValue) => ({
                ...prevFormValue,
                ...location.state,
            }));
        }
    }, [location.state]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Information 컴포넌트에서의 추가적인 처리나 페이지 이동 등을 수행할 수 있습니다.

        // 데이터 배열 생성
        const dataToSend = {
            // 받아온 데이터와 Information 컴포넌트의 formValue 합치기
            ...location.state,
            ani_name: formValue.ani_name,
            ani_birthday: formValue.ani_birthday,
            ani_type: formValue.ani_type,  // 반려동물 종류 추가
            ani_info: formValue.ani_info,
        };

        // 콘솔에 데이터 배열 출력
        console.log('데이터 배열:', dataToSend);

        // 다음 페이지로 이동
        navigate('/join/details', { state: dataToSend });
    };

    return (
        <form action="join" id="join_form" method="post" onSubmit={handleSubmit}>
            <figure>
                <table>
                    <tr>
                        <th>
                            <label htmlFor="ani_name">반려동물 이름</label>
                        </th>
                        <td>
                            <input
                                type="text"
                                name="ani_name"
                                id="ani_name"
                                value={formValue.ani_name}
                                onChange={(e) => setFormValue({ ...formValue, ani_name: e.target.value })}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label htmlFor="ani_birthday">반려동물 생일</label>
                        </th>
                        <td>
                            <input
                                type="text"
                                name="ani_birthday"
                                id="ani_birthday"
                                placeholder="ex) 20230203"
                                value={formValue.ani_birthday}
                                onChange={(e) => setFormValue({ ...formValue, ani_birthday: e.target.value })}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label htmlFor="ani_type">반려동물 종류</label>
                        </th>
                        <td className="ani_type">
                            <input
                                type="radio"
                                name="ani_type"
                                id="dog"
                                value="강아지"
                                checked={formValue.ani_type === "강아지"}
                                onChange={(e) => setFormValue({ ...formValue, ani_type: e.target.value })}
                            />
                            <label htmlFor="dog">강아지</label>
                            <input
                                type="radio"
                                name="ani_type"
                                id="cat"
                                value="고양이"
                                checked={formValue.ani_type === "고양이"}
                                onChange={(e) => setFormValue({ ...formValue, ani_type: e.target.value })}
                            />
                            <label htmlFor="cat">고양이</label>
                            <input
                                type="radio"
                                name="ani_type"
                                id="any"
                                value="기타"
                                checked={formValue.ani_type === "기타"}
                                onChange={(e) => setFormValue({ ...formValue, ani_type: e.target.value })}
                            />
                            <label htmlFor="any">기타</label>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label htmlFor="ani_info">반려동물 특성</label>
                        </th>
                        <td className="ani_info">
                            <textarea
                                name="ani_info"
                                id="ani_info"
                                cols="84"
                                rows="3"
                                value={formValue.ani_info}
                                onChange={(e) => setFormValue({ ...formValue, ani_info: e.target.value })}
                            ></textarea>
                        </td>
                    </tr>
                </table>
            </figure>
            <input type="submit" value="Next" />
        </form>
    );
};

export default Information;
