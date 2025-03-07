import { FormWrapper } from "@antopolis/admin-component-library/dist/form";
import { ShortTextInput } from "@antopolis/admin-component-library/dist/ImageInput-09ba262c";
import { Button } from "@antopolis/admin-component-library/dist/pagination-a49ce60d";
import { toast } from "@antopolis/admin-component-library/dist/useToast-64602659";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { MANAGE_EXAM_API } from "../../../../Utilities/APIs/APIs";
import { fetchSingleItem } from "../../utils/fetchSingleItem";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import ExamineeSelectInput from "./components/ExamineeSelectInput";
import VenueSelectInput from "./components/VenueSelectInput";
import SemesterSelectInput from "./components/SemesterSelectInput";
import ExamTypeSelectInput from "./components/ExamTypeSelectInput";
import SupportSelectInput from "./components/SupportSelectInput";
import PredictedGradesSelectInput from "./components/PredictedGradesSelectInput";
import useDefaultValue from "./hooks/useDefaultValue";
import SelectedExam from "./components/SelectedExam/SelectedExam";
import AddExam from "./components/AddExam/AddExam";
import usePrice from "../hooks/usePrice";

const UpdateExam = ({
  id = null,
  setEditModal,
  toggleFetch,
  toggle,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = useAxiosInstance();
  const [value, setValue] = useState(null);
  const [selectedExams, setSelectedExams] = useState([]);
  const [code, setCode] = useState("");
  const [selectedCodes, setSelectedCodes] = useState([]);
  useState("");

  useEffect(() => {
    if (id) {
      fetchSingleItem(
        id,
        axiosInstance,
        MANAGE_EXAM_API,
        (data) => {
          setValue(data);
          setSelectedExams(data.subjectBoardMaps);
          setSelectedCodes(data.userSubjectCode);
        },
        setError,
        setIsLoading
      );
    }
  }, [id, toggle]);
  let price = 0;

  // get price from backend
  // const price = usePrice(selectedExams);
  // useEffect(() => {
  //   setValue({ ...value, totalCost: price + 10 });
  // }, [price]);

  const defaultValues = useDefaultValue(value, price);

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("venue", data.venue);
    formData.append("semester", data.semester);
    formData.append("isMock", data.isMock === "mock" ? true : false);
    formData.append(
      "isNewExaminee",
      data.isNewExaminee === "new" ? true : false
    );
    formData.append("examYear", data.examYear);
    formData.append("uci", data.uci);
    formData.append("uln", data.uln);
    formData.append("totalCost", data.totalCost);
    formData.append(
      "needSupportForUCAS",
      data.needSupportForUCAS === "yes" ? true : false
    );
    formData.append(
      "needPredictedGradesForUCAS",
      data.needPredictedGradesForUCAS === "yes" ? true : false
    );

    const modifiedSubjectBoardMaps = selectedExams.map((sb) => ({
      subject: sb.subject._id,
      board: sb.board._id,
      _id: sb._id,
    }));
    formData.append(
      "subjectBoardMaps",
      JSON.stringify(modifiedSubjectBoardMaps)
    );
    const bodyData = {
      venue: data.venue,
      semester: data.semester,
      isMock: data.isMock === "mock" ? true : false,
      isNewExaminee: data.isNewExaminee === "new" ? true : false,
      examYear: data.examYear,
      uci: data.uci,
      uln: data.uln,
      totalCost: data.totalCost,
      needSupportForUCAS: data.needSupportForUCAS === "yes" ? true : false,
      needPredictedGradesForUCAS:
        data.needPredictedGradesForUCAS === "yes" ? true : false,
      subjectBoardMaps: {
        ...selectedExams,
        code: code,
      },
    };
    console.log(bodyData, "data");
    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `${MANAGE_EXAM_API}${id}`,
        formData
      );
      if (response.status === 200) {
        toggleFetch();
        setEditModal(false);
        toast({
          title: "Success",
          description: "Exam updated successfully",
          variant: "success",
        });
      } else {
        toast({
          title: "Failed",
          description: "Could not update Exam",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not update Subject",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  console.log(defaultValues, "value");
  return (
    <FormWrapper
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      {...props}
      // mainStyle={}
    >
      <div
        style={{
          height: "75vh",
          overflow: "auto",
        }}
      >
        <VenueSelectInput />
        <SemesterSelectInput />
        <ExamTypeSelectInput />
        <ExamineeSelectInput />
        <ShortTextInput
          name="examYear"
          label="Exam year"
          placeholder="Enter Exam year"
          className="mb-2 placeholder:text-gray-400"
        />
        <SelectedExam
          toggleFetch={toggleFetch}
          setCode={setCode}
          code={code}
          exams={selectedCodes}
          setSelectedExams={setSelectedExams}
        />
        <AddExam
          toggleFetch={toggleFetch}
          exam={id}
          selectedExams={selectedCodes}
          setSelectedExams={setSelectedExams}
        />
        <ShortTextInput
          name="uci"
          label="Uci"
          placeholder="Enter uci"
          className="mb-2 placeholder:text-gray-400"
        />
        <ShortTextInput
          name="uln"
          label="Uln"
          placeholder="Enter uln"
          className="mb-2 placeholder:text-gray-400"
        />
        <ShortTextInput
          name="totalCost"
          label="Total Cost"
          placeholder="Enter total Cost"
          className="mb-2 placeholder:text-gray-400"
        />
        <SupportSelectInput />
        <PredictedGradesSelectInput />
      </div>
      <Button className="mt-6 w-full">
        {isLoading ? (
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
        ) : (
          "Update Subject"
        )}
      </Button>
    </FormWrapper>
  );
};

export default UpdateExam;
