import React from "react";
import useFetchItems from "../../../../../utils/useFetchItems";
import { MANAGE_SUBJECT_BOARD_BY_SUBJECT_API } from "../../../../../../../Utilities/APIs/APIs";

const BoardSelectInput = ({ id, subjectId, setBoardId }) => {
  const subjectBoardMaps = useFetchItems(
    MANAGE_SUBJECT_BOARD_BY_SUBJECT_API + subjectId
  );

  return (
    <select
      value={id}
      onChange={(e) => setBoardId(e.target.value)}
      className="p-2 border rounded bg-black text-white appearance-none"
    >
      {subjectBoardMaps.map((subjectBoard) => (
        <option value={subjectBoard.board._id} key={subjectBoard._id}>
          {subjectBoard.board.name}
        </option>
      ))}
    </select>
  );
};

export default BoardSelectInput;
