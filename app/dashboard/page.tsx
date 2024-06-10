// export default function Page(){
//     const movies = [
//         {
//           id: '1',
//           poster: 'https://via.placeholder.com/150',
//           title: 'Dummy Movie 1',
//           year: '2020',
//           imdb: { rating: 7.5 },
//         },
//         {
//           id: '2',
//           poster: 'https://via.placeholder.com/150',
//           title: 'Dummy Movie 2',
//           year: '2019',
//           imdb: { rating: 8.0 },
//         },
//         {
//           id: '3',
//           poster: 'https://via.placeholder.com/150',
//           title: 'Dummy Movie 3',
//           year: '2021',
//           imdb: { rating: 6.8 },
//         },
//         {
//           id: '4',
//           poster: 'https://via.placeholder.com/150',
//           title: 'Dummy Movie 4',
//           year: '2018',
//           imdb: { rating: 7.2 },
//         },
//         {
//           id: '5',
//           poster: 'https://via.placeholder.com/150',
//           title: 'Dummy Movie 5',
//           year: '2022',
//           imdb: { rating: 9.0 },
//         },
//         {
//           id: '6',
//           poster: 'https://via.placeholder.com/150',
//           title: 'Dummy Movie 6',
//           year: '2017',
//           imdb: { rating: 5.5 },
//         },
//         {
//           id: '7',
//           poster: 'https://via.placeholder.com/150',
//           title: 'Dummy Movie 7',
//           year: '2021',
//           imdb: { rating: 8.3 },
//         },
//         {
//           id: '8',
//           poster: 'https://via.placeholder.com/150',
//           title: 'Dummy Movie 8',
//           year: '2016',
//           imdb: { rating: 6.9 },
//         },
//       ];
//     return (
//         <div className="container mx-auto p-4">
//           {/* <div className="flex flex-wrap mb-4">
//             <div className="w-full md:w-1/4 mb-4">
//               <label htmlFor="perPage" className="block mb-2">Movies Per Page:</label>
//               <select
//                 id="perPage"
//                 name="perPage"
//                 className="block w-full px-4 py-2 border rounded"
//               >
//                 {[8, 12, 16, 20, 24].map((value) => (
//                   <option key={value} value={value}>
//                     {value}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="w-full md:w-1/4 mb-4">
//               <label htmlFor="goToPage" className="block mb-2">Go to Page:</label>
//               <div className="flex">
//                 <input
//                   type="number"
//                   id="goToPage"
//                   name="goToPage"
//                   className="w-2/3 px-4 py-2 border rounded-l"
//                 />
//                 <button
//                   className="w-1/3 px-4 py-2 bg-blue-500 text-white rounded-r"
//                 >
//                   Go
//                 </button>
//               </div>
//             </div>
//           </div> */}
//           <h1 className="mb-4 text-xl md:text-2xl">Shows</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {movies.map((movie) => (
//               <div key={movie.id} className="card shadow-md">
//                 <a href={`/api/Movies/${movie.id}`}>
//                   <img
//                     src={movie.poster}
//                     alt="Movie Poster"
//                     className="poster w-full h-48 object-cover"
//                   />
//                   <div className="p-4">
//                     <h5 className="movie-title text-center truncate" title={movie.title}>
//                       {movie.title}
//                     </h5>
//                     <h6 className="text-center">{`(${movie.year})`}</h6>
//                     <p className="text-center">{`IMDb Rating: ${movie.imdb.rating}/10`}</p>
//                   </div>
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     };

import Header from '@/app/ui/Header';
import MovieCard from '@/app/ui/MovieCard';
import ShowtimeCard from '@/app/ui/ShowtimeCard';
import Footer from '@/app/ui/Footer';

const HomePage = () => {
  const movies = [
    {
      id:'1',
      title: 'Avengers: Endgame',
      genre: 'Action, Adventure, Sci-Fi',
      poster: '/images.png',
    },
    {
      id:'2',
      title: 'Inception',
      genre: 'Action, Adventure, Sci-Fi',
      poster: '/images.png',
    },
    {
      id:'3',
      title: 'The Dark Knight',
      genre: 'Action, Crime, Drama',
      poster: '/images.png',
    },
    {
      id:'4',
      title: 'Interstellar',
      genre: 'Adventure, Drama, Sci-Fi',
      poster: '/images.png',
    },
  ];

  const showtimes = [
    {
      id: '1',
      title: 'Avengers: Endgame',
      showtimes: [
        { type: '2D', time: '10:00 AM' },
        { type: '3D', time: '1:30 PM' },
        { type: 'IMAX', time: '6:45 PM' },
      ],
    },
    {
      id: '2',
      title: 'Inception',
      showtimes: [
        { type: '2D', time: '11:00 AM' },
        { type: '3D', time: '3:15 PM' },
        { type: 'IMAX', time: '8:30 PM' },
      ],
    },
    {
      id: '3',
      title: 'The Dark Knight',
      showtimes: [
        { type: '2D', time: '12:45 PM' },
        { type: '3D', time: '5:00 PM' },
        { type: 'IMAX', time: '9:15 PM' },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-white py-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6">Now Showing</h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {movies.map((movie, index) => (
                <MovieCard id={movie.id} key={index} title={movie.title} genre={movie.genre} poster={movie.poster} />
              ))}
            </div>
          </div>
        </section>
        <section className="bg-gray-100 py-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6">Showtimes</h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {showtimes.map((showtime, index) => (
                <ShowtimeCard id={showtime.id} key={index} title={showtime.title} showtimes={showtime.showtimes} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default HomePage;
