import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCw,
  Star,
  Award,
  Clock,
  BarChart2,
  HelpCircle,
} from "lucide-react";

const Quiz = () => {
  // Sample quiz data with difficulty levels and categories
  const quizBank = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
      difficulty: "easy",
      category: "Geography",
      important: true,
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
      difficulty: "easy",
      category: "Science",
      important: false,
    },
    {
      id: 3,
      question: "What is the chemical symbol for Gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      answer: "Au",
      difficulty: "medium",
      category: "Science",
      important: true,
    },
    {
      id: 4,
      question: "Who painted the Mona Lisa?",
      options: [
        "Vincent van Gogh",
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Michelangelo",
      ],
      answer: "Leonardo da Vinci",
      difficulty: "medium",
      category: "Art",
      important: false,
    },
    {
      id: 5,
      question: "What is the largest mammal in the world?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      answer: "Blue Whale",
      difficulty: "easy",
      category: "Biology",
      important: true,
    },
    {
      id: 6,
      question: "In which year did World War II end?",
      options: ["1943", "1945", "1950", "1939"],
      answer: "1945",
      difficulty: "medium",
      category: "History",
      important: true,
    },
    {
      id: 7,
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Quartz"],
      answer: "Diamond",
      difficulty: "easy",
      category: "Science",
      important: false,
    },
    {
      id: 8,
      question: "Which language has the most native speakers?",
      options: ["English", "Hindi", "Spanish", "Mandarin"],
      answer: "Mandarin",
      difficulty: "hard",
      category: "Language",
      important: true,
    },
    {
      id: 9,
      question: "What is the square root of 144?",
      options: ["11", "12", "13", "14"],
      answer: "12",
      difficulty: "easy",
      category: "Math",
      important: false,
    },
    {
      id: 10,
      question: "Who developed the theory of relativity?",
      options: [
        "Isaac Newton",
        "Albert Einstein",
        "Galileo Galilei",
        "Stephen Hawking",
      ],
      answer: "Albert Einstein",
      difficulty: "hard",
      category: "Science",
      important: true,
    },
    // Add more questions to have enough for selection
    {
      id: 11,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      answer: "Pacific",
      difficulty: "easy",
      category: "Geography",
      important: false,
    },
    {
      id: 12,
      question: "Which country is home to the kangaroo?",
      options: ["New Zealand", "South Africa", "Australia", "Brazil"],
      answer: "Australia",
      difficulty: "easy",
      category: "Geography",
      important: false,
    },
    {
      id: 13,
      question: "What is the main component of the Sun?",
      options: ["Liquid lava", "Hydrogen", "Oxygen", "Uranium"],
      answer: "Hydrogen",
      difficulty: "medium",
      category: "Science",
      important: true,
    },
    {
      id: 14,
      question: "In which country would you find the Great Pyramid of Giza?",
      options: ["Mexico", "Peru", "Egypt", "Iraq"],
      answer: "Egypt",
      difficulty: "easy",
      category: "History",
      important: false,
    },
    {
      id: 15,
      question: "What is the currency of Japan?",
      options: ["Won", "Yen", "Yuan", "Ringgit"],
      answer: "Yen",
      difficulty: "easy",
      category: "Economics",
      important: false,
    },
    {
      id: 16,
      question: "Which of these is not a primary color?",
      options: ["Red", "Blue", "Green", "Yellow"],
      answer: "Green",
      difficulty: "medium",
      category: "Art",
      important: true,
    },
    {
      id: 17,
      question: "How many continents are there on Earth?",
      options: ["5", "6", "7", "8"],
      answer: "7",
      difficulty: "easy",
      category: "Geography",
      important: false,
    },
    {
      id: 18,
      question: "Which of these is not a programming language?",
      options: ["Python", "Java", "HTML", "Ruby"],
      answer: "HTML",
      difficulty: "medium",
      category: "Technology",
      important: true,
    },
    {
      id: 19,
      question: "What is the largest desert in the world?",
      options: ["Sahara", "Arabian", "Gobi", "Antarctic"],
      answer: "Antarctic",
      difficulty: "hard",
      category: "Geography",
      important: true,
    },
    {
      id: 20,
      question: "Who wrote 'Romeo and Juliet'?",
      options: [
        "Charles Dickens",
        "William Shakespeare",
        "Jane Austen",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
      difficulty: "easy",
      category: "Literature",
      important: false,
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [filter, setFilter] = useState("all");
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState(5);
  const [customCount, setCustomCount] = useState("");

  // Initialize quiz with filtered questions
  const initializeQuiz = () => {
    let filteredQuestions = [...quizBank];

    if (filter === "important") {
      filteredQuestions = filteredQuestions.filter((q) => q.important);
    } else if (filter !== "all") {
      filteredQuestions = filteredQuestions.filter(
        (q) => q.difficulty === filter
      );
    }

    // Shuffle and take selected number of questions
    const count =
      questionCount === "custom" ? parseInt(customCount) || 5 : questionCount;
    const maxQuestions = Math.min(count, filteredQuestions.length);

    filteredQuestions = filteredQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, maxQuestions);

    setQuestions(filteredQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setTimeLeft(30);
    setTimerActive(false);
    setQuizStarted(true);
  };

  // Timer logic
  useEffect(() => {
    if (!timerActive || quizCompleted || !quizStarted) return;

    const timer =
      timeLeft > 0 &&
      setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

    if (timeLeft === 0) {
      handleNextQuestion();
    }

    return () => clearInterval(timer);
  }, [timeLeft, timerActive, quizStarted]);

  const handleOptionSelect = (option) => {
    if (selectedOption !== null) return; // Prevent changing answer after selection
    setSelectedOption(option);
    setTimerActive(false);

    if (option === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setTimeLeft(30);
      setTimerActive(true);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
    setTimeLeft(30);
    setTimerActive(false);
    setShowExplanation(false);
    setQuizStarted(false);
  };

  const generateNewQuiz = () => {
    resetQuiz();
    // Re-shuffle questions
    initializeQuiz();
  };

  const endQuiz = () => {
    setQuizCompleted(true);
    setTimerActive(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Knowledge Challenge
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Test your skills with our interactive quiz
          </p>
        </motion.div>

        {/* Quiz Setup (shown before quiz starts) */}
        {!quizStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
              Quiz Setup
            </h2>

            {/* Filters */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">
                Question Difficulty
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  All Questions
                </button>
                <button
                  onClick={() => setFilter("important")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                    filter === "important"
                      ? "bg-purple-600 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <Star className="w-4 h-4" /> Important
                </button>
                <button
                  onClick={() => setFilter("easy")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === "easy"
                      ? "bg-green-600 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Easy
                </button>
                <button
                  onClick={() => setFilter("medium")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === "medium"
                      ? "bg-yellow-600 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setFilter("hard")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === "hard"
                      ? "bg-red-600 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Hard
                </button>
              </div>
            </div>

            {/* Number of Questions */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">
                Number of Questions
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {[5, 10, 15, 20].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setQuestionCount(num);
                      setCustomCount("");
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      questionCount === num
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {num} Questions
                  </button>
                ))}
                <div className="relative">
                  <button
                    onClick={() => setQuestionCount("custom")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      questionCount === "custom"
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Custom
                  </button>
                  {questionCount === "custom" && (
                    <input
                      type="number"
                      min="1"
                      max={quizBank.length}
                      value={customCount}
                      onChange={(e) => setCustomCount(e.target.value)}
                      className="absolute left-full ml-2 w-20 px-2 py-1 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Number"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="text-center">
              <motion.button
                onClick={initializeQuiz}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-lg"
              >
                Start Quiz
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Quiz Content (shown after quiz starts) */}
        {quizStarted && (
          <div
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden ${
              !quizStarted ? "hidden" : ""
            }`}
          >
            {/* Progress, Timer, and End Quiz Button */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BarChart2 className="text-blue-500" />
                <span className="font-medium">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-purple-500" />
                <span
                  className={`font-bold ${
                    timeLeft < 10
                      ? "text-red-500"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {timeLeft}s
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-yellow-500" />
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Score: {score}
                </span>
                <button
                  onClick={endQuiz}
                  className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                >
                  End Quiz
                </button>
              </div>
            </div>

            {/* Question Area */}
            <div className="p-6">
              {!quizCompleted ? (
                <>
                  {/* Question Metadata */}
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                        currentQuestion?.difficulty
                      )}`}
                    >
                      {currentQuestion?.difficulty.toUpperCase()}
                    </span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {currentQuestion?.category}
                    </span>
                  </div>

                  {/* Question */}
                  <motion.h2
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200"
                  >
                    {currentQuestion?.question}
                  </motion.h2>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-3 mb-6">
                    {currentQuestion?.options.map((option, index) => {
                      const isCorrect = option === currentQuestion.answer;
                      const isSelected = selectedOption === option;
                      let optionClasses =
                        "p-4 rounded-lg border cursor-pointer transition-all ";

                      if (selectedOption !== null) {
                        if (isCorrect) {
                          optionClasses +=
                            "bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700";
                        } else if (isSelected && !isCorrect) {
                          optionClasses +=
                            "bg-red-50 border-red-300 dark:bg-red-900/20 dark:border-red-700";
                        } else {
                          optionClasses +=
                            "bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600";
                        }
                      } else {
                        optionClasses +=
                          "hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/10 dark:hover:border-blue-700 bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600";
                      }

                      return (
                        <motion.div
                          key={index}
                          whileHover={{ scale: selectedOption ? 1 : 1.02 }}
                          whileTap={{ scale: selectedOption ? 1 : 0.98 }}
                          className={optionClasses}
                          onClick={() => handleOptionSelect(option)}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                selectedOption
                                  ? isCorrect
                                    ? "bg-green-500 text-white"
                                    : isSelected
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                                  : "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span className="text-gray-800 dark:text-gray-200">
                              {option}
                            </span>
                            {selectedOption && (
                              <div className="ml-auto">
                                {isCorrect ? (
                                  <CheckCircle className="text-green-500" />
                                ) : isSelected ? (
                                  <XCircle className="text-red-500" />
                                ) : null}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Explanation (toggleable) */}
                  {selectedOption && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mb-6 overflow-hidden"
                    >
                      <button
                        onClick={() => setShowExplanation(!showExplanation)}
                        className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-2"
                      >
                        <HelpCircle className="w-4 h-4" />
                        {showExplanation
                          ? "Hide explanation"
                          : "Show explanation"}
                      </button>
                      {showExplanation && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300"
                        >
                          {currentQuestion.explanation ||
                            "The correct answer is highlighted above. This question tests your knowledge about " +
                              currentQuestion.category.toLowerCase() +
                              "."}
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Next Button */}
                  <div className="flex justify-end">
                    <motion.button
                      onClick={handleNextQuestion}
                      disabled={selectedOption === null && timeLeft > 0}
                      whileHover={{
                        scale: selectedOption || timeLeft === 0 ? 1.05 : 1,
                      }}
                      whileTap={{
                        scale: selectedOption || timeLeft === 0 ? 0.95 : 1,
                      }}
                      className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                        selectedOption || timeLeft === 0
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {currentQuestionIndex < questions.length - 1
                        ? "Next Question"
                        : "Finish Quiz"}
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </>
              ) : (
                /* Results Screen */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                    className="text-6xl mb-6"
                  >
                    {score === questions.length
                      ? "🏆"
                      : score >= questions.length / 2
                      ? "🎉"
                      : "🧐"}
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                    {score === questions.length
                      ? "Perfect Score!"
                      : score >= questions.length / 2
                      ? "Good Job!"
                      : "Keep Practicing!"}
                  </h2>
                  <p className="text-xl mb-6 text-gray-600 dark:text-gray-400">
                    You scored {score} out of {questions.length}
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-8">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full"
                      style={{ width: `${(score / questions.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <motion.button
                      onClick={resetQuiz}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2"
                    >
                      <RotateCw className="w-5 h-5" />
                      Try Again
                    </motion.button>
                    <motion.button
                      onClick={generateNewQuiz}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium flex items-center gap-2"
                    >
                      <ArrowRight className="w-5 h-5" />
                      New Quiz
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
