import { PiDotsThreeCircle } from "react-icons/pi";
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref, update } from "firebase/database";
import { useSelector } from 'react-redux';


const PostCard = ({post}) => {
  const database = getDatabase();
    const user = useSelector((state) => state.userLoginInfo.userInfo);
    const {id, author, authorName, authorProfile, content, date,thumbnail} = post;
    const [likes, setLikes] = useState(0);
    const [userLiked, setUserLiked] = useState(false);


    useEffect(() => {
      const postref = ref(database, `blogs/${id}`);

      onValue(postref, (snapshot) => {
        const data = snapshot.val();
        setLikes(data?.likes || 0);
        setUserLiked(data?.userLikes?.[user.uid] || false);

      })
    }, [])

   

    const handleLike = () => {

      const postref = ref(database, `blogs/${id}`);
      const newLikes = userLiked ? likes -1 : likes + 1;
      update(postref, {
        likes: newLikes,
        userLikes: { ...(userLiked || {}), [user.uid]: !userLiked },
      });


    }

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
        <button onClick={handleLike} className="px-5 py-2 bg-stone-300 rounded-lg">
          {likes}
          {userLiked ? "Unlike" : <BiLike />}
        </button>
        <button className="px-5 py-2 bg-stone-300 rounded-lg">
          <FaRegCommentDots />
        </button>
        <button className="px-5 py-2 bg-stone-300 rounded-lg">
          <FaShare />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
