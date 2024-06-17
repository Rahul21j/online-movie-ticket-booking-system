'use client'
import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
  
export default function MyTickets() {
    const [upcomingTickets, setUpcomingTickets] = useState([]);
    const [historyTickets, setHistoryTickets] = useState([]);

    useEffect(() => {
        async function fetchTickets() {
          try {
            const response = await axios.get(`/api/my-tickets`,
              {
                withCredentials: true, // Ensures cookies are sent
                // Optionally, you can also set headers if needed
                headers: {
                  'Content-Type': 'application/json',
                  // Other headers if required
                },
              }
            );
    
            const tickets = response.data.ticketsWithShows;

            console.log(tickets);

            const upcoming = tickets.filter((ticket: {
              show: any; date: string | Date; 
            }) => new Date(ticket.show.date) >= new Date());
            const history = tickets.filter((ticket: {
              show: any; date: string | Date; 
            }) => new Date(ticket.show.date) < new Date());
            console.log(upcomingTickets);
            console.log(historyTickets);
            setUpcomingTickets(upcoming);
            setHistoryTickets(history);
          } catch (error) {
            console.error('Error fetching tickets:', error);
          }
        }
    
        fetchTickets();
      }, []);
    
      const handleDelete = async (id: string) => {
        try {
          console.log(id);
          const response = await axios.delete(`/api/my-tickets`,{
            data: { id: id }
          });
          if (response.status === 200) {
            console.log(upcomingTickets);
            console.log(historyTickets);
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
      <div className="max-w-7xl mx-auto py-12 md:py-16 lg:py-20 min-h-[84vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Upcoming Tickets</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Review your upcoming movie tickets.</p>
            </div>
            <div className="mt-8 space-y-4">
              {upcomingTickets.map((ticket, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div style={{width: '21rem'}}>
                    <div className="flex">
                      <h3 className="font-semibold mr-2">{ticket.show.movie}</h3>
                      <span className="text-gray-500">({ticket.showType})</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{ticket.show.date} - {ticket.showTime}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Persons: {ticket.seatNumbers.length}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{ticket.seatNumbers.join(', ')}</p>
                  </div>
                  <div>
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
            <div className="mt-8 space-y-4">
              {historyTickets.map((ticket, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div style={{width: '21rem'}}>
                    <div className="flex">
                      <h3 className="font-semibold mr-2">{ticket.show.movie}</h3>
                      <span className="text-gray-500">({ticket.showType})</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{ticket.show.date} - {ticket.showTime}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Persons: {ticket.seatNumbers.length}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{ticket.seatNumbers.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
    )
}