import React from 'react';

export interface EqualIconProps {
  className?: string;
  size?: number;
}

export const EqualIcon: React.FC<EqualIconProps> = ({ className, size = 12 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 6H8"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
};
