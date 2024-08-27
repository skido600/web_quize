import React, { useEffect, useState } from "react";

function Main() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData.quiz);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (data.length === 0) return;

    if (selectedAnswer === data[currentQuestionIndex].correct) {
      setScore(score + 1);
    }

    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < data.length - 1 ? prevIndex + 1 : prevIndex + 1
    );
    setSelectedAnswer(null);
  };

  const handlePrevious = () => {
    if (data.length === 0) return;

    setCurrentQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
    setSelectedAnswer(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  if (currentQuestionIndex === data.length) {
    return (
      <div className="p-8 bg-blue-50 min-h-screen flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-8">
          Quiz Completed
        </h1>
        <p className="text-3xl font-semibold text-blue-800">
          Your Score: {score}/{data.length}
        </p>
      </div>
    );
  }

  const currentQuestion = data[currentQuestionIndex];

  return (
    <main className="p-8 bg-blue-50 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-8">
        Quiz Challenge
      </h1>

      {/* Display Score */}
      <div className="text-center mb-8">
        <p className="text-3xl font-semibold text-blue-800">
          Score: {score}/{data.length}
        </p>
      </div>

      {/* Quiz Content */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full border border-blue-200">
        <div>
          <h2 className="text-lg font-semibold text-blue-900 mb-6">
            {currentQuestion.question}
          </h2>
          <p className="italic text-[15px] text-gray-800">
            #{currentQuestion.programming}
          </p>
        </div>

        <ul className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <li
              key={index}
              className={`bg-blue-100 p-4 rounded-lg text-blue-800 hover:bg-blue-200 transition cursor-pointer ${
                selectedAnswer === option ? "bg-blue-300" : ""
              }`}
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={handleNext}
            disabled={currentQuestionIndex === data.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

export default Main;
