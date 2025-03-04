import { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import { GET_SUBLEVELS_BY_LEVEL_API } from "../../../../Utilities/APIs/APIs";

export default function useGetSublevelOptions({ level }) {
  const axiosInstance = useAxiosInstance();
  const [subLevelValues, setSubLevelValues] = useState([]);

  useEffect(() => {
    const fetchSubLevels = async () => {
      const { data } = await axiosInstance.get(
        GET_SUBLEVELS_BY_LEVEL_API + "?level=" + level
      );
      console.log(data);
      const options = data?.map((level) => ({
        value: level._id,
        label: level.name,
      }));
      setSubLevelValues(options);
    };
    fetchSubLevels();
  }, [level]);

  return subLevelValues;
}
