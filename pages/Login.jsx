import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Login() {
  // Redirect user to home and loading auth
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  //Sign with Google
  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {
      alert("Ups, something not right");
    }
  };

  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("login");
    }
  }, [user]);

  return (
    <div className="container shadow-xl mt-32 p-10 text-gray-700 rounded-lg w-auto">
      <h1 className="text-2xl font-medium ">Login</h1>
      <div className="py-4">
        <h3 className="py-4">Sign in with one of the providers</h3>
        <button
          onClick={GoogleLogin}
          className="text-white bg-gray-700 w-full font-medium rounded-lg flex justify-center p-4"
        >
          <FcGoogle className="text-2xl pr-2" />
          Sign with Google
        </button>
      </div>
    </div>
  );
}
