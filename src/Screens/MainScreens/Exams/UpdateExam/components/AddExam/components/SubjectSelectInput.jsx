import { GET_ALL_SUBJECT_API } from "../../../../../../../Utilities/APIs/APIs";
import useFetchItems from "../../../../../utils/useFetchItems";

const SubjectSelectInput = ({ id, setSubjectId }) => {
  const data = useFetchItems(GET_ALL_SUBJECT_API);
  console.log(data, "subjectBoardMaps");

  return (
    <select
      value={id}
      onChange={(e) => setSubjectId(e.target.value)}
      className="p-2 border rounded bg-black text-white appearance-none"
    >
      <option value="-1" selected disabled>
        Select Subject
      </option>

      {data.map((item) => (
        <option value={item._id} key={item._id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default SubjectSelectInput;
