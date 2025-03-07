import React, { useState } from "react";
import ExamItem from "./components/ExamItem";
import { useAxiosInstance } from "../../../../../../Hooks/Instances/useAxiosInstance";
import { USER_SUBJECT_CODE_API } from "../../../../../../Utilities/APIs/APIs";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";

const SelectedExam = ({ exams, setSelectedExams, setCode, code , toggleFetch}) => {
  const axiosInstance = useAxiosInstance();
  const RemoveExam = async (id) => {
    const data = await axiosInstance.delete(USER_SUBJECT_CODE_API + id);
    toast({
      title: "Subject removed successfully",
      status: "success",

      duration: 3000,
    });

    toggleFetch();
    console.log(data);
    // setSelectedExams((prev) => prev.filter((exam) => exam._id !== id));
  };

  return (
    <div className="text-sm font-semibold">
      <h2 className="mb-2 font-semibold">Selected Exams</h2>
      <div className="grid grid-cols-9 gap-2">
        {/* Grid Headers */}
        <div className="col-span-1 font-semibold">No.</div>
        <div className="col-span-3 font-semibold">Board</div>
        <div className="col-span-3 font-semibold">Subject</div>
        <div className="col-span-1 font-semibold">Code</div>
        <div className="col-span-1 pr-2 font-semibold text-right">Actions</div>
        {/* Grid Data */}
        {exams
          ? exams?.map((exam, idx) => (
              <ExamItem
                setCode={setCode}
                code={code}
                serial={idx + 1}
                key={exam._id}
                exam={exam}
                handleRemove={RemoveExam}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default SelectedExam;
