'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function ChatInterface({ isDarkMode }: { isDarkMode: boolean }) {
    const [message, setMessage] = useState('');
    const router = useRouter();

    return (
        <div className="max-w-2xl mx-auto px-4 text-center space-y-8">
            <button className="px-8 py-3 bg-[#E1FF01] rounded-full text-black font-semibold" onClick={() => {
                router.push('/dashboard')
            }}>
                Start for Free
            </button>

            <div className={`flex items-center gap-2 p-2 rounded-full ${isDarkMode ? 'bg-[#202227]' : 'bg-[#F4F5F7]'}`}>
                <div className="flex items-center gap-2 flex-1 px-4">
                    <Image
                        src="/assets/chat-icon.svg"
                        alt="Chat"
                        width={24}
                        height={24}
                        className="opacity-60"
                    />
                    <input
                        type="text"
                        placeholder="Chat your personal Sol3AI Advisor"
                        className="w-full bg-transparent border-none outline-none text-sm"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button className="px-6 py-2 bg-[#E1FF01] rounded-full text-black text-sm font-medium">
                    Send
                </button>
            </div>

            <div className="flex flex-col items-center gap-2">
                <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="w-8 h-8 rounded-full border-2 border-black bg-[#E1FF01] flex items-center justify-center text-xs"
                        >
                            👤
                        </div>
                    ))}
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-[#DFDBDB]' : 'text-[#A3A3A3]'}`}>
                    with 100+ Active premium Members
                </p>
            </div>
        </div>
    );
}

