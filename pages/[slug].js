import Message from "../components/Message";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { auth, db } from "../utils/firebase";
import { async } from "@firebase/util";
import {
  arrayUnion,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export default function Details() {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);

  //Submit message
  const submitMessage = async () => {
    //Check if the user is logged
    if (!auth.currentUser) return router.push("/Login ");
    if (!message) {
      toast.error("Jangan di kosongin dong 😒", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });

      return;
    }

    const docRef = doc(db, "posts", routeData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        username: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });

    setMessage("");
  };

  //Get comments
  const getComments = async () => {
    const docRef = doc(db, "posts", routeData.id);
    const docSnap = await getDoc(docRef);

    setAllMessage(docSnap.data().comments);
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, []);

  return (
    <div>
      <Message {...routeData}>
        <div className="my-4">
          <div className="flex ">
            <input
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              value={message}
              placeholder="Kirim Pesan 😁"
              className="bg-grey-800 w-full p-2 text-sm "
            />
            <button
              onClick={submitMessage}
              className="bg-thrid-yellow text-cyan-600 py-2 px-4 text-sm "
            >
              Submit
            </button>
          </div>

          <div className="py-6">
            <h2 className="font-bold">Comments</h2>
            {allMessage?.map((message) => (
              <div
                className="bg-white p-4 my-4 border-2 rounded-lg"
                key={message.time}
              >
                <div className="flex items-center gap-2 mb-4">
                  <img className="w-8 rounded-full" src={message.avatar} />
                  <h2>{message.username}</h2>
                </div>
                <h2>{message.message}</h2>
              </div>
            ))}
          </div>
        </div>
      </Message>
    </div>
  );
}
