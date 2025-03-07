import { SelectInput } from "@antopolis/admin-component-library/dist/inputs";

const ExamTypeSelectInput = () => {
  const examOptions = [
    { value: "mock", label: "Mock" },
    { value: "board", label: "Board" },
  ];
  return (
    <SelectInput
      options={examOptions}
      name="isMock"
      label="Exam type"
      placeholder="Select Exam type"
    />
  );
};

export default ExamTypeSelectInput;
