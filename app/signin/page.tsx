import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";
import Link from "next/link";

export default function Page () {
  return (
    <>
      <Header/>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center min-h-[84vh]">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
        <form className="w-full max-w-md space-y-4">
          <div>
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              placeholder="john@example.com"
              required
              type="email"
            />
          </div>
          <div>
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="password"
              required
              type="password"
            />
          </div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            type="submit"
          >
            Sign In
          </button>
          <div className="text-center text-gray-500">
            Don't have an account?{' '}
            <Link href="/signup">
              Sign Up
            </Link>
          </div>
          {/* <div className="text-center text-gray-500">
            <a className="text-primary-500 hover:underline" href="#">
              Forgot Password?
            </a>
          </div> */}
        </form>
      </div>
      <Footer/>
    </>
  );
};
