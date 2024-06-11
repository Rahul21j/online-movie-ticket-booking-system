"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Label from "@/app/ui/Label";
import { Select } from "@/app/ui/Select";
import SelectItem from "@/app/ui/SelectItem";
import Input from "@/app/ui/Input";
import { Button } from "@/app/ui/button";

type ShowType = {
  id: string;
  date: string;
  timings: string[];
  movieType: string[];
  movie: string;
  moviePoster: string;
  moviePlots: string;
};

type TicketType = {
  title: string;
  type: string;
  date: string;
  quantity: string;
  seats: string[];
};

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showid = searchParams.get("id");
  const [show, setShow] = useState<ShowType | null>(null);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [ticketQuantity, setTicketQuantity] = useState<number>(2);

  useEffect(() => {
    const fetchShow = async () => {
      if (showid) {
        const res = await fetch(`/api/buy-tickets?id=${showid}`);
        const data = await res.json();
        console.log(data);
        setShow(data.show);
      }
    };
    fetchShow();
  }, [showid]);

  if (!show) {
    return <p>Show not found</p>;
  }

  const handleTicketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTicketQuantity(parseInt(e.target.value));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let seatInput = (document.getElementById("seats") as HTMLInputElement)
      .value;
    let seatArray: string[];

    if (seatInput) {
      seatArray = seatInput.split(",").map((seat) => seat.trim().toUpperCase());
      for (let seat of seatArray) {
        if (!/^[A-Z][0-9]+$/.test(seat)) {
          alert("Invalid seat format. Please use the format like A1, B2, etc.");
          return;
        }
      }
      if (seatArray.length !== ticketQuantity) {
        alert("Number of seats must match the quantity of tickets.");
        return;
      }
    } else {
      seatArray = Array.from(
        { length: ticketQuantity },
        (_, i) => String.fromCharCode(65 + i) + (i + 1)
      );
    }

    const newTicket: TicketType = {
      title: show.title,
      type: show.timings[0].type,
      date: show.timings[0].time,
      quantity: `${ticketQuantity}`,
      seats: seatArray,
    };

    try {
      const res = await fetch('/api/my-tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '6667e2be563f06eea61ca563',
          showId: show.id,
          seatNumbers: seatArray,
          showType: show.movieType[0],
          movie: show.movie,
        }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to book ticket');
      }
  
      const data = await res.json();
      console.log('Ticket booked:', data);

      setTickets((prevTickets) => [...prevTickets, newTicket]);

      console.log("Tickets updated:", [...tickets, newTicket]);
      router.push('/my-tickets');
    }
    catch (error) {
      console.error('Error booking ticket:', error);
      alert('Error booking ticket. Please try again.');
    }
};

  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <img
            src="/placeholder.svg"
            width={600}
            height={400}
            alt="Show Poster"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{show.movie}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {show.moviePlot}
            </p>
          </div>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="showtime">Select Showtime</Label>
                <Select id="showtime" defaultValue={show.timings[0]}>
                  {show.timings.map((timing, index) => (
                    <SelectItem key={index} value={timing}>
                      {show.movieType[index]} - {timing}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="tickets">Select Tickets</Label>
                <Select
                  id="tickets"
                  onChange={handleTicketChange}
                  value={ticketQuantity.toString()}
                >
                  {[1, 2, 3, 4, 5].map((number) => (
                    <SelectItem key={number} value={number.toString()}>
                      {number}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="seats">Seats</Label>
              <Input
                id="seats"
                type="text"
                placeholder="Enter seat preferences (e.g., A1, B2, C3)"
              />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Enter your name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <Button type="submit" className="w-full">
              Confirm
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
