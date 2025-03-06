import React from "react";

export default function ViewHero({ target, setViewModal }) {
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
          Hero Details
        </h2>

        {/* Applicant Information */}
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Title:</p>
            <p>{`${target?.title || "N/A"}`}</p>
          </div>
          <div>
            <p className="font-semibold">Name:</p>
            <p>{target?.name || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Description:</p>
            <p>{target?.description || "N/A"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
