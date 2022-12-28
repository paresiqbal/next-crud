import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const [user, loading] = useAuthState(auth);
  return (
    <div className="p-5 shadow-md flex justify-around text-xl">
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/Landingpage/Blog">Blog</Link>
      </div>
      <div>
        {!user && (
          <Link
            href="/Login"
            className=" bg-primary-green px-5 py-2 rounded-lg"
          >
            Login
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link
              href="/Landingpage/Post"
              className=" bg-secondary-blue px-5 py-2 rounded-lg"
            >
              <button>Post</button>
            </Link>
            <Link href="/Landingpage/Profile">
              <img
                className="w-10 rounded-full cursor-pointer"
                src={user.photoURL}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
