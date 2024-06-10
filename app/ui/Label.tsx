import React from 'react';

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
};

export default function Label({ htmlFor, children }: LabelProps){
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  );
};

