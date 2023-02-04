import { useState, useEffect } from "react";
import TableContainer from "./components/TableContainer";
import members from "./models/members.json";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import PaginationContainer from "./components/PaginationContainer";

interface IMemberData {
  name: string;
  email: string;
  role: string;
  id: string;
}

export default function App() {
  const PAGINATION_ROW_COUNT = 10;

  const [searchParams, setSearchParams] = useState<string>("");
  const [searchResultCount, setSearchResultCount] = useState(0);
  const [currentPageCount, setCurrentPageCount] = useState(0);
  const [allMembers, setAllMembers] = useState<IMemberData[]>([]);
  const [searchResults, setSearchResults] = useState<IMemberData[]>([]);
  const [currentPageMembers, setCurrentPageMembers] = useState<IMemberData[]>(
    []
  );

  function handleRowDelete(rowId: string) {
    setAllMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== rowId)
    );
    setSearchResults((prevMembers) =>
      prevMembers.filter((member) => member.id !== rowId)
    );
  }
  useEffect(() => {
    setAllMembers(members);
    setSearchResults(members);
    setCurrentPageMembers(
      members.slice(currentPageCount, currentPageCount + PAGINATION_ROW_COUNT)
    );
    setSearchResultCount(members.length);
  }, []);

  useEffect(() => {
    setSearchResultCount(searchResults.length);
    setCurrentPageMembers(
      searchResults.slice(
        currentPageCount,
        currentPageCount + PAGINATION_ROW_COUNT
      )
    );
    // console.table(searchResults);
  }, [searchResults]);

  useEffect(() => {
    console.table("currentPageCount: " + currentPageCount);
    setCurrentPageMembers(
      searchResults.slice(
        currentPageCount,
        currentPageCount + PAGINATION_ROW_COUNT
      )
    );
  }, [currentPageCount]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchQuery = e.target.value;
    setSearchParams(searchQuery);
    console.table("inside handleSearchChange: " + searchQuery);
    let searchedMembers = allMembers.filter(
      (member) =>
        member.name.includes(searchQuery) ||
        member.email.includes(searchQuery) ||
        member.role.includes(searchQuery)
    );
    setSearchResults(searchedMembers);
  }

  return (
    <div className="mx-auto max-w-3xl p-4 m-4">
      <div className="flex flex-col justify-center items-center">
        <h1 className="flex items-center justify-center gap-4 text-xl font-extrabold text-gray-800 w-full">
          Admin UI Challenge
          <a
            href="https://github.com/DjayChoudhary/admin-ui-challenge-geektrust-dhananjay"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="h-8 w-8" />
          </a>
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchParams("");
          }}
          className="w-full"
        >
          <input
            type="search"
            name="search"
            id="search"
            className="px-1 my-4 w-full border-2 border-gray-200 rounded-md focus:outline-gray-400"
            onChange={handleSearchChange}
            value={searchParams}
            placeholder="Search by name, email or role"
          />
        </form>
        {/* <h1>{searchResults.length}</h1> */}
        <TableContainer
          // members={searchResults.slice(0, PAGINATION_ROW_COUNT)}
          members={currentPageMembers}
          setMembers={setCurrentPageMembers}
          handleRowDelete={handleRowDelete}
        />
        <PaginationContainer
          searchResultCount={searchResultCount}
          currentPageCount={currentPageCount}
          setCurrentPageCount={setCurrentPageCount}
        />
      </div>
    </div>
  );
}
