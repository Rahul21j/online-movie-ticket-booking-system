import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";
import { tickets } from "@/app/lib/placeholder-data";

export default function MyTickets() {
    return (
        <>
            <Header/>
            <div className="max-w-7xl mx-auto py-12 md:py-16 lg:py-20 min-h-[84vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Upcoming Tickets</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">Review your upcoming movie tickets.</p>
                        </div>
                        <div className="mt-8 space-y-4">
                            {tickets.upcoming.map((ticket, index) => (
                                <div key={index} className="flex items-center justify-between">
                                <div>
                                    <div className="flex">
                                    <h3 className="font-semibold mr-2">{ticket.title}</h3>
                                    <span className="text-gray-500">({ticket.type})</span>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{ticket.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">{ticket.quantity}</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{ticket.seats}</p>
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
                            {tickets.history.map((ticket, index) => (
                                <div key={index} className="flex items-center justify-between">
                                <div>
                                    <div className="flex">
                                    <h3 className="font-semibold mr-2">{ticket.title}</h3>
                                    <span className="text-gray-500">({ticket.type})</span>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{ticket.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">{ticket.quantity}</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{ticket.seats}</p>
                                </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}