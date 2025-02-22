"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { auth, googleProvider, githubProvider } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithGithub] = useSignInWithGithub(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(email, password);
      sessionStorage.setItem("user", JSON.stringify(res.user));

      setEmail("");
      setPassword("");
      setConfirmPassword("");

      router.push("/dashboard");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const res = await signInWithGoogle();
      sessionStorage.setItem("user", JSON.stringify(res.user));
      router.push("/dashboard");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleGithubSignUp = async () => {
    try {
      const res = await signInWithGithub();
      sessionStorage.setItem("user", JSON.stringify(res.user));
      router.push("/dashboard");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden md:block md:w-1/2">
        <Image
          src="/bg.webp"
          alt="Sign up image"
          layout="fill"
          objectFit="cover"
          className="drop-shadow-xl"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center bg-gray-100 md:w-1/2">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
        >
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Sign Up
          </h2>
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded bg-gray-200 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded bg-gray-200 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-3">
            <label className="mb-2 block text-gray-700">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full rounded bg-gray-200 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {error && <p className="mb-5 text-center text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full rounded bg-indigo-500 p-3 font-semibold text-white hover:bg-indigo-600"
          >
            Sign Up
          </button>
          <button
            onClick={handleGoogleSignUp}
            className="mt-4 flex w-full max-w-md items-center justify-center rounded border-2 border-indigo-500 p-3 font-semibold text-black"
          >
            <Image
              src="/google.svg"
              alt="Google icon"
              width={20}
              height={20}
              className="mr-2"
            />
            Sign Up with Google
          </button>
          <button
            onClick={handleGithubSignUp}
            className="mt-4 flex w-full max-w-md items-center justify-center rounded border-2 border-indigo-500 p-3 font-semibold text-black"
          >
            <Image
              src="/github.svg"
              alt="Github icon"
              width={24}
              height={24}
              className="-ml-0.5 mr-2"
            />
            Sign Up with Github
          </button>
        </form>
        <p className="mt-4 text-gray-700">
          Already have an account?{" "}
          <Link href="/signin" className="text-indigo-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
