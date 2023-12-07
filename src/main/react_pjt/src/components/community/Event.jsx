import styles from "../../css/subpage/community_event.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Event() {
  // message 초기값 설정 (""로 설정)
  const [eventList, setEventList] = useState([]);

  // useEffect(함수, 배열) : 컴포넌트가 화면에 나타났을 때 자동 실행
  useEffect(() => {
    axios
      .get("/event/getEventList")
      .then((res) => {
        setEventList(res.data);
        console.log(res.data);
      })
      .catch((res) => console.log(res));
  }, []);

  return (
    <div id="wrap" className={styles.event_container}>
      <div className={styles.title}>
        <strong>
          <NavLink to="/community/lounge">라운지</NavLink>
          <NavLink to="/community/event">이벤트</NavLink>
          <NavLink to="/community/neighborhood">우리 동네</NavLink>
        </strong>
      </div>
      <ul className={styles.event_type}>
        <li>전체 이벤트</li>
        <li>구매자 이벤트</li>
        <li>체험단</li>
      </ul>
      <div className={styles.event_content}>
        <EventList eventList={eventList} />
      </div>
      <div className={styles.page_shift}></div>
    </div>
  );
}

const date = new Date();

const formatDate = (date) => {
  // 날짜를 'YYYY-MM-DD' 형식의 문자열로 변환
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const EventList = ({ eventList }) => {
  const currentDate = formatDate(date);

  return (
    <ul>
      {eventList.map((event, index) => (
        <li key={index}>
          {currentDate > event.e_exp_date ? (
            <div className={styles.opacity_box}>
              <p>종료된 이벤트입니다.</p>
            </div>
          ) : (
            ""
          )}
          <img
            src={`/images/event/${event.event_img}`}
            alt={`event_img${index}`}
          />
        </li>
      ))}
    </ul>
  );
};
