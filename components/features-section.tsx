import Image from 'next/image';

interface FeatureCardProps {
    title: string;
    description: string;
    image: string;
    isDarkMode: boolean;
}

function FeatureCard({ title, description, image, isDarkMode }: FeatureCardProps) {
    return (
        <div className={`relative overflow-hidden rounded-2xl ${isDarkMode ? 'bg-[#202227]' : 'bg-white'}`}>
            <div className="relative h-48">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-4 right-4 w-8 h-8 bg-[#E1FF01] rounded-full flex items-center justify-center">
                    <span className="text-black">👤</span>
                </div>
            </div>
            <div className="p-6">
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {title}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-[#DFDBDB]' : 'text-[#A3A3A3]'}`}>
                    {description}
                </p>
            </div>
        </div>
    );
}

export function FeaturesSection({ isDarkMode }: { isDarkMode: boolean }) {
    const features = [
        {
            title: "Solana-Focused Development Resources",
            description: "Access comprehensive development tools and resources for Solana",
            image: "/placeholder.svg?height=200&width=300"
        },
        {
            title: "Market update and analysis",
            description: "Stay informed with real-time market insights and analysis",
            image: "/placeholder.svg?height=200&width=300"
        },
        {
            title: "Investment Guidance",
            description: "Get expert investment advice and portfolio management tips",
            image: "/placeholder.svg?height=200&width=300"
        },
        {
            title: "Web3 Education & Support",
            description: "Learn and grow with our comprehensive educational resources",
            image: "/placeholder.svg?height=200&width=300"
        }
    ];

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                        Explore what's <span className="italic">included</span>
                    </h2>
                    <p className={`${isDarkMode ? 'text-[#DFDBDB]' : 'text-[#A3A3A3]'}`}>
                        Unlock Powerful Insights and Resources for Every Step of Your Journey
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} isDarkMode={isDarkMode} />
                    ))}
                </div>
            </div>
        </section>
    );
}

