import { auth, db } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { async } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import Message from "../../components/Message";

import { FaTrash, FaRegEdit } from "react-icons/fa";

export default function Profile() {
  //Disable profile when logout
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);

  //See if user is out
  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("/Login");

    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribe;
  };

  //Delete post
  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);

    await deleteDoc(docRef);
  };

  //Get users data
  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold underline decoration-purple-700 py-5">
        Profile
      </h1>
      <div>
        {posts.map((post) => {
          return (
            <Message {...post} key={post.id}>
              <div className="flex gap-5 pt-4">
                <button
                  onClick={() => deletePost(post.id)}
                  className="flex items-center justify-center gap-1 text-cyan-600"
                >
                  <FaTrash /> Delete
                </button>
                <Link href={{ pathname: "/Landingpage/Post", query: post }}>
                  <button className="flex items-center justify-center gap-1  text-cyan-600">
                    <FaRegEdit />
                    Edit
                  </button>
                </Link>
              </div>
            </Message>
          );
        })}
      </div>

      <div className="py-5">
        <button
          onClick={() => auth.signOut()}
          className="bg-secondary-blue py-2 px-5 rounded-lg font-bold"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
