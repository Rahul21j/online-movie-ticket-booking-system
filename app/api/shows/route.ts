import { NextResponse } from 'next/server';
import Show from '@/app/models/Show';
import Movie from '@/app/models/Movie';
import connectDB from '@/config/connectDB';

connectDB();

type Movie = {
  _id: string;
  title: string;
}

export async function GET() {
  try {
    const currentDate = new Date();
    const shows = await Show.find({
      $expr: {
        $gt: [{ $dateFromString: { dateString: "$date" } }, currentDate]
      }
    }).lean();
    const formattedShows = await Promise.all(shows.map(async (show) => {
      const movie = await Movie.findById(show.movieId, 'title').lean() as Movie | null; // Assuming 'movieId' is the field referencing Movie

      return {
        id: show._id,
        date: show.date,
        timings: show.timings,
        movieType: show.movieType,
        title: movie ? movie.title : null,
        
        typePrice: show.typePrice
        
      };
    }));

    const response = NextResponse.json({
      success: true,
      shows: formattedShows,
    });
    console.log(formattedShows);
    return response;

  } catch (error) {
    console.error('Failed to fetch shows:', error);
    return NextResponse.json({ error: 'Failed to fetch shows' }, { status: 500 });
  }
}
