import Link from 'next/link';
import React from 'react';

type MovieCardProps = {
  id: string;
  title: string;
  genre: string;
  poster: string;
};

const MovieCard = ({ id, title, genre, poster }: MovieCardProps) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col items-center justify-center p-6">
        <img
          src={poster}
          width="250"
          height="300"
          alt="Movie Poster"
          className="rounded-lg mb-4"
          style={{ aspectRatio: '1', objectFit: 'cover' }}
        />
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-500 mb-4">{genre}</p>
          <Link href={`/buy-tickets/${id}`}>
            <button className="hover:underline inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
              View Shows
            </button>
          </Link>
      </div>
    </div>
  );
};

export default MovieCard;
