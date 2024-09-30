"use client";
import React, { useState } from "react";
import Image from "next/image";

const ChatPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  
  const hideSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="bg-black h-screen w-full flex flex-col items-center justify-center text-white">
      
      <aside
        className={`fixed top-0 left-0 h-full w-[120px] bg-black flex flex-col justify-between items-center py-5 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
       
        <div className="my-4 flex flex-col gap-10">
          <button onClick={toggleSidebar}>
           
             {isSidebarOpen ? (
          <p className="text-white text-[50px]">X</p>
        ) : (
          <Image
            src="/assets/menu_svgrepo.com.png"
            alt="Menu"
            width={40}
            height={40}
          />
        )}
          </button>
          <button>
            <Image
              src="/assets/Frame 4.png"
              alt="Frame 4"
              width={40}
              height={40}
            />
            
          </button>
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
      <div className="flex flex-col m-auto h-full justify-between w-full lg:w-[820px] p-5">
        <div className="pt-20">
          <h1 className="text-[40px] font-bold">
            <span className="text-[#E1FF01]">Hello,</span> Sadeeq
          </h1>
          <p className="text-[24px] mb-10">What would you like me to do?</p>
        </div>

        <div className="flex flex-col gap-10 w-full justify-between">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[16px]">
            {/* Example cards */}
            <div className="border border-[#F4F5F7] p-5 rounded-lg flex flex-col justify-between">
              <p>Solana-Focused Development Resources</p>
              <div className="flex justify-end">
                <Image
                  src="/assets/Frame 90.png"
                  alt="settings"
                  width={30}
                  height={30}
                />
              </div>
            </div>
            {/* Repeat the above card structure for the other items */}
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-[#F4F5F7]">
            <div className="flex items-center">
              <Image
                src="/assets/emoji-smile_svgrepo.com.png"
                alt="emoji"
                width={30}
                height={30}
              />
              <input
                type="text"
                placeholder="Enter Prompt"
                className="bg-transparent text-white w-full outline-none px-2"
              />
            </div>
            <button className="bg-[#E1FF01] text-black px-6 py-2 rounded-lg flex items-center gap-2">
              Send
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
  );
};

export default ChatPage;
