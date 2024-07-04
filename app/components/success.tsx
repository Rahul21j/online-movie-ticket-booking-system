'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { generateTicketConfirmationEmail } from '@/app/utils/emailTemplate';
import Header from '@/app/ui/Header';
import Footer from '@/app/ui/Footer';

type MetaData = {
  type: string;
  date: string;
  seats: string;
  showtime: string;
  screen: number;
  email: string;
  showid: string;
  movie: string;
  ticketHolderNames: string;
};

type Address = {
  city: string;
  country: string;
  line1: string;
  line2: string | null;
  postal_code: string;
  state: string;
};

type CustomerDetails = {
  address: Address;
  email: string;
  name: string;
};

type SessionData = {
  id: string;
  amount: number;
  currency: string;
  amount_total: number;
  status: string;
  receipt_email: string;
  metadata: MetaData;
  created: string;
  customer_details: CustomerDetails;
  expires_at: string;
  mode: string;
  payment_intent: string;
  payment_method_options: object;
  payment_method_types: string[];
  payment_status: string;
}

type TicketType = {
  type: string;
  date: string;
  seats: string[];
  showtime: string;
  screen: number;
  email: string;
  showid: string;
  sessionId: string;
  seatHolderNames: string[];
};

const Success: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isTransactionSaved, setIsTransactionSaved] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (sessionId && !isTransactionSaved) {
      const fetchSession = async () => {
        try {
          const response = await axios.get(`/api/checkout-session?session_id=${sessionId}`);
          if (isMounted) {
            setSessionData(response.data.session);
            setMetaData(response.data.session.metadata);

            await saveTransaction(response.data.session);
            setIsTransactionSaved(true);
            addTicket(response.data.session);
            sendEmail(response.data.session.metadata, response.data.session);
          }
        } catch (error) {
          if (isMounted) setError('Error fetching session data.');
        } finally {
          if (isMounted) setLoading(false);
        }
      };

      fetchSession();
    }

    return () => {
      isMounted = false;
    };
  }, [sessionId, isTransactionSaved]);


  const saveTransaction = async (sessionData: SessionData) => {
    try {
      await axios.post('/api/save-transaction', {
        sessionId: sessionData.id,
        created: new Date(parseInt(sessionData.created) * 1000).toLocaleString(),
        currency: sessionData.currency,
        amount_total: sessionData.amount_total,
        customer_details: sessionData.customer_details,
        customer_email: sessionData.receipt_email,
        expires_at: new Date(parseInt(sessionData.expires_at) * 1000).toLocaleString(),
        metadata: sessionData.metadata,
        mode: sessionData.mode,
        payment_intent: sessionData.payment_intent,
        payment_method_options: sessionData.payment_method_options,
        payment_method_types: sessionData.payment_method_types,
        payment_status: sessionData.payment_status,
        status: sessionData.status,
      });
      console.log('Transaction saved successfully');
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const sendEmail = async (metaData: MetaData, sessionData: SessionData) => {
    if (!metaData) {
      console.error('MetaData is null');
      return;
    }

    try {
      await axios.post('/api/confirmation-email', {
        to: metaData.email,
        subject: 'Ticket Confirmation',
        text: 'and easy to do anywhere, even with Node.js',
        html: generateTicketConfirmationEmail(metaData.email, metaData.movie, metaData.showtime, metaData.seats, metaData.screen, sessionData.id, metaData.ticketHolderNames.split(',')),
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const addTicket = async (sessionData: SessionData) => {
    const newTicket: TicketType = {
      type: sessionData.metadata.type,
      date: sessionData.metadata.date,
      seats: sessionData.metadata.seats.split(","),
      seatHolderNames: sessionData.metadata.ticketHolderNames.split(','),
      showtime: sessionData.metadata.showtime,
      screen: sessionData.metadata.screen,
      email: sessionData.metadata.email,
      showid: sessionData.metadata.showid,
      sessionId: sessionData.id,
    };

    try {
      const response = await axios.post('/api/my-tickets', newTicket);

      console.log('Ticket booked successfully');
    } catch (error) {
      console.error('Error booking ticket:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <Header />
      <div className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20 min-h-[84vh]">
        <h1 className="text-3xl font-bold tracking-tight">Payment Successful</h1>
        <p className="text-gray-500 dark:text-gray-400">Thank you for your purchase. Your payment was successful!</p>
        <div className="mt-8">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <div className="mt-4">
            {sessionData && (
              <>
                {sessionData && (
                  <>
                    <p className="text-gray-500 dark:text-gray-400">Payment ID: {sessionData.id}</p>
                    <p className="text-gray-500 dark:text-gray-400">Amount: {sessionData.amount_total / 100} {sessionData.currency.toUpperCase()}</p>
                    <p className="text-gray-500 dark:text-gray-400">Payment Status: {sessionData.payment_status}</p>
                  </>
                )}
                <p className="text-gray-500 dark:text-gray-400 mt-12">You will receive the Ticket Confirmation Email shortly on <strong>{sessionData.metadata.email}</strong>.</p>
              </>
            )}
          </div>
          <div className="flex mt-8">
            <button
              className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
              onClick={() => router.push('/')}
            >
              Return to Home
            </button>
            <button
              className="ml-4 w-full px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md"
              onClick={() => router.push('/my-tickets')}
            >
              My Tickets
            </button>
          </div>
          </div>
          {/* <pre>{JSON.stringify(sessionData, null, 2)}</pre> */}
      </div>
    <Footer />
    </>
  );
};

export default Success;
