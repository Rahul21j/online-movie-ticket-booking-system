'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ShowtimeCard from '../ui/ShowtimeCard';
import Header from '@/app/ui/Header';
import Footer from '@/app/ui/Footer';

type Show = {
    id: string;
    title: string;
    time: string;
    movieType: string[];
    date: string;
    timings: string[];
    description: string;
    movie: string;
}

const Page = () => {
    const [shows, setShows] = useState<Show[]>([]);
    const [title, setMovieTitle] = useState<string>('');

    const searchParams = useSearchParams();
    const movieId = searchParams.get('id');
    useEffect(() => {
        const fetchShows = async () => {
          if (movieId) {
            try {
              const res = await axios.get(`/api/view-shows?id=${movieId}`);
              setShows(res.data.shows);
              setMovieTitle(res.data.movie.title);
              console.log(res.data.shows);
            } catch (error) {
              console.error('Error fetching show:', error);
            }
          }
        };
        fetchShows();
      }, [movieId]);

      return (
        <>
          <Header />
          <div className="container mx-auto my-6 min-h-[78vh]">
            <h2 className="text-3xl font-bold mb-6 mr-10">Show Times - {title}</h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {shows.map(
                (
                  show: {
                    date: string;
                    id: string;
                    title: string;
                    movieType: {type: string}[];
                    timings: { time: string }[];
                  },
                  index: Key | null | undefined
                ) => (
                  <ShowtimeCard
                    id={show._id}
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
          <Footer />
        </>
      );
};

export default Page;