"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const DashboardCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const lessonsDone = 63;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        const data = await response.json();
        setCourses(data.courses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
        setError("Error fetching courses");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="mt-4 w-full">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="flex flex-wrap gap-5">
        {courses.map((course) => (
          <Link
            href={"/dashboard/courses/" + course.id}
            key={course.id}
            className="flex w-full gap-5 rounded-xl border border-white bg-[#252A31] p-5 md:w-[calc(50%-10px)]"
          >
            <Image
              src={"/logo.png"}
              alt="course-image"
              width={200}
              height={100}
              className="h-24 w-40 rounded-lg object-cover"
            />
            <div className="w-full">
              <p>{course.name}</p>
              <p className="text-[14px] text-color-gray">
                {course.description || "Description"}
              </p>
              <p className="mt-2 inline-block rounded-full bg-white px-2 py-0.5 text-[12px] text-black">
                {course.topic.name}
              </p>
              <p className="mt-1 text-[14px] text-color-gray">Progress</p>
              <div className="relative mt-1.5 h-2 w-full rounded bg-white">
                <div
                  className="absolute left-0 top-0 h-2 rounded bg-primary"
                  style={{ width: `${lessonsDone}%` }}
                ></div>
              </div>
              <p className="mt-2 text-[12px] text-color-gray">
                {lessonsDone}% Completed
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardCourses;
