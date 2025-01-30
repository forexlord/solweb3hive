"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useUserStore } from "@/store/user";
import { IChat, useChatStore } from "@/store/chat";
import { Drawer, Spin } from "antd";
import { MdDelete, MdMenu } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Messages from "./Messages";

const ChatPage = () => {
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const chats = useChatStore((state) => state.chats);
  const addChat = useChatStore((state) => state.addChat);
  const setChats = useChatStore((state) => state.setChats);
  const setMessages = useChatStore((state) => state.setMessages);
  const addMessage = useChatStore((state) => state.addMessage);
  const messages = useChatStore((state) => state.messages);
  // anonymous
  const setAnonymousMessages = useChatStore(
    (state) => state.setAnonymousMessages
  );
  const addAnonymousMessage = useChatStore(
    (state) => state.addAnonymousMessage
  );
  const anonymousMessages = useChatStore((state) => state.anonymousMessages);
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user?.id }),
        });

        const data = await res.json();
        setChats(data.chats || []);
        setMessages(data.chats?.[0]?.messages || []);
        setSelectedChat(data.chats?.[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user?.id) {
      fetchChats();
    }
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      bottomRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 0);
  }, []);

  useEffect(() => {
    if (messages.length) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  const handleAddNewChat = async () => {
    setIsLoading(true);
    const newChat = await fetch("/api/create-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user?.id }),
    });

    const data = await newChat.json();
    addChat(data.chat);
    setSelectedChat(data.chat);
    setMessages(data.chat?.messages || []);
    setIsLoading(false);
    return data.chat;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);

    try {
      setPrompt("");
      let chatId = selectedChat?.id;
      if (user) {
        if (!selectedChat && chats.length <= 0) {
          const newChat = await handleAddNewChat();
          chatId = newChat.id;
        }
        addMessage({
          type: "prompt",
          content: prompt,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          chatId: chatId || "",
        });
      } else {
        addAnonymousMessage({
          type: "prompt",
          content: prompt,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 0);
      const res = await fetch("/api/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          chatId,
        }),
      });

      const data = await res.json();
      if (user) {
        addMessage({
          type: "response",
          content: data?.result || "No response, try again",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          chatId: chatId || "",
        });
      } else {
        addAnonymousMessage({
          type: "response",
          content: data?.result || "No response, try again",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const hideSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleDeleteChat = (chatId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        try {
          const res = await fetch(
            `/api/chat?userId=${user?.id}&chatId=${chatId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await res.json();
          if (!res.ok) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: data?.error || "Something went wrong!",
            });
            return;
          }
          Swal.fire({
            icon: "success",
            title: "Success...",
            text: data?.error || "Chat deleted successfully!",
          });
          const newChats = chats.filter((c) => c.id !== chatId);
          setChats(newChats || []);
          setMessages(newChats?.[0]?.messages || []);
          setSelectedChat(newChats?.[0]);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && prompt.trim().length > 0) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleClearAnonymousMessages = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setMessages([]);
        setAnonymousMessages([]);
      }
    });
  };

  return (
    <Spin spinning={isLoading}>
      {!user ? (
        <div className="bg-black w-full h-[70px] flex flex-row gap-4 items-center justify-end">
          <button
            onClick={() => router.push("/login")}
            className="text-white hover:bg-[#E1FF01] hover:text-black px-4 py-2 rounded-3xl font-semibold border-2 border-[#E1FF01] transition-all "
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="hover:text-white bg-[#E1FF01] text-black px-4 py-2 rounded-3xl font-semibold hover:bg-black border-2 border-[#E1FF01] transition-all mr-4"
          >
            Sign up
          </button>
        </div>
      ) : null}
      <div
        className={`bg-black ${
          user ? "h-screen" : "h-[calc(100vh-70px)]"
        } w-full flex flex-row items-center justify-center text-white`}
      >
        <Drawer
          title="Select Chat"
          onClose={hideSidebar}
          open={isSidebarOpen}
          className="bg-black"
        >
          <p
            className="mb-5 border border-[#262626] text-black p-3 rounded-lg flex justify-between items-center cursor-pointer hover:bg-[#171717] hover:text-white transition-all"
            onClick={handleAddNewChat}
          >
            Add new chat
          </p>
          {chats.length ? (
            chats.map((chat, index) => (
              <div
                key={index}
                className={`mb-2 border border-[#262626] text-white p-3 rounded-lg flex justify-between items-center ${
                  selectedChat?.id === chat.id
                    ? "bg-[#262626]"
                    : "!text-[#262626] bg-white"
                }  cursor-pointer hover:bg-[#171717] hover:!text-white transition-all`}
                onClick={() => {
                  setSelectedChat(chat);
                  setMessages(chat?.messages || []);
                }}
              >
                <p>{chat.messages?.[0]?.content || "Default"}</p>
                <span
                  className="text-red-500"
                  onClick={() => handleDeleteChat(chat?.id as string)}
                >
                  <MdDelete size="1.5rem" />
                </span>
              </div>
            ))
          ) : (
            <p>No chats available</p>
          )}
        </Drawer>

        <aside
          className={`top-0 left-0 h-full w-[80px] bg-black flex flex-col justify-between items-center`}
        >
          <div className="my-4 flex flex-col gap-10">
            {user ? (
              <>
                <button
                  className="flex items-center justify-center"
                  onClick={toggleSidebar}
                >
                  {isSidebarOpen ? (
                    <CgClose size="1.8rem" />
                  ) : (
                    <MdMenu size="1.8rem" />
                  )}
                </button>
                <button onClick={handleAddNewChat}>
                  <Image
                    src="/assets/Frame 4.png"
                    alt="Frame 4"
                    width={40}
                    height={40}
                  />
                </button>
              </>
            ) : (
              <button onClick={handleClearAnonymousMessages}>
                <Image
                  src="/assets/Frame 4.png"
                  alt="Frame 4"
                  width={40}
                  height={40}
                />
              </button>
            )}
          </div>

          <div className="flex flex-col">
            <button className="mb-4" onClick={hideSidebar}>
              <Image
                src="/assets/help_svgrepo.com.png"
                alt="help"
                width={30}
                height={30}
              />
            </button>
            <button className="mb-4" onClick={hideSidebar}>
              <Image
                src="/assets/update-round_svgrepo.com.png"
                alt="updateround"
                width={30}
                height={30}
              />
            </button>
            <button className="mb-4" onClick={hideSidebar}>
              <Image
                src="/assets/settings_svgrepo.com.png"
                alt="settings"
                width={30}
                height={30}
              />
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col h-full justify-end w-[calc(100%-80px)] mx-3 overflow-hidden">
          {user && messages.length <= 0 ? (
            <div className="pt-20">
              <h1 className="text-[40px] font-bold">
                <span className="text-[#E1FF01]">Hello,</span> {user?.firstName}
              </h1>
              <p className="text-[24px] mb-10">What would you like me to do?</p>
            </div>
          ) : anonymousMessages.length <= 0 ? (
            <div className="pt-20">
              <h1 className="text-[40px] font-bold">
                <span className="text-[#E1FF01]">Hello,</span> Anonymous
              </h1>
              <p className="text-[24px] mb-10">What would you like me to do?</p>
            </div>
          ) : null}

          <div className="flex flex-col gap-10 w-full mb-4 max-h-full">
            {user ? (
              messages.length ? (
                <div
                  className={`flex flex-col gap-4 text-[16px] ${
                    messages.length && "max-h-[70vh]"
                  } w-full overflow-y-scroll no_scrollbar`}
                >
                  {/* Example cards */}
                  {/* <div className="border border-[#F4F5F7] p-5 rounded-lg flex flex-col justify-between">
                <p>Solana-Focused Development Resources</p>
                <div className="flex justify-end">
                  <Image
                    src="/assets/Frame 90.png"
                    alt="settings"
                    width={30}
                    height={30}
                  />
                </div>
              </div> */}

                  <div
                    className="flex flex-col gap-3 w-full chatbody"
                    ref={bottomRef}
                  >
                    <Messages messages={messages} />
                  </div>
                </div>
              ) : null
            ) : anonymousMessages.length ? (
              <div
                className={`flex flex-col gap-4 text-[16px] ${
                  messages.length && "max-h-[70vh]"
                } w-full overflow-y-scroll no_scrollbar`}
              >
                <div
                  className="flex flex-col gap-3 w-full chatbody"
                  ref={bottomRef}
                >
                  <Messages messages={anonymousMessages} />
                </div>
              </div>
            ) : null}

            <div className="flex items-center justify-between p-4 rounded-lg border border-[#F4F5F7]">
              <div className="flex items-center w-full">
                <Image
                  src="/assets/emoji-smile_svgrepo.com.png"
                  alt="emoji"
                  width={30}
                  height={30}
                />
                <textarea
                  placeholder="Enter Prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-transparent text-white w-full outline-none px-2 no_scrollbar resize-none"
                  onKeyDown={handleKeyDown}
                />
              </div>
              <button
                className="bg-[#E1FF01] text-black px-6 py-2 rounded-lg flex items-center gap-2"
                onClick={handleSubmit}
              >
                {loading ? "Loading..." : "Send"}
                <Image
                  src="/assets/Vector (4).png"
                  alt="send"
                  width={30}
                  height={30}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default ChatPage;
