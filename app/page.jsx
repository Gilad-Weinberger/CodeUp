"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export default function Home() {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard");
      }
      setUser(user);
      console.log(user);
    });

    // Cleanup subscription on unmount
    return async () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen w-screen bg-[#121212] text-white">
      <Navbar />
      <Hero />
    </div>
  );
}
