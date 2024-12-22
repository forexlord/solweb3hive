export function Pricing({ isDarkMode }: { isDarkMode: boolean }) {
    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Ready to Elevate Your Web3 Experience?
                </h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className={`rounded-2xl p-8 ${isDarkMode ? 'bg-[#202227]' : 'bg-[#F4F5F7]'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Premium</h3>
                            <div className="flex items-center">
                                <span className="mr-2">🌟</span>
                                <span className={isDarkMode ? 'text-white' : 'text-black'}>Monthly</span>
                            </div>
                        </div>
                        <div className="mb-6">
                            <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>$29.99</span>
                            <span className={`text-sm ${isDarkMode ? 'text-[#DFDBDB]' : 'text-[#A3A3A3]'}`}>/month</span>
                        </div>
                        <button className="w-full py-3 bg-[#E1FF01] rounded-full text-black font-semibold mb-6">
                            Get Started
                        </button>
                    </div>
                    <div className={`rounded-2xl p-8 ${isDarkMode ? 'bg-[#E1FF01]' : 'bg-[#E1FF01]'}`}>
                        <h3 className="text-xl font-bold text-black mb-6">Featured Services</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-2 text-black">
                                <span>✓</span> Access Market Insights
                            </li>
                            <li className="flex items-center gap-2 text-black">
                                <span>✓</span> Development Support Access
                            </li>
                            <li className="flex items-center gap-2 text-black">
                                <span>✓</span> Regular Market Education
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

