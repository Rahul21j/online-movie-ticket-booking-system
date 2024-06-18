'use client'
import { useEffect, useState } from "react";
import Header from "@/app/ui/Header";
import MovieCard from "@/app/ui/MovieCard";
import ShowtimeCard from "@/app/ui/ShowtimeCard";
import Footer from "@/app/ui/Footer";
import Link from "next/link";
import axios from "axios";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await axios.get("/api/shows"); 
        setShows(response.data.shows); 
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    }

    async function fetchMovies() {
      try {
        const response = await axios.get("/api/movies"); 
        setMovies(response.data.movies); 
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    async function addUserToDB(){
      try {
        console.log('adding user to database');
        const response = await axios.post("/api/user/signup");
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    addUserToDB();
    fetchMovies();
    fetchShows();
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-white py-8">
          <div className="container mx-auto">
            <div className="flex">
              <h2 className="text-3xl font-bold mb-6 mr-10">Now Showing</h2>
            </div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {movies.map(
                (
                  movie: {
                    id: string;
                    title: string;
                    genre: any[];
                    poster: string;
                  },
                  index: number
                ) => (
                  <MovieCard
                    id={movie.id}
                    key={index}
                    title={movie.title}
                    poster={movie.poster}
                  />
                )
              )}
            </div>
          </div>
        </section>
        <section className="bg-gray-100 py-8">
          <div className="container mx-auto">
            <div className="flex">
              <h2 className="text-3xl font-bold mb-6 mr-10">Show Times</h2>
              <button className="bg-primary text-primary-foreground inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                <Link href="/shows">View All</Link>
              </button>
            </div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {shows.map(
                (
                  show: {
                    id: string;
                    title: string;
                    timings: { type: string; time: string }[];
                    movieType: string[];
                    date: string;
                  },
                  index: number
                ) => (
                  <ShowtimeCard
                    id={show.id}
                    key={index}
                    title={show.movie}
                    timings={show.timings}
                    movieType={show.movieType}
                    date={show.date}
                  />
                )
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
