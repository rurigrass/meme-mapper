import { ChevronsUpDown, ArrowUp, ArrowDown, EyeOff } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import { MemeStatusTypes } from "@/lib/types";
import { useState } from "react";

interface ColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  type: string;
}

const ColumnHeader = <TData, TValue>({
  column,
  title,
  type,
}: ColumnHeaderProps<TData, TValue>) => {
  const [header, setHeader] = useState<String>(title);
  return (
    <div className="flex items-center space-x-2 -ml-3">
      {type === "search" && (
        <div className="flex items-center py-2">
          <Input
            placeholder="Name"
            // value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => column.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 data-[state=open]:bg-accent"
          >
            <span>
              {type === "search" && <></>}
              {type === "sort" && <div className="mr-2">{title}</div>}
              {type === "filter" && <div className="mr-2">{header}</div>}
            </span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className=" h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ChevronsUpDown className=" h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {type === "sort" || type === "search" ? (
            <>
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={() => column.toggleSorting(false)}
              >
                <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={() => column.toggleSorting(true)}
              >
                <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Desc
              </DropdownMenuItem>
            </>
          ) : (
            <>
              {["SHOW ALL", ...Object.values(MemeStatusTypes)].map((status) => {
                return (
                  <DropdownMenuItem
                    key={status}
                    className="capitalize hover:cursor-pointer"
                    onClick={() => {
                      setHeader(status);
                      status !== "SHOW ALL"
                        ? column.setFilterValue(status)
                        : column.setFilterValue(undefined);
                    }}
                  >
                    {status}
                  </DropdownMenuItem>
                );
              })}
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ColumnHeader;
