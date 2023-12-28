import CreatePost from "../../components/CreatePost";
import HomeNav from "../../components/HomeNav";

// import { useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// import { useNavigate } from "react-router-dom";
// // import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { ref as dbref, set, push, getDatabase } from "firebase/database";

const Newsfeed = () => {
  // // file uplaod in firebase starts
  // const storage = getStorage();
  // //  update profile in realtime db
  // const database = getDatabase();

  // const [blogs, setBlogs] = useState();

 
  // function createMarkup(c) {
  //   return { __html: c };
  // }

  return (
    <div>
      <HomeNav />
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="post hidden lg:block">
            <h2>user</h2>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div>
            <CreatePost/>
            <div>
              
            </div>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="suggestion  hidden lg:block">
            <h2>sug</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsfeed;
