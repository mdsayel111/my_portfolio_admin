import { RiCloseFill } from "react-icons/ri";

export default function ViewExam({ target, setViewModal }) {
  return (
    <div className="p-6 bg-black text-white h-full overflow-auto scrollbar-hidden relative">
      <h1 className="text-2xl font-bold text-center mb-6">Exam Details</h1>
      <span className="absolute top-0 right-0 p-4">
        <RiCloseFill
          size={24}
          className="hover:text-red-500 cursor-pointer duration-300"
          onClick={() => setViewModal(false)}
        />
      </span>
      {/* Applicant Details */}
      <div className="bg-gray-800 shadow-md rounded-lg p-4 mb-6 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Applicant Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <span className="font-bold">Name:</span>{" "}
            {target?.applicant?.firstName} {target?.applicant?.lastName}
          </p>
          <p>
            <span className="font-bold">Gender:</span>{" "}
            {target?.applicant?.gender}
          </p>
          <p>
            <span className="font-bold">Date of Birth:</span>{" "}
            {target?.applicant?.dob}
          </p>
          <p>
            <span className="font-bold">Email:</span>{" "}
            {target?.applicant?.emailAddress || "N/A"}
          </p>
          <p>
            <span className="font-bold">Home Telephone:</span>{" "}
            {target?.homeTelephone || "N/A"}
          </p>
          <p>
            <span className="font-bold">Mobile Number:</span>{" "}
            {target?.applicant?.mobileNumber || "N/A"}
          </p>
          <p>
            <span className="font-bold">Home Address:</span>{" "}
            {target?.applicant?.homeAddress || "N/A"}
          </p>
          <p>
            <span className="font-bold">Postcode:</span>{" "}
            {target?.applicant?.postcode || "N/A"}
          </p>
        </div>
      </div>

      {/* Qualification Details */}
      <div className="bg-gray-800 shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Qualification Details</h2>
        <p>
          <span className="font-bold">Qualification Name:</span>{" "}
          {target?.qualification?.name || "N/A"}
        </p>
        <p>
          <span className="font-bold">Sub Qualification Name:</span>{" "}
          {target?.subjects[0]?.subLevel?.name || "N/A"}
        </p>
      </div>

      {/* Subject Details */}
      <div className="bg-gray-800 shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Subject Details</h2>
        {target?.subjects?.length > 0 ? (
          target?.subjects.map((subject, index) => (
            <div
              key={subject?._id || index}
              className="border-b border-gray-700 pb-2 mb-2"
            >
              <p>
                <span className="font-bold">Name:</span>{" "}
                {subject?.name || "N/A"}
              </p>
              <p>
                <span className="font-bold">Code:</span>{" "}
                {subject?.code || "N/A"}
              </p>
              <p>
                <span className="font-bold">Info:</span>{" "}
                {subject?.info || "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p>No subjects available.</p>
        )}
      </div>

      {/* Venue Details */}
      <div className="bg-gray-800 shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Venue Details</h2>
        <p>
          <span className="font-bold">Name:</span>{" "}
          {target?.venue?.name || "N/A"}
        </p>
        <p>
          <span className="font-bold">Coordinates:</span>{" "}
          {`Lat: ${target?.venue?.coordinates?.latitude || "N/A"}, Lon: ${
            target?.venue?.coordinates?.longitude || "N/A"
          }`}
        </p>
        <p>
          <span className="font-bold">Details:</span>{" "}
          {target?.venue?.details || "N/A"}
        </p>
      </div>

      {/* Other Details */}
      <div className="bg-gray-800 shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
        <p>
          <span className="font-bold">Total Cost:</span>{" "}
          {target?.totalCost || "N/A"}
        </p>
        <p>
          <span className="font-bold">Exam Year:</span>{" "}
          {target?.examYear || "N/A"}
        </p>
        <p>
          <span className="font-bold">Semester:</span>{" "}
          {target?.semester || "N/A"}
        </p>
      </div>
    </div>
  );
}
