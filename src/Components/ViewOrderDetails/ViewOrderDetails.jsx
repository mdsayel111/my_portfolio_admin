import { CLTabs } from "@antopolis/admin-component-library/dist/elements";
import {
  toast,
  useEntityState,
} from "@antopolis/admin-component-library/dist/hooks";
import { useEffect } from "react";
import OrderDetails from "./OrderDetails/OrderDetails";
import OrderItems from "./OrderItems/OrderItems";
import { useAxiosInstance } from "../../Hooks/Instances/useAxiosInstance";

const tabs = [
  { value: "orderDetails", label: "Order Details" },
  { value: "orderItems", label: "Order Items" },
];

const ViewOrderDetails = ({ setViewModalCSS, api }) => {
  const { data, setData, filter, setFilter, toggleFetch } = useEntityState();

  const axiosInstance = useAxiosInstance();

  // Set default filter to "orderDetails"
  useEffect(() => {
    setFilter("orderDetails");
  }, []);

  // Update viewModalCSS only when filter is "orderItems"
  useEffect(() => {
    if (filter === "orderItems") {
      setViewModalCSS("orderItems");
    } else {
      setViewModalCSS(""); // Reset CSS when not "orderItems"
    }
  }, [filter]);

  useEffect(() => {
    async function fetchData() {
      const { data: orderDetails, status } = await axiosInstance.get(api);
      if (status === 200) {
        setData(orderDetails);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch data",
        });
      }
    }
    fetchData();
  }, []);

  console.log("orderDetails", data);

  return (
    <div>
      <CLTabs
        tabs={tabs}
        className={"*:w-full *:*:w-full"}
        setFilter={setFilter}
        filter={filter}
      />
      <div className="max-h-[65dvh] overflow-auto">
        {filter === "orderDetails" && <OrderDetails orderDetails={data} />}
        {filter === "orderItems" && (
          <OrderItems
            orderItems={data?.simplifiedOrderItems}
            priceSummary={data?.priceSummary}
          />
        )}
      </div>
    </div>
  );
};

export default ViewOrderDetails;
