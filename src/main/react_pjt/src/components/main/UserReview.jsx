import styles from "../../css/main/main.module.css";

const UserReview = () => {
  return (
    <div className={styles.user_review_wrap}>
      <div className={styles.user_review1}>
        <img src={"/images/main/review1.jpg"} alt="" />
        <img src={"/images/main/review2.jpg"} alt="" />
      </div>
    </div>
  );
};

export default UserReview;
