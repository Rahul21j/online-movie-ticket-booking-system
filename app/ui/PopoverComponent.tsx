import React from 'react';
import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import Calendar from './Calendar';

type Variant = 'outline' | 'solid'; // Define your variant types
type Size = 'sm' | 'md' | 'lg'; // Define your size types

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function CustomButton({
  children,
  className,
  variant,
  size,
  ...rest
}: ButtonProps) {
  const buttonClasses = clsx(
    'flex items-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:aria-disabled:cursor-not-allowed:aria-disabled:opacity-50',
    {
      'bg-blue-500 text-white hover:bg-blue-400': variant === 'outline',
      'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'solid',
      'h-9': size === 'sm',
      'h-12': size === 'md',
      'h-16': size === 'lg',
    },
    className
  );

  return (
    <button {...rest} className={buttonClasses}>
      {children}
    </button>
  );
}

export default function PopoverComponent() {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button as={CustomButton} variant="outline" size="sm">
              <span>Select Date</span>
            </Popover.Button>
            <Popover.Panel className="p-0 max-w-[276px]">
              {/* Content for the Popover */}
              <Calendar />
            </Popover.Panel>
          </>
        )}
      </Popover>
      <CustomButton variant="outline" size="sm">
        <span>Filter</span>
      </CustomButton>
    </div>
  );
}
