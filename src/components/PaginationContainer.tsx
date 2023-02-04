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
    <nav className="flex items-center gap-4 justify-evenly py-5">
      <button
        disabled={currentPage <= 1}
        onClick={() => {
          // setCurrentPageCount((prev) => prev - PAGINATION_ROW_COUNT);
          setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));
        }}
        className="rounded-full border-2 p-1 disabled:bg-gray-200 disabled:text-gray-400 text-blue-500"
      >
        <IoMdArrowRoundBack className="h-5 w-5" />
      </button>
      {paginationRows.map((page) => {
        return (
          <button
            key={page}
            onClick={(e) => {
              setCurrentPage(page);
            }}
            className={`hover:text-gray-700 hover:scale-105 text-gray-600 font-semibold ${
              page === currentPage
                ? "underline text-blue-600 scale-125 font-bold"
                : ""
            }`}
          >
            {page}
          </button>
        );
      })}
      <button
        disabled={currentPage >= paginationRows.length}
        onClick={() => {
          // setCurrentPageCount((prev) => prev + PAGINATION_ROW_COUNT);
          setCurrentPage((prev) =>
            prev < paginationRows.length ? prev + 1 : prev
          );
        }}
        className="rounded-full border-2 p-1 disabled:bg-gray-200 disabled:text-gray-400 text-blue-500"
      >
        <IoMdArrowRoundForward className="h-5 w-5" />
      </button>
    </nav>
  );
}
