import React from 'react';

export interface NotificationIconProps {
  className?: string;
  size?: number;
  active?: boolean;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({
  className,
  size = 24,
  active = false
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.22112 9.30005C6.22004 8.47019 6.37 7.6483 6.66236 6.88171C6.95472 6.11513 7.38369 5.41899 7.92458 4.83341C8.46547 4.24783 9.10758 3.78437 9.81393 3.46973C10.5203 3.15509 11.2769 2.99548 12.0402 3.0001C15.2275 3.02635 17.7789 5.90508 17.7789 9.3788V10C17.7789 13.1325 18.3825 14.9525 18.9137 15.95C18.9702 16.0562 18.9999 16.1767 19 16.2994C19.0001 16.4221 18.9705 16.5426 18.9143 16.6489C18.8581 16.7553 18.7771 16.8437 18.6795 16.9053C18.582 16.9669 18.4712 16.9996 18.3584 17H5.64162C5.52879 16.9996 5.41804 16.9669 5.32047 16.9053C5.2229 16.8437 5.14194 16.7553 5.0857 16.6489C5.02945 16.5426 4.9999 16.4221 5 16.2994C5.0001 16.1767 5.02985 16.0562 5.08627 15.95C5.61747 14.9525 6.22112 13.1325 6.22112 10V9.30005Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 21H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {active && <circle cx="22" cy="2" r="2" fill="#0069FF" />}
    </svg>
  );
};
