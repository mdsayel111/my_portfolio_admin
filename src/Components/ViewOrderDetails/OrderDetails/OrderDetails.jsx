import { useEffect } from "react";

const OrderDetails = ({ orderDetails }) => {
  useEffect(() => {
    const container = document.getElementById("order-details-container");
    container.classList.add("animate-fadeIn");
  }, []);

  return (
    <div
      id="order-details-container"
      className="max-w-md mx-auto p-2 bg-gradient-to-br from-black-800 to-black-900 rounded-sm shadow-2xl space-y-4 
      transform transition duration-500 ease-in-out"
    >
      {[
        { label: "Order ID", value: orderDetails?.orderID },
        { label: "Branch", value: orderDetails?.branch?.name },
        { label: "Customer Name", value: orderDetails?.customer?.name },
        { label: "Contact", value: orderDetails?.customer?.mobile },
        { label: "Area", value: orderDetails?.areaString },
        { label: "Full Address", value: orderDetails?.fullAddressString },
        {
          label: "Date",
          value: new Date(orderDetails?.createdAt).toLocaleDateString(),
        },
      ].map((item, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 p-4 bg-gray-800/30 rounded-lg shadow-lg transition transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-600/80"
        >
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-indigo-100">
              {item.label}
            </h2>
            <p className="text-gray-200">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
