
import React from 'react';

export default function Input(
  { id, type, placeholder, value, min, max, onChange }: {id: string, type: string, placeholder: string, className?: string, value?: string|number, min?: string, max?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}
){
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value} // Bind value prop to the input element
      onChange={onChange} // Bind onChange prop to handle input changes
      className="border border-gray-300 rounded-md px-3 py-2 w-full"
      min={min}
      max={max}
      required
    />
  );
};
