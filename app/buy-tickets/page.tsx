"use client";
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import Label from "@/app/ui/Label";
import { Select } from "@/app/ui/Select";
import SelectItem from "@/app/ui/SelectItem";
import Input from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";
import Link from "next/link";
import { showtimes } from "@/app/lib/placeholder-data";

type ShowType = {
    id: string;
    title: string;
    description: string;
    timings: {
      type: string;
      time: string;
    }[];
};

const Page = () => {
    const searchParams = useSearchParams()
    const showid = searchParams.get('id')
  const [show, setShow] = useState<ShowType | null>(null);
  const [tickets, setTickets] = useState<number>(2);

  useEffect(() => {
    const fetchShow = async () => {
        const foundShow = showtimes.find((showtime) => showtime.id === showid);
        setShow(foundShow || null);
    };
    if (showid) {
        fetchShow();
    }
  }, [showid]);

  if (!show) {
    return <p>Show not found</p>;
  }
  const handleTicketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTickets(parseInt(e.target.value));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement logic to handle ticket purchase, e.g., send data to backend
    console.log(`Tickets (${tickets}) for show ${showid} purchased!`);
    // Redirect or show confirmation message
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
            <h1 className="text-3xl font-bold tracking-tight">{show.title}</h1>
            <p className="text-gray-500 dark:text-gray-400">{show.description}</p>
          </div>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="showtime">Select Showtime</Label>
                <Select id="showtime" onChange={handleTicketChange} defaultValue={show.timings[0].time}>
                  {show.timings.map((timing, index) => (
                    <SelectItem key={index} value={timing.time}>
                      {timing.type} - {timing.time}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="tickets">Select Tickets</Label>
                <Select id="tickets" onChange={handleTicketChange} value={tickets.toString()}>
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
            <div>
              <Label htmlFor="payment">Payment</Label>
              <Input id="payment" type="text" placeholder="Enter your payment details" />
            </div>
            <Button type="submit" className="w-full">
              <Link href="/my-tickets" className="hover:underline">
                My Tickets
              </Link>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
