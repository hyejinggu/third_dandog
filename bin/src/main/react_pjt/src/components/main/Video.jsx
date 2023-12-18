import styles from "../../css/main/main.module.css";

const Video = () => {
  return (
    <div className={styles.video_wrap}>
      <div className={styles.video}>
        <iframe
          width="1280"
          height="720"
          src="https://www.youtube.com/embed/c_VX6Xm2jgE"
          title="강아지가 좋아하는 소리 2탄, 강아지가 보는 유튜브, 강아지놀이 - Puppy&#39;s Favorite Sound"

          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"

        ></iframe>
      </div>
    </div>
  );
};

export default Video;
