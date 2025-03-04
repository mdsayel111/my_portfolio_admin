import { SelectInput } from "@antopolis/admin-component-library/dist/inputs";

const SupportSelectInput = () => {
  const needSupportForUCASOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];
  return (
    <SelectInput
      options={needSupportForUCASOptions}
      name="needSupportForUCAS"
      label="Need support for ucas"
      placeholder="Select Need support for ucas"
    />
  );
};

export default SupportSelectInput;
