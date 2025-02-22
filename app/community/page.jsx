"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Components:
import Navbar from "../../components/Navbar";

const Page = () => {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/");
      }
      setUser(user);
      console.log(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen w-[calc(100vw-)] bg-[#121212] text-white">
      <Navbar user={user} fixed={true} />
      <div className="flex justify-between px-24 py-5 pt-[84px]">Community</div>
    </div>
  );
};

export default Page;
