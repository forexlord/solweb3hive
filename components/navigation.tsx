import Image from 'next/image';
import Link from 'next/link';

interface NavigationProps {
    isDarkMode: boolean;
    toggleMode: () => void;
}

export function Navigation({ isDarkMode, toggleMode }: NavigationProps) {
    const navItems = ['Home', 'Features', 'Premium', 'How it works', 'About us'];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/">
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
                </Link>

                <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full ${isDarkMode ? 'bg-[#202227] border border-[#333]' : 'bg-[#F4F5F7]'
                    }`}>
                    {navItems.map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isDarkMode ? 'text-[#DFDBDB] hover:bg-[#E1FF01] hover:text-black' :
                                'text-[#A3A3A3] hover:bg-[#E1FF01] hover:text-black'
                                }`}
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleMode}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-[#E1FF01]"
                    >
                        {isDarkMode ? '🌞' : '🌙'}
                    </button>
                    <div className="w-10 h-10 rounded-full bg-[#E1FF01] flex items-center justify-center">
                        👤
                    </div>
                </div>
            </div>
        </nav>
    );
}

