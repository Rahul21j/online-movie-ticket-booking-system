import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import Show from '@/app/models/Show';
import Movie from '@/app/models/Movie';
import connectDB from '@/config/connectDB';
import { title } from 'process';

connectDB();

export async function GET() {
  try {
    const shows = await Show.find().lean();
    const formattedShows = await Promise.all(shows.map(async (show) => {
      const movie = await Movie.findById(show.movieId, 'title').lean(); // Assuming 'movieId' is the field referencing Movie

      return {
        id: show._id,
        date: show.date,
        timings: show.timings,
        movieType: show.movieType,
        movie: movie ? movie.title : null,
      };
    }));

    const response = NextResponse.json({
      success: true,
      shows: formattedShows,
    });
    return response;

  } catch (error) {
    console.error('Failed to fetch shows:', error);
    return NextResponse.json({ error: 'Failed to fetch shows' }, { status: 500 });
  }
}
