import React from "react";

export default function ViewApplicationModal({ target, setViewModal }) {
  return (
    <>
      <div className="bg-black rounded-lg shadow-lg p-6 w-full relative text-white">
        {/* Close Button */}
        <button
          onClick={() => setViewModal(false)}
          className="absolute top-4 right-4 text-white hover:text-red-500"
        >
          ✕
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-bold text-center mb-4">
          Applicant Details
        </h2>

        {/* Applicant Information */}
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Name:</p>
            <p>{`${target?.firstName || "N/A"} ${
              target?.lastName || "N/A"
            }`}</p>
          </div>
          <div>
            <p className="font-semibold">Date of Birth:</p>
            <p>{target?.dob || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Gender:</p>
            <p>{target?.gender || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Home Address:</p>
            <p>{target?.homeAddress || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Postcode:</p>
            <p>{target?.postcode || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Email Address:</p>
            <p>{target?.emailAddress || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Home Telephone:</p>
            <p>{target?.homeTelephone || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Mobile Number:</p>
            <p>{target?.mobileNumber || "N/A"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
