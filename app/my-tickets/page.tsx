'use client'
import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from "next/navigation";

type Ticket = {
  _id: string;
  show: {
    movie: string;
    date: string;
  };
  showType: string;
  showTime: string;
  seatNumbers: string[];
  screen: number;
}

export default function MyTickets() {
  const [upcomingTickets, setUpcomingTickets] = useState<Ticket[]>([]);
  const [historyTickets, setHistoryTickets] = useState<Ticket[]>([]);
  const router = useRouter();
  const { user, isLoading } = useUser();

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`/api/my-tickets`, {
        withCredentials: true, // Ensures cookies are sent
        // Optionally, you can also set headers if needed
        headers: {
          'Content-Type': 'application/json',
          // Other headers if required
        },
      });

      const tickets: Ticket[] = response.data.ticketsWithShows;

      console.log(tickets);
      if (tickets.length === 0) {
        return;
      }
      const upcoming = tickets.filter((ticket) => new Date(ticket.show.date) >= new Date());
      const history = tickets.filter((ticket) => new Date(ticket.show.date) < new Date());
      setUpcomingTickets(upcoming);
      setHistoryTickets(history);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    } else {
      fetchTickets();
    }
  }, [isLoading, user, router]);

  const handleDelete = async (id: string) => {
    try {
      console.log(id);
      const response = await axios.delete(`/api/my-tickets`, {
        data: { id: id }
      });
      if (response.status === 200) {
        setUpcomingTickets(upcomingTickets.filter(ticket => ticket._id !== id));
        setHistoryTickets(historyTickets.filter(ticket => ticket._id !== id));
        alert("Ticket deleted successfully");
      } else {
        alert("Failed to delete ticket");
      }
    } catch (error) {
      console.error("Failed to delete ticket", error);
      alert("Failed to delete ticket");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto py-7 md:py-7 lg:py-7 min-h-[83vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Upcoming Tickets</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Review your upcoming movie tickets.</p>
            </div>
            <div className="mt-4 space-y-4 overflow-y-auto" style={{ maxHeight: '59vh' }}>
              {upcomingTickets.map((ticket, index) => (
                <div key={index} className="grid grid-cols-3 items-center gap-4 border-b border-gray-200 py-4">
                  <div className="col-span-2" style={{ width: '21rem' }}>
                    <div className="flex">
                      <h3 className="font-semibold mr-2">{ticket.show.movie}</h3>
                      <span className="text-gray-500">({ticket.showType})</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{ticket.show.date} - {ticket.showTime}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm"><strong>Screen: </strong>{ticket.screen}</p>
                  </div>
                  <div className="text-right col-span-1 pr-3">
                    <p className="font-semibold">Persons: {ticket.seatNumbers.length}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{ticket.seatNumbers.join(', ')}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => handleDelete(ticket._id)}>Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">History</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Review your previous movie tickets.</p>
            </div>
            <div className="mt-4 space-y-4 overflow-y-auto" style={{ maxHeight: '59vh' }}>
              {historyTickets.map((ticket, index) => (
                <div key={index} className="grid grid-cols-3 items-center gap-4 border-b border-gray-200 py-4">
                  <div className="col-span-2" style={{ width: '21rem' }}>
                    <div className="flex">
                      <h3 className="font-semibold mr-2">{ticket.show.movie}</h3>
                      <span className="text-gray-500">({ticket.showType})</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{ticket.show.date} - {ticket.showTime}</p>
                  </div>
                  <div className="text-right col-span-1 pr-3">
                    <p className="font-semibold">Persons: {ticket.seatNumbers.length}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{ticket.seatNumbers.join(', ')}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => handleDelete(ticket._id)}>Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}