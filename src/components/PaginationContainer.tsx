import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

export default function PaginationContainer({
  paginationRows,
}: {
  paginationRows: number[];
}) {
  return (
    <nav className="flex gap-4 justify-evenly py-5">
      <button className="rounded-full border-2 p-1">
        <IoMdArrowRoundBack className="h-5 w-5 text-gray-700" />
      </button>
      {paginationRows.map((page) => {
        return (
          <button
            key={page}
            className="rounded-full focus:underline focus:text-blue-600 focus:text-xl hover:text-gray-700 hover:text-lg text-gray-600 font-semibold"
          >
            <span className="">{page}</span>
          </button>
        );
      })}
      <button className="rounded-full border-2 p-1 hover:bg-blue-200 hov">
        <IoMdArrowRoundForward className="h-5 w-5" />
      </button>
    </nav>
  );
}
