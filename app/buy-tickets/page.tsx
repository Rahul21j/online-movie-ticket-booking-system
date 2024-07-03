import BuyTicketsPageContent from "@/app/components/buy-tickets";
import { Suspense } from "react";
export default async function Page(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuyTicketsPageContent />
    </Suspense>
  )
}