import Movie from '@/app/models/Movie';
import { connectDB } from '@/config/connectDB';
import { NextResponse } from 'next/server';

connectDB();

export async function GET() {
  try {
    const movies = await Movie.find({}, '_id title poster'); 
    const formattedMovies = movies.map(movie => ({
      id: movie._id,
      title: movie.title,
      poster: movie.poster,
    }));

    const response = NextResponse.json({
      success: true,
      movies: formattedMovies,
    });
    return response;

  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}
