import { MdAddPhotoAlternate } from "react-icons/md";
import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ref as dbref, set, push, getDatabase } from "firebase/database";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const storage = getStorage();
  const database = getDatabase();

  const [blogs, setBlogs] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const user = useSelector((state) => state.userLoginInfo.userInfo);
  const navigate = useNavigate();

  const addPost = async () => {
    if (!blogs || !thumbnail) {
      // You can show a toast or alert for better user experience
      return;
    }

    uploadImage();
  };

  const uploadImage = () => {
    const storageRef = ref(storage, `blogimage/${thumbnail.name}`);

    uploadBytes(storageRef, thumbnail).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        try {
          const newBlogEntry = {
            content: blogs,
            author: user.uid,
            authorName: user.displayName,
            authorProfile: user.photoURL,
            thumbnail: url,
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
          };

          const blogsRef = dbref(database, "blogs");
          const newEntryRef = push(blogsRef);

          set(newEntryRef, newBlogEntry);
          setBlogs("");
          setThumbnail(null);

          // Redirect to the profile page or any other page you prefer
          navigate("/newsfeed");
        } catch (error) {
          console.error(error);
        }
      });
    });
  };

  return (
    <div className="flex items-center justify-center gap-5 p-5 border border-indigo-500/75 rounded-lg mt-5 shadow-lg shadow-indigo-500">
      <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
        <img
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          alt="user-avatar"
          className="w-full h-full object-cover"
        />
      </div>
      <button
        onClick={() => document.getElementById("my_modal_3").showModal()}
        className="px-10 py-5 bg-slate-400 rounded-md"
      >
        What's on your mind?
      </button>
      <button
        onClick={() => document.getElementById("my_modal_3").showModal()}
        className="text-4xl"
      >
        <MdAddPhotoAlternate />
      </button>

      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="container mx-auto max-w-3xl p-4 bg-white  rounded-md shadow-lg">
          <div className="mb-8">
            {thumbnail && (
              <div className="flex justify-center items-center">
                <img
                  className="w-20 rounded-md mb-4"
                  src={thumbnail ? URL.createObjectURL(thumbnail) : ""}
                  alt="thumbnail"
                />
              </div>
            )}
            <div className="flex flex-col gap-5">
              <div>
                <input
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  type="file"
                  className="file-input file-input-bordered file-input-warning w-full max-w-xs"
                />
              </div>
              <ReactQuill theme="snow" value={blogs} onChange={setBlogs} />
            </div>
            <button onClick={addPost} className="btn mt-8">
              Post
            </button>
            <div className="mt-8">
              <h1 className="text-center mb-4 text-2xl font-semibold">
                Preview
              </h1>
              <div
                dangerouslySetInnerHTML={{ __html: blogs }}
                className="prose"
              ></div>
            </div>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CreatePost;
