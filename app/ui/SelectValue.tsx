// src/components/ui/SelectValue.tsx

"use client"; // Mark this component as a Client Component

import React from 'react';

type SelectValueProps = {
  placeholder: string;
};

const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  return (
    <span style={{ pointerEvents: 'none' }}>{placeholder}</span>
  );
};

export default SelectValue;
