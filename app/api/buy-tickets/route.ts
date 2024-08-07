import { NextResponse, NextRequest } from 'next/server';
import Show from '@/app/models/Show';
import connectDB from '@/config/connectDB';
import { Types } from 'mongoose';

connectDB();

type Show = {
  _id: Types.ObjectId;
  date: string;
  timings: string[];
  movieType: string;
  movieId: {
    title: string;
    poster: string;
    fullplot: string;
  } | null;
  
  typePrice: number[];
  
}

export async function GET(req: NextRequest) {
  try {
    const showid = req.url.split('=')[1];
    const show: Show | null = await Show.findById(showid).populate('movieId', 'title poster fullplot').lean();
    if (show) {
      const formattedShow = {
        id: showid,
        date: show.date,
        timings: show.timings,
        movieType: show.movieType,
        movie: show.movieId ? show.movieId.title : null,
        moviePoster: show.movieId ? show.movieId.poster : null,
        moviePlot: show.movieId ? show.movieId.fullplot : null,
        typePrice: show.typePrice,
      };
      console.log(formattedShow);
      const response = NextResponse.json({
        success: true,
        show: formattedShow,
      });
      return response;
    }
  } catch (error) {
    console.error('Failed to fetch shows:', error);
    return NextResponse.json({ error: 'Failed to fetch shows' }, { status: 500 });
  }
}
