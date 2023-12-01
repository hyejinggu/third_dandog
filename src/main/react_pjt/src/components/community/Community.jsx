import Lounge from "./Lounge";
import Event from "./Event";
import Neighborhood from "./Neighborhood";
import CreatePost from "./CreatePost";
import CreateReview from "./CreateReview";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

export const CreatePostContext = React.createContext();

const Community = () => {
  const [loungeArray, setLoungeArray] = useState([]);
  useEffect(() => {
    axios
      .get("/lounge/allLoungeList")
      .then((res) => {
        setLoungeArray(res.data);
        console.log(res.data);
      })
      .catch((res) => console.log(res));
  }, []);
  return (
    <div>
      <CreatePostContext.Provider value={{ loungeArray }}>
        <Routes>
          <Route path="/*" element={<Lounge />} />
          <Route path="/lounge/*" element={<Lounge />} />
          <Route path="/event/*" element={<Event />} />
          <Route path="/neighborhood/*" element={<Neighborhood />} />
          <Route path="/createpost/" element={<CreatePost />} />
          <Route path="/createreview/" element={<CreateReview />} />
        </Routes>
      </CreatePostContext.Provider>
    </div>
  );
};

export default Community;
