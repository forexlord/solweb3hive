'use client';

import { useState } from 'react';

export function Testimonials({ isDarkMode }: { isDarkMode: boolean }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const testimonials = [
        {
            text: "We help to accelerate the creation process by providing you a team of talented and professional developers at your fingertips. Think of us as your one-stop shop for all your tech and growth needs.",
            author: "Name Here",
            role: "Role Here"
        },
        // Add more testimonials as needed
    ];

    return (
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className={`text-2xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    What our Clients say About us
                </h2>
                <div className={`relative p-8 rounded-2xl ${isDarkMode ? 'bg-[#202227]' : 'bg-[#F4F5F7]'}`}>
                    <div className="text-center">
                        <p className={`text-lg mb-6 ${isDarkMode ? 'text-[#DFDBDB]' : 'text-[#A3A3A3]'}`}>
                            {testimonials[currentSlide].text}
                        </p>
                        <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            {testimonials[currentSlide].author}
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-[#DFDBDB]' : 'text-[#A3A3A3]'}`}>
                            {testimonials[currentSlide].role}
                        </div>
                    </div>
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-[#E1FF01]' : isDarkMode ? 'bg-[#DFDBDB]' : 'bg-[#A3A3A3]'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

