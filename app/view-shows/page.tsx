import PageContent from "@/app/components/view-shows";
import { Suspense } from "react";
export default async function Page(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <PageContent />
      </Suspense>
  )
}