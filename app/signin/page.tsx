'use client';
import Header from '@/app/ui/Header';
import Footer from '@/app/ui/Footer';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Define interfaces for form data and error states
type FormData = {
  email: string;
  password: string;
}

type FormErrors = {
  email?: string;
  password?: string;
  apiError?: string;
}

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear errors when user starts typing again
    setFormErrors({ ...formErrors, [name]: undefined });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formValid = true;
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    // Validate email format
    if (!formData.email.match(emailPattern)) {
      formValid = false;
      setFormErrors({ ...formErrors, email: 'Please enter a valid email address' });
    }

    if (formValid) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await axios.post('/api/users/signin', formData, config);
        console.log('Signin Successful:', response.data);

        // Redirect to todos page or any other page upon successful login
        router.push('/movies');
      } catch (err: any) {
        console.error('Signin Error:', err);
        if (err.response?.data?.errors) {
          setFormErrors({ ...formErrors, apiError: err.response.data.errors });
        } else {
          setFormErrors({ ...formErrors, apiError: 'Something went wrong' });
        }
      }
    }
  };

  return (
    <>
      <Header />
      {/* <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center min-h-[84vh]">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
        <form className="w-full max-w-md space-y-4" onSubmit={onSubmit}>
          <div>
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              name="email"
              placeholder="john@example.com"
              required
              type="email"
              value={formData.email}
              onChange={onChange}
            />
            {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
          </div>
          <div>
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="password"
              name="password"
              required
              type="password"
              value={formData.password}
              onChange={onChange}
            />
          </div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            type="submit"
          >
            Sign In
          </button>
          {formErrors.apiError && <p className="text-red-500">{formErrors.apiError}</p>}
          <div className="text-center text-gray-500">
            Don't have an account?{' '}
            <Link href="/signup">
              Sign Up
            </Link>
          </div>
        </form>
      </div> */}
      <Footer />
    </>
  );
}
