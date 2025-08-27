import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  BookOpen, 
  Clipboard, 
  Loader2, 
  Check, 
  X,
  Info,
  Target,
  Ruler
} from "lucide-react";
import { FaLightbulb } from "react-icons/fa";

const Summary = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(text.length);
  }, [text]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call to your backend that connects to Gemini
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Failed to generate summary");

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError(err.message || "Failed to generate summary");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setText("");
    setSummary("");
    setError(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 transition-colors duration-300
                    bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white
                    scroll-smooth">
      
      {/* Hero Section */}
      <motion.section 
        className="text-center mb-12 py-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-3xl mx-4 shadow-xl dark:from-gray-800 dark:via-gray-700 dark:to-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles className="w-8 h-8 text-yellow-300" />
            Text Summarizer
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Instantly summarize any paragraph, article, or story with our AI-powered tool
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                Your Text
              </h2>
              <span className={`text-sm ${charCount > 5000 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                {charCount}/5000
              </span>
            </div>
            
            <form onSubmit={handleSubmit}>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here (max 5000 characters)..."
                className="w-full h-64 p-4 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                maxLength={5000}
                required
              />
              
              <div className="flex flex-wrap gap-3 mt-4">
                <motion.button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading || !text.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Summarizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Summary
                    </>
                  )}
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={clearAll}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading || (!text && !summary)}
                >
                  <X className="w-5 h-5" />
                  Clear
                </motion.button>
              </div>
            </form>
          </div>

          {/* Output Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                AI Summary
              </h2>
              {summary && (
                <motion.button
                  onClick={copyToClipboard}
                  className="text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-3 py-1 rounded-md flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Clipboard className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </motion.button>
              )}
            </div>
            
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-64 flex items-center justify-center"
                >
                  <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400">Generating your summary...</p>
                  </div>
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-64 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center justify-center"
                >
                  <div className="text-center">
                    <X className="w-10 h-10 text-red-500 mx-auto mb-3" />
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                    <button
                      onClick={() => setError(null)}
                      className="mt-3 text-sm bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/40 text-red-600 dark:text-red-300 px-4 py-2 rounded-md"
                    >
                      Try Again
                    </button>
                  </div>
                </motion.div>
              ) : summary ? (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-64 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <p className="whitespace-pre-line text-gray-800 dark:text-gray-200">{summary}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center"
                >
                  <div className="text-center p-4">
                    <Sparkles className="w-10 h-10 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Your AI-generated summary will appear here
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {summary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
              >
                <Info className="w-4 h-4" />
                <span>This summary was generated by our AI and may not be 100% accurate.</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <FaLightbulb className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
            Tips for Better Summaries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Clear Input",
                description: "Provide well-structured text with complete sentences for best results.",
                icon: <BookOpen className="w-5 h-5 text-blue-500" />
              },
              {
                title: "Focus on Key Points",
                description: "Highlight the most important information in your original text.",
                icon: <Target className="w-5 h-5 text-green-500" />
              },
              {
                title: "Optimal Length",
                description: "Texts between 200-3000 characters tend to produce the best summaries.",
                icon: <Ruler className="w-5 h-5 text-purple-500" />
              }
            ].map((tip, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white dark:bg-gray-600 rounded-full shadow-sm">
                    {tip.icon}
                  </div>
                  <h3 className="font-semibold">{tip.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Summary;