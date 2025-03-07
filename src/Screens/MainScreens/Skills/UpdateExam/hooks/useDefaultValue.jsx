import { useEffect, useState } from "react";

const useDefaultValue = (value, price) => {
  const [defaultValues, setDefaultValues] = useState({
    venue: "",
    semester: "",
    isMock: "",
    isNewExaminee: "",
    examYear: "",
    uci: "",
    uln: "",
    totalCost: "",
    needSupportForUCAS: "",
    needPredictedGradesForUCAS: "",
    subjectBoardMaps: [],
  });
  useEffect(() => {
    if (value) {
      setDefaultValues({
        venue: value?.venue?._id || "",
        semester: value?.semester || "",
        isMock: value?.isMock ? "mock" : "board",
        isNewExaminee: value?.isNewExaminee ? "new" : "retake",
        examYear: value?.examYear || "",
        uci: value?.uci || "",
        uln: value?.uln || "",
        totalCost: value?.totalCost || "",
        needSupportForUCAS: value?.needSupportForUCAS ? "yes" : "no",
        needPredictedGradesForUCAS: value?.needPredictedGradesForUCAS
          ? "yes"
          : "no",
        subjectBoardMaps: value?.subjectBoardMaps || [],
      });
    }
  }, [value, price]);

  return defaultValues;
};

export default useDefaultValue;
