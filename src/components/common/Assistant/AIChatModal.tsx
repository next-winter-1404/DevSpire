/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, Bot, Loader2 } from "lucide-react";
import chatAnimation from "../../../../public/lottie/chatbot.json";
import { useLocale } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import Lottie from "lottie-react";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  time: string;
};
interface IPayload {
  role: "assistant" | "user";
  content: string;
}
type TRole = "user" | "assistant";

export default function AIChatModal() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "سلام! چطور می‌تونم کمکتون کنم؟",
      sender: "ai",
      time: new Date().toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (data: IPayload[]) => {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: data, type: "chat" }),
        });
        const result = await res.json();
        return result;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: data?.data?.choices?.[0]?.message?.content || "پاسخی دریافت نشد",
        sender: "ai",
        time: new Date().toLocaleTimeString(locale == "fa" ? "fa-IR" : "", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMessage]);
    },
    onError: (err: any) => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: locale == "fa" ? "مشکلی پیش آمده است" : "server error",
        sender: "ai",
        time: new Date().toLocaleTimeString(locale == "fa" ? "fa-IR" : "", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMessage]);
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      time: new Date().toLocaleTimeString(locale == "fa" ? "fa-IR" : "", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    sendMessage([
      ...messages.map((m) => ({
        role: m.sender === "ai" ? "assistant" : ("user" as TRole),
        content: m.text,
      })),
      {
        role: "user",
        content: inputValue,
      },
    ]);
    setInputValue("");
  };

  return (
    <div
      className={`fixed bottom-6 ${locale == "fa" ? "right-6" : "left-6"} z-50`}
    >
      <div
        className={`absolute bottom-10 ${locale == "fa" ? "right-0" : "left-0"} 
              transition-all duration-300 ease-in-out transform origin-bottom-right ${
                isOpen
                  ? "scale-100 opacity-100 translate-y-0"
                  : "scale-90 opacity-0 translate-y-4 pointer-events-none"
              }`}
      >
        <div
          className="w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-background
        rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100
         dark:border-gray-800"
        >
          <div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex
           items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center
                 justify-center backdrop-blur-sm"
                >
                  <Bot className="text-white" size={24} />
                </div>
                <div
                  className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2
                 border-indigo-600 rounded-full"
                ></div>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">
                  دستیار هوشمند
                </h3>
                <p className="text-blue-100 text-xs">آنلاین و آماده پاسخگویی</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full 
              transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div
            className="flex-1 p-4 overflow-y-auto bg-background
           space-y-4 custom-scrollbar  "
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex w-full ${msg.sender === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`flex flex-col gap-1 max-w-[80%] ${
                    msg.sender === "user" ? "items-start" : "items-end"
                  }`}
                >
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-tr-sm"
                        : "bg-[#ffff] dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-sm border border-gray-100 dark:border-gray-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span
                    suppressHydrationWarning
                    className="text-[10px] text-gray-400 px-1"
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isPending && (
              <div className="flex justify-end w-full">
                <div
                  className="bg-[#ffff] dark:bg-gray-800 border border-gray-100
                 dark:border-gray-700 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 
                 items-center shadow-sm"
                >
                  <div
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div
            className="p-3 bg-background border-t border-gray-100
           dark:border-gray-800"
          >
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2 bg-background p-1.5 rounded-full
               border border-gray-200 dark:border-gray-700 focus-within:ring-2
                focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="پیام خود را بنویسید..."
                className="flex-1 bg-transparent border-none focus:outline-none px-4 text-sm
                 text-gray-700 dark:text-gray-200"
                disabled={isPending}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isPending}
                className={`p-2.5 rounded-full flex items-center justify-center transition-all ${
                  inputValue.trim() && !isPending
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isPending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} className="rotate-y-180" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-primary border-[#777777]/20 text-white p-3 rounded-full h-16 w-16
           shadow-lg
           transition-all duration-300 hover:scale-105 flex items-center justify-center ${
             isOpen
               ? "rotate-90 opacity-0 pointer-events-none absolute"
               : "rotate-0 opacity-100 relative"
           }`}
      >
        <Lottie
          animationData={chatAnimation}
          style={{ width: "100%", height: "100%" }}
        />
      </button>
    </div>
  );
}
