import Bestseller from "../main/Bestseller";
import Slide from "../main/Slide";
import NoticeBanner from "../main/NoticeBanner";
import MainEvent from "../main/MainEvent";
import Promote from "../main/Promote";
import UserReview from "../main/UserReview";
import Video from "../main/Video";
import RecentSeenItem from "../item/RecentSeenItem";

import "../../css/common/common.module.css";

const Main = () => {
  return (
    <div>
      <div id="wrap">
        <Slide />
        <Bestseller />
        <UserReview />
        <NoticeBanner />
        <MainEvent />
        <Promote />
        <Video />
      </div>
      {/* <RecentSeenItem /> */}
    </div>
  );
};

export default Main;
