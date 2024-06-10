import Link from 'next/link';

export default function Header () {
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
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
        <Link href="/signin">
          Sign In
        </Link>
        </button>
        {/* <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
          Buy Tickets
        </button> */}
      </div>
    </header>
  );
};
