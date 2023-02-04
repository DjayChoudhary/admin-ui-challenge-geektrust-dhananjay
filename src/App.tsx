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

function App() {
  const PAGINATION_ROW_COUNT = 10;
  const [totalMemberCount, setTotalMemberCount] = useState(0);
  const [paginationRows, setPaginationRows] = useState<number[]>([]);
  const [currentPageCount, setCurrentPageCount] = useState(0);

  const [allMembers, setAllMembers] = useState<IMemberData[]>([]);
  const [searchResults, setSearchResults] = useState<IMemberData[]>([]);
  const [currentPageMembers, setCurrentPageMembers] = useState<IMemberData[]>(
    []
  );
  // const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setAllMembers(members);
    setSearchResults(members);
    setCurrentPageMembers(
      members.slice(currentPageCount, currentPageCount + PAGINATION_ROW_COUNT)
    );
    setTotalMemberCount(allMembers.length);
  }, []);

  useEffect(() => {
    setTotalMemberCount(allMembers.length);
    setCurrentPageMembers(
      members.slice(currentPageCount, currentPageCount + PAGINATION_ROW_COUNT)
    );

    let rows = [];
    for (
      let i = 1;
      i <= Math.ceil(totalMemberCount / PAGINATION_ROW_COUNT);
      i++
    ) {
      rows.push(i);
    }

    setPaginationRows(rows);
  }, [searchResults]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    // e.target.value = searchQuery;
    const searchQuery = e.target.value;
    console.log("inside handleSearchChange: " + searchQuery);

    if (!searchQuery) {
      console.log("empty or falsy search");

      return setSearchResults(allMembers);
    } else {
      // setSearchQuery(e.target.value);
      console.log("inside interval: " + searchQuery);
      let searchedMembers = allMembers.filter(
        (member) =>
          member.name.includes(searchQuery) ||
          member.email.includes(searchQuery) ||
          member.role.includes(searchQuery)
      );
      setSearchResults(searchedMembers);
    }
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
        <input
          type="search"
          name="search"
          id="search"
          className="px-1 my-4 w-full border-2 border-gray-200 rounded-md focus:outline-gray-400"
          onChange={handleSearchChange}
          // value={searchQuery}
          placeholder="Search by name, email or role"
        />
        <PaginationContainer paginationRows={paginationRows} />
        <h1>{searchResults.length}</h1>
        <TableContainer members={searchResults} />
      </div>
    </div>
  );
}

export default App;
