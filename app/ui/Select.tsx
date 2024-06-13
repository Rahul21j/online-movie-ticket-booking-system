// src/components/ui/Select.tsx

import React, { useState, useEffect } from 'react';
import SelectTrigger from './SelectTrigger';
import SelectValue from './SelectValue';
import SelectContent from './SelectContent';
import SelectItem from './SelectItem';

type SelectProps = {
  id: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  value?: string;
  children: React.ReactNode;
};

export const Select: React.FC<SelectProps> = ({ id, defaultValue, onChange, value, children }) => {
  const [selected, setSelected] = useState(defaultValue || ''); // Use defaultValue or empty string as initial selected value
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (value !== undefined && value !== selected) {
      setSelected(value);
    }
  }, [value, selected]);

  const handleSelect = (newValue: string) => {
    setSelected(newValue);
    setIsOpen(false);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleInternalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelected(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <div className="relative">
      <select
        id={id}
        value={selected} // Bind selected state to the value attribute of the select element
        onChange={handleInternalChange}
        className="absolute inset-0 w-full h-full opacity-0"
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement<any>, {
            onClick: () => handleSelect((child as React.ReactElement<any>).props.value),
          })
        )}
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
