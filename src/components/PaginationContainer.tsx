import { useEffect, useState } from "react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

export default function PaginationContainer({
  searchResultCount,
  currentPageCount,
  setCurrentPageCount,
}: {
  searchResultCount: number;
  currentPageCount: number;
  setCurrentPageCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const PAGINATION_ROW_COUNT = 10;
  const [paginationRows, setPaginationRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  function getPaginationRows(resultCount: number): number[] {
    const rows = [];
    for (let i = 1; i <= Math.ceil(resultCount / PAGINATION_ROW_COUNT); i++) {
      rows.push(i);
    }
    return rows;
  }

  useEffect(() => {
    setPaginationRows(getPaginationRows(searchResultCount));
  }, [searchResultCount]);

  useEffect(() => {
    console.log("currentPage: " + currentPage);
    if (currentPage > 0 && currentPage <= paginationRows.length)
      setCurrentPageCount((currentPage - 1) * PAGINATION_ROW_COUNT);
  }, [currentPage]);

  return (
    <nav className="flex items-center gap-5 justify-evenly py-5">
      <button
        disabled={currentPage <= 1}
        name="navigate backward"
        aria-label="navigate backward"
        onClick={() => {
          // setCurrentPageCount((prev) => prev - PAGINATION_ROW_COUNT);
          setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));
        }}
        className="rounded-full border-2 p-1 disabled:bg-gray-200 disabled:text-gray-400 text-blue-500"
      >
        <IoMdArrowRoundBack className="h-8 w-8" />
      </button>
      {paginationRows.map((page) => {
        return (
          <button
            key={page}
            name={`page-${page}`}
            onClick={(e) => {
              setCurrentPage(page);
            }}
            className={` w-7 h-7  font-semibold text-2xl ${
              page === currentPage
                ? "underline text-blue-600 scale-125 font-bold -mt-1"
                : "hover:text-gray-700 hover:scale-105 text-gray-500"
            }`}
          >
            {page}
          </button>
        );
      })}
      <button
        disabled={currentPage >= paginationRows.length}
        name="navigate forward"
        aria-label="navigate forward"
        onClick={() => {
          // setCurrentPageCount((prev) => prev + PAGINATION_ROW_COUNT);
          setCurrentPage((prev) =>
            prev < paginationRows.length ? prev + 1 : prev
          );
        }}
        className="rounded-full border-2 p-1 disabled:bg-gray-200 disabled:text-gray-400 text-blue-500"
      >
        <IoMdArrowRoundForward className="h-7 w-7" />
      </button>
    </nav>
  );
}
