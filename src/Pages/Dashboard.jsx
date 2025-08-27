import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import {
  Trophy,
  Flame,
  CheckCircle,
  XCircle,
  BookOpen,
  Clock,
  TrendingUp,
  Aperture,
  Zap,
  Bookmark,
} from "lucide-react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard = () => {
  // Mock data - in a real app, this would come from an API
  const [stats, setStats] = useState({
    easySolved: 42,
    mediumSolved: 28,
    hardSolved: 15,
    totalSolved: 85,
    totalCorrect: 68,
    totalWrong: 17,
    currentStreak: 7,
    longestStreak: 12,
    lastActive: new Date().toISOString(),
    topics: {
      dsa: { solved: 35, correct: 28, wrong: 7 },
      oops: { solved: 20, correct: 16, wrong: 4 },
      aptitude: { solved: 15, correct: 12, wrong: 3 },
      coding: { solved: 15, correct: 12, wrong: 3 },
    },
    dailyProgress: Array(7)
      .fill(0)
      .map((_, i) => ({
        day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i],
        questions: [3, 5, 7, 10, 8, 6, 4][i],
      })),
  });

  // Check and update streak daily
  useEffect(() => {
    const lastActive = new Date(stats.lastActive);
    const today = new Date();

    // Reset streak if missed a day
    if (today.getDate() - lastActive.getDate() > 1) {
      setStats((prev) => ({ ...prev, currentStreak: 0 }));
    }
    // Update streak at midnight
    const updateStreakAtMidnight = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        setStats((prev) => ({
          ...prev,
          currentStreak: prev.currentStreak + 1,
          longestStreak: Math.max(prev.longestStreak, prev.currentStreak + 1),
        }));
      }
    };

    const interval = setInterval(updateStreakAtMidnight, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [stats.lastActive]);

  // Calculate percentages
  const accuracy =
    Math.round((stats.totalCorrect / stats.totalSolved) * 100) || 0;
  const completionPercentage = Math.round((stats.totalSolved / 150) * 100); // Assuming 150 is target

  // Chart data configurations
  const difficultyData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "Questions Solved",
        data: [stats.easySolved, stats.mediumSolved, stats.hardSolved],
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(255, 99, 132, 0.7)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const topicData = {
    labels: ["DSA", "OOPs", "Aptitude", "Coding"],
    datasets: [
      {
        label: "Correct",
        data: [
          stats.topics.dsa.correct,
          stats.topics.oops.correct,
          stats.topics.aptitude.correct,
          stats.topics.coding.correct,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Wrong",
        data: [
          stats.topics.dsa.wrong,
          stats.topics.oops.wrong,
          stats.topics.aptitude.wrong,
          stats.topics.coding.wrong,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const weeklyProgressData = {
    labels: stats.dailyProgress.map((day) => day.day),
    datasets: [
      {
        label: "Questions Solved",
        data: stats.dailyProgress.map((day) => day.questions),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Learning Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your progress and improve your skills
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mt-4 md:mt-0"
          >
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
              <Flame className="text-orange-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Current Streak
                </p>
                <p className="font-bold text-xl dark:text-orange-400">
                  {stats.currentStreak} days
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
              <Trophy className="text-yellow-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Longest Streak
                </p>
                <p className="font-bold text-xl dark:text-yellow-400">
                  {stats.longestStreak} days
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Questions Solved */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-blue-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Total Solved</p>
                <p className="text-3xl font-bold dark:text-white">
                  {stats.totalSolved}
                </p>
              </div>
              <BookOpen className="text-blue-500 w-8 h-8" />
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {completionPercentage}% of target completed
              </p>
            </div>
          </motion.div>

          {/* Accuracy */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-green-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:white">Accuracy</p>
                <p className="text-3xl font-bold dark:text-white">
                  {accuracy}%
                </p>
              </div>
              <TrendingUp className="text-green-500 w-8 h-8" />
            </div>
            <div className="mt-4 flex gap-2">
              <div className="flex items-center text-sm text-green-500">
                <CheckCircle className="w-4 h-4 mr-1" />
                {stats.totalCorrect} Correct
              </div>
              <div className="flex items-center text-sm text-red-500">
                <XCircle className="w-4 h-4 mr-1" />
                {stats.totalWrong} Wrong
              </div>
            </div>
          </motion.div>

          {/* Easy Questions */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-green-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Easy Solved</p>
                <p className="text-3xl font-bold dark:text-white">
                  {stats.easySolved}
                </p>
              </div>
              <Zap className="text-green-300 w-8 h-8" />
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round((stats.easySolved / stats.totalSolved) * 100 || 0)}%
                of total
              </p>
            </div>
          </motion.div>

          {/* Medium/Hard Questions */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-yellow-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Medium/Hard</p>
                <p className="text-3xl font-bold dark:text-white">
                  {stats.mediumSolved + stats.hardSolved}
                </p>
              </div>
              <Aperture className="text-yellow-500 w-8 h-8" />
            </div>
            <div className="mt-2 flex gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Medium
                </p>
                <p className="font-medium dark:text-white">
                  {stats.mediumSolved}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hard</p>
                <p className="font-medium dark:text-white">
                  {stats.hardSolved}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Difficulty Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg "
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
              <Bookmark className="text-blue-500" />
              Difficulty Distribution
            </h2>
            <div className="h-64">
              <Bar
                data={difficultyData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            </div>
          </motion.div>

          {/* Topic Performance */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
              <Bookmark className="text-purple-500" />
              Topic Performance
            </h2>
            <div className="h-64">
              <Pie
                data={{
                  labels: topicData.labels,
                  datasets: [
                    {
                      label: "Questions",
                      data: topicData.labels.map(
                        (_, i) =>
                          topicData.datasets[0].data[i] +
                          topicData.datasets[1].data[i]
                      ),
                      backgroundColor: [
                        "rgba(54, 162, 235, 0.7)",
                        "rgba(255, 99, 132, 0.7)",
                        "rgba(255, 206, 86, 0.7)",
                        "rgba(75, 192, 192, 0.7)",
                      ],
                      borderColor: [
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "right",
                    },
                  },
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Weekly Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
            <Clock className="text-green-500" />
            Weekly Progress
          </h2>
          <div className="h-64">
            <Line
              data={weeklyProgressData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 2,
                    },
                  },
                },
              }}
            />
          </div>
        </motion.div>

        {/* Topic-wise Progress Bars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg  dark:text-white"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 dark:text-white">
            <TrendingUp className="text-orange-500" />
            Detailed Topic Analysis
          </h2>

          {Object.entries(stats.topics).map(([topic, data]) => {
            const correctPercentage =
              Math.round((data.correct / data.solved) * 100) || 0;
            const wrongPercentage = 100 - correctPercentage;

            return (
              <div key={topic} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium capitalize">{topic}</h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {data.solved} questions ({data.correct} correct,{" "}
                    {data.wrong} wrong)
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${correctPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>{correctPercentage}% Correct</span>
                  <span>{wrongPercentage}% Wrong</span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
