import React, { useState } from "react";
import { RiAddLine, RiArrowGoBackFill } from "react-icons/ri";
import { useAxiosInstance } from "../../../../../../Hooks/Instances/useAxiosInstance";
import SubjectSelectInput from "./components/SubjectSelectInput";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import { USER_SUBJECT_CODE_API } from "../../../../../../Utilities/APIs/APIs";

const AddExam = ({ selectedExams, setSelectedExams, exam, toggleFetch }) => {
  const axiosInstance = useAxiosInstance();

  const [boardId, setBoardId] = useState(null);
  const [subjectId, setSubjectId] = useState(null);
  const [code, setCode] = useState("");
  // const subjectBoardMaps = useFetchItems(MANAGE_SUBJECT_BOARD_API);
  const handleReset = () => {
    setBoardId("-1");
    setSubjectId("-1");
  };

  console.log(selectedExams, "selectedExams");
  console.log(subjectId, "subjectId");

  const handleAdd = async () => {
    const existingExam = selectedExams.filter(
      (sb) => sb?.subject?._id === subjectId
    );

    const newExam = {
      subject: subjectId,
      board: boardId,
      subjectCode: code,
      exam,
    };

    if (existingExam.length) {
      // toast.error("Subject already added");
      toast({
        title: "Subject already added",
        status: "error",
        duration: 3000,
      });
      console.log("Subject already added");
      return;
    }

    await axiosInstance.post(USER_SUBJECT_CODE_API, newExam);

    toast({
      title: "Subject added successfully",
      status: "success",
      duration: 3000,
    });
    setCode("");
    setSubjectId("");
    toggleFetch();
  };

  return (
    <div className="mt-2 text-sm font-semibold">
      <div className="grid grid-cols-6 gap-2">
        {/* Grid Data */}
        <React.Fragment>
          <div className=" col-span-5 *:w-full">
            {/* <BoardSelectInput
              id={boardId}
              subjectId={subjectId}
              setBoardId={setBoardId}
            /> */}
          </div>
          <div className="col-span-2 *:w-full">
            <SubjectSelectInput
              id={subjectId}
              boardId={boardId}
              setSubjectId={setSubjectId}
            />
          </div>
          <div className="col-span-2 *:w-full">
            <input
              type="text"
              placeholder="Subject code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="p-2 border rounded bg-black text-white appearance-none"
            />
          </div>
          <div className="flex gap-2 justify-end items-center">
            <p
              onClick={handleReset}
              className="cursor-pointer bg-gray-950 rounded-full p-1.5 hover:bg-gray-800 transition-all duration-300"
            >
              <RiArrowGoBackFill color="yellow" size={16} />
            </p>
            <p
              onClick={handleAdd}
              className="p-px rounded-full transition-all duration-300 cursor-pointer bg-gray-950 hover:bg-gray-800"
            >
              <RiAddLine color="green" size={24} />
            </p>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};

export default AddExam;
