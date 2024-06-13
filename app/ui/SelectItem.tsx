// src/components/ui/SelectItem.tsx

"use client"; // Mark this component as a Client Component

import React from 'react';

type SelectItemProps = {
  value: string;
  children: React.ReactNode;
  onClick?: () => void; // Make onClick optional to avoid type errors
};

export const SelectItem: React.FC<SelectItemProps> = ({ value, children, onClick }) => {
  return (
    <option
      className="cursor-pointer select-none relative py-2 pl-3 pr-9"
      role="option"
      value={value}
      onClick={onClick}
    >
      {children}
    </option>
  );
};

export default SelectItem;
