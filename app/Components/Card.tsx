import React from 'react';

interface CardProps {
  image: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ image, title, description }) => {
  return (
    <div className="bg-[#DCF331] p-4 rounded-lg shadow-lg text-black text-left">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-xl font-bold mt-4">{title}</h3>
      <p className="mt-2 text-sm">{description}</p>
    </div>
  );
};

export default Card;
