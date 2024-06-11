import Image from "next/image";
import SideNav from './dashboard/sidenav';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
// import Table from '@/app/ui/invoices/table';
// import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Key, Suspense } from 'react';
import { fetchMoviePages, fetchFilteredMovies } from '@/app/lib/data';
import Header from '@/app/ui/Header';
import MovieCard from '@/app/ui/MovieCard';
import ShowtimeCard from '@/app/ui/ShowtimeCard';
import Footer from '@/app/ui/Footer';
import Link from 'next/link';
import { movies } from "@/app/lib/placeholder-data";
import { showtimes } from "@/app/lib/placeholder-data";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  // const query = searchParams?.query || '';
  // const currentPage = Number(searchParams?.page) || 1;
  // const totalPages = await fetchMoviePages(query);
  // // var movies = await fetchFilteredMovies(query, currentPage);
  // const movies = [
  //   {
  //     id: '1',
  //     poster: 'https://via.placeholder.com/150',
  //     title: 'Dummy Movie 1',
  //     year: '2020',
  //     imdb_rating: 0,
  //     directors: [],
  //     cast: [],
  //     description: "",
  //     language: [],
  //     released: "",
  //     duration: "",
  //     genres: [],
  //     timings: []
  //   },
  //   {
  //     id: '2',
  //     poster: 'https://via.placeholder.com/150',
  //     title: 'Dummy Movie 2',
  //     year: '2019',
  //     imdb_rating: 8.0 ,
  //     directors: [],
  //     cast: [],
  //     description: "",
  //     language: [],
  //     released: "",
  //     duration: "",
  //     genres: [],
  //     timings: []
  //   },
  //   {
  //     id: '3',
  //     poster: 'https://via.placeholder.com/150',
  //     title: 'Dummy Movie 3',
  //     year: '2021',
  //     imdb_rating: 6.8 ,
  //     directors: [],
  //     cast: [],
  //     description: "",
  //     language: [],
  //     released: "",
  //     duration: "",
  //     genres: [],
  //     timings: []
  //   },
  //   {
  //     id: '4',
  //     poster: 'https://via.placeholder.com/150',
  //     title: 'Dummy Movie 4',
  //     year: '2018',
  //     imdb_rating: 7.2 ,
  //     directors: [],
  //     cast: [],
  //     description: "",
  //     language: [],
  //     released: "",
  //     duration: "",
  //     genres: [],
  //     timings: []
  //   },
  //   {
  //     id: '5',
  //     poster: 'https://via.placeholder.com/150',
  //     title: 'Dummy Movie 5',
  //     year: '2022',
  //     imdb_rating: 9.0 ,
  //     directors: [],
  //     cast: [],
  //     description: "",
  //     language: [],
  //     released: "",
  //     duration: "",
  //     genres: [],
  //     timings: []
  //   },
  //   {
  //     id: '6',
  //     poster: 'https://via.placeholder.com/150',
  //     title: 'Dummy Movie 6',
  //     year: '2017',
  //     imdb_rating: 5.5 ,
  //     directors: [],
  //     cast: [],
  //     description: "",
  //     language: [],
  //     released: "",
  //     duration: "",
  //     genres: [],
  //     timings: []
  //   },
  //   {
  //     id: '7',
  //     poster: 'https://via.placeholder.com/150',
  //     title: 'Dummy Movie 7',
  //     year: '2021',
  //     imdb_rating: 8.3 ,
  //     directors: [],
  //     cast: [],
  //     description: "",
  //     language: [],
  //     released: "",
  //     duration: "",
  //     genres: [],
  //     timings: []
  //   },
  //   {
  //     id: '8',
  //     poster: 'https://via.placeholder.com/150',
  //     title: 'Dummy Movie 8',
  //     year: '2016',
  //     imdb_rating: 6.9 ,
  //     directors: [],
  //     cast: [],
  //     description: "",
  //     language: [],
  //     released: "",
  //     duration: "",
  //     genres: [],
  //     timings: []
  //   },
  // ];
  // return (
  //   <>
  //   {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"> */}
  //     {/* <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
  //       <Image
  //         className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
  //         src="/images.png"
  //         alt="Next.js Logo"
  //         width={180}
  //         height={37}
  //         priority
  //       />
  //     </div> */}
  //     <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
  //       <div className="w-full flex-none md:w-64">
  //         <SideNav />
  //       </div>
  //       <div className="container mx-auto p-4">
  //         <div className="flex w-full items-center justify-between">
  //           <h1 className={`${lusitana.className} text-2xl`}>Shows</h1>
  //         </div>
  //         <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
  //           <Search placeholder="Search shows..." />
  //           {/* <CreateInvoice /> */}
  //         </div>
  //         <Suspense key={query + currentPage}>
          
  //         </Suspense>
  //         <div className="mt-5 flex w-full justify-center">
  //           <Pagination totalPages={totalPages} />
  //         </div>
  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  //           {movies.map((movie) => (
  //             <div key={movie.id} className="card shadow-md">
  //               <a href={`/api/Movies/${movie.id}`}>
  //                 <img
  //                   src={movie.poster}
  //                   alt="Movie Poster"
  //                   className="poster w-full h-48 object-cover"
  //                 />
  //                 <div className="p-4">
  //                   <h5 className="movie-title text-center truncate" title={movie.title}>
  //                     {movie.title}
  //                   </h5>
  //                   <h6 className="text-center">{`(${movie.year})`}</h6>
  //                   <p className="text-center">{`IMDb Rating: ${movie.imdb_rating}/10`}</p>
  //                 </div>
  //               </a>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   {/* </main> */}
  //   </>
  // );


// const HomePage = () => {
  // const movies = [
  //   {
  //     id: '1',
  //     title: 'Avengers: Endgame',
  //     genre: 'Action, Adventure, Sci-Fi',
  //     poster: '/images.png',
  //   },
  //   {
  //     id: '2',
  //     title: 'Inception',
  //     genre: 'Action, Adventure, Sci-Fi',
  //     poster: '/images.png',
  //   },
  //   {
  //     id: '3',
  //     title: 'The Dark Knight',
  //     genre: 'Action, Crime, Drama',
  //     poster: '/images.png',
  //   },
  //   {
  //     id: '4',
  //     title: 'Interstellar',
  //     genre: 'Adventure, Drama, Sci-Fi',
  //     poster: '/images.png',
  //   },
  // ];

  // const showtimes = [
  //   {
  //     id: '1',
  //     title: 'Avengers: Endgame',
  //     showtimes: [
  //       { type: '2D', time: '10:00 AM' },
  //       { type: '3D', time: '1:30 PM' },
  //       { type: 'IMAX', time: '6:45 PM' },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     title: 'Inception',
  //     showtimes: [
  //       { type: '2D', time: '11:00 AM' },
  //       { type: '3D', time: '3:15 PM' },
  //       { type: 'IMAX', time: '8:30 PM' },
  //     ],
  //   },
  //   {
  //     id: '3',
  //     title: 'The Dark Knight',
  //     showtimes: [
  //       { type: '2D', time: '12:45 PM' },
  //       { type: '3D', time: '5:00 PM' },
  //       { type: 'IMAX', time: '9:15 PM' },
  //     ],
  //   },
  // ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-white py-8">
          <div className="container mx-auto">
          <div className="flex">
            <h2 className="text-3xl font-bold mb-6 mr-10">Now Showing</h2>
            {/* <button className="bg-primary text-primary-foreground inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 mr-10">
              <Link href="/movies">
                View All
              </Link>
            </button> */}
            
          </div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {movies.map((movie: { id: string; title: string; genre: any[]; poster: string; }, index: Key | null | undefined) => (
                <MovieCard id={movie.id} key={index} title={movie.title} genre={movie.genre.join(', ')} poster={movie.poster} />
              ))}
            </div>
          </div>
        </section>
        <section className="bg-gray-100 py-8">
          <div className="container mx-auto">
          <div className="flex">
            <h2 className="text-3xl font-bold mb-6 mr-10">Show Times</h2>
            <button className="bg-primary text-primary-foreground inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
              <Link href="/shows">
                View All
              </Link>
            </button>
          </div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {showtimes.map((showtime: { id: string; title: string; timings: { type: string; time: string; }[]; }, index: Key | null | undefined) => (
                <ShowtimeCard id={showtime.id} key={index} title={showtime.title} timings={showtime.timings} description={""} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
// }