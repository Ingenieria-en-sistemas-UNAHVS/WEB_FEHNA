export type PaginationResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export function normalizePage(value: string | number | null | undefined): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
}

export function paginate<T>(
  items: T[],
  requestedPage: string | number | null | undefined,
  requestedPageSize = 6,
): PaginationResult<T> {
  const pageSize = Number.isFinite(requestedPageSize) && requestedPageSize > 0
    ? Math.floor(requestedPageSize)
    : 6;
  const totalItems = items.length;
  const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / pageSize);
  const page = totalPages === 0
    ? 1
    : Math.min(normalizePage(requestedPage), totalPages);
  const start = (page - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page,
    pageSize,
    totalItems,
    totalPages,
    hasPrevious: page > 1,
    hasNext: totalPages > 0 && page < totalPages,
  };
}

export function withQueryParams(
  path: string,
  params: Record<string, string | number | null | undefined>,
): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && String(value).length > 0) {
      search.set(key, String(value));
    }
  });
  const query = search.toString();
  return query ? `${path}?${query}` : path;
}
