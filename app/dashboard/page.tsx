"use client";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; 
import Image from "next/image";
import Footer from "../Components/Footer";

export default function Home() {
  const [activeLink, setActiveLink] = useState("Home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div
      className={`h-fit py-10 ${isDarkMode ? "bg-black" : "bg-[#fcfdfd]"}`}
    >
      {/* Navigation Bar */}
      <div
        className={`flex justify-between items-center px-5 sticky inset-0 lg:px-20 ${
          isDarkMode ? "bg-black" : "bg-white"
        }`}
      >
        {/* Logo */}
        <div>
          <Image
            src={isDarkMode ? "/assets/solhive logo.svg" : "/assets/SOL3HIVE1 (1).svg"}
            alt="Solhive Logo"
            width={187}
            height={42}
          />
        </div>

        {/* Desktop Navigation */}
        <div className="flex gap-5 items-center">
          <div
            className={`hidden md:flex gap-2 text-${
              isDarkMode ? "[#DFDBDB]" : "[#A3A3A3]"
            } font-semibold rounded-[74px] ${
              isDarkMode ? "bg-[#202227] border border-[#A3A3A3]" : "bg-[#F4F5F7]"
            } px-4 py-3`}
          >
            {["Home", "Feature", "Premium", "How it Works", "About Us"].map((link) => (
              <a
                key={link}
                href="#"
                onClick={() => setActiveLink(link)}
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                  activeLink === link
                    ? "bg-[#E1FF01] text-black"
                    : isDarkMode ? "text-[#DFDBDB]" : "text-[#A3A3A3]"
                }`}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Mode Toggle and Hamburger */}
          <div className="flex gap-3 items-center">
            {/* Dark Mode Toggle */}
            <Image
              src={isDarkMode ? "/assets/Frame 4.svg" : "/assets/Frame 14 (1).svg"}
              alt="Mode Toggle"
              width={40}
              height={40}
              onClick={toggleMode}
              className="cursor-pointer"
            />

            {/* Hamburger Menu */}
            <button onClick={toggleNav} className="block md:hidden p-2 z-50">
              {isNavOpen ? (
                <AiOutlineClose className={`text-3xl ${isDarkMode ? "text-[#E1FF01]" : "text-black"}`} />
              ) : (
                <AiOutlineMenu className={`text-3xl ${isDarkMode ? "text-[#E1FF01]" : "text-black"}`} />
              )}
            </button>
          </div>
        </div>

        
        <div
          className={`fixed top-0 right-0 h-screen w-3/4 bg-white dark:bg-black transform ${
            isNavOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center`}
        >
          <div className="flex flex-col gap-6 text-lg font-semibold text-center">
            {["Home", "Feature", "Premium", "How it Works", "About Us"].map((link) => (
              <a
                key={link}
                href="#"
                onClick={() => {
                  setActiveLink(link);
                  setIsNavOpen(false);
                }}
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                  activeLink === link
                    ? "bg-[#E1FF01] text-black"
                    : isDarkMode ? "text-[#DFDBDB]" : "text-[#A3A3A3]"
                }`}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      
      <div className={`flex items-center justify-center w-full flex-col text-center pt-20 ${isDarkMode ? "text-[#F4F5F7]" : "text-[#1A1A1A]"}`}>
        <h2 className={`lg:leading-[71px] text-${isDarkMode ? "#E1FF01" : "#1A1A1A"} text-[40px] leading-[50px] lg:text-[64px]`}>
          Your Ultimate Web3 and <br className="hidden lg:block" /> Solana Companion
        </h2>
        <p className="w-full pt-5 px-5 lg:px-0 text-[20px]">
          From real-time market updates to advanced <br className="hidden lg:block" /> development tools, Sol3hive equips you with everything you need <br className="hidden lg:block" /> to excel in the decentralized world.
        </p>
        <div className="pt-5">
          <button className="px-9 py-4 rounded-[90px] bg-[#DCF331] text-[#1A1A1A]">Start For Free</button>
        </div>

        <div
  className={`lg:w-[60%] mx-3 my-5 flex items-center justify-between p-2 lg:p-4 rounded-[30px] 
    ${isDarkMode ? "border border-white" : "bg-[#F4F5F7]"}`}
>
  <div className="flex items-center flex-grow">
    <Image src="/assets/emoji-smile_svgrepo.com.png" alt="emoji" width={30} height={30} />
    <input
      type="text"
      placeholder="Chat your personal Sol3AI Advisor"
      className={`w-full outline-none px-2 lg:px-4 rounded-lg 
        ${isDarkMode ? "bg-transparent text-white" : "bg-[#F4F5F7] text-black"}`}
    />
  </div>
  <button className="bg-[#E1FF01] text-black px-4 lg:px-6 py-2 rounded-lg flex items-center gap-2">
    Send
    <Image src="/assets/Vector (4).png" alt="send" width={30} height={30} />
  </button>
</div>

      </div>

      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
