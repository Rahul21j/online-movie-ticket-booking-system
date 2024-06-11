
'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { showtimes } from "@/app/lib/placeholder-data";


type ShowType = {
    id: string;
    title: string;
    description: string;
    timings: {
      type: string; // 2D, 3D, IMAX, etc.
      time: string; // Time in HH:MM AM/PM format
    }[];
};

const Page = () => {
  const [shows, setShows] = useState<ShowType[]>([]);

  useEffect(() => {
    const fetchShows = async () => {
        const foundShow = showtimes
        setShows(foundShow || null);
    };

    fetchShows();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Buy Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {shows.map((show) => (
          <div key={show.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{show.title}</h2>
              <Link href={`/buy-tickets/${show.id}`} className="text-blue-500 hover:underline">
                Buy Tickets
              </Link>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              {show.description}
            </p>
            <div>
              <h3 className="text-xl font-semibold">Showtimes</h3>
              {show.timings.map((timing, index) => (
                <div className="flex items-center justify-between" key={index}>
                  <span className="text-gray-500">{timing.type}</span>
                  <span className="text-gray-500">{timing.time}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
