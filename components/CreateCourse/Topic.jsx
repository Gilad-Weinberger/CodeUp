"use client";

import { useState, useEffect } from "react";
import { getAllObjects } from "../../lib/functions/dbFunctions";

const Topic = ({ onContinue }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const fetchedTopics = await getAllObjects("topics");
        setTopics(fetchedTopics);
        setFilteredTopics(fetchedTopics);
      } catch (err) {
        setError("Failed to fetch topics");
      } finally {
        setLoading(false);
      }
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
    setSelectedTopic(selectedTopic === topic ? null : topic);
  };

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-lg items-center justify-center rounded-xl bg-gray-900 p-6 shadow-md">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto text-red-500 flex w-full max-w-lg items-center justify-center rounded-xl bg-gray-900 p-6 shadow-md">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg rounded-xl bg-gray-900 p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-white">Select a Topic</h2>
      <input
        type="text"
        placeholder="Search topics..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul className="mt-4 space-y-2">
        {filteredTopics.map((topic, index) => (
          <li
            key={index}
            className={`cursor-pointer rounded-lg p-3 transition-all duration-200 ${
              selectedTopic === topic
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => handleTopicClick(topic)}
          >
            {topic.name}
          </li>
        ))}
      </ul>
      <button
        className={`mt-6 w-full rounded-lg p-3 font-medium text-white transition-all duration-200 ${
          selectedTopic
            ? "bg-blue-500 hover:bg-blue-600"
            : "cursor-not-allowed bg-gray-600"
        }`}
        disabled={!selectedTopic}
        onClick={() => onContinue({ topic: selectedTopic })}
      >
        Continue
      </button>
    </div>
  );
};

export default Topic;
