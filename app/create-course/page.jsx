"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";

// Components:
import Navbar from "../../components/Navbar";
import Topic from "../../components/CreateCourse/Topic";
import Level from "../../components/CreateCourse/Level";
import Title from "../../components/CreateCourse/Title";

const Page = () => {
  const [user, setUser] = useState();
  const router = useRouter();

  const stepsCount = 5;
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    topic: null,
    level: null,
    title: null,
  });
  const progress = ((currentStep - 1) / stepsCount) * 100;

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

  const handleContinue = (stepData) => {
    setCourseData((prevData) => {
      const updatedData = { ...prevData, ...stepData };
      return updatedData;
    });
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  return (
    <div className="min-h-screen w-[calc(100vw-)] bg-[#121212] text-white">
      <Navbar user={user} fixed={true} />
      <div className="flex h-screen justify-between pt-[64px]">
        <div className="w-1/2 px-10 py-6">
          <div className="flex items-center justify-between">
            <p className="text-[20px]">Create Course</p>
            <div className="h-2.5 w-[200px] rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-2.5 rounded-full bg-blue-600"
                style={{ width: `${progress || 0}%` }}
              ></div>
            </div>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-center">
            {currentStep === 1 && (
              <Topic onContinue={(topic) => handleContinue(topic)} />
            )}
            {currentStep === 2 && (
              <Level
                onContinue={(level) => handleContinue(level)}
                onBack={handleBack}
              />
            )}
            {currentStep === 3 && (
              <Title
                onContinue={(title) => handleContinue(title)}
                onBack={handleBack}
                courseData={courseData}
              />
            )}
          </div>
          <div className="mt-4 flex w-full justify-between">
            <button
              className="rounded bg-gray-500 p-2 text-white"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </button>
            <div className="h-2.5 w-[200px] rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-2.5 rounded-full bg-blue-600"
                style={{ width: `${progress || 0}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="relative hidden md:block md:w-1/2">
          <Image
            src="/bg.webp"
            alt="Sign in image"
            layout="fill"
            objectFit="cover"
            className="drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
