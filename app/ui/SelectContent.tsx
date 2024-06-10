// src/components/ui/SelectContent.tsx

"use client"; // Mark this component as a Client Component

import React from 'react';

type SelectContentProps = {
  children: React.ReactNode;
};

const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
  return (
    <ul
      className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      role="listbox"
    >
      {children}
    </ul>
  );
};

export default SelectContent;
