import React from 'react';

type InputProps = {
  id: string;
  type: string;
  placeholder: string;
  value?: string; // Make value prop optional if it can be initially undefined
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function Input(
  { id, type, placeholder, value, onChange }: {id: string, type: string, placeholder: string, className?: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}
){
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value} // Bind value prop to the input element
      onChange={onChange} // Bind onChange prop to handle input changes
      className="border border-gray-300 rounded-md px-3 py-2 w-full"
    />
  );
};
