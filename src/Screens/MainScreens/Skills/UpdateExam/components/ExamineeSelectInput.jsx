import { SelectInput } from "@antopolis/admin-component-library/dist/inputs";

const ExamineeSelectInput = () => {
  const examineeOption = [
    { value: "new", label: "New" },
    { value: "retake", label: "Re-Take" },
  ];
  return (
    <SelectInput
      options={examineeOption}
      name="isNewExaminee"
      label="Examinee type"
      placeholder="Select Examinee type"
    />
  );
};

export default ExamineeSelectInput;
