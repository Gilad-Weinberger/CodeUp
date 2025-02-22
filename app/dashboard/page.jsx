"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Components:
import Navbar from "../../components/Navbar";
import DashboardProfile from "../../components/DashboardProfile";
import DashboardOverview from "../../components/DashboardOverview";
import DashboardCourses from "../../components/DashboardCourses";

const Page = () => {
  const [user, setUser] = useState();
  const [dashboardView, setDashboardView] = useState("overview");
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
      <div className="flex justify-between px-24 py-5 pt-[84px]">
        <DashboardProfile />
        <div className="w-[calc(100%-230px)]">
          <div className="mb-4 flex w-[320px] items-center gap-5 rounded-md bg-color-bg-main">
            <p
              className={`cursor-pointer rounded-md px-4 py-1.5 text-[12px] ${
                dashboardView === "overview" ? "bg-white text-black" : ""
              }`}
              onClick={() => setDashboardView("overview")}
            >
              Overview
            </p>
            <p
              className={`cursor-pointer rounded-md px-4 py-1.5 text-[12px] ${
                dashboardView === "courses" ? "bg-white text-black" : ""
              }`}
              onClick={() => setDashboardView("courses")}
            >
              Courses
            </p>
            <p
              className={`cursor-pointer rounded-md px-4 py-1.5 text-[12px] ${
                dashboardView === "achievements" ? "bg-white text-black" : ""
              }`}
              onClick={() => setDashboardView("achievements")}
            >
              Achievements
            </p>
          </div>
          {/* Render different content based on the dashboardView state */}
          {dashboardView === "overview" && <DashboardOverview />}
          {dashboardView === "courses" && <DashboardCourses />}
          {dashboardView === "achievements" && <div>Achievements Content</div>}
        </div>
      </div>
    </div>
  );
};

export default Page;
