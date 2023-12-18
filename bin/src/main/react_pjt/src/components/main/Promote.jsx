import styles from "../../css/main/main.module.css";
const Promote = () => {
  return (
    <div className={styles.promote_wrap}>
      <div className={styles.promote}>
        <h2>이제는 집 앞에서 간단하고 편리하게 찾아요</h2>
        <div className={styles.promote_list1}>
          <img src={"/images/main/promotion1_1.PNG"} alt="" />
          <img src={"/images/main/promotion1_2.PNG"} alt="" />
          <img src={"/images/main/promotion1_3.PNG"} alt="" />
        </div>
        <div className={styles.promote_list2}>
          <img src={"/images/main/promotion1_4.PNG"} alt="" />
          <img src={"/images/main/promotion1_5.PNG"} alt="" />
          <img src={"/images/main/promotion1_6.PNG"} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Promote;
