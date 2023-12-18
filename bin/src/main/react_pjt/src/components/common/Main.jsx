import Bestseller from "../main/Bestseller";
import Slide from "../main/Slide";
import NoticeBanner from "../main/NoticeBanner";
import MainEvent from "../main/MainEvent";
import Promote from "../main/Promote";
import UserReview from "../main/UserReview";
import Video from "../main/Video";

import "../../css/common/common.module.css";

const Main = () => {
  return (
    <div id="wrap">
      <Slide />
      <Bestseller />
      <UserReview />
      <NoticeBanner />
      <MainEvent />
      <Promote />
      <Video />

      {/*       <Link to="/profile"></Link>
      <Link to="/cart"></Link>
      <Link to="/board"></Link>
      <Link to="/itemlist"></Link>
      <Link to="/lounge"></Link> */}
    </div>
  );
};

export default Main;
