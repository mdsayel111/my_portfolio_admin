import { useEffect } from "react";

const ViewDetails = ({ fieldsWithValues }) => {
  useEffect(() => {
    const container = document.getElementById("view-details-container");
    container.classList.add("animate-fadeIn");
  }, []);

  return (
    <div
      id="view-details-container"
      className="max-w-md mx-auto p-2 bg-gradient-to-br from-black-800 to-black-900 rounded-sm shadow-2xl space-y-4 
      transform transition duration-500 ease-in-out"
    >
      {fieldsWithValues.map((field, index) => {
        return (
          <div
            key={index}
            className="flex items-center space-x-2 p-4 bg-gray-800/30 rounded-lg shadow-lg transition transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-600/80"
          >
            {field.type === "image" && field?.value ? (
              <img
                src={field.IMAGE_URL + field?.value}
                alt={field.label}
                className="w-20 h-20 rounded-full mx-auto "
              />
            ) : (
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-indigo-100">
                  {field.label}
                </h2>
                <p className="text-gray-200">{field?.value || "N/A"}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ViewDetails;
