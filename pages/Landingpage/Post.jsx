import { auth, db } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

export default function Post() {
  //Form state
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const routeData = route.query;

  //Submit post
  const submitPost = async (e) => {
    e.preventDefault(); //Prevent reload

    //Checking description is black or not
    if (!post.description) {
      toast.error("Deskripsi nya kosong, lupa memasukan kata 🤔 ?", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });

      return;
    }

    //Checking description more then 400
    if (post.description.length > 400) {
      toast.error("Ups kamu memasukan terlalu banyak kata 😱", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });

      return;
    }

    //Edit Post nested ??
    if (post?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id);
      const updatePost = { ...post, timestamp: serverTimestamp() };

      await updateDoc(docRef, updatePost);

      return route.push("/");
    } else {
      //Make new blog
      const collectionBlog = collection(db, "posts");
      await addDoc(collectionBlog, {
        ...post,
        timestamp: serverTimestamp(),

        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });

      setPost({ description: "" });
      toast.success("Post sudah di buat 🚀", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return route.push("/Landingpage/Blog");
    }
  };

  //Checking user
  const checkUser = async () => {
    if (loading) return;
    if (!user) route.push("/Login");

    if (routeData.id) {
      setPost({ description: routeData.description, id: routeData.id });
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="container my-20 p-12 shadow-lg max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">
          {post.hasOwnProperty("id") ? "Edit your post" : "Create a new post"}
        </h1>
        <div className="py-2 ">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm"
          ></textarea>
          <p
            className={`text-whtie font-medium text-sm ${
              post.description.length > 400 ? "text-red-600" : ""
            }`}
          >
            {post.description.length}/400
          </p>
        </div>
        <button
          type="submit"
          className="bg-primary-green w-full font-medium text-xl p-2 my-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
