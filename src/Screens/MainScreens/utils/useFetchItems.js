import { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";

const useFetchItems = (api) => {
  const [data, setData] = useState([]);
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axiosInstance.get(`${api}?filter=active`);
      if (status === 200) {
        setData(data);
      } else {
        console.error("Failed to fetch items:");
      }
    }
    fetchData();
  }, [api]);
  return data;
};

export default useFetchItems;
