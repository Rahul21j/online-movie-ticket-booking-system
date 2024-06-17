'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Header from '@/app/ui/Header';
import Footer from '@/app/ui/Footer';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <>
      <Header />
        <div className="min-h-[83vh] bg-gray-100 flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <div className="text-center">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src={user.picture}
                alt={user.name ?? ''}
              />
              <h2 className="mt-4 text-3xl font-bold text-gray-900">{user.nickname ?? ''}</h2>
              <p className="mt-1 text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-6">
              
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  );
}
