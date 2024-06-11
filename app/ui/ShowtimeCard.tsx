import Link from "next/link";

type Showtime = {
  type: string;
  time: string;
};

type ShowtimeCardProps = {
  id: string;
  title: string;
  description: string;
  timings: Showtime[];
};
  
  const ShowtimeCard = ({ id, title, description, timings }: ShowtimeCardProps) => {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">{title}</h3>
        </div>
        <div className="p-6">
        {timings.map((showtime, index) => (
          <div className="flex items-center justify-between mb-2" key={index}>
            <span className="text-gray-500">{showtime.type}</span>
            <span className="text-gray-500">{showtime.time}</span>
          </div>
        ))}
          
          <Link href={`/buy-tickets?id=${id}`}>
            <button className="hover:underline inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 w-full">
              Buy Tickets
            </button>
          </Link>
        </div>
      </div>
    );
  };
  
  export default ShowtimeCard;
  