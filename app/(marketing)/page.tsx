import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import { calSans, poppins } from "@/lib/fonts";


export default function MarketingPage() {
  return (
    <main className="h-full pt-40 pb-24 px-4 flex flex-col items-center justify-center">
      <section className={cn("flex flex-col items-center justify-center", calSans.className)}>
        <div className="flex justify-center items-center gap-3 bg-amber-100 text-amber-700 mb-4 px-4 py-2 uppercase border shadow-sm rounded-full">
          <Medal className="w-6 h-6" />
          <h3 className="[word-spacing:0.25rem]">No 1 Task Management App</h3>
        </div>
        <h1 className="text-3xl md:text-6xl text-center mb-6 text-neutral-600">
          Taskzone helps team move
        </h1>
        <p className="text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-5 py-3 rounded-md w-fit">
          Work Forward
        </p>
      </section>
      <p className={cn("text-sm md:text-xl max-w-xs md:max-w-2xl mt-4 mx-auto  text-center text-neutral-400", poppins.className)}>
        Collaborate, manage projects and reach ne productivity peaks. From high
        piority tasks to due dates in seconds, the way your team works is unique
        - accomplish it all with Taskzone.
      </p>
      <Button variant="default" className="mx-auto mt-8" asChild>
        <Link href="/signup">Get Taskzone for free</Link>
      </Button>
    </main>
  );
}
