import { useEffect, useRef, useState, useContext } from "react";

import useFetchData from "../../hooks/useFetchData";

import { FiMessageCircle, FiX } from "react-icons/fi";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { BASE_URL } from "../../../config";

// import { authContext } from '../../context/AuthContext'

const AIChatbot = () => {
  //   const { token: contextToken } = useContext(authContext)

  // Chat open/close state
  const [isOpen, setIsOpen] = useState(false);

  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "Hello!! I am your Medicare AI assistant. How can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const bottomRef = useRef(null);

  const handleSendMessage = async (message) => {
    const userMessage = {
      sender: "user",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${BASE_URL}/chatbot/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      const botMessage = {
        sender: "bot",
        text: result.reply,
      };

      setChat((prev) => [...prev, botMessage]);
    } catch (err) {
      console.log(err);

      setError(err.message);

      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat, loading]);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 w-16 h-16 rounded-full bg-blue-600 text-white shadow-2xl flex items-center justify-center z-50 hover:bg-blue-700 transition-all"
        >
          <FiMessageCircle size={30} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 w-[360px] h-[600px] bg-white rounded-3xl shadow-2xl border overflow-hidden z-50 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-lg">Medicare AI Assistant</h2>

              <p className="text-sm text-blue-100">
                Ask health-related questions
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-all"
            >
              <FiX size={26} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
            {chat.map((msg, index) => (
              <ChatMessage key={index} sender={msg.sender} text={msg.text} />
            ))}

            {loading && <TypingIndicator />}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div ref={bottomRef}></div>
          </div>

          {/* Input */}
          <ChatInput onSend={handleSendMessage} loading={loading} />
        </div>
      )}
    </>
  );
};

export default AIChatbot;
