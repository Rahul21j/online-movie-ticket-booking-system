// src/components/ui/SelectTrigger.tsx

"use client"; // Mark this component as a Client Component

import React from 'react';

type SelectTriggerProps = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
};

const SelectTrigger: React.FC<SelectTriggerProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      role="button"
      aria-haspopup="listbox"
      aria-expanded="false"
      onClick={onClick}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-chevron-down h-4 w-4 opacity-50"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    </div>
  );
};

export default SelectTrigger;
