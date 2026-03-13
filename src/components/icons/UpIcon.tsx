import React from 'react';

export interface UpIconProps {
  className?: string;
  size?: number;
}

export const UpIcon: React.FC<UpIconProps> = ({ className, size = 12 }) => {
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
        d="M1.57699 8.43347L5.17596 3.19861C5.57331 2.62064 6.42669 2.62064 6.82404 3.19861L10.423 8.43347C10.8792 9.09697 10.4041 10 9.59897 10H2.40103C1.59585 10 1.12083 9.09697 1.57699 8.43347Z"
        fill="currentColor"
      />
    </svg>
  );
};
