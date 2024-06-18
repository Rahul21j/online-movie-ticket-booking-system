import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Header() {
  const { user, isLoading } = useUser();
  
  useEffect(() => {
    if (user) {
      const encodedEmail = Buffer.from(user.email).toString('base64');
      Cookies.set('user_email', encodedEmail);

      // Call the API to check and add the user to MongoDB
      axios.post('/api/users/signup', {
        email: user.email,
        // name: user.name,
        // picture: user.picture,
        // nickname: user.nickname,
      })
      .then(response => {
        console.log('User checked/added:', response.data);
      })
      .catch(error => {
        console.error('Error checking/adding user:', error);
      });
    } else {
      // Cookies.remove('user_email');
    }
  }, [user]);
  
  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
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
            className="w-6 h-6"
          >
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M7 3v18"></path>
            <path d="M3 7.5h4"></path>
            <path d="M3 12h18"></path>
            <path d="M3 16.5h4"></path>
            <path d="M17 3v18"></path>
            <path d="M17 7.5h4"></path>
            <path d="M17 16.5h4"></path>
          </svg>
          <span className="text-xl font-bold">WatchMovies</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/movies" className="hover:underline">
            Movies
          </Link>
          <Link href="/shows" className="hover:underline">
            Showtimes
          </Link>
          <Link href="/my-tickets" className="hover:underline">
            My Tickets
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                <img src={user.picture} alt={user.nickname ?? ''} width="35" height="35" className="rounded-full" />
            </Menu.Button>
            <Menu.Items className="bg-gray-900 text-white absolute right-0 mt-2 w-56 origin-top-right border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/profile" className={`bg-gray-900 text-white block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}>
                      View Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/api/auth/logout" className={`bg-gray-900 text-white block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}>
                      Sign Out
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </>
      ) : (
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
          <Link href="/api/auth/login">Sign In</Link>
        </button>
      )}
    </div>
    </header>
  );
};
