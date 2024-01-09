import { PiDotsThreeCircle } from "react-icons/pi";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";
import { useSelector } from 'react-redux';
import Comment from "./Comment";


const PostCard = ({post}) => {
  const database = getDatabase();
  const user = useSelector((state) => state.userLoginInfo.userInfo);
  const { id, author, authorName, authorProfile, content, date, thumbnail } =
    post;
  const [likes, setLikes] = useState(0);
 const [userLiked, setUserLiked] = useState(false);
 const [commentShow, setCommentShow] = useState(false)

  useEffect(() => {
    const postref = ref(database, `blogs/${id}`);

    onValue(postref, (snapshot) => {
      const data = snapshot.val();
      setLikes(data?.likes || 0);
    });
  }, []);

  // read data in realtime firebase
  useEffect(() => {
    const userRef = ref(database, "likes");

    onValue(userRef, (snapShot) => {
      let hasLiked = false;
      snapShot.forEach((like) => {
        if (id === like.val().postID && user.uid === like.val().userID) {
          hasLiked = true;
        }
      });
      setUserLiked(hasLiked);
    });
  }, [id, user.uid]);



  const handleLike = () => {
    const postref = ref(database, `blogs/${id}`);

    const newLikes = likes + 1;
    update(postref, {
      likes: newLikes,
    });

    // Set the like data for the specific user and post
    set(push(ref(database, "likes")), {
      userID: user.uid,
      postID: id,
    });

    // Update the userLiked state //i can remove this step////////////////////////////////////
    setUserLiked(true);
  };

 const handleUnLike = () => {
   const postref = ref(database, `blogs/${id}`);
   const likesRef = ref(database, `likes`);

   const newLikes = likes - 1;

   update(postref, {
     likes: newLikes,
   });

   onValue(likesRef, (snapShot) => {
     snapShot.forEach((like) => {
       if (id === like.val().postID && user.uid === like.val().userID) {
         remove(ref(database, `likes/${like.key}`));
       }
     });
     // Update the userLiked state
     setUserLiked(false);
   });
 };

  // console.log(ref(database, `blogs/${id}/userLikes`));

  function createMarkup(c) {
    return { __html: c };
  }
  return (
    <div className="p-10 m-5 border border-2 border-zinc-300 rounded-lg">
      <div className="flex gap-5 justify-between">
        <div className="flex gap-5">
          <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
            <img
              src={authorProfile}
              alt="user-avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2>{authorName}</h2>
            <p>{date}</p>
          </div>
        </div>
        <div className="text-2xl">
          <PiDotsThreeCircle />
        </div>
      </div>
      <div>
        <div dangerouslySetInnerHTML={createMarkup(content)}></div>
        <div className="w-40">
          <img src={thumbnail} alt="" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-5">
        {userLiked ? (
          <button
            onClick={handleUnLike}
            className="px-5 py-2 bg-stone-300 rounded-lg"
          >
            {likes}
            <BiDislike />
          </button>
        ) : (
          <button
            onClick={handleLike}
            className="px-5 py-2 bg-stone-300 rounded-lg"
          >
            {likes}
            <BiLike />
          </button>
        )}
        <button onClick={() => setCommentShow(!commentShow)} className="px-5 py-2 bg-stone-300 rounded-lg">
          <FaRegCommentDots />
        </button>
        
      </div>
      <div className={commentShow ? "transition-comment" : "comment-hidden"}>

      {
        commentShow &&
        <Comment postID={id}/>
      }
      </div>
    </div>
  );
};

export default PostCard;
