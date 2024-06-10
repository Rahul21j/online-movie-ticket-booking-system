import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";
import MovieCard from "@/app/ui/MovieCard";
import { Key } from "react";
export default function Page(){
    const movies = require("@/app/lib/placeholder-data").movies
       
        return (
            <>
                <Header/>
                <div className="container mx-auto mt-2 p-4">
                    {/* <div className="flex flex-wrap mb-4">
                        <div className="w-full md:w-1/4 mb-4">
                        <label htmlFor="perPage" className="block mb-2">Movies Per Page:</label>
                        <select
                            id="perPage"
                            name="perPage"
                            className="block w-full px-4 py-2 border rounded"
                        >
                            {[8, 12, 16, 20, 24].map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                            ))}
                        </select>
                        </div>
                        <div className="w-full md:w-1/4 mb-4">
                        <label htmlFor="goToPage" className="block mb-2">Go to Page:</label>
                        <div className="flex">
                            <input
                            type="number"
                            id="goToPage"
                            name="goToPage"
                            className="w-2/3 px-4 py-2 border rounded-l"
                            />
                            <button
                            className="w-1/3 px-4 py-2 bg-blue-500 text-white rounded-r"
                            >
                            Go
                            </button>
                        </div>
                        </div>
                    </div> */}
                    <div className="flex">
                        <h2 className="text-3xl font-bold mb-6 mr-10">Movies</h2>
                        <div className="relative w-full max-w-md">
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
                                placeholder="Search movies..."
                                type="search"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="absolute right-3 top-1/3 -translate-y-1/2 w-5 h-5 text-gray-500"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {movies.map((movie: { id: string; title: string; genre: any[]; poster: string; }, index: Key | null | undefined) => (
                            <MovieCard id={movie.id} key={index} title={movie.title} genre={movie.genre.join(', ')} poster={movie.poster} />
                        ))}
                    </div>
                </div>
                <Footer/>
            </>
          );
        };