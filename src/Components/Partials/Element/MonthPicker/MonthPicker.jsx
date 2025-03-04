import { useEffect, useRef, useState } from "react";
import { MonthInput, MonthPicker } from "react-lite-month-picker";
import "./MonthPicker.css";

export default function CalendarMonthPicker({
  selectedMonthData,
  setSelectedMonthData,
}) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const monthRef = useRef(null);

  //   console.log(
  //     "selectedMonthData",
  //     selectedMonthData && format(selectedMonthData, "yyyy-MM-dd")
  //   );

  const handleClickOutside = (event) => {
    if (monthRef.current && !monthRef.current.contains(event.target)) {
      setIsPickerOpen(false);
    }
  };

  useEffect(() => {
    if (isPickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPickerOpen]);

  return (
    <div ref={monthRef}>
      <MonthInput
        selected={selectedMonthData}
        setShowMonthPicker={setIsPickerOpen}
        showMonthPicker={isPickerOpen}
      />
      {isPickerOpen ? (
        <MonthPicker
          setIsOpen={setIsPickerOpen}
          selected={selectedMonthData}
          onChange={setSelectedMonthData}
          format="YYYY-MM-DD"
        />
      ) : null}
    </div>
  );
}
