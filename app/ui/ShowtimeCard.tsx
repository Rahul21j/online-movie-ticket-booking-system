import Link from "next/link";

type ShowtimeCardProps = {
  id: string;
  title: string;
  timings:string[];
  date: string;
  movieType: string[];
  
  typePrice: string[];
  
};
  
  const ShowtimeCard = ({ id, title, timings, movieType, date, typePrice }: ShowtimeCardProps) => {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 px-6 pt-6">
          <h3 className="whitespace-nowrap overflow-hidden text-2xl font-semibold leading-none tracking-tight" title={title}>{title}</h3>
          <span className="text-gray-500">{date}</span>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-2">
            <span className="text-gray-500">Time</span>
            <span className="text-gray-500 flex items-center justify-center">Type</span>
            <span className="text-gray-500 flex items-center justify-end">Price/person</span>
          </div>
          {timings.map((time, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <span className="text-gray-500">{time}</span>
              <span className="text-gray-500 flex items-center justify-center">{movieType[index]}</span>
              <span className="text-gray-500 flex items-center justify-end">${typePrice[index]}</span>
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
  