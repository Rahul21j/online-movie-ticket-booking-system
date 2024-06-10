'use client';

import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function SearchInput({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);

        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
        params.set('query', term);
        } else {
        params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);
  return (
    <div className="relative w-full max-w-md">
      <input
        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
        onChange={(e) => {
            handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
        type="search"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="M21 21l-4.3-4.3"></path>
      </svg>
    </div>
  );
};
