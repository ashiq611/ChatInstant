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

  // const [thumbnail, setThumbnail] = useState();
  // const [text, setText] = useState("");
  // const navigate = useNavigate();
  // const user = useSelector((state) => state.userLoginInfo.userInfo);

  // const addPost = async () => {
  //   if (
  //     blogs.title === "" ||
  //     blogs.category === "" ||
  //     blogs.content === "" ||
  //     !thumbnail
  //   ) {
  //     // toast.error("Please Fill All Fields");
  //     return;
  //   }
  //   uploadImage();
  // };

  // const uploadImage = () => {
  //   const storageRef = ref(storage, `blogimage/${thumbnail.name}`);

  //   uploadBytes(storageRef, thumbnail).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       try {
  //         const newBlogEntry = {
  //           // title: blogs.title,
  //           // category: blogs.category,
  //           content: blogs,
  //           author: user.uid,
  //           authorName: user.displayName,
  //           authorProfile: user.photoURL,
  //           thumbnail: url,
  //           date: new Date().toLocaleString("en-US", {
  //             month: "short",
  //             day: "2-digit",
  //             year: "numeric",
  //           }),
  //         };

  //         const blogsRef = dbref(database, "blogs");
  //         const newEntryRef = push(blogsRef);

  //         set(newEntryRef, newBlogEntry);
          

  //         // navigate("/profile");
  //         // toast.success("Post Added Successfully");
  //       } catch (error) {
  //         // toast.error(error.message);
  //         console.error(error);
  //       }
  //     });
  //   });
  // };

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
