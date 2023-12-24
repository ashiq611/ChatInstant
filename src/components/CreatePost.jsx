import React from 'react';
import { MdAddPhotoAlternate } from "react-icons/md";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { ref as dbref, set, push, getDatabase } from "firebase/database";

const CreatePost = () => {
  // file uplaod in firebase starts
  const storage = getStorage();
  //  update profile in realtime db
  const database = getDatabase();

  const [blogs, setBlogs] = useState();

  const [thumbnail, setThumbnail] = useState();
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.userLoginInfo.userInfo);

  const addPost = async () => {
    if (
      blogs.title === "" ||
      blogs.category === "" ||
      blogs.content === "" ||
      !thumbnail
    ) {
      // toast.error("Please Fill All Fields");
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
            // title: blogs.title,
            // category: blogs.category,
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

          // navigate("/profile");
          // toast.success("Post Added Successfully");
        } catch (error) {
          // toast.error(error.message);
          console.error(error);
        }
      });
    });
  };

  function createMarkup(c) {
    return { __html: c };
  }
  return (
    <div className="user flex justify-center items-center gap-5 flex-wrap border border-black p-5">
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="button">
        <button
          onClick={() => document.getElementById("my_modal_3").showModal()}
          className="px-10 py-5 bg-slate-400 rounded-md"
        >
          whats your mind?
        </button>
      </div>
      <div className="upload text-4xl">
        <button
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <MdAddPhotoAlternate />
        </button>
      </div>
      <div>
        <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div>
              <div className="container mx-auto max-w-3xl p-4 bg-gray-800 text-white rounded-md shadow-lg">
                <div className="mb-8">
                  {/* Thumbnail */}
                  {thumbnail && (
                    <img
                      className="w-full rounded-md mb-4"
                      src={thumbnail ? URL.createObjectURL(thumbnail) : ""}
                      alt="thumbnail"
                    />
                  )}
                  <div>
                    <input
                      onChange={(e) => setThumbnail(e.target.files[0])}
                      type="file"
                      className="file-input file-input-bordered file-input-warning w-full max-w-xs"
                    />
                  </div>

                  {/* Title and Category Inputs */}
                  {/* <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 py-5 lg:py-10">
                          <input
                            type="text"
                            placeholder="Title"
                            className="input input-bordered input-accent w-full lg:w-1/2"
                            value={blogs.title}
                            onChange={(e) =>
                              setBlogs({ ...blogs, title: e.target.value })
                            }
                          />
                          <input
                            type="text"
                            placeholder="Category"
                            className="input input-bordered input-accent w-full lg:w-1/2"
                            value={blogs.category}
                            onChange={(e) =>
                              setBlogs({ ...blogs, category: e.target.value })
                            }
                          />
                        </div> */}

                  {/* TinyMCE Editor */}
                  <Editor
                    apiKey="jtgj35incgax88hnujwssjevhvfy5kisj7vowfjwhsc34xth"
                    onEditorChange={(newValue, editor) => {
                      setBlogs(newValue);
                      setText(editor.getContent({ format: "text" }));
                    }}
                    onInit={(evt, editor) => {
                      setText(editor.getContent({ format: "text" }));
                    }}
                    init={{
                      plugins:
                        "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinydrive tinymcespellchecker typography visualblocks visualchars wordcount",
                    }}
                  />

                  {/* Submit Button */}
                  <button onClick={addPost} className="btn mt-8">
                    Send
                  </button>

                  {/* Preview Section */}
                  <div className="mt-8">
                    <h1 className="text-center mb-4 text-2xl font-semibold">
                      Preview
                    </h1>
                    <div
                      dangerouslySetInnerHTML={createMarkup(blogs)}
                      className="prose text-white"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default CreatePost;