import { ChatInterface } from "./chat-interface";

export function Hero({ isDarkMode }: { isDarkMode: boolean }) {
    return (
        <div className="pt-32 pb-20 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className={isDarkMode ? 'text-[#E1FF01]' : 'text-black'}>
                    Your Ultimate Web3 and
                    <br />
                    Solana Companion
                </span>
            </h1>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-12 ${isDarkMode ? 'text-[#DFDBDB]' : 'text-[#666]'
                }`}>
                From real-time market updates to advanced
                <br className="hidden md:block" />
                development tools, Sol3hive equips you with everything you need
                <br className="hidden md:block" />
                to excel in the decentralized world.
            </p>

            <ChatInterface isDarkMode={isDarkMode} />
        </div>
    );
}

