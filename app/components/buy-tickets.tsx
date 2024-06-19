'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Label from '@/app/ui/Label';
import { Select } from '@/app/ui/Select';
import SelectItem from '@/app/ui/SelectItem';
import Input from '@/app/ui/Input';
import { Button } from '@/app/ui/button';
import { useUser } from '@auth0/nextjs-auth0/client';

type ShowType = {
  id: string;
  date: string;
  timings: string[];
  movieType: string[];
  movie: string;
  moviePoster: string;
  moviePlot: string;
};

type TicketType = {
  type: string;
  date: string;
  seats: string[];
  showtime: string;
  email: string;
  showid: string;
};

const BuyTicketsPageContent: React.FC = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const searchParams = useSearchParams();
  const showid = searchParams.get('id');
  const [show, setShow] = useState<ShowType | null>(null);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  
  useEffect(() => {
    const fetchShow = async () => {
      if (showid) {
        try {
          const res = await axios.get(`/api/buy-tickets?id=${showid}`);
          setShow(res.data.show);
        } catch (error) {
          console.error('Error fetching show:', error);
          // Handle error fetching show data
        }
      }
    };
    fetchShow();
  }, [showid]);
  
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [isLoading, user, router]);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) {
    router.push('/');
    return null; // Return null explicitly when redirecting
  }
  
  if (!show) {
    return <p>Show not found</p>;
  }
  
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!showid) {
      alert('Show ID is missing.');
      return;
    }
  
    const userSeatInput = (document.getElementById('seats') as HTMLInputElement).value.trim();
    const ticketQuantity = parseInt((document.getElementById('tickets') as HTMLInputElement).value);
    let seatArray: string[];
    
    if (userSeatInput) {
      seatArray = userSeatInput.split(',').map((seat) => seat.trim().toUpperCase());
      for (let seat of seatArray) {
        if (!/^[A-Z][0-9]+$/.test(seat)) {
          alert('Invalid seat format. Please use the format like A1, B2, etc.');
          return;
        }
      }
      if (seatArray.length !== ticketQuantity) {
        alert('Number of seats must match the quantity of tickets.');
        return;
      }
    } else {
      seatArray = Array.from({ length: ticketQuantity }, (_, i) => String.fromCharCode(65 + i) + (i + 1));
    }
  
    const type = (document.getElementById('showtime') as HTMLInputElement).value.split('-')[0].trim();
    const showtime = (document.getElementById('showtime') as HTMLInputElement).value.split('-')[1].trim();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const newTicket: TicketType = {
      type,
      date: show.date,
      seats: seatArray,
      showtime,
      email,
      showid
    };
  
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/my-tickets', newTicket, config);
      setTickets((prevTickets) => [...prevTickets, newTicket]);
      router.push('/my-tickets');
    } catch (error) {
      console.error('Error booking ticket:', error);
      alert('Error booking ticket. Please try again.');
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20 min-h-[84vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <img
            src={show.moviePoster}
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
                <Select id="showtime" defaultValue={`${show.movieType[0]} - ${show.timings[0]}`}>
                  {show.timings.map((timing, index) => (
                    <SelectItem key={index} value={`${show.movieType[index]} - ${timing}`}>
                      {show.movieType[index]} - {timing}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="tickets">Select Tickets</Label>
                <Select id="tickets" defaultValue='1'>
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

export default BuyTicketsPageContent;
