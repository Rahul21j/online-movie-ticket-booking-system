
import Label from "@/app/ui/Label"
import { Select } from "@/app/ui/Select"
import SelectItem from "@/app/ui/SelectItem"
import SelectTrigger from "@/app/ui/SelectTrigger"
import SelectContent from "@/app/ui/SelectContent"
import SelectValue from "@/app/ui/SelectValue"
import Input from "@/app/ui/Input"
import { Button } from "@/app/ui/Button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <img src="/placeholder.svg" width={600} height={400} alt="Movie Poster" className="rounded-lg shadow-lg" />
        </div>
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Interstellar</h1>
            <p className="text-gray-500 dark:text-gray-400">
              A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.
            </p>
          </div>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="showtime">Showtime</Label>
                <Select id="showtime" defaultValue="2023-06-09 19:00">
                  <SelectItem value="2023-06-09 19:00">June 9, 2023 - 7:00 PM</SelectItem>
                  <SelectItem value="2023-06-10 14:00">June 10, 2023 - 2:00 PM</SelectItem>
                  <SelectItem value="2023-06-11 21:00">June 11, 2023 - 9:00 PM</SelectItem>
                </Select>
              </div>
              <div>
                <Label htmlFor="tickets">Tickets</Label>
                <Select id="tickets" defaultValue="2">
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="seats">Seats</Label>
              <Input id="seats" type="text" placeholder="Enter seat preferences (e.g. A1, B2, C3)" />
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
}