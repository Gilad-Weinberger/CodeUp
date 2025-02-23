"use client";

import { useState } from "react";

const Level = ({ onContinue, onBack }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const levelOptions = ["Beginner", "Intermediate", "Advanced"];

  const handleLevelClick = (level) => {
    setSelectedLevel(selectedLevel === level ? null : level);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-gray-900 p-8 text-white shadow-lg">
      <ul className="space-y-2">
        {levelOptions.map((level, index) => (
          <li
            key={index}
            className={`cursor-pointer rounded p-3 transition duration-200 ease-in-out ${
              selectedLevel === level
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-700"
            }`}
            onClick={() => handleLevelClick(level)}
          >
            {level}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between gap-6">
        <button
          className="w-1/3 rounded bg-gray-500 p-3 text-white transition hover:bg-gray-600"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="w-2/3 rounded bg-blue-500 p-3 text-white transition hover:bg-blue-600 disabled:opacity-50"
          disabled={!selectedLevel}
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
