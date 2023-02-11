import React from "react";

interface IRowMemberData {
  selected?: boolean;
  name: string;
  email: string;
  role: string;
  id: string;
}
export default function EditModalContainer({
  modalRef,
  memberData,
}: {
  modalRef: React.MutableRefObject<null | HTMLDivElement>;
  memberData?: IRowMemberData;
}) {
  function handleModalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <div
      ref={modalRef}
      id="editModal"
      className="fixed top-0 left-0 right-0 z-50 hidden w-full mt-16 mx-4 overflow-x-hidden overflow-y-auto md:inset-0  backdrop-blur-sm"
    >
      <div className="relative w-full max-w-2xl bg-white shadow-lg px-4 py-2 mx-auto border-2 border-gray-50">
        <div className="relative text-xl text-gray-800 font-bold bg-white rounded-lg shadow-sm p-2">
          Edit Member Data
        </div>
        <form
          className="flex flex-col gap-4 px-2 py-4 mr-2"
          onSubmit={handleModalSubmit}
        >
          <fieldset>
            <label className="font-semibold text-gray-800" htmlFor="memberId">
              Id
            </label>
            <input
              className="w-full px-2 py-1  border-2 border-gray-200 rounded-md focus:outline-gray-400 text-gray-700"
              type="text"
              disabled
              defaultValue={memberData?.id}
            />
          </fieldset>
          <fieldset>
            <label className="font-semibold text-gray-800" htmlFor="memberName">
              Name
            </label>
            <input
              className="w-full px-2 py-1  border-2 border-gray-200 rounded-md focus:outline-gray-400 text-gray-700"
              id="memberName"
              type="text"
              defaultValue={memberData?.name}
            />
          </fieldset>
          <fieldset>
            <label
              className="font-semibold text-gray-800"
              htmlFor="memberEmail"
            >
              Email
            </label>
            <input
              className="w-full px-2 py-1  border-2 border-gray-200 rounded-md focus:outline-gray-400 text-gray-700"
              id="memberEmail"
              type="email"
              defaultValue={memberData?.email}
            />
          </fieldset>
          <fieldset>
            <label className="font-semibold text-gray-800" htmlFor="memberRole">
              Role
            </label>
            <input
              className="w-full px-2 py-1  border-2 border-gray-200 rounded-md focus:outline-gray-400 text-gray-700"
              id="memberRole"
              type="text"
              defaultValue={memberData?.role}
            />
          </fieldset>
          <div className="flex justify-start gap-6">
            <button
              type="submit"
              className="px-2 py-1 text-white font-semibold bg-blue-600 rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                modalRef.current!.style.display = "none";
              }}
              className="px-2 py-1 font-semibold text-gray-600 rounded-md bg-white border-2 border-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
