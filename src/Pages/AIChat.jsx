import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI learning assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const botResponses = [
        "I understand you're asking about: " +
          input +
          ". Here's what I found...",
        "That's an interesting question! The solution involves...",
        "Let me break this down for you. First, we need to consider...",
        "Based on your query, I recommend checking these concepts...",
        "Here's a step-by-step explanation to solve this problem...",
      ];
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col min-h-screen w-full mx-auto bg-white dark:bg-gray-800  overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Chat header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white flex items-center">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-lg">StudyBuddy AI</h2>
          <p className="text-xs opacity-80">Doubt solving assistant</p>
        </div>
        <div className="ml-auto flex items-center bg-white/10 px-3 py-1 rounded-full text-xs">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
          Online
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                message.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-200 dark:border-gray-600"
              }`}
            >
              {message.sender === "bot" && (
                <div className="mr-2 mt-1 flex-shrink-0">
                  <Bot className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
              )}
              <div>
                <p>{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-blue-200"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {message.sender === "user" && (
                <div className="ml-2 mt-1 flex-shrink-0">
                  <User className="w-5 h-5 text-blue-200" />
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex mb-4 justify-start">
            <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg rounded-bl-none px-4 py-2 border border-gray-200 dark:border-gray-600 flex items-center">
              <Loader2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2 animate-spin" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSend}
        className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800"
      >
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your doubt or paste a problem..."
            className="w-full pr-12 pl-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 border-none resize-y overflow-y-auto"
            rows={3}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-5  top-1/3 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-full hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <div className="flex space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <Sparkles className="w-3 h-3 mr-1" /> Try: "Explain binary search"
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Sparkles className="w-3 h-3 mr-1" /> Try: "Solve 2x + 5 = 15"
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AIChat;
