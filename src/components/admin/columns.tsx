"use client";

import { ColumnDef } from "@tanstack/react-table";

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
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "verified",
    header: "Verified",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Edit",
  },
];
