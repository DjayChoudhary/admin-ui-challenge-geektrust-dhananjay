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
  return (
    <div
      ref={modalRef}
      id="editModal"
      className="fixed top-0 left-0 right-0 z-50 hidden w-full mt-8 p-4 overflow-x-hidden overflow-y-auto md:inset-0"
    >
      <div className="relative w-full max-w-2xl md:auto bg-white shadow-lg p-4 mx-auto">
        <div className="relative text-xl text-gray-700 font-bold bg-white rounded-lg shadow-sm p-2">
          Edit Member Data
        </div>
        <form className="flex flex-col gap-4 px-2 py-4">
          <fieldset>
            <label htmlFor="memberId">Id</label>
            <input type="text" disabled defaultValue={memberData?.id} />
          </fieldset>
          <fieldset>
            <label htmlFor="memberName">Name</label>
            <input
              id="memberName"
              type="text"
              defaultValue={memberData?.name}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="memberEmail">Email</label>
            <input
              id="memberEmail"
              type="email"
              defaultValue={memberData?.email}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="memberRole">Role</label>
            <input
              id="memberRole"
              type="text"
              defaultValue={memberData?.role}
            />
          </fieldset>
        </form>

        <div className="flex justify-start gap-6">
          <button className="px-2 py-1 text-white font-semibold bg-blue-600 rounded-md">
            Save
          </button>
          <button
            onClick={() => {
              modalRef.current!.style.display = "none";
            }}
            className="px-2 py-1 font-semibold text-gray-600 rounded-md bg-white border-2 border-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
