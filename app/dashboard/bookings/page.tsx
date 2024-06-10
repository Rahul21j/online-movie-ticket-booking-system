export default function Page() {
    const bookings: Booking[] = [
        {
          id: '1',
          showTitle: 'Movie 1',
          theater: 'Theater 1',
          showTime: '2024-06-10 18:00',
          seats: ['A1', 'A2'],
        },
        {
          id: '2',
          showTitle: 'Movie 2',
          theater: 'Theater 2',
          showTime: '2024-06-11 20:00',
          seats: ['B5', 'B6'],
        },
        {
          id: '3',
          showTitle: 'Movie 3',
          theater: 'Theater 3',
          showTime: '2024-06-12 16:00',
          seats: ['C3', 'C4'],
        },
      ];

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="card bg-white shadow-md p-4">
                <h2 className="text-xl font-semibold">{booking.showTitle}</h2>
                <p className="mt-2">Theater: {booking.theater}</p>
                <p className="mt-2">Show Time: {booking.showTime}</p>
                <p className="mt-2">Seats: {booking.seats.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      );
}