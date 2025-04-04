"use client";

import Card from "@/components/Card/Card";
import { SimpleCard } from "@/components/Card/SimpleCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="px-6 xl:px-20 mt-20 p-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20">
          <div className="flex flex-col space-y-10 justify-center items-center xl:items-start">
            <h1 className="font-bold text-2xl xl:text-4xl 2xl:text-7xl text-center xl:text-left">
              Empower Creators & Communities with Blockchain Contests
            </h1>
            <span className="2xl:text-2xl text-center xl:text-left">
              A platform where creators launch contests, communities compete,
              and everyone gets access to a world of exciting blockchain
              challenges.
            </span>
            <div className="flex flex-row justify-between items-center space-x-10 xl:mt-10">
              <div className="flex flex-col space-y-2">
                <span className="font-bold text-lg xl:text-3xl">1.5K +</span>
                <span className="xl:text-xl opacity-50">Contest</span>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="font-bold text-lg xl:text-3xl">10 +</span>
                <span className="xl:text-xl opacity-50">Creators</span>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="font-bold text-lg xl:text-3xl">500 +</span>
                <span className="xl:text-xl opacity-50">Winners</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col xl:flex-row space-y-2 xl:space-y-0 justify-end items-center space-x-2">
              <Button size="lg">Start Playing</Button>
              <Button size="lg" variant="outline">
                Create Contest
              </Button>
            </div>
          </div>
          <div className="hidden xl:grid grid-cols-2 grid-rows-2 gap-6">
            <SimpleCard colSize={1} rowSize={2} image="/images/black-sam.png" />
            <SimpleCard colSize={1} rowSize={1} image="/images/red-sam.png" />
            <SimpleCard colSize={1} rowSize={1} image="/images/green-sam.png" />
          </div>
        </div>
      </div>
      <section className="p-6 xl:p-20 bg-stone-100 h-full">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-bold text-4xl">Latest Releases</h1>
          <Button variant="link">
            View more <ChevronRight />
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-10 mt-10 place-items-center">
          <Card
            imageUrl="/images/black-sam.png"
            title="Black Samurai"
            username="samurai"
            currentBid="0.1"
            onPlaceBid={() => {}}
            end={new Date(new Date().getTime() + 2 * 60 * 60 * 1000)}
          />
          <Card
            imageUrl="/images/red-sam.png"
            title="Red Samurai"
            username="samurai"
            currentBid="0.1"
            onPlaceBid={() => {}}
          />
          <Card
            imageUrl="/images/green-sam.png"
            title="Green Samurai"
            username="samurai"
            currentBid="0.1"
            onPlaceBid={() => {}}
          />
          <Card
            imageUrl="/images/blue-sam.png"
            title="Blue Samurai"
            username="samurai"
            currentBid="0.1"
            onPlaceBid={() => {}}
          />
        </div>
      </section>
    </div>
  );
}
