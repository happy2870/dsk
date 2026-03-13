import React from 'react';

export interface DownIconProps {
  className?: string;
  size?: number;
}

export const DownIcon: React.FC<DownIconProps> = ({ className, size = 12 }) => {
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
        d="M1.57699 4.56653L5.17596 9.80139C5.57331 10.3794 6.42669 10.3794 6.82404 9.80139L10.423 4.56653C10.8792 3.90303 10.4041 3 9.59897 3H2.40103C1.59585 3 1.12083 3.90303 1.57699 4.56653Z"
        fill="currentColor"
      />
    </svg>
  );
};
