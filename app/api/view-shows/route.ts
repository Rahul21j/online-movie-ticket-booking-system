import { NextResponse, NextRequest } from 'next/server';
import Show from '@/app/models/Show';
import connectDB from '@/config/connectDB';
import Movie from '@/app/models/Movie';

connectDB();

export async function GET(req:NextRequest) {
  try {
    const currentDate = new Date();
    const movieId = req.url.split('=')[1];
    const shows = await Show.find({ movieId,
      $expr: {
        $gt: [{ $dateFromString: { dateString: "$date" } }, currentDate]
      }
    }).lean();
    const movie = await Movie.findById(movieId, {title: 1}).lean();
    console.log(movie);
    if (shows.length > 0) {
        return NextResponse.json({shows, movie}, { status: 200 });
    } else {
        return NextResponse.json({ error: 'No shows found', movie: movie }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to fetch shows:', error);
    return NextResponse.json({ error: 'Failed to fetch shows' }, { status: 500 });
  }
}