"use client";

import { formatTimeToNow } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, ArrowUp, ArrowDown } from "lucide-react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import format from "date-fns/format";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Meme = {
  id: string;
  name: string;
  url: string;
  fileUrl: string;
  lat: number;
  lng: number;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string | null;
};

export const columns: ColumnDef<Meme>[] = [
  //   {
  //     accessorKey: "id",
  //     header: "ID",
  //     cell: ({ row }) => {
  //       const id: string = row.getValue("id");
  //       return <p>{`${id.substring(0, 7)}...`}</p>;
  //     },
  //   },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      const dateFormatted = format(date, "d/M/yy");
      return <div className="font-medium">{dateFormatted}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "verified",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Verified
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const verified = row.getValue("verified");
      if (verified)
        return <div className="font-medium text-green-500">✅ Verified</div>;
      else return <div className="font-medium text-red-500">❌ Unverified</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Edit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const time = row.getValue("updatedAt") as Date;
      const timeSince = formatTimeToNow(new Date(time));
      return <div className="font-medium">{timeSince}</div>;
    },
  },
  {
    id: "actions",
    accessorKey: "id",
    header: "Edit",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Link href={`/admin/edit/${id}`}>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Edit</span>
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
      );
    },
  },
];
