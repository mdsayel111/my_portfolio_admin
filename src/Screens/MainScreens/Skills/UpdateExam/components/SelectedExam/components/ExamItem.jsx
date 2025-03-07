/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { RiCheckDoubleFill, RiDeleteBin2Line } from "react-icons/ri";
import { useAxiosInstance } from "../../../../../../../Hooks/Instances/useAxiosInstance";
import { USER_SUBJECT_CODE_API } from "../../../../../../../Utilities/APIs/APIs";

const ExamItem = ({ exam, serial, handleRemove, setCode, code }) => {
  const [newCode, setNewCode] = useState(exam?.subjectCode);

  const axiosInstance = useAxiosInstance();
  useEffect(() => {
    setCode(exam?.subjectCode);
  }, [exam]);

  const handleSave = async (id) => {
    const data = await axiosInstance.patch(USER_SUBJECT_CODE_API + id, {
      subjectCode: newCode,
    });
    console.log(data);
  };

  return (
    <React.Fragment>
      <div className="col-span-1 *:w-full">
        <p>{serial}.</p>
      </div>
      <div className="col-span-3 *:w-full">
        <p>{exam?.board?.name}</p>
      </div>
      <div className="col-span-3 *:w-full">
        <p>{exam?.subject?.name}</p>
      </div>
      <div className="col-span-1 *:w-full">
        {/* <p>{exam?.code ? exam?.code : "N/A"}</p> */}
        <input
          type="text"
          className="p-2 w-full text-white bg-black rounded border appearance-none"
          value={newCode}
          onChange={(e) => setNewCode(e.target.value)}
        />
      </div>
      <div className="flex gap-2 justify-end items-center">
        <RiCheckDoubleFill
          size={20}
          color="green"
          className="cursor-pointer"
          onClick={() => handleSave(exam?._id)}
        />

        <p
          onClick={() => handleRemove(exam._id)}
          className="p-1 rounded-full transition-all duration-300 cursor-pointer bg-gray-950 hover:bg-gray-800"
        >
          <RiDeleteBin2Line color="red" size={20} />
        </p>
      </div>
    </React.Fragment>
  );
};

export default ExamItem;
