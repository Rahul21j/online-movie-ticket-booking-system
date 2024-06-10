// src/components/ui/Select.tsx

"use client"; // Mark this component as a Client Component

import React, { useState } from 'react';
import SelectTrigger from './SelectTrigger';
import SelectValue from './SelectValue';
import SelectContent from './SelectContent';
import { SelectItem } from './SelectItem';

type SelectProps = {
  id: string;
  defaultValue?: string;
  children: React.ReactNode;
};

export const Select: React.FC<SelectProps> = ({ id, defaultValue, children }) => {
  const [selected, setSelected] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <select
        id={id}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0"
      >
        {children}
      </select>
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
        <SelectValue placeholder={selected || 'Select an option'} />
      </SelectTrigger>
      {isOpen && (
        <SelectContent>
          {React.Children.map(children, (child) => 
            React.cloneElement(child as React.ReactElement<any>, {
              onClick: () => handleSelect((child as React.ReactElement<any>).props.value),
            })
          )}
        </SelectContent>
      )}
    </div>
  );
};

export default Select;
