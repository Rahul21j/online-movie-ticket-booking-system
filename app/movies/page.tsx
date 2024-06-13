'use client'
import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";
import MovieCard from "@/app/ui/MovieCard";
import { Key, useEffect, useState } from "react";
import axios from "axios";

export default function Page(){
    const [movies, setMovies] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredMovies, setFilteredMovies] = useState<any[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/api/movies');
                setMovies(response.data.movies); 
                setFilteredMovies(response.data.movies);
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            }
        };

        fetchMovies(); 
    }, []);

    useEffect(() => {
        const result = movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMovies(result);
      }, [searchQuery, movies]);
    
      const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
      };
       
        return (
            <>
                <Header/>
                <div className="container mx-auto mt-2 p-4">
                    <div className="flex">
                        <h2 className="text-3xl font-bold mb-6 mr-10">Movies</h2>
                        <div className="relative w-full max-w-md">
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
                            placeholder="Search movies..."
                            type="search"
                            value={searchQuery}
                            onChange={handleSearchChange}
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
                                className="absolute right-3 top-1/3 -translate-y-1/2 w-5 h-5 text-gray-500"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {filteredMovies.map((movie: { id: string; title: string; poster: string; }, index: Key | null | undefined) => (
                            <MovieCard id={movie.id} key={index} title={movie.title} poster={movie.poster} />
                        ))}
                    </div>
                </div>
                <Footer/>
            </>
          );
        };