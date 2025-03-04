import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAxiosInstance } from "../Hooks/Instances/useAxiosInstance";
import { pauseSound, playSound } from "../Utilities/Sound";

const AppContext = createContext({});

function AppContextProvider({ children }) {
  // const socket = io.connect(import.meta.env.REACT_APP_BACKEND_URL);

  const axiosInstance = useAxiosInstance();
  const [myBranch, setMyBranch] = useState(null);
  const [employee, setEmployee] = useState(
    JSON.parse(localStorage.getItem("member"))
  );

  const [newOrder, setNewOrder] = useState(false);
  const [newOrderData, setNewOrderData] = useState(null);
  const [pendingOrders, setPendingOrders] = useState(null);

  const [toggleFetch, setToggleFetch] = useState(false);
  // const [isLoading, setIsLoading] = useState(false)

  function triggerFetchRequest() {
    setToggleFetch((prev) => !prev);
  }

  // useEffect(() => {
  //   if (employee) {
  //     async function fetchAndSetRestaurantEmployee() {
  //       const { data } = await axiosInstance.get(
  //         `/manageEmployees/employeeBranches/getMyBranch`
  //       );
  //       setMyBranch(data[0]?.branch);
  //     }
  //     fetchAndSetRestaurantEmployee();
  //   }
  // }, [employee, axiosInstance]);

  // socket.on("Test", (data) => {
  //   if (myBranch?._id === (data?.branch?._id || data?.branch)) {
  //     // playSound()
  //     triggerFetchRequest();
  //     setNewOrder(true);
  //     setNewOrderData(data);
  //   }
  // });

  // channel.bind('order', data => {

  //     if (myBranch?._id === (data?.branch?._id || data?.branch)) {
  //         playSound()
  //         triggerFetchRequest()
  //         setNewOrder(true)
  //         setNewOrderData(data)
  //     }
  // })

  useEffect(() => {
    if (employee && myBranch) {
      async function fetchAndSetPendingOrders() {
        const { data } = await axiosInstance.get(
          "/customers/orders/getAllOrdersFromMyBranch/"
        );
        const processingOrders = data?.filter(
          (i) =>
            i.orderStatus !== "completed" &&
            i.orderStatus !== "canceled" &&
            i.orderStatus !== "toBeDelivered" &&
            i.orderStatus !== "shipped"
        );
        setPendingOrders(processingOrders);
      }
      fetchAndSetPendingOrders();
    }
  }, [employee, toggleFetch, newOrder, myBranch, axiosInstance]);

  useEffect(() => {
    // console.log("neworder is",newOrder)

    // console.log("new order data branch is", myBranch?._id === (newOrderData?.branch?._id || newOrderData?.branch))

    if (
      newOrder &&
      myBranch?._id === (newOrderData?.branch?._id || newOrderData?.branch)
    ) {
      playSound();
    } else {
      pauseSound();
    }
  });

  // console.log("myBranch is",myBranch)

  return (
    <AppContext.Provider
      value={{
        // register,
        // login,
        // logout,
        employee,
        myBranch: myBranch,
        setMyBranch: setMyBranch,
        pendingOrders,
        newOrder,
        setNewOrder,
        triggerFetchRequest,
        // isLoading,
        // setIsLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider };

export default AppContext;
