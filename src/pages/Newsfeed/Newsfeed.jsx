import { useEffect, useState } from "react";
import CreatePost from "../../components/CreatePost";
import HomeNav from "../../components/HomeNav";
import PostCard from "../../components/PostCard";
import { get, getDatabase, onValue, ref } from "firebase/database";
import UserProfile from "../../components/UserProfile";
import GroupList from "../../components/GroupList";

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

  const [posts, setPosts] = useState([]);

 
 
    useEffect(() => {
       const fetchData = async () => {
         const blogRef = ref(database, "blogs");

         try {
           const snapshot = await get(blogRef);
           const bloglist = [];

           snapshot.forEach((blog) => {
             bloglist.push({
               ...blog.val(),
               id: blog.key,
             });
           });
          
           setPosts(bloglist);
         } catch (error) {
           console.error("Error fetching data:", error);
         }
       };

       fetchData();
    }, [database]);
  
    // useEffect(() => {
    //   const blogRef = ref(database, "blogs");
    //   let bloglist = [];

    //   onValue(blogRef, (snapShot) => {
    //     snapShot.forEach((blog) => {
    //       bloglist.push({
    //         ...blog.val(),
    //         id: blog.key,
    //       });
    //     });

    //     // Move setPosts outside the forEach loop
    //     setPosts((prevPosts) => [...prevPosts, ...bloglist]);
    //   });
    // }, [database]);

    
  const updatePosts = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div>
      <HomeNav />
      <div className="container mx-auto">
        <div className="flex justify-between ">
          <div className="post h-screen sticky top-5  mt-5 hidden lg:block">
            <UserProfile />
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div>
            <CreatePost updatePosts={updatePosts} />
            <div className="mb-20">
              {posts?.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="suggestion h-screen sticky top-5 w-1/4 hidden lg:block">
            <GroupList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsfeed;
