import Success from "@/app/components/success";
import { Suspense } from "react";
export default async function Page(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Success />
    </Suspense>
  )
}