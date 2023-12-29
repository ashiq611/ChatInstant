import { useEffect, useState } from "react";
import CreatePost from "../../components/CreatePost";
import HomeNav from "../../components/HomeNav";
import PostCard from "../../components/PostCard";
import { getDatabase, onValue, ref } from "firebase/database";

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
  const database = getDatabase();

  const [posts, setPosts] = useState();

 
  // function createMarkup(c) {
  //   return { __html: c };
  // }

    useEffect(() => {
      const blogRef = ref(database, "blogs");
      let bloglist = [];
      onValue(blogRef, (snapShot) => {
        snapShot.forEach((blog) => {
          bloglist.push({
            ...blog.val(),
            id: blog.key,
          });

          setPosts(bloglist);
        });
      });
    }, [database]);

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
            <CreatePost />
            <div>
              {posts?.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
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
