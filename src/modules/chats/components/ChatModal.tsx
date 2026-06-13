"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  Send,
  Paperclip,
  MoreVertical,
  Edit2,
  Trash2,
  MessageSquare,
  Users,
  Image as ImageIcon,
  Check,
  CheckCheck,
} from "lucide-react";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";
import { useChat } from "../hooks";
import { TUser } from "@/modules/main/mortgageRentDetail/types";
import { IDecodedToken } from "@/modules/main/fastReserveDetail/types";

export type TMessage = {
  id: number;
  senderId: number;
  getterId: number;
  room: string;
  message: string;
  files: string | null;
  createdAt: string;
  updatedAt: string;
};

type TChatRoom = {
  room: string;
  name: string;
  lastMessage: string;
  unread: number;
};

export default function ChatModal({
  isOpen,
  onClose,
  seller,
}: {
  isOpen: boolean;
  onClose: () => void;
  seller: TUser;
}) {
  const router = useRouter();

  const [inputText, setInputText] = useState("");
  const [userSelectedRoom, setUserSelectedRoom] = useState<string | null>(null);

  const token = getCookie("accessToken") as string | undefined;

  let myId: number | null = null;

  try {
    if (token) {
      const decoded = jwtDecode(token) as IDecodedToken;
      myId = decoded.id;
    }
  } catch {
    myId = null;
  }

  useEffect(() => {
    if (!token || !myId) {
      toast.error("ابتدا وارد شوید");
      router.push("/auth/login");
    }
  }, [token, myId, router]);

  const { messages, isPending, sendMessageMutation } = useChat();

  const rooms = React.useMemo(() => {
    if (!messages) return [];
    return [...new Set(messages.map((m) => m.room))];
  }, [messages]);

  const selectedRoom = userSelectedRoom ?? rooms[0] ?? null;
  console.log(messages);
  console.log(seller.id);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-5xl h-[85vh] bg-background 
      rounded-3xl shadow-2xl flex overflow-hidden border border-gray-100 z-10 animate-in
       fade-in zoom-in-95 duration-200"
      >
        <div
          className="w-80 border-l border-gray-100 flex
         flex-col h-full hidden md:flex"
        >
          <div
            className="p-5 border-b border-gray-100 flex items-center justify-between
           "
          >
            <h2 className="font-bold text-primary flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              اتاق های چت
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {rooms &&
              rooms.length > 0 &&
              rooms.map((room) => (
                <button
                  key={room}
                  onClick={() => setUserSelectedRoom(room)}
                  className={`w-full text-right p-3 rounded-2xl transition-all ${
                    selectedRoom === room
                      ? " shadow-sm border border-blue-100 ring-1 ring-blue-50"
                      : "hover:bg-gray-100/80 border border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-800 text-sm">
                      {room}
                    </span>
                  </div>
                </button>
              ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col h-full ">
          <div
            className="h-16 px-6  border-b border-gray-100 flex items-center 
          justify-between  z-10"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-cyan-400
               rounded-full flex items-center justify-center text-white font-bold shadow-md
                shadow-blue-500/20"
              >
                {seller.firstName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-primary text-sm">
                  {seller.firstName} {seller.lastName}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 
              rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages &&
              messages?.length > 0 &&
              messages
                ?.filter(
                  (m) => m.room === selectedRoom && m.getterId == seller.id,
                )
                .map((msg) => {
                  const isMe = msg.senderId === myId;

                  const timeString = new Date(msg.createdAt).toLocaleTimeString(
                    "fa-IR",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  );

                  const isEdited = msg.updatedAt !== msg.createdAt;

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`group relative max-w-[70%] ${isMe ? "order-1" : "order-2"}`}
                      >
                        <div
                          className={`p-3.5 px-5 rounded-2xl shadow-sm text-sm ${
                            isMe
                              ? "bg-blue-600 text-white rounded-tr-sm"
                              : "bg-white text-gray-800 border border-gray-100 rounded-tl-sm"
                          }`}
                        >
                          {msg.files && (
                            <a
                              href={msg.files}
                              target="_blank"
                              rel="noreferrer"
                              className="block mb-2 text-blue-200 underline text-xs"
                            >
                              📎 ضمیمه
                            </a>
                          )}

                          {msg.message}
                        </div>

                        <div
                          className={`flex items-center gap-1.5 mt-1.5 text-[10px] text-gray-400 
                            ${isMe ? "justify-end" : "justify-start"}`}
                        >
                          <span>{timeString}</span>
                          {isEdited && <span>(ویرایش شده)</span>}
                          {isMe && (
                            <CheckCheck className="w-3 h-3 text-blue-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>

          <div className="p-4  border-t border-gray-100">
            <div
              className="flex items-end gap-2  border border-gray-200 rounded-3xl
             p-1.5 focus-within:ring-2 focus-within:ring-blue-500/20
              focus-within:border-blue-400 transition-all"
            >
              <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-white rounded-full transition-colors shrink-0">
                <Paperclip className="w-5 h-5" />
              </button>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="پیام خود را بنویسید..."
                className="flex-1 max-h-32 min-h-[44px] bg-transparent border-none
                 focus:ring-0 resize-none py-3 px-2 text-sm text-gray-700 focus:border-none "
                rows={1}
                dir="rtl"
              />

              <button
                onClick={() => {
                  const now = new Date().toISOString();
                  sendMessageMutation.mutate(
                    {
                      room: selectedRoom ?? String(myId),
                      message: inputText,
                      getterId: Number(seller.id),
                      createdAt: now,
                      updatedAt: now,
                    },
                    {
                      onSuccess: () => {
                        setInputText("");
                      },
                    },
                  );
                }}
                disabled={!inputText.trim() || sendMessageMutation.isPending}
                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700
                 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors 
                 shadow-sm shrink-0 "
              >
                <Send className="w-5 h-5  mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
