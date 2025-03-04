export default function CustomModal({ children }) {
  return (
    <div className="absolute top-0 left-0 w-full h-screen overflow-hidden  z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center ">
      <div className="md:h-2/3 md:w-1/2 h-[90%]  overflow-hidden   rounded-lg shadow-lg p-6 ">
        {children}
      </div>
    </div>
  );
}
