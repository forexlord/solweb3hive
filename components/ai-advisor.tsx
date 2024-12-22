export function AIAdvisor({ isDarkMode }: { isDarkMode: boolean }) {
    return (
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Your Personal AI Advisor
                </h2>
                <div className={`rounded-2xl p-6 ${isDarkMode ? 'bg-[#202227]' : 'bg-[#F4F5F7]'}`}>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#E1FF01] flex items-center justify-center flex-shrink-0">
                                <span>🤖</span>
                            </div>
                            <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-black' : 'bg-white'} max-w-[80%]`}>
                                <p className={isDarkMode ? 'text-white' : 'text-black'}>
                                    Hi buddy! I&apos;m here to help you to get started with building a project.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 justify-end">
                            <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-black' : 'bg-white'} max-w-[80%]`}>
                                <p className={isDarkMode ? 'text-white' : 'text-black'}>
                                    Hello! I&apos;d like to set up my development environment. Do you have guidance on setting up with web3.js?
                                </p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#E1FF01] flex items-center justify-center flex-shrink-0">
                                <span>👤</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <button className="px-8 py-3 bg-[#E1FF01] rounded-full text-black font-semibold">
                        Chat Now
                    </button>
                </div>
            </div>
        </section>
    );
}
