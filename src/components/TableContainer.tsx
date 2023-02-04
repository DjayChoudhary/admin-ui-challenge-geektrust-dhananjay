import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
interface ITableContainerProps {
  members: IRowMemberData[];
}
export default function TableContainer({ members }: ITableContainerProps) {
  const [allRowsSelected, setAllRowsSelected] = useState<boolean>(false);

  return (
    <div className="relative w-full overflow-x-auto">
      <table className="table-auto text-left w-full">
        <thead>
          <tr className="border-b-2 border-b-gray-300 bg-gray-100">
            <th className="pl-2 pr-4 py-2">
              <input
                type="checkbox"
                name="checkbox"
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
}
interface IRowMemberData {
  selected?: boolean;
  name: string;
  email: string;
  role: string;
  id: string;
}
function Row({ rowData, allRowsSelected }: IRowProps) {
  const [isRowSelected, setIsRowSelected] = useState(allRowsSelected);
  const [memberRow, setMemberRow] = useState<IRowMemberData>(rowData);
  const rowSelection = useRef<HTMLInputElement | null>(null);
  function handleRowToggle(e: React.ChangeEvent<HTMLInputElement>) {
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
      className="border-b-2 border-b-gray-100 hover:scale-y-105  hover:shadow-md"
      id={memberRow.id}
    >
      <td className="pl-2 pr-4 py-2 focus:bg-red-400">
        <input
          ref={rowSelection}
          type="checkbox"
          name="checkbox"
          id={memberRow.id}
          checked={isRowSelected}
          onChange={(e) => {
            handleRowToggle(e);
          }}
        />
      </td>
      <td className="px-4 py-2">{memberRow.name}</td>
      <td className="px-4 py-2">{memberRow.email}</td>
      <td className="px-4 py-2">{memberRow.role}</td>
      <td className="px-4 py-2 flex">
        <button>
          <BiEdit className="h-6 w-6 text-blue-600" />
        </button>
        <button>
          <MdDeleteOutline className="h-6 w-6 text-red-600" />
        </button>
      </td>
    </tr>
  );
}
