import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { withQueryParams } from "@/lib/pagination";

type PublicPaginationProps = {
  path: string;
  page: number;
  totalPages: number;
  params?: Record<string, string | number | null | undefined>;
};

export function PublicPagination({ path, page, totalPages, params = {} }: PublicPaginationProps) {
  if (totalPages <= 1) return null;
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter((number) => number === 1 || number === totalPages || Math.abs(number - page) <= 1);
  const buildHref = (nextPage: number) => withQueryParams(path, { ...params, page: nextPage });

  return (
    <Pagination className="mt-8" aria-label="Paginación pública">
      <PaginationContent>
        <PaginationItem><PaginationPrevious href={buildHref(Math.max(1, page - 1))} aria-disabled={page === 1} className={page === 1 ? "pointer-events-none opacity-40" : undefined}>Anterior</PaginationPrevious></PaginationItem>
        {pageNumbers.map((number, index) => {
          const previous = pageNumbers[index - 1];
          return <PaginationItem key={number}>{previous && number - previous > 1 && <PaginationEllipsis />}<PaginationLink href={buildHref(number)} isActive={number === page} aria-label={`Ir a la página ${number}`}>{number}</PaginationLink></PaginationItem>;
        })}
        <PaginationItem><PaginationNext href={buildHref(Math.min(totalPages, page + 1))} aria-disabled={page === totalPages} className={page === totalPages ? "pointer-events-none opacity-40" : undefined}>Siguiente</PaginationNext></PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
