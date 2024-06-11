import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";
import ShowtimeCard from '@/app/ui/ShowtimeCard';
import { Key } from "react";
import { showtimes } from "@/app/lib/placeholder-data";

export default function Page(){
  
        return (
            <>
                <Header/>
                <div className="container mx-auto my-6 min-h-[81vh]">
                    <h2 className="text-3xl font-bold mb-6 mr-10">Show Times</h2>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {showtimes.map((showtime: { id: string; title: string; description: string; timings: { type: string; time: string; }[]; }, index: Key | null | undefined) => (
                      <ShowtimeCard id={showtime.id} key={index} title={showtime.title} description={showtime.description} timings={showtime.timings} />
                    ))}
                    </div>
                  </div>
                <Footer/>
            </>
          );
        };