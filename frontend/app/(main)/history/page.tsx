"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

export default function Winner() {
  const winners = [
    {
      nft: "Cyber Dreams #128",
      artist: "cryptoartist",
      winner: "@winner123",
      bid: "5.2 ETH",
      date: "Jan 15, 2025",
      status: "Completed",
    },
    {
      nft: "Abstract Reality #064",
      artist: "artmaster",
      winner: "@nftking",
      bid: "3.8 ETH",
      date: "Jan 12, 2025",
      status: "Completed",
    },
    {
      nft: "Meta Beings #392",
      artist: "nftcreator",
      winner: "@cryptofan",
      bid: "4.5 ETH",
      date: "Jan 10, 2025",
      status: "Completed",
    },
    {
      nft: "Digital Dreams #256",
      artist: "digitalartist",
      winner: "@artlover",
      bid: "6.1 ETH",
      date: "Jan 8, 2025",
      status: "Completed",
    },
  ];

  return (
    <main className="flex flex-col px-20 mt-20 p-10">
      <h1 className="text-7xl font-bold mb-2">Contest Winners</h1>
      <p className="text-gray-600 mb-6">
        History of successful contest and their winners
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contest</TableHead>
            <TableHead>Winner</TableHead>
            <TableHead>Final Bid</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {winners.map((winner, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex flex-row space-x-2">
                  <Image
                    src={"/images/avatar.png"}
                    width={40}
                    height={40}
                    alt={"contest"}
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium">{winner.nft}</div>
                    <div className="text-sm text-gray-500">
                      by {winner.artist}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{winner.winner}</TableCell>
              <TableCell>{winner.bid}</TableCell>
              <TableCell>{winner.date}</TableCell>
              <TableCell>
                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                  {winner.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
