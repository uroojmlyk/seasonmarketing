"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faXmark, 
  faArrowRight, 
  faRobot,
  faHeadset
} from "@fortawesome/free-solid-svg-icons";

const INITIAL_QUESTIONS = [
  { id: 1, text: "How do I post a property?" },
  { id: 2, text: "Is my personal data secure?" },
  { id: 3, text: "How do I verify an agent?" },
  { id: 4, text: "What are the listing rules?" },
];

const ANSWERS: Record<number, string> = {
  1: "You can post a property by clicking the 'Post Property' button in the navbar. You will need to create a free account, add photos, and enter property details.",
  2: "Yes, your data is secure. We use strict privacy policies. Your contact details are only shared when you explicitly choose to enquire about a property.",
  3: "Look for the 'Verified' badge on agent profiles. We perform identity and authority checks before granting this badge.",
  4: "Listings must be accurate. False prices, duplicate ads, and misleading information are strictly prohibited and will be removed by our moderation team.",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ type: "bot" | "user"; text: string }[]>([
    { type: "bot", text: "Hi there! 👋 I am the Season Marketing assistant. How can I help you today?" },
  ]);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleQuestionClick = (qId: number, questionText: string) => {
    const newMessages = [...messages, { type: "user" as const, text: questionText }];
    setMessages(newMessages);
    
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot" as const, text: ANSWERS[qId] }]);
      setAnsweredQuestions((prev) => [...prev, qId]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 flex h-[520px] w-[340px] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-black/10 sm:w-[380px] animate-in slide-in-from-bottom-5 fade-in duration-300">
          
          {/* Header */}
          <div className="relative flex items-center justify-between bg-ink px-5 py-4 text-white">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--color-brand-500),_transparent_70%)]" />
            
            <div className="relative flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white shadow-inner">
                <FontAwesomeIcon icon={faHeadset} className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Season Assistant</h3>
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  Online & Ready
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-neutral-50 p-5">
            <div className="flex flex-col gap-5">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.type === "bot" && (
                    <div className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                      <FontAwesomeIcon icon={faRobot} className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      msg.type === "user"
                        ? "rounded-tr-sm bg-brand-500 text-white"
                        : "rounded-tl-sm border border-neutral-200 bg-white text-neutral-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Questions Area */}
          <div className="border-t border-neutral-100 bg-white p-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Suggested Questions
            </p>
            <div className="flex flex-col gap-2">
              {INITIAL_QUESTIONS.filter((q) => !answeredQuestions.includes(q.id)).map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleQuestionClick(q.id, q.text)}
                  className="group flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 text-left text-xs font-semibold text-neutral-600 transition-all hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600"
                >
                  {q.text}
                  <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-500" />
                </button>
              ))}
              
              {INITIAL_QUESTIONS.length === answeredQuestions.length && (
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <p className="text-sm font-semibold text-ink">All questions answered!</p>
                  <p className="text-xs text-neutral-500 mt-1">Need more help? Email us at support@seasonmarketing.pk</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Button with Robot Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white shadow-2xl shadow-brand-500/40 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-600"
        aria-label="Open support chat"
      >
        {!isOpen && (
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-white border-2 border-brand-500"></span>
          </span>
        )}
        
        {/* Yahan Robot Icon use kiya hai */}
        <FontAwesomeIcon 
          icon={isOpen ? faXmark : faRobot} 
          className={`h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-90" : "group-hover:scale-110"}`} 
        />
      </button>
    </div>
  );
}