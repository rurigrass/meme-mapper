"use client";

import { formatTimeToNow } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  Tv,
} from "lucide-react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import format from "date-fns/format";
import Link from "next/link";
import ColumnHeader from "./ColumnHeader";
import { memeType } from "@/lib/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<memeType>[] = [
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
    header: ({ column }) => <ColumnHeader column={column} title="Created" />,
    // header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      const dateFormatted = format(date, "d/M/yy");
      return <div className="font-medium">{dateFormatted}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status");
      if (status === "PENDING") {
        return <div className="font-medium text-yellow-500">⚠️ PENDING</div>;
      } else if (status === "DETECTIVE") {
        return <div className="font-medium text-purple-500">🕵️‍♂️ DETECTIVE</div>;
      } else if (status === "APPROVED") {
        return <div className="font-medium text-green-500">✅ APPROVED</div>;
      } else if (status === "REJECTED") {
        return <div className="font-medium text-red-500">❌ REJECTED</div>;
      } else {
        return <div>UNKNOWN STATUS</div>;
      }
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <ColumnHeader column={column} title="Updated" />,
    cell: ({ row }) => {
      const time = row.getValue("updatedAt") as Date;
      const timeSince = formatTimeToNow(new Date(time));
      return <div className="font-medium">{timeSince}</div>;
    },
  },
  {
    id: "actions",
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/admin/edit/${id}`}>
              <DropdownMenuItem className="hover:cursor-pointer">
                <Pencil className="mr-2 h-3 w-3" />
                Edit
              </DropdownMenuItem>
            </Link>
            <Link href={`/game/${id}`}>
              <DropdownMenuItem className="hover:cursor-pointer">
                <Tv className="mr-2 h-3 w-3" />
                Play Level
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
