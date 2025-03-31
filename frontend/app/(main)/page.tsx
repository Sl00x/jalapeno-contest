"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Ticket } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col pb-8">
      <div className="flex items-center justify-center p-10">
        texttexttexttext text text text text text text text text text text text
        text text text text text text text text text text text text text text
        text text text text text text text text text text text text text text
        text text text text text text text text text
      </div>
      <div className="flex-1 px-32 flex space-x-8">
        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div
              className="relative flex-1 w-full h-full bg-no-repeat bg-cover rounded-lg shadow-black/40 shadow-lg"
              style={{ backgroundImage: "url(https://picsum.photos/1920)" }}
            >
              <div className="py-2 px-4 absolute top-2 right-2">
                <div className="text-white flex shadow-lg shadow-black/40 rounded-lg">
                  <div>
                    <div className="rounded-l-lg bg-primary p-2">Time left</div>
                  </div>
                  <div className="rounded-r-lg flex bg-secondary text-primary items-center">
                    <span className="px-2 text-lg font-semibold">20</span>
                    <span className="text-primary/40">:</span>
                    <span className="px-2 text-lg font-semibold">06</span>
                    <span className="text-primary/40">:</span>
                    <span className="px-2 text-lg font-semibold">19</span>
                  </div>
                </div>
              </div>
            </div>
            <span className="font-bold text-xl">
              {"CryptoArti’s Contest - Win 10 ETH"}
            </span>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Image
                  src="https://picsum.photos/200"
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>#cryptoartist</span>
              </div>
              <div className="flex flex-col space-y-1 items-end">
                <div className="flex items-end space-x-1">
                  <Button className="w-12 h-12" variant="outline">
                    <Heart />
                  </Button>
                  <Button className="w-16 h-16">
                    <Ticket size={32} />
                  </Button>
                </div>
                <span className="font-semibold text-lg">
                  1 Ticket = 0.02 ETH
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Progress
              className="h-4"
              value={150}
              max={250}
              showValue
              showMaxValue
              steps={[
                { value: 20, prize: "$100 Amazon Voucher" },
                { value: 30, prize: "$200 Amazon Voucher" },
                { value: 200, prize: "Buggati Chiron" },
              ]}
            />
          </CardFooter>
        </Card>
        <div className="flex-1 flex flex-col space-y-4"></div>
      </div>
    </div>
  );
}
