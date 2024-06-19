'use client';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import ShowtimeCard from '../ui/ShowtimeCard';
import Header from '@/app/ui/Header';
import Footer from '@/app/ui/Footer';

type ErrorResponse = {
    error: string;
};

type Show = {
    _id: string;
    title: string;
    date: string;
    timings: string [];
    movieType: string [];
    description: string;
    movie: string;
};

export default async function PageContent () {
    const [shows, setShows] = useState<Show[]>([]);
    const [title, setMovieTitle] = useState<string>('');
    const [error, setError] = useState<ErrorResponse | null>(null);
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
                    if (axios.isAxiosError(error)) {
                        setError(error.response?.data); 
                        setMovieTitle(error.response?.data.movie.title)
                    }
                    else{
                        console.error('Error fetching show:', error);
                    }
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
                <Suspense fallback={<div>Loading...</div>}>
                    {shows.map((show: Show, index: number) => (
                        <ShowtimeCard
                            id={show._id}
                            key={index}
                            title={show.movie}
                            timings={show.timings}
                            movieType={show.movieType}
                            date={show.date}
                        />
                    ))}
                </Suspense>
                </div>
                {error && <h1>{error.error}</h1>}
            </div>
            <Footer />
        </>
    );
}