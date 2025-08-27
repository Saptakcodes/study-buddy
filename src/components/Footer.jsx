import React from "react";
import { FaReact, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 shadow-inner mx-auto py-3 flex flex-col justify-center items-center gap-4">
      <div className="flex  items-center space-x-3 text-md">
        {/* <FaReact className="text-blue-400 animate-spin-slow" /> */}
        <span className="font-semibold tracking-wide">&copy; 2025</span>
        <span className="font-semibold tracking-wide">Study Genie</span>
      </div>

      <div className="flex space-x-5">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 transition-transform duration-300 hover:scale-110"
        >
          <FaGithub size={15} />
        </a>
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-300 transition-transform duration-300 hover:scale-110"
        >
          <FaLinkedin size={15} />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-sky-300 transition-transform duration-300 hover:scale-110"
        >
          <FaTwitter size={15} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
