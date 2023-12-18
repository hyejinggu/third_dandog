import Lounge from "./Lounge";
import Event from "./Event";
import Neighborhood from "./Neighborhood";
import CreatePost from "./CreatePost";
import CreateReview from "./CreateReview";
import LoungePostDetail from "./LoungePostDetail";
import LoungePostEdit from "./LoungePostEdit";
import NeighborReviewEdit from "./NeighborReviewEdit";
import React, { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";

export const CreatePostContext = React.createContext();

const Community = () => {
  return (
    <div>
      <CreatePostContext.Provider
      // value={{ loungeArray }}
      >
        <Routes>
          <Route path="/*" element={<Lounge />} />
          <Route path="/lounge/*" element={<Lounge />} />
          <Route path="/loungepostdetail" element={<LoungePostDetail />} />
          <Route path="/loungepostedit" element={<LoungePostEdit />} />
          <Route path="/event/*" element={<Event />} />
          <Route path="/neighborhood/*" element={<Neighborhood />} />
          <Route path="/createpost/" element={<CreatePost />} />
          <Route path="/createreview/" element={<CreateReview />} />
          <Route path="/neighborreviewedit/" element={<NeighborReviewEdit />} />
        </Routes>
      </CreatePostContext.Provider>
    </div>
  );
};

export default Community;
