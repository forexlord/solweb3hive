import Image from 'next/image'

interface ChatDemoProps {
    isDarkMode: boolean
}

export function ChatDemo({ isDarkMode }: ChatDemoProps) {
    return (
        <div className="w-full max-w-3xl mx-auto my-20">
            <h2 className="text-center text-3xl font-bold mb-8">
                <span className={isDarkMode ? 'text-[#F4F5F7]' : 'text-[#1A1A1A]'}>Your Personal </span>
                <span className="text-[#E1FF01]">AI Advisor</span>
            </h2>
            <div className={`rounded-2xl p-6 ${isDarkMode ? 'bg-[#202227]' : 'bg-[#F4F5F7]'}`}>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E1FF01] flex items-center justify-center">
                            <Image
                                src="/assets/ai-icon.svg"
                                alt="AI"
                                width={20}
                                height={20}
                            />
                        </div>
                        <p className={`p-3 rounded-lg ${isDarkMode ? 'bg-black text-[#F4F5F7]' : 'bg-white text-[#1A1A1A]'}`}>
                            Hi buddy! I'm here to help you to get started with building a project.
                        </p>
                    </div>
                    <div className="flex items-start gap-3 justify-end">
                        <p className={`p-3 rounded-lg ${isDarkMode ? 'bg-black text-[#F4F5F7]' : 'bg-white text-[#1A1A1A]'}`}>
                            Hello! I'd like to set up my development environment. Do you have guidance on setting up with web3.js?
                        </p>
                        <div className="w-8 h-8 rounded-full bg-[#DCF331] flex items-center justify-center">
                            <span className="text-sm">👤</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

