import { PiDotsThreeCircle } from "react-icons/pi";
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";

const PostCard = ({post}) => {
    const {id, author, authorName, authorProfile, content, date,thumbnail} = post;

    
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
        <div dangerouslySetInnerHTML={createMarkup(content)}>
          
        </div>
        <div className="w-40">
          <img src={thumbnail} alt="" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-5">
        <button className="px-5 py-2 bg-stone-300 rounded-lg">
          <BiLike />
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
