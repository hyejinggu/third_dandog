import styles from "../../css/subpage/community_lounge.module.css";
import { NavLink } from "react-router-dom";

const CommunityTitle = () => {
  return (
    <div className={styles.title}>
      <strong>
        <NavLink to="/lounge">라운지</NavLink>
        <NavLink to="/event">이벤트</NavLink>
        <NavLink to="/neighborhood">우리 동네</NavLink>
      </strong>
    </div>
  );
};

export default CommunityTitle;
