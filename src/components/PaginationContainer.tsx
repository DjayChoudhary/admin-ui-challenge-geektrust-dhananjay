import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

export default function PaginationContainer({
  paginationRows,
}: {
  paginationRows: number[];
}) {
  return (
    <nav className="flex gap-4 justify-evenly py-5">
      <button
        disabled
        className="rounded-full border-2 p-1 disabled:bg-gray-200 disabled:text-gray-400 text-gray-500"
      >
        <IoMdArrowRoundBack className="h-5 w-5" />
      </button>
      {paginationRows.map((page) => {
        return (
          <button
            key={page}
            className="rounded-full focus:underline focus:text-blue-600 focus:text-xl hover:text-gray-700 hover:text-lg text-gray-600 font-semibold"
          >
            {page}
          </button>
        );
      })}
      <button className="rounded-full border-2 p-1 hover:bg-blue-200">
        <IoMdArrowRoundForward className="h-5 w-5" />
      </button>
    </nav>
  );
}
