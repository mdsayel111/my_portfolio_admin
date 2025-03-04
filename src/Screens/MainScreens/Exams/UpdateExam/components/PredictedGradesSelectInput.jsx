import { SelectInput } from "@antopolis/admin-component-library/dist/inputs";

const PredictedGradesSelectInput = () => {
  const needPredictedGradesForUCASOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];
  return (
    <SelectInput
      options={needPredictedGradesForUCASOptions}
      name="needPredictedGradesForUCAS"
      label="Need predicted grades for ucas"
      placeholder="Select Need predicted grades for ucas"
    />
  );
};

export default PredictedGradesSelectInput;
