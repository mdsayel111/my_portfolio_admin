import { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import { PACKAGE_BY_SUBJECT_AND_BOARD } from "../../../../Utilities/APIs/APIs";

const usePrice = (subjectBoardMap) => {
  const [price, setPrice] = useState(0);
  const axiosInstance = useAxiosInstance();

  let params = {};
  if (subjectBoardMap.length) {
    params = JSON.stringify(
      subjectBoardMap.map((sb) => ({
        subject: sb.subject._id,
        board: sb.board._id,
        _id: sb._id,
      }))
    );
  }
  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get(
        PACKAGE_BY_SUBJECT_AND_BOARD + "?subjectBoardMaps=" + params
      );
      setPrice(data.totalCost);
    }
    params && fetchData();
  }, [params, subjectBoardMap?.length]);

  return price;
};

export default usePrice;
