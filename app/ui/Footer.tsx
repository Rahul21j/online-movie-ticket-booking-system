export default function Footer () {
  return (
    <footer className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
      <p className="text-sm">© 2024 WatchMovies</p>
      <nav className="hidden md:flex items-center gap-6">
        <a className="hover:underline" href="#">Privacy Policy</a>
        <a className="hover:underline" href="#">Terms of Service</a>
      </nav>
    </footer>
  );
};

