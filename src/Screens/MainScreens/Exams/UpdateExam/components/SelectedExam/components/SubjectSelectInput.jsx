import React from "react";
import useFetchItems from "../../../../../utils/useFetchItems";
import { MANAGE_SUBJECT_BOARD_BY_BOARD_API } from "../../../../../../../Utilities/APIs/APIs";

const SubjectSelectInput = ({ id, boardId, setSubjectId }) => {
  const subjectBoardMaps = useFetchItems(
    MANAGE_SUBJECT_BOARD_BY_BOARD_API + boardId
  );

  return (
    <select
      defaultValue={id}
      value={id}
      onChange={(e) => setSubjectId(e.target.value)}
      className="p-2 border rounded bg-black text-white appearance-none"
    >
      {subjectBoardMaps.map((subjectBoard) => (
        <option value={subjectBoard.subject._id} key={subjectBoard._id}>
          {subjectBoard.subject.name}
        </option>
      ))}
    </select>
  );
};

export default SubjectSelectInput;
