import { getDatabase, onValue, push, set, ref } from 'firebase/database';

import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Comment = ({postID}) => {
     const database = getDatabase();
      const user = useSelector((state) => state.userLoginInfo.userInfo);
      const [AllBlogs, setAllBlogs] = useState({});
      const [AllComment, setAllComment] = useState([]);
   
      const [comment, setComment] = useState("");

       const handleComment = () => {
         set(push(ref(database, "comment")), {
           name: user.displayName,
           nameID: user.uid,
           comment: comment,
           authorID: postID,
           date: new Date().toLocaleString("en-US", {
             month: "short",
             day: "2-digit",
             year: "numeric",
           }),
         });
        
         setComment("");
       };

       useEffect(() => {
         const commentRef = ref(database, "comment");
         onValue(commentRef, (snapshot) => {
           let comments = [];

           snapshot.forEach((c) => {
             if (postID == c.val().authorID) {
               comments.push({
                 ...c.val(),
                 id: c.key,
               });
             }

             setAllComment(comments);
           });
         });
       }, []);
    return (
      <div>
        {/* Comments */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          {AllComment.map((c) => (
            <div key={c.id}>
              <div className="flex items-center mb-2">
                <p className="text-sm font-medium uppercase">
                  {c.name} - {c.date}
                </p>
              </div>
              <p className="mb-4">{c.comment}</p>
            </div>
          ))}
        </div>

        {/* Comment Box */}
        <div className="mt-4 p-4 bg-white rounded-md">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Your Comment</span>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
            ></textarea>
            <div className="label">
              <span className="label-text-alt">Your bio</span>
            </div>
          </label>
          <button
            onClick={handleComment}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Post Comment
          </button>
        </div>
      </div>
    );
};

export default Comment;