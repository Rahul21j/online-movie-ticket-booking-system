"use client";
import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";
import ShowtimeCard from "@/app/ui/ShowtimeCard";
import { Key, useEffect, useState } from "react";

export default function Page() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await fetch("/api/shows"); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch shows");
        }
        const data = await response.json();
        setShows(data.shows); // Assuming the API response has a 'shows' property with an array of shows
      } catch (error) {
        console.error("Error fetching shows:", error);
        // Handle error state if needed
      }
    }

    fetchShows();
  }, []);
  console.log(shows);
  return (
    <>
      <Header />
      <div className="container mx-auto my-6 min-h-[77vh]">
        <h2 className="text-3xl font-bold mb-6 mr-10">Show Times</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {shows.map(
            (
              show: {
                date: string;
                id: string;
                title: string;
                description: string;
                movieType: string[];
                timings: string[];
                
                typePrice: string[]; 
                
              },
              index: Key | null | undefined
            ) => (
              <ShowtimeCard
                id={show.id}
                key={index}
                title={show.title}
                timings={show.timings}
                movieType={show.movieType}
                
                typePrice={show.typePrice}
                
                date={show.date}
              />
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
