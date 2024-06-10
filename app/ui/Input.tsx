import React from 'react';

export default function Input(
    {id, type, placeholder, className = ''}: {id: string, type: string, placeholder: string, className?: string}
){
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
};
