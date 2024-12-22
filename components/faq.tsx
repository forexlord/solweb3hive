'use client';

import { useState } from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
    isDarkMode: boolean;
}

function FAQItem({ question, answer, isOpen, onToggle, isDarkMode }: FAQItemProps) {
    return (
        <div className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-[#202227]' : 'bg-[#F4F5F7]'}`}>
            <button
                className="w-full px-6 py-4 text-left flex items-center justify-between"
                onClick={onToggle}
            >
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>{question}</span>
                <span className={`text-2xl ${isDarkMode ? 'text-[#E1FF01]' : 'text-black'}`}>
                    {isOpen ? '−' : '+'}
                </span>
            </button>
            {isOpen && (
                <div className="px-6 pb-4">
                    <p className={isDarkMode ? 'text-[#DFDBDB]' : 'text-[#A3A3A3]'}>{answer}</p>
                </div>
            )}
        </div>
    );
}

export function FAQ({ isDarkMode }: { isDarkMode: boolean }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What is Sol3hive, and how can it help me?",
            answer: "Sol3hive is an AI-first platform designed to provide comprehensive resources and tools for Web3 and Solana. Whether you're an investor, developer, or newcomer, Sol3hive offers everything you need to navigate and succeed in the decentralized world."
        },
        {
            question: "How do I get started with Sol3hive?",
            answer: "Getting started is easy! Simply sign up for an account and explore our resources."
        },
        {
            question: "What features are available to premium users?",
            answer: "Premium users get access to advanced features, market insights, and priority support."
        }
    ];

    return (
        <section className="py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                            isDarkMode={isDarkMode}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

