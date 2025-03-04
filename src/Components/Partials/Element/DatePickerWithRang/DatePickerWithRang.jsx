import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { RiCalendar2Line } from "react-icons/ri";
import "./DatePickerStyles.css";

function MyDateRangePicker({ range, setRange }) {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);


  const handleSelect = (selectedRange) => {
    setRange(selectedRange);
    console.log("selectedRange", selectedRange);
    
  };

  const toggleCalendar = () => setIsOpen(!isOpen);

  const footerText = range
    ? `Selected range: ${range.from?.toLocaleDateString()} - ${range.to?.toLocaleDateString()}`
    : "Pick a date range.";

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const numberOfDays =
    range?.from && range?.to
      ? Math.ceil((range.to - range.from) / (1000 * 60 * 60 * 24)) + 1
      : 0;

  return (
    <div className="date-picker-container">
      <div onClick={toggleCalendar} className="date-picker-footer">
        <RiCalendar2Line /> {footerText}
      </div>

      <div
        ref={calendarRef}
        className={`date-picker-calendar ${isOpen ? "open" : ""}`}
      >
        <DayPicker
          mode="range"
          selected={range}
          onSelect={handleSelect}
          numberOfMonths={2}
          captionLayout="dropdown"
          styles={{
            caption: { color: "#333", fontWeight: "bold" },
            day: { borderRadius: "10%", color: "white" },
          }}
        />
      </div>
      {numberOfDays > 0 && (
        <div className="date-picker-days-selected">
          {`You have selected ${numberOfDays} day${
            numberOfDays > 1 ? "s" : ""
          }.`}
        </div>
      )}
    </div>
  );
}

export default MyDateRangePicker;
