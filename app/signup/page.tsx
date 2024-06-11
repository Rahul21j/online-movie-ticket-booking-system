'use client';
import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      await axios.post("/api/users/signup", data, config);
      console.log("Registration Successful");
      router.push("/signin");
    } catch (error) {
      console.error("Registration Error:", (error as Error).message);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-white p-6 flex flex-col items-center justify-center min-h-[84vh]">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        <form className="w-full max-w-md space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="text-sm font-medium leading-none"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="firstName"
                name="firstName"
                placeholder="John"
                value={firstName}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <label
                className="text-sm font-medium leading-none"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium leading-none" htmlFor="email">
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              name="email"
              placeholder="john@example.com"
              required
              type="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div>
            <label
              className="text-sm font-medium leading-none"
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
              value={password}
              onChange={onChange}
            />
          </div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            type="submit"
          >
            Sign Up
          </button>
          <div className="text-center text-gray-500">
            Already have an account? <Link href="/signin">Sign In</Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
