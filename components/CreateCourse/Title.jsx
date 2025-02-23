"use client";

import { useState } from "react";

const Title = ({ onContinue, onBack, courseData }) => {
  const [courseTitle, setCourseTitle] = useState(
    `${courseData.level} ${courseData.topic.name}`,
  );

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-gray-900 p-8 text-white shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">Enter Course Title</h2>
      <input
        type="text"
        className="w-full rounded bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type course name..."
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
      />
      <div className="mt-6 flex justify-between gap-6">
        <button
          className="w-1/3 rounded bg-gray-500 p-3 text-white transition hover:bg-gray-600"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="w-2/3 rounded bg-blue-500 p-3 text-white transition hover:bg-blue-600 disabled:opacity-50"
          disabled={!courseTitle.trim()}
          onClick={() => {
            onContinue({ courseTitle });
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Title;
