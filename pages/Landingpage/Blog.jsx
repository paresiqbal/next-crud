import Message from "../../components/Message";

import { useEffect, useState } from "react";
import Link from "next/link";

import { db } from "../../utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function Blog() {
  //Create a state with post
  const [allPost, setAllPost] = useState([]);

  const getPost = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPost(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribe;
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="container sm:flex sm:flex-col">
      <h1 className="text-4xl font-bold flex justify-center p-10 underline decoration-purple-700">
        Blog's Feed
      </h1>
      {allPost.map((post) => (
        <Message key={post.id} {...post}>
          <Link href={{ pathname: `/${post.id}`, query: { ...post } }}>
            <button>
              {post.comments?.lenght < 0 ? post.comments?.lenght : 0} coments
            </button>
          </Link>
        </Message>
      ))}
    </div>
  );
}
