// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[6].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    customer_id: customers[0].id,
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const movies = [
  {
    id: '1',
    poster: 'https://via.placeholder.com/150',
    title: 'Dummy Movie 1',
    year: '2020',
    imdb: { rating: 7.5 },
    genre: [],
  },
  {
    id: '2',
    poster: 'https://via.placeholder.com/150',
    title: 'Dummy Movie 2',
    year: '2019',
    imdb: { rating: 8.0 },
    genre: [],
  },
  {
    id: '3',
    poster: 'https://via.placeholder.com/150',
    title: 'Dummy Movie 3',
    year: '2021',
    imdb: { rating: 6.8 },
    genre: [],
  },
  {
    id: '4',
    poster: 'https://via.placeholder.com/150',
    title: 'Dummy Movie 4',
    year: '2018',
    imdb: { rating: 7.2 },
    genre: [],
  },
  {
    id: '5',
    poster: 'https://via.placeholder.com/150',
    title: 'Dummy Movie 5',
    year: '2022',
    imdb: { rating: 9.0 },
    genre: [],
  },
  {
    id: '6',
    poster: 'https://via.placeholder.com/150',
    title: 'Dummy Movie 6',
    year: '2017',
    imdb: { rating: 5.5 },
    genre: [],
  },
  {
    id: '7',
    poster: 'https://via.placeholder.com/150',
    title: 'Dummy Movie 7',
    year: '2021',
    imdb: { rating: 8.3 },
    genre: [],
  },
  {
    id: '8',
    poster: 'https://via.placeholder.com/150',
    title: 'Dummy Movie 8',
    year: '2016',
    imdb: { rating: 6.9 },
    genre: [],
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
  {
    id: '4',
    title: 'The Dark Knight',
    showtimes: [
      { type: '2D', time: '12:45 PM' },
      { type: '3D', time: '5:00 PM' },
      { type: 'IMAX', time: '9:15 PM' },
    ],
  },
  {
    id: '5',
    title: 'The Dark Knight',
    showtimes: [
      { type: '2D', time: '12:45 PM' },
      { type: '3D', time: '5:00 PM' },
      { type: 'IMAX', time: '9:15 PM' },
    ],
  },
  {
    id: '6',
    title: 'The Dark Knight',
    showtimes: [
      { type: '2D', time: '12:45 PM' },
      { type: '3D', time: '5:00 PM' },
      { type: 'IMAX', time: '9:15 PM' },
    ],
  },
  {
    id: '7',
    title: 'The Dark Knight',
    showtimes: [
      { type: '2D', time: '12:45 PM' },
      { type: '3D', time: '5:00 PM' },
      { type: 'IMAX', time: '9:15 PM' },
    ],
  },
  {
    id: '8',
    title: 'The Dark Knight',
    showtimes: [
      { type: '2D', time: '12:45 PM' },
      { type: '3D', time: '5:00 PM' },
      { type: 'IMAX', time: '9:15 PM' },
    ],
  },
  {
    id: '9',
    title: 'The Dark Knight',
    showtimes: [
      { type: '2D', time: '12:45 PM' },
      { type: '3D', time: '5:00 PM' },
      { type: 'IMAX', time: '9:15 PM' },
    ],
  },
];

export {
  users,
  customers,
  invoices,
  revenue,
  movies,
  showtimes,
};

export function map(arg0) {
  throw new Error("Function not implemented.");
}

