import React, { useEffect, useState } from "react";
import { MdAdd, MdCancel, MdDelete } from "react-icons/md";
import {
  getFirestore,
  collection,
  deleteDoc,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { app } from "../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const db = getFirestore(app);

const Announcements = () => {
  const [makePost, setMakePost] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const signedInUser = useSelector((state) => state.signedInUser);
  const isAdmin = (signedInUser == 'admin@mail.com');

  const togglePost = () => {
    setMakePost(!makePost);
  };

  const createPost = () => {
    try {
      const postRef = collection(db, "posts");
      var currDate = new Date();
      var currTime = currDate.getTime();
      if(postContent != '') {
        setDoc(doc(postRef, `${currTime}`), {
        id: `${currTime}`,
        post: postContent,
        date: `${currDate.getDate()}`,
        month: `${currDate.getMonth() + 1}`,
        year: `${currDate.getFullYear()}`,
        hour: `${currDate.getHours()}`,
        minute: `${currDate.getMinutes()}`,
      });
      
      toast.success("Posted!");
      setPostContent("");
      fetchPosts();
    } else{
      toast.error("Post can't be empty!");
      }
    } catch (e) {
      toast.error(e);
    }
  };

  const getAllPosts = async () => {
    const items = await getDocs(query(collection(db, "posts"), orderBy("id")));
    console.log(items.docs.map((doc) => doc.data()));
    return items.docs.map((doc) => doc.data());
  };

  const fetchPosts = async () => {
    await getAllPosts().then((data) => {
      setPosts(data.reverse());
    });
  };
  useEffect(() => {
    fetchPosts();
  }, []);

//   const deletePost = async (id) =>
//     await db.collection('posts').doc(`${id}`).delete();

    const deletePost = async (id) => {
        console.log(id);
        await deleteDoc(doc(db, "posts", id)).then(console.log("Done!"), fetchPosts());
      }
  return (
    <div className=" text-center fex-col justify-center w-full mb-3 ">
      <h1 className="text-cust-red">Announcements</h1>
      { isAdmin && (<div className=" w-full">
        {!makePost ? (
          <button
            onClick={togglePost}
            className="cursor-pointer items-center justify-center flex hover:shadow-cust-red text-center w-full shadow-md bg-cust-red border border-cust-red text-cust-white pt-1 pb-1 rounded-md"
          >
            {" "}
            <MdAdd /> New Announcement
          </button>
        ) : (
          <button
            onClick={togglePost}
            className="cursor-pointer  justify-center flex border items-center border-cust-red hover:shadow-cust-red text-center w-full  shadow-md bg-transparent text-cust-red pt-1 pb-1 rounded-md"
          >
            {" "}
            <MdCancel /> Cancel
          </button>
        )}
      </div>)}
      {makePost && (
        <div className=" w-80 mt-2 mb-2">
          <textarea
            value={postContent}
            onChange={(e) => {
              setPostContent(e.target.value);
            }}
            name="newpost"
            placeholder="Enter the announcement!"
            id="newpost"
            cols="30"
            rows="3"
            className=" required w-full rounded-md bg-transparent focus:outline-none outline-none"
          >
            {" "}
          </textarea>
          <button
            onClick={createPost}
            className="cursor-pointer  justify-center flex hover:shadow-cust-red text-center w-1/3  shadow-md bg-cust-red text-cust-white r-0 pt-1 pb-1 rounded-md"
          >
            POST
          </button>
        </div>
      )}
      <div className=" flex flex-col">
        {posts &&
          posts.map((post) => ( post.post != '' &&
            <div
              key={post.id}
              className=" p-2 flex flex-col items-start justify-around bg-white rounded-md m-2"
            >
              <p className=" text-sm">
                {" "}
                {post.date}/{post.month}/{post.year} {post.hour}:{post.minute}{" "}
              </p>
              <div className="flex justify-between w-full items-center">
                <p> {post.post}</p>
                { isAdmin && (<button
                  onClick={ () => deletePost(post.id)}
                  className=" w-4 h-4 rounded-full bg-cust-red  text-white"
                >
                  {" "}
                  <MdDelete />{" "}
                </button>)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Announcements;
