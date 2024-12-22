import Image from 'next/image'

interface FeatureCardProps {
    title: string
    description: string
    imagePath: string
    isDarkMode?: boolean
}

export function FeatureCard({ title, description, imagePath, isDarkMode }: FeatureCardProps) {
    return (
        <div className={`rounded-2xl overflow-hidden ${isDarkMode ? 'bg-[#202227]' : 'bg-[#F4F5F7]'}`}>
            <div className="relative h-48">
                <Image
                    src={imagePath}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-[#F4F5F7]' : 'text-[#1A1A1A]'}`}>
                    {title}
                </h3>
                <p className={`${isDarkMode ? 'text-[#DFDBDB]' : 'text-[#A3A3A3]'}`}>
                    {description}
                </p>
            </div>
        </div>
    )
}

