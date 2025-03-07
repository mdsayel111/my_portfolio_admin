import { SelectInput } from "@antopolis/admin-component-library/dist/inputs";

const SemesterSelectInput = () => {
  // useEffect(() => {
  //   const options = semesters.map((semester) => ({
  //     value: semester._id,
  //     label: semester.name,
  //   }));
  //   setSemesterOptions(options);
  // }, [semesters]);
  // options for exam type select input

  const semesterOptions = [
    { value: "Summer (May/June)", label: "Summer (May/June)" },
    { value: "Autumn (Oct/Nov)", label: "Autumn (Oct/Nov)" },
    { value: "January", label: "January" },
  ];
  return (
    <SelectInput
      options={semesterOptions}
      name="semester"
      label="Semester"
      placeholder="Select Semester"
    />
  );
};

export default SemesterSelectInput;
