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
  console.log(page);
  console.log(per_page);

  console.log(totalResults);

  const blockNext: boolean = totalResults > page * per_page;
  console.log("HAVE WE REACHED A LIMIT?? ", blockNext);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`detective?page=${page - 1}&per_page${per_page}`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`detective?page=${page}&per_page${per_page}`}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={`detective?page=${page + 1}&per_page${per_page}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
