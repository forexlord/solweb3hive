import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string; 
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`border-[0.5px] border-[#DFDBDB] py-3 px-5 rounded-[8px] w-[200px] ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
