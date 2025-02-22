"use client";

import { useState, useEffect } from "react";
import { getAllObjects } from "../../lib/dbFunctions";

const Topic = ({ onContinue }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      const fetchedTopics = await getAllObjects("topics");
      setTopics(fetchedTopics);
      setFilteredTopics(fetchedTopics);
    };

    fetchTopics();
  }, []);

  useEffect(() => {
    setFilteredTopics(
      topics.filter((topic) =>
        topic.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, topics]);

  const handleTopicClick = (topic) => {
    if (selectedTopic === topic) {
      setSelectedTopic(null);
    } else {
      setSelectedTopic(topic);
    }
  };

  return (
    <div className="flex max-w-[60%] flex-col">
      <input
        type="text"
        placeholder="Search topics..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full rounded bg-gray-800 p-2 text-white"
      />
      <ul className="list-disc pl-5">
        {filteredTopics.map((topic, index) => (
          <li
            key={index}
            className={`mb-2 cursor-pointer ${
              selectedTopic === topic ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handleTopicClick(topic)}
          >
            {topic.name}
          </li>
        ))}
      </ul>
      <button
        className="mt-4 rounded bg-blue-500 p-2 text-white"
        style={{ visibility: selectedTopic ? "visible" : "hidden" }}
        onClick={() => onContinue({ topic: selectedTopic })}
      >
        Continue
      </button>
    </div>
  );
};

export default Topic;
