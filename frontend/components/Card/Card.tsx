import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface CardProps {
  imageUrl: string;
  title: string;
  username: string;
  currentBid: string;
  end?: Date;
  onPlaceBid: () => void;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  username,
  currentBid,
  end,
  onPlaceBid,
}) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!end) {
      setTimeLeft(`Never`);
      return;
    }
    const interval = setInterval(() => {
      const now = new Date();
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Expired");

        clearInterval(interval);
      } else if (diff > 24 * 60 * 60 * 1000) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (years > 0) {
          setTimeLeft(`${years} year${years > 1 ? "s" : ""}`);
        } else if (months > 0) {
          setTimeLeft(`${months} month${months > 1 ? "s" : ""}`);
        } else {
          setTimeLeft(`${days} day${days > 1 ? "s" : ""}`);
        }
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [end]);

  const isEndingSoon =
    end && new Date(end).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000;

  return (
    <div
      className="relative border border-gray-300 rounded-lg overflow-hidden shadow-md w-full max-w-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 w-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        {isEndingSoon && !isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-red-800 to-red-800/0 flex flex-col items-center justify-center">
            <span className="text-white text-xl font-bold">End in</span>
            <span className="text-white text-3xl font-bold">{timeLeft}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center mb-4">
          <Image
            width={40}
            height={40}
            src="/images/avatar.png"
            alt="Avatar"
            className="rounded-full mr-3"
          />
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-md text-gray-500">@{username}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col space-y-1">
            <span className="font-bold text-2xl text-stone-800">
              {currentBid} ETH
            </span>
            {end ? (
              <div className="felx flex-row space-x-1">
                <span>End in {timeLeft}</span>
              </div>
            ) : (
              <div className="felx flex-row space-x-1">
                <span>Not limited</span>
              </div>
            )}
          </div>
          <Button onClick={onPlaceBid} className="text-sm">
            Buy Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
