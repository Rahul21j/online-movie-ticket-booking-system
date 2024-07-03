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
import { loadStripe } from '@stripe/stripe-js';
import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";
import Image from 'next/image';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type ShowType = {
  id: string;
  date: string;
  timings: string[];
  movieType: string[];
  movie: string;
  moviePoster: string;
  moviePlot: string;
  
  typePrice: number[];
  
};

const BuyTicketsPageContent: React.FC = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const searchParams = useSearchParams();
  const showid = searchParams.get('id');
  const [show, setShow] = useState<ShowType | null>(null);
  
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [seatInput, setSeatInput] = useState('');
  const [ticketHolderNames, setTicketHolderNames] = useState<string[]>([]);
  
  
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

    const typePrice = (document.getElementById('showtime') as HTMLInputElement).value.split('$')[1].trim();

    const email = user.email || '';

    const stripe = await stripePromise;
      const checkoutSession = await axios.post('/api/checkout-session', {
        metadata: {
          type,
          date: show.date,
          seats: seatArray.toString(),
          screen: getRandomScreenNumber(type),
          showtime,
          email,
          showid,
          typePrice,
          movie: show.movie,
          ticketHolderNames: ticketHolderNames.join(','),
        },
        ticketQuantity,
        show,
        email,
      });

      const result = await stripe!.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
  };

  const handleTicketQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(event.target.value, 10);
    if (!isNaN(quantity) && quantity >= 1 && quantity <= 10) {
      setTicketQuantity(quantity);
    }
  };

  const handleSeatInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeatInput(event.target.value);
  };
  
  const handleTicketHolderNameChange = (index: number, name: string) => {
    const updatedNames = [...ticketHolderNames];
    updatedNames[index] = name;
    setTicketHolderNames(updatedNames);
  };

  function getRandomScreenNumber(movieType:string) {
    let screenNumber;
    
    switch (movieType.toLowerCase()) {
      case '2d':
        screenNumber = Math.floor(Math.random() * 3) + 1;
        break;
      case '3d':
        screenNumber = Math.floor(Math.random() * 2) + 4;
        break;
      case 'imax':
        screenNumber = 6;
        break;
      default:
        screenNumber = 1;
        break;
    }
  
    return screenNumber;
  }

  return (
    <>
      <Header />
      <div className="w-full max-w-4xl mx-auto py-10 md:py-12 lg:py-14 min-h-[84vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <Image
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
                <div>
                  <Label htmlFor="showtime">Select Showtime</Label>
                  <Select id="showtime" defaultValue={`${show.movieType[0]} - ${show.timings[0]} - $${show.typePrice[0]}`}>
                    {show.timings.map((timing, index) => (
                      <SelectItem key={index} value={`${show.movieType[index]} - ${timing} - $${show.typePrice[index]}`}>
                        {show.movieType[index]} - {timing} - ${show.typePrice[index]}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div>
                <Label htmlFor="tickets">Select Tickets</Label>
                <Input
                  id="tickets"
                  type="number"
                  min="1"
                  max="10"
                  placeholder='Enter number of tickets (max 10)'
                  value={ticketQuantity}
                  onChange={handleTicketQuantityChange}
                />
                </div>
              <div>
                <Label htmlFor="seats">Seats</Label>
                <Input
                  id="seats"
                  type="text"
                  placeholder="Enter seat preferences (e.g., A1, B2, C3)"
                  value={seatInput}
                  onChange={handleSeatInputChange}
                />
              </div>
              {Array.from({ length: ticketQuantity }).map((_, index) => (
                <div key={index}>
                  <Label htmlFor={`userName${index + 1}`}>Ticket {index + 1} Holder&apos;s Name</Label>
                  <Input
                    id={`userName${index + 1}`}
                    type="text"
                    placeholder={`Enter name for Ticket ${index + 1}`}
                    value={ticketHolderNames[index]}
                    onChange={(e) => handleTicketHolderNameChange(index, e.target.value)}
                  />
                </div>
              ))}
              <Button type="submit" className="w-full">
                Confirm
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BuyTicketsPageContent;
