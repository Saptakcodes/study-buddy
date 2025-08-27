import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import image from "../assets/h-i-1.jpg";
import {
  Brain,
  BookOpenCheck,
  MessageCircleQuestion,
  Sparkles,
  Info,
  BookOpen,
  GraduationCap,
  Code2,
  BarChart2,
  Users,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Globe,
  Award,
  Bookmark,
} from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const features = [
  {
    icon: <Brain className="w-8 h-8 text-green-600 dark:text-green-400" />,
    title: "Socratic Learning",
    description:
      "Learn by answering questions. No spoon-feeding—develop real problem-solving skills.",
  },
  {
    icon: (
      <BookOpenCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
    ),
    title: "DSA Mastery",
    description:
      "Comprehensive coverage of Data Structures and Algorithms with step-by-step questions.",
  },
  {
    icon: (
      <MessageCircleQuestion className="w-8 h-8 text-purple-600 dark:text-purple-400" />
    ),
    title: "AI Mentor Chat",
    description:
      "Chat with our intelligent Socratic AI to clarify concepts interactively.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-yellow-500 dark:text-yellow-300" />,
    title: "Progress Tracking",
    description:
      "Monitor your journey and level up as you learn through quizzes and feedback.",
  },
];

const AnimatedSection = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
        hidden: { opacity: 0, y: 20 },
      }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  useEffect(() => {
    const scrollListener = () => {
      document.documentElement.style.setProperty(
        "--scroll",
        window.scrollY / (document.body.offsetHeight - window.innerHeight)
      );
    };
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <div
      className="pt-24 pb-16 px-4 md:px-8 transition-colors duration-300
                    bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white
                    scroll-smooth"
    >
      <style jsx global>{`
        :root {
          --scroll: 0;
        }
        .parallax-bg {
          background-position: center calc(-10px * var(--scroll));
        }
      `}</style>

      {/* Hero Section */}
      <AnimatedSection>
        <section className="text-center mb-12 py-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-3xl mx-4 shadow-2xl dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 overflow-hidden relative">
          {/* <div className="absolute inset-0 opacity-10">
            <div className="image-box absolute top-0 left-0 w-full h-full"></div>
          </div> */}
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Welcome to <span className="text-yellow-300">Study Genie</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Your AI-powered study companion for mastering programming concepts
              through active learning.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/quiz"
                className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105"
              >
                <BookOpen size={20} /> Start Learning
              </Link>
              <Link
                to="/aichat"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105"
              >
                <GraduationCap size={20} /> Ask AI Mentor
              </Link>
            </motion.div>
          </div>
          {/* <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            * <img
              src={image}
              alt="AI Learning"
              className="w-[300px] md:w-[400px] lg:w-[500px] rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-500"
            /> 
          </motion.div> */}
        </section>
      </AnimatedSection>

      {/* About Us Section */}
      <AnimatedSection delay={0.2}>
        <section className="max-w-6xl mx-auto my-24 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                    About{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      Study Genie
                    </span>
                  </h2>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  We're revolutionizing how developers learn through AI-powered,
                  interactive education. Our platform combines cutting-edge
                  technology with proven pedagogical approaches to create a
                  truly transformative learning experience.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="w-6 h-6 text-yellow-500 dark:text-yellow-300 mt-1 flex-shrink-0" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Founded in 2023 with a mission to make high-quality
                      programming education accessible to everyone.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Rocket className="w-6 h-6 text-purple-500 dark:text-purple-300 mt-1 flex-shrink-0" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Our AI algorithms adapt to your learning style, ensuring
                      maximum knowledge retention.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <ShieldCheck className="w-6 h-6 text-green-500 dark:text-green-300 mt-1 flex-shrink-0" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Trusted by over 50,000 developers worldwide to accelerate
                      their learning journey.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-12 bg-white dark:bg-gray-900">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  What Makes Us{" "}
                  <span className="text-indigo-600 dark:text-indigo-400">
                    Different
                  </span>
                </h3>
                <div className="space-y-6">
                  <motion.div
                    className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Globe className="w-6 h-6 text-blue-500 dark:text-blue-300 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        Global Learning Community
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Connect with learners worldwide and collaborate on
                        coding challenges.
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Award className="w-6 h-6 text-yellow-500 dark:text-yellow-300 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        Certified Learning Paths
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Earn verifiable certificates as you complete each
                        learning milestone.
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Bookmark className="w-6 h-6 text-purple-500 dark:text-purple-300 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        Personalized Curriculum
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        AI creates custom learning plans based on your goals and
                        skill level.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection delay={0.4}>
        <section className="max-w-6xl mx-auto my-24 px-4">
          <motion.div
            className="text-center mb-16"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              How{" "}
              <span className="text-purple-600 dark:text-purple-400">
                Study Genie
              </span>{" "}
              Helps You Learn
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform combines AI-powered tools with interactive learning
              to accelerate your programming journey.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105 hover:shadow-2xl border border-gray-100 dark:border-gray-700"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-indigo-100 dark:bg-gray-700 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Learning Path */}
      <AnimatedSection delay={0.6}>
        <section className="max-w-6xl mx-auto my-24 px-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
            <motion.div
              className="text-center mb-12"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Personalized{" "}
                <span className="text-yellow-300">Learning Path</span>
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                We adapt to your skill level and learning pace to create the
                perfect curriculum.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Code2 className="w-8 h-8 text-yellow-300" />
                  <h3 className="text-lg font-semibold">Fundamentals</h3>
                </div>
                <p className="text-white/80">
                  Master core programming concepts with our interactive
                  exercises and AI guidance.
                </p>
              </motion.div>
              <motion.div
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <BookOpenCheck className="w-8 h-8 text-yellow-300" />
                  <h3 className="text-lg font-semibold">DSA Challenges</h3>
                </div>
                <p className="text-white/80">
                  Solve real-world problems with our curated collection of Data
                  Structures and Algorithms.
                </p>
              </motion.div>
              <motion.div
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <BarChart2 className="w-8 h-8 text-yellow-300" />
                  <h3 className="text-lg font-semibold">Progress Tracking</h3>
                </div>
                <p className="text-white/80">
                  Visualize your learning journey and identify areas for
                  improvement.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Capabilities Section */}
      <AnimatedSection delay={0.8}>
        <section className="max-w-6xl mx-auto my-24 px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
              What{" "}
              <span className="text-green-600 dark:text-green-400">
                Study Genie
              </span>{" "}
              Can Do
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the powerful features that make learning programming
              easier and more effective.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-green-500 dark:text-green-400 text-4xl mb-4">
                01
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                Interactive Coding Exercises
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Practice coding directly in the browser with instant feedback
                and AI-powered hints.
              </p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-blue-500 dark:text-blue-400 text-4xl mb-4">
                02
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                Personalized Learning Paths
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI creates a custom curriculum based on your goals,
                strengths, and weaknesses.
              </p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-purple-500 dark:text-purple-400 text-4xl mb-4">
                03
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                Real-world Projects
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Build portfolio-worthy projects with guided tutorials and code
                reviews.
              </p>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection delay={1}>
        <section className="max-w-4xl mx-auto my-24 text-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl blur opacity-75 dark:opacity-50"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
                Ready to{" "}
                <span className="text-gradient bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  Transform
                </span>{" "}
                Your Learning?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Join our community of developers who are accelerating their
                careers with Study Genie.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/getstarted"
                  className="inline-block bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-all duration-300 text-lg"
                >
                  Get Started Now - It's Free
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default Home;
