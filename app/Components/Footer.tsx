"use client";
import Image from "next/image";

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center py-20 ${
        isDarkMode ? "bg-black border-t-2 border-[#DCF33166]" : "bg-[#F4F5F7]"
      }`}
    >
      <div>
        <Image
          src={
            isDarkMode
              ? "/assets/solhive logo.svg"
              : "/assets/SOL3HIVE1 (1).svg"
          }
          alt="Solhive Logo"
          width={187}
          height={42}
        />
      </div>
      <div>
        <p
          className={`text-center ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Sol3hive provides all the tools and insights you need to succeed in
          Web3 and Solana, <br />
          from real-time market updates to advanced development resources.
        </p>
      </div>
    </div>
  );
}
