import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationControlsTypes = {
  page: number;
  per_page: number;
  totalResults: number;
};

const PaginationControls = ({
  page,
  per_page,
  totalResults,
}: PaginationControlsTypes) => {
  const blockNext: boolean = totalResults < page * per_page;
  const totalPages: number = Math.ceil(totalResults / per_page);
  console.log("HAVE WE REACHED A LIMIT?? ", blockNext);
  console.log("TOTAL PAGES ", totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${page === 1 && "pointer-events-none opacity-50"}`}
            href={`detective?page=${page - 1}&per_page${per_page}`}
          />
        </PaginationItem>
        <PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationLink
              key={i + 1}
              href={`detective?page=${i + 1}&per_page${per_page}`}
              className={`${page === i + 1 && " bg-neutral-500"}`}
            >
              {i + 1}
            </PaginationLink>
          ))}
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={`${blockNext && "pointer-events-none opacity-50"}`}
            href={`detective?page=${page + 1}&per_page${per_page}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
