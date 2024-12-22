interface WorkItemProps {
    title: string;
    description: string;
    icon: string;
    isDarkMode: boolean;
}

function WorkItem({ title, description, icon, isDarkMode }: WorkItemProps) {
    return (
        <div className={`flex items-center gap-6 p-6 rounded-xl ${isDarkMode ? 'bg-[#202227]' : 'bg-[#F4F5F7]'}`}>
            <div className="w-12 h-12 rounded-full bg-[#E1FF01] flex items-center justify-center flex-shrink-0">
                {icon}
            </div>
            <div>
                <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {title}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-[#DFDBDB]' : 'text-[#A3A3A3]'}`}>
                    {description}
                </p>
            </div>
        </div>
    );
}

export function HowItWorks({ isDarkMode }: { isDarkMode: boolean }) {
    const items = [
        {
            title: "Explore & Learn",
            description: "Access Web3 & Solana resources",
            icon: "🔍"
        },
        {
            title: "Stay Updated",
            description: "Real-time market insights",
            icon: "📈"
        },
        {
            title: "Build & Innovate",
            description: "Step by Step Development",
            icon: "🛠️"
        },
        {
            title: "Connect & Grow",
            description: "Join the Community",
            icon: "🤝"
        }
    ];

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    How it works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {items.map((item, index) => (
                        <WorkItem key={index} {...item} isDarkMode={isDarkMode} />
                    ))}
                </div>
            </div>
        </section>
    );
}

