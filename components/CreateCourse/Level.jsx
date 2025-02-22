"use client";

import { useState } from "react";

const Level = ({ onContinue, onBack }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
  };

  return (
    <div className="flex max-w-[60%] flex-col">
      <ul className="list-disc pl-5">
        {["Beginner", "Intermediate", "Advanced"].map((level, index) => (
          <li
            key={index}
            className={`mb-2 cursor-pointer ${
              selectedLevel === level ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handleLevelClick(level)}
          >
            {level}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex w-full justify-between gap-4">
        <button className="rounded bg-gray-500 p-2 text-white" onClick={onBack}>
          Back
        </button>
        <button
          className="rounded bg-blue-500 p-2 text-white"
          style={{ visibility: selectedLevel ? "visible" : "hidden" }}
          onClick={() => {
            onContinue({ level: selectedLevel });
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Level;
