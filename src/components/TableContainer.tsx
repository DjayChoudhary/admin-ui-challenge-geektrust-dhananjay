import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
interface ITableContainerProps {
  members: IRowMemberData[];
  setMembers: React.Dispatch<React.SetStateAction<IRowMemberData[]>>;
  handleRowDelete: (rowId: string) => void;
}
export default function TableContainer({
  members,
  setMembers,
  handleRowDelete,
}: ITableContainerProps) {
  const [allRowsSelected, setAllRowsSelected] = useState<boolean>(false);

  return (
    <div className="relative w-full overflow-x-auto shadow-md">
      <table
        about="Admin UI Challenge Table"
        aria-label="Admin UI Challenge Table"
        className="table-auto text-left w-full"
      >
        <thead>
          <tr
            aria-label="Table Header"
            className="border-b-2 border-b-gray-300 bg-gray-100"
          >
            <th className="pl-2 pr-4 py-2">
              <input
                type="checkbox"
                name="Select All Rows"
                aria-label="Select All Rows"
                id="checkbox"
                checked={allRowsSelected}
                onChange={() => setAllRowsSelected((prev) => !prev)}
              />
            </th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((memberRow) => {
            return (
              <Row
                key={memberRow.id}
                rowData={memberRow}
                allRowsSelected={allRowsSelected}
                handleRowDelete={handleRowDelete}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
interface IRowProps {
  rowData: IRowMemberData;
  allRowsSelected: boolean;
  handleRowDelete: (rowId: string) => void;
}
interface IRowMemberData {
  selected?: boolean;
  name: string;
  email: string;
  role: string;
  id: string;
}
function Row({ rowData, allRowsSelected, handleRowDelete }: IRowProps) {
  const [isRowSelected, setIsRowSelected] = useState(allRowsSelected);
  const [memberRow, setMemberRow] = useState<IRowMemberData>(rowData);
  const rowSelection = useRef<HTMLInputElement | null>(null);
  function handleRowToggle() {
    console.log("Row toggled: " + memberRow.id);

    setIsRowSelected((prev) => !prev);
    setMemberRow((prev) => {
      prev.selected = isRowSelected;
      return prev;
    });
  }
  useEffect(() => {
    setIsRowSelected(allRowsSelected);
  }, [allRowsSelected]);
  useEffect(() => {
    isRowSelected
      ? rowSelection.current?.parentElement?.parentElement?.classList.add(
          "bg-gray-100"
        )
      : rowSelection.current?.parentElement?.parentElement?.classList.remove(
          "bg-gray-100"
        );
  }, [isRowSelected]);

  return (
    <tr
      className="border-b-2 border-b-gray-100 hover:scale-y-105  hover:shadow-md focus:scale-y-105  focus:shadow-md"
      id={`row-${memberRow.id}`}
      aria-label={`row-${memberRow.id}`}
      onClick={(e) => {
        e.stopPropagation();
        handleRowToggle();
        console.log("row clicked");
      }}
    >
      <td className="pl-2 pr-4 py-2 focus:bg-red-400">
        <input
          ref={rowSelection}
          type="checkbox"
          name="checkbox"
          aria-label={`select-row-${memberRow.id}`}
          id={memberRow.id}
          checked={isRowSelected}
          onClick={(e) => {
            e.stopPropagation();
            handleRowToggle();
            console.log("checkbox clicked");
          }}
        />
      </td>
      <td className="px-4 py-2">{memberRow.name}</td>
      <td className="px-4 py-2">{memberRow.email}</td>
      <td className="px-4 py-2">{memberRow.role}</td>
      <td className="px-4 py-2 flex">
        <button
          aria-label={`Edit Row ${memberRow.id}`}
          name={`Edit Row ${memberRow.id}`}
          onClick={(e) => {
            e.stopPropagation();
            console.log("Row Edit Clicked: " + memberRow.id);
          }}
        >
          <BiEdit className="h-6 w-6 text-blue-600" />
        </button>
        <button
          aria-label={`Delete Row ${memberRow.id}`}
          name={`Delete Row ${memberRow.id}`}
          onClick={(e) => {
            e.stopPropagation();
            console.log("Row Edit Deleted: " + memberRow.id);
            handleRowDelete(memberRow.id);
          }}
        >
          <MdDeleteOutline className="h-6 w-6 text-red-600" />
        </button>
      </td>
    </tr>
  );
}
